# Database Schema Documentation

## Overview
This document describes the database schema for the Software Request Management System. The system uses MySQL with support for user authentication and software request management.

## Database: `software_requests`

### Tables

#### 1. `users` Table
Stores user account information for authentication and authorization.

**Purpose:** Manage user credentials and profile information.

**Schema:**
```sql
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    email VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_is_active (is_active)
);
```

**Columns:**
| Column | Type | Constraint | Description |
|--------|------|-----------|-------------|
| `id` | VARCHAR(50) | PRIMARY KEY | Unique user identifier (Employee ID) |
| `username` | VARCHAR(100) | NOT NULL, UNIQUE | Login username |
| `password_hash` | VARCHAR(255) | NOT NULL | Hashed password (SHA256 or bcrypt) |
| `full_name` | VARCHAR(255) | - | User's full name |
| `email` | VARCHAR(255) | - | User's email address |
| `is_active` | BOOLEAN | DEFAULT TRUE | Account active status |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Account creation timestamp |
| `updated_at` | DATETIME | AUTO UPDATE | Last update timestamp |

**Indexes:**
- `idx_username`: Speeds up login queries by username
- `idx_is_active`: Filters active users efficiently

---

#### 2. `Dbsoftwarerequests` Table
Stores software request/draft records with user tracking.

**Purpose:** Manage software requests and their status throughout the workflow.

**Schema:**
```sql
CREATE TABLE Dbsoftwarerequests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    form_data JSON NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Draft',
    request_date DATETIME NOT NULL,
    request_no VARCHAR(100),
    ci_id VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_request_date (request_date)
);
```

**Columns:**
| Column | Type | Constraint | Description |
|--------|------|-----------|-------------|
| `id` | INT | AUTO_INCREMENT, PRIMARY KEY | Request unique identifier |
| `user_id` | VARCHAR(50) | NOT NULL, FOREIGN KEY | Reference to user who created the request |
| `form_data` | JSON | NOT NULL | Complete form data as JSON |
| `status` | VARCHAR(50) | NOT NULL, DEFAULT 'Draft' | Request status (Draft, Pending, Approved, Rejected, Submitted) |
| `request_date` | DATETIME | NOT NULL | When the request was created |
| `request_no` | VARCHAR(100) | - | Request number (assigned when submitted) |
| `ci_id` | VARCHAR(100) | - | Configuration Item ID (assigned when submitted) |
| `created_at` | DATETIME | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| `updated_at` | DATETIME | AUTO UPDATE | Last update timestamp |

**Indexes:**
- `idx_user_id`: Filter requests by user (CRITICAL for user data isolation)
- `idx_status`: Filter requests by status
- `idx_request_date`: Sort requests by date

**Foreign Keys:**
- `user_id` → `users(id)`: Ensures referential integrity and enables ON DELETE CASCADE for user cleanup

---

## Data Access Patterns

### User Data Isolation (CRITICAL)
All queries in the application **MUST** filter by `user_id` to ensure users only see their own data:

```sql
-- Get user's draft requests
SELECT * FROM Dbsoftwarerequests 
WHERE user_id = ? AND status = 'Draft';

-- Get specific request (verify ownership)
SELECT * FROM Dbsoftwarerequests 
WHERE id = ? AND user_id = ?;

-- Update request (verify ownership)
UPDATE Dbsoftwarerequests 
SET form_data = ?, updated_at = NOW() 
WHERE id = ? AND user_id = ?;

-- Delete request (verify ownership)
DELETE FROM Dbsoftwarerequests 
WHERE id = ? AND user_id = ?;
```

### Request Status Workflow
```
Draft → Submitted → Pending → Approved/Rejected
        ↑___________|
```

**Status Definitions:**
- **Draft**: Request is being created/edited, not yet submitted
- **Submitted**: Request submitted for approval
- **Pending**: Request awaiting review
- **Approved**: Request approved by administrator
- **Rejected**: Request rejected with possible feedback

---

## Security Considerations

### 1. User Data Isolation
- **Every query MUST include user_id filter**
- Backend enforces authentication via JWT middleware
- Frontend displays only authenticated user's requests
- Database foreign keys maintain referential integrity

### 2. Password Security
- Passwords stored as hashes (SHA256 minimum, bcrypt recommended for production)
- Never store plain passwords
- Use unique salt per password
- Consider bcrypt or Argon2 for production

### 3. Authentication
- JWT-based authentication (24-hour expiration default)
- Authorization header: `Authorization: Bearer <token>`
- All protected routes require valid JWT
- Token contains user_id and username claims

### 4. Access Control
- Backend middleware validates JWT on all protected routes
- user_id extracted from JWT claims
- All data queries filtered by authenticated user_id
- DELETE, UPDATE operations verify user ownership

---

## Sample Data

### Insert Sample Users
```sql
INSERT INTO users (id, username, password_hash, full_name, email) VALUES
('EMP001', 'emp001', SHA2('password123', 256), 'John Doe', 'john@example.com'),
('EMP002', 'emp002', SHA2('password123', 256), 'Jane Smith', 'jane@example.com'),
('EMP003', 'emp003', SHA2('password123', 256), 'Admin User', 'admin@example.com');
```

**Note:** For testing only. Use proper password hashing in production.

### Sample Software Request
```sql
INSERT INTO Dbsoftwarerequests (user_id, form_data, status, request_date) VALUES
('EMP001', 
  JSON_OBJECT(
    'ciName', 'Web Server App',
    'ciVersion', '1.0.0',
    'serviceName', 'HTTP Service',
    'createdBy', 'EMP001'
  ),
  'Draft',
  NOW()
);
```

---

## Backup and Maintenance

### Regular Backups
```bash
# Full database backup
mysqldump -u root software_requests > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore from backup
mysql -u root software_requests < backup_20240101_120000.sql
```

### Maintenance Tasks
1. **Monitor disk space**: JSON data in form_data can grow large
2. **Archive old records**: Consider archiving requests older than 1 year
3. **Index optimization**: Rebuild indexes quarterly
4. **Backup verification**: Test backup restoration monthly

---

## API Endpoints

### Authentication
- **POST** `/auth/login` - Login with credentials
- **GET** `/auth/profile` - Get current user profile
- **POST** `/auth/logout` - Logout (client-side token cleanup)

### Software Requests (Protected)
- **GET** `/software-requests` - List user's draft requests
- **POST** `/software-requests` - Create new draft
- **GET** `/software-requests/:id` - Get draft detail
- **PUT** `/software-requests/:id` - Update draft
- **DELETE** `/software-requests/:id` - Delete draft

All protected endpoints require:
- Valid JWT in `Authorization` header
- User identified from JWT claims
- Data filtered/restricted to authenticated user

---

## Performance Optimization

### Index Strategy
| Table | Index | Benefit |
|-------|-------|---------|
| users | idx_username | Fast login lookups |
| users | idx_is_active | Filter active users |
| Dbsoftwarerequests | idx_user_id | Filter user data (CRITICAL) |
| Dbsoftwarerequests | idx_status | Filter by request status |
| Dbsoftwarerequests | idx_request_date | Sort by date |

### Query Performance
1. Always filter by `user_id` first
2. Use indexes for WHERE clauses
3. Limit JSON data size in form_data
4. Consider pagination for large result sets

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-01-22 | Initial schema with authentication and user isolation |

---

## Contact & Support

For database schema questions or modifications, contact the development team.
