# Software Request Management System

Enterprise-grade software request management system with JWT-based authentication, secure JWT storage, and user-specific data isolation.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Documentation](#documentation)

---

## Features

### Authentication & Security
- ✅ **JWT-Based Authentication**: Secure token-based user sessions
- ✅ **User Isolation**: Each user only sees their own data
- ✅ **Secure Token Storage**: Memory-first with optional localStorage fallback
- ✅ **Protected Routes**: Automatic redirect to login for unauthenticated users
- ✅ **Auto-JWT Injection**: JWT automatically attached to all API requests
- ✅ **Password Hashing**: SHA256 (bcrypt recommended for production)

### Software Request Management
- ✅ **Draft Management**: Create, read, update, delete draft requests
- ✅ **User-Specific Data**: Filter requests by authenticated user
- ✅ **Real-Time Updates**: Responsive UI with React Context
- ✅ **Status Tracking**: Draft → Submitted → Pending → Approved/Rejected
- ✅ **JSON Form Storage**: Flexible form data in JSON format

### User Experience
- ✅ **Thai Language Support**: Full Thai UI (Thai date format, Thai text)
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **User Info Display**: Sidebar shows authenticated user profile
- ✅ **Error Handling**: Clear error messages for invalid credentials
- ✅ **Loading States**: Visual feedback during async operations

---

## Architecture

### Technology Stack

**Frontend:**
- React 19.2 with TypeScript
- Vite bundler
- Tailwind CSS + Radix UI
- Axios with interceptors
- React Router v7

**Backend:**
- Go 1.21
- Gin framework
- JWT (golang-jwt/jwt)
- MySQL 8.0

**Database:**
- MySQL with InnoDB
- JSON columns for flexible data storage
- Foreign key constraints for data integrity

### Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION FLOW                         │
├─────────────────────────────────────────────────────────────┤
│ 1. User visits login page                                   │
│ 2. Enters credentials (username + password)                 │
│ 3. Frontend sends to /auth/login                           │
│ 4. Backend verifies against users table                     │
│ 5. Backend generates JWT token (24 hours)                  │
│ 6. Frontend stores JWT in TokenManager                      │
│ 7. User redirected to home page                            │
│ 8. Subsequent requests include JWT in header               │
│ 9. Backend middleware validates JWT on each request         │
│ 10. user_id extracted from JWT and used to filter data     │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
Frontend                          Backend                     Database
└─ useAuth()           →  AuthContext      →  apiClient   →  MySQL
   └─ login            →  authService      →  GET/POST/PUT →  users
      └─ TokenManager  →  authMiddleware   →  Software        Requests
```

---

## Project Structure

```
software-newtest/
├── frontend (React)
│   ├── src/
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx          # Auth state management
│   │   ├── services/
│   │   │   ├── apiClient.ts             # Axios with JWT interceptor
│   │   │   ├── authService.ts           # Auth API calls
│   │   │   └── softwareRequestService.ts # Request API calls
│   │   ├── utils/
│   │   │   └── tokenManager.ts          # JWT storage & management
│   │   ├── components/
│   │   │   ├── ProtectedRoute.tsx       # Route guard component
│   │   │   ├── Sidebar.tsx              # User info & navigation
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Login.tsx                # Login form
│   │   │   ├── Home.tsx                 # Dashboard with requests
│   │   │   └── ...
│   │   ├── App.tsx                      # Main app with routing
│   │   └── main.tsx                     # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .env.example
│
├── backend (Go)
│   ├── cmd/
│   │   └── main.go                      # Server entry point
│   ├── internal/
│   │   ├── database/
│   │   │   └── db.go                    # MySQL connection
│   │   ├── models/
│   │   │   ├── software_request.go
│   │   │   └── user.go                  # Auth models
│   │   └── handlers/
│   │       ├── auth.go                  # JWT utilities
│   │       ├── auth_login.go            # Login handler
│   │       └── software_request.go      # Request handlers
│   ├── go.mod
│   └── init.sql                         # Database schema
│
├── Documentation
│   ├── README.md                        # This file
│   ├── SCHEMA.md                        # Database design
│   ├── AUTHENTICATION_GUIDE.md          # Auth implementation details
│   ├── DEPLOYMENT_GUIDE.md              # Production deployment
│   └── POSTMAN_TESTING_GUIDE.md         # API testing
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Go 1.21+
- MySQL 8.0+
- Git

### Quick Start

#### 1. Database Setup
```bash
# Run init.sql to create tables and sample users
mysql -u root < software-api/init.sql

# Verify
mysql -u root software_requests
mysql> SELECT * FROM users;
```

#### 2. Backend Setup
```bash
cd software-api
go mod download
go run cmd/main.go
# Server running on http://localhost:8080
```

#### 3. Frontend Setup
```bash
npm install
cp .env.example .env
npm run dev
# App running on http://localhost:5173
```

#### 4. Test Login
- Navigate to http://localhost:5173/login
- Username: `emp001`
- Password: `password123`
- Should redirect to home page with user info in sidebar

---

## API Documentation

### Public Endpoints

#### Login
```
POST /auth/login
Content-Type: application/json

Request:
{
  "username": "emp001",
  "password": "password123"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 86400,
  "user": {
    "id": "EMP001",
    "username": "emp001",
    "email": "emp@example.com",
    "fullName": "John Doe"
  }
}
```

### Protected Endpoints (Require JWT)

All protected endpoints require:
```
Authorization: Bearer <token>
```

#### Get User Profile
```
GET /auth/profile

Response (200 OK):
{
  "id": "EMP001",
  "username": "emp001",
  "email": "emp@example.com",
  "fullName": "John Doe",
  "isActive": true,
  "createdAt": "2024-01-22T10:00:00Z"
}
```

#### Get User's Drafts
```
GET /software-requests

Response (200 OK):
[
  {
    "id": 1,
    "ciName": "Web Server",
    "ciVersion": "1.0.0",
    "serviceName": "HTTP",
    "requester": "emp001",
    "requestDate": "22/01/2567 10:30",
    "status": "Draft"
  }
]
```

#### Create Draft
```
POST /software-requests
Content-Type: application/json

Request:
{
  "ciName": "API Gateway",
  "ciVersion": "2.0.0",
  "serviceName": "REST API",
  "createdBy": "emp001"
}

Response (201 Created):
{
  "message": "Draft saved successfully"
}
```

#### Get Draft Detail
```
GET /software-requests/:id

Response (200 OK):
{
  "id": 1,
  "formData": {...},
  "status": "Draft",
  "requestDate": "2024-01-22T10:30:00Z"
}
```

#### Update Draft
```
PUT /software-requests/:id
Content-Type: application/json

Request:
{
  "ciName": "Updated Name",
  "ciVersion": "1.1.0",
  "serviceName": "Updated Service",
  "createdBy": "emp001"
}

Response (200 OK):
{
  "message": "Draft updated successfully"
}
```

#### Delete Draft
```
DELETE /software-requests/:id

Response (200 OK):
{
  "message": "Request deleted successfully"
}
```

#### Logout
```
POST /auth/logout

Response (200 OK):
{
  "message": "Logged out successfully"
}
```

---

## Security

### Token Storage Strategy
- **Primary**: In-memory storage (cleared on browser close)
- **Secondary**: Optional localStorage for persistence
- **Automatic**: Cleanup of expired tokens
- **Never logged**: JWT never exposed in console

### User Data Isolation
- Every query filters by authenticated user's `user_id`
- Foreign key constraints ensure data integrity
- Ownership verification on update/delete operations
- 401 response for invalid tokens
- 403 response for access denied

### JWT Implementation
- **Algorithm**: HS256 (HMAC with SHA-256)
- **Secret**: Should be in environment variable (min 32 chars)
- **Expiration**: 24 hours
- **Signature Verification**: Required on every request
- **Headers**: Authorization header validation

### Password Security
- **Hashing**: SHA256 (use bcrypt in production)
- **Storage**: Only hashed values in database
- **Transmission**: Over HTTPS (TLS encryption)
- **Validation**: Never shown in error messages

### CORS Configuration
```go
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization
```

---

## User Data Isolation

### Critical Security Feature

**The system ensures users ONLY see their own data:**

```
Flow:
1. User logs in → JWT generated with user_id
2. Frontend stores JWT
3. Every API request includes JWT in Authorization header
4. Backend extracts user_id from JWT claims
5. ALL queries filter by: WHERE user_id = <extracted_user_id>
6. User cannot access other users' requests
```

**Example Query:**
```sql
-- Get user's drafts (MUST filter by user_id)
SELECT * FROM Dbsoftwarerequests 
WHERE user_id = ? AND status = 'Draft'

-- user_id comes from JWT, cannot be spoofed
```

---

## Documentation

### Comprehensive Guides

1. **[SCHEMA.md](./SCHEMA.md)**
   - Database design and structure
   - Table descriptions and relationships
   - Data access patterns
   - Performance optimization

2. **[AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md)**
   - Detailed auth implementation
   - Frontend/backend flows
   - Security measures
   - Testing guide
   - Troubleshooting

3. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**
   - Development setup
   - Production deployment
   - Docker containerization
   - Monitoring and logging
   - Performance tuning

4. **[POSTMAN_TESTING_GUIDE.md](./POSTMAN_TESTING_GUIDE.md)**
   - API testing procedures
   - Sample requests/responses
   - Testing checklist

---

## Running Tests

### Manual Testing

**Login Flow:**
```
1. Open http://localhost:5173/login
2. Enter: emp001 / password123
3. Click Login
4. Verify redirect to home page
5. Check sidebar shows user info
```

**User Isolation Test:**
```
1. Login as emp001
2. Create a software request
3. Note request ID in table
4. Logout
5. Login as emp002
6. emp002 should NOT see emp001's request
7. emp002 direct API access to emp001's request should return error
```

### API Testing with cURL

```bash
# Test login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"emp001","password":"password123"}'

# Test protected endpoint (replace TOKEN)
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:8080/auth/profile
```

---

## Environment Configuration

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080
VITE_AUTH_TOKEN_EXPIRATION=86400
VITE_APP_NAME=CP ALL Software Request System
```

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=software_requests
JWT_SECRET=your-secure-secret-key-min-32-chars
GIN_MODE=debug  # or release for production
PORT=8080
```

---

## Troubleshooting

### Login Issues
**Q: Login fails with "Invalid credentials"**
- A: Verify username/password in database
- Check if user account is_active = TRUE
- Verify password hash matches

**Q: "Missing authorization header" error**
- A: JWT not being sent in Authorization header
- Check apiClient interceptor is working
- Verify token is stored in TokenManager

### Data Visibility Issues
**Q: User sees other users' data**
- A: Database query not filtering by user_id
- Backend should enforce user_id filter
- Check middleware is setting user_id in context

**Q: 401 Unauthorized on all requests**
- A: Token expired or JWT_SECRET mismatch
- Re-login to get fresh token
- Verify JWT_SECRET matches frontend/backend

---

## Contributing

### Code Standards
- Use TypeScript for type safety
- Follow existing code style
- Add comments for complex logic
- Test before pushing

### Before Deployment
- [ ] All tests pass
- [ ] No console errors
- [ ] User isolation verified
- [ ] JWT properly implemented
- [ ] Environment variables set
- [ ] Database backups scheduled

---

## License

Proprietary - CP ALL

---

## Support

For issues or questions:
1. Check [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md) troubleshooting section
2. Review database logs: `tail -f /var/log/mysql/error.log`
3. Check backend logs: `journalctl -u software-api -f`
4. Review browser console for frontend errors

---

## Version

**Current**: 1.0.0  
**Last Updated**: January 22, 2024

---

## Key Features Summary

| Feature | Frontend | Backend | Database |
|---------|----------|---------|----------|
| Authentication | ✅ Context API | ✅ JWT Middleware | ✅ users table |
| User Isolation | ✅ Auth Guard | ✅ user_id filter | ✅ FK constraint |
| JWT Storage | ✅ TokenManager | ✅ Signing | ✅ - |
| Data Filtering | ✅ useAuth hook | ✅ Middleware | ✅ Indexes |
| Error Handling | ✅ Try/catch | ✅ Logging | ✅ - |
| CORS | ✅ Configured | ✅ Middleware | ✅ - |

