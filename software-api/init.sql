CREATE DATABASE IF NOT EXISTS software_requests;

USE software_requests;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    email VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_is_active (is_active)
);

-- Software requests table with user tracking
CREATE TABLE IF NOT EXISTS Dbsoftwarerequests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    form_data JSON NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Draft',
    request_date DATETIME NOT NULL,
    request_no VARCHAR(100),
    ci_id VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_request_date (request_date)
);

-- Add sample users for testing (passwords are SHA256 hashes of "password123")
INSERT IGNORE INTO users (id, username, password_hash, full_name, email) VALUES
('EMP001', 'emp001', '482c811da5d5b4bc6d497ffa98491e38', 'John Doe', 'john@example.com'),
('EMP002', 'emp002', '482c811da5d5b4bc6d497ffa98491e38', 'Jane Smith', 'jane@example.com'),
('EMP003', 'emp003', '482c811da5d5b4bc6d497ffa98491e38', 'Admin User', 'admin@example.com');