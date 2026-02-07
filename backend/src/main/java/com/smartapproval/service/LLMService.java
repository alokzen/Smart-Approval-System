package com.smartapproval.service;

import com.smartapproval.dto.ExtractedApprovalDataDTO;
import com.smartapproval.dto.LLMRequestDTO;
import com.smartapproval.dto.LLMResponseDTO;

/**
 * Service interface for LLM-based approval request extraction
 */
public interface LLMService {
    
    /**
     * Extract structured approval request data from natural language text
     * 
     * @param request LLM request containing text and user context
     * @return Extracted approval data with confidence scores
     */
    LLMResponseDTO extractApprovalRequest(LLMRequestDTO request);
    
    /**
     * Validate extracted data against business rules
     * 
     * @param extractedData Data extracted by LLM
     * @param userId User ID for authorization checks
     * @return Validation result with errors and warnings
     */
    LLMResponseDTO validateExtractedData(ExtractedApprovalDataDTO extractedData, Long userId);
}
