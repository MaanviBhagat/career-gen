import { useEffect } from "react";

export default function AIStudyAbroadAdvisor() {
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
          "https://storage.googleapis.com/landbot.online/v3/H-3391714-CBSFK7XH8ATMF3PO/index.json",
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