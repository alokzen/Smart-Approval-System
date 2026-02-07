package com.smartapproval.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "organizations")
@Data
@EqualsAndHashCode(callSuper = true)
public class Organization extends BaseEntity {
    
    @Column(unique = true, nullable = false, length = 50)
    private String code;
    
    @Column(nullable = false, length = 255)
    private String name;
    
    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
    private List<Department> departments = new ArrayList<>();
    
    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
    private List<Project> projects = new ArrayList<>();
    
    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
    private List<User> users = new ArrayList<>();
}
