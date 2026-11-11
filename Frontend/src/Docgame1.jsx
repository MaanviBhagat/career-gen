// Chapter 1: White Coats & First Impressions - React JS with Gacha-style Interactive Map & Bluish-Pink Aesthetic

import { useState } from 'react';

const departments = [
  { name: 'ER', emoji: '🏥' },
  { name: 'OPD', emoji: '🩺' },
  { name: 'Labs', emoji: '🧪' },
];

const PatientCard = ({ patient, onSelect }) => (
  <div className="patient-card" onClick={() => onSelect(patient)}>
    <h3>{patient.name}</h3>
    <p>Age: {patient.age}</p>
    <p>Symptoms: {patient.symptoms.join(', ')}</p>
  </div>
);

const caseData = {
  ER: [
    {
      name: 'Amit Rathi',
      age: 45,
      symptoms: ['Fatigue', 'Chest pain'],
      correctDiagnosis: 'Angina'
    },
    {
      name: 'Ravi Kumar',
      age: 29,
      symptoms: ['Severe bleeding', 'Confusion'],
      correctDiagnosis: 'Trauma Injury'
    }
  ],
  OPD: [
    {
      name: 'Priya Nair',
      age: 32,
      symptoms: ['Fever', 'Sore throat'],
      correctDiagnosis: 'Viral Infection'
    },
    {
      name: 'Kriti Rao',
      age: 26,
      symptoms: ['Frequent urination', 'Excessive thirst'],
      correctDiagnosis: 'Diabetes'
    }
  ],
  Labs: [
    {
      name: 'Rohan Malik',
      age: 60,
      symptoms: ['Dizziness', 'Blurred vision'],
      correctDiagnosis: 'Hypertension'
    },
    {
      name: 'Sara Thomas',
      age: 38,
      symptoms: ['Pale skin', 'Weakness'],
      correctDiagnosis: 'Anemia'
    }
  ]
};

const diseaseHints = {
  Angina: 'A type of chest pain caused by reduced blood flow to the heart.',
  'Viral Infection': 'Caused by a virus, symptoms may include fever, sore throat, fatigue.',
  Hypertension: 'High blood pressure that often shows no symptoms but damages organs over time.',
  Diabetes: 'A metabolic disease causing high blood sugar, often associated with excessive thirst and urination.',
  Anemia: 'A condition in which you lack enough healthy red blood cells to carry oxygen.',
  'Trauma Injury': 'Serious injury often due to accidents requiring immediate care.'
};

