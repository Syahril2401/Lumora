package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	historyJSON := `[{"role":"user","content":"Buatkan plan"},{"role":"bot","content":"Jam berapa?"}]`
	
	messages := []map[string]string{
		{"role": "system", "content": "System Prompt Here"},
	}

	if historyJSON != "" {
		var history []struct {
			Role    string `json:"role"`
			Content string `json:"content"`
		}
		if err := json.Unmarshal([]byte(historyJSON), &history); err == nil {
			if len(history) > 10 {
				history = history[len(history)-10:]
			}
			for _, h := range history {
				role := h.Role
				if role == "bot" {
					role = "assistant"
				}
				messages = append(messages, map[string]string{
					"role":    role,
					"content": h.Content,
				})
			}
		} else {
			fmt.Println("Error unmarshaling history:", err)
		}
	}

	messages = append(messages, map[string]string{
		"role":    "user",
		"content": "Matematika jam 8",
	})

	b, _ := json.MarshalIndent(messages, "", "  ")
	fmt.Println(string(b))
}
