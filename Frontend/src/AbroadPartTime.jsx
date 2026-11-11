import React from "react";

export default function AbroadPartTime() {
  const primary = "#0e2bcc";
  const primaryHover = "#0b249f";
  const light = "#eef2ff";
  const border = "#dbe4ff";

  const jobs = [
    {
      title: "On-Campus Jobs",
      desc: "Library assistant, student ambassador, admin support and front-desk roles.",
      icon: "🎓",
    },
    {
      title: "Retail & Sales",
      desc: "Cashier, store associate, inventory support and customer-facing roles.",
      icon: "🛒",
    },
    {
      title: "Tutoring & Teaching",
      desc: "Subject tutoring, language mentoring and peer learning support.",
      icon: "📚",
    },
    {
      title: "IT & Tech Support",
      desc: "Helpdesk support, junior web development and IT assistance.",
      icon: "💻",
    },
    {
      title: "Content & Design",
      desc: "Graphic design, content writing, editing and social media management.",
      icon: "✏️",
    },
    {
      title: "Food Services",
      desc: "Cafe jobs, kitchen support, serving and delivery opportunities.",
      icon: "🍽️",
    },
  ];

  const platforms = [
    "LinkedIn",
    "Indeed",
    "Handshake",
    "Glassdoor",
    "Internshala",
    "HigherEdJobs",
  ];

  const tips = [
    "Balance academics and work",
    "Apply early and consistently",
    "Build strong communication skills",
    "Update LinkedIn and resume",
    "Understand visa work rules",
  ];

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
          maxWidth: "1100px",
          margin: "0 auto",
          background: "white",
          borderRadius: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          gap: "70px",
        }}
      >
        {/* HERO */}
        <header
          style={{
            textAlign: "center",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "30px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: light,
              color: primary,
              padding: "8px 18px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            BLOG / STUDENT CAREERS
          </div>

          <h1
            style={{
              fontSize: "54px",
              fontWeight: "800",
              color: primary,
              lineHeight: "1.1",
              marginBottom: "18px",
            }}
          >
            💼 Abroad Part-Time Career Hub
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "19px",
              lineHeight: "1.8",
              maxWidth: "760px",
              margin: "0 auto",
            }}
          >
            Discover flexible jobs, internships, assistantships and global
            student opportunities designed to help international students
            earn, grow and gain industry exposure while studying abroad.
          </p>

          <div
            style={{
              marginTop: "28px",
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                background: primary,
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "999px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Explore Opportunities
            </button>

            <button
              style={{
                background: "white",
                color: primary,
                border: `1px solid ${primary}`,
                padding: "12px 24px",
                borderRadius: "999px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Learn More
            </button>
          </div>
        </header>

        {/* PROGRESS BAR */}
        <div
          style={{
            width: "100%",
            height: "8px",
            background: border,
            borderRadius: "999px",
          }}
        >
          <div
            style={{
              width: "65%",
              height: "8px",
              borderRadius: "999px",
              background: primary,
            }}
          />
        </div>

        {/* JOBS SECTION */}
        <section>
          <div style={{ textAlign: "center", marginBottom: "35px" }}>
            <h2
              style={{
                fontSize: "36px",
                color: primary,
                marginBottom: "12px",
              }}
            >
              🎓 Popular Student Jobs Abroad
            </h2>

            <p
              style={{
                color: "#6b7280",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: "1.8",
              }}
            >
              International students commonly work in flexible industries that
              support studies while helping build practical experience and
              communication skills.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: "22px",
            }}
          >
            {jobs.map((job, index) => (
              <div
                key={index}
                style={{
                  border: `1px solid ${border}`,
                  borderRadius: "18px",
                  padding: "28px",
                  background: "#fff",
                  transition: "0.3s",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    width: "65px",
                    height: "65px",
                    borderRadius: "16px",
                    background: light,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "30px",
                    marginBottom: "18px",
                  }}
                >
                  {job.icon}
                </div>

                <h3
                  style={{
                    fontSize: "22px",
                    color: "#111827",
                    marginBottom: "10px",
                  }}
                >
                  {job.title}
                </h3>

                <p
                  style={{
                    color: "#6b7280",
                    lineHeight: "1.8",
                    fontSize: "15px",
                  }}
                >
                  {job.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "24px",
              background: light,
              border: `1px solid ${border}`,
              borderRadius: "14px",
              padding: "18px",
              color: primary,
              fontWeight: "500",
            }}
          >
            ⚠️ Most international students can work 20–24 hours per week during
            academic semesters depending on country visa regulations.
          </div>
        </section>

        {/* OPPORTUNITIES */}
        <section style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "36px",
              color: primary,
              marginBottom: "14px",
            }}
          >
            🚀 Career Growth Opportunities
          </h2>

          <p
            style={{
              color: "#6b7280",
              maxWidth: "700px",
              margin: "0 auto 30px",
              lineHeight: "1.8",
            }}
          >
            Apart from part-time jobs, international students can also gain
            exposure through internships, assistantships and apprenticeships.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: "18px",
            }}
          >
            {[
              "Internships",
              "Research Assistantships",
              "Teaching Assistantships",
              "Apprenticeships",
            ].map((item) => (
              <div
                key={item}
                style={{
                  padding: "24px",
                  borderRadius: "16px",
                  border: `1px solid ${border}`,
                  background: light,
                }}
              >
                <h3 style={{ color: primary }}>{item}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* PLATFORM SECTION */}
        <section style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "36px",
              color: primary,
              marginBottom: "14px",
            }}
          >
            🌐 Best Platforms to Apply
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap",
              marginTop: "24px",
            }}
          >
            {platforms.map((item) => (
              <span
                key={item}
                style={{
                  background: light,
                  color: primary,
                  padding: "12px 22px",
                  borderRadius: "999px",
                  fontWeight: "600",
                  border: `1px solid ${border}`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* SUCCESS TIPS */}
        <section>
          <div
            style={{
              background: light,
              border: `1px solid ${border}`,
              borderRadius: "22px",
              padding: "40px",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: primary,
                fontSize: "36px",
                marginBottom: "32px",
              }}
            >
              ✨ Tips for Success
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
                gap: "18px",
              }}
            >
              {tips.map((tip, index) => (
                <div
                  key={index}
                  style={{
                    background: "white",
                    borderRadius: "16px",
                    padding: "24px",
                    textAlign: "center",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{ fontSize: "34px", marginBottom: "10px" }}>
                    🎯
                  </div>

                  <p
                    style={{
                      color: "#374151",
                      lineHeight: "1.7",
                    }}
                  >
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            background: `linear-gradient(135deg, ${primary}, #4f6ef7)`,
            borderRadius: "24px",
            padding: "50px",
            textAlign: "center",
            color: "white",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              lineHeight: "1.3",
              marginBottom: "18px",
            }}
          >
            Your Student Job Abroad Can Become Your Global Career
          </h2>

          <p
            style={{
              color: "#dbeafe",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.9",
              fontSize: "17px",
            }}
          >
            Build experience, strengthen your network and prepare for
            international opportunities through part-time jobs and internships.
          </p>

          <button
            style={{
              marginTop: "30px",
              background: "white",
              color: primary,
              border: "none",
              padding: "14px 28px",
              borderRadius: "999px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Explore Career Opportunities
          </button>
        </section>
      </article>
    </div>
  );
}