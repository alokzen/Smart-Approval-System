# ⚙️ Smart Approval Management System - Backend

<div align="center">

**Spring Boot REST API for the Smart Approval Management System**

[![Java](https://img.shields.io/badge/Java-17-orange)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)](https://www.mysql.com/)
[![Maven](https://img.shields.io/badge/Maven-3.6+-blue)](https://maven.apache.org/)

</div>

---

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 17+ | Programming language |
| **Spring Boot** | 3.2.0 | Application framework |
| **Spring Security** | Latest | Authentication & authorization |
| **Spring Data JPA** | Latest | Database access layer |
| **MySQL** | 8.0+ | Relational database |
| **JWT** | Latest | Token-based authentication |
| **MapStruct** | Latest | DTO mapping |
| **Lombok** | Latest | Reduce boilerplate code |
| **Maven** | 3.6+ | Build tool |

---

## 📋 Prerequisites

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| **Java** | 17+ | `java -version` |
| **Maven** | 3.6+ | `mvn -version` |
| **MySQL** | 8.0+ | `mysql --version` |

---

## 🚀 Setup Instructions

### Step 1: Database Setup

```sql
CREATE DATABASE smart_approval_db 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;
```

### Step 2: Configure Database

**Option A: Environment Variables (Recommended)**

```bash
export DB_USERNAME=your_username
export DB_PASSWORD=your_password
```

**Option B: Configuration File**

Update `src/main/resources/application.yml` with your MySQL credentials.

### Step 3: File Storage Configuration

```bash
export FILE_STORAGE_PATH=./storage/documents
```

Or update `application.yml`:
```yaml
file:
  storage:
    base-path: ./storage/documents
```

### Step 4: JWT Secret (Production)

```bash
export JWT_SECRET=your-super-secret-key-minimum-256-bits
```

> ⚠️ **Security:** Must be at least 256 bits (32 characters minimum)

### Step 5: Run the Application

**Development Mode:**
```bash
mvn spring-boot:run
```

**With Dev Profile (Auto-reload):**
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

**Production Mode:**
```bash
mvn clean package -Pprod
java -jar target/smart-approval-backend.jar
```

## Project Structure
```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/smartapproval/
│   │   │   ├── config/          # Configuration classes
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── service/         # Business logic
│   │   │   ├── repository/      # Data access layer
│   │   │   ├── model/           # Entity models
│   │   │   ├── dto/             # Data transfer objects
│   │   │   ├── mapper/          # MapStruct mappers
│   │   │   ├── security/        # Security configuration
│   │   │   ├── exception/       # Exception handlers
│   │   │   ├── util/            # Utility classes
│   │   │   └── constant/        # Constants
│   │   └── resources/
│   │       ├── application.yml
│   │       └── application-{profile}.yml
│   └── test/
└── pom.xml
```

## API Documentation
API will be available at: `http://localhost:8080/api/v1`

## Environment Variables
- `DB_USERNAME` - MySQL username
- `DB_PASSWORD` - MySQL password
- `DB_HOST` - MySQL host (default: localhost)
- `DB_PORT` - MySQL port (default: 3306)
- `DB_NAME` - Database name
- `FILE_STORAGE_PATH` - Base path for document storage
- `JWT_SECRET` - Secret key for JWT tokens
- `SERVER_PORT` - Server port (default: 8080)

