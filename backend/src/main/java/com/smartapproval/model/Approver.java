package com.smartapproval.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "approvers")
@Data
@EqualsAndHashCode(callSuper = true)
public class Approver extends BaseEntity {
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    
    @Column(nullable = false, length = 50)
    private String employeeNumber;
    
    @Column(nullable = false, length = 255)
    private String name;
    
    @Column(nullable = false, length = 100)
    private String designation;
    
    @Column(nullable = false)
    private Integer approvalLevel;
    
    @OneToMany(mappedBy = "approver", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ApproverDepartment> approverDepartments = new ArrayList<>();
    
    @OneToMany(mappedBy = "approver", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ApproverProject> approverProjects = new ArrayList<>();
}
