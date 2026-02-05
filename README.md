# 🚀 Smart Approval Management System

<div align="center">

**A comprehensive platform for managing financial and non-financial approvals**

[![Java](https://img.shields.io/badge/Java-17-orange)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen)](https://spring.io/projects/spring-boot)
[![React Native](https://img.shields.io/badge/React%20Native-Expo-blue)](https://reactnative.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

</div>

---

## 🎯 Overview

The **Smart Approval Management System** is a modern, enterprise-grade solution designed to streamline and digitize approval workflows within organizations. It provides a unified platform for managing both financial and non-financial approvals with comprehensive document management capabilities.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔄 **Unified Approval Management** | Handle both financial and non-financial approvals in one system |
| 📎 **Document Attachments** | Secure file storage and management with organization-based structure |
| 👥 **Role-Based Access Control** | Four distinct user roles: Admin, Approver, Requester, Viewer |
| ⚡ **Real-Time Status Updates** | Track approval status in real-time across all devices |
| 🏢 **Multi-Organization Support** | Support for multiple organizations with isolated data |
| 🔐 **Secure Authentication** | JWT-based authentication with Spring Security |
| 📱 **Cross-Platform Mobile App** | React Native app for iOS, Android, and Web |

---

## 🏗️ Architecture

### 🛠️ Technology Stack

#### Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 17+ | Programming language |
| **Spring Boot** | 3.2.0 | Application framework |
| **Spring Security** | Latest | Authentication & authorization |
| **Spring Data JPA** | Latest | Database access layer |
| **MySQL** | 8.0+ | Relational database |
| **Maven** | 3.6+ | Build tool |
| **JWT** | Latest | Token-based authentication |

#### Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | Latest | Mobile framework |
| **Expo** | Latest | Development platform |
| **TypeScript** | Latest | Type safety |
| **React Navigation** | Latest | Navigation library |
| **React Native Paper** | Latest | UI component library |
| **Axios** | Latest | HTTP client |

#### Storage

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Metadata** | MySQL 8.0 | Database for all application data |
| **Documents** | File System | Organization-based file storage |

## 📁 Project Structure

```
Project/
├── backend/                 # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/smartapproval/
│   │   │   │   ├── config/          # Configuration classes
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── service/         # Business logic
│   │   │   │   ├── repository/      # Data access layer
│   │   │   │   ├── model/           # Entity models
│   │   │   │   ├── dto/             # Data transfer objects
│   │   │   │   ├── mapper/          # MapStruct mappers
│   │   │   │   ├── security/        # Security configuration
│   │   │   │   ├── exception/       # Exception handlers
│   │   │   │   ├── util/            # Utility classes
│   │   │   │   └── constant/        # Constants
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── application-{profile}.yml
│   │   └── test/
│   └── pom.xml
│
├── frontend/               # React Native Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── screens/        # Screen components
│   │   ├── navigation/     # Navigation configuration
│   │   ├── services/       # API services
│   │   ├── context/        # React Context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   ├── constants/      # App constants
│   │   └── types/          # TypeScript types
│   ├── App.tsx
│   ├── package.json
│   └── app.json
│
├── storage/                # Document Storage
│   ├── documents/          # Organization-based file structure
│   │   ├── org_{id}/
│   │   │   └── approval_{id}/
│   ├── thumbnails/         # Image thumbnails
│   └── archives/           # Archived documents
│
├── docs/                   # Documentation
│   └── DRUPAL_INTEGRATION.md
│
└── README.md
```

---

## 🚀 Getting Started

### 📋 Prerequisites

#### Backend Requirements

| Tool | Version | Download |
|------|---------|----------|
| **Java** | 17+ | [Oracle](https://www.oracle.com/java/) / [OpenJDK](https://openjdk.org/) |
| **Maven** | 3.6+ | [Apache Maven](https://maven.apache.org/) |
| **MySQL** | 8.0+ | [MySQL](https://www.mysql.com/downloads/) |

#### Frontend Requirements

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | 18+ | [Node.js](https://nodejs.org/) |
| **npm** | (comes with Node.js) | Included |
| **Expo CLI** | Latest | `npm install -g expo-cli` |

#### General Requirements

- **Git** - Version control
- **Code Editor** - VS Code, IntelliJ IDEA, etc.

### ⚙️ Backend Setup

<details>
<summary><b>Click to expand backend setup instructions</b></summary>

#### Step 1: Clone Repository

```bash
git clone <repository-url>
cd Project/backend
```

#### Step 2: Database Setup

```sql
CREATE DATABASE smart_approval_db 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;
```

#### Step 3: Configure Application

**Option A: Environment Variables (Recommended)**

```bash
export DB_USERNAME=your_username
export DB_PASSWORD=your_password
export JWT_SECRET=your-secret-key-minimum-256-bits
export FILE_STORAGE_PATH=./storage/documents
```

**Option B: Configuration File**

Edit `src/main/resources/application.yml`

#### Step 4: Build and Run

```bash
mvn clean install
mvn spring-boot:run
```

**With Development Profile:**

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

#### Step 5: Verify

- ✅ Backend running: `http://localhost:8080`
- ✅ Health check: `http://localhost:8080/actuator/health`

</details>

### 📱 Frontend Setup

<details>
<summary><b>Click to expand frontend setup instructions</b></summary>

#### Step 1: Navigate to Frontend

```bash
cd frontend
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Configure API Endpoint

Edit `src/constants/config.ts` if needed:
- **Default:** `http://localhost:8080/api/v1`
- **Android Emulator:** `http://10.0.2.2:8080/api/v1`
- **Physical Device:** `http://YOUR_IP:8080/api/v1`

#### Step 4: Run Application

```bash
npm start
```

**Choose platform:**
- `a` - Android emulator/device
- `i` - iOS simulator/device
- `w` - Web browser

</details>

> 🚀 **For detailed setup instructions**, see the [Quick Start Guide](./docs/QUICK_START.md)

### 💾 Document Storage Setup

The document storage directory is created automatically. To customize:

```bash
# Set custom storage path
export FILE_STORAGE_PATH=/path/to/storage

# Create directory structure (if needed)
mkdir -p storage/documents
mkdir -p storage/thumbnails
mkdir -p storage/archives

# Set permissions (Linux/Mac)
chmod -R 755 storage/
```

> 📖 **For storage details**, see [Storage Documentation](./storage/README.md)

---

## 🔐 Environment Variables

### ⚙️ Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DB_USERNAME` | MySQL username | `root` | ✅ |
| `DB_PASSWORD` | MySQL password | `root` | ✅ |
| `DB_HOST` | MySQL host | `localhost` | ❌ |
| `DB_PORT` | MySQL port | `3306` | ❌ |
| `DB_NAME` | Database name | `smart_approval_db` | ❌ |
| `JWT_SECRET` | JWT secret key (min 256 bits) | - | ✅ (Production) |
| `FILE_STORAGE_PATH` | Document storage path | `./storage/documents` | ❌ |
| `SERVER_PORT` | Server port | `8080` | ❌ |

> ⚠️ **Security Note:** Never commit secrets to version control. Use environment variables or secret management tools in production.

### 📱 Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `API_BASE_URL` | Backend API URL | `http://localhost:8080/api/v1` | ❌ |

> 💡 **Tip:** Create a `.env` file in the frontend directory for local development

---

## 📚 API Documentation

### 🌐 Base URL

```
http://localhost:8080/api/v1
```

### 🔑 Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/login` | User authentication |
| `POST` | `/api/v1/auth/register` | User registration |
| `POST` | `/api/v1/auth/refresh` | Refresh JWT token |

### 📋 Approval Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/approvals` | List all approvals |
| `POST` | `/api/v1/approvals` | Create new approval |
| `GET` | `/api/v1/approvals/{id}` | Get approval details |
| `PUT` | `/api/v1/approvals/{id}` | Update approval |
| `POST` | `/api/v1/approvals/{id}/approve` | Approve request |
| `POST` | `/api/v1/approvals/{id}/reject` | Reject request |
| `POST` | `/api/v1/approvals/{id}/return` | Return for clarification |

### 📎 Document Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/approvals/{id}/attachments` | Upload document |
| `GET` | `/api/v1/approvals/{id}/attachments` | List attachments |
| `GET` | `/api/v1/approvals/{id}/attachments/{fileId}/download` | Download document |
| `DELETE` | `/api/v1/approvals/{id}/attachments/{fileId}` | Delete attachment |

> 📖 **For complete API documentation**, see the backend API documentation or Swagger UI (if enabled)

---

## 📄 Document Storage

### 📁 Storage Structure

Documents are organized using an organization-based hierarchical structure:

```
storage/documents/
  └── org_{organizationId}/
      └── approval_{approvalId}/
          └── {uuid}.{extension}
```

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🏢 **Organization-Based** | Files organized by organization for data isolation |
| 🔐 **Secure Access** | Files accessible only through authenticated API |
| ✅ **File Validation** | Type and size validation on upload |
| 🆔 **UUID Naming** | Prevents filename conflicts |
| 💾 **Metadata Storage** | File metadata stored in database |

### 📎 Supported File Types

| Category | Extensions |
|----------|------------|
| **Documents** | PDF, DOC, DOCX, XLS, XLSX, TXT |
| **Images** | PNG, JPG, JPEG |

### 📏 File Size Limits

- **Default:** 50MB per file
- **Configurable:** Set in `application.yml`
- **Recommendation:** Use cloud storage for larger files

> 📖 **For detailed storage information**, see [Storage Documentation](./storage/README.md)

---

## 🔄 Drupal Integration Analysis

<div align="center">

### ❌ **Recommendation: NOT Recommended**

</div>

We've analyzed Drupal integration and recommend **against** it. See [`docs/DRUPAL_INTEGRATION.md`](./docs/DRUPAL_INTEGRATION.md) for detailed analysis.

### 🚫 Why Not Drupal?

| Issue | Impact |
|-------|--------|
| **Technology Mismatch** | Adds PHP stack to Java/React Native project |
| **Performance Overhead** | Extra layer between backend and storage |
| **Complexity** | Additional infrastructure to maintain |
| **Cost** | Additional server resources and development time |

### ✅ Recommended Alternatives

| Solution | Use Case | Complexity |
|----------|----------|------------|
| **MinIO** | S3-compatible object storage | Low |
| **AWS S3 / Azure Blob** | Cloud storage for scale | Medium |
| **Current File Structure** | Small-medium deployments | Low |

> 📖 **For detailed analysis**, see [Drupal Integration Documentation](./docs/DRUPAL_INTEGRATION.md)

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📦 Building for Production

### Backend
```bash
cd backend
mvn clean package -Pprod
# JAR file will be in target/
```

### Frontend (Android)
```bash
cd frontend
expo build:android
```

### Frontend (iOS)
```bash
cd frontend
expo build:ios
```

## 🔒 Security Considerations

1. **JWT Secret**: Always use a strong secret key in production (minimum 256 bits)
2. **Database**: Use strong passwords and enable SSL connections
3. **File Upload**: Implement virus scanning in production
4. **CORS**: Configure CORS properly for production
5. **HTTPS**: Always use HTTPS in production
6. **File Access**: Files are not directly accessible; access through authenticated API

## 📈 Monitoring & Logging

- **Health Check**: `http://localhost:8080/actuator/health`
- **Metrics**: `http://localhost:8080/actuator/metrics`
- **Logs**: Located in `backend/logs/application.log`

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## 📝 License

[Specify your license here]

## 🆘 Support

For issues and questions:
- Check documentation in `docs/` folder
- Review Drupal integration analysis: `docs/DRUPAL_INTEGRATION.md`
- Contact the development team

## 🗺️ Roadmap

### Phase 1: Core Features (Current)
- ✅ Basic approval workflow
- ✅ Document attachments
- ✅ User authentication
- ✅ Role-based access

### Phase 2: Enhanced Features
- [ ] Email notifications
- [ ] Approval workflows (multi-level)
- [ ] Document preview
- [ ] Search and filters
- [ ] Reports and analytics

### Phase 3: Advanced Features
- [ ] Integration with cloud storage (MinIO/S3)
- [ ] Mobile push notifications
- [ ] Offline support
- [ ] Advanced reporting dashboard
- [ ] API rate limiting

---

**Built with ❤️ for efficient approval management**