const Docgame1= () => {
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [completedPatients, setCompletedPatients] = useState({ ER: [], OPD: [], Labs: [] });

  const allDepartmentsCompleted = Object.keys(caseData).every(dept =>
    caseData[dept].every(patient => completedPatients[dept].includes(patient.name))
  );

  const handleDiagnosisSubmit = () => {
    if (!selectedPatient || !currentDepartment) return;

    const isCorrect = selectedPatient.correctDiagnosis.toLowerCase() === diagnosis.toLowerCase();

    if (isCorrect) {
      setFeedback('✅ Correct diagnosis!');
      setScore(score + 10);
      setCompletedPatients(prev => {
        const updated = { ...prev };
        if (!updated[currentDepartment].includes(selectedPatient.name)) {
          updated[currentDepartment] = [...updated[currentDepartment], selectedPatient.name];
        }
        return updated;
      });
    } else {
      setFeedback(`❌ Incorrect. Correct answer: ${selectedPatient.correctDiagnosis}`);
    }
  };

  const currentPatients = currentDepartment ? caseData[currentDepartment] : [];
  const totalPatients = Object.values(caseData).flat().length;
  const totalCompleted = Object.values(completedPatients).flat().length;
  const progressPercentage = Math.round((totalCompleted / totalPatients) * 100);

  return (
    <div className="hospital">
      <style>{`
        body {
          font-family: 'Comic Sans MS', cursive, sans-serif;
          background: linear-gradient(135deg, #a0c4ff, #ffc6ff);
          margin: 0;
          padding: 0;
        }

        .hospital {
          padding: 20px;
          max-width: 960px;
          margin: auto;
          background: #ffffffdd;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0,0,0,0.2);
        }

        header {
          background-color: #bdb2ff;
          color: #3a0ca3;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
        }

        .map {
          margin-top: 20px;
        }

        .gacha-map {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .gacha-button {
          background-color: #ffadad;
          border: 2px solid #ff6392;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          margin: 10px;
          font-size: 24px;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .gacha-button:hover {
          transform: scale(1.1);
          background-color: #ff6392;
          color: white;
        }

        .map-description {
          text-align: center;
          font-style: italic;
          margin-top: 10px;
        }

        .patient-card {
          background: #ffd6a5;
          border: 2px solid #ffadad;
          padding: 15px;
          margin: 10px 0;
          border-radius: 8px;
          cursor: pointer;
        }

        .patient-card:hover {
          background: #ffcad4;
        }

        .diagnosis {
          background: #caffbf;
          padding: 15px;
          border-radius: 10px;
          border: 2px dashed #80ed99;
          display: flex;
          justify-content: space-between;
        }

        .hint-box {
          background: #e0c3fc;
          padding: 10px;
          border-radius: 8px;
          margin-left: 20px;
          width: 30%;
        }

        input[type="text"] {
          padding: 8px;
          width: 60%;
          margin-right: 10px;
        }

        button {
          padding: 8px 12px;
          background-color: #bdb2ff;
          color: #3a0ca3;
          border: none;
          border-radius: 4px;
          font-weight: bold;
        }

        .score {
          text-align: right;
          margin-top: 10px;
          font-weight: bold;
          color: #4361ee;
        }

        .progress-bar {
          background: #ddd;
          height: 20px;
          border-radius: 10px;
          overflow: hidden;
          margin: 20px 0;
        }

        .progress-fill {
          background: #80ffdb;
          height: 100%;
          transition: width 0.3s;
        }
      `}</style>

      <header>
        <h1>CityCare Chronicles: Chapter 1</h1>
        <p>Welcome, Dr. Arya Sharma 🌟 Begin your rounds and diagnose with care!</p>
      </header>

      <div className="score">💾 Progress Score: {score} pts</div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {allDepartmentsCompleted && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button onClick={() => alert('Proceeding to next level...')}>🚀 Proceed to Next Level</button>
        </div>
      )}

      <section className="map">
        <h2>Choose a Department</h2>
        <div className="gacha-map">
          {departments.map((dept) => (
            <button
              className="gacha-button"
              key={dept.name}
              onClick={() => {
                setCurrentDepartment(dept.name);
                setSelectedPatient(null);
                setFeedback('');
                setDiagnosis('');
              }}
              title={`Visit ${dept.name}`}
            >
              {dept.emoji}
            </button>
          ))}
        </div>
        {currentDepartment && (
          <div className="map-description">
            <p>✨ You’ve entered the <strong>{currentDepartment}</strong>. Explore and diagnose patients!</p>
          </div>
        )}
      </section>

      <section className="patients">
        <h2>Patient Cases</h2>
        <div className="patient-list">
          {currentPatients.map((p) => (
            <PatientCard key={p.name} patient={p} onSelect={setSelectedPatient} />
          ))}
        </div>
      </section>

      {selectedPatient && (
        <section className="diagnosis">
          <div>
            <h2>Diagnosis for {selectedPatient.name}</h2>
            <input
              type="text"
              placeholder="Enter your diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
            <button onClick={handleDiagnosisSubmit}>Submit</button>
            {feedback && <p>{feedback}</p>}
          </div>
          <div className="hint-box">
            <h4>💡 Hint:</h4>
            <p>
              {selectedPatient && diseaseHints[selectedPatient.correctDiagnosis]
                ? diseaseHints[selectedPatient.correctDiagnosis]
                : 'Select and diagnose a patient to view disease information.'}
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Docgame1;