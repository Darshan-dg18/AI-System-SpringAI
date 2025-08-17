import React from "react";
import "../styling/frontpage.css";

function FrontPage({ onNavigate }) {
  return (
    <div className="frontpage">
      {/* Content Section */}
      <div className="frontpage-content">
        <h1>Welcome to the AI System</h1>
        <p>
          Interact with our AI model by asking questions or generating images.
        </p>

        <div className="button-container">
          <button onClick={() => onNavigate("chat")} className="nav-button">
            Chat with AI
          </button>
          <button onClick={() => onNavigate("image")} className="nav-button">
            Generate Images
          </button>
        </div>
      </div>

      {/* Animated Wave Background */}
      <div className="wave-bg">
        <svg
          className="wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#0d1b3d"
            fillOpacity="1"
            d="M0,192L80,181.3C160,171,320,149,480,160C640,171,800,213,960,218.7C1120,224,1280,192,1360,176L1440,160L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default FrontPage;
