import React from "react";
import { Link } from "react-router-dom";

const careerData = {
  Doctor: {
    "Entry Level Education": "MBBS from a recognized university.",
    "Qualifications & Preparation Needed": "NEET qualification, internships, and residency.",
    "Typical Career Progression": "Resident → Specialist → Consultant → Senior Surgeon",
    "Wages, Salary & Benefits": "High salary, health benefits, insurance.",
    "Skills & Activities": "Diagnosis, patient care, surgery, empathy.",
    "Job Titles": "General Physician, Pediatrician, Surgeon, Radiologist",
    "Work/Life Balance": "Demanding hours, night shifts, emergency calls.",
    "Projected Growth": "High due to rising healthcare demand.",
    "Feeder & Next Step Occupations": "Health Admin, Medical Researcher, Professor",
  },
  Engineer: {
    "Entry Level Education": "B.Tech/B.E. in relevant branch.",
    "Qualifications & Preparation Needed": "Entrance exams, technical training.",
    "Typical Career Progression": "Junior Engineer → Senior Engineer → Tech Lead → Manager",
    "Wages, Salary & Benefits": "Moderate to high, depending on domain.",
    "Skills & Activities": "Problem-solving, coding, CAD, teamwork.",
    "Job Titles": "Software Engineer, Civil Engineer, Mechanical Engineer",
    "Work/Life Balance": "Usually stable but deadline-driven.",
    "Projected Growth": "Good, especially in tech and infrastructure.",
    "Feeder & Next Step Occupations": "Project Manager, Tech Consultant",
  },
  "Chartered Accountant (CA)": {
    "Entry Level Education": "Bachelor’s degree in Commerce or related field.",
    "Qualifications & Preparation Needed": "CA Foundation, Intermediate, and Final exams by ICAI.",
    "Typical Career Progression": "Intern → Associate → Senior CA → CFO/Partner",
    "Wages, Salary & Benefits": "High in corporate sector and audit firms.",
    "Skills & Activities": "Accounting, auditing, taxation, financial reporting.",
    "Job Titles": "Auditor, Financial Analyst, Tax Consultant, CFO",
    "Work/Life Balance": "Can be demanding during financial seasons.",
    "Projected Growth": "Strong, especially in finance and compliance sectors.",
    "Feeder & Next Step Occupations": "Management Consultant, Financial Advisor",
  },
  "Company Secretary (CS)": {
    "Entry Level Education": "Bachelor’s degree in any stream.",
    "Qualifications & Preparation Needed": "CSEET, Executive & Professional programs by ICSI.",
    "Typical Career Progression": "Trainee → Junior CS → Senior CS → Corporate Secretary",
    "Wages, Salary & Benefits": "Moderate to high, depending on company size.",
    "Skills & Activities": "Legal compliance, company law, corporate governance.",
    "Job Titles": "Corporate Secretary, Compliance Officer, Legal Advisor",
    "Work/Life Balance": "Stable with occasional deadline pressure.",
    "Projected Growth": "Good due to stricter regulatory environments.",
    "Feeder & Next Step Occupations": "Legal Consultant, Director (Governance)",
  },
  "Lawyer (LLB)": {
    "Entry Level Education": "5-year integrated or 3-year LLB program.",
    "Qualifications & Preparation Needed": "LLB degree, Bar Council exam clearance.",
    "Typical Career Progression": "Junior Lawyer → Associate → Partner/Judge",
    "Wages, Salary & Benefits": "Varies widely; high in corporate or litigation firms.",
    "Skills & Activities": "Legal research, advocacy, writing, public speaking.",
    "Job Titles": "Litigator, Legal Consultant, Public Prosecutor, Corporate Counsel",
    "Work/Life Balance": "Demanding with long hours and court schedules.",
    "Projected Growth": "High demand in corporate, IP, and cyber law sectors.",
    "Feeder & Next Step Occupations": "Judge, Legal Educator, Law Firm Partner",
  },
  "Interior Designer": {
    "Entry Level Education": "Bachelor’s in Interior Design or related field.",
    "Qualifications & Preparation Needed": "Design portfolio, internships, software training (AutoCAD, SketchUp).",
    "Typical Career Progression": "Junior Designer → Lead Designer → Design Director",
    "Wages, Salary & Benefits": "Moderate; high potential in luxury segment.",
    "Skills & Activities": "Space planning, client interaction, creativity, CAD tools.",
    "Job Titles": "Interior Designer, Spatial Planner, Set Designer",
    "Work/Life Balance": "Flexible but project deadlines can cause pressure.",
    "Projected Growth": "Steady, with urbanization and lifestyle trends.",
    "Feeder & Next Step Occupations": "Architectural Consultant, Product Designer",
  },
  Architect: {
    "Entry Level Education": "B.Arch (Bachelor of Architecture).",
    "Qualifications & Preparation Needed": "NATA/JEE exams, licensure from COA.",
    "Typical Career Progression": "Junior Architect → Project Architect → Principal Architect",
    "Wages, Salary & Benefits": "Moderate to high; varies by location and firm.",
    "Skills & Activities": "Design, drawing, structural analysis, client interaction.",
    "Job Titles": "Architect, Urban Planner, Landscape Architect",
    "Work/Life Balance": "Moderate with occasional project crunches.",
    "Projected Growth": "Rising with smart cities and infrastructure projects.",
    "Feeder & Next Step Occupations": "Urban Designer, Green Building Consultant",
  },
  Writer: {
    "Entry Level Education": "Bachelor’s in Literature, Journalism, or related field.",
    "Qualifications & Preparation Needed": "Portfolio of writing, internships, content creation experience.",
    "Typical Career Progression": "Freelancer → Staff Writer → Editor → Author/Creative Lead",
    "Wages, Salary & Benefits": "Variable; high in publishing, media, and content marketing.",
    "Skills & Activities": "Creative thinking, grammar, storytelling, research.",
    "Job Titles": "Content Writer, Copywriter, Scriptwriter, Editor",
    "Work/Life Balance": "Flexible, often remote-friendly.",
    "Projected Growth": "High with digital content and media demand.",
    "Feeder & Next Step Occupations": "Blogger, Novelist, Communication Director",
  },
};

