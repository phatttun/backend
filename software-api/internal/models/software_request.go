package models

import (
	"encoding/json"
	"time"
)

type SoftwareRequest struct {
	ID          int             `json:"id" db:"id"`
	FormData    json.RawMessage `json:"form_data" db:"form_data"`
	Status      string          `json:"status" db:"status"`
	RequestDate time.Time       `json:"request_date" db:"request_date"`
	RequestNo   string          `json:"request_no" db:"request_no"`
	CIID        string          `json:"ci_id" db:"ci_id"`
}

type DraftListItem struct {
	ID              int    `json:"id"`
	RequestNo       string `json:"requestNo"`
	CIID            string `json:"ciId"`
	CIName          string `json:"ciName"`
	CIVersion       string `json:"ciVersion"`
	ServiceName     string `json:"serviceName"`
	Requester       string `json:"requester"`
	RequestDate     string `json:"requestDate"`
	Status          string `json:"status"`
	CurrentOperator string `json:"currentOperator"`
}

type FormData struct {
	CIName      string `json:"ciName"`
	CIVersion   string `json:"ciVersion"`
	ServiceName string `json:"serviceName"`
	CreatedBy   string `json:"createdBy"`
}
