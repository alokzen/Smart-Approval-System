package com.smartapproval.repository;

import com.smartapproval.constant.ApprovalNature;
import com.smartapproval.model.ApprovalType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApprovalTypeRepository extends JpaRepository<ApprovalType, Long> {
    List<ApprovalType> findByOrganizationId(Long organizationId);
    List<ApprovalType> findByDepartmentId(Long departmentId);
    List<ApprovalType> findByProjectId(Long projectId);
    List<ApprovalType> findByNature(ApprovalNature nature);
    Optional<ApprovalType> findByDepartmentIdAndProjectIdAndCode(
            Long departmentId, Long projectId, String code);
    boolean existsByDepartmentIdAndProjectIdAndCode(Long departmentId, Long projectId, String code);
}
