# Project Structure Documentation

Complete folder structure for the Smart Approval Management System.

## Root Structure

```
Project/
├── backend/                    # Spring Boot Backend Application
├── frontend/                   # React Native Frontend Application
├── storage/                    # Document Storage Directory
├── docs/                       # Documentation
├── .gitignore                  # Git ignore rules
└── README.md                   # Main project documentation
```

## Backend Structure (Spring Boot)

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/smartapproval/
│   │   │   ├── SmartApprovalApplication.java    # Main application class
│   │   │   ├── config/                          # Configuration classes
│   │   │   │   ├── SecurityConfig.java          # Spring Security config
│   │   │   │   └── FileStorageConfig.java       # File storage config
│   │   │   ├── controller/                      # REST Controllers
│   │   │   │   ├── AuthController.java          # Authentication endpoints
│   │   │   │   ├── ApprovalController.java      # Approval endpoints
│   │   │   │   ├── UserController.java          # User management
│   │   │   │   └── DocumentController.java      # Document endpoints
│   │   │   ├── service/                         # Business Logic Layer
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── ApprovalService.java
│   │   │   │   ├── UserService.java
│   │   │   │   ├── DocumentService.java
│   │   │   │   └── OrganizationService.java
│   │   │   ├── repository/                      # Data Access Layer (JPA)
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── ApprovalRepository.java
│   │   │   │   ├── DocumentRepository.java
│   │   │   │   └── OrganizationRepository.java
│   │   │   ├── model/                           # Entity Models
│   │   │   │   ├── BaseEntity.java              # Base entity with common fields
│   │   │   │   ├── User.java
│   │   │   │   ├── Approval.java
│   │   │   │   ├── DocumentAttachment.java
│   │   │   │   └── Organization.java
│   │   │   ├── dto/                             # Data Transfer Objects
│   │   │   │   ├── request/                     # Request DTOs
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   ├── CreateApprovalRequest.java
│   │   │   │   │   └── UpdateApprovalRequest.java
│   │   │   │   └── response/                    # Response DTOs
│   │   │   │       ├── AuthResponse.java
│   │   │   │       ├── ApprovalResponse.java
│   │   │   │       └── UserResponse.java
│   │   │   ├── mapper/                          # MapStruct Mappers
│   │   │   │   ├── ApprovalMapper.java
│   │   │   │   ├── UserMapper.java
│   │   │   │   └── DocumentMapper.java
│   │   │   ├── security/                        # Security Components
│   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   └── UserDetailsServiceImpl.java
│   │   │   ├── exception/                       # Exception Handling
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   ├── ErrorResponse.java
│   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   └── BadRequestException.java
│   │   │   ├── util/                            # Utility Classes
│   │   │   │   ├── FileStorageUtil.java
│   │   │   │   ├── DateUtil.java
│   │   │   │   └── ValidationUtil.java
│   │   │   └── constant/                        # Constants
│   │   │       ├── ApprovalStatus.java          # Enum
│   │   │       ├── ApprovalType.java            # Enum
│   │   │       └── UserRole.java                # Enum
│   │   └── resources/
│   │       ├── application.yml                  # Main configuration
│   │       ├── application-dev.yml              # Development profile
│   │       ├── application-prod.yml             # Production profile
│   │       └── db/                              # Database scripts (optional)
│   │           └── migration/                   # Flyway/Liquibase migrations
│   └── test/                                    # Test Sources
│       └── java/com/smartapproval/
│           ├── controller/                      # Controller tests
│           ├── service/                         # Service tests
│           └── repository/                      # Repository tests
├── target/                                      # Maven build output (ignored)
├── pom.xml                                      # Maven configuration
├── .gitignore                                   # Git ignore rules
└── README.md                                    # Backend documentation
```

## Frontend Structure (React Native)

```
frontend/
├── src/
│   ├── components/                              # Reusable UI Components
│   │   ├── common/                              # Common components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   ├── approval/                            # Approval-specific components
│   │   │   ├── ApprovalCard.tsx
│   │   │   ├── ApprovalForm.tsx
│   │   │   ├── ApprovalStatusBadge.tsx
│   │   │   └── ApprovalFilters.tsx
│   │   └── document/                            # Document components
│   │       ├── DocumentPicker.tsx
│   │       ├── DocumentList.tsx
│   │       └── DocumentPreview.tsx
│   ├── screens/                                 # Screen Components
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── dashboard/
│   │   │   └── DashboardScreen.tsx
│   │   ├── approvals/
│   │   │   ├── ApprovalListScreen.tsx
│   │   │   ├── ApprovalDetailScreen.tsx
│   │   │   ├── CreateApprovalScreen.tsx
│   │   │   └── EditApprovalScreen.tsx
│   │   └── profile/
│   │       └── ProfileScreen.tsx
│   ├── navigation/                              # Navigation Configuration
│   │   ├── AppNavigator.tsx                     # Main navigator
│   │   ├── AuthNavigator.tsx                    # Auth stack
│   │   └── MainNavigator.tsx                    # Main app tabs
│   ├── services/                                # API Services
│   │   ├── api.ts                               # Axios instance & base API
│   │   ├── authService.ts                       # Auth API calls
│   │   ├── approvalService.ts                   # Approval API calls
│   │   └── documentService.ts                   # Document API calls
│   ├── context/                                 # React Context Providers
│   │   ├── AuthContext.tsx                      # Authentication context
│   │   └── ThemeContext.tsx                     # Theme context (optional)
│   ├── hooks/                                   # Custom React Hooks
│   │   ├── useAuth.ts
│   │   ├── useApprovals.ts
│   │   └── useFileUpload.ts
│   ├── utils/                                   # Utility Functions
│   │   ├── validation.ts                        # Form validation schemas
│   │   ├── formatters.ts                        # Date, currency formatters
│   │   └── helpers.ts                           # Helper functions
│   ├── constants/                               # App Constants
│   │   ├── config.ts                            # App configuration
│   │   ├── colors.ts                            # Color palette
│   │   └── routes.ts                            # Route names
│   ├── types/                                   # TypeScript Type Definitions
│   │   └── index.ts                             # All types/interfaces
│   └── store/                                   # State Management (if using Redux/MobX)
│       ├── store.ts
│       ├── slices/
│       └── actions/
├── assets/                                      # Static Assets
│   ├── images/
│   │   ├── icon.png
│   │   ├── splash.png
│   │   └── adaptive-icon.png
│   ├── fonts/
│   └── favicon.png
├── App.tsx                                      # Root Component
├── app.json                                     # Expo Configuration
├── package.json                                 # Dependencies
├── tsconfig.json                                # TypeScript Configuration
├── babel.config.js                              # Babel Configuration
├── .gitignore                                   # Git ignore rules
└── README.md                                    # Frontend documentation
```

## Storage Structure (Document Attachments)

```
storage/
├── documents/                                   # Main document storage
│   ├── org_1/                                   # Organization 1
│   │   ├── approval_1/                          # Approval ID 1
│   │   │   ├── a1b2c3d4-e5f6-7890-abcd-ef1234567890.pdf
│   │   │   ├── f9e8d7c6-b5a4-3210-fedc-ba9876543210.docx
│   │   │   └── metadata.json                    # File metadata
│   │   ├── approval_2/
│   │   │   └── ...
│   │   └── approval_N/
│   ├── org_2/
│   │   └── ...
│   └── org_N/
├── thumbnails/                                  # Image thumbnails (if needed)
│   └── org_1/
│       └── approval_1/
│           └── thumbnail_*.jpg
├── archives/                                    # Archived/old documents
│   └── org_1/
│       └── 2024/
│           └── 01/
└── temp/                                        # Temporary uploads
    └── (cleaned periodically)
```

### File Naming Convention
- **Stored files**: `{UUID}.{extension}` (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890.pdf`)
- **Original filename**: Stored in database metadata
- **Path structure**: `org_{organizationId}/approval_{approvalId}/{filename}`

## Documentation Structure

```
docs/
├── DRUPAL_INTEGRATION.md                        # Drupal integration analysis
├── PROJECT_STRUCTURE.md                         # This file
├── API_DOCUMENTATION.md                         # API endpoints documentation
└── DEPLOYMENT.md                                # Deployment guide (if needed)
```

## Key Design Principles

### Backend
- **Layered Architecture**: Controller → Service → Repository → Database
- **DTO Pattern**: Separate request/response DTOs from entities
- **MapStruct**: Type-safe object mapping
- **JWT Authentication**: Stateless authentication
- **RESTful APIs**: Standard REST conventions

### Frontend
- **Component-Based**: Reusable, composable components
- **Context API**: Global state management for auth, theme
- **Service Layer**: Abstracted API calls
- **TypeScript**: Type safety throughout
- **React Navigation**: Native navigation experience

### Storage
- **Organization-Based**: Files organized by organization
- **UUID Naming**: Prevents filename conflicts
- **Metadata in DB**: File metadata stored in MySQL
- **Secure Access**: Files accessed only through authenticated API

## Next Steps for Development

1. **Backend**: Implement entities, repositories, services, controllers
2. **Frontend**: Build screens and components
3. **Integration**: Connect frontend to backend APIs
4. **Testing**: Write unit and integration tests
5. **Documentation**: Complete API documentation
6. **Deployment**: Set up CI/CD pipeline