const Careers = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "3rem",
        background: "linear-gradient(to bottom right, #001f3f, #004080)",
        color: "#f1f5f9",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "4rem",
          color: "#38bdf8",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          letterSpacing: "2px",
        }}
      >
        🌟 Career Pathway Portal
      </h1>

      {Object.entries(careerData).map(([career, details]) => (
        <div key={career} style={{ marginBottom: "4rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              color: "#67e8f9",
              borderLeft: "5px solid #67e8f9",
              paddingLeft: "1rem",
              marginBottom: "2rem",
            }}
          >
            <Link
  to={
    career === "Doctor"
      ? "/Docgame1"
      : career === "Engineer"
      ? "/Engineergame1"
      : career === "Chartered Accountant (CA)"
      ? "/Cagame1"
      : career === "Company Secretary (CS)"
      ? "/Csgame1"
      : career === "Lawyer (LLB)"
      ? "/Lawgame1"
      : career === "Interior Designer"
      ? "/InteriorDesigngame1"
      : career === "Architect"
      ? "/Archgame1"
      : career === "Writer"
      ? "/Writergame1"
      : "#"
  }
  style={{
    textDecoration: "none",
    color: "#67e8f9",
    fontWeight: "bold",
    textTransform: "capitalize",
  }}
>
  {career}
</Link>

          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {Object.entries(details).map(([title, content]) => (
              <div
                key={title}
                style={{
                  backgroundColor: "white",
                  color: "#1e293b",
                  padding: "1.5rem",
                  borderRadius: "1rem",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 12px rgba(0,0,0,0.1)";
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    marginBottom: "0.75rem",
                    color: "#2563eb",
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>
                  {content}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Careers;