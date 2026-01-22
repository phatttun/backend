package handlers

import (
	"log"
	"net/http"

	"software-newtest/software-api/internal/database"
	"software-newtest/software-api/internal/models"

	"github.com/gin-gonic/gin"
)

// Login handles user login
// POST /auth/login
func Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request", "details": err.Error()})
		return
	}

	log.Printf("Login attempt for username: %s", req.Username)

	// Query user by username
	var user models.User
	query := `SELECT id, username, password_hash, full_name, email, is_active FROM users WHERE username = ? AND is_active = TRUE`
	err := database.DB.QueryRow(query, req.Username).Scan(
		&user.ID,
		&user.Username,
		&user.PasswordHash,
		&user.FullName,
		&user.Email,
		&user.IsActive,
	)

	if err != nil {
		log.Printf("User not found: %v", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Verify password
	hashedPassword := HashPassword(req.Password)
	if hashedPassword != user.PasswordHash {
		log.Printf("Password mismatch for user: %s", req.Username)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Generate JWT token
	token, err := GenerateJWT(&user)
	if err != nil {
		log.Printf("Error generating token: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Remove password hash from response
	user.PasswordHash = ""

	response := models.LoginResponse{
		Token:     token,
		ExpiresIn: TokenExpiration,
		User:      user,
	}

	log.Printf("Login successful for user: %s", req.Username)
	c.JSON(http.StatusOK, response)
}

// GetProfile returns the current user's profile
// GET /auth/profile
func GetProfile(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var user models.User
	query := `SELECT id, username, full_name, email, is_active, created_at, updated_at FROM users WHERE id = ?`
	err := database.DB.QueryRow(query, userID).Scan(
		&user.ID,
		&user.Username,
		&user.FullName,
		&user.Email,
		&user.IsActive,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		log.Printf("User profile not found: %v", err)
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// Logout is a placeholder (JWT doesn't need logout on server)
// But you can use it to track logout on client side
// POST /auth/logout
func Logout(c *gin.Context) {
	// In a real application, you might want to:
	// 1. Add token to blacklist
	// 2. Update user's last_logout timestamp
	// 3. Clear client-side tokens (handled by frontend)

	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}
