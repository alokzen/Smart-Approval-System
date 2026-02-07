package com.smartapproval.repository;

import com.smartapproval.model.WBS;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WBSRepository extends JpaRepository<WBS, Long> {
    List<WBS> findByProjectId(Long projectId);
    List<WBS> findByParentWbsId(Long parentWbsId);
    Optional<WBS> findByProjectIdAndCode(Long projectId, String code);
    boolean existsByProjectIdAndCode(Long projectId, String code);
}
