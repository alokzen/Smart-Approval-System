package com.smartapproval.repository;

import com.smartapproval.model.ApprovalTypeValueBreakup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApprovalTypeValueBreakupRepository extends JpaRepository<ApprovalTypeValueBreakup, Long> {
    List<ApprovalTypeValueBreakup> findByApprovalTypeId(Long approvalTypeId);
    List<ApprovalTypeValueBreakup> findByApprovalTypeIdOrderBySequenceNumber(Long approvalTypeId);
    Optional<ApprovalTypeValueBreakup> findByApprovalTypeIdAndSequenceNumber(
            Long approvalTypeId, Integer sequenceNumber);
}
