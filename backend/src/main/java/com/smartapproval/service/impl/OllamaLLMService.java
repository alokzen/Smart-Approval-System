package com.smartapproval.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartapproval.dto.ExtractedApprovalDataDTO;
import com.smartapproval.dto.LLMRequestDTO;
import com.smartapproval.dto.LLMResponseDTO;
import com.smartapproval.service.LLMService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Implementation of LLMService using Ollama
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class OllamaLLMService implements LLMService {
    
    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;
    
    @Value("${llm.ollama.base-url:http://localhost:11434}")
    private String ollamaBaseUrl;
    
    @Value("${llm.ollama.model:llama3:8b}")
    private String model;
    
    @Value("${llm.ollama.timeout:30000}")
    private int timeoutMs;
    
    @Value("${llm.ollama.temperature:0.3}")
    private double temperature;
    
    @Override
    public LLMResponseDTO extractApprovalRequest(LLMRequestDTO request) {
        long startTime = System.currentTimeMillis();
        
        try {
            // Build prompt with context
            String prompt = buildPrompt(request);
            
            // Call Ollama API
            WebClient webClient = webClientBuilder.baseUrl(ollamaBaseUrl).build();
            
            Map<String, Object> ollamaRequest = new HashMap<>();
            ollamaRequest.put("model", model);
            ollamaRequest.put("prompt", prompt);
            ollamaRequest.put("stream", false);
            Map<String, Object> options = new HashMap<>();
            options.put("temperature", temperature);
            ollamaRequest.put("options", options);
            
            String response = webClient.post()
                    .uri("/api/generate")
                    .bodyValue(ollamaRequest)
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofMillis(timeoutMs))
                    .block();
            
            // Parse response
            ExtractedApprovalDataDTO extractedData = parseLLMResponse(response);
            
            // Validate extracted data
            LLMResponseDTO validationResult = validateExtractedData(extractedData, request.getUserId());
            
            long processingTime = System.currentTimeMillis() - startTime;
            
            return LLMResponseDTO.builder()
                    .success(true)
                    .data(extractedData)
                    .suggestions(validationResult.getSuggestions())
                    .warnings(validationResult.getWarnings())
                    .errors(validationResult.getErrors())
                    .message("Successfully extracted approval request data")
                    .processingTimeMs(processingTime)
                    .build();
                    
        } catch (Exception e) {
            log.error("Error extracting approval request with LLM", e);
            long processingTime = System.currentTimeMillis() - startTime;
            
            return LLMResponseDTO.builder()
                    .success(false)
                    .errors(List.of("Failed to extract data: " + e.getMessage()))
                    .message("Error processing request with LLM")
                    .processingTimeMs(processingTime)
                    .build();
        }
    }
    
    @Override
    public LLMResponseDTO validateExtractedData(ExtractedApprovalDataDTO extractedData, Long userId) {
        List<String> errors = new ArrayList<>();
        List<String> warnings = new ArrayList<>();
        List<String> suggestions = new ArrayList<>();
        
        // Validate required fields
        if (extractedData.getTitle() == null || extractedData.getTitle().trim().isEmpty()) {
            errors.add("Title is required");
        }
        
        if (extractedData.getCategory() == null) {
            errors.add("Category (FINANCIAL/NON_FINANCIAL) is required");
        }
        
        // Validate financial approvals
        if ("FINANCIAL".equals(extractedData.getCategory())) {
            if (extractedData.getValue() == null) {
                errors.add("Value is required for financial approvals");
            }
            
            // Validate value breakup
            if (extractedData.getValueBreakup() != null && !extractedData.getValueBreakup().isEmpty()) {
                BigDecimal total = extractedData.getValueBreakup().stream()
                        .map(ExtractedApprovalDataDTO.ValueBreakupItem::getValue)
                        .reduce(BigDecimal.ZERO, BigDecimal::add);
                
                if (extractedData.getValue() != null && 
                    total.compareTo(extractedData.getValue()) != 0) {
                    warnings.add(String.format(
                        "Value breakup total (%.2f) does not match approval value (%.2f)",
                        total, extractedData.getValue()));
                }
            }
        }
        
        // Check confidence scores
        if (extractedData.getConfidence() != null) {
            extractedData.getConfidence().forEach((field, score) -> {
                if (score < 0.7) {
                    warnings.add(String.format("Low confidence (%.2f) for field: %s", score, field));
                }
            });
        }
        
        return LLMResponseDTO.builder()
                .success(errors.isEmpty())
                .errors(errors)
                .warnings(warnings)
                .suggestions(suggestions)
                .build();
    }
    
    private String buildPrompt(LLMRequestDTO request) {
        // TODO: Fetch user's available departments, projects, approval types from database
        // For now, using a generic prompt
        
        return String.format("""
            You are an AI assistant that extracts structured data from approval request descriptions.
            
            Rules:
            1. Extract only information explicitly mentioned in the text
            2. If information is missing, mark it as null
            3. For financial approvals, extract value in Lakhs (Indian Rupees)
            4. Map department/project names to available options
            5. Identify approval type from context
            
            Output Format (JSON only, no other text):
            {
              "title": "string",
              "category": "FINANCIAL" or "NON_FINANCIAL",
              "approvalType": "string",
              "department": "string",
              "project": "string" or null,
              "value": number or null,
              "valueBreakup": [
                {"item": "string", "description": "string", "value": number}
              ],
              "vendorName": "string" or null,
              "customerName": "string" or null,
              "budget": number or null,
              "ytdSpend": number or null,
              "natureOfSpend": ["SUSTENANCE", "GROWTH", "IMPROVEMENT"],
              "backgroundNeed": "string"
            }
            
            User Input:
            %s
            """, request.getText());
    }
    
    private ExtractedApprovalDataDTO parseLLMResponse(String response) {
        try {
            JsonNode jsonNode = objectMapper.readTree(response);
            
            // Ollama returns response in "response" field
            String responseText = jsonNode.has("response") 
                    ? jsonNode.get("response").asText() 
                    : response;
            
            // Extract JSON from response (might have extra text)
            int jsonStart = responseText.indexOf("{");
            int jsonEnd = responseText.lastIndexOf("}") + 1;
            
            if (jsonStart >= 0 && jsonEnd > jsonStart) {
                String jsonString = responseText.substring(jsonStart, jsonEnd);
                return objectMapper.readValue(jsonString, ExtractedApprovalDataDTO.class);
            }
            
            // Try parsing entire response as JSON
            return objectMapper.readValue(responseText, ExtractedApprovalDataDTO.class);
            
        } catch (Exception e) {
            log.error("Error parsing LLM response", e);
            throw new RuntimeException("Failed to parse LLM response", e);
        }
    }
}
