package com.smartapproval.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Entity
@Table(name = "approval_request_value_breakup")
@Data
@EqualsAndHashCode(callSuper = true)
public class ApprovalRequestValueBreakup extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approval_request_id", nullable = false)
    private ApprovalRequest approvalRequest;
    
    @Column(nullable = false)
    private Integer sequenceNumber;
    
    @Column(nullable = false, length = 255)
    private String itemName;
    
    @Column(columnDefinition = "TEXT")
    private String itemDescription;
    
    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal value;
}
