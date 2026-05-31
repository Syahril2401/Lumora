package service

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type AIService interface {
	AnalyzeLearningStyle(ctx context.Context, prompt string) (string, error)
	Chat(ctx context.Context, userMessage string, learningProfile string) (string, error)
}

type aiService struct {
	apiKey string
	model  string
}

func NewAIService() AIService {
	apiKey := os.Getenv("GEMINI_API_KEY")
	modelName := "gemini-flash-latest" // High token quota, fast, general knowledge

	if apiKey == "" {
		log.Printf("[AI] WARNING: GEMINI_API_KEY is not set. Using mock responses to prevent blocking the user flow.")
	} else {
		log.Printf("[AI] Using Google Gemini API via SDK")
		log.Printf("[AI] Using model: %s", modelName)
	}

	return &aiService{
		apiKey: apiKey,
		model:  modelName,
	}
}

func (s *aiService) callGemini(ctx context.Context, systemContext, userPrompt string) (string, error) {
	if s.apiKey == "" {
		// Mock response so the flow doesn't break during testing
		return "This is a mock response from Gemini Flash. Please add GEMINI_API_KEY to your .env to enable real AI explanations.", nil
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(s.apiKey))
	if err != nil {
		return "", fmt.Errorf("failed to create gemini client: %w", err)
	}
	defer client.Close()

	model := client.GenerativeModel(s.model)
	
	// Set System Instruction
	model.SystemInstruction = &genai.Content{
		Parts: []genai.Part{genai.Text(systemContext)},
	}

	resp, err := model.GenerateContent(ctx, genai.Text(userPrompt))
	if err != nil {
		// Fallback to gemini-pro-latest if the flash model fails
		log.Printf("[AI] Model %s failed: %v. Falling back to gemini-pro-latest", s.model, err)
		fallbackModel := client.GenerativeModel("gemini-pro-latest")
		
		// Note: gemini-pro-latest might not support SystemInstruction via the same field, 
		// so we prepend it to the user prompt just to be safe in the fallback.
		promptWithContext := fmt.Sprintf("System Context:\n%s\n\nUser Message:\n%s", systemContext, userPrompt)
		
		fallbackResp, fallbackErr := fallbackModel.GenerateContent(ctx, genai.Text(promptWithContext))
		if fallbackErr != nil {
			return "", fmt.Errorf("gemini fallback also failed: %w", fallbackErr)
		}
		
		if len(fallbackResp.Candidates) > 0 && len(fallbackResp.Candidates[0].Content.Parts) > 0 {
			if txt, ok := fallbackResp.Candidates[0].Content.Parts[0].(genai.Text); ok {
				return string(txt), nil
			}
		}
		return "", fmt.Errorf("gemini fallback returned empty response")
	}

	if len(resp.Candidates) > 0 && len(resp.Candidates[0].Content.Parts) > 0 {
		if txt, ok := resp.Candidates[0].Content.Parts[0].(genai.Text); ok {
			return string(txt), nil
		}
	}

	return "", fmt.Errorf("empty response from gemini")
}

func (s *aiService) AnalyzeLearningStyle(ctx context.Context, prompt string) (string, error) {
	// For Lumora, AnalyzeLearningStyle is rule-based and not handled by AI anymore.
	return "{}", nil
}

func (s *aiService) Chat(ctx context.Context, userMessage string, learningProfile string) (string, error) {
	systemContext := fmt.Sprintf(`
You are Lumora AI, an explainer module powered by Google Gemini.
You are a helpful Study Buddy with vast general knowledge.
You can help the user with any academic topics or explain their study profile.
Be concise, warm, and encouraging.

The student's rule-based profile outcome is:
%s

Guidelines:
- If the user asks about general knowledge, answer them accurately and concisely.
- Explain the student's strengths and weaknesses based on the JSON if they ask about it.
- Stay focused on learning strategies and academic goals.
- Respond in the language the student uses.
`, learningProfile)

	return s.callGemini(ctx, systemContext, userMessage)
}
