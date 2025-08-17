import React, { useState } from "react";
import "../styling/ImageGenerator.css";

function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("⚠ Please enter a prompt");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8080/generate-image?prompt=${encodeURIComponent(
          prompt
        )}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.imageUrls && Array.isArray(data.imageUrls)) {
        setImageUrls(data.imageUrls);
      } else {
        setImageUrls([]);
        setError(
          "🙇 Sorry, the system encountered a temporary processing issue while generating the image."
        );
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setError(error.message || "❌ Failed to generate image");
      setImageUrls([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generator-container">
      <h2 className="title">AI Image Generator</h2>

      <div className="input-box">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your image prompt..."
          className="prompt-input"
        />
        <button
          onClick={generateImage}
          disabled={loading || !prompt.trim()}
          className="generate-btn"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="image-results">
        {imageUrls && imageUrls.length > 0
          ? imageUrls.map((url, index) => (
              <div key={index} className="image-card">
                <img src={url} alt={`Generated ${index + 1}`} />
              </div>
            ))
          : !loading &&
            !error && (
              <p className="placeholder">
                Generated images will appear here...
              </p>
            )}
      </div>
    </div>
  );
}

export default ImageGenerator;
