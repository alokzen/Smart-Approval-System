package com.smartapproval.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for LLM extraction request
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LLMRequestDTO {
    
    @NotBlank(message = "Text input is required")
    private String text;
    
    @NotNull(message = "User ID is required")
    private Long userId;
    
    @NotNull(message = "Organization ID is required")
    private Long organizationId;
}
