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
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Routes
	r.POST("/software-requests", handlers.CreateSoftwareRequest)
	r.GET("/software-requests", handlers.GetSoftwareRequests)
	r.GET("/software-requests/:id", handlers.GetSoftwareRequestByID)
	r.PUT("/software-requests/:id", handlers.UpdateSoftwareRequest)
	r.DELETE("/software-requests/:id", handlers.DeleteSoftwareRequest)

	// Start server
	log.Println("Server starting on :8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
