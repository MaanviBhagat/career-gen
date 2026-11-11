import React, { useState } from "react";

export default function SkillDevelopmentHub() {
  const [track, setTrack] = useState("All");

  const categories = ["All", "Aptitude", "Coding", "Design", "Communication", "Career"];

  const resources = [
    {
      title: "IndiaBix – Aptitude, Reasoning & Verbal Tests",
      desc: "Free aptitude practice questions, logical reasoning, and interview preparation for students.",
      link: "https://www.indiabix.com/",
      tag: "Aptitude",
    },
    {
      title: "Skill India Digital Platform",
      desc: "Government initiative offering free skill training programs and certifications across India.",
      link: "https://www.skillindiadigital.gov.in/",
      tag: "Career",
    },
    {
      title: "Scaler Bootcamps",
      desc: "Intensive coding and software engineering bootcamps with industry-level mentorship.",
      link: "https://www.scaler.com/academy/",
      tag: "Coding",
    },
    {
      title: "YouTube – Apna College DSA Playlist",
      desc: "Step-by-step free Data Structures & Algorithms course in Hindi.",
      link: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ",
      tag: "Coding",
    },
    {
      title: "Communication Mastery Bootcamp",
      desc: "Public speaking and communication improvement sessions by skilled trainers.",
      link: "https://www.udemy.com/course/communication-skills-masterclass/",
      tag: "Communication",
    },
    {
      title: "Figma Design Basics",
      desc: "Learn UI/UX design principles and hands-on Figma tutorials for beginners.",
      link: "https://www.youtube.com/playlist?list=PL4-IK0AVhVjMXg3WPC6N0GJfM6lL3rA4C",
      tag: "Design",
    },
    {
      title: "Coursera Career Courses",
      desc: "Top career-oriented certifications by Google, IBM, and Meta — beginner to advanced.",
      link: "https://www.coursera.org/browse",
      tag: "Career",
    },
  ];

  const filtered = resources.filter((r) => (track === "All" ? true : r.tag === track));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        * { box-sizing: border-box; font-family: "Poppins", sans-serif; }
        .skill-bg {
          min-height: 100vh;
          background: linear-gradient(180deg, #e0f7fa 0%, #b2ebf2 100%);
          padding: 2rem;
          display: flex;
          justify-content: center;
        }
        .skill-container {
          max-width: 1100px;
          width: 100%;
        }
        .title {
          text-align: center;
          font-size: 2rem;
          color: #004d4f;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }
        .subtitle {
          text-align: center;
          color: #006064;
          margin-bottom: 2rem;
        }
        .filter-bar {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .filter-btn {
          padding: 0.6rem 1.2rem;
          border-radius: 25px;
          border: 2px solid #00bcd4;
          background: white;
          color: #00bcd4;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }
        .filter-btn:hover, .filter-btn.active {
          background: #00bcd4;
          color: white;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .card {
          background: white;
          border-radius: 15px;
          box-shadow: 0 6px 15px rgba(0,188,212,0.2);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: 0.3s;
        }
        .card:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 25px rgba(0,188,212,0.3);
        }
        .card h3 {
          font-size: 1.2rem;
          color: #004d4f;
          margin-bottom: 0.5rem;
        }
        .card p {
          flex: 1;
          color: #006064;
          font-size: 0.95rem;
          margin-bottom: 1rem;
        }
        .card a {
          background: #00bcd4;
          color: white;
          text-decoration: none;
          text-align: center;
          padding: 0.7rem;
          border-radius: 10px;
          font-weight: 600;
          transition: 0.3s;
        }
        .card a:hover {
          background: #0097a7;
        }
        @media (max-width: 768px) {
          .title { font-size: 1.6rem; }
        }
      `}</style>

      <div className="skill-bg">
        <div className="skill-container">
          <h1 className="title">Skill Development Hub</h1>
          <p className="subtitle">
            Explore curated resources to enhance your skills — from coding to communication,
            freelancing to design — all tailored for learners in India.
          </p>

          <div className="filter-bar">
            {categories.map((c) => (
              <button
                key={c}
                className={`filter-btn ${track === c ? "active" : ""}`}
                onClick={() => setTrack(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid">
            {filtered.map((r, i) => (
              <div key={i} className="card">
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <a href={r.link} target="_blank" rel="noreferrer">
                  Visit Resource →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}