# Authentication & User Data Isolation Implementation Guide

## Overview
This document provides a complete guide to the authentication system and user data isolation implemented in the Software Request Management System.

## Architecture

### Components

#### 1. Frontend (React + TypeScript)
- **AuthContext**: Manages authentication state globally
- **useAuth Hook**: Provides auth functionality to components
- **ProtectedRoute**: Guards routes requiring authentication
- **API Client**: Axios instance with JWT interceptor
- **Token Manager**: Handles secure JWT storage

#### 2. Backend (Go + Gin)
- **Auth Middleware**: JWT validation on protected routes
- **Login Handler**: Authenticates users and generates JWT
- **Software Request Handlers**: Enforce user_id filtering
- **Database**: MySQL with user and request tables

#### 3. Database (MySQL)
- **users table**: User credentials and profiles
- **Dbsoftwarerequests table**: Software requests with user_id foreign key

---

## Implementation Details

### Frontend Flow

#### 1. Token Storage Strategy
```typescript
// Memory-First with localStorage Fallback
├── Primary: In-Memory Storage
│   ├── Survives page refresh in memory
│   └── Cleared on browser close
├── Secondary: localStorage (optional)
│   ├── Survives browser close
│   └── Can be enabled/disabled
└── Expiration: Automatic cleanup of expired tokens
```

**Token Manager** (`src/utils/tokenManager.ts`):
- Stores token, user info, and expiration time
- Implements memory-first storage strategy
- Automatically clears expired tokens
- Provides methods: `getToken()`, `getUser()`, `setToken()`, `clearToken()`

#### 2. Authentication Context
```typescript
AuthContext provides:
- user: User | null
- token: string | null
- isAuthenticated: boolean
- isLoading: boolean
- error: string | null
- login(username, password): Promise<void>
- logout(): void
- clearError(): void
```

Usage:
```tsx
const { user, login, logout, isAuthenticated } = useAuth();
```

#### 3. API Client with JWT Interceptor
```typescript
// Automatically adds Authorization header
Request Interceptor:
- Reads token from TokenManager
- Adds "Authorization: Bearer <token>" header
- Attaches to all API requests

Response Interceptor:
- Catches 401 Unauthorized responses
- Clears token and triggers logout event
- Allows components to respond to auth failure
```

#### 4. Login Flow
```
User Input (username + password)
          ↓
    validateInput()
          ↓
    call authService.login()
          ↓
    apiClient.post(/auth/login)
          ↓
    Backend verifies credentials
          ↓
    Returns JWT + user info
          ↓
    Store token in TokenManager
          ↓
    Update AuthContext state
          ↓
    Navigate to home page
          ↓
    Sidebar displays user info
          ↓
    Home page fetches user-specific requests
```

#### 5. Protected Routes
```tsx
<ProtectedRoute>
  <Home />
</ProtectedRoute>
```

Behavior:
- If `isLoading`: Show loading spinner
- If NOT authenticated: Redirect to /login
- If authenticated: Show component

#### 6. User-Specific Data Loading
```typescript
// Home.tsx
useEffect(() => {
  if (user) {
    // Fetch requests with JWT automatically attached
    const requests = await softwareRequestService.getDrafts();
    // Filter to show only current user's requests
    const userRequests = requests.filter(
      req => req.requester === user.username
    );
  }
}, [user]);
```

---

### Backend Flow

#### 1. Authentication Middleware
```go
func AuthMiddleware() gin.HandlerFunc {
  return func(c *gin.Context) {
    // 1. Extract "Authorization: Bearer <token>" header
    // 2. Verify JWT signature and expiration
    // 3. Extract user claims (id, username, email, fullName)
    // 4. Store user_id in context: c.Set("user_id", claims.ID)
    // 5. Continue to next handler or reject with 401
  }
}
```

All protected routes use this middleware:
```go
protected := r.Group("")
protected.Use(handlers.AuthMiddleware())
protected.POST("/software-requests", handlers.CreateSoftwareRequest)
protected.GET("/software-requests", handlers.GetSoftwareRequests)
// ... other protected routes
```

#### 2. Login Handler
```go
func Login(c *gin.Context) {
  // 1. Parse login request (username, password)
  // 2. Query users table for matching username
  // 3. Hash provided password and compare with stored hash
  // 4. If match:
  //    - Generate JWT token with user claims
  //    - Return token + user info (without password)
  //    - expiration: 24 hours
  // 5. If no match: Return 401 Unauthorized
}
```

