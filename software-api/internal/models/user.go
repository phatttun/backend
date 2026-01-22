package models

import "time"

// User represents a user account
type User struct {
	ID           string    `json:"id"`
	Username     string    `json:"username"`
	PasswordHash string    `json:"-"` // Never expose this
	FullName     string    `json:"fullName"`
	Email        string    `json:"email"`
	IsActive     bool      `json:"isActive"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

// LoginRequest represents the login request payload
type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// LoginResponse represents the login response payload
type LoginResponse struct {
	Token     string `json:"token"`
	ExpiresIn int    `json:"expiresIn"`
	User      User   `json:"user"`
}

// AuthClaims represents JWT claims
type AuthClaims struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	FullName string `json:"fullName"`
}
