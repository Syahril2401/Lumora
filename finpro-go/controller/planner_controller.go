package controller

import (
	"finpro/config"
	"finpro/model"
	"finpro/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PlannerController struct {
	svc service.PlannerService
}

func NewPlannerController(svc service.PlannerService) *PlannerController {
	return &PlannerController{svc}
}

func (ctrl *PlannerController) GetSessions(c *gin.Context) {
	userID := c.MustGet("userID").(string)
	weekParam := c.Query("week")
	sessions, err := ctrl.svc.GetByWeek(c.Request.Context(), userID, weekParam)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": sessions})
}

func (ctrl *PlannerController) GetSession(c *gin.Context) {
	userID := c.MustGet("userID").(string)
	id := c.Param("id")
	session, err := ctrl.svc.GetByID(c.Request.Context(), userID, id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Session not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": session})
}

func (ctrl *PlannerController) CreateSession(c *gin.Context) {
	userID := c.MustGet("userID").(string)
	var req service.CreateScheduleReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	session, err := ctrl.svc.Create(c.Request.Context(), userID, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	// Sync to Google Calendar asynchronously if connected
	go func() {
		googleService := service.NewGoogleCalendarService()
		if googleService.IsConnected(userID) {
			googleID, err := googleService.SyncSessionToGoogle(userID, *session)
			if err == nil && googleID != "" {
				// Update database with google_event_id
				// Assuming config.DB is accessible, or using service method. 
				// The cleanest way is to use the repository, but we don't have it directly.
				config.DB.Model(&model.Schedule{}).Where("schedule_id = ?", session.ScheduleID).Update("google_event_id", googleID)
			}
		}
	}()

	c.JSON(http.StatusCreated, gin.H{"message": "Session created", "data": session})
}

func (ctrl *PlannerController) UpdateSession(c *gin.Context) {
	userID := c.MustGet("userID").(string)
	id := c.Param("id")
	var req service.UpdateScheduleReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	session, err := ctrl.svc.Update(c.Request.Context(), userID, id, req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Session updated", "data": session})
}

func (ctrl *PlannerController) DeleteSession(c *gin.Context) {
	userID := c.MustGet("userID").(string)
	id := c.Param("id")
	// Get session first to check for google_event_id
	session, getErr := ctrl.svc.GetByID(c.Request.Context(), userID, id)
	
	if getErr == nil && session != nil {
		// Local event exists
		err := ctrl.svc.Delete(c.Request.Context(), userID, id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Delete from Google Calendar asynchronously if it had a google_event_id
		if session.GoogleEventID != nil && *session.GoogleEventID != "" {
			go func() {
				googleService := service.NewGoogleCalendarService()
				if googleService.IsConnected(userID) {
					_ = googleService.DeleteGoogleEvent(userID, *session.GoogleEventID)
				}
			}()
		}
		c.JSON(http.StatusOK, gin.H{"message": "Session deleted"})
		return
	}

	// If not found locally, try deleting directly from Google Calendar as a pure Google event
	googleService := service.NewGoogleCalendarService()
	if googleService.IsConnected(userID) {
		err := googleService.DeleteGoogleEvent(userID, id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete from Google Calendar: " + err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Google Session deleted"})
		return
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Session not found"})
}

func (ctrl *PlannerController) CompleteSession(c *gin.Context) {
	userID := c.MustGet("userID").(string)
	id := c.Param("id")
	session, err := ctrl.svc.Complete(c.Request.Context(), userID, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Session completed", "data": session})
}

func (ctrl *PlannerController) SkipSession(c *gin.Context) {
	userID := c.MustGet("userID").(string)
	id := c.Param("id")
	session, err := ctrl.svc.Skip(c.Request.Context(), userID, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Session skipped", "data": session})
}
