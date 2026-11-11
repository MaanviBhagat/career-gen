import React from "react";

export default function StudyAbroadBlogPage() {
  const primary = "#0e2bcc";
  const primaryHover = "#0b249f";
  const light = "#eef2ff";
  const border = "#e0e7ff";

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
          maxWidth: "768px",
          margin: "0 auto",
          background: "white",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          borderRadius: "16px",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "56px",
        }}
      >
        {/* HEADER */}
        <header
          style={{
            textAlign: "center",
            borderBottom: "1px solid #ddd",
            paddingBottom: "24px",
          }}
        >
          <h1
            style={{
              fontSize: "40px",
              fontWeight: "700",
              color: primary,
              marginBottom: "10px",
            }}
          >
            🌍 Study Abroad Guide Hub
          </h1>

          <p style={{ color: "#6b7280", fontSize: "18px" }}>
            Your complete roadmap to studying abroad — from choosing degrees to
            landing jobs globally.
          </p>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <a
              href="#degrees"
              style={{
                padding: "8px 16px",
                background: primary,
                color: "white",
                borderRadius: "999px",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Explore Degrees
            </a>

            <a
              href="#funding"
              style={{
                padding: "8px 16px",
                border: `1px solid ${primary}`,
                color: primary,
                borderRadius: "999px",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Find Scholarships
            </a>
          </div>
        </header>

        {/* PROGRESS BAR */}
        <div
          style={{
            width: "100%",
            background: border,
            borderRadius: "999px",
            height: "8px",
          }}
        >
          <div
            style={{
              background: primary,
              height: "8px",
              width: "60%",
              borderRadius: "999px",
            }}
          />
        </div>

        {/* SECTION 1 */}
        <section id="degrees" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", color: primary }}>
            🎓 Degree Intelligence Hub
          </h2>

          <p style={{ color: "#374151", lineHeight: "1.8" }}>
            Choosing the right degree is the foundation of your international
            journey. Align your degree with your long-term career goals.
          </p>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                border: `1px solid ${border}`,
                borderRadius: "8px",
                overflow: "hidden",
                fontSize: "14px",
                marginTop: "10px",
              }}
            >
              <thead style={{ background: light }}>
                <tr>
                  <th style={{ padding: "10px" }}>Criteria</th>
                  <th>Diploma</th>
                  <th>Bachelor's</th>
                  <th>Master's</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "10px" }}>Duration</td>
                  <td>1–2 years</td>
                  <td>3–4 years</td>
                  <td>1–2 years</td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>Best For</td>
                  <td>Skill-based</td>
                  <td>Foundation</td>
                  <td>Specialization</td>
                </tr>
                <tr>
                  <td style={{ padding: "10px" }}>Career Outcome</td>
                  <td>Entry roles</td>
                  <td>Graduate roles</td>
                  <td>Advanced roles</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            style={{
              background: light,
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #c7d2fe",
              marginTop: "15px",
              textAlign: "left",
            }}
          >
            <strong style={{ color: primary }}>💡 Pro Tip:</strong>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
              Always check if your degree is in demand in your target country.
            </p>
          </div>
        </section>

        {/* SECTION 2 */}
        <section id="funding" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", color: primary }}>
            💰 Scholarships & Funding
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))",
              gap: "12px",
              marginTop: "10px",
            }}
          >
            {["Fully Funded", "Partial", "Merit-Based"].map((item) => (
              <div
                key={item}
                style={{
                  padding: "16px",
                  border: `1px solid ${border}`,
                  borderRadius: "12px",
                }}
              >
                <h4 style={{ color: primary }}>{item}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 */}
        <section style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", color: primary }}>
            🏠 Accommodation & Living
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "10px",
            }}
          >
            {["On-Campus", "Off-Campus", "Shared"].map((item) => (
              <span
                key={item}
                style={{
                  background: light,
                  color: primary,
                  padding: "8px 16px",
                  borderRadius: "999px",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* SECTION 4 */}
        <section style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", color: primary }}>
            💼 Work Opportunities
          </h2>

          <div
            style={{
              background: light,
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #c7d2fe",
            }}
          >
            <p style={{ color: "#6b7280" }}>Typical Work Limit</p>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: primary }}>
              20 Hours / Week
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}


