package main

import (
	"finpro/config"
	"log"
)

func main() {
	config.ConnectDatabase()
	err := config.DB.Exec(`
		CREATE TABLE IF NOT EXISTS schedules (
		  schedule_id CHAR(36) PRIMARY KEY,
		  user_id CHAR(36) NOT NULL,
		  title VARCHAR(200) NOT NULL,
		  description TEXT,
		  date DATE NOT NULL,
		  start_time VARCHAR(10) NOT NULL,
		  end_time VARCHAR(10) NOT NULL,
		  duration_minutes INT DEFAULT 0,
		  focus_dimension VARCHAR(100) DEFAULT 'General',
		  status VARCHAR(50) DEFAULT 'planned',
		  target_id CHAR(36),
		  created_at DATETIME(3),
		  updated_at DATETIME(3)
		)
	`).Error

	if err != nil {
		log.Fatalf("Failed to create table: %v", err)
	}
	log.Println("Table created successfully!")
}
