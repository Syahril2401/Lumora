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

	// Drop the broken FK on targets table that points to subtasks (reversed)
	result := db.Exec("ALTER TABLE targets DROP FOREIGN KEY fk_subtasks_target")
	if result.Error != nil {
		log.Println("Drop FK error (may already be gone):", result.Error)
	} else {
		log.Println("SUCCESS: Dropped broken fk_subtasks_target from targets table")
	}

	// Also create the ai_logs table since it's missing
	result = db.Exec(`CREATE TABLE IF NOT EXISTS ai_logs (
		ai_log_id CHAR(36) PRIMARY KEY,
		user_id CHAR(36) NOT NULL UNIQUE,
		history JSON,
		created_at DATETIME(3),
		updated_at DATETIME(3),
		FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
	)`)
	if result.Error != nil {
		log.Println("Create ai_logs error:", result.Error)
	} else {
		log.Println("SUCCESS: ai_logs table ensured")
	}

	log.Println("Fix complete!")
}
