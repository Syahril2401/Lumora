package controller

import (
	"finpro/repository"
	"finpro/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ProfileController struct {
	userRepo repository.UserRepository
}

func NewProfileController(userRepo repository.UserRepository) *ProfileController {
	return &ProfileController{userRepo}
}

func (ctrl *ProfileController) GetProfile(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		utils.ResponseJSON(c, http.StatusUnauthorized, false, "Unauthorized", nil)
		return
	}

	user, err := ctrl.userRepo.FindByID(userID.(string))
	if err != nil {
		utils.ResponseJSON(c, http.StatusNotFound, false, "User not found", nil)
		return
	}

	utils.ResponseJSON(c, http.StatusOK, true, "Profile fetched successfully", user)
}

func (ctrl *ProfileController) UpdateProfile(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		utils.ResponseJSON(c, http.StatusUnauthorized, false, "Unauthorized", nil)
		return
	}

	user, err := ctrl.userRepo.FindByID(userID.(string))
	if err != nil {
		utils.ResponseJSON(c, http.StatusNotFound, false, "User not found", nil)
		return
	}

	var input struct {
		Name  string `json:"name"`
		Email string `json:"email"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		utils.ResponseJSON(c, http.StatusBadRequest, false, err.Error(), nil)
		return
	}

	if input.Name != "" {
		user.Name = input.Name
	}

	if input.Email != "" {
		user.Email = input.Email
	}

	if err := ctrl.userRepo.UpdateUser(user); err != nil {
		utils.ResponseJSON(c, http.StatusInternalServerError, false, "Failed to update profile", nil)
		return
	}

	utils.ResponseJSON(c, http.StatusOK, true, "Profile updated successfully", user)
}
