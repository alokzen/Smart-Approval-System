package com.smartapproval.repository;

import com.smartapproval.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmployeeNumber(String employeeNumber);
    boolean existsByEmail(String email);
    boolean existsByEmployeeNumber(String employeeNumber);
    List<User> findByOrganizationId(Long organizationId);
}
