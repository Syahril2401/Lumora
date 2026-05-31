package main

import (
	"context"
	"finpro/config"
	"finpro/controller"
	"finpro/repository"
	"finpro/routes"
	"finpro/service"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDatabase()

	// HOTFIX: Drop and recreate schedules table to ensure correct schema for Go models
	config.DB.Exec("DROP TABLE IF EXISTS schedules")
	hotfixErr := config.DB.Exec(`
		CREATE TABLE schedules (
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
		  google_event_id VARCHAR(255),
		  created_at DATETIME(3),
		  updated_at DATETIME(3)
		)
	`).Error
	if hotfixErr != nil {
		log.Printf("HOTFIX TABLE CREATION FAILED: %v", hotfixErr)
	} else {
		log.Printf("HOTFIX TABLE CREATION SUCCESSFUL")
	}
	// Repositories
	adminRepo := repository.NewAdminRepository(config.DB)
	userRepo := repository.NewUserRepository(config.DB)
	assessRepo := repository.NewAssessmentRepository(config.DB)
	dashRepo := repository.NewDashboardRepository(config.DB)
	noteRepo := repository.NewNoteRepository(config.DB)
	plannerRepo := repository.NewPlannerRepository(config.DB)
	targetRepo := repository.NewTargetRepository(config.DB)
	notifRepo := repository.NewNotificationRepository(config.DB)

	// Services
	profileService := service.NewProfileService("data/srl_profiles_81.json")
	aiService := service.NewAIService()
	authService := service.NewAuthService(userRepo)
	assessService := service.NewAssessmentService(assessRepo, profileService)
	dashService := service.NewDashboardService(dashRepo, assessRepo, userRepo)
	adminService := service.NewAdminService(adminRepo, userRepo, assessRepo)
	noteService := service.NewNoteService(noteRepo)
	plannerService := service.NewPlannerService(plannerRepo)
	targetService := service.NewTargetService(targetRepo)
	googleCalService := service.NewGoogleCalendarService()

	// Controllers
	authCtrl := controller.NewAuthController(authService)
	assessCtrl := controller.NewAssessmentController(assessService, aiService, userRepo)
	dashCtrl := controller.NewDashboardController(dashService)
	adminCtrl := controller.NewAdminController(adminService)
	testCtrl := controller.NewTestController()
	noteCtrl := controller.NewNoteController(noteService)
	plannerCtrl := controller.NewPlannerController(plannerService)
	targetCtrl := controller.NewTargetController(targetService)
	workspaceCtrl := controller.NewWorkspaceController(plannerRepo, targetRepo, noteRepo, notifRepo, assessRepo)
	googleCalCtrl := controller.NewGoogleCalendarController(googleCalService)

	// Router
	r := gin.Default()

	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8000", "http://127.0.0.1:8000", "http://localhost:8001", "http://127.0.0.1:8001"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "Accept", "X-Requested-With"},
		AllowCredentials: true,
	}))

	routes.SetupRoutes(r, authCtrl, assessCtrl, dashCtrl, adminCtrl, testCtrl, noteCtrl, plannerCtrl, targetCtrl, workspaceCtrl, googleCalCtrl)

	// Server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8008"
	}

	srv := &http.Server{
		Addr:    ":" + port,
		Handler: r,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()

	log.Printf("Server started on port %s", port)

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server exiting")
}