#### 3. User Data Isolation
```go
// CRITICAL: All queries filter by user_id from JWT

// Get user's drafts
SELECT * FROM Dbsoftwarerequests 
WHERE user_id = ? AND status = 'Draft'
// user_id comes from JWT claims via c.Get("user_id")

// Get specific request (verify ownership)
SELECT * FROM Dbsoftwarerequests 
WHERE id = ? AND user_id = ?
// Both id and user_id must match

// Update only if user owns the request
UPDATE Dbsoftwarerequests 
SET ... WHERE id = ? AND user_id = ?

// Delete only if user owns the request
DELETE FROM Dbsoftwarerequests 
WHERE id = ? AND user_id = ?
```

#### 4. JWT Structure
```typescript
Header: {
  alg: "HS256",
  typ: "JWT"
}

Payload: {
  id: "EMP001",
  username: "emp001",
  email: "emp@example.com",
  fullName: "John Doe",
  exp: 1705867200,  // Unix timestamp
  iat: 1705780800
}

Signature: HMAC-SHA256(header + payload, secret)
```

---

## Security Measures

### Frontend Security

#### 1. Token Storage
```typescript
✓ Primary memory storage (cleared on browser close)
✓ Optional localStorage with encryption flag
✓ Automatic expiration checking
✓ Automatic cleanup of expired tokens
✓ JWT never logged or exposed in console
```

#### 2. Protected Routes
```typescript
✓ Unauthenticated users redirected to /login
✓ Loading state during auth check
✓ No data displayed during authentication
```

#### 3. API Security
```typescript
✓ JWT automatically attached to all requests
✓ 401 responses trigger logout
✓ Authorization header in HTTP requests
✓ CORS properly configured for API calls
```

#### 4. Error Handling
```typescript
✓ User-friendly error messages
✓ Invalid credentials shown to user
✓ Network errors handled gracefully
✓ No password shown in error messages
```

### Backend Security

#### 1. Password Security
```go
✓ Passwords hashed (SHA256, should be bcrypt)
✓ Unique user records (username UNIQUE constraint)
✓ Active user check (is_active = TRUE)
✓ Password never included in responses
```

#### 2. JWT Security
```go
✓ HS256 signing algorithm
✓ Secret key in environment variable (PRODUCTION)
✓ 24-hour expiration
✓ Signature verification on every request
✓ Signature verification prevents tampering
```

#### 3. Authorization
```go
✓ user_id extracted from JWT (trusted source)
✓ Every query filters by user_id
✓ Foreign key constraints ensure data integrity
✓ 401 response for invalid/expired tokens
✓ 403 response for access denied (ownership check)
```

#### 4. SQL Injection Prevention
```go
✓ Parameterized queries throughout
✓ No string concatenation for SQL
✓ Type-safe query parameters
```

---

## Database Security

### 1. User Isolation
```sql
-- Index on user_id for fast filtering
CREATE INDEX idx_user_id ON Dbsoftwarerequests(user_id);

-- Foreign key ensures valid user_id
FOREIGN KEY (user_id) REFERENCES users(id)
  ON DELETE CASCADE;  -- Delete requests if user deleted
```

### 2. Data Access
```sql
-- User can only see their own requests
SELECT * FROM Dbsoftwarerequests 
WHERE user_id = <authenticated_user_id>;

-- Users cannot bypass through direct queries
-- Database enforces this through application layer
```

### 3. Password Security
```sql
-- Store hashes, never plain passwords
CREATE TABLE users (
  ...
  password_hash VARCHAR(255) NOT NULL,
  ...
);
```

---

## Testing Guide

### 1. Manual Testing

#### Login Flow
```
1. Navigate to http://localhost:5173/login
2. Enter username: "emp001"
3. Enter password: "password123" (test password)
4. Click "เข้าสู่ระบบ"
5. Should redirect to home page
6. Sidebar should show "emp001"
7. Table should load requests for emp001
```

#### Logout Flow
```
1. Click logout button in sidebar
2. Should redirect to login page
3. Sidebar should disappear
4. Trying to access / should redirect to login
```

