package com.smartapproval.model;

import com.smartapproval.constant.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "user_role_assignments", 
       uniqueConstraints = @UniqueConstraint(name = "uk_ura_user_role", columnNames = {"user_id", "role"}))
@Data
@EqualsAndHashCode(callSuper = true)
public class UserRoleAssignment extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserRole role;
}
