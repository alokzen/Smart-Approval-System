package com.smartapproval.repository;

import com.smartapproval.constant.AuthorizationType;
import com.smartapproval.model.UserAuthorization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAuthorizationRepository extends JpaRepository<UserAuthorization, Long> {
    List<UserAuthorization> findByUserId(Long userId);
    List<UserAuthorization> findByUserIdAndAuthorizationType(Long userId, AuthorizationType authorizationType);
    List<UserAuthorization> findByUserIdAndIsActiveTrue(Long userId);
}
