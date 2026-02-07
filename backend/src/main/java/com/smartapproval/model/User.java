package com.smartapproval.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(callSuper = true)
public class User extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;
    
    @Column(unique = true, nullable = false, length = 50)
    private String employeeNumber;
    
    @Column(unique = true, nullable = false, length = 255)
    private String email;
    
    @Column(nullable = false, length = 255)
    private String passwordHash;
    
    @Column(nullable = false, length = 100)
    private String firstName;
    
    @Column(nullable = false, length = 100)
    private String lastName;
    
    @Column(length = 100)
    private String designation;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserRoleAssignment> roleAssignments = new ArrayList<>();
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Approver approver;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserAuthorization> authorizations = new ArrayList<>();
    
    @OneToMany(mappedBy = "requester", cascade = CascadeType.ALL)
    private List<ApprovalRequest> approvalRequests = new ArrayList<>();
}
