import React, { useState } from "react";
import "../styling/ChatComponent.css";

function ChatComponent() {
  const [prompt, setPrompt] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  const askAI = async () => {
    if (!prompt.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:8080/ask-ai?prompt=${prompt}`
      );
      const data = await response.text();
      setChatResponse(data || "No response from AI");
    } catch (error) {
      console.error("Error:", error);
      setChatResponse("Error communicating with AI");
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Chat With AI</h2>

      <div className="input-container">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt for AI"
          className="chat-input"
        />
        <button className="chat-btn" onClick={askAI} disabled={!prompt.trim()}>
          Ask AI
        </button>
      </div>

      <div className="output">
        <p>{chatResponse}</p>
      </div>
    </div>
  );
}

export default ChatComponent;
