package com.smartapproval.repository;

import com.smartapproval.model.DOPPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DOPPolicyRepository extends JpaRepository<DOPPolicy, Long> {
    @Query("SELECT d FROM DOPPolicy d WHERE d.organization.id = :orgId")
    List<DOPPolicy> findByOrganizationId(@Param("orgId") Long organizationId);
    
    @Query("SELECT d FROM DOPPolicy d WHERE d.department.id = :deptId")
    List<DOPPolicy> findByDepartmentId(@Param("deptId") Long departmentId);
    
    @Query("SELECT d FROM DOPPolicy d WHERE d.project.id = :projId")
    List<DOPPolicy> findByProjectId(@Param("projId") Long projectId);
    
    @Query("SELECT d FROM DOPPolicy d WHERE d.approvalType.id = :approvalTypeId")
    List<DOPPolicy> findByApprovalTypeId(@Param("approvalTypeId") Long approvalTypeId);
    
    List<DOPPolicy> findByIsActiveTrue();
    
    @Query("SELECT d FROM DOPPolicy d WHERE d.organization.id = :orgId " +
           "AND d.approvalType.id = :approvalTypeId " +
           "AND (:deptId IS NULL OR d.department.id = :deptId) " +
           "AND (:projId IS NULL OR d.project.id = :projId) " +
           "AND :requestDate BETWEEN d.validFromDate AND d.validUptoDate " +
           "AND :requestValue BETWEEN d.valueFrom AND d.valueTo " +
           "AND d.isActive = true " +
           "ORDER BY d.finalApprovalLevel DESC")
    Optional<DOPPolicy> findMatchingPolicy(
            @Param("orgId") Long organizationId,
            @Param("approvalTypeId") Long approvalTypeId,
            @Param("deptId") Long departmentId,
            @Param("projId") Long projectId,
            @Param("requestDate") LocalDate requestDate,
            @Param("requestValue") BigDecimal requestValue);
}
