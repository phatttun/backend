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
	var payload json.RawMessage
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	query := `INSERT INTO Dbsoftwarerequests (form_data, status, request_date, request_no, ci_id) VALUES (?, ?, ?, ?, ?)`
	_, err := database.DB.Exec(query, string(payload), "Draft", time.Now(), "", "")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save request"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Draft saved successfully"})
}

func GetSoftwareRequests(c *gin.Context) {
	log.Printf("===== GetSoftwareRequests START =====")
	query := `SELECT id, form_data, status, request_date FROM Dbsoftwarerequests WHERE status = ?`
	rows, err := database.DB.Query(query, "Draft")
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
			RequestDate:     sr.RequestDate.Format("2006-01-02 15:04:05"),
			Status:          sr.Status,
			CurrentOperator: "",
		}
		items = append(items, item)
	}
	log.Printf("Found %d Draft items (scanned %d rows)", len(items), count)
	log.Printf("===== GetSoftwareRequests END =====")

	if items == nil {
		items = []models.DraftListItem{}
	}
	c.JSON(http.StatusOK, items)
}

func GetSoftwareRequestByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var sr models.SoftwareRequest
	query := `SELECT id, form_data, status, request_date, request_no, ci_id FROM Dbsoftwarerequests WHERE id = ?`
	err = database.DB.QueryRow(query, id).Scan(&sr.ID, &sr.FormData, &sr.Status, &sr.RequestDate, &sr.RequestNo, &sr.CIID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
		return
	}

	c.JSON(http.StatusOK, sr)
}

func UpdateSoftwareRequest(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	var payload json.RawMessage
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	log.Printf("===== UpdateSoftwareRequest START =====")
	log.Printf("Request ID: %d", id)
	log.Printf("Payload length: %d", len(payload))
	log.Printf("Payload (first 500 chars): %.500s", string(payload))

	// First, check if the record exists
	var currentStatus string
	var currentFormData string
	checkQuery := `SELECT status, form_data FROM Dbsoftwarerequests WHERE id = ?`
	err = database.DB.QueryRow(checkQuery, id).Scan(&currentStatus, &currentFormData)
	if err != nil {
		log.Printf("Error checking status: %v", err)
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
		return
	}

	log.Printf("Current status: %s", currentStatus)
	log.Printf("Current form_data length: %d", len(currentFormData))

	if currentStatus == "Draft" {
		// Update form_data only, keep as Draft
		log.Printf("Updating as Draft (status stays Draft)")
		query := `UPDATE Dbsoftwarerequests SET form_data = ? WHERE id = ?`
		result, err := database.DB.Exec(query, payload, id)
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
		query := `UPDATE Dbsoftwarerequests SET form_data = ?, status = ?, request_no = ?, ci_id = ? WHERE id = ?`
		_, err = database.DB.Exec(query, payload, "Submitted", requestNo, ciID, id)
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
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
		return
	}

	query := `DELETE FROM Dbsoftwarerequests WHERE id = ?`
	_, err = database.DB.Exec(query, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Request deleted successfully"})
}
