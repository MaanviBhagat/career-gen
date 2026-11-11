import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

const prompts = {
  Story: [
    "A boy discovers a secret map in his backyard.",
    "A cat who rules a hidden kingdom.",
    "The last human alive on Earth finds a robot friend."
  ],
  Poem: [
    "The colors of dawn",
    "A whisper in the wind",
    "Beneath the moon's soft gaze"
  ],
  Quote: [
    "Dreams begin when comfort ends.",
    "Words shape worlds.",
    "Even silence tells a story."
  ]
};

export default function WriterLevel1() {
  const [mode, setMode] = useState("Story");
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [writingBgColor, setWritingBgColor] = useState("#fff");
  const [wordCount, setWordCount] = useState(0);
  const captureRef = useRef(null);

  useEffect(() => {
    setWordCount(content.trim().split(/\s+/).filter(Boolean).length);
  }, [content]);

  const generatePrompt = () => {
    const list = prompts[mode];
    const random = list[Math.floor(Math.random() * list.length)];
    setPrompt(random);
  };

  const handleScreenshot = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "my_writing.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const bgColors = {
    "🎨 Blue": "#e0f2ff",
    "🌿 Green": "#e6ffed",
    "☁️ White": "#ffffff",
    "🪵 Sepia": "#f5e9da"
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffeb3b 0%, #f50057 100%)",
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
          maxWidth: "800px",
          background: "#fff",
          borderRadius: "25px",
          padding: "40px",
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
            marginBottom: "30px",
          }}
        >
          ✍️ Writer Level 1
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          {Object.keys(prompts).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: "12px 20px",
                borderRadius: "20px",
                backgroundColor: mode === m ? "#ff4081" : "#e0e0e0",
                color: mode === m ? "#fff" : "#333",
                fontSize: "18px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              {m}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <button
            onClick={generatePrompt}
            style={{
              backgroundColor: "#ffeb3b",
              padding: "12px 20px",
              borderRadius: "20px",
              fontSize: "18px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            🎲 Generate Prompt
          </button>
        </div>

        {prompt && (
          <div
            style={{
              backgroundColor: "#ffcc80",
              color: "#6d4c41",
              padding: "15px",
              borderRadius: "12px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            ✨ {prompt}
          </div>
        )}

        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              marginBottom: "15px",
              color: "#ff4081",
            }}
          >
            🎨 Choose Background:
          </h2>
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            {Object.entries(bgColors).map(([label, color]) => (
              <button
                key={label}
                onClick={() => setWritingBgColor(color)}
                style={{
                  padding: "12px 20px",
                  borderRadius: "20px",
                  backgroundColor: color,
                  color: "#333",
                  fontSize: "14px",
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing here..."
          style={{
            width: "100%",
            minHeight: "200px",
            padding: "15px",
            borderRadius: "20px",
            fontSize: "18px",
            boxShadow: "inset 0 4px 8px rgba(0,0,0,0.1)",
            backgroundColor: writingBgColor,
          }}
        />

        <div
          style={{
            textAlign: "right",
            fontSize: "14px",
            color: "#777",
            marginTop: "10px",
          }}
        >
          📝 Word Count: {wordCount}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "40px",
          }}
        >
          <button
            onClick={handleScreenshot}
            style={{
              backgroundColor: "#66bb6a",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "20px",
              fontSize: "18px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            💾 Save My Writing
          </button>
        </div>
      </motion.div>
    </div>
  );
}
