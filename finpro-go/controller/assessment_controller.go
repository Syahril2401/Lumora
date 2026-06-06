package controller

import (
	"encoding/json"
	"net/http"

	"finpro/config"
	"finpro/model"
	"finpro/repository"
	"finpro/service"
	"finpro/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/datatypes"
)

type AssessmentController struct {
	service  service.AssessmentService
	aiSvc    service.AIService
	userRepo repository.UserRepository
}

func NewAssessmentController(s service.AssessmentService, ai service.AIService, uRepo repository.UserRepository) *AssessmentController {
	return &AssessmentController{service: s, aiSvc: ai, userRepo: uRepo}
}

// GetQuestions returns all active assessment questions.
func (ctrl *AssessmentController) GetQuestions(c *gin.Context) {
	questions, err := ctrl.service.GetQuestions()
	if err != nil {
		utils.ResponseJSON(c, http.StatusInternalServerError, false, err.Error(), nil)
		return
	}
	utils.ResponseJSON(c, http.StatusOK, true, "Success", questions)
}

// Submit processes the assessment answers and returns the result summary.
func (ctrl *AssessmentController) Submit(c *gin.Context) {
	var input []model.AssessmentInput

	if err := c.ShouldBindJSON(&input); err != nil {
		utils.ResponseJSON(c, http.StatusBadRequest, false, err.Error(), nil)
		return
	}

	userID := c.MustGet("userID").(string)
	summary, err := ctrl.service.SubmitResponses(c.Request.Context(), userID, input)
	if err != nil {
		utils.ResponseJSON(c, http.StatusInternalServerError, false, err.Error(), nil)
		return
	}

	utils.ResponseJSON(c, http.StatusCreated, true, "Assessment submitted successfully", summary)
}

// GetStatus checks if the user has already completed the assessment.
func (ctrl *AssessmentController) GetStatus(c *gin.Context) {
	userID := c.MustGet("userID").(string)
	completed, err := ctrl.service.HasCompletedAssessment(userID)
	if err != nil {
		utils.ResponseJSON(c, http.StatusInternalServerError, false, err.Error(), nil)
		return
	}
	utils.ResponseJSON(c, http.StatusOK, true, "Status fetched", gin.H{
		"has_completed": completed,
	})
}

// Chat handles AI chatbot messages from the user.
func (ctrl *AssessmentController) Chat(c *gin.Context) {
	var body struct {
		Message        string `json:"message" binding:"required"`
		LearningProfile string `json:"learning_profile"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		utils.ResponseJSON(c, http.StatusBadRequest, false, "message is required", nil)
		return
	}

	userID := c.MustGet("userID").(string)

	var notes []model.Note
	config.DB.Where("user_id = ?", userID).Order("updated_at desc").Limit(10).Find(&notes)
	
	var schedules []model.Schedule
	config.DB.Where("user_id = ?", userID).Order("date desc").Limit(10).Find(&schedules)

	var targets []model.Target
	config.DB.Where("user_id = ?", userID).Order("updated_at desc").Limit(10).Find(&targets)

	userContext := map[string]interface{}{
		"notes":     notes,
		"planner":   schedules,
		"targets":   targets,
	}
	userContextBytes, _ := json.Marshal(userContext)

	reply, err := ctrl.aiSvc.Chat(c.Request.Context(), body.Message, body.LearningProfile, string(userContextBytes))
	if err != nil {
		utils.ResponseJSON(c, http.StatusInternalServerError, false, "AI service error: "+err.Error(), nil)
		return
	}
	
	type ChatMessage struct {
		Role    string `json:"role"`
		Content string `json:"content"`
	}

	newMessages := []ChatMessage{
		{Role: "user", Content: body.Message},
		{Role: "bot", Content: reply},
	}

	aiLog, err := ctrl.userRepo.GetAILogByUserID(userID)
	if err != nil {
		importJson, _ := json.Marshal(newMessages)
		aiLog = &model.AILog{
			AILogID: uuid.New().String(),
			UserID:  userID,
			History: datatypes.JSON(importJson),
		}
		ctrl.userRepo.SaveAILog(aiLog)
	} else {
		var existingMessages []ChatMessage
		json.Unmarshal(aiLog.History, &existingMessages)
		existingMessages = append(existingMessages, newMessages...)
		importJson, _ := json.Marshal(existingMessages)
		aiLog.History = datatypes.JSON(importJson)
		ctrl.userRepo.SaveAILog(aiLog)
	}

	utils.ResponseJSON(c, http.StatusOK, true, "Success", gin.H{"reply": reply})
}

// GetChatHistory fetches the user's previous AI logs
func (ctrl *AssessmentController) GetChatHistory(c *gin.Context) {
	userID := c.MustGet("userID").(string)
	aiLog, err := ctrl.userRepo.GetAILogByUserID(userID)
	if err != nil {
		// Return empty list if no history found
		utils.ResponseJSON(c, http.StatusOK, true, "Success", []interface{}{})
		return
	}
	
	var history []map[string]interface{}
	json.Unmarshal(aiLog.History, &history)

	utils.ResponseJSON(c, http.StatusOK, true, "Success", history)
}
