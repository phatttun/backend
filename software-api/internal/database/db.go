package database

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func InitDB() {
	var err error
	// Adjust the DSN as per your XAMPP MySQL setup
	// Default XAMPP: user=root, password="", host=localhost, port=3306, db=software_requests
	dsn := "root:@tcp(localhost:3306)/software_requests?parseTime=true"
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatal("Failed to ping database:", err)
	}

	log.Println("Connected to MySQL database")
}
