import { useEffect } from "react";

export default function AIInterviewPrepResumeGuide() {
  useEffect(() => {
    // Load script
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs";

    script.onload = () => {
      new window.Landbot.Container({
        container: "#myLandbot",
        configUrl:
          "https://storage.googleapis.com/landbot.online/v3/H-3219663-GDKE0XN819JVY8L9/index.json",
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="myLandbot"
      style={{ width: "100%", height: "500px" }}
    />
  );
}