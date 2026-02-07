package com.smartapproval.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "approval_type_value_breakup",
       uniqueConstraints = @UniqueConstraint(name = "uk_atvb_type_seq", 
                                            columnNames = {"approval_type_id", "sequence_number"}))
@Data
@EqualsAndHashCode(callSuper = true)
public class ApprovalTypeValueBreakup extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approval_type_id", nullable = false)
    private ApprovalType approvalType;
    
    @Column(nullable = false)
    private Integer sequenceNumber;
    
    @Column(nullable = false, length = 255)
    private String itemName;
    
    @Column(columnDefinition = "TEXT")
    private String itemDescription;
}
