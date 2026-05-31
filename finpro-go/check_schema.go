package main

import (
	"finpro/config"
	"log"
)

func main() {
	config.ConnectDatabase()
	
	// Print columns of schedules table
	var columns []string
	config.DB.Raw("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'srl_platform' AND TABLE_NAME = 'schedules'").Scan(&columns)
	log.Printf("Schedules columns: %v", columns)
}
