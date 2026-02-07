# Database Design Document
## Smart Approval Management System

**Version:** 1.0  
**Date:** January 2025  
**Database:** MySQL 8.0 Community Edition

---

## Table of Contents

1. [Overview](#overview)
2. [Database Conventions](#database-conventions)
3. [Entity Relationship Diagram](#entity-relationship-diagram)
4. [Table Specifications](#table-specifications)
5. [Relationships and Foreign Keys](#relationships-and-foreign-keys)
6. [Indexes](#indexes)
7. [Constraints](#constraints)
8. [Data Dictionary](#data-dictionary)
9. [Sample Queries](#sample-queries)

---

## 1. Overview

### 1.1 Database Purpose
The database stores all data related to approval requests, master data, user information, DOP policies, and workflow history for the Smart Approval Management System.

### 1.2 Database Characteristics
- **DBMS:** MySQL 8.0 Community Edition
- **Character Set:** utf8mb4
- **Collation:** utf8mb4_unicode_ci
- **Storage Engine:** InnoDB
- **Naming Convention:** snake_case for tables and columns

### 1.3 Design Principles
- Normalized to 3NF (Third Normal Form)
- Referential integrity enforced
- Audit fields on all transactional tables
- Soft delete pattern (is_active flag)
- Optimized for read and write operations

---

## 2. Database Conventions

### 2.1 Naming Conventions
- **Tables:** Plural, lowercase, snake_case (e.g., `approval_requests`)
- **Columns:** Singular, lowercase, snake_case (e.g., `request_number`)
- **Primary Keys:** `id` (auto-increment)
- **Foreign Keys:** `{table_name}_id` (e.g., `department_id`)
- **Boolean Fields:** `is_{attribute}` (e.g., `is_active`)
- **Timestamps:** `created_at`, `updated_at`
- **Status Fields:** `status` (enum or varchar)

### 2.2 Data Types
- **IDs:** BIGINT UNSIGNED
- **Codes:** VARCHAR(50)
- **Names/Titles:** VARCHAR(255)
- **Descriptions:** TEXT
- **Amounts:** DECIMAL(18,2)
- **Dates:** DATE
- **DateTimes:** DATETIME
- **Booleans:** TINYINT(1) or BOOLEAN
- **Status:** ENUM or VARCHAR(20)

### 2.3 Common Fields
All tables include:
- `id` BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT
- `created_at` DATETIME NOT NULL
- `updated_at` DATETIME NOT NULL
- `is_active` TINYINT(1) DEFAULT 1

---

## 3. Entity Relationship Diagram

### 3.1 Core Entities

```
ORGANIZATIONS
    |
    +-- DEPARTMENTS
    |       |
    |       +-- COST_CENTERS (one-to-many)
    |       |
    |       +-- APPROVERS (via approver_departments)
    |       |
    |       +-- APPROVAL_TYPES
    |       |
    |       +-- DOP_POLICIES
    |
    +-- PROJECTS
    |       |
    |       +-- WBS (hierarchical)
    |       |
    |       +-- APPROVERS (via approver_projects)
    |       |
    |       +-- APPROVAL_TYPES
    |       |
    |       +-- DOP_POLICIES
    |
    +-- USERS
    |       |
    |       +-- USER_ROLE_ASSIGNMENTS (many-to-many)
    |       |
    |       +-- USER_AUTHORIZATIONS
    |       |
    |       +-- APPROVAL_REQUESTS (as requester)
    |
    +-- APPROVAL_REQUESTS
            |
            +-- APPROVAL_WORKFLOW_STEPS
            |       |
            |       +-- APPROVAL_ACTIONS
            |
            +-- VALUE_BREAKUP_ITEMS
            |
            +-- DOCUMENT_ATTACHMENTS
```

### 3.2 Relationship Types

1. **One-to-Many:**
   - Organization → Departments
   - Organization → Projects
   - Department → Cost Centers
   - Department → Approval Types
   - Project → WBS
   - Approval Request → Workflow Steps
   - Approval Request → Value Break-up Items
   - Approval Request → Document Attachments

2. **Many-to-Many:**
   - Users ↔ Roles (via user_role_assignments)
   - Departments ↔ Approvers
   - Projects ↔ Approvers
   - Users ↔ Departments/Projects/WBS (Authorizations)

3. **Self-Referential:**
   - WBS (parent-child hierarchy)

---

## 4. Table Specifications

### 4.1 Master Data Tables

#### Table: organizations
**Purpose:** Store organization information

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Organization ID |
| code | VARCHAR(50) | UNIQUE, NOT NULL | Organization code |
| name | VARCHAR(255) | NOT NULL | Organization name |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |
| is_active | TINYINT(1) | DEFAULT 1 | Active status |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_org_code (code)

---

#### Table: departments
**Purpose:** Store department information

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Department ID |
| organization_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Organization reference |
| code | VARCHAR(50) | NOT NULL | Department code |
| name | VARCHAR(255) | NOT NULL | Department name |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |
| is_active | TINYINT(1) | DEFAULT 1 | Active status |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_dept_org_code (organization_id, code)
- FOREIGN KEY fk_dept_org (organization_id) REFERENCES organizations(id)

---

#### Table: cost_centers
**Purpose:** Store cost center information

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Cost Center ID |
| organization_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Organization reference |
| department_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Department reference |
| code | VARCHAR(50) | NOT NULL | Cost center code |
| name | VARCHAR(255) | NOT NULL | Cost center name |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |
| is_active | TINYINT(1) | DEFAULT 1 | Active status |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_cc_dept_code (department_id, code)
- FOREIGN KEY fk_cc_org (organization_id) REFERENCES organizations(id)
- FOREIGN KEY fk_cc_dept (department_id) REFERENCES departments(id)

---

#### Table: projects
**Purpose:** Store project information

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Project ID |
| organization_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Organization reference |
| code | VARCHAR(50) | NOT NULL | Project code |
| name | VARCHAR(255) | NOT NULL | Project name |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |
| is_active | TINYINT(1) | DEFAULT 1 | Active status |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_proj_org_code (organization_id, code)
- FOREIGN KEY fk_proj_org (organization_id) REFERENCES organizations(id)

---

#### Table: wbs
**Purpose:** Store Work Breakdown Structure (hierarchical)

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | WBS ID |
| project_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Project reference |
| parent_wbs_id | BIGINT UNSIGNED | FOREIGN KEY, NULL | Parent WBS (for hierarchy) |
| code | VARCHAR(50) | NOT NULL | WBS code |
| name | VARCHAR(255) | NOT NULL | WBS name |
| level | INT | NOT NULL | Hierarchy level (1, 2, 3...) |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |
| is_active | TINYINT(1) | DEFAULT 1 | Active status |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_wbs_proj_code (project_id, code)
- FOREIGN KEY fk_wbs_proj (project_id) REFERENCES projects(id)
- FOREIGN KEY fk_wbs_parent (parent_wbs_id) REFERENCES wbs(id)

---

### 4.2 User and Authorization Tables

#### Table: users
**Purpose:** Store user information

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | User ID |
| organization_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Organization reference |
| employee_number | VARCHAR(50) | UNIQUE, NOT NULL | Employee number |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Email address |
| password_hash | VARCHAR(255) | NOT NULL | Encrypted password |
| first_name | VARCHAR(100) | NOT NULL | First name |
| last_name | VARCHAR(100) | NOT NULL | Last name |
| designation | VARCHAR(100) | NULL | Job designation |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |
| is_active | TINYINT(1) | DEFAULT 1 | Active status |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_user_email (email)
- UNIQUE KEY uk_user_emp_no (employee_number)
- FOREIGN KEY fk_user_org (organization_id) REFERENCES organizations(id)

**Note:** User roles are managed through the `user_role_assignments` table to support multiple roles per user.

---

#### Table: user_role_assignments
**Purpose:** Assign multiple roles to users (many-to-many relationship)

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Assignment ID |
| user_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | User reference |
| role | ENUM | NOT NULL | User role (ADMIN, APPROVER, REQUESTER, VIEWER) |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |
| is_active | TINYINT(1) | DEFAULT 1 | Active status |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_ura_user_role (user_id, role)
- FOREIGN KEY fk_ura_user (user_id) REFERENCES users(id) ON DELETE CASCADE
- INDEX idx_ura_user (user_id)
- INDEX idx_ura_role (role)

**Business Rules:**
- A user can have multiple roles (e.g., both REQUESTER and APPROVER)
- The combination of user_id and role must be unique
- Roles can be activated/deactivated using the is_active flag

---

#### Table: approvers
**Purpose:** Store approver information

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Approver ID |
| user_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | User reference |
| employee_number | VARCHAR(50) | NOT NULL | Employee number |
| name | VARCHAR(255) | NOT NULL | Approver name |
| designation | VARCHAR(100) | NOT NULL | Designation |
| approval_level | INT | NOT NULL | Approval level (1, 2, 3...) |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |
| is_active | TINYINT(1) | DEFAULT 1 | Active status |

**Indexes:**
- PRIMARY KEY (id)
- FOREIGN KEY fk_approver_user (user_id) REFERENCES users(id)
- INDEX idx_approver_level (approval_level)

---

#### Table: approver_departments
**Purpose:** Link approvers to departments and cost centers

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Link ID |
| organization_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Organization reference |
| approver_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Approver reference |
| department_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Department reference |
| cost_center_id | BIGINT UNSIGNED | FOREIGN KEY, NULL | Cost center reference (optional) |
| created_at | DATETIME | NOT NULL | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_appr_dept (approver_id, department_id, cost_center_id)
- FOREIGN KEY fk_appr_dept_org (organization_id) REFERENCES organizations(id)
- FOREIGN KEY fk_appr_dept_appr (approver_id) REFERENCES approvers(id)
- FOREIGN KEY fk_appr_dept_dept (department_id) REFERENCES departments(id)
- FOREIGN KEY fk_appr_dept_cc (cost_center_id) REFERENCES cost_centers(id)
- INDEX idx_appr_dept_org (organization_id)
- INDEX idx_appr_dept_cc (cost_center_id)

**Business Rules:**
- An approver can be assigned to a department with or without a specific cost center
- If cost_center_id is provided, it must belong to the specified department
- Organization ID is required for data isolation and reporting

---

#### Table: approver_projects
**Purpose:** Link approvers to projects

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Link ID |
| organization_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Organization reference |
| approver_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Approver reference |
| project_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Project reference |
| created_at | DATETIME | NOT NULL | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_appr_proj (approver_id, project_id)
- FOREIGN KEY fk_appr_proj_org (organization_id) REFERENCES organizations(id)
- FOREIGN KEY fk_appr_proj_appr (approver_id) REFERENCES approvers(id)
- FOREIGN KEY fk_appr_proj_proj (project_id) REFERENCES projects(id)
- INDEX idx_appr_proj_org (organization_id)

**Business Rules:**
- Organization ID is required for data isolation and reporting
- An approver can be assigned to multiple projects

---

#### Table: user_authorizations
**Purpose:** Store user authorizations for departments/projects/WBS

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Authorization ID |
| user_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | User reference |
| department_id | BIGINT UNSIGNED | FOREIGN KEY, NULL | Department reference |
| project_id | BIGINT UNSIGNED | FOREIGN KEY, NULL | Project reference |
| wbs_id | BIGINT UNSIGNED | FOREIGN KEY, NULL | WBS reference |
| authorization_type | ENUM | NOT NULL | Type (CREATE, VIEW, APPROVE) |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |
| is_active | TINYINT(1) | DEFAULT 1 | Active status |

**Indexes:**
- PRIMARY KEY (id)
- FOREIGN KEY fk_ua_user (user_id) REFERENCES users(id)
- FOREIGN KEY fk_ua_dept (department_id) REFERENCES departments(id)
- FOREIGN KEY fk_ua_proj (project_id) REFERENCES projects(id)
- FOREIGN KEY fk_ua_wbs (wbs_id) REFERENCES wbs(id)
- INDEX idx_ua_user_type (user_id, authorization_type)

**Constraints:**
- CHECK: At least one of department_id, project_id, or wbs_id must be NOT NULL

---

### 4.3 Approval Type and DOP Tables

#### Table: approval_types
**Purpose:** Store approval type configurations

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Approval Type ID |
| organization_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Organization reference |
| department_id | BIGINT UNSIGNED | FOREIGN KEY, NULL | Department reference |
| project_id | BIGINT UNSIGNED | FOREIGN KEY, NULL | Project reference |
| code | VARCHAR(50) | NOT NULL | Approval type code |
| name | VARCHAR(255) | NOT NULL | Approval type name |
| description | TEXT | NULL | Description |
| nature | ENUM | NOT NULL | Nature (FINANCIAL, NON_FINANCIAL) |
| include_vendor_name | TINYINT(1) | DEFAULT 0 | Include vendor name field |
| include_customer_name | TINYINT(1) | DEFAULT 0 | Include customer name field |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |
| is_active | TINYINT(1) | DEFAULT 1 | Active status |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_at_dept_proj_code (department_id, project_id, code)
- FOREIGN KEY fk_at_org (organization_id) REFERENCES organizations(id)
- FOREIGN KEY fk_at_dept (department_id) REFERENCES departments(id)
- FOREIGN KEY fk_at_proj (project_id) REFERENCES projects(id)
- INDEX idx_at_nature (nature)
- INDEX idx_at_org (organization_id)

**Constraints:**
- CHECK: At least one of department_id or project_id must be NOT NULL

---

#### Table: approval_type_value_breakup
**Purpose:** Store value break-up template for approval types

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Break-up ID |
| approval_type_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Approval type reference |
| sequence_number | INT | NOT NULL | Sequence number |
| item_name | VARCHAR(255) | NOT NULL | Item name |
| item_description | TEXT | NULL | Item description |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_atvb_type_seq (approval_type_id, sequence_number)
- FOREIGN KEY fk_atvb_type (approval_type_id) REFERENCES approval_types(id)

---

#### Table: dop_policies
**Purpose:** Store Delegation of Power policies

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | DOP Policy ID |
| organization_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Organization reference |
| department_id | BIGINT UNSIGNED | FOREIGN KEY, NULL | Department reference |
| project_id | BIGINT UNSIGNED | FOREIGN KEY, NULL | Project reference |
| approval_type_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Approval type reference |
| valid_from_date | DATE | NOT NULL | Policy valid from |
| valid_upto_date | DATE | NOT NULL | Policy valid upto |
| value_from | DECIMAL(18,2) | NOT NULL | Value range from |
| value_to | DECIMAL(18,2) | NOT NULL | Value range to |
| final_approval_level | INT | NOT NULL | Final approval level required |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |
| is_active | TINYINT(1) | DEFAULT 1 | Active status |

**Indexes:**
- PRIMARY KEY (id)
- FOREIGN KEY fk_dop_org (organization_id) REFERENCES organizations(id)
- FOREIGN KEY fk_dop_dept (department_id) REFERENCES departments(id)
- FOREIGN KEY fk_dop_proj (project_id) REFERENCES projects(id)
- FOREIGN KEY fk_dop_type (approval_type_id) REFERENCES approval_types(id)
- INDEX idx_dop_dates (valid_from_date, valid_upto_date)
- INDEX idx_dop_value (value_from, value_to)
- INDEX idx_dop_org (organization_id)

**Constraints:**
- CHECK: value_to > value_from
- CHECK: valid_upto_date > valid_from_date
- CHECK: At least one of department_id or project_id must be NOT NULL

---

### 4.4 Approval Request Tables

#### Table: approval_requests
**Purpose:** Store approval requests

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Request ID |
| request_number | VARCHAR(50) | UNIQUE, NOT NULL | Auto-generated request number |
| organization_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Organization reference |
| requester_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Requester user reference |
| department_id | BIGINT UNSIGNED | FOREIGN KEY, NULL | Department reference |
| project_id | BIGINT UNSIGNED | FOREIGN KEY, NULL | Project reference |
| wbs_id | BIGINT UNSIGNED | FOREIGN KEY, NULL | WBS reference |
| approval_type_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Approval type reference |
| title | VARCHAR(255) | NOT NULL | Approval title |
| category | ENUM | NOT NULL | Category (FINANCIAL, NON_FINANCIAL) |
| approval_value | DECIMAL(18,2) | NULL | Approval value (for Financial) |
| currency | VARCHAR(10) | DEFAULT 'INR' | Currency code |
| vendor_name | VARCHAR(255) | NULL | Vendor name |
| customer_name | VARCHAR(255) | NULL | Customer name |
| budget | DECIMAL(18,2) | NULL | Budget amount |
| ytd_spend | DECIMAL(18,2) | NULL | Year to date spend |
| nature_of_spend | VARCHAR(50) | NULL | Nature (Sustenance/Growth/Improvement) |
| background_need | TEXT | NULL | Background and need description |
| status | ENUM | NOT NULL | Status (DRAFT, PENDING, PENDING_CLARIFICATION, APPROVED, REJECTED, COMPLETED, CANCELLED) |
| current_approver_id | BIGINT UNSIGNED | FOREIGN KEY, NULL | Current approver |
| request_date | DATETIME | NOT NULL | Request creation date |
| submitted_date | DATETIME | NULL | Submission date |
| approved_date | DATETIME | NULL | Final approval date |
| rejected_date | DATETIME | NULL | Rejection date |
| completed_date | DATETIME | NULL | Completion date |
| closure_remarks | TEXT | NULL | Closure remarks |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |
| is_active | TINYINT(1) | DEFAULT 1 | Active status |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_req_number (request_number)
- FOREIGN KEY fk_req_org (organization_id) REFERENCES organizations(id)
- FOREIGN KEY fk_req_requester (requester_id) REFERENCES users(id)
- FOREIGN KEY fk_req_dept (department_id) REFERENCES departments(id)
- FOREIGN KEY fk_req_proj (project_id) REFERENCES projects(id)
- FOREIGN KEY fk_req_wbs (wbs_id) REFERENCES wbs(id)
- FOREIGN KEY fk_req_type (approval_type_id) REFERENCES approval_types(id)
- FOREIGN KEY fk_req_approver (current_approver_id) REFERENCES approvers(id)
- INDEX idx_req_status (status)
- INDEX idx_req_date (request_date)
- INDEX idx_req_requester_status (requester_id, status)

---

#### Table: approval_request_value_breakup
**Purpose:** Store value break-up for approval requests

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Break-up ID |
| approval_request_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Approval request reference |
| sequence_number | INT | NOT NULL | Sequence number |
| item_name | VARCHAR(255) | NOT NULL | Item name |
| item_description | TEXT | NULL | Item description |
| value | DECIMAL(18,2) | NOT NULL | Item value |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- FOREIGN KEY fk_arvb_request (approval_request_id) REFERENCES approval_requests(id) ON DELETE CASCADE
- INDEX idx_arvb_seq (approval_request_id, sequence_number)

---

#### Table: approval_workflow_steps
**Purpose:** Store workflow steps for approval requests

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Workflow Step ID |
| approval_request_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Approval request reference |
| approver_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Approver reference |
| step_level | INT | NOT NULL | Step level (1, 2, 3...) |
| step_type | ENUM | NOT NULL | Type (RECOMMENDATION, FINAL_APPROVAL) |
| status | ENUM | NOT NULL | Status (PENDING, APPROVED, REJECTED, RETURNED, CLARIFICATION_REQUESTED) |
| assigned_date | DATETIME | NOT NULL | Assignment date |
| completed_date | DATETIME | NULL | Completion date |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- FOREIGN KEY fk_aws_request (approval_request_id) REFERENCES approval_requests(id) ON DELETE CASCADE
- FOREIGN KEY fk_aws_approver (approver_id) REFERENCES approvers(id)
- INDEX idx_aws_request_level (approval_request_id, step_level)
- INDEX idx_aws_status (status)

---

#### Table: approval_actions
**Purpose:** Store all approval actions (approve, reject, return, clarification)

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Action ID |
| approval_request_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Approval request reference |
| workflow_step_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Workflow step reference |
| approver_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Approver reference |
| action_type | ENUM | NOT NULL | Action (APPROVE, REJECT, RETURN, REQUEST_CLARIFICATION, PROVIDE_CLARIFICATION) |
| comments | TEXT | NULL | Comments/remarks |
| rejection_reason_code | VARCHAR(50) | NULL | Rejection reason code |
| clarification_requested_from | ENUM | NULL | Clarification from (REQUESTER, PREVIOUS_APPROVER) |
| action_date | DATETIME | NOT NULL | Action date |
| created_at | DATETIME | NOT NULL | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- FOREIGN KEY fk_aa_request (approval_request_id) REFERENCES approval_requests(id) ON DELETE CASCADE
- FOREIGN KEY fk_aa_workflow (workflow_step_id) REFERENCES approval_workflow_steps(id)
- FOREIGN KEY fk_aa_approver (approver_id) REFERENCES approvers(id)
- INDEX idx_aa_type (action_type)
- INDEX idx_aa_date (action_date)

---

#### Table: document_attachments
**Purpose:** Store document attachment metadata

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | BIGINT UNSIGNED | PRIMARY KEY, AUTO_INCREMENT | Attachment ID |
| organization_id | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | Organization reference |
| approval_request_id | BIGINT UNSIGNED | FOREIGN KEY, NULL | Approval request reference |
| attachment_type | ENUM | NOT NULL | Type (REQUEST, CLARIFICATION, CLOSURE) |
| file_name | VARCHAR(255) | NOT NULL | Original file name |
| stored_file_name | VARCHAR(255) | NOT NULL | Stored file name (UUID) |
| file_path | VARCHAR(500) | NOT NULL | File storage path |
| file_size | BIGINT UNSIGNED | NOT NULL | File size in bytes |
| mime_type | VARCHAR(100) | NULL | MIME type |
| uploaded_by | BIGINT UNSIGNED | FOREIGN KEY, NOT NULL | User who uploaded |
| uploaded_at | DATETIME | NOT NULL | Upload timestamp |
| created_at | DATETIME | NOT NULL | Creation timestamp |
| updated_at | DATETIME | NOT NULL | Update timestamp |
| is_active | TINYINT(1) | DEFAULT 1 | Active status |

**Indexes:**
- PRIMARY KEY (id)
- FOREIGN KEY fk_doc_org (organization_id) REFERENCES organizations(id)
- FOREIGN KEY fk_doc_request (approval_request_id) REFERENCES approval_requests(id) ON DELETE CASCADE
- FOREIGN KEY fk_doc_uploader (uploaded_by) REFERENCES users(id)
- INDEX idx_doc_type (attachment_type)
- INDEX idx_doc_org (organization_id)

---

## 5. Relationships and Foreign Keys

### 5.1 Foreign Key Relationships

All foreign keys are defined with appropriate constraints:
- **ON DELETE RESTRICT**: For master data (prevents deletion if referenced)
- **ON DELETE CASCADE**: For child records (deletes when parent deleted)

### 5.2 Key Relationships Summary

1. **Organization Hierarchy:**
   - organizations → departments (1:N)
   - organizations → projects (1:N)
   - organizations → users (1:N)

2. **Department/Project Structure:**
   - departments → cost_centers (1:N)
   - projects → wbs (1:N, hierarchical)

3. **Approval Type Configuration:**
   - departments → approval_types (1:N)
   - projects → approval_types (1:N)
   - approval_types → approval_type_value_breakup (1:N)
   - approval_types → dop_policies (1:N)

4. **User and Authorization:**
   - users ↔ roles (M:N via user_role_assignments)
   - users → approvers (1:1)
   - approvers ↔ departments (M:N via approver_departments)
   - approvers ↔ projects (M:N via approver_projects)
   - users → user_authorizations (1:N)

5. **Approval Request Flow:**
   - approval_requests → approval_request_value_breakup (1:N)
   - approval_requests → approval_workflow_steps (1:N)
   - approval_requests → document_attachments (1:N)
   - approval_workflow_steps → approval_actions (1:N)

---

## 6. Indexes

### 6.1 Primary Indexes
All tables have PRIMARY KEY on `id` column.

### 6.2 Unique Indexes
- Organization codes
- Department codes (within organization)
- Project codes (within organization)
- WBS codes (within project)
- User email and employee number
- Approval request number
- Composite unique keys for business rules

### 6.3 Performance Indexes
- Status columns for filtering
- Date columns for sorting and range queries
- Foreign key columns for joins
- Composite indexes for common query patterns

### 6.4 Index Strategy
- Indexes on frequently queried columns
- Composite indexes for multi-column queries
- Covering indexes for read-heavy operations
- Regular index maintenance and optimization

---

## 7. Constraints

### 7.1 Check Constraints

1. **DOP Policies:**
   - `value_to > value_from`
   - `valid_upto_date > valid_from_date`

2. **Approval Requests:**
   - Financial approvals must have approval_value
   - Value break-up total must equal approval_value

3. **User Authorizations:**
   - At least one of department_id, project_id, or wbs_id must be NOT NULL

4. **Approval Types:**
   - At least one of department_id or project_id must be NOT NULL

### 7.2 Business Rule Constraints

1. **Request Number Format:**
   - Format: REQ-YYYY-XXXXX (e.g., REQ-2025-00001)
   - Auto-generated, sequential

2. **Status Transitions:**
   - DRAFT → PENDING → PENDING_CLARIFICATION → APPROVED/REJECTED → COMPLETED
   - Enforced at application level

3. **DOP Policy Validation:**
   - Only one active DOP policy per Department/Project/Approval Type/Value Range
   - Enforced at application level

---

## 8. Data Dictionary

### 8.1 Status Enums

**approval_requests.status:**
- `DRAFT`: Request saved but not submitted
- `PENDING`: Request submitted, awaiting approval
- `PENDING_CLARIFICATION`: Clarification requested
- `APPROVED`: Final approval granted
- `REJECTED`: Request rejected
- `COMPLETED`: Closure updated after approval
- `CANCELLED`: Request cancelled by requester

**approval_workflow_steps.status:**
- `PENDING`: Step pending action
- `APPROVED`: Step approved
- `REJECTED`: Step rejected
- `RETURNED`: Step returned for modification
- `CLARIFICATION_REQUESTED`: Clarification requested

**approval_actions.action_type:**
- `APPROVE`: Approval action
- `REJECT`: Rejection action
- `RETURN`: Return for modification
- `REQUEST_CLARIFICATION`: Request clarification
- `PROVIDE_CLARIFICATION`: Provide clarification response

**user_role_assignments.role:**
- `ADMIN`: Administrator
- `APPROVER`: Approver
- `REQUESTER`: Requester
- `VIEWER`: Read-only viewer

**Note:** Users can have multiple roles assigned through the `user_role_assignments` table. A user can be both a REQUESTER and an APPROVER, for example.

**approval_types.nature:**
- `FINANCIAL`: Financial approval
- `NON_FINANCIAL`: Non-financial approval

---

## 9. Sample Queries

### 9.1 Get Pending Approvals for User
```sql
SELECT 
    ar.id,
    ar.request_number,
    ar.title,
    ar.approval_value,
    ar.request_date,
    u.first_name,
    u.last_name,
    d.name AS department_name
FROM approval_requests ar
INNER JOIN approval_workflow_steps aws ON ar.id = aws.approval_request_id
INNER JOIN approvers a ON aws.approver_id = a.id
INNER JOIN users u ON ar.requester_id = u.id
LEFT JOIN departments d ON ar.department_id = d.id
WHERE a.user_id = ? 
  AND aws.status = 'PENDING'
  AND ar.status = 'PENDING'
ORDER BY ar.request_date DESC;
```

### 9.2 Get DOP Policy for Approval
```sql
SELECT 
    dp.id,
    dp.value_from,
    dp.value_to,
    dp.final_approval_level
FROM dop_policies dp
WHERE dp.approval_type_id = ?
  AND (dp.department_id = ? OR dp.department_id IS NULL)
  AND (dp.project_id = ? OR dp.project_id IS NULL)
  AND ? BETWEEN dp.value_from AND dp.value_to
  AND CURDATE() BETWEEN dp.valid_from_date AND dp.valid_upto_date
  AND dp.is_active = 1
ORDER BY dp.value_from;
```

### 9.3 Get Approval Request with Full Details
```sql
SELECT 
    ar.*,
    at.name AS approval_type_name,
    at.nature AS approval_nature,
    u.first_name AS requester_first_name,
    u.last_name AS requester_last_name,
    d.name AS department_name,
    p.name AS project_name
FROM approval_requests ar
INNER JOIN approval_types at ON ar.approval_type_id = at.id
INNER JOIN users u ON ar.requester_id = u.id
LEFT JOIN departments d ON ar.department_id = d.id
LEFT JOIN projects p ON ar.project_id = p.id
WHERE ar.id = ?;
```

### 9.4 Get Approval Workflow History
```sql
SELECT 
    aws.step_level,
    aws.step_type,
    aws.status,
    a.name AS approver_name,
    a.designation,
    aa.action_type,
    aa.comments,
    aa.action_date
FROM approval_workflow_steps aws
INNER JOIN approvers a ON aws.approver_id = a.id
LEFT JOIN approval_actions aa ON aws.id = aa.workflow_step_id
WHERE aws.approval_request_id = ?
ORDER BY aws.step_level, aa.action_date;
```

---

## 10. Database Maintenance

### 10.1 Backup Strategy
- Daily full backups
- Transaction log backups every 6 hours
- Retention: 30 days

### 10.2 Archival Strategy
- Archive completed approvals older than 2 years
- Archive rejected/cancelled approvals older than 1 year
- Maintain archive tables for historical reporting

### 10.3 Performance Optimization
- Regular index maintenance
- Query optimization
- Partitioning for large tables (future)
- Connection pooling

---

## Document Approval

**Prepared By:** Development Team  
**Reviewed By:** [To be filled]  
**Approved By:** [To be filled]  
**Version:** 1.0  
**Date:** January 2025
