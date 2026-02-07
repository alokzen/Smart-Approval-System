package com.smartapproval.repository;

import com.smartapproval.model.Approver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApproverRepository extends JpaRepository<Approver, Long> {
    Optional<Approver> findByUserId(Long userId);
    List<Approver> findByApprovalLevel(Integer approvalLevel);
    List<Approver> findByIsActiveTrue();
}
