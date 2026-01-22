# Quick Reference Guide

## 🚀 Getting Started (5 Minutes)

### Step 1: Database
```bash
mysql -u root < software-api/init.sql
```
**Test accounts**: emp001, emp002, emp003 (password: password123)

### Step 2: Backend
```bash
cd software-api
go mod download
go run cmd/main.go
# Running on http://localhost:8080
```

### Step 3: Frontend
```bash
npm install
npm run dev
# Running on http://localhost:5173
```

### Step 4: Login
- URL: http://localhost:5173/login
- Username: emp001
- Password: password123

---

## 📁 Key Files Reference

### Frontend Authentication
| File | Purpose |
|------|---------|
| `src/contexts/AuthContext.tsx` | Global auth state |
| `src/utils/tokenManager.ts` | JWT storage |
| `src/services/apiClient.ts` | HTTP with JWT |
| `src/components/ProtectedRoute.tsx` | Route guard |
| `src/pages/Login.tsx` | Login form |

### Backend Authentication
| File | Purpose |
|------|---------|
| `internal/handlers/auth.go` | JWT utilities |
| `internal/handlers/auth_login.go` | Login endpoint |
| `internal/models/user.go` | User models |
| `cmd/main.go` | Server setup |

### Database
| File | Purpose |
|------|---------|
| `software-api/init.sql` | Schema & data |

---

## 🔐 Security Essentials

### Token Flow
```
Login → Token generated → Stored in TokenManager 
→ Auto-attached to API calls → Validated on backend
→ user_id extracted → Data filtered by user_id
```

### User Data Isolation
```sql
-- ALL queries filter by authenticated user_id
WHERE user_id = <jwt_user_id>
```

### Protected Routes
```
GET /login              → Public (no auth needed)
GET /                   → Protected (redirects to login if not auth)
GET /master             → Protected
POST /software-requests → Protected (user_id filtering)
```

---

## 🧪 Testing Checklist

- [ ] Login with emp001/password123 works
- [ ] Sidebar shows logged-in user
- [ ] Logout button works
- [ ] Accessing / without login redirects to /login
- [ ] emp001 cannot see emp002's requests
- [ ] Creating request assigns to current user
- [ ] Update/delete only works for own requests

---

## 🐛 Troubleshooting Quick Fixes

| Problem | Fix |
|---------|-----|
| Login fails | `SELECT * FROM users WHERE username='emp001'` |
| 401 errors | Re-login, check JWT_SECRET matches |
| User sees other data | Verify `WHERE user_id = ?` in queries |
| CORS errors | Check main.go CORS headers |
| Database won't connect | Check MySQL running, verify DSN |

---

## 📚 Documentation

- **[SCHEMA.md](./SCHEMA.md)** - Database design details
- **[AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md)** - Full auth guide
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Production setup
- **[README_IMPLEMENTATION.md](./README_IMPLEMENTATION.md)** - Complete overview

---

## 🔑 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080
```

### Backend (export or .env)
```bash
export JWT_SECRET="your-secret-key"
export DB_USER="root"
export PORT="8080"
```

---

## 💡 Common Commands

```bash
# Start everything
cd software-api && go run cmd/main.go &
npm run dev

# Test login API
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"emp001","password":"password123"}'

# Check database
mysql -u root software_requests
> SELECT * FROM users;
> SELECT * FROM Dbsoftwarerequests;

# Check logs
tail -f ~/.local/share/npm/logs/* # Frontend
journalctl -f -u software-api    # Backend (if systemd)
```

---

## ✅ Pre-Deployment Checklist

- [ ] Database initialized with init.sql
- [ ] Backend running on port 8080
- [ ] Frontend running on port 5173
- [ ] Login works with test account
- [ ] User isolation verified
- [ ] Error messages show correctly
- [ ] Token storage working
- [ ] Protected routes redirect properly

---

## 🎯 Implementation Status

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend Auth | ✅ Complete | Context, hooks, interceptors |
| Backend Auth | ✅ Complete | Login, JWT, middleware |
| Database | ✅ Complete | Schema with user tracking |
| User Isolation | ✅ Complete | All queries filter by user_id |
| API Integration | ✅ Complete | JWT auto-injection |
| Error Handling | ✅ Complete | User-friendly messages |
| Documentation | ✅ Complete | Comprehensive guides |

---

**Ready to deploy? See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** 🚀