#### User Isolation
```
1. Login as emp001
2. Create a draft request
3. Note the request ID
4. Logout and login as emp002
5. emp002 should NOT see emp001's request in list
6. emp002 trying to access emp001's request directly:
   - Endpoint: GET /software-requests/<id>
   - Should return 404 or access denied
```

### 2. API Testing (with Postman/cURL)

#### Login
```bash
POST http://localhost:8080/auth/login
Content-Type: application/json

{
  "username": "emp001",
  "password": "password123"
}

Response:
{
  "token": "eyJ...",
  "expiresIn": 86400,
  "user": {
    "id": "EMP001",
    "username": "emp001",
    "email": "emp@example.com",
    "fullName": "John Doe"
  }
}
```

#### Get User Profile
```bash
GET http://localhost:8080/auth/profile
Authorization: Bearer <token>

Response:
{
  "id": "EMP001",
  "username": "emp001",
  "email": "emp@example.com",
  "fullName": "John Doe",
  "is_active": true
}
```

#### Get User's Drafts
```bash
GET http://localhost:8080/software-requests
Authorization: Bearer <token>

Response:
[
  {
    "id": 1,
    "requestNo": "",
    "ciId": "",
    "ciName": "Web Server",
    "ciVersion": "1.0.0",
    "serviceName": "HTTP",
    "requester": "emp001",
    "requestDate": "2024-01-22 10:30:00",
    "status": "Draft",
    "currentOperator": ""
  }
]
```

---

## Configuration

### Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080
VITE_AUTH_TOKEN_EXPIRATION=86400
```

#### Backend (main.go)
```go
// JWT Secret (should be in .env for production)
var JWTSecret = os.Getenv("JWT_SECRET")
if JWTSecret == "" {
  JWTSecret = "change-this-in-production"
}

// Token expiration (seconds)
const TokenExpiration = 86400 // 24 hours
```

### Production Considerations

#### Security Hardening
```go
// 1. Use bcrypt instead of SHA256
import "golang.org/x/crypto/bcrypt"
hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

// 2. Read JWT secret from environment
JWTSecret := os.Getenv("JWT_SECRET")
if JWTSecret == "" {
  log.Fatal("JWT_SECRET environment variable must be set")
}

// 3. Use HTTPS only
// Configure proxy/load balancer for HTTPS
// Set secure cookie flags for HttpOnly tokens if using cookies

// 4. Enable password requirements
// - Minimum length (12+ chars)
// - Complexity rules
// - Previous password check
```

---

## Troubleshooting

### Issue: "Invalid token" error
**Cause**: Token expired or signature mismatch
**Solution**: 
- Check token expiration: `tokenManager.getTokenExpiresIn()`
- Re-login to get fresh token
- Verify JWT_SECRET matches between frontend/backend

### Issue: 401 Unauthorized on API calls
**Cause**: Missing or invalid Authorization header
**Solution**:
- Verify JWT is stored correctly in TokenManager
- Check API client interceptor is adding header
- Verify token hasn't expired

### Issue: User sees other users' data
**Cause**: Query not filtering by user_id
**Solution**:
- Add user_id filter to all queries
- Verify user_id extraction from JWT
- Check middleware is setting user_id in context

### Issue: Login fails with valid credentials
**Cause**: Password hash doesn't match
**Solution**:
- Verify hash algorithm matches (SHA256 vs bcrypt)
- Check password in database (re-hash if needed)
- Enable debug logs in login handler

### Issue: CORS errors on API calls
**Cause**: CORS headers not configured
**Solution**:
- Verify CORS middleware in main.go
- Check Access-Control-Allow-Origin header
- Ensure Authorization header in allowed headers list

---

## Next Steps

1. **Set up database**: Run `init.sql` to create tables
2. **Add test users**: Insert sample users with hashed passwords
3. **Deploy backend**: Build and run Go server on port 8080
4. **Deploy frontend**: Build and run React app with `npm run build`
5. **Configure HTTPS**: Use reverse proxy (nginx) for SSL
6. **Set environment variables**: Use `.env` files for configuration
7. **Monitor logs**: Track authentication and authorization events
8. **Regular security audits**: Review access logs and update dependencies

---

## References

- [JWT.io - JWT Documentation](https://jwt.io/)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Go JWT Package](https://github.com/golang-jwt/jwt)
- [Gin Framework](https://gin-gonic.com/)
- [React Context API](https://react.dev/reference/react/useContext)

