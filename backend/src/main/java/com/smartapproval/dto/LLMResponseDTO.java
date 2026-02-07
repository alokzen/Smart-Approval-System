package com.smartapproval.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO for LLM extraction response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LLMResponseDTO {
    
    private boolean success;
    private ExtractedApprovalDataDTO data;
    private List<String> suggestions;
    private List<String> warnings;
    private List<String> errors;
    private String message;
    private Long processingTimeMs;
}
