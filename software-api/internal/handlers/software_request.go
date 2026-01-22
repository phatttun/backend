package handlers

import (
	"encoding/json"
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
	_, err := database.DB.Exec(query, payload, "Draft", time.Now(), "", "")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save request"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Draft saved successfully"})
}

func GetSoftwareRequests(c *gin.Context) {
	query := `SELECT id, form_data, status, request_date FROM Dbsoftwarerequests WHERE status = ?`
	rows, err := database.DB.Query(query, "Draft")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch requests"})
		return
	}
	defer rows.Close()

	var items []models.DraftListItem
	for rows.Next() {
		var sr models.SoftwareRequest
		err := rows.Scan(&sr.ID, &sr.FormData, &sr.Status, &sr.RequestDate)
		if err != nil {
			continue
		}

		var fd models.FormData
		if err := json.Unmarshal(sr.FormData, &fd); err != nil {
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
