package com.smartapproval.repository;

import com.smartapproval.constant.ApprovalStatus;
import com.smartapproval.model.ApprovalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ApprovalRequestRepository extends JpaRepository<ApprovalRequest, Long> {
    Optional<ApprovalRequest> findByRequestNumber(String requestNumber);
    boolean existsByRequestNumber(String requestNumber);
    
    List<ApprovalRequest> findByOrganizationId(Long organizationId);
    List<ApprovalRequest> findByRequesterId(Long requesterId);
    List<ApprovalRequest> findByRequesterIdAndStatus(Long requesterId, ApprovalStatus status);
    List<ApprovalRequest> findByCurrentApproverId(Long approverId);
    List<ApprovalRequest> findByStatus(ApprovalStatus status);
    
    @Query("SELECT ar FROM ApprovalRequest ar WHERE ar.currentApproverId = :approverId " +
           "AND ar.status IN :statuses")
    List<ApprovalRequest> findPendingForApprover(
            @Param("approverId") Long approverId,
            @Param("statuses") List<ApprovalStatus> statuses);
    
    List<ApprovalRequest> findByRequestDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}
