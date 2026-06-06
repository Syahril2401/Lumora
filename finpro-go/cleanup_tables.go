//go:build ignore

package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	godotenv.Load()

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASS"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("DB connection failed:", err)
	}

	// Disable foreign key checks to force drop tables
	db.Exec("SET FOREIGN_KEY_CHECKS=0;")

	tablesToDrop := []string{
		"evaluation_responses",
		"evaluations",
	}

	for _, table := range tablesToDrop {
		err := db.Exec(fmt.Sprintf("DROP TABLE IF EXISTS %s", table)).Error
		if err != nil {
			log.Printf("Failed to drop table %s: %v\n", table, err)
		} else {
			log.Printf("Dropped table: %s\n", table)
		}
	}

	// Re-enable foreign key checks
	db.Exec("SET FOREIGN_KEY_CHECKS=1;")

	log.Println("Database cleanup complete!")
}
