package com.smartapproval.model;

import com.smartapproval.constant.ActionType;
import com.smartapproval.constant.ClarificationRequestedFrom;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Entity
@Table(name = "approval_actions")
@Data
@EqualsAndHashCode(callSuper = true)
public class ApprovalAction extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approval_request_id", nullable = false)
    private ApprovalRequest approvalRequest;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workflow_step_id", nullable = false)
    private ApprovalWorkflowStep workflowStep;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approver_id", nullable = false)
    private Approver approver;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ActionType actionType;
    
    @Column(columnDefinition = "TEXT")
    private String comments;
    
    @Column(length = 50)
    private String rejectionReasonCode;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ClarificationRequestedFrom clarificationRequestedFrom;
    
    @Column(nullable = false)
    private LocalDateTime actionDate;
}
