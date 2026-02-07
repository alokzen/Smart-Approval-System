package com.smartapproval.repository;

import com.smartapproval.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    List<Department> findByOrganizationId(Long organizationId);
    Optional<Department> findByOrganizationIdAndCode(Long organizationId, String code);
    boolean existsByOrganizationIdAndCode(Long organizationId, String code);
}
