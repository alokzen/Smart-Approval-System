package com.smartapproval.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "departments")
@Data
@EqualsAndHashCode(callSuper = true)
public class Department extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;
    
    @Column(nullable = false, length = 50)
    private String code;
    
    @Column(nullable = false, length = 255)
    private String name;
    
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<CostCenter> costCenters = new ArrayList<>();
    
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<ApprovalType> approvalTypes = new ArrayList<>();
}
