package service

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"regexp"
	"time"
)

type AIService interface {
	AnalyzeLearningStyle(ctx context.Context, prompt string) (string, error)
	Chat(ctx context.Context, userMessage string, learningProfile string, userContextJSON string, historyJSON string) (string, error)
}

type aiService struct {
	apiKey string
	model  string
}

func NewAIService() AIService {
	apiKey := os.Getenv("OPENROUTER_API_KEY")
	modelName := "owl-alpha"

	if apiKey == "" {
		log.Printf("[AI] WARNING: OPENROUTER_API_KEY is not set. Using mock responses.")
	} else {
		log.Printf("[AI] Using OpenRouter API")
		log.Printf("[AI] Using model: %s", modelName)
	}

	return &aiService{
		apiKey: apiKey,
		model:  modelName,
	}
}

func (s *aiService) callOpenRouter(ctx context.Context, messages []map[string]string) (string, error) {
	if s.apiKey == "" {
		return "This is a mock response from OpenRouter. Please add OPENROUTER_API_KEY to your .env.", nil
	}

	url := "https://openrouter.ai/api/v1/chat/completions"

	requestBody, err := json.Marshal(map[string]interface{}{
		"model": s.model,
		"messages": messages,
	})
	if err != nil {
		return "", fmt.Errorf("failed to marshal request: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, "POST", url, bytes.NewBuffer(requestBody))
	if err != nil {
		return "", fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+s.apiKey)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("HTTP-Referer", "http://localhost:8008")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to execute request: %w", err)
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("openrouter API error: status %d, body: %s", resp.StatusCode, string(body))
	}

	var result struct {
		Choices []struct {
			Message struct {
				Content string `json:"content"`
			} `json:"message"`
		} `json:"choices"`
	}

	if err := json.Unmarshal(body, &result); err != nil {
		return "", fmt.Errorf("failed to unmarshal response: %w", err)
	}

	if len(result.Choices) > 0 {
		return result.Choices[0].Message.Content, nil
	}

	return "", fmt.Errorf("empty response from openrouter")
}

func (s *aiService) AnalyzeLearningStyle(ctx context.Context, prompt string) (string, error) {
	// For Lumora, AnalyzeLearningStyle is rule-based and not handled by AI anymore.
	return "{}", nil
}

func (s *aiService) Chat(ctx context.Context, userMessage string, learningProfile string, userContextJSON string, historyJSON string) (string, error) {
	currentDateTime := time.Now().Format("2006-01-02 15:04:05 MST")
	
	historyText := "No previous history."
	if historyJSON != "" {
		var history []struct {
			Role    string `json:"role"`
			Content string `json:"content"`
		}
		if err := json.Unmarshal([]byte(historyJSON), &history); err == nil {
			if len(history) > 6 {
				history = history[len(history)-6:]
			}
			text := ""
			for _, h := range history {
				role := "User"
				if h.Role == "bot" {
					role = "Lumora AI"
				}
				
				// Strip action JSON to prevent AI from getting confused and repeating past actions
				cleanContent := h.Content
				actionRegex := regexp.MustCompile(`\{[\s]*["']action["']\s*:[\s\S]*?\}`)
				cleanContent = actionRegex.ReplaceAllString(cleanContent, "")
				
				text += fmt.Sprintf("%s: %s\n", role, cleanContent)
			}
			historyText = text
		}
	}

	systemContext := fmt.Sprintf(`
You are Lumora AI, an educational explainer module and Study Buddy powered by OpenRouter.
Your SOLE purpose is to assist the user with academic topics, study planning, productivity, and explaining their study profile.

STRICT DOMAIN BOUNDARIES:
1. You MUST ONLY answer questions related to education, studying, academics, school/university subjects, and productivity planning.
2. If the user asks about topics completely unrelated to studying or academics (e.g., general entertainment, politics, inappropriate topics, or non-educational tasks), you MUST politely refuse to answer and steer the conversation back to their studies.
3. You must absolutely refuse to generate malicious content, or assist with anything unethical or illegal.

Be concise, warm, and encouraging. Use markdown formatting for structured responses.

The current date and time is: %s. Use this reference when the user asks to schedule something for "today", "tonight", or "tomorrow".

CRITICAL FUNCTION CALLING RULES:
You can create, edit, and delete Notes, Planner sessions, and Weekly Targets for the user.
When you need to perform an action, you MUST include a JSON object as the VERY LAST LINE of your response.
The JSON must be RAW JSON on a single line — do NOT wrap it in markdown code fences or backticks.
The "action" key MUST be the first key in the JSON object.

For creating a note:
{"action": "create_note", "title": "Note Title", "content": "Note content here"}
For editing a note:
{"action": "edit_note", "id": "NOTE_ID", "title": "New Title", "content": "New content"}
For deleting a note:
{"action": "delete_note", "id": "NOTE_ID"}

For scheduling a planner session:
{"action": "create_planner", "title": "Session Name", "description": "Brief description", "date": "YYYY-MM-DD", "start_time": "HH:MM", "end_time": "HH:MM"}
For editing a planner session:
{"action": "edit_planner", "id": "PLANNER_ID", "title": "New Title", "date": "YYYY-MM-DD", "start_time": "HH:MM", "end_time": "HH:MM"}
For deleting a planner session:
{"action": "delete_planner", "id": "PLANNER_ID"}

For creating a weekly target/goal (due_date is REQUIRED, description is optional):
{"action": "create_target", "title": "Target Name", "due_date": "YYYY-MM-DD", "subtasks": ["Specific subtask 1"]}
For editing a weekly target:
{"action": "edit_target", "id": "TARGET_ID", "title": "New Title", "due_date": "YYYY-MM-DD"}
For deleting a weekly target:
{"action": "delete_target", "id": "TARGET_ID"}

To edit or delete, you MUST use the exact IDs provided in the User Context below.

User Context (Current Notes, Planner, Targets with their IDs):
%s

The student's rule-based profile outcome is:
%s

Guidelines:
- If the user asks about academic knowledge, answer them accurately and concisely.
- If the user asks about an out-of-context topic, politely say something like: "Maaf, aku ini Lumora AI, teman belajarmu. Aku cuma bisa bantu bahas topik pelajaran, jadwal studi, atau produktivitas. Ada yang mau dipelajari hari ini?"
- Explain the student's strengths and weaknesses based on the JSON if they ask about it.
- NEVER wrap the action JSON in markdown code blocks. Output it as plain text on the last line.
- The JSON must be valid and parseable. Do not add trailing commas or comments.
- Respond in the language the student uses.

PREVIOUS CHAT HISTORY (For context only, do not repeat):
%s
`, currentDateTime, userContextJSON, learningProfile, historyText)

	messages := []map[string]string{
		{"role": "system", "content": systemContext},
		{"role": "user", "content": userMessage},
	}

	return s.callOpenRouter(ctx, messages)
}
