package com.smartapproval.repository;

import com.smartapproval.model.CostCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CostCenterRepository extends JpaRepository<CostCenter, Long> {
    List<CostCenter> findByOrganizationId(Long organizationId);
    List<CostCenter> findByDepartmentId(Long departmentId);
    Optional<CostCenter> findByDepartmentIdAndCode(Long departmentId, String code);
    boolean existsByDepartmentIdAndCode(Long departmentId, String code);
}
