package com.smartapproval.repository;

import com.smartapproval.constant.WorkflowStepStatus;
import com.smartapproval.model.ApprovalWorkflowStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApprovalWorkflowStepRepository extends JpaRepository<ApprovalWorkflowStep, Long> {
    List<ApprovalWorkflowStep> findByApprovalRequestId(Long approvalRequestId);
    List<ApprovalWorkflowStep> findByApprovalRequestIdOrderByStepLevel(Long approvalRequestId);
    List<ApprovalWorkflowStep> findByApproverId(Long approverId);
    List<ApprovalWorkflowStep> findByStatus(WorkflowStepStatus status);
    Optional<ApprovalWorkflowStep> findByApprovalRequestIdAndStepLevel(
            Long approvalRequestId, Integer stepLevel);
}
