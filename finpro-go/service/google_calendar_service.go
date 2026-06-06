package service

import (
	"context"
	"encoding/json"
	"finpro/config"
	"finpro/model"
	"fmt"
	"log"
	"os"
	"time"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/calendar/v3"
	"google.golang.org/api/option"
)

type GoogleCalendarService struct {
	oauthConfig *oauth2.Config
}

func NewGoogleCalendarService() *GoogleCalendarService {
	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	clientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
	redirectURL := os.Getenv("GOOGLE_REDIRECT_URL")
	if redirectURL == "" {
		redirectURL = "http://localhost:8008/api/auth/google/callback"
	}

	return &GoogleCalendarService{
		oauthConfig: &oauth2.Config{
			ClientID:     clientID,
			ClientSecret: clientSecret,
			RedirectURL:  redirectURL,
			Scopes: []string{
				"https://www.googleapis.com/auth/calendar.readonly",
				"https://www.googleapis.com/auth/calendar.events",
				"https://www.googleapis.com/auth/userinfo.email",
			},
			Endpoint: google.Endpoint,
		},
	}
}

func (s *GoogleCalendarService) GetLoginURL(state string) string {
	return s.oauthConfig.AuthCodeURL(state, oauth2.AccessTypeOffline, oauth2.ApprovalForce)
}

func (s *GoogleCalendarService) ExchangeCode(ctx context.Context, code string) (*oauth2.Token, error) {
	return s.oauthConfig.Exchange(ctx, code)
}

func (s *GoogleCalendarService) SaveTokensForUser(userID string, token *oauth2.Token) error {
	updates := map[string]interface{}{
		"google_access_token": token.AccessToken,
	}
	if token.RefreshToken != "" {
		updates["google_refresh_token"] = token.RefreshToken
	}
	return config.DB.Model(&model.User{}).
		Where("user_id = ?", userID).
		Updates(updates).Error
}

func (s *GoogleCalendarService) GetCalendarEvents(userID string, timeMin, timeMax time.Time) ([]*calendar.Event, error) {
	var user model.User
	if err := config.DB.Where("user_id = ?", userID).First(&user).Error; err != nil {
		return nil, fmt.Errorf("user not found: %w", err)
	}
	if user.GoogleAccessToken == nil || *user.GoogleAccessToken == "" {
		return nil, fmt.Errorf("google calendar not connected")
	}

	tok := &oauth2.Token{AccessToken: *user.GoogleAccessToken}
	if user.GoogleRefreshToken != nil {
		tok.RefreshToken = *user.GoogleRefreshToken
	}



	client := s.oauthConfig.Client(context.Background(), tok)
	srv, err := calendar.NewService(context.Background(), option.WithHTTPClient(client))
	if err != nil {
		return nil, fmt.Errorf("calendar service init failed: %w", err)
	}

	events, err := srv.Events.List("primary").
		TimeMin(timeMin.Format(time.RFC3339)).
		TimeMax(timeMax.Format(time.RFC3339)).
		SingleEvents(true).
		OrderBy("startTime").
		MaxResults(50).
		Do()
	if err != nil {
		// Token might be expired. Force a refresh and retry.
		tok.Expiry = time.Now().Add(-1 * time.Hour)
		newTok, refreshErr := s.oauthConfig.TokenSource(context.Background(), tok).Token()
		if refreshErr == nil && newTok.AccessToken != tok.AccessToken {
			if e := s.SaveTokensForUser(userID, newTok); e != nil {
				log.Printf("Warning: failed to persist refreshed token: %v", e)
			}
			client = s.oauthConfig.Client(context.Background(), newTok)
			srv, _ = calendar.NewService(context.Background(), option.WithHTTPClient(client))
			events, err = srv.Events.List("primary").
				TimeMin(timeMin.Format(time.RFC3339)).
				TimeMax(timeMax.Format(time.RFC3339)).
				SingleEvents(true).
				OrderBy("startTime").
				MaxResults(50).
				Do()
		}
		if err != nil {
			return nil, fmt.Errorf("failed to fetch events: %w", err)
		}
	}
	return events.Items, nil
}

