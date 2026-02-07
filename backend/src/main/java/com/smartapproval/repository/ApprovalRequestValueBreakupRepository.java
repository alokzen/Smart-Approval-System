package com.smartapproval.repository;

import com.smartapproval.model.ApprovalRequestValueBreakup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApprovalRequestValueBreakupRepository extends JpaRepository<ApprovalRequestValueBreakup, Long> {
    List<ApprovalRequestValueBreakup> findByApprovalRequestId(Long approvalRequestId);
    List<ApprovalRequestValueBreakup> findByApprovalRequestIdOrderBySequenceNumber(Long approvalRequestId);
}
