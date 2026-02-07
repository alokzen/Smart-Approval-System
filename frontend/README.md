# 📱 Smart Approval Management System - Frontend

<div align="center">

**React Native mobile application for the Smart Approval Management System**

[![React Native](https://img.shields.io/badge/React%20Native-Expo-blue)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-Latest-black)](https://expo.dev/)

</div>

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React Native (Expo)** | Mobile framework |
| **TypeScript** | Type safety |
| **React Navigation** | Navigation library |
| **React Native Paper** | Material Design components |
| **React Hook Form + Yup** | Form validation |
| **Axios** | HTTP client |
| **AsyncStorage** | Local storage |
| **React Native Document Picker** | File attachment handling |

---

## 📋 Prerequisites

| Requirement | Version | Installation |
|-------------|---------|--------------|
| **Node.js** | 18+ | [Download](https://nodejs.org/) |
| **npm/yarn** | Latest | Comes with Node.js |
| **Expo CLI** | Latest | `npm install -g expo-cli` |
| **Xcode** | Latest | Mac only (for iOS) |
| **Android Studio** | Latest | For Android development |

---

## 🚀 Setup Instructions

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

> ⏱️ This may take 2-3 minutes depending on your internet connection

### Step 2: Configure API Endpoint

Edit `src/constants/config.ts`:

**Default (Development):**
```typescript
export const API_BASE_URL = 'http://localhost:8080/api/v1';
```

**Android Emulator:**
```typescript
export const API_BASE_URL = 'http://10.0.2.2:8080/api/v1';
```

**Physical Device:**
```typescript
export const API_BASE_URL = 'http://YOUR_IP:8080/api/v1';
```

> 💡 **Tip:** Ensure backend is running before starting the frontend

### Step 3: Run the Application

```bash
npm start
```

**Choose platform:**
- `a` - Android emulator/device
- `i` - iOS simulator/device
- `w` - Web browser

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Common components
│   │   ├── approval/       # Approval components
│   │   └── document/       # Document components
│   ├── screens/            # Screen components
│   │   ├── auth/          # Authentication
│   │   ├── dashboard/     # Dashboard
│   │   ├── approvals/     # Approvals
│   │   └── profile/       # Profile
│   ├── navigation/         # Navigation config
│   ├── services/          # API services
│   ├── context/           # React Context
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Utilities
│   ├── constants/         # Constants
│   ├── types/             # TypeScript types
│   └── store/             # State management
├── assets/                # Static assets
├── App.tsx               # Root component
├── app.json              # Expo config
└── package.json
```

> 📖 **For detailed structure**, see [Project Structure Documentation](../docs/PROJECT_STRUCTURE.md)

---

## 🔐 Environment Variables

Create a `.env` file in the frontend root:

```env
API_BASE_URL=http://localhost:8080/api/v1
```

---

## 📦 Building for Production

### 🤖 Android

```bash
expo build:android
```

### 🍎 iOS

```bash
expo build:ios
```

---

## ✨ Key Features

| Feature | Status |
|---------|--------|
| 🔐 **JWT Authentication** | ✅ Implemented |
| 📋 **Approval Management** | ✅ Implemented |
| 📎 **Document Attachments** | ✅ Implemented |
| ⚡ **Real-Time Updates** | ✅ Implemented |
| 👥 **Role-Based Access** | ✅ Implemented |
| 📱 **Offline Support** | 🚧 Coming Soon |

---

## 📚 Additional Resources

- 📖 [Main README](../README.md) - Complete project overview
- 🚀 [Quick Start Guide](../docs/QUICK_START.md) - Setup instructions
- 📋 [Business Blueprint](../docs/BUSINESS_BLUEPRINT.md) - UI requirements
- 📁 [Project Structure](../docs/PROJECT_STRUCTURE.md) - Code organization

