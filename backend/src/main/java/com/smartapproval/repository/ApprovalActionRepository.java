package com.smartapproval.repository;

import com.smartapproval.constant.ActionType;
import com.smartapproval.model.ApprovalAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ApprovalActionRepository extends JpaRepository<ApprovalAction, Long> {
    List<ApprovalAction> findByApprovalRequestId(Long approvalRequestId);
    List<ApprovalAction> findByWorkflowStepId(Long workflowStepId);
    List<ApprovalAction> findByApproverId(Long approverId);
    List<ApprovalAction> findByActionType(ActionType actionType);
    List<ApprovalAction> findByActionDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}
