package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	"software-newtest/software-api/internal/database"
	"software-newtest/software-api/internal/models"

	"github.com/gin-gonic/gin"
)

func CreateSoftwareRequest(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var payload json.RawMessage
	if err := c.ShouldBindJSON(&payload); err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Printf("Creating draft for user: %v, payload: %s", userID, string(payload))
	query := `INSERT INTO Dbsoftwarerequests (user_id, form_data, status, request_date, ci_id) VALUES (?, ?, ?, ?, ?)`
	result, err := database.DB.Exec(query, userID, string(payload), "Draft", time.Now(), "")
	if err != nil {
		log.Printf("Database error creating request: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save request", "details": err.Error()})
		return
	}

	lastID, _ := result.LastInsertId()
	log.Printf("Draft created successfully with ID: %d", lastID)
	c.JSON(http.StatusCreated, gin.H{"message": "Draft saved successfully", "id": lastID})
}

func GetSoftwareRequests(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	log.Printf("===== GetSoftwareRequests START for user: %v =====", userID)

	// Only get requests for the current user with Draft status
	query := `SELECT id, form_data, status, request_date FROM Dbsoftwarerequests WHERE user_id = ? AND status = ? ORDER BY request_date DESC`
	rows, err := database.DB.Query(query, userID, "Draft")
	if err != nil {
		log.Printf("Error fetching requests: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch requests"})
		return
	}
	defer rows.Close()

	var items []models.DraftListItem
	count := 0
	for rows.Next() {
		var sr models.SoftwareRequest
		err := rows.Scan(&sr.ID, &sr.FormData, &sr.Status, &sr.RequestDate)
		if err != nil {
			log.Printf("Error scanning row: %v", err)
			continue
		}
		count++

		var fd models.FormData
		if err := json.Unmarshal(sr.FormData, &fd); err != nil {
			log.Printf("Error unmarshaling form_data for ID %d: %v", sr.ID, err)
			continue
		}

		item := models.DraftListItem{
			ID:              sr.ID,
			RequestNo:       "",
			CIID:            "",
			CIName:          fd.CIName,
			CIVersion:       fd.CIVersion,
			ServiceName:     fd.ServiceName,
			Requester:       fd.CreatedBy,
			RequestDate:     sr.RequestDate.In(time.FixedZone("ICT", 7*3600)).Format("2006-01-02 15:04:05"),
			Status:          sr.Status,
			CurrentOperator: "",
		}
		items = append(items, item)
	}
	log.Printf("Found %d Draft items for user %v (scanned %d rows)", len(items), userID, count)
	log.Printf("===== GetSoftwareRequests END =====")

	if items == nil {
		items = []models.DraftListItem{}
	}
	c.JSON(http.StatusOK, items)
}

func GetSoftwareRequestByID(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	log.Printf("===== GetSoftwareRequestByID START =====")
	log.Printf("Request ID: %d, User ID: %v", id, userID)

	var sr models.SoftwareRequest
	// Ensure the request belongs to the current user
	query := `SELECT id, form_data, status, request_date, request_no, ci_id FROM Dbsoftwarerequests WHERE id = ? AND user_id = ?`
	err = database.DB.QueryRow(query, id, userID).Scan(&sr.ID, &sr.FormData, &sr.Status, &sr.RequestDate, &sr.RequestNo, &sr.CIID)
	if err != nil {
		log.Printf("Error querying request (id=%d, user_id=%v): %v", id, userID, err)
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found or access denied"})
		return
	}

	log.Printf("Found request: ID=%d, Status=%s, RequestNo=%v", sr.ID, sr.Status, sr.RequestNo)
	log.Printf("===== GetSoftwareRequestByID END =====")
	c.JSON(http.StatusOK, sr)
}

func UpdateSoftwareRequest(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var payload json.RawMessage
	if err := c.ShouldBindJSON(&payload); err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Printf("===== UpdateSoftwareRequest START =====")
	log.Printf("Request ID: %d for user: %v", id, userID)
	log.Printf("Payload length: %d", len(payload))
	log.Printf("Payload (first 500 chars): %.500s", string(payload))

	// First, check if the record exists and belongs to the current user
	var currentStatus string
	var currentFormData string
	checkQuery := `SELECT status, form_data FROM Dbsoftwarerequests WHERE id = ? AND user_id = ?`
	err = database.DB.QueryRow(checkQuery, id, userID).Scan(&currentStatus, &currentFormData)
	if err != nil {
		log.Printf("Error checking status: %v", err)
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found or access denied"})
		return
	}

	log.Printf("Current status: %s", currentStatus)
	log.Printf("Current form_data length: %d", len(currentFormData))

	if currentStatus == "Draft" {
		// Update form_data only, keep as Draft
		log.Printf("Updating as Draft (status stays Draft)")
		query := `UPDATE Dbsoftwarerequests SET form_data = ? WHERE id = ? AND user_id = ?`
		result, err := database.DB.Exec(query, string(payload), id, userID)
		if err != nil {
			log.Printf("Error updating draft: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update draft", "details": err.Error()})
			return
		}
		rowsAffected, _ := result.RowsAffected()
		log.Printf("Draft updated successfully. Rows affected: %d", rowsAffected)

		// Verify the update
		var verifyFormData string
		verifyQuery := `SELECT form_data FROM Dbsoftwarerequests WHERE id = ?`
		err = database.DB.QueryRow(verifyQuery, id).Scan(&verifyFormData)
		if err == nil {
			log.Printf("Verification: Updated form_data length: %d", len(verifyFormData))
			log.Printf("Verification: Updated form_data (first 500 chars): %.500s", verifyFormData)
		}

		log.Printf("===== UpdateSoftwareRequest END (SUCCESS) =====")
		c.JSON(http.StatusOK, gin.H{"message": "Draft updated successfully", "rowsAffected": rowsAffected})
	} else {
		// If not Draft, treat as submit (existing logic)
		log.Printf("Updating as Submitted (status changes to Submitted)")
		requestNo := "REQ-" + strconv.Itoa(id)
		ciID := "CI-" + strconv.Itoa(id)
		query := `UPDATE Dbsoftwarerequests SET form_data = ?, status = ?, request_no = ?, ci_id = ? WHERE id = ? AND user_id = ?`
		_, err = database.DB.Exec(query, string(payload), "Submitted", requestNo, ciID, id, userID)
		if err != nil {
			log.Printf("Error submitting request: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to submit request", "details": err.Error()})
			return
		}
		log.Printf("===== UpdateSoftwareRequest END (SUCCESS - SUBMITTED) =====")
		c.JSON(http.StatusOK, gin.H{"message": "Request submitted successfully"})
	}
}

func DeleteSoftwareRequest(c *gin.Context) {
	userID, ok := c.Get("user_id")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	// Ensure the request belongs to the current user
	query := `DELETE FROM Dbsoftwarerequests WHERE id = ? AND user_id = ?`
	result, err := database.DB.Exec(query, id, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete request"})
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found or access denied"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Request deleted successfully"})
}
