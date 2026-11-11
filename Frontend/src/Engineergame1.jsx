import { useState } from "react";

const tasks = {
  civil: [
    {
      question: "Which bridge design can best withstand high winds?",
      options: ["Suspension", "Beam", "Arch", "Truss"],
      answer: "Suspension",
      hint: "Think Golden Gate."
    },
    {
      question: "Solve the pattern: 3, 6, 12, 24, ?",
      options: ["36", "42", "48", "50"],
      answer: "48",
      hint: "It’s doubling."
    }
  ],
  mechanical: [
    {
      question: "Which mechanism converts rotary motion to linear?",
      options: ["Cam", "Gear", "Crankshaft", "Hydraulics"],
      answer: "Cam",
      hint: "Think engine valves."
    },
    {
      question: "A shaft rotates 20 times/sec. What's its RPM?",
      options: ["1000", "1200", "1500", "1600"],
      answer: "1200",
      hint: "1 sec = 60 RPMs."
    }
  ],
  computer: [
    {
      question: "Which sorting algorithm is fastest on average?",
      options: ["Bubble", "Quick", "Insertion", "Selection"],
      answer: "Quick",
      hint: "Divide and conquer."
    },
    {
      question: "Find the bug: for(i=0;i<=10;i++) sum += i;",
      options: ["i=1", "i<10", "i<=", "i=0"],
      answer: "i<10",
      hint: "Off-by-one error."
    }
  ]
};

const Engggame1 = () => {
  const [selectedMap, setSelectedMap] = useState(null);
  const [task, setTask] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [levelDone, setLevelDone] = useState(false);
  const [wrongAnswerPopup, setWrongAnswerPopup] = useState(false);
  const [showNextLevelScreen, setShowNextLevelScreen] = useState(false);

  const drawTask = (domain) => {
    const availableTasks = tasks[domain].filter(
      (t) => !completed.find((c) => c.question === t.question)
    );
    if (availableTasks.length === 0) return;
    const randomIndex = Math.floor(Math.random() * availableTasks.length);
    setSelectedMap(domain);
    setTask(availableTasks[randomIndex]);
    setCorrect(false);
    setShowHint(false);
  };

  const handleAnswer = (option) => {
    if (option === task.answer) {
      setCorrect(true);
      setCompleted([...completed, task]);
      setTask(null);
      setSelectedMap(null);
      if (completed.length + 1 === 6) {
        setLevelDone(true);
        setTimeout(() => {
          setShowNextLevelScreen(true);
        }, 1000);
      }
    } else {
      setWrongAnswerPopup(true);
      setTimeout(() => {
        setWrongAnswerPopup(false);
      }, 1500);
    }
  };

  const progressPercent = (completed.length / 6) * 100;

  const handleNextLevel = () => {
    // You could navigate to another page, or reset game state for Level 2
    alert("🚀 Moving to Level 2 (Coming soon!)");
    setShowNextLevelScreen(false);
  };

  return (
    <div
      style={{
        fontFamily: "Comic Sans MS",
        background: "linear-gradient(to right, #f8e1f4, #e0f7fa)",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
        color: "#333",
        overflow: "hidden"
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>🎓 Engineer Quest: Level 1</h1>

      <div
        style={{
          margin: "20px auto",
          backgroundColor: "#fff3cd",
          width: "70%",
          padding: "10px",
          borderRadius: "20px",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)"
        }}
      >
        <strong>Progress:</strong>
        <div
          style={{
            height: "20px",
            background: "#e0e0e0",
            borderRadius: "10px",
            marginTop: "5px"
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progressPercent}%`,
              background: "#28a745",
              borderRadius: "10px",
              transition: "0.5s"
            }}
          />
        </div>
      </div>

      {!task && !levelDone && (
        <div>
          <h3>🎲 Choose a map to draw a puzzle!</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              margin: "30px 0"
            }}
          >
            {["civil", "mechanical", "computer"].map((domain) => (
              <button
                key={domain}
                onClick={() => drawTask(domain)}
                style={{
                  padding: "15px 25px",
                  borderRadius: "12px",
                  border: "2px dashed #555",
                  background: "#ffebcd",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "4px 4px 0 #333",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {domain.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {task && (
        <div
          style={{
            background: "#fff",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            padding: "30px",
            maxWidth: "600px",
            margin: "auto"
          }}
        >
          <h3 style={{ color: "#6a1b9a" }}>{selectedMap.toUpperCase()} Puzzle</h3>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{task.question}</p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              margin: "20px 0"
            }}
          >
            {task.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option)}
                style={{
                  margin: "10px",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  background: "#f1c40f",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "2px 2px 0 #888"
                }}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowHint(!showHint)}
            style={{
              background: "#5dade2",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            💡 {showHint ? "Hide Hint" : "Show Hint"}
          </button>

          {showHint && (
            <div
              style={{
                background: "#d1ecf1",
                padding: "10px",
                borderRadius: "10px",
                marginTop: "10px"
              }}
            >
              Hint: {task.hint}
            </div>
          )}
        </div>
      )}

      {wrongAnswerPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
          <div
            style={{
              background: "#ffeaa7",
              border: "5px dashed #d63031",
              borderRadius: "20px",
              padding: "40px",
              textAlign: "center",
              boxShadow: "0 0 30px rgba(0,0,0,0.4)"
            }}
          >
            <h2 style={{ color: "#d63031", fontSize: "2rem", marginBottom: "10px" }}>❌ Oops!</h2>
            <p style={{ fontSize: "1.2rem", marginBottom: "15px" }}>Wrong answer — try again!</p>
          </div>
        </div>
      )}

      {showNextLevelScreen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000
          }}
        >
          <div
            style={{
              background: "#ffeaa7",
              border: "8px dashed #00b894",
              borderRadius: "25px",
              padding: "50px",
              textAlign: "center",
              animation: "bounce 1s infinite alternate"
            }}
          >
            <h2 style={{ fontSize: "2.5rem", color: "#00b894", marginBottom: "20px" }}>
              🌟 Level Complete!
            </h2>
            <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
              Ready for the next level?
            </p>
            <button
              onClick={handleNextLevel}
              style={{
                padding: "15px 30px",
                background: "#00b894",
                color: "#fff",
                fontWeight: "bold",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "4px 4px 0 #333"
              }}
            >
              🚀 Next Level
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Engggame1;