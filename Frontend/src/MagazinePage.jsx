import React, { useEffect, useRef } from 'react';

const careers = [
  {
    title: "Ethical Hacker",
    description:
      "Ethical hackers are cybersecurity experts who help organizations identify and fix security vulnerabilities before malicious hackers can exploit them.",
    image:
      "https://cdn-icons-png.flaticon.com/512/2503/2503508.png",
  },
  {
    title: "UX Researcher",
    description:
      "UX Researchers study user behavior and feedback to improve product design, ensuring digital experiences are intuitive and user-friendly.",
    image:
      "https://cdn-icons-png.flaticon.com/512/10067/10067331.png",
  },
  {
    title: "Forensic Linguist",
    description:
      "Forensic linguists analyze language to help solve crimes, working with law enforcement on written or spoken evidence.",
    image:
      "https://cdn-icons-png.flaticon.com/512/4052/4052984.png",
  },
  {
    title: "Space Lawyer",
    description:
      "Space lawyers handle legal matters related to outer space, including satellite disputes, international treaties, and space exploration rights.",
    image:
      "https://cdn-icons-png.flaticon.com/512/2266/2266973.png",
  },
  {
    title: "Flavorist",
    description:
      "Flavorists use chemistry to create and replicate natural and artificial flavors used in food and beverages.",
    image:
      "https://cdn-icons-png.flaticon.com/512/1867/1867410.png",
  },
  {
    title: "AI Ethicist",
    description:
      "AI ethicists evaluate and guide the responsible use of artificial intelligence in society, ensuring it aligns with moral values and human rights.",
    image:
      "https://cdn-icons-png.flaticon.com/512/5434/5434692.png",
  },
  {
    title: "Cyber Forensics Analyst",
    description:
      "These analysts investigate cybercrimes by collecting digital evidence and analyzing data to track down perpetrators.",
    image:
      "https://cdn-icons-png.flaticon.com/512/841/841364.png",
  }
];

const MagazinePage = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          card.style.transform = 'rotate(0deg) scale(1.02)';
          card.style.opacity = '1';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      fontFamily: 'Comic Sans MS, cursive',
      backgroundImage: 'url(https://www.transparenttextures.com/patterns/notebook.png), linear-gradient(135deg, #d6eaff, #f0f8ff)',
      backgroundBlendMode: 'overlay',
      padding: '40px',
      color: '#002244',
      minHeight: '100vh',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: 'auto',
        backgroundColor: '#ffffffee',
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        borderRadius: '20px',
        padding: '40px',
        border: '2px dashed #88bbff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '46px',
          marginBottom: '12px',
          color: '#003377',
          textShadow: '2px 2px #a7d3ff',
        }}>
          📘 Career Compass: May Edition
        </h1>
        <p style={{
          fontStyle: 'italic',
          textAlign: 'center',
          marginBottom: '40px',
          fontSize: '18px',
        }}>
          "🧠 Dive into the nerdy side of cool careers you’ve never heard of before!"
        </p>

        {careers.map((career, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '35px',
              borderLeft: '8px dotted #5fa8ff',
              paddingLeft: '20px',
              backgroundColor: '#f0f9ff',
              borderRadius: '12px',
              padding: '18px',
              transform: 'rotate(-1deg)',
              transition: 'transform 0.5s ease, opacity 0.5s ease',
              opacity: 0,
              boxShadow: '3px 3px 10px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={career.image}
              alt={career.title}
              style={{
                width: '90px',
                height: '90px',
                objectFit: 'contain',
                marginRight: '25px',
                border: '2px solid #cce7ff',
                borderRadius: '50%',
                backgroundColor: '#fff',
                padding: '5px',
              }}
            />
            <div>
              <h2 style={{
                fontSize: '26px',
                marginBottom: '10px',
                color: '#1f5faa',
              }}>
                ✨ {career.title}
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '1.6' }}>{career.description}</p>
            </div>
          </div>
        ))}

        <p style={{
          fontStyle: 'italic',
          textAlign: 'center',
          marginTop: '50px',
          fontSize: '16px',
        }}>
          📚 Stay tuned for next month’s zany edition full of more brainy career adventures!
        </p>
      </div>
    </div>
  );
};

export default MagazinePage;