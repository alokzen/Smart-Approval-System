# 💾 Document Storage Structure

<div align="center">

**Document storage organization for the Smart Approval Management System**

[![Storage](https://img.shields.io/badge/Storage-Organization%20Based-blue)](./README.md)
[![Structure](https://img.shields.io/badge/Structure-Hierarchical-green)](./README.md)

</div>

---

## 📁 Directory Structure

```
storage/
├── documents/                    # Main document storage
│   ├── org_1/                   # Organization 1
│   │   ├── approval_1/          # Approval ID 1
│   │   │   ├── {uuid}.pdf
│   │   │   ├── {uuid}.docx
│   │   │   └── metadata.json
│   │   ├── approval_2/
│   │   │   └── ...
│   │   └── ...
│   ├── org_2/                   # Organization 2
│   │   └── ...
│   └── temp/                    # Temporary uploads
│       └── (cleaned periodically)
├── thumbnails/                  # Image thumbnails
│   └── org_1/
│       └── approval_1/
│           └── thumbnail_*.jpg
└── archives/                    # Archived documents
    └── org_1/
        └── 2024/
            └── 01/
```

---

## 🏢 Organization-Based Structure

Documents are organized hierarchically:

| Level | Pattern | Description |
|-------|---------|-------------|
| **1. Organization** | `org_{organizationId}` | Top-level organization folder |
| **2. Approval** | `approval_{approvalId}` | Approval-specific folder |
| **3. Files** | `{UUID}.{extension}` | Unique file names |

### 📝 File Naming Convention

- **Format:** `{UUID}.{extension}`
- **Example:** `a1b2c3d4-e5f6-7890-abcd-ef1234567890.pdf`
- **Original Name:** Stored in database metadata
- **Purpose:** Prevents filename conflicts and ensures uniqueness

---

## 📄 Metadata File

Each approval folder contains a `metadata.json` file with file information:

```json
{
  "approvalId": 1,
  "organizationId": 1,
  "files": [
    {
      "id": 1,
      "originalName": "invoice.pdf",
      "storedName": "a1b2c3d4-e5f6-7890-abcd-ef1234567890.pdf",
      "size": 2048576,
      "mimeType": "application/pdf",
      "uploadedAt": "2024-01-15T10:30:00Z",
      "uploadedBy": 5
    }
  ]
}
```

> 💡 **Note:** Primary metadata is stored in the database. This file is for reference.

---

## ⚙️ Storage Configuration

Configure in `backend/src/main/resources/application.yml`:

```yaml
file:
  storage:
    base-path: ./storage/documents
    max-size-mb: 50
    allowed-extensions: pdf,doc,docx,xls,xlsx,png,jpg,jpeg,txt
    organization-based-structure: true
```

**Or via environment variable:**
```bash
export FILE_STORAGE_PATH=./storage/documents
```

---

## 💾 Backup Recommendations

| Strategy | Frequency | Description |
|----------|-----------|-------------|
| **Regular Backups** | Daily | Schedule automated backups of `storage/` directory |
| **Versioning** | As needed | Implement file versioning for important documents |
| **Compression** | Monthly | Archive old approvals to reduce storage costs |
| **Cloud Storage** | Production | Mount cloud storage (AWS S3, Azure Blob, etc.) |

---

## 🔐 Security

| Feature | Implementation |
|---------|----------------|
| **Access Control** | Files accessible only through authenticated API |
| **File Validation** | Type and size validation on upload |
| **Virus Scanning** | Recommended for production environments |
| **Direct Access** | Files not directly accessible via HTTP |

---

## ☁️ Migration to Cloud Storage

For production scalability, consider migrating to:

| Solution | Type | Use Case |
|----------|------|----------|
| **AWS S3** | Cloud | Enterprise, high scale |
| **Azure Blob Storage** | Cloud | Microsoft ecosystem |
| **Google Cloud Storage** | Cloud | Google ecosystem |
| **MinIO** | Self-hosted | S3-compatible, on-premise |

> 💡 **Note:** The backend is designed to support pluggable storage implementations.

---

## 📚 Additional Resources

- 📖 [Main README](../README.md) - Complete project overview
- 🔗 [Drupal Integration Analysis](../docs/DRUPAL_INTEGRATION.md) - Storage alternatives
- 🗄️ [Database Design](../docs/DATABASE_DESIGN.md) - Metadata schema

