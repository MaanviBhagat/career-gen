import { useState } from "react";

const csTasks = [
  {
    question: "Which document initiates a company's incorporation?",
    options: ["Memorandum of Association", "Articles of Association", "Prospectus"],
    answer: "Memorandum of Association",
    hint: "It's the company’s constitution."
  },
  {
    question: "Who is responsible for maintaining company statutory records?",
    options: ["Auditor", "Company Secretary", "Director"],
    answer: "Company Secretary",
    hint: "It's literally their primary duty."
  },
  {
    question: "Which meeting is mandatory every year for a company?",
    options: ["Extraordinary Meeting", "Annual General Meeting (AGM)", "Board Meeting"],
    answer: "Annual General Meeting (AGM)",
    hint: "It's where shareholders gather annually."
  }
];

const CSGgame1 = () => {
  const [taskIndex, setTaskIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [showPopup, setShowPopup] = useState(null);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [miniGameDone, setMiniGameDone] = useState(false);

  const handleAnswer = (option) => {
    if (option === csTasks[taskIndex].answer) {
      setCompleted(completed + 1);
      setShowPopup({ type: "success", message: "🎉 Correct! Great pick!" });
      if (taskIndex + 1 < csTasks.length) {
        setTaskIndex(taskIndex + 1);
      } else {
        setShowMiniGame(true);
      }
    } else {
      setShowPopup({ type: "error", message: "❌ Oops, not quite!" });
    }
    setShowHint(false);
    setTimeout(() => setShowPopup(null), 1600);
  };

  const handleMiniGame = () => {
    setMiniGameDone(true);
    setShowPopup({ type: "success", message: "🎉 Mini game complete!" });
    setTimeout(() => setShowPopup(null), 1600);
  };

  const progressPercent = ((completed + (miniGameDone ? 1 : 0)) / (csTasks.length + 1)) * 100;

  return (
    <div
      style={{
        fontFamily: "'Comic Sans MS', cursive",
        background: "linear-gradient(to right, #fce4ec, #f3e5f5)",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center"
      }}
    >
      <h1 style={{ fontSize: "2.4rem", marginBottom: "10px" }}>📑 CS Quest: Level 1</h1>

      <div style={{
        margin: "20px auto",
        backgroundColor: "#fff8dc",
        width: "75%",
        padding: "14px",
        borderRadius: "20px",
        boxShadow: "0 0 18px rgba(0,0,0,0.2)"
      }}>
        <strong>Progress:</strong>
        <div style={{
          height: "22px",
          background: "#ddd",
          borderRadius: "12px",
          marginTop: "8px"
        }}>
          <div style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "#ec407a",
            borderRadius: "12px",
            transition: "0.5s"
          }} />
        </div>
      </div>

      {!showMiniGame && (
        <div style={{
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          padding: "35px",
          maxWidth: "600px",
          margin: "30px auto"
        }}>
          <h3 style={{ color: "#7e57c2" }}>📖 Puzzle {taskIndex + 1}</h3>
          <p style={{ fontSize: "1.4rem", fontWeight: "bold", margin: "15px 0" }}>{csTasks[taskIndex].question}</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", margin: "25px 0" }}>
            {csTasks[taskIndex].options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                style={{
                  margin: "12px",
                  padding: "14px 24px",
                  borderRadius: "14px",
                  background: "#ffee58",
                  border: "3px dashed #333",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "3px 3px 0 #666"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowHint(!showHint)}
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              background: "#81d4fa",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "2px 2px 0 #333",
              marginBottom: "10px"
            }}
          >
            💡 Hint
          </button>
          {showHint && (
            <div style={{
              marginTop: "15px",
              background: "#fff3e0",
              padding: "14px",
              borderRadius: "12px",
              boxShadow: "2px 2px 8px rgba(0,0,0,0.2)"
            }}>
              {csTasks[taskIndex].hint}
            </div>
          )}
        </div>
      )}

      {showMiniGame && !miniGameDone && (
        <div style={{
          background: "#fff8e1",
          padding: "30px",
          borderRadius: "18px",
          boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
          margin: "30px auto",
          maxWidth: "600px"
        }}>
          <h3 style={{ color: "#ef5350" }}>🎮 Mini Puzzle: Find the Magic Seal!</h3>
          <p style={{ marginBottom: "15px" }}>Click the right box to unlock the company seal.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "20px 0" }}>
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={handleMiniGame}
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  background: "#ffcc80",
                  border: "2px solid #333",
                  cursor: "pointer",
                  boxShadow: "3px 3px 0 #444"
                }}
              >
                📜
              </button>
            ))}
          </div>
        </div>
      )}

      {miniGameDone && (
        <button
          style={{
            marginTop: "25px",
            padding: "14px 26px",
            borderRadius: "14px",
            background: "#ab47bc",
            color: "#fff",
            border: "none",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer",
            boxShadow: "4px 4px 0 #333"
          }}
        >
          🚀 Proceed to Next Level
        </button>
      )}

      {showPopup && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: showPopup.type === "success" ? "#d4edda" : "#f8d7da",
          color: "#333",
          padding: "16px 26px",
          borderRadius: "14px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 1000
        }}>
          {showPopup.message}
        </div>
      )}
    </div>
  );
};

export default CSGgame1;