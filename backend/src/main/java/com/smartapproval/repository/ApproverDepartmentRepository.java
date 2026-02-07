package com.smartapproval.repository;

import com.smartapproval.model.ApproverDepartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApproverDepartmentRepository extends JpaRepository<ApproverDepartment, Long> {
    List<ApproverDepartment> findByApproverId(Long approverId);
    List<ApproverDepartment> findByDepartmentId(Long departmentId);
    List<ApproverDepartment> findByOrganizationId(Long organizationId);
    List<ApproverDepartment> findByCostCenterId(Long costCenterId);
    Optional<ApproverDepartment> findByApproverIdAndDepartmentIdAndCostCenterId(
            Long approverId, Long departmentId, Long costCenterId);
}
