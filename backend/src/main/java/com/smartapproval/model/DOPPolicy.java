package com.smartapproval.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "dop_policies")
@Data
@EqualsAndHashCode(callSuper = true)
public class DOPPolicy extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approval_type_id", nullable = false)
    private ApprovalType approvalType;
    
    @Column(nullable = false)
    private LocalDate validFromDate;
    
    @Column(nullable = false)
    private LocalDate validUptoDate;
    
    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal valueFrom;
    
    @Column(nullable = false, precision = 18, scale = 2)
    private BigDecimal valueTo;
    
    @Column(nullable = false)
    private Integer finalApprovalLevel;
}
