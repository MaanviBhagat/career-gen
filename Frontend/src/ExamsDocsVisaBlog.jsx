import React from "react";

export default function ExamsDocsVisaBlog() {
  const styles = {
    page: {
      background: "linear-gradient(to bottom, #eef2ff, #f8fafc)",
      minHeight: "100vh",
      padding: "60px 16px",
      fontFamily: "system-ui, sans-serif"
    },
    container: {
      maxWidth: "900px",
      margin: "0 auto",
      background: "#fff",
      borderRadius: "20px",
      padding: "40px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      gap: "50px"
    },
    header: {
      textAlign: "center",
      borderBottom: "1px solid #e0e7ff",
      paddingBottom: "20px"
    },
    title: {
      fontSize: "40px",
      fontWeight: "bold",
      color: "#0e2bcc",
      fontFamily: "serif"
    },
    subtitle: {
      color: "#666",
      marginTop: "10px"
    },
    nav: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      flexWrap: "wrap"
    },
    navBtn: {
      padding: "8px 16px",
      border: "1px solid #0e2bcc",
      color: "#0e2bcc",
      borderRadius: "999px",
      fontSize: "14px",
      cursor: "pointer",
      transition: "0.2s"
    },
    section: {
      textAlign: "center"
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#0e2bcc",
      fontFamily: "serif"
    },
    card: {
      background: "#f8faff",
      border: "1px solid #e0e7ff",
      borderRadius: "16px",
      padding: "20px",
      textAlign: "left"
    },
    subTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#0e2bcc"
    },
    list: {
      paddingLeft: "20px",
      color: "#444",
      fontSize: "14px",
      lineHeight: "1.6"
    },
    tipBox: {
      background: "#eef2ff",
      border: "1px solid #c7d2fe",
      padding: "16px",
      borderRadius: "12px",
      textAlign: "left"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "16px"
    },
    visaCard: {
      border: "1px solid #e0e7ff",
      borderRadius: "12px",
      padding: "16px"
    }
  };

  return (
    <div style={styles.page}>
      <article style={styles.container}>

        {/* HEADER */}
        <header style={styles.header}>
          <h1 style={styles.title}>📘 Exams, Docs & Visa Guide</h1>
          <p style={styles.subtitle}>
            Deep, practical guide — exams, SOP/LOR, and visa workflows with real requirements.
          </p>
        </header>

        {/* NAV */}
        <div style={styles.nav}>
          {["Exams", "Documents", "Visa"].map((item) => (
            <a key={item} href={`#${item}`} style={styles.navBtn}>
              {item}
            </a>
          ))}
        </div>

        {/* EXAMS */}
        <section id="Exams" style={styles.section}>
          <h2 style={styles.sectionTitle}>📝 Standardized Exams</h2>

          {/* IELTS */}
          <div style={styles.card}>
            <h3 style={styles.subTitle}>🌍 IELTS</h3>
            <ul style={styles.list}>
              <li>Format: L(30m), R(60m), W(60m), S(11–14m)</li>
              <li>Mode: Computer (3–5 days) / Paper (13 days)</li>
              <li>Listening: underline keywords; multiple accents</li>
              <li>Writing Task 1: trends & comparisons</li>
              <li>Speaking: ask for clarification if needed</li>
              <li>Target: 6.5+ (UG), 7+ (PG)</li>
            </ul>
          </div>

          {/* GRE */}
          <div style={styles.card}>
            <h3 style={styles.subTitle}>📊 GRE</h3>
            <ul style={styles.list}>
              <li>~1h 58m | Quant, Verbal, 1 Essay</li>
              <li>Skip & return within sections</li>
              <li>Focus: Algebra + Data Interpretation</li>
              <li>Used for MS/PhD</li>
            </ul>
          </div>

          {/* SAT */}
          <div style={styles.card}>
            <h3 style={styles.subTitle}>📘 SAT (Digital)</h3>
            <ul style={styles.list}>
              <li>Adaptive format</li>
              <li>No negative marking</li>
              <li>Focus on first section</li>
              <li>Target: 645+ competitive</li>
            </ul>
          </div>

          {/* GMAT */}
          <div style={styles.card}>
            <h3 style={styles.subTitle}>💼 GMAT</h3>
            <ul style={styles.list}>
              <li>For MBA / Finance / Management</li>
              <li>Top score: 655–705+</li>
              <li>Rare IELTS waiver</li>
            </ul>
          </div>

          {/* TOEFL */}
          <div style={styles.card}>
            <h3 style={styles.subTitle}>🌐 TOEFL</h3>
            <ul style={styles.list}>
              <li>Internet-based (iBT)</li>
              <li>Score: 0–120</li>
              <li>Target: 90–100+</li>
              <li>Widely accepted globally</li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div style={styles.tipBox}>
            <strong style={{ color: "#0e2bcc" }}>📚 Study Resources</strong>
            <ul style={styles.list}>
              <li>IELTS: Cambridge Books, IELTS Liz</li>
              <li>TOEFL: ETS Guide, Notefull</li>
              <li>GRE: Manhattan 5lb, GregMat</li>
              <li>SAT: Bluebook, Khan Academy</li>
              <li>GMAT: Official Guide, TTP</li>
            </ul>
          </div>

          {/* VALIDITY */}
          <div style={styles.tipBox}>
            <strong style={{ color: "#0e2bcc" }}>⏳ Validity</strong>
            <ul style={styles.list}>
              <li>SAT/GRE/GMAT: 5 years</li>
              <li>IELTS/TOEFL: 2 years</li>
            </ul>
          </div>
        </section>

        {/* DOCUMENTS */}
        <section id="Documents" style={styles.section}>
          <h2 style={styles.sectionTitle}>📄 Documents</h2>

          <div style={styles.grid}>
            <div style={styles.card}>
              <h3 style={styles.subTitle}>SOP</h3>
              <ul style={styles.list}>
                <li>800–1000 words</li>
                <li>Hook → Academics → Projects → Goals</li>
                <li>Use STAR method</li>
                <li>Avoid generic content</li>
              </ul>
            </div>

            <div style={styles.card}>
              <h3 style={styles.subTitle}>LOR</h3>
              <ul style={styles.list}>
                <li>2 Academic + 1 Professional</li>
                <li>Use official emails</li>
                <li>Strong, specific examples</li>
              </ul>
            </div>
          </div>
        </section>

        {/* VISA */}
        <section id="Visa" style={styles.section}>
          <h2 style={styles.sectionTitle}>🛂 Visa Guide</h2>

          <div style={styles.grid}>
            <div style={styles.visaCard}>
              <strong>🇺🇸 USA</strong>
              <p>I-20 → SEVIS → DS-160 → Interview</p>
            </div>

            <div style={styles.visaCard}>
              <strong>🇸🇪 Sweden</strong>
              <p>Admission → Online Apply</p>
            </div>

            <div style={styles.visaCard}>
              <strong>🇦🇺 Australia</strong>
              <p>COE → Apply → OSHC</p>
            </div>

            <div style={styles.visaCard}>
              <strong>🇩🇪 Germany</strong>
              <p>Blocked Account → Visa</p>
            </div>

            <div style={styles.visaCard}>
              <strong>🇨🇦 Canada</strong>
              <p>LOA → PAL → Apply</p>
            </div>

            <div style={styles.visaCard}>
              <strong>🇬🇧 UK</strong>
              <p>CAS → Visa → Biometrics</p>
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}


