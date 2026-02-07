package com.smartapproval.model;

import com.smartapproval.constant.ApprovalStatus;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "approval_requests")
@Data
@EqualsAndHashCode(callSuper = true)
public class ApprovalRequest extends BaseEntity {
    
    @Column(unique = true, nullable = false, length = 50)
    private String requestNumber;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wbs_id")
    private WBS wbs;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approval_type_id", nullable = false)
    private ApprovalType approvalType;
    
    @Column(nullable = false, length = 255)
    private String title;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ApprovalStatus status;
    
    @Column(length = 10)
    private String category; // FINANCIAL or NON_FINANCIAL
    
    @Column(precision = 18, scale = 2)
    private BigDecimal approvalValue;
    
    @Column(length = 10)
    private String currency = "INR";
    
    @Column(length = 255)
    private String vendorName;
    
    @Column(length = 255)
    private String customerName;
    
    @Column(precision = 18, scale = 2)
    private BigDecimal budget;
    
    @Column(precision = 18, scale = 2)
    private BigDecimal ytdSpend;
    
    @Column(length = 50)
    private String natureOfSpend;
    
    @Column(columnDefinition = "TEXT")
    private String backgroundNeed;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_approver_id")
    private Approver currentApprover;
    
    @Column(nullable = false)
    private LocalDateTime requestDate;
    
    private LocalDateTime submittedDate;
    
    private LocalDateTime approvedDate;
    
    private LocalDateTime rejectedDate;
    
    private LocalDateTime completedDate;
    
    @Column(columnDefinition = "TEXT")
    private String closureRemarks;
    
    @OneToMany(mappedBy = "approvalRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ApprovalRequestValueBreakup> valueBreakup = new ArrayList<>();
    
    @OneToMany(mappedBy = "approvalRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ApprovalWorkflowStep> workflowSteps = new ArrayList<>();
    
    @OneToMany(mappedBy = "approvalRequest", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DocumentAttachment> attachments = new ArrayList<>();
}