func (s *GoogleCalendarService) SyncSessionToGoogle(userID string, session model.Schedule) (string, error) {
	var user model.User
	if err := config.DB.Where("user_id = ?", userID).First(&user).Error; err != nil {
		return "", fmt.Errorf("user not found: %w", err)
	}
	if user.GoogleAccessToken == nil || *user.GoogleAccessToken == "" {
		return "", fmt.Errorf("google calendar not connected")
	}

	tok := &oauth2.Token{AccessToken: *user.GoogleAccessToken}
	if user.GoogleRefreshToken != nil {
		tok.RefreshToken = *user.GoogleRefreshToken
	}

	client := s.oauthConfig.Client(context.Background(), tok)
	srv, err := calendar.NewService(context.Background(), option.WithHTTPClient(client))
	if err != nil {
		return "", fmt.Errorf("calendar service init failed: %w", err)
	}

	loc, _ := time.LoadLocation("Asia/Jakarta")
	startT, _ := time.ParseInLocation("2006-01-02 15:04", session.Date+" "+session.StartTime, loc)
	endT, _ := time.ParseInLocation("2006-01-02 15:04", session.Date+" "+session.EndTime, loc)

	event := &calendar.Event{
		Summary:     session.Title,
		Description: session.Description + "\n\n[Lumora - " + session.FocusDimension + "]",
		Start:       &calendar.EventDateTime{DateTime: startT.Format(time.RFC3339), TimeZone: "Asia/Jakarta"},
		End:         &calendar.EventDateTime{DateTime: endT.Format(time.RFC3339), TimeZone: "Asia/Jakarta"},
	}

	created, err := srv.Events.Insert("primary", event).Do()
	if err != nil {
		// Retry on token expiration
		tok.Expiry = time.Now().Add(-1 * time.Hour)
		newTok, refreshErr := s.oauthConfig.TokenSource(context.Background(), tok).Token()
		if refreshErr == nil && newTok.AccessToken != tok.AccessToken {
			if e := s.SaveTokensForUser(userID, newTok); e != nil {
				log.Printf("Warning: failed to persist refreshed token: %v", e)
			}
			client = s.oauthConfig.Client(context.Background(), newTok)
			srv, _ = calendar.NewService(context.Background(), option.WithHTTPClient(client))
			created, err = srv.Events.Insert("primary", event).Do()
		}
		if err != nil {
			return "", fmt.Errorf("failed to create event: %w", err)
		}
	}
	return created.Id, nil
}

func (s *GoogleCalendarService) DeleteGoogleEvent(userID string, eventID string) error {
	if eventID == "" {
		return nil // No event to delete
	}
	var user model.User
	if err := config.DB.Where("user_id = ?", userID).First(&user).Error; err != nil {
		return fmt.Errorf("user not found: %w", err)
	}
	if user.GoogleAccessToken == nil || *user.GoogleAccessToken == "" {
		return fmt.Errorf("google calendar not connected")
	}

	tok := &oauth2.Token{AccessToken: *user.GoogleAccessToken}
	if user.GoogleRefreshToken != nil {
		tok.RefreshToken = *user.GoogleRefreshToken
	}

	client := s.oauthConfig.Client(context.Background(), tok)
	srv, err := calendar.NewService(context.Background(), option.WithHTTPClient(client))
	if err != nil {
		return fmt.Errorf("calendar service init failed: %w", err)
	}

	err = srv.Events.Delete("primary", eventID).Do()
	if err != nil {
		// Retry on token expiration
		tok.Expiry = time.Now().Add(-1 * time.Hour)
		newTok, refreshErr := s.oauthConfig.TokenSource(context.Background(), tok).Token()
		if refreshErr == nil && newTok.AccessToken != tok.AccessToken {
			if e := s.SaveTokensForUser(userID, newTok); e != nil {
				log.Printf("Warning: failed to persist refreshed token: %v", e)
			}
			client = s.oauthConfig.Client(context.Background(), newTok)
			srv, _ = calendar.NewService(context.Background(), option.WithHTTPClient(client))
			err = srv.Events.Delete("primary", eventID).Do()
		}
		if err != nil {
			return fmt.Errorf("failed to delete google event: %w", err)
		}
	}
	return nil
}

func (s *GoogleCalendarService) IsConnected(userID string) bool {
	var user model.User
	if err := config.DB.Where("user_id = ?", userID).First(&user).Error; err != nil {
		return false
	}
	return user.GoogleAccessToken != nil && *user.GoogleAccessToken != ""
}

func (s *GoogleCalendarService) DisconnectGoogle(userID string) error {
	return config.DB.Model(&model.User{}).
		Where("user_id = ?", userID).
		Updates(map[string]interface{}{
			"google_access_token":  nil,
			"google_refresh_token": nil,
			"google_id":            nil,
		}).Error
}

func (s *GoogleCalendarService) GetUserEmailFromToken(token *oauth2.Token) (string, error) {
	client := s.oauthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	var info struct {
		Email string `json:"email"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&info); err != nil {
		return "", err
	}
	return info.Email, nil
}
