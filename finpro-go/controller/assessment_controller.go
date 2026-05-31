package controller

import (
	"fmt"
	"net/http"

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

	reply, err := ctrl.aiSvc.Chat(c.Request.Context(), body.Message, body.LearningProfile)
	if err != nil {
		utils.ResponseJSON(c, http.StatusInternalServerError, false, "AI service error: "+err.Error(), nil)
		return
	}

	userID := c.MustGet("userID").(string)
	aiOutputJSON := fmt.Sprintf(`{"reply": %q}`, reply)
	aiLog := &model.AILog{
		AILogID:     uuid.New().String(),
		UserID:      userID,
		PromptInput: body.Message,
		AIOutput:    datatypes.JSON([]byte(aiOutputJSON)),
	}
	// Import datatypes and uuid at the top! I will add them in another replace chunk or just rely on goimports
	ctrl.userRepo.SaveAILog(aiLog)

	utils.ResponseJSON(c, http.StatusOK, true, "Success", gin.H{"reply": reply})
}
