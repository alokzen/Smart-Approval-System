package com.smartapproval.model;

import com.smartapproval.constant.WorkflowStepStatus;
import com.smartapproval.constant.WorkflowStepType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "approval_workflow_steps")
@Data
@EqualsAndHashCode(callSuper = true)
public class ApprovalWorkflowStep extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approval_request_id", nullable = false)
    private ApprovalRequest approvalRequest;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approver_id", nullable = false)
    private Approver approver;
    
    @Column(nullable = false)
    private Integer stepLevel;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private WorkflowStepType stepType;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private WorkflowStepStatus status;
    
    @Column(nullable = false)
    private LocalDateTime assignedDate;
    
    private LocalDateTime completedDate;
    
    @OneToMany(mappedBy = "workflowStep", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ApprovalAction> actions = new ArrayList<>();
}
