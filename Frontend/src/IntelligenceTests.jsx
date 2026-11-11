import React, { useState } from "react";

const IntelligenceTests = () => {
  const [section, setSection] = useState("IQ");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // 🧠 IQ TEST QUESTIONS
  const iqQs = [
    { q: "What comes next in the series: 2, 6, 12, 20, ?", options: ["24", "30", "36", "40"], correct: 1 },
    { q: "If A = 1, B = 2, C = 3, what is the sum of 'BAD'?", options: ["7", "8", "9", "10"], correct: 2 },
    { q: "Which shape completes the pattern logically?", options: ["Square", "Circle", "Triangle", "Pentagon"], correct: 0 },
  ];

  // 💬 EQ TEST QUESTIONS
  const eqQs = [
    { q: "When a friend is upset, I can usually sense it.", options: ["Never", "Rarely", "Sometimes", "Often", "Always"], correct: 3 },
    { q: "I stay calm under pressure.", options: ["Never", "Rarely", "Sometimes", "Often", "Always"], correct: 3 },
    { q: "I try to understand others’ perspectives.", options: ["Never", "Rarely", "Sometimes", "Often", "Always"], correct: 4 },
  ];

  // ⚙️ AQ TEST QUESTIONS
  const aqQs = [
    { q: "When facing challenges, I look for new solutions.", options: ["Never", "Rarely", "Sometimes", "Often", "Always"], correct: 3 },
    { q: "I recover quickly after failures.", options: ["Never", "Rarely", "Sometimes", "Often", "Always"], correct: 4 },
    { q: "I see obstacles as opportunities to grow.", options: ["Never", "Rarely", "Sometimes", "Often", "Always"], correct: 4 },
  ];

  // 🌍 SQ TEST QUESTIONS
  const sqQs = [
    { q: "I enjoy working in a team environment.", options: ["Never", "Rarely", "Sometimes", "Often", "Always"], correct: 4 },
    { q: "I take initiative in group discussions.", options: ["Never", "Rarely", "Sometimes", "Often", "Always"], correct: 3 },
    { q: "I listen actively to others’ ideas.", options: ["Never", "Rarely", "Sometimes", "Often", "Always"], correct: 4 },
  ];

  const questionSet = { IQ: iqQs, EQ: eqQs, AQ: aqQs, SQ: sqQs };
  const totalQs = questionSet[section].length;

  const handleAnswer = (index) => {
    setAnswers({ ...answers, [currentQ]: index });
  };

  const handleNext = () => {
    const currentSet = questionSet[section];
    if (answers[currentQ] === currentSet[currentQ].correct) setScore(score + 1);

    if (currentQ + 1 < currentSet.length) setCurrentQ(currentQ + 1);
    else setSubmitted(true);
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setAnswers({});
    setSubmitted(false);
  };

  const renderQuestion = () => {
    const currentSet = questionSet[section];
    const current = currentSet[currentQ];
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
      <h2 className="result-title">🎉 {section} Test Completed!</h2>
      <p className="result-text">
        Your {section} Score: <strong>{score} / {totalQs}</strong>
      </p>
      <p className="result-summary">
        {section === "IQ" && (score >= 2 ? "Excellent reasoning skills!" : "Keep practicing logical puzzles!")}
        {section === "EQ" && (score >= 2 ? "You’re emotionally intelligent!" : "Work on self-awareness & empathy.")}
        {section === "AQ" && (score >= 2 ? "You’re highly resilient!" : "Develop adaptability under pressure.")}
        {section === "SQ" && (score >= 2 ? "Strong team player!" : "Enhance your collaboration skills.")}
      </p>
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
          max-width: 650px;
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
          margin-bottom: 1.5rem;
        }
        .switch-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
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
        .result-summary {
          font-size: 1rem;
          color: #004d40;
          margin-top: 0.5rem;
        }
      `}</style>

      <div className="career-gen-bg">
        <div className="test-container">
          <h1 className="page-title">College Intelligence Tests</h1>
          <div className="switch-tabs">
            {["IQ", "EQ", "AQ", "SQ"].map((type) => (
              <button
                key={type}
                className={`tab-btn ${section === type ? "active" : ""}`}
                onClick={() => {
                  setSection(type);
                  restart();
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {!submitted ? renderQuestion() : renderResult()}
        </div>
      </div>
    </>
  );
};

export default IntelligenceTests;