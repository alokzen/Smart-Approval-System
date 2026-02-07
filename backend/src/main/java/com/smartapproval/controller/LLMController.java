package com.smartapproval.controller;

import com.smartapproval.dto.LLMRequestDTO;
import com.smartapproval.dto.LLMResponseDTO;
import com.smartapproval.service.LLMService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for LLM-based approval request extraction
 */
@RestController
@RequestMapping("/api/v1/llm")
@RequiredArgsConstructor
public class LLMController {
    
    private final LLMService llmService;
    
    /**
     * Extract approval request data from natural language text
     * 
     * @param request LLM request with text and user context
     * @return Extracted approval data
     */
    @PostMapping("/extract-approval")
    @PreAuthorize("hasAnyRole('REQUESTER', 'ADMIN')")
    public ResponseEntity<LLMResponseDTO> extractApprovalRequest(
            @Valid @RequestBody LLMRequestDTO request) {
        
        LLMResponseDTO response = llmService.extractApprovalRequest(request);
        
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
}
