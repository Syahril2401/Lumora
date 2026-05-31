package controller

import (
	"finpro/service"
	"finpro/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type GoogleCalendarController struct {
	calendarService *service.GoogleCalendarService
}

func NewGoogleCalendarController(calendarService *service.GoogleCalendarService) *GoogleCalendarController {
	return &GoogleCalendarController{calendarService: calendarService}
}

// GoogleLogin redirects the user to Google's OAuth consent screen
func (ctrl *GoogleCalendarController) GoogleLogin(c *gin.Context) {
	// Use the JWT userID as state to link the OAuth flow back to the user
	userID, exists := c.Get("userID")
	state := "anonymous"
	if exists {
		state = userID.(string)
	}
	// If called with token from frontend
	if tokenStr := c.Query("token"); tokenStr != "" {
		claims, err := utils.ValidateToken(tokenStr)
		if err == nil {
			state = claims.UserID
		}
	}

	url := ctrl.calendarService.GetLoginURL(state)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

// GoogleCallback handles the OAuth callback from Google
func (ctrl *GoogleCalendarController) GoogleCallback(c *gin.Context) {
	code := c.Query("code")
	state := c.Query("state") // this is the userID we passed as state

	if code == "" {
		c.Redirect(http.StatusTemporaryRedirect, "http://localhost:8000/dashboard/planner?google_error=Missing+authorization+code")
		return
	}

	token, err := ctrl.calendarService.ExchangeCode(c.Request.Context(), code)
	if err != nil {
		c.Redirect(http.StatusTemporaryRedirect, "http://localhost:8000/dashboard/planner?google_error=Failed+to+exchange+code")
		return
	}

	// Save tokens for the user
	if state != "" && state != "anonymous" {
		if err := ctrl.calendarService.SaveTokensForUser(state, token); err != nil {
			c.Redirect(http.StatusTemporaryRedirect, "http://localhost:8000/dashboard/planner?google_error=Failed+to+save+tokens")
			return
		}
	}

	// Redirect back to the planner page
	c.Redirect(http.StatusTemporaryRedirect, "http://localhost:8000/dashboard/planner?google_connected=true")
}

// GetEvents returns Google Calendar events for the authenticated user
func (ctrl *GoogleCalendarController) GetEvents(c *gin.Context) {
	userID := c.GetString("userID")

	// Parse time range from query params, default to current week
	now := time.Now()
	weekday := now.Weekday()
	if weekday == time.Sunday {
		weekday = 7
	}
	monday := now.AddDate(0, 0, -int(weekday-time.Monday))
	sunday := monday.AddDate(0, 0, 6)

	timeMin := time.Date(monday.Year(), monday.Month(), monday.Day(), 0, 0, 0, 0, now.Location())
	timeMax := time.Date(sunday.Year(), sunday.Month(), sunday.Day(), 23, 59, 59, 0, now.Location())

	if qMin := c.Query("time_min"); qMin != "" {
		if t, err := time.Parse("2006-01-02", qMin); err == nil {
			timeMin = t
		}
	}
	if qMax := c.Query("time_max"); qMax != "" {
		if t, err := time.Parse("2006-01-02", qMax); err == nil {
			timeMax = t.Add(23*time.Hour + 59*time.Minute + 59*time.Second)
		}
	}

	events, err := ctrl.calendarService.GetCalendarEvents(userID, timeMin, timeMax)
	if err != nil {
		utils.ResponseJSON(c, http.StatusBadRequest, false, err.Error(), nil)
		return
	}

	// Transform to a simpler format for the frontend
	type SimpleEvent struct {
		ID          string `json:"id"`
		Title       string `json:"title"`
		Description string `json:"description"`
		Date        string `json:"date"`
		StartTime   string `json:"start_time"`
		EndTime     string `json:"end_time"`
		Source      string `json:"source"`
	}

	var result []SimpleEvent
	loc, err := time.LoadLocation("Asia/Jakarta")
	if err != nil {
		loc = time.Local
	}

	for _, e := range events {
		se := SimpleEvent{
			ID:          e.Id,
			Title:       e.Summary,
			Description: e.Description,
			Source:      "google",
		}
		if e.Start != nil && e.Start.DateTime != "" {
			t, _ := time.Parse(time.RFC3339, e.Start.DateTime)
			t = t.In(loc)
			se.Date = t.Format("2006-01-02")
			se.StartTime = t.Format("15:04")
		}
		if e.End != nil && e.End.DateTime != "" {
			t, _ := time.Parse(time.RFC3339, e.End.DateTime)
			t = t.In(loc)
			se.EndTime = t.Format("15:04")
		}
		result = append(result, se)
	}

	utils.ResponseJSON(c, http.StatusOK, true, "Events fetched", result)
}

// GetStatus returns whether Google Calendar is connected
func (ctrl *GoogleCalendarController) GetStatus(c *gin.Context) {
	userID := c.GetString("userID")
	connected := ctrl.calendarService.IsConnected(userID)
	utils.ResponseJSON(c, http.StatusOK, true, "Status retrieved", gin.H{"connected": connected})
}

// Disconnect removes the Google Calendar connection
func (ctrl *GoogleCalendarController) Disconnect(c *gin.Context) {
	userID := c.GetString("userID")
	if err := ctrl.calendarService.DisconnectGoogle(userID); err != nil {
		utils.ResponseJSON(c, http.StatusInternalServerError, false, "Failed to disconnect", nil)
		return
	}
	utils.ResponseJSON(c, http.StatusOK, true, "Google Calendar disconnected", nil)
}
