import React, { useEffect } from "react";
import "./ChatbotPage.css"; // Fixed extension

const CareerAptitudeTest = () => {
  useEffect(() => {
    let myLandbotInstance = null;

    const initLandbot = () => {
      const container = document.getElementById("chatbot-container");
      if (window.Landbot && container) {
        // Clear previous content if remounting
        container.innerHTML = "";
        
        myLandbotInstance = new window.Landbot.Container({
          container: "#chatbot-container",
          configUrl:
            "https://storage.googleapis.com/landbot.online/v3/H-3553354-Z6DJU43RMET4RKLG/index.json",
        });
      }
    };

    const existingScript = document.getElementById("landbot-script");

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "landbot-script";
      script.async = true;
      // Use the standard bundle that binds window.Landbot
      script.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.js";

      script.onload = () => {
        initLandbot();
      };

      document.body.appendChild(script);
    } else {
      initLandbot();
    }

    // Cleanup when component unmounts
    return () => {
      if (myLandbotInstance && typeof myLandbotInstance.destroy === "function") {
        myLandbotInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="chatbot-page">
      <div className="chatbot-header">
        <h1 className="chatbot-title">Career Gen Aptitude Test</h1>
        <p className="chatbot-subtitle">
          Get your personalized career guidance by taking our aptitude test.
          Answer a series of questions to discover your strengths and the best
          career paths for you.
        </p>
      </div>

      <div id="chatbot-container" className="chatbot-container"></div>
    </div>
  );
};

export default CareerAptitudeTest;