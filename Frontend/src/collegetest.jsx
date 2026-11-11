import React, { useState } from "react";

const CollegeTest = () => {
  const [section, setSection] = useState("aptitude");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const aptitudeQs = [
    { q: "If 3x + 5 = 20, what is x?", options: ["3", "5", "10", "15"], correct: 1 },
    { q: "Find the next number: 2, 4, 8, 16, ?", options: ["18", "24", "32", "36"], correct: 2 },
    { q: "What is the synonym of 'Innovative'?", options: ["Creative", "Lazy", "Copying", "Routine"], correct: 0 },
  ];

  const vibesQs = [
    { q: "I enjoy working in teams.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { q: "I prefer structured environments over flexible ones.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
    { q: "I get energy from brainstorming new ideas.", options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] },
  ];

  const handleAnswer = (index) => {
    setAnswers({ ...answers, [currentQ]: index });
  };

  const handleNext = () => {
    if (section === "aptitude" && answers[currentQ] === aptitudeQs[currentQ].correct) {
      setScore(score + 1);
    }
    const total = section === "aptitude" ? aptitudeQs.length : vibesQs.length;
    if (currentQ + 1 < total) setCurrentQ(currentQ + 1);
    else setSubmitted(true);
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setAnswers({});
    setSubmitted(false);
  };

  const renderQuestion = () => {
    const qs = section === "aptitude" ? aptitudeQs : vibesQs;
    const current = qs[currentQ];
    return (
      <div className="test-card">
        <h2 className="question">{current.q}</h2>
        <div className="options">
          {current.options.map((opt, i) => (
            <button
              key={i}
              className={`option-btn ${answers[currentQ] === i ? "selected" : ""}`}
              onClick={() => handleAnswer(i)}
            >
              {opt}
            </button>
          ))}
        </div>
        <button className="next-btn" onClick={handleNext}>Next ➜</button>
      </div>
    );
  };

  const renderResult = () => (
    <div className="test-card result-card">
      <h2 className="result-title">🎉 Test Completed!</h2>
      {section === "aptitude" ? (
        <p className="result-text">Your Aptitude Score: <strong>{score} / {aptitudeQs.length}</strong></p>
      ) : (
        <p className="result-text">
          Your Vibe Type: <strong>{score > 5 ? "Analytical Thinker" : "Creative Explorer"}</strong>
        </p>
      )}
      <button className="restart-btn" onClick={restart}>Retake Test</button>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        * {
          font-family: "Poppins", sans-serif;
          box-sizing: border-box;
        }
        .career-gen-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }
        .test-container {
          max-width: 600px;
          width: 100%;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 20px rgba(0, 188, 212, 0.3);
          text-align: center;
        }
        .page-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #007c91;
          margin-bottom: 1rem;
        }
        .switch-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .tab-btn {
          background: none;
          border: 2px solid #00bcd4;
          color: #00bcd4;
          padding: 0.6rem 1.5rem;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .tab-btn.active,
        .tab-btn:hover {
          background: #00bcd4;
          color: white;
        }
        .test-card {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 6px 15px rgba(0, 188, 212, 0.25);
        }
        .question {
          font-size: 1.2rem;
          color: #006064;
          margin-bottom: 1rem;
        }
        .options {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .option-btn {
          background: #f1f1f1;
          border: none;
          border-radius: 12px;
          padding: 0.8rem;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.2s;
        }
        .option-btn:hover {
          background: #b2ebf2;
        }
        .option-btn.selected {
          background: #00bcd4;
          color: white;
          font-weight: 600;
        }
        .next-btn, .restart-btn {
          margin-top: 1.5rem;
          background: #00bcd4;
          color: white;
          border: none;
          padding: 0.8rem 2rem;
          border-radius: 30px;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.3s;
        }
        .next-btn:hover, .restart-btn:hover {
          background: #0097a7;
        }
        .result-card {
          background: linear-gradient(180deg, #e0f7fa, #b2ebf2);
        }
        .result-title {
          color: #007c91;
          font-size: 1.6rem;
          font-weight: 600;
        }
        .result-text {
          font-size: 1.1rem;
          margin: 1rem 0;
        }
      `}</style>

      <div className="career-gen-bg">
        <div className="test-container">
          <h1 className="page-title">College Aptitude & Vibes Test</h1>
          <div className="switch-tabs">
            <button
              className={`tab-btn ${section === "aptitude" ? "active" : ""}`}
              onClick={() => { setSection("aptitude"); restart(); }}
            >
              Aptitude
            </button>
            <button
              className={`tab-btn ${section === "vibes" ? "active" : ""}`}
              onClick={() => { setSection("vibes"); restart(); }}
            >
              Vibes
            </button>
          </div>

          {!submitted ? renderQuestion() : renderResult()}
        </div>
      </div>
    </>
  );
};

export default CollegeTest;