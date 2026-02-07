package com.smartapproval.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * DTO for extracted approval data from LLM
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExtractedApprovalDataDTO {
    
    private String title;
    private String category; // FINANCIAL or NON_FINANCIAL
    private String approvalType;
    private String department;
    private String project;
    private BigDecimal value;
    
    @JsonProperty("valueBreakup")
    private List<ValueBreakupItem> valueBreakup;
    
    private String vendorName;
    private String customerName;
    private BigDecimal budget;
    
    @JsonProperty("ytdSpend")
    private BigDecimal ytdSpend;
    
    @JsonProperty("natureOfSpend")
    private List<String> natureOfSpend; // SUSTENANCE, GROWTH, IMPROVEMENT
    
    @JsonProperty("backgroundNeed")
    private String backgroundNeed;
    
    // Confidence scores for each field
    private Map<String, Double> confidence;
    
    // Fields that were successfully extracted
    @JsonProperty("extractedFields")
    private List<String> extractedFields;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ValueBreakupItem {
        private String item;
        private String description;
        private BigDecimal value;
    }
}
