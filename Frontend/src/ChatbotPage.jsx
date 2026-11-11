import React, { useEffect } from "react";
import "./ChatbotPage.css";

const ChatbotPage = () => {
  useEffect(() => {
    const initLandbot = () => {
      if (!window.myLandbot) {
        window.myLandbot = new window.Landbot.Container({
          container: "#chatbot-container",
          configUrl:
            "https://storage.googleapis.com/landbot.online/v3/H-3219663-GDKE0XN819JVY8L9/index.json",
        });
      }
    };

    const existingScript = document.getElementById("landbot-script");

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "landbot-script";
      script.type = "module";
      script.src =
        "https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs";

      script.onload = () => {
        initLandbot();
      };

      document.body.appendChild(script);
    } else {
      initLandbot();
    }
  }, []);

  return (
    <div className="chatbot-page">

      <div className="chatbot-header">
        <h1 className="chatbot-title">
          Career Gen Chat Assistant
        </h1>

        <p className="chatbot-subtitle">
          Chat with our AI counselor to explore careers and
          college insights 🚀
        </p>
      </div>

      <div
        id="chatbot-container"
        className="chatbot-container"
      ></div>

    </div>
  );
};

export default ChatbotPage;