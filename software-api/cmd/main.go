package main

import (
	"log"

	"software-newtest/software-api/internal/database"
	"software-newtest/software-api/internal/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize database
	database.InitDB()

	// Create Gin router
	r := gin.Default()

	// CORS middleware
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Public Routes - No authentication required
	r.POST("/auth/login", handlers.Login)
	r.POST("/auth/logout", handlers.Logout)

	// Protected Routes - Authentication required
	protected := r.Group("")
	protected.Use(handlers.AuthMiddleware())

	// Auth routes
	protected.GET("/auth/profile", handlers.GetProfile)

	// Software Request routes (user-specific)
	protected.POST("/software-requests", handlers.CreateSoftwareRequest)
	protected.GET("/software-requests", handlers.GetSoftwareRequests)
	protected.GET("/software-requests/:id", handlers.GetSoftwareRequestByID)
	protected.PUT("/software-requests/:id", handlers.UpdateSoftwareRequest)
	protected.DELETE("/software-requests/:id", handlers.DeleteSoftwareRequest)

	// Start server
	log.Println("Server starting on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
