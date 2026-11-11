import { useState } from "react";

const caTasks = [
  {
    question: "What is the double entry for a cash sale?",
    options: ["Debit Cash, Credit Sales", "Debit Sales, Credit Cash", "Debit Profit, Credit Cash"],
    answer: "Debit Cash, Credit Sales",
    hint: "Remember — cash increases (debit), sales increases (credit)."
  },
  {
    question: "Which of these is an asset?",
    options: ["Bank Loan", "Inventory", "Rent Expense"],
    answer: "Inventory",
    hint: "Assets are resources you own."
  },
  {
    question: "Which financial statement shows a company's profitability?",
    options: ["Balance Sheet", "Income Statement", "Cash Flow Statement"],
    answer: "Income Statement",
    hint: "It reports revenues and expenses over a period."
  }
];

const CAgame1 = () => {
  const [taskIndex, setTaskIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [showPopup, setShowPopup] = useState(null);

  const handleAnswer = (option) => {
    if (option === caTasks[taskIndex].answer) {
      setCompleted(completed + 1);
      setShowPopup({ type: "success", message: "🎉 Correct! Smart move!" });
      if (taskIndex + 1 < caTasks.length) {
        setTaskIndex(taskIndex + 1);
      } else {
        setShowPopup({ type: "success", message: "🎉 All puzzles solved! Level Complete!" });
      }
    } else {
      setShowPopup({ type: "error", message: "❌ Not quite. Try again!" });
    }
    setShowHint(false);
    setTimeout(() => setShowPopup(null), 1800);
  };

  const progressPercent = (completed / caTasks.length) * 100;

  return (
    <div
      style={{
        fontFamily: "'Comic Sans MS', cursive",
        background: "linear-gradient(to right, #e0f7fa, #fff3e0)",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center"
      }}
    >
      <h1 style={{ fontSize: "2.4rem", marginBottom: "10px" }}>💰 CA Quest: Level 1</h1>

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
            background: "#66bb6a",
            borderRadius: "12px",
            transition: "0.5s"
          }} />
        </div>
      </div>

      <div style={{
        background: "#fff",
        borderRadius: "18px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        padding: "35px",
        maxWidth: "600px",
        margin: "30px auto"
      }}>
        <h3 style={{ color: "#ff7043" }}>📝 Puzzle {taskIndex + 1}</h3>
        <p style={{ fontSize: "1.4rem", fontWeight: "bold", margin: "15px 0" }}>{caTasks[taskIndex].question}</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", margin: "25px 0" }}>
          {caTasks[taskIndex].options.map((option, i) => (
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
            {caTasks[taskIndex].hint}
          </div>
        )}
      </div>

      {completed === caTasks.length && (
        <button
          style={{
            marginTop: "25px",
            padding: "14px 26px",
            borderRadius: "14px",
            background: "#ba68c8",
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

export default CAgame1;