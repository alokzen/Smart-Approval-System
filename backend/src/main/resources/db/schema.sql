-- Smart Approval Management System
-- Database Schema
-- MySQL 8.0 Community Edition

-- Create database
CREATE DATABASE IF NOT EXISTS smart_approval_db 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE smart_approval_db;

-- ============================================
-- MASTER DATA TABLES
-- ============================================

-- Organizations
CREATE TABLE organizations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    INDEX idx_org_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Departments
CREATE TABLE departments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    organization_id BIGINT UNSIGNED NOT NULL,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    UNIQUE KEY uk_dept_org_code (organization_id, code),
    FOREIGN KEY fk_dept_org (organization_id) REFERENCES organizations(id) ON DELETE RESTRICT,
    INDEX idx_dept_org (organization_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Cost Centers
CREATE TABLE cost_centers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    organization_id BIGINT UNSIGNED NOT NULL,
    department_id BIGINT UNSIGNED NOT NULL,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    UNIQUE KEY uk_cc_dept_code (department_id, code),
    FOREIGN KEY fk_cc_org (organization_id) REFERENCES organizations(id) ON DELETE RESTRICT,
    FOREIGN KEY fk_cc_dept (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
    INDEX idx_cc_org (organization_id),
    INDEX idx_cc_dept (department_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects
CREATE TABLE projects (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    organization_id BIGINT UNSIGNED NOT NULL,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    UNIQUE KEY uk_proj_org_code (organization_id, code),
    FOREIGN KEY fk_proj_org (organization_id) REFERENCES organizations(id) ON DELETE RESTRICT,
    INDEX idx_proj_org (organization_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- WBS (Work Breakdown Structure)
CREATE TABLE wbs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NOT NULL,
    parent_wbs_id BIGINT UNSIGNED NULL,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    UNIQUE KEY uk_wbs_proj_code (project_id, code),
    FOREIGN KEY fk_wbs_proj (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY fk_wbs_parent (parent_wbs_id) REFERENCES wbs(id) ON DELETE CASCADE,
    INDEX idx_wbs_proj (project_id),
    INDEX idx_wbs_parent (parent_wbs_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- USER AND AUTHORIZATION TABLES
-- ============================================

-- Users
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    organization_id BIGINT UNSIGNED NOT NULL,
    employee_number VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    FOREIGN KEY fk_user_org (organization_id) REFERENCES organizations(id) ON DELETE RESTRICT,
    INDEX idx_user_email (email),
    INDEX idx_user_emp_no (employee_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User Role Assignments (Many-to-Many: Users can have multiple roles)
CREATE TABLE user_role_assignments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    role ENUM('ADMIN', 'APPROVER', 'REQUESTER', 'VIEWER') NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    UNIQUE KEY uk_ura_user_role (user_id, role),
    FOREIGN KEY fk_ura_user (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_ura_user (user_id),
    INDEX idx_ura_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Approvers
CREATE TABLE approvers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    employee_number VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    approval_level INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    FOREIGN KEY fk_approver_user (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_approver_level (approval_level)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Approver Departments (Many-to-Many)
CREATE TABLE approver_departments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    organization_id BIGINT UNSIGNED NOT NULL,
    approver_id BIGINT UNSIGNED NOT NULL,
    department_id BIGINT UNSIGNED NOT NULL,
    cost_center_id BIGINT UNSIGNED NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_appr_dept (approver_id, department_id, cost_center_id),
    FOREIGN KEY fk_appr_dept_org (organization_id) REFERENCES organizations(id) ON DELETE RESTRICT,
    FOREIGN KEY fk_appr_dept_appr (approver_id) REFERENCES approvers(id) ON DELETE CASCADE,
    FOREIGN KEY fk_appr_dept_dept (department_id) REFERENCES departments(id) ON DELETE CASCADE,
    FOREIGN KEY fk_appr_dept_cc (cost_center_id) REFERENCES cost_centers(id) ON DELETE CASCADE,
    INDEX idx_appr_dept_org (organization_id),
    INDEX idx_appr_dept_cc (cost_center_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Approver Projects (Many-to-Many)
CREATE TABLE approver_projects (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    organization_id BIGINT UNSIGNED NOT NULL,
    approver_id BIGINT UNSIGNED NOT NULL,
    project_id BIGINT UNSIGNED NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_appr_proj (approver_id, project_id),
    FOREIGN KEY fk_appr_proj_org (organization_id) REFERENCES organizations(id) ON DELETE RESTRICT,
    FOREIGN KEY fk_appr_proj_appr (approver_id) REFERENCES approvers(id) ON DELETE CASCADE,
    FOREIGN KEY fk_appr_proj_proj (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_appr_proj_org (organization_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User Authorizations
CREATE TABLE user_authorizations (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    department_id BIGINT UNSIGNED NULL,
    project_id BIGINT UNSIGNED NULL,
    wbs_id BIGINT UNSIGNED NULL,
    authorization_type ENUM('CREATE', 'VIEW', 'APPROVE') NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    FOREIGN KEY fk_ua_user (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY fk_ua_dept (department_id) REFERENCES departments(id) ON DELETE CASCADE,
    FOREIGN KEY fk_ua_proj (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY fk_ua_wbs (wbs_id) REFERENCES wbs(id) ON DELETE CASCADE,
    INDEX idx_ua_user_type (user_id, authorization_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- APPROVAL TYPE AND DOP TABLES
-- ============================================

-- Approval Types
CREATE TABLE approval_types (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    organization_id BIGINT UNSIGNED NOT NULL,
    department_id BIGINT UNSIGNED NULL,
    project_id BIGINT UNSIGNED NULL,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    nature ENUM('FINANCIAL', 'NON_FINANCIAL') NOT NULL,
    include_vendor_name TINYINT(1) DEFAULT 0,
    include_customer_name TINYINT(1) DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    UNIQUE KEY uk_at_dept_proj_code (department_id, project_id, code),
    FOREIGN KEY fk_at_org (organization_id) REFERENCES organizations(id) ON DELETE RESTRICT,
    FOREIGN KEY fk_at_dept (department_id) REFERENCES departments(id) ON DELETE CASCADE,
    FOREIGN KEY fk_at_proj (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    INDEX idx_at_nature (nature),
    INDEX idx_at_org (organization_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Approval Type Value Break-up Template
CREATE TABLE approval_type_value_breakup (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    approval_type_id BIGINT UNSIGNED NOT NULL,
    sequence_number INT NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    item_description TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_atvb_type_seq (approval_type_id, sequence_number),
    FOREIGN KEY fk_atvb_type (approval_type_id) REFERENCES approval_types(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- DOP Policies
CREATE TABLE dop_policies (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    organization_id BIGINT UNSIGNED NOT NULL,
    department_id BIGINT UNSIGNED NULL,
    project_id BIGINT UNSIGNED NULL,
    approval_type_id BIGINT UNSIGNED NOT NULL,
    valid_from_date DATE NOT NULL,
    valid_upto_date DATE NOT NULL,
    value_from DECIMAL(18,2) NOT NULL,
    value_to DECIMAL(18,2) NOT NULL,
    final_approval_level INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    FOREIGN KEY fk_dop_org (organization_id) REFERENCES organizations(id) ON DELETE RESTRICT,
    FOREIGN KEY fk_dop_dept (department_id) REFERENCES departments(id) ON DELETE CASCADE,
    FOREIGN KEY fk_dop_proj (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY fk_dop_type (approval_type_id) REFERENCES approval_types(id) ON DELETE CASCADE,
    INDEX idx_dop_dates (valid_from_date, valid_upto_date),
    INDEX idx_dop_value (value_from, value_to),
    INDEX idx_dop_org (organization_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- APPROVAL REQUEST TABLES
-- ============================================

-- Approval Requests
CREATE TABLE approval_requests (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    request_number VARCHAR(50) UNIQUE NOT NULL,
    organization_id BIGINT UNSIGNED NOT NULL,
    requester_id BIGINT UNSIGNED NOT NULL,
    department_id BIGINT UNSIGNED NULL,
    project_id BIGINT UNSIGNED NULL,
    wbs_id BIGINT UNSIGNED NULL,
    approval_type_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    category ENUM('FINANCIAL', 'NON_FINANCIAL') NOT NULL,
    approval_value DECIMAL(18,2) NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    vendor_name VARCHAR(255) NULL,
    customer_name VARCHAR(255) NULL,
    budget DECIMAL(18,2) NULL,
    ytd_spend DECIMAL(18,2) NULL,
    nature_of_spend VARCHAR(50) NULL,
    background_need TEXT NULL,
    status ENUM('DRAFT', 'PENDING', 'PENDING_CLARIFICATION', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED') NOT NULL,
    current_approver_id BIGINT UNSIGNED NULL,
    request_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    submitted_date DATETIME NULL,
    approved_date DATETIME NULL,
    rejected_date DATETIME NULL,
    completed_date DATETIME NULL,
    closure_remarks TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    FOREIGN KEY fk_req_org (organization_id) REFERENCES organizations(id) ON DELETE RESTRICT,
    FOREIGN KEY fk_req_requester (requester_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY fk_req_dept (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
    FOREIGN KEY fk_req_proj (project_id) REFERENCES projects(id) ON DELETE RESTRICT,
    FOREIGN KEY fk_req_wbs (wbs_id) REFERENCES wbs(id) ON DELETE RESTRICT,
    FOREIGN KEY fk_req_type (approval_type_id) REFERENCES approval_types(id) ON DELETE RESTRICT,
    FOREIGN KEY fk_req_approver (current_approver_id) REFERENCES approvers(id) ON DELETE SET NULL,
    INDEX idx_req_status (status),
    INDEX idx_req_date (request_date),
    INDEX idx_req_requester_status (requester_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Approval Request Value Break-up
CREATE TABLE approval_request_value_breakup (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    approval_request_id BIGINT UNSIGNED NOT NULL,
    sequence_number INT NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    item_description TEXT NULL,
    value DECIMAL(18,2) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_arvb_request (approval_request_id) REFERENCES approval_requests(id) ON DELETE CASCADE,
    INDEX idx_arvb_seq (approval_request_id, sequence_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Approval Workflow Steps
CREATE TABLE approval_workflow_steps (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    approval_request_id BIGINT UNSIGNED NOT NULL,
    approver_id BIGINT UNSIGNED NOT NULL,
    step_level INT NOT NULL,
    step_type ENUM('RECOMMENDATION', 'FINAL_APPROVAL') NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'RETURNED', 'CLARIFICATION_REQUESTED') NOT NULL,
    assigned_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_date DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY fk_aws_request (approval_request_id) REFERENCES approval_requests(id) ON DELETE CASCADE,
    FOREIGN KEY fk_aws_approver (approver_id) REFERENCES approvers(id) ON DELETE RESTRICT,
    INDEX idx_aws_request_level (approval_request_id, step_level),
    INDEX idx_aws_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Approval Actions
CREATE TABLE approval_actions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    approval_request_id BIGINT UNSIGNED NOT NULL,
    workflow_step_id BIGINT UNSIGNED NOT NULL,
    approver_id BIGINT UNSIGNED NOT NULL,
    action_type ENUM('APPROVE', 'REJECT', 'RETURN', 'REQUEST_CLARIFICATION', 'PROVIDE_CLARIFICATION') NOT NULL,
    comments TEXT NULL,
    rejection_reason_code VARCHAR(50) NULL,
    clarification_requested_from ENUM('REQUESTER', 'PREVIOUS_APPROVER') NULL,
    action_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY fk_aa_request (approval_request_id) REFERENCES approval_requests(id) ON DELETE CASCADE,
    FOREIGN KEY fk_aa_workflow (workflow_step_id) REFERENCES approval_workflow_steps(id) ON DELETE CASCADE,
    FOREIGN KEY fk_aa_approver (approver_id) REFERENCES approvers(id) ON DELETE RESTRICT,
    INDEX idx_aa_type (action_type),
    INDEX idx_aa_date (action_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Document Attachments
CREATE TABLE document_attachments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    organization_id BIGINT UNSIGNED NOT NULL,
    approval_request_id BIGINT UNSIGNED NULL,
    attachment_type ENUM('REQUEST', 'CLARIFICATION', 'CLOSURE') NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    stored_file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT UNSIGNED NOT NULL,
    mime_type VARCHAR(100) NULL,
    uploaded_by BIGINT UNSIGNED NOT NULL,
    uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    FOREIGN KEY fk_doc_org (organization_id) REFERENCES organizations(id) ON DELETE RESTRICT,
    FOREIGN KEY fk_doc_request (approval_request_id) REFERENCES approval_requests(id) ON DELETE CASCADE,
    FOREIGN KEY fk_doc_uploader (uploaded_by) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_doc_type (attachment_type),
    INDEX idx_doc_org (organization_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
