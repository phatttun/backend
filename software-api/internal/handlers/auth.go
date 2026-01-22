package handlers

import (
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"log"
	"strings"
	"time"

	"software-newtest/software-api/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// JWTSecret - Secret key for JWT signing (should be in env variable in production)
var JWTSecret = "your-secret-key-change-this-in-production-use-env-variable"

// TokenExpiration - Token expiration time in seconds
const TokenExpiration = 86400 // 24 hours

// GenerateJWT generates a JWT token
func GenerateJWT(user *models.User) (string, error) {
	expirationTime := time.Now().Add(time.Duration(TokenExpiration) * time.Second)

	claims := jwt.MapClaims{
		"id":       user.ID,
		"username": user.Username,
		"email":    user.Email,
		"fullName": user.FullName,
		"exp":      expirationTime.Unix(),
		"iat":      time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(JWTSecret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// VerifyJWT verifies a JWT token and returns the claims
func VerifyJWT(tokenString string) (*models.AuthClaims, error) {
	// Remove "Bearer " prefix if present
	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(JWTSecret), nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	// Check expiration
	exp, ok := claims["exp"].(float64)
	if !ok || time.Now().Unix() > int64(exp) {
		return nil, errors.New("token expired")
	}

	authClaims := &models.AuthClaims{
		ID:       getStringClaim(claims, "id"),
		Username: getStringClaim(claims, "username"),
		Email:    getStringClaim(claims, "email"),
		FullName: getStringClaim(claims, "fullName"),
	}

	return authClaims, nil
}

// HashPassword hashes a password using SHA256 (use bcrypt in production)
func HashPassword(password string) string {
	hash := sha256.Sum256([]byte(password))
	return hex.EncodeToString(hash[:])
}

// getStringClaim safely gets a string claim from JWT claims
func getStringClaim(claims jwt.MapClaims, key string) string {
	if val, ok := claims[key].(string); ok {
		return val
	}
	return ""
}

// AuthMiddleware is a middleware to verify JWT tokens
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		log.Printf("AuthMiddleware: Authorization header = '%s'", authHeader)

		if authHeader == "" {
			log.Printf("AuthMiddleware: Missing authorization header for %s %s", c.Request.Method, c.Request.URL.Path)
			c.JSON(401, gin.H{"error": "Missing authorization header"})
			c.Abort()
			return
		}

		claims, err := VerifyJWT(authHeader)
		if err != nil {
			log.Printf("Token verification error: %v", err)
			c.JSON(401, gin.H{"error": "Invalid or expired token"})
			c.Abort()
			return
		}

		log.Printf("AuthMiddleware: Token verified for user: %s", claims.ID)
		// Store user info in context for later use
		c.Set("user_id", claims.ID)
		c.Set("username", claims.Username)
		c.Set("user_claims", claims)

		c.Next()
	}
}
