import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

const categories = {
  Foundation: ["🧱 Brick", "🪨 Stone", "🦴 Bone"],
  Walls: ["🧱 Red Bricks", "🪵 Wooden Planks", "🧊 Ice Blocks"],
  Roof: ["🏠 Tiles", "🎩 Straw", "🪖 Metal Sheets"],
  Windows: ["🪟 Glass", "🎭 Gothic Arches", "🔍 Portals"],
  Doors: ["🚪 Oak", "🦄 Magic Gate", "🛸 Sci-Fi Slide"],
  Garden: ["🌳 Trees", "🌷 Flowers", "🪴 Potted Plants"],
  Soundscape: ["🎶 Birds", "🌊 Ocean", "🏙️ City"]
};

export default function Archgame1() {
  const [selections, setSelections] = useState({});
  const [vibe, setVibe] = useState("");
  const captureRef = useRef(null);

  const handleSelect = (category, option) => {
    setSelections({ ...selections, [category]: option });
  };

  const handleRandomize = () => {
    const newSelections = {};
    Object.keys(categories).forEach((category) => {
      const options = categories[category];
      const randomOption = options[Math.floor(Math.random() * options.length)];
      newSelections[category] = randomOption;
    });
    setSelections(newSelections);
  };

  const handleScreenshot = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "my_house.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const handleComplete = () => {
    const allEmojis = Object.values(selections)
      .map((item) => item.split(" ")[0])
      .join(" ");
    setVibe(`🏡 Your House Vibe: ${allEmojis}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        padding: "30px",
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        color: "#333",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <motion.div
        ref={captureRef}
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "#fff",
          borderRadius: "25px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1
          style={{
            fontSize: "36px",
            textAlign: "center",
            color: "#ff4081",
            marginBottom: "20px",
          }}
        >
          🏗️ Architect Level 1
        </h1>

        <div
          style={{
            background: "#ffe082",
            height: "150px",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "60px",
            marginBottom: "30px",
          }}
        >
          📐
        </div>

        {Object.entries(categories).map(([category, options]) => (
          <div key={category} style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "22px",
                marginBottom: "10px",
                color: "#ff7043",
              }}
            >
              {category}:
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {options.map((option) => (
                <motion.button
                  key={option}
                  onClick={() => handleSelect(category, option)}
                  style={{
                    padding: "10px 18px",
                    fontSize: "18px",
                    borderRadius: "12px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor:
                      selections[category] === option ? "#4dd0e1" : "#e0e0e0",
                    color:
                      selections[category] === option ? "#fff" : "#333",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={handleRandomize}
            style={{
              backgroundColor: "#fbc02d",
              color: "#000",
              padding: "10px 20px",
              borderRadius: "15px",
              fontSize: "18px",
              border: "none",
              cursor: "pointer",
            }}
          >
            🎲 Randomize
          </button>
          <button
            onClick={handleScreenshot}
            style={{
              backgroundColor: "#66bb6a",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "15px",
              fontSize: "18px",
              border: "none",
              cursor: "pointer",
            }}
          >
            💾 Save My House
          </button>
          <button
            onClick={handleComplete}
            style={{
              backgroundColor: "#42a5f5",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "15px",
              fontSize: "18px",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✅ Complete Level
          </button>
        </div>

        {vibe && (
          <motion.div
            style={{
              textAlign: "center",
              fontSize: "24px",
              marginTop: "30px",
              color: "#8e24aa",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {vibe}
            <div style={{ marginTop: "20px" }}>
              <button
                style={{
                  backgroundColor: "#ec407a",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: "15px",
                  fontSize: "18px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                📐 Proceed to Level 2
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
