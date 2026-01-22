CREATE DATABASE IF NOT EXISTS software_requests;

USE software_requests;

CREATE TABLE IF NOT EXISTS Dbsoftwarerequests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    form_data JSON NOT NULL,
    status VARCHAR(50) NOT NULL,
    request_date DATETIME NOT NULL,
    request_no VARCHAR(100),
    ci_id VARCHAR(100)
);