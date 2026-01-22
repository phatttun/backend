# Setup and Deployment Guide

## Quick Start

### Prerequisites
- Node.js 18+ (Frontend)
- Go 1.21+ (Backend)
- MySQL 8.0+ (Database)
- Git

### Step 1: Database Setup

#### Option A: Using XAMPP MySQL
```bash
# 1. Start XAMPP MySQL service
# 2. Open MySQL command line or phpMyAdmin
# 3. Run the init.sql file

mysql -u root < software-api/init.sql

# Verify tables created
mysql -u root software_requests
> SHOW TABLES;
> SELECT COUNT(*) FROM users;
```

#### Option B: Direct MySQL Command
```bash
# Connect to MySQL
mysql -u root -p

# Run the init.sql
source D:/โปรเจคgosoft/software-newtest/software-api/init.sql;

# Verify
USE software_requests;
DESCRIBE users;
DESCRIBE Dbsoftwarerequests;
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd software-api

# Download dependencies
go mod download
go mod tidy

# Run the server
go run cmd/main.go

# Expected output:
# Connected to MySQL database
# Server starting on :8080
```

**Test Backend:**
```bash
# Login API
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"emp001","password":"password123"}'

# Should return JWT token
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd ..

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env if needed
VITE_API_URL=http://localhost:8080

# Run development server
npm run dev

# Expected output:
# Local: http://localhost:5173
# Press 'o' to open in browser
```

### Step 4: Testing the Application

**Login Test:**
1. Navigate to http://localhost:5173/login
2. Enter username: `emp001`
3. Enter password: `password123`
4. Click "เข้าสู่ระบบ"
5. Should redirect to home page
6. Sidebar should display user info

**Verify User Isolation:**
1. Note the requests displayed for emp001
2. Logout
3. Login as `emp002`
4. emp002 should see different/empty requests
5. emp002 should NOT see emp001's requests

---

## Production Deployment

### Backend Deployment (Go)

#### Build
```bash
cd software-api

# Build for production
go build -o software-api cmd/main.go

# Or cross-compile for Linux server
GOOS=linux GOARCH=amd64 go build -o software-api cmd/main.go
```

#### Environment Variables
```bash
# Create .env file
export JWT_SECRET="your-secure-random-secret-key-min-32-chars"
export DB_HOST=localhost
export DB_PORT=3306
export DB_USER=root
export DB_PASSWORD=
export DB_NAME=software_requests
export PORT=8080
export GIN_MODE=release

# Or modify main.go to read from .env
```

#### Update Database Connection (Production)
In `internal/database/db.go`:
```go
// Instead of hardcoded DSN, use environment variables
dsn := fmt.Sprintf(
  "%s:%s@tcp(%s:%s)/%s?parseTime=true",
  os.Getenv("DB_USER"),
  os.Getenv("DB_PASSWORD"),
  os.Getenv("DB_HOST"),
  os.Getenv("DB_PORT"),
  os.Getenv("DB_NAME"),
)
```

#### Update JWT Secret (Production)
In `internal/handlers/auth.go`:
```go
import "os"

var JWTSecret = os.Getenv("JWT_SECRET")

func init() {
  if JWTSecret == "" {
    log.Fatal("JWT_SECRET environment variable must be set")
  }
}
```

#### Deploy to Linux Server
```bash
# 1. Upload binary and start script to server
scp software-api user@server:/opt/software-api/

# 2. Create systemd service file
sudo nano /etc/systemd/system/software-api.service

[Unit]
Description=Software Request API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/software-api
EnvironmentFile=/opt/software-api/.env
ExecStart=/opt/software-api/software-api
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target

# 3. Enable and start service
sudo systemctl enable software-api
sudo systemctl start software-api
sudo systemctl status software-api

# 4. View logs
sudo journalctl -u software-api -f
```

### Frontend Deployment (React)

#### Build
```bash
cd ../

# Build for production
npm run build

# Output: dist/ directory with optimized files
```

#### Environment Variables
In `.env.production`:
```env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=CP ALL Software Request System
```

#### Deploy to Web Server (Nginx)
```bash
# 1. Copy built files to web root
sudo cp -r dist/* /var/www/software-app/

# 2. Create Nginx config
sudo nano /etc/nginx/sites-available/software-app

server {
    listen 80;
    server_name yourdomain.com;

    root /var/www/software-app;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass http://localhost:8080/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Authorization $http_authorization;
    }

    # HTTPS redirect (after SSL setup)
    # return 301 https://$server_name$request_uri;
}

# 3. Enable site
sudo ln -s /etc/nginx/sites-available/software-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL/HTTPS Setup (Let's Encrypt)
```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### Database Backup (Production)
```bash
# Daily backup script
#!/bin/bash
BACKUP_DIR="/backups/database"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/software_requests_$TIMESTAMP.sql"

mysqldump -u root -p software_requests > "$BACKUP_FILE"
gzip "$BACKUP_FILE"

# Keep only last 30 backups
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +30 -delete

# Add to crontab for daily 2 AM execution
# 0 2 * * * /scripts/backup-database.sh
```

---

## Docker Deployment (Optional)

### Dockerfile (Backend)
```dockerfile
# Build stage
FROM golang:1.21 AS builder
WORKDIR /app
COPY software-api . 
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o software-api cmd/main.go

# Runtime stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/software-api .
EXPOSE 8080
CMD ["./software-api"]
```

### Dockerfile (Frontend)
```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# Runtime stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: software_requests
    volumes:
      - ./software-api/init.sql:/docker-entrypoint-initdb.d/init.sql
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"

  backend:
    build: ./software-api
    ports:
      - "8080:8080"
    environment:
      DB_HOST: mysql
      DB_PORT: 3306
      DB_USER: root
      DB_PASSWORD: root
      DB_NAME: software_requests
      JWT_SECRET: your-secret-key-here
      GIN_MODE: release
    depends_on:
      - mysql

  frontend:
    build: .
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mysql_data:
```

**Run Docker Compose:**
```bash
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop
docker-compose down
```

---

## Monitoring and Logs

### Backend Logs
```bash
# View logs in real-time
tail -f /var/log/software-api.log

# Filter for errors
grep "ERROR\|error" /var/log/software-api.log

# Check authentication issues
grep "Login\|Unauthorized" /var/log/software-api.log
```

### Database Logs
```bash
# MySQL error log
tail -f /var/log/mysql/error.log

# Slow query log
mysql -u root -p
> SET GLOBAL slow_query_log = 'ON';
> SET GLOBAL long_query_time = 2;
```

### Frontend Errors
- Browser DevTools → Console tab
- Check Network tab for API errors
- Check Application tab for stored tokens

---

## Troubleshooting

### Database Connection Error
**Error**: "Failed to connect to database"
**Solution**:
```go
// Check DSN is correct
dsn := "root:@tcp(localhost:3306)/software_requests?parseTime=true"
// Verify MySQL is running
mysql -u root
// Check database exists
SHOW DATABASES;
```

### Port Already in Use
**Error**: "listen tcp :8080: bind: address already in use"
**Solution**:
```bash
# Find process using port
lsof -i :8080
# Kill the process
kill -9 <PID>
# Or use different port
./software-api --port 8081
```

### CORS Errors
**Error**: "Access to XMLHttpRequest blocked by CORS policy"
**Solution**:
```go
// Verify CORS headers in main.go
c.Header("Access-Control-Allow-Origin", "*")
c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
```

### Token Errors
**Error**: "Invalid or expired token"
**Solution**:
```typescript
// Clear and re-login
tokenManager.clearToken();
// Navigate to login page
navigate('/login');
```

---

## Performance Optimization

### Frontend
- Enable gzip compression in Nginx
- Use React.lazy() for code splitting
- Enable service workers for PWA
- Optimize bundle size: `npm run build -- --analyze`

### Backend
- Add database indexes (already in schema)
- Implement caching for user profile
- Use connection pooling for MySQL
- Monitor query performance

### Database
```sql
-- Verify indexes exist
SHOW INDEX FROM Dbsoftwarerequests;
SHOW INDEX FROM users;

-- Monitor query performance
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 0.5;
```

---

## Security Checklist

### Frontend
- [ ] Environment variables configured
- [ ] HTTPS enabled in production
- [ ] Content Security Policy headers set
- [ ] Dependencies up to date (`npm audit`)
- [ ] Error messages don't leak sensitive info

### Backend
- [ ] JWT_SECRET set from environment variable
- [ ] Password hashing using bcrypt
- [ ] HTTPS enforced (redirect http → https)
- [ ] Dependencies up to date (`go get -u`)
- [ ] Database credentials from environment
- [ ] SQL queries use parameterized statements
- [ ] User data isolation enforced (user_id filtering)
- [ ] Rate limiting on login endpoint
- [ ] CORS restricted to specific domains

### Database
- [ ] Regular backups scheduled
- [ ] Password protected
- [ ] Firewall rules restrict access
- [ ] User table has password_hash only
- [ ] Foreign key constraints enabled
- [ ] Regular privilege review

---

## Support & Documentation

For more information, see:
- [SCHEMA.md](./SCHEMA.md) - Database design
- [AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md) - Auth implementation
- [README.md](./README.md) - Project overview
