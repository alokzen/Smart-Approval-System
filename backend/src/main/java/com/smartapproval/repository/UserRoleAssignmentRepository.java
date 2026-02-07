package com.smartapproval.repository;

import com.smartapproval.constant.UserRole;
import com.smartapproval.model.UserRoleAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRoleAssignmentRepository extends JpaRepository<UserRoleAssignment, Long> {
    List<UserRoleAssignment> findByUserId(Long userId);
    List<UserRoleAssignment> findByUserIdAndIsActiveTrue(Long userId);
    Optional<UserRoleAssignment> findByUserIdAndRole(Long userId, UserRole role);
    boolean existsByUserIdAndRole(Long userId, UserRole role);
    List<UserRoleAssignment> findByRole(UserRole role);
}
