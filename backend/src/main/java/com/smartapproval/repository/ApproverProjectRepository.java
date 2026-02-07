package com.smartapproval.repository;

import com.smartapproval.model.ApproverProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApproverProjectRepository extends JpaRepository<ApproverProject, Long> {
    List<ApproverProject> findByApproverId(Long approverId);
    List<ApproverProject> findByProjectId(Long projectId);
    List<ApproverProject> findByOrganizationId(Long organizationId);
    Optional<ApproverProject> findByApproverIdAndProjectId(Long approverId, Long projectId);
}
