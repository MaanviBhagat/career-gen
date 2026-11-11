import React, { useState } from "react";

const countries = [
  {
    name: "United States",
    flag: "🇺🇸",
    data: [
      ["Entrance Exams", "SAT/ACT, GRE/GMAT, IELTS/TOEFL"],
      ["Cost of Living", "$1,300–$2,200/month"],
      ["Tuition", "$22,000–$60,000/year"],
      ["Visa", "F-1 Visa"],
      ["PR Path", "OPT → H-1B → Green Card"],
      ["Work", "20 hrs/week"],
      ["Job Market", "Strong in STEM & Finance"],
      ["Lifestyle", "Fast-paced, diverse"],
    ],
  },
  {
    name: "Sweden",
    flag: "🇸🇪",
    data: [
      ["Entrance Exams", "GPA + IELTS/TOEFL"],
      ["Cost of Living", "$950–$1,150/month"],
      ["Tuition", "$7,500–$18,000/year"],
      ["Visa", "Residence Permit"],
      ["PR Path", "4 years work → PR"],
      ["Work", "No official limit"],
      ["Job Market", "Tech & Sustainability"],
      ["Lifestyle", "Balanced, cold winters"],
    ],
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    data: [
      ["Entrance Exams", "GPA/ATAR + IELTS/PTE"],
      ["Cost of Living", "AUD 2,300–2,900/month"],
      ["Tuition", "AUD 25,000–55,000/year"],
      ["Visa", "Subclass 500"],
      ["PR Path", "Points-based"],
      ["Work", "48 hrs/fortnight"],
      ["Job Market", "Healthcare & Engineering"],
      ["Lifestyle", "Sunny, relaxed"],
    ],
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    data: [
      ["Entrance Exams", "GPA + APS/TestAS"],
      ["Cost of Living", "€992–€1,250/month"],
      ["Tuition", "Mostly free"],
      ["Visa", "Blocked account required"],
      ["PR Path", "2 years work → PR"],
      ["Work", "140 days/year"],
      ["Job Market", "Engineering & IT"],
      ["Lifestyle", "Structured"],
    ],
  },
  {
    name: "Switzerland",
    flag: "🇨🇭",
    data: [
      ["Entrance Exams", "High GPA + language"],
      ["Cost of Living", "CHF 2,000–2,500/month"],
      ["Tuition", "CHF 1,000–4,000/year"],
      ["Visa", "Strict financial proof"],
      ["PR Path", "~10 years"],
      ["Work", "15 hrs/week"],
      ["Job Market", "Finance & Pharma"],
      ["Lifestyle", "Premium quality"],
    ],
  },
  {
    name: "Ireland",
    flag: "🇮🇪",
    data: [
      ["Entrance Exams", "GPA + IELTS/TOEFL"],
      ["Cost of Living", "€1,100–€1,600/month"],
      ["Tuition", "€11,000–€28,000/year"],
      ["Visa", "Stamp 2"],
      ["PR Path", "Critical Skills route"],
      ["Work", "20 hrs/week"],
      ["Job Market", "Tech & Pharma"],
      ["Lifestyle", "Friendly"],
    ],
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    data: [
      ["Entrance Exams", "GPA + IELTS"],
      ["Cost of Living", "CAD 1,100–2,200/month"],
      ["Tuition", "CAD 20,000–45,000/year"],
      ["Visa", "Study Permit"],
      ["PR Path", "Express Entry"],
      ["Work", "24 hrs/week"],
      ["Job Market", "Diverse"],
      ["Lifestyle", "Multicultural"],
    ],
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    data: [
      ["Entrance Exams", "GPA + IELTS"],
      ["Cost of Living", "£1,100–£1,600/month"],
      ["Tuition", "£15,000–£38,000/year"],
      ["Visa", "Student Route"],
      ["PR Path", "Graduate → Skilled Worker → ILR"],
      ["Work", "20 hrs/week"],
      ["Job Market", "Finance, NHS, Tech"],
      ["Lifestyle", "Historic, diverse"],
    ],
  },
];

export default function CountryBlogPage() {
  const primary = "#0e2bcc";
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
          maxWidth: "900px",
          margin: "0 auto",
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* HEADER */}
        <header style={{ textAlign: "center", borderBottom: "1px solid #ddd", paddingBottom: "20px" }}>
          <h1 style={{ fontSize: "36px", color: primary }}>🌍 Country Guide</h1>
          <p style={{ color: "#6b7280" }}>
            Compare top study destinations with key insights on cost, visas, jobs, and lifestyle.
          </p>
        </header>

        {/* FILTER BUTTONS */}
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
          {countries.map((c, i) => (
            <a
              key={i}
              href={`#${c.name}`}
              style={{
                padding: "8px 16px",
                border: `1px solid ${primary}`,
                color: primary,
                borderRadius: "999px",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              {c.flag} {c.name}
            </a>
          ))}
        </div>

        {/* COUNTRY CARDS */}
        {countries.map((country, idx) => {
          const [hover, setHover] = useState(false);

          return (
            <section
              key={idx}
              id={country.name}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                background: "#f8faff",
                padding: "24px",
                borderRadius: "16px",
                border: `1px solid ${border}`,
                boxShadow: hover ? "0 5px 15px rgba(0,0,0,0.08)" : "none",
                transition: "0.3s",
              }}
            >
              <h2 style={{ textAlign: "center", color: primary, marginBottom: "20px" }}>
                {country.flag} {country.name}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
                  gap: "12px",
                }}
              >
                {country.data.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "12px",
                      background: "white",
                      borderRadius: "10px",
                      border: `1px solid ${border}`,
                    }}
                  >
                    <p style={{ fontSize: "12px", color: "#6b7280" }}>{item[0]}</p>
                    <p style={{ fontWeight: "500", color: primary }}>{item[1]}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <a
            href="#"
            style={{
              padding: "10px 20px",
              background: primary,
              color: "white",
              borderRadius: "999px",
              textDecoration: "none",
            }}
          >
            Explore More Countries →
          </a>
        </div>
      </article>
    </div>
  );
}


