package com.smartapproval.model;

import com.smartapproval.constant.ApprovalNature;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "approval_types",
       uniqueConstraints = @UniqueConstraint(name = "uk_at_dept_proj_code", 
                                            columnNames = {"department_id", "project_id", "code"}))
@Data
@EqualsAndHashCode(callSuper = true)
public class ApprovalType extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;
    
    @Column(nullable = false, length = 50)
    private String code;
    
    @Column(nullable = false, length = 255)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ApprovalNature nature;
    
    @Column(nullable = false)
    private Boolean includeVendorName = false;
    
    @Column(nullable = false)
    private Boolean includeCustomerName = false;
    
    @OneToMany(mappedBy = "approvalType", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ApprovalTypeValueBreakup> valueBreakupTemplate = new ArrayList<>();
}
