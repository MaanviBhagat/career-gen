import React, { useState } from "react";

export default function CommunityNetworking() {
  const [tab, setTab] = useState("Peers");

  const tabs = ["Peers", "Mentorship", "Culture Fit"];

  const peerTopics = [
    { title: "Freelancer Hangout 🇮🇳", desc: "Discuss client handling, pricing, and freelancing platforms with peers.", link: "https://www.reddit.com/r/freelance/" },
    { title: "Tech Discussions", desc: "Talk about coding, open source, and developer meetups in India.", link: "https://www.linkedin.com/groups/104385/" },
    { title: "Student Entrepreneurs", desc: "Join young founders building startups during college.", link: "https://discord.gg/startupindia" },
  ];

  const mentorshipLinks = [
    { title: "LinkedIn Mentorship & Career Groups", desc: "Find experienced professionals offering guidance in your domain.", link: "https://www.linkedin.com/groups/" },
    { title: "ADPList – Global Mentors", desc: "Free 1:1 mentorship calls with experts across industries.", link: "https://www.adplist.org/" },
    { title: "NASSCOM FutureSkills", desc: "Upskilling and mentoring initiative by NASSCOM for Indian students.", link: "https://futureskillsprime.in/" },
  ];

  const cultureFitTools = [
    { title: "Glassdoor India", desc: "Compare company reviews, interview experiences, and salaries.", link: "https://www.glassdoor.co.in/" },
    { title: "AmbitionBox", desc: "Understand work-life balance, growth, and culture in top Indian companies.", link: "https://www.ambitionbox.com/" },
    { title: "TeamBlind", desc: "Anonymous company discussion platform for honest insights.", link: "https://www.teamblind.com/" },
  ];

  const currentList =
    tab === "Peers" ? peerTopics : tab === "Mentorship" ? mentorshipLinks : cultureFitTools;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        * { box-sizing: border-box; font-family: "Poppins", sans-serif; }
        .community-bg {
          min-height: 100vh;
          background: linear-gradient(180deg, #e0f7fa 0%, #b2ebf2 100%);
          padding: 2rem;
          display: flex;
          justify-content: center;
        }
        .community-container {
          max-width: 1100px;
          width: 100%;
        }
        .title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          color: #004d4f;
          margin-bottom: 0.3rem;
        }
        .subtitle {
          text-align: center;
          color: #006064;
          margin-bottom: 2rem;
        }
        .tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .tab-btn {
          background: white;
          border: 2px solid #00bcd4;
          color: #00bcd4;
          font-weight: 600;
          padding: 0.6rem 1.3rem;
          border-radius: 25px;
          cursor: pointer;
          transition: 0.3s;
        }
        .tab-btn:hover, .tab-btn.active {
          background: #00bcd4;
          color: white;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .card {
          background: white;
          border-radius: 15px;
          box-shadow: 0 6px 15px rgba(0,188,212,0.2);
          padding: 1.5rem;
          transition: 0.3s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .card:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 25px rgba(0,188,212,0.3);
        }
        .card h3 {
          color: #004d4f;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }
        .card p {
          color: #006064;
          font-size: 0.95rem;
          margin-bottom: 1rem;
        }
        .card a {
          text-decoration: none;
          text-align: center;
          background: #00bcd4;
          color: white;
          font-weight: 600;
          padding: 0.7rem;
          border-radius: 10px;
          transition: 0.3s;
        }
        .card a:hover { background: #0097a7; }
        .cta-section {
          text-align: center;
          margin-top: 3rem;
        }
        .cta-btn {
          background: #00bcd4;
          color: white;
          border: none;
          padding: 0.9rem 2rem;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }
        .cta-btn:hover { background: #0097a7; }
      `}</style>

      <div className="community-bg">
        <div className="community-container">
          <h1 className="title">Community & Networking Hub</h1>
          <p className="subtitle">
            Engage, learn, and grow through discussions, mentorship, and real company insights — all tailored for Indian students & professionals.
          </p>

          <div className="tabs">
            {tabs.map((t) => (
              <button
                key={t}
                className={`tab-btn ${tab === t ? "active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid">
            {currentList.map((item, i) => (
              <div key={i} className="card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a href={item.link} target="_blank" rel="noreferrer">
                  Visit →
                </a>
              </div>
            ))}
          </div>

          <div className="cta-section">
            <h2 style={{ color: "#004d4f", marginBottom: "1rem" }}>
              Want to grow your network faster?
            </h2>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <button className="cta-btn">Join the LinkedIn CareerGen Network</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}