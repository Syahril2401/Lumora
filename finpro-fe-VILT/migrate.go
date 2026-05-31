package main

import (
	"finpro/config"
	"finpro/model"
	"log"
)

func main() {
	config.ConnectDatabase()
	err := config.DB.AutoMigrate(
		&model.Schedule{},
	)
	if err != nil {
		log.Fatalf("Migration failed: %v", err)
	}
	log.Println("Migration successful!")
}
