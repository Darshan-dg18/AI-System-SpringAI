import "./App.css";
import React, { useState } from "react";
import ImageGenerator from "./component/ImageGenerator";
import ChatComponent from "./component/ChatComponent";
import FrontPage from "./component/frontpage";

function App() {
  const [activeTab, setActiveTab] = useState("frontpage");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      {activeTab === "frontpage" && <FrontPage onNavigate={handleTabChange} />}

      {activeTab !== "frontpage" && (
        <>
          <div className="navigation">
            <button
              className={activeTab === "chat" ? "active" : ""}
              onClick={() => handleTabChange("chat")}
            >
              Chat
            </button>
            <button
              className={activeTab === "image" ? "active" : ""}
              onClick={() => handleTabChange("image")}
            >
              Image Generator
            </button>
            <button onClick={() => handleTabChange("frontpage")}>
              Back to Home
            </button>
          </div>

          <div className="content">
            {activeTab === "chat" && <ChatComponent />}
            {activeTab === "image" && <ImageGenerator />}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
