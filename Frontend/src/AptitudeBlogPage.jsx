import React, { useState } from "react";

const Section = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const primary = "#0e2bcc";
  const light = "#eef2ff";
  const border = "#e0e7ff";

  return (
    <div
      style={{
        border: `1px solid ${border}`,
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "16px 20px",
          background: hover ? border : light,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span style={{ fontWeight: 600, color: primary }}>{title}</span>
        <span style={{ fontSize: "14px" }}>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div
          style={{
            padding: "20px",
            background: "white",
            color: "#374151",
            fontSize: "14px",
            lineHeight: "1.7",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default function AptitudeBlogPage() {
  const primary = "#0e2bcc";

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #eef2ff, #f8fafc)",
        minHeight: "100vh",
        padding: "64px 16px",
      }}
    >
      <article
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          borderRadius: "16px",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* HEADER */}
        <header style={{ textAlign: "center" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "700",
              color: primary,
              marginBottom: "10px",
            }}
          >
            🧠 Career Aptitude & Intelligence Guide
          </h1>
          <p style={{ color: "#6b7280" }}>
            A deep, interactive guide to understanding personality, aptitude,
            and intelligence.
          </p>
        </header>

        {/* SECTIONS */}
        <Section title="🌊 OCEAN Personality Model (Big Five)">
          <p>The OCEAN model describes personality across five dimensions:</p>
          <ul style={{ marginLeft: "20px" }}>
            <li><strong>Openness:</strong> Creativity, curiosity</li>
            <li><strong>Conscientiousness:</strong> Discipline, organization</li>
            <li><strong>Extraversion:</strong> Social energy</li>
            <li><strong>Agreeableness:</strong> Empathy</li>
            <li><strong>Neuroticism:</strong> Emotional stability</li>
          </ul>
        </Section>

        <Section title="📊 Numerical Aptitude">
          <p>Ability to work with numbers.</p>
        </Section>

        <Section title="📐 Spatial Aptitude">
          <p>Ability to visualize and manipulate objects.</p>
        </Section>

        <Section title="🔍 Perceptual Aptitude">
          <p>Pattern recognition and attention to detail.</p>
        </Section>

        <Section title="🧩 Abstract Reasoning">
          <p>Understanding complex ideas and patterns.</p>
        </Section>

        <Section title="📖 Verbal Reasoning">
          <p>Understanding and analyzing written information.</p>
        </Section>

        <Section title="🧠 Intelligence Quotients (Overview)">
          <ul style={{ marginLeft: "20px" }}>
            <li><strong>IQ:</strong> Logical thinking</li>
            <li><strong>EQ:</strong> Emotional intelligence</li>
            <li><strong>AQ:</strong> Handling pressure</li>
            <li><strong>FQ:</strong> Financial skills</li>
          </ul>
        </Section>

        {/* FINAL */}
        <div
          style={{
            background: "#eef2ff",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3 style={{ color: primary }}>🎯 Final Insight</h3>
          <p style={{ color: "#6b7280" }}>
            Combine personality, aptitude, and intelligence for best career decisions.
          </p>
        </div>
      </article>
    </div>
  );
}


