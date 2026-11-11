import { useState } from "react";

const Lawgame1 = () => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);

  const cases = [
    {
      scenario: "A person breaks into a house at night intending to steal.",
      options: ["Criminal Trespass", "Contract Law", "Defamation"],
      answer: "Criminal Trespass",
      hint: "Think about crimes involving illegal entry into private property.",
    },
    {
      scenario: "An agreement made without consideration is void.",
      options: ["Contract Law", "Criminal Trespass", "Tort"],
      answer: "Contract Law",
      hint: "Focus on agreements and enforceability rules.",
    },
    {
      scenario: "Publishing false statements that damage someone's reputation.",
      options: ["Defamation", "Property Law", "Constitutional Law"],
      answer: "Defamation",
      hint: "This deals with harming someone's good name.",
    },
    {
      scenario: "A doctor operates on a patient without consent.",
      options: ["Medical Negligence", "Criminal Trespass", "Constitutional Law"],
      answer: "Medical Negligence",
      hint: "Relates to professional responsibilities in healthcare.",
    },
    {
      scenario: "The government passes a law restricting free speech.",
      options: ["Constitutional Law", "Property Law", "Contract Law"],
      answer: "Constitutional Law",
      hint: "It's about citizens' fundamental rights.",
    },
  ];

  const doYouKnowFacts = [
    { title: "Criminal Lawyer", info: "Handles cases involving crimes like theft, assault, and fraud." },
    { title: "Corporate Lawyer", info: "Deals with business mergers, acquisitions, and company law matters." },
    { title: "Civil Rights Lawyer", info: "Fights cases related to fundamental rights and freedoms." },
    { title: "Family Lawyer", info: "Handles divorce, child custody, and inheritance disputes." },
  ];

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === cases[currentCaseIndex].answer) {
      setFeedback("✅ Correct!");
      setAnsweredCorrectly(true);
    } else {
      setFeedback(`❌ Incorrect! Try again.`);
      setAnsweredCorrectly(false);
    }
  };

  const handleNextCase = () => {
    const nextIndex = currentCaseIndex + 1;
    setAnsweredCorrectly(false);
    if (nextIndex < cases.length) {
      setCurrentCaseIndex(nextIndex);
      setFeedback("");
    } else {
      setCompleted(true);
    }
  };

  return (
    <div style={{
      padding: "20px",
      fontFamily: "Poppins, sans-serif",
      backgroundColor: "#fcf5e5",
      minHeight: "100vh",
      background: "linear-gradient(#fffaf0, #e0cfc2)",
      borderTop: "30px solid #8b4513",
      borderBottom: "20px solid #8b4513",
      position: "relative"
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "30px", backgroundColor: "#deb887" }}></div>
      <h1 style={{ fontSize: "40px", textAlign: "center", marginBottom: "10px", color: "#4b2e83", textShadow: "2px 2px #fff" }}>⚖️ Law Quest: Level 1</h1>
      <h3 style={{ textAlign: "center", color: "#333", fontSize: "20px" }}>🛡️ Courtroom Clues Challenge</h3>

      {!completed ? (
        <div style={{ marginTop: "20px", maxWidth: "700px", margin: "auto", background: "#fff", padding: "24px", borderRadius: "16px", boxShadow: "0 6px 16px rgba(0,0,0,0.15)" }}>
          <h2 style={{ fontSize: "26px", color: "#4b2e83" }}>📜 Case #{currentCaseIndex + 1}</h2>
          <p style={{ fontSize: "19px", marginBottom: "16px" }}>
            <strong>Scenario:</strong> {cases[currentCaseIndex].scenario}
          </p>

          <div style={{ backgroundColor: "#fffbe6", padding: "16px", borderRadius: "10px", marginBottom: "16px", border: "2px dashed #ffc53d" }}>
            <strong>💡 Hint:</strong> {cases[currentCaseIndex].hint}
          </div>

          {cases[currentCaseIndex].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerClick(option)}
              disabled={answeredCorrectly}
              style={{
                display: "block",
                padding: "16px 22px",
                margin: "12px 0",
                borderRadius: "14px",
                backgroundColor: answeredCorrectly ? "#d9f7be" : "#e6f7ff",
                border: "2px solid #69c0ff",
                fontSize: "18px",
                cursor: answeredCorrectly ? "default" : "pointer",
                textAlign: "left",
              }}
            >
              {option}
            </button>
          ))}

          {feedback && <div style={{ marginTop: "18px", fontSize: "19px", color: feedback.includes("Correct") ? "#52c41a" : "#f5222d" }}>{feedback}</div>}

          {answeredCorrectly && (
            <button
              onClick={handleNextCase}
              style={{
                padding: "14px 28px",
                backgroundColor: "#4b2e83",
                color: "#fff",
                fontSize: "18px",
                border: "none",
                borderRadius: "10px",
                marginTop: "20px",
                cursor: "pointer",
              }}
            >
              Next Case ➡️
            </button>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <h2 style={{ fontSize: "30px", color: "#4b2e83" }}>🎉 Court is adjourned!</h2>
          <div style={{
            width: "200px",
            height: "150px",
            backgroundColor: "#f3e5ab",
            border: "6px solid #8b4513",
            margin: "20px auto",
            borderRadius: "10px"
          }}>
            <div style={{ height: "20px", backgroundColor: "#deb887" }}></div>
          </div>
          <button
            onClick={() => alert("Proceeding to Level 2: Legal Labyrinth...")}
            style={{
              padding: "16px 34px",
              backgroundColor: "#4b2e83",
              border: "none",
              borderRadius: "14px",
              fontSize: "20px",
              cursor: "pointer",
              marginTop: "24px",
              color: "#fff",
            }}
          >
            Start Level 2: Legal Labyrinth ⏭️
          </button>
        </div>
      )}

      <div style={{ marginTop: "60px", maxWidth: "740px", margin: "50px auto 30px", padding: "24px", backgroundColor: "#fff", border: "1px solid #eee", borderRadius: "14px", boxShadow: "0 3px 10px rgba(0,0,0,0.08)" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "24px", color: "#4b2e83" }}>📚 Do You Know?</h2>
        {doYouKnowFacts.map((fact, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <strong style={{ fontSize: "20px", color: "#722ed1" }}>{fact.title}:</strong>
            <p style={{ margin: "6px 0 0", color: "#555", fontSize: "17px" }}>{fact.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lawgame1;