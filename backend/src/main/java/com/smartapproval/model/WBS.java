package com.smartapproval.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "wbs")
@Data
@EqualsAndHashCode(callSuper = true)
public class WBS extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_wbs_id")
    private WBS parentWbs;
    
    @Column(nullable = false, length = 50)
    private String code;
    
    @Column(nullable = false, length = 255)
    private String name;
    
    @Column(nullable = false)
    private Integer level;
    
    @OneToMany(mappedBy = "parentWbs", cascade = CascadeType.ALL)
    private List<WBS> childWbsList = new ArrayList<>();
}
