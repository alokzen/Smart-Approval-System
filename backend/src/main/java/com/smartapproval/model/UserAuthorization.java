package com.smartapproval.model;

import com.smartapproval.constant.AuthorizationType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "user_authorizations")
@Data
@EqualsAndHashCode(callSuper = true)
public class UserAuthorization extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wbs_id")
    private WBS wbs;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AuthorizationType authorizationType;
}
