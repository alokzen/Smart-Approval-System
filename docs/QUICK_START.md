# 🚀 Quick Start Guide

<div align="center">

**Get up and running with the Smart Approval Management System in minutes**

[![Setup Time](https://img.shields.io/badge/Setup%20Time-~8%20minutes-blue)](./QUICK_START.md)
[![Difficulty](https://img.shields.io/badge/Difficulty-Beginner-green)](./QUICK_START.md)

</div>

---

## ✅ Prerequisites Checklist

Before you begin, ensure you have the following installed:

| Requirement | Version | How to Check |
|-------------|---------|--------------|
| **Java** | 17+ | `java -version` |
| **Maven** | 3.6+ | `mvn -version` |
| **MySQL** | 8.0+ | `mysql --version` |
| **Node.js** | 18+ | `node -v` |
| **npm** | (comes with Node.js) | `npm -v` |
| **Expo CLI** | Latest | `expo --version` |

### 📦 Installing Missing Prerequisites

<details>
<summary><b>Install Expo CLI</b></summary>

```bash
npm install -g expo-cli
```

</details>

---

## ⚙️ Backend Setup (~5 minutes)

### Step 1: Database Setup

<details>
<summary><b>Click to expand database setup instructions</b></summary>

Connect to MySQL and run:

```sql
CREATE DATABASE smart_approval_db 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

CREATE USER 'smartapproval'@'localhost' 
  IDENTIFIED BY 'your_password';

GRANT ALL PRIVILEGES ON smart_approval_db.* 
  TO 'smartapproval'@'localhost';

FLUSH PRIVILEGES;
```

> 💡 **Tip:** Replace `your_password` with a strong password

</details>

### Step 2: Configure Backend

**Option A: Environment Variables (Recommended)**

```bash
export DB_USERNAME=smartapproval
export DB_PASSWORD=your_password
export JWT_SECRET=your-super-secret-key-minimum-256-bits-change-this
export FILE_STORAGE_PATH=./storage/documents
```

**Option B: Edit Configuration File**

Edit `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    username: smartapproval
    password: your_password

jwt:
  secret: your-super-secret-key-minimum-256-bits-change-this

file:
  storage:
    base-path: ./storage/documents
```

> ⚠️ **Security Note:** Never commit secrets to version control. Use environment variables in production.

### Step 3: Build and Run

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**✅ Verification:**

Visit `http://localhost:8080/actuator/health` in your browser. You should see:

```json
{
  "status": "UP"
}
```

> 🎉 **Success!** Your backend is running on port 8080

---

## 📱 Frontend Setup (~3 minutes)

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

> ⏱️ This may take 2-3 minutes depending on your internet connection

### Step 2: Configure API Endpoint

**Default Configuration:**
- Backend URL: `http://localhost:8080/api/v1`

**If your backend is on a different host/port:**

Edit `frontend/src/constants/config.ts`:

```typescript
export const API_BASE_URL = 'http://your-backend-url:port/api/v1';
```

> 💡 **Note for Android Emulator:** Use `10.0.2.2` instead of `localhost`  
> 💡 **Note for iOS Simulator:** `localhost` works fine

### Step 3: Run the Application

```bash
npm start
```

**Then choose your platform:**

| Key | Platform | Description |
|-----|----------|-------------|
| `a` | **Android** | Opens in Android emulator or device |
| `i` | **iOS** | Opens in iOS simulator or device |
| `w` | **Web** | Opens in web browser |

> 🎉 **Success!** Your frontend is running and connected to the backend

---

## 🎯 First Steps After Setup

### Step 1: Create Admin User

**Option A: Via Database (Quick)**

```sql
INSERT INTO users (
  email, 
  password_hash, 
  first_name, 
  last_name, 
  role, 
  organization_id, 
  is_active,
  created_at,
  updated_at
)
VALUES (
  'admin@example.com', 
  '$2a$10$...',  -- Use BCrypt hash generator
  'Admin', 
  'User', 
  'ADMIN', 
  1, 
  true,
  NOW(),
  NOW()
);
```

> 💡 **Tip:** Generate password hash using BCrypt or Spring Security's `BCryptPasswordEncoder`

**Option B: Via API (Recommended)**

Use the registration endpoint or admin creation API.

### Step 2: Login

1. Open the mobile app
2. Enter admin credentials
3. You should be redirected to the dashboard

### Step 3: Create Organization

If your organization doesn't exist:
- Navigate to Admin → Organizations
- Create a new organization

### Step 4: Start Creating Approvals! 🎉

You're all set! Start exploring the system and creating approval requests.

---

## 🔧 Common Issues & Solutions

### ❌ Backend won't start

<details>
<summary><b>Click to see troubleshooting steps</b></summary>

**Checklist:**
- ✅ MySQL is running: `mysql -u root -p`
- ✅ Database exists: `SHOW DATABASES;`
- ✅ Port 8080 is available: `netstat -an | grep 8080`
- ✅ Check logs: `backend/logs/application.log`

**Common Solutions:**
- **Port already in use:** Change port in `application.yml` or kill the process
- **Database connection failed:** Verify credentials and MySQL is running
- **Missing dependencies:** Run `mvn clean install` again

</details>

### ❌ Frontend can't connect to backend

<details>
<summary><b>Click to see troubleshooting steps</b></summary>

**Checklist:**
- ✅ Backend is running on port 8080
- ✅ Check `API_BASE_URL` in `frontend/src/constants/config.ts`
- ✅ CORS is configured in backend

**Platform-Specific:**
- **Android Emulator:** Use `10.0.2.2:8080` instead of `localhost:8080`
- **iOS Simulator:** `localhost:8080` works fine
- **Physical Device:** Use your computer's IP address (e.g., `192.168.1.100:8080`)

</details>

### ❌ File upload fails

<details>
<summary><b>Click to see troubleshooting steps</b></summary>

**Checklist:**
- ✅ `FILE_STORAGE_PATH` is set correctly
- ✅ Storage directory has write permissions
- ✅ File size is under 50MB
- ✅ File extension is allowed (PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, JPEG, TXT)

**Solutions:**
```bash
# Set permissions (Linux/Mac)
chmod -R 755 storage/

# Create directory if missing
mkdir -p storage/documents
```

</details>

## Common Issues

### Backend won't start
- Check MySQL is running: `mysql -u root -p`
- Verify database exists
- Check port 8080 is not in use
- Review logs in `backend/logs/application.log`

### Frontend can't connect to backend
- Ensure backend is running on port 8080
- Check `API_BASE_URL` in `frontend/src/constants/config.ts`
- For Android emulator, use `10.0.2.2` instead of `localhost`
- For iOS simulator, `localhost` works fine

### File upload fails
- Check `FILE_STORAGE_PATH` is set correctly
- Ensure storage directory has write permissions
- Verify file size is under 50MB
- Check file extension is allowed

---

## 💡 Development Tips

### 🔧 Backend Development

| Tip | Description |
|-----|-------------|
| **Auto-reload** | Use dev profile: `mvn spring-boot:run -Dspring-boot.run.profiles=dev` |
| **Hot Reload** | Spring DevTools automatically reloads on code changes |
| **Database Updates** | Schema auto-updates in dev mode (Hibernate DDL) |
| **API Testing** | Use Postman or curl to test endpoints |

### 📱 Frontend Development

| Tip | Description |
|-----|-------------|
| **Hot Reload** | Expo automatically reloads on save |
| **Debugging** | Use React Native Debugger or Chrome DevTools |
| **Console Logs** | Check terminal output for `console.log` statements |
| **Network Inspector** | Use Expo DevTools to inspect API calls |

---

## 📋 Next Steps

After completing the setup, consider these enhancements:

- [ ] **Email Notifications** - Configure SMTP for approval notifications
- [ ] **Production Database** - Set up production MySQL instance
- [ ] **Backup Strategy** - Implement automated backups for documents
- [ ] **Cloud Storage** - Migrate to MinIO/S3 for scalability
- [ ] **CI/CD Pipeline** - Set up automated testing and deployment
- [ ] **Monitoring** - Set up application monitoring and logging

---

## 📚 Additional Resources

- 📖 [Main README](../README.md) - Complete project overview
- 📋 [Business Blueprint](./BUSINESS_BLUEPRINT.md) - Business requirements
- 🗄️ [Database Design](./DATABASE_DESIGN.md) - Database schema
- 📁 [Project Structure](./PROJECT_STRUCTURE.md) - Code organization

---

<div align="center">

**🆘 Need Help?**

Check the [Documentation Index](./DOCUMENTATION_INDEX.md) or contact the development team

---

*Happy Coding! 🚀*

</div>

