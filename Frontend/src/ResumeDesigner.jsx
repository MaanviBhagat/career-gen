import { useState } from "react";
import {
  Document, Packer, Paragraph, TextRun,
  BorderStyle, AlignmentType, LevelFormat,
  TabStopType, TabStopPosition,
} from "docx";

/* ─── palette ─── */
const B = { 50:"#E6F1FB",100:"#B5D4F4",200:"#85B7EB",400:"#378ADD",600:"#185FA5",800:"#0C447C",900:"#042C53" };

/* ─── tip content per mode ─── */
const TIPS = {
  newbie: [
    { icon:"🎯", title:"Lead with your potential", body:"Recruiters hiring juniors know you have little experience — they're betting on your trajectory. Open with a sharp objective statement that shows self-awareness and direction." },
    { icon:"🎓", title:"Education comes first", body:"Put your degree, GPA (if ≥ 3.5), relevant coursework, and any honours at the top. Academic achievement is your biggest proof point right now." },
    { icon:"🛠️", title:"Projects beat job titles", body:"A side project, hackathon entry, or open-source contribution can outweigh an irrelevant part-time job. Describe what you built, the tech stack, and the measurable result." },
    { icon:"📏", title:"One page only", body:"No recruiter expects a novel from a graduate. One tight, well-spaced page shows clarity of thought — a skill employers value immediately." },
    { icon:"✍️", title:"Use action verbs + numbers", body:"Don't write 'helped with website'. Write 'Redesigned landing page, reducing bounce rate by 18% in two weeks'. Numbers make vague tasks concrete." },
    { icon:"🔑", title:"Mirror the job description", body:"Copy the exact keywords from the job post (frameworks, tools, methodologies) into your skills section. ATS systems scan for them before a human ever reads your resume." },
  ],
  senior: [
    { icon:"📈", title:"Quantify every achievement", body:"At senior level, impact is everything. Replace 'managed team' with 'Led 8-engineer squad, shipping 3 product lines that drove $2.4M in ARR'. Numbers do the convincing for you." },
    { icon:"🏆", title:"Open with a value statement", body:"Skip the objective. Write a 2-sentence executive summary that states your specialty, years of experience, and the business outcomes you deliver. Recruiters spend 7 seconds on first pass." },
    { icon:"📐", title:"Two pages is fine — but tight", body:"Senior careers need space. Two pages are acceptable if every line earns its place. Cut anything older than 12–15 years unless it's a landmark achievement." },
    { icon:"🧩", title:"Show scope, not just tasks", body:"Describe the scale you operated at: budget owned, headcount managed, markets entered, systems handling X requests/second. Scope signals seniority instantly." },
    { icon:"🤝", title:"Highlight cross-functional leadership", body:"Stakeholder management, cross-team alignment, and executive communication are differentiators. Call them out explicitly — don't leave hiring managers to infer them." },
    { icon:"🔬", title:"Tailor ruthlessly per role", body:"A senior resume that reads like a general profile loses to one that mirrors the exact role. Rewrite the summary and reorder sections for every significant application." },
  ]
};

/* ─── fields per mode ─── */
const SECTIONS_NEWBIE = [
  { id:"personal", label:"Personal info", icon:"👤", fields:[
    { key:"name",     label:"Full name",        ph:"e.g. Priya Nair",          required:true },
    { key:"email",    label:"Email",            ph:"e.g. priya@gmail.com",     required:true },
    { key:"phone",    label:"Phone",            ph:"e.g. +91 98765 43210",     required:true },
    { key:"location", label:"City, State",      ph:"e.g. Bengaluru, Karnataka",required:true },
    { key:"linkedin", label:"LinkedIn / GitHub",ph:"https://...",              required:false },
  ]},
  { id:"objective", label:"Objective statement", icon:"🎯", fields:[
    { key:"objective", label:"Career objective (2–3 sentences)", ph:"I am a Computer Science graduate eager to apply my React and Node.js skills in a product-focused team...", required:true, multiline:true },
  ]},
  { id:"education", label:"Education", icon:"🎓", fields:[
    { key:"degree",     label:"Degree & Major",   ph:"B.Tech in Computer Science",      required:true },
    { key:"college",    label:"College / University", ph:"IIT Bombay",                  required:true },
    { key:"gradYear",   label:"Graduation year",  ph:"2024",                            required:true },
    { key:"gpa",        label:"GPA / Percentage", ph:"8.7 / 10  or  87%",              required:false },
    { key:"coursework", label:"Relevant coursework (comma-separated)", ph:"Data Structures, OS, DBMS, Web Dev", required:false },
  ]},
  { id:"skills", label:"Skills", icon:"⚡", fields:[
    { key:"techSkills", label:"Technical skills (comma-separated)", ph:"React, Node.js, Python, SQL, Git",  required:true },
    { key:"softSkills", label:"Soft skills (comma-separated)",      ph:"Team collaboration, Communication",required:false },
  ]},
  { id:"projects", label:"Projects", icon:"🛠️", fields:[
    { key:"proj1Title", label:"Project 1 — name", ph:"E-commerce Price Tracker",        required:true },
    { key:"proj1Stack", label:"Project 1 — tech stack", ph:"Python, BeautifulSoup, Streamlit", required:false },
    { key:"proj1Desc",  label:"Project 1 — description", ph:"Built a tool that scraped 500+ product pages daily...", required:true, multiline:true },
    { key:"proj2Title", label:"Project 2 — name (optional)", ph:"",                     required:false },
    { key:"proj2Stack", label:"Project 2 — tech stack",      ph:"",                     required:false },
    { key:"proj2Desc",  label:"Project 2 — description",     ph:"",                     required:false, multiline:true },
  ]},
  { id:"extras", label:"Extras", icon:"🌟", fields:[
    { key:"internship", label:"Internship / part-time (if any)", ph:"Frontend Intern @ Startup X — June 2023 (2 months). Built onboarding flow reducing drop-off by 12%.", required:false, multiline:true },
    { key:"certifications", label:"Certifications / courses", ph:"AWS Cloud Practitioner, Meta Front-End Dev Certificate", required:false },
    { key:"achievements",   label:"Awards / achievements",     ph:"1st place, Smart India Hackathon 2023",                 required:false },
    { key:"languages",      label:"Languages spoken",          ph:"English, Hindi, Tamil",                                 required:false },
  ]},
];

const SECTIONS_SENIOR = [
  { id:"personal", label:"Personal info", icon:"👤", fields:[
    { key:"name",     label:"Full name",        ph:"e.g. Rajesh Kumar",        required:true },
    { key:"email",    label:"Email",            ph:"e.g. rajesh@gmail.com",    required:true },
    { key:"phone",    label:"Phone",            ph:"e.g. +91 98765 43210",     required:true },
    { key:"location", label:"City, State",      ph:"e.g. Hyderabad, Telangana",required:true },
    { key:"linkedin", label:"LinkedIn / Portfolio",ph:"https://...",           required:false },
  ]},
  { id:"summary", label:"Executive summary", icon:"🏆", fields:[
    { key:"summary", label:"Value statement (2–3 sentences)", ph:"Engineering leader with 10+ years building distributed systems at scale. Delivered $4M ARR uplift through platform re-architecture at...", required:true, multiline:true },
  ]},
  { id:"experience", label:"Work experience", icon:"💼", fields:[
    { key:"exp1Role",    label:"Role 1 — job title + company",  ph:"Senior Software Engineer @ Infosys",required:true },
    { key:"exp1Period",  label:"Role 1 — period",               ph:"Jan 2020 – Present",                required:true },
    { key:"exp1Bullets", label:"Role 1 — achievements (one per line)", ph:"Led microservices migration, cutting latency by 40%\nManaged 6-person team across 3 time zones", required:true, multiline:true },
    { key:"exp2Role",    label:"Role 2 — job title + company",  ph:"Software Engineer @ Wipro",          required:false },
    { key:"exp2Period",  label:"Role 2 — period",               ph:"Mar 2017 – Dec 2019",                required:false },
    { key:"exp2Bullets", label:"Role 2 — achievements (one per line)", ph:"",                            required:false, multiline:true },
    { key:"exp3Role",    label:"Role 3 — job title + company",  ph:"",                                   required:false },
    { key:"exp3Period",  label:"Role 3 — period",               ph:"",                                   required:false },
    { key:"exp3Bullets", label:"Role 3 — achievements (one per line)", ph:"",                            required:false, multiline:true },
  ]},
  { id:"skills", label:"Skills & expertise", icon:"⚡", fields:[
    { key:"techSkills",  label:"Technical skills (comma-separated)",   ph:"System Design, Kubernetes, Go, Kafka, AWS",required:true },
    { key:"leadership",  label:"Leadership skills (comma-separated)",  ph:"Team building, OKR planning, Stakeholder mgmt",required:false },
    { key:"industries",  label:"Industries / domains",                 ph:"FinTech, EdTech, B2B SaaS",               required:false },
  ]},
  { id:"education", label:"Education", icon:"🎓", fields:[
    { key:"degree",   label:"Degree & Major",        ph:"B.E. Electronics & Communication",  required:true },
    { key:"college",  label:"College / University",  ph:"NIT Surathkal",                     required:true },
    { key:"gradYear", label:"Graduation year",       ph:"2014",                              required:true },
  ]},
  { id:"extras", label:"Extras", icon:"🌟", fields:[
    { key:"certifications", label:"Certifications",             ph:"AWS Solutions Architect Professional, CKA",                       required:false },
    { key:"achievements",   label:"Awards & recognition",       ph:"Engineering Excellence Award 2022, Speaker — ReactConf India",     required:false },
    { key:"publications",   label:"Publications / talks",       ph:"'Scaling at 10M RPM' — Medium (2023)",                            required:false },
    { key:"languages",      label:"Languages spoken",           ph:"English, Telugu, Hindi",                                           required:false },
  ]},
];

/* ─── helpers ─── */
function progress(sections, vals) {
  const req = sections.flatMap(s => s.fields.filter(f => f.required));
  const filled = req.filter(f => (vals[f.key] || "").trim());
  return { filled: filled.length, total: req.length };
}

function initVals(sections) {
  return Object.fromEntries(sections.flatMap(s => s.fields.map(f => [f.key, ""])));
}

/* ─── sub-components ─── */
function TipCard({ tip }) {
  return (
    <div style={{ background:"#fff", border:`1px solid ${B[100]}`, borderRadius:12, padding:"14px 16px", display:"flex", gap:12 }}>
      <div style={{ fontSize:22, flexShrink:0, paddingTop:1 }}>{tip.icon}</div>
      <div>
        <div style={{ fontSize:13, fontWeight:700, color:B[900], marginBottom:4 }}>{tip.title}</div>
        <div style={{ fontSize:12, color:"#4B5563", lineHeight:1.65 }}>{tip.body}</div>
      </div>
    </div>
  );
}

function Field({ f, val, onChange, touched }) {
  const empty = touched && f.required && !(val||"").trim();
  const base = {
    width:"100%", padding:"9px 12px", borderRadius:8, fontSize:13,
    fontFamily:"inherit", outline:"none", boxSizing:"border-box", color:"#1e1e2e",
    border:`1.5px solid ${empty?"#E24B4A":(val||"").trim()?B[400]:B[100]}`,
    background:(val||"").trim()?B[50]:"#fff", transition:"border .15s,background .15s",
  };
  return (
    <div style={{ marginBottom:12 }}>
      <label style={{ display:"flex", justifyContent:"space-between", fontSize:11, fontWeight:700, color:empty?"#E24B4A":B[800], marginBottom:4, letterSpacing:"0.4px" }}>
        <span>{f.label.toUpperCase()} {f.required&&<span style={{color:B[400]}}>*</span>}</span>
        {empty && <span style={{color:"#E24B4A",fontWeight:400}}>required</span>}
      </label>
      {f.multiline
        ? <textarea rows={3} value={val||""} placeholder={f.ph} onChange={e=>onChange(f.key,e.target.value)} style={{...base,resize:"vertical",lineHeight:1.5}} />
        : <input type="text" value={val||""} placeholder={f.ph} onChange={e=>onChange(f.key,e.target.value)} style={base} />
      }
    </div>
  );
}

/* ─── DOCX builder — uses imported docx names directly via npm package ─── */
async function buildDocx(mode, vals) {
  /* ── shared helpers ── */
  const hr = (color = "378ADD") =>
    new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 10, color, space: 1 } },
      spacing: { after: 160 },
    });

  const sectionHead = (text) => [
    new Paragraph({
      children: [
        new TextRun({
          text: text.toUpperCase(),
          bold: true,
          size: 22,
          font: "Arial",
          color: "042C53",
          characterSpacing: 40,
        }),
      ],
      spacing: { before: 240, after: 60 },
    }),
    hr("378ADD"),
  ];

  const bullet = (text) =>
    new Paragraph({
      numbering: { reference: "bullets", level: 0 },
      children: [new TextRun({ text, size: 20, font: "Arial", color: "374151" })],
      spacing: { after: 60 },
    });

  const bodyPara = (text, spacing = 100) =>
    new Paragraph({
      children: [new TextRun({ text, size: 20, font: "Arial", color: "374151" })],
      spacing: { after: spacing },
      alignment: AlignmentType.JUSTIFIED,
    });

  const roleRow = (title, period) =>
    new Paragraph({
      children: [
        new TextRun({ text: title, bold: true, size: 22, font: "Arial", color: "042C53" }),
        new TextRun({ text: "\t" + (period || ""), size: 18, font: "Arial", color: "6B7280" }),
      ],
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      spacing: { after: 50 },
    });

  /* ── build content ── */
  const children = [];

  /* header */
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: vals.name || "Your Name", bold: true, size: 52, font: "Arial", color: "042C53" }),
      ],
      spacing: { after: 60 },
    })
  );

  const contactParts = [vals.email, vals.phone, vals.location, vals.linkedin].filter(Boolean);
  children.push(
    new Paragraph({
      children: [new TextRun({ text: contactParts.join("  |  "), size: 18, font: "Arial", color: "185FA5" })],
      spacing: { after: 40 },
    })
  );
  children.push(hr("378ADD"));

  /* ── NEWBIE sections ── */
  if (mode === "newbie") {
    if (vals.objective) {
      children.push(...sectionHead("Career Objective"));
      children.push(bodyPara(vals.objective, 200));
    }

    if (vals.degree) {
      children.push(...sectionHead("Education"));
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: vals.degree, bold: true, size: 22, font: "Arial", color: "042C53" }),
            new TextRun({ text: "\t" + (vals.gradYear || ""), size: 20, font: "Arial", color: "6B7280" }),
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          spacing: { after: 40 },
        })
      );
      if (vals.college)    children.push(bodyPara(vals.college, 40));
      if (vals.gpa)        children.push(bodyPara("GPA / Score: " + vals.gpa, 40));
      if (vals.coursework) children.push(bodyPara("Relevant Coursework: " + vals.coursework, 160));
    }

    if (vals.techSkills) {
      children.push(...sectionHead("Skills"));
      children.push(bodyPara("Technical: " + vals.techSkills, 40));
      if (vals.softSkills) children.push(bodyPara("Soft Skills: " + vals.softSkills, 160));
    }

    if (vals.proj1Title) {
      children.push(...sectionHead("Projects"));
      children.push(
        new Paragraph({
          children: [new TextRun({ text: vals.proj1Title, bold: true, size: 22, font: "Arial", color: "0C447C" })],
          spacing: { after: 30 },
        })
      );
      if (vals.proj1Stack) children.push(bodyPara("Stack: " + vals.proj1Stack, 40));
      if (vals.proj1Desc)  vals.proj1Desc.split("\n").filter(Boolean).forEach((l) => children.push(bullet(l)));

      if (vals.proj2Title) {
        children.push(new Paragraph({ spacing: { after: 60 } }));
        children.push(
          new Paragraph({
            children: [new TextRun({ text: vals.proj2Title, bold: true, size: 22, font: "Arial", color: "0C447C" })],
            spacing: { after: 30 },
          })
        );
        if (vals.proj2Stack) children.push(bodyPara("Stack: " + vals.proj2Stack, 40));
        if (vals.proj2Desc)  vals.proj2Desc.split("\n").filter(Boolean).forEach((l) => children.push(bullet(l)));
      }
    }

    const hasExtras = vals.internship || vals.certifications || vals.achievements || vals.languages;
    if (hasExtras) {
      children.push(...sectionHead("Additional"));
      if (vals.internship) {
        children.push(bodyPara("Internship:", 30));
        vals.internship.split("\n").filter(Boolean).forEach((l) => children.push(bullet(l)));
      }
      if (vals.certifications) children.push(bodyPara("Certifications: " + vals.certifications, 40));
      if (vals.achievements)   children.push(bodyPara("Achievements: "   + vals.achievements,   40));
      if (vals.languages)      children.push(bodyPara("Languages: "      + vals.languages,      40));
    }

  /* ── SENIOR sections ── */
  } else {
    if (vals.summary) {
      children.push(...sectionHead("Professional Summary"));
      children.push(bodyPara(vals.summary, 200));
    }

    if (vals.exp1Role) {
      children.push(...sectionHead("Experience"));
      [
        ["exp1Role", "exp1Period", "exp1Bullets"],
        ["exp2Role", "exp2Period", "exp2Bullets"],
        ["exp3Role", "exp3Period", "exp3Bullets"],
      ].forEach(([r, p, b]) => {
        if (!vals[r]) return;
        children.push(roleRow(vals[r], vals[p]));
        if (vals[b]) vals[b].split("\n").filter(Boolean).forEach((l) => children.push(bullet(l)));
        children.push(new Paragraph({ spacing: { after: 120 } }));
      });
    }

    if (vals.techSkills) {
      children.push(...sectionHead("Skills & Expertise"));
      children.push(bodyPara("Technical: "  + vals.techSkills, 40));
      if (vals.leadership) children.push(bodyPara("Leadership: " + vals.leadership, 40));
      if (vals.industries) children.push(bodyPara("Domains: "    + vals.industries, 160));
    }

    if (vals.degree) {
      children.push(...sectionHead("Education"));
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: vals.degree, bold: true, size: 22, font: "Arial", color: "042C53" }),
            new TextRun({ text: "\t" + (vals.gradYear || ""), size: 20, font: "Arial", color: "6B7280" }),
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          spacing: { after: 40 },
        })
      );
      if (vals.college) children.push(bodyPara(vals.college, 160));
    }

    const hasExtras = vals.certifications || vals.achievements || vals.publications || vals.languages;
    if (hasExtras) {
      children.push(...sectionHead("Additional"));
      if (vals.certifications) children.push(bodyPara("Certifications: "        + vals.certifications, 40));
      if (vals.achievements)   children.push(bodyPara("Awards: "                + vals.achievements,   40));
      if (vals.publications)   children.push(bodyPara("Publications / Talks: "  + vals.publications,   40));
      if (vals.languages)      children.push(bodyPara("Languages: "             + vals.languages,      40));
    }
  }

  /* ── assemble & pack ── */
  const doc = new Document({
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "\u2022",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 360, hanging: 360 } } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 }, // US Letter
            margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
          },
        },
        children,
      },
    ],
  });

  /* Packer.toBlob() runs entirely in the browser — no server needed */
  return Packer.toBlob(doc);
}

/* ─── PDF builder via print ─── */
function buildPreviewHTML(mode, vals) {
  const contact = [vals.email,vals.phone,vals.location,vals.linkedin].filter(Boolean).join(" · ");
  let html = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
      body{font-family:Arial,sans-serif;color:#1e1e2e;padding:36px 44px;max-width:760px;margin:0 auto;font-size:12px;line-height:1.6}
      h1{font-size:26px;font-weight:700;color:#042C53;margin:0 0 4px}
      .contact{font-size:11px;color:#185FA5;margin-bottom:12px}
      .divider{border:none;border-top:2.5px solid #378ADD;margin:8px 0 14px}
      .sec-title{font-size:10px;font-weight:700;color:#042C53;letter-spacing:.08em;text-transform:uppercase;margin:18px 0 2px}
      .sec-div{border:none;border-top:1px solid #B5D4F4;margin:0 0 10px}
      .role-row{display:flex;justify-content:space-between;font-weight:700;font-size:12px;color:#042C53;margin-bottom:3px}
      .sub{color:#6B7280;font-size:11px;margin-bottom:3px}
      ul{margin:4px 0 8px 18px;padding:0} li{margin-bottom:2px;font-size:11.5px}
      p{margin:0 0 8px;font-size:11.5px;text-align:justify}
    </style>
    <h1>${vals.name||"Your Name"}</h1>
    <div class="contact">${contact}</div>
    <hr class="divider">
  `;

  const sec = (title, content) => `<div class="sec-title">${title}</div><hr class="sec-div">${content}`;
  const bul = (text) => text.split("\n").filter(Boolean).map(l=>`<li>${l}</li>`).join("");

  if (mode==="newbie") {
    if (vals.objective) html += sec("Career Objective", `<p>${vals.objective}</p>`);
    if (vals.degree) {
      let ed = `<div class="role-row"><span>${vals.degree}</span><span style="color:#6B7280;font-weight:400;font-size:11px">${vals.gradYear||""}</span></div>`;
      if (vals.college) ed += `<div class="sub">${vals.college}</div>`;
      if (vals.gpa) ed += `<div class="sub">GPA / Score: ${vals.gpa}</div>`;
      if (vals.coursework) ed += `<div class="sub">Coursework: ${vals.coursework}</div>`;
      html += sec("Education", ed);
    }
    if (vals.techSkills) {
      let sk = `<p><strong>Technical:</strong> ${vals.techSkills}</p>`;
      if (vals.softSkills) sk += `<p><strong>Soft Skills:</strong> ${vals.softSkills}</p>`;
      html += sec("Skills", sk);
    }
    if (vals.proj1Title) {
      let pr = `<div class="role-row">${vals.proj1Title}</div>`;
      if (vals.proj1Stack) pr += `<div class="sub">Stack: ${vals.proj1Stack}</div>`;
      if (vals.proj1Desc) pr += `<ul>${bul(vals.proj1Desc)}</ul>`;
      if (vals.proj2Title) {
        pr += `<div class="role-row" style="margin-top:8px">${vals.proj2Title}</div>`;
        if (vals.proj2Stack) pr += `<div class="sub">Stack: ${vals.proj2Stack}</div>`;
        if (vals.proj2Desc) pr += `<ul>${bul(vals.proj2Desc)}</ul>`;
      }
      html += sec("Projects", pr);
    }
    let add = "";
    if (vals.internship) add += `<p><strong>Internship:</strong></p><ul>${bul(vals.internship)}</ul>`;
    if (vals.certifications) add += `<p><strong>Certifications:</strong> ${vals.certifications}</p>`;
    if (vals.achievements) add += `<p><strong>Achievements:</strong> ${vals.achievements}</p>`;
    if (vals.languages) add += `<p><strong>Languages:</strong> ${vals.languages}</p>`;
    if (add) html += sec("Additional", add);
  } else {
    if (vals.summary) html += sec("Professional Summary", `<p>${vals.summary}</p>`);
    if (vals.exp1Role) {
      let ex = "";
      [["exp1Role","exp1Period","exp1Bullets"],["exp2Role","exp2Period","exp2Bullets"],["exp3Role","exp3Period","exp3Bullets"]].forEach(([r,p,b])=>{
        if (!vals[r]) return;
        ex += `<div class="role-row"><span>${vals[r]}</span><span style="color:#6B7280;font-weight:400;font-size:11px">${vals[p]||""}</span></div>`;
        if (vals[b]) ex += `<ul>${bul(vals[b])}</ul>`;
        ex += "<div style='margin-bottom:8px'></div>";
      });
      html += sec("Experience", ex);
    }
    if (vals.techSkills) {
      let sk = `<p><strong>Technical:</strong> ${vals.techSkills}</p>`;
      if (vals.leadership) sk += `<p><strong>Leadership:</strong> ${vals.leadership}</p>`;
      if (vals.industries) sk += `<p><strong>Domains:</strong> ${vals.industries}</p>`;
      html += sec("Skills & Expertise", sk);
    }
    if (vals.degree) {
      let ed = `<div class="role-row"><span>${vals.degree}</span><span style="color:#6B7280;font-weight:400;font-size:11px">${vals.gradYear||""}</span></div>`;
      if (vals.college) ed += `<div class="sub">${vals.college}</div>`;
      html += sec("Education", ed);
    }
    let add = "";
    if (vals.certifications) add += `<p><strong>Certifications:</strong> ${vals.certifications}</p>`;
    if (vals.achievements) add += `<p><strong>Awards:</strong> ${vals.achievements}</p>`;
    if (vals.publications) add += `<p><strong>Publications / Talks:</strong> ${vals.publications}</p>`;
    if (vals.languages) add += `<p><strong>Languages:</strong> ${vals.languages}</p>`;
    if (add) html += sec("Additional", add);
  }
  return html;
}

/* ═══════════════════════════════════════════════════════ MAIN APP ══ */
export default function ResumeDesigner() {
  const [step, setStep] = useState("pick");      // pick | tips | form
  const [mode, setMode] = useState(null);        // newbie | senior
  const [vals, setVals] = useState({});
  const [touched, setTouched] = useState(false);
  const [downloading, setDownloading] = useState(null);
  const [activeSection, setActiveSection] = useState(0);

  // No CDN script needed — docx is imported directly from the npm package above.
  // Packer.toBlob() runs entirely in the browser via the bundler.

  const sections = mode === "newbie" ? SECTIONS_NEWBIE : SECTIONS_SENIOR;

  const pickMode = (m) => {
    setMode(m);
    setVals(initVals(m === "newbie" ? SECTIONS_NEWBIE : SECTIONS_SENIOR));
    setActiveSection(0);
    setStep("tips");
  };

  const { filled, total } = step === "form" ? progress(sections, vals) : { filled: 0, total: 1 };
  const allFilled = filled === total;

  const handleChange = (key, val) => setVals((p) => ({ ...p, [key]: val }));

  const downloadDocx = async () => {
    setTouched(true);
    if (!allFilled) return;
    setDownloading("docx");
    try {
      // buildDocx uses Packer.toBlob() from the docx npm package — no server, no CDN
      const blob = await buildDocx(mode, vals);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `resume_${(vals.name || "resume").replace(/\s+/g, "_")}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("DOCX generation failed:", err);
      alert("Failed to generate .docx — check the console for details.");
    } finally {
      setDownloading(null);
    }
  };

  const downloadPDF = () => {
    setTouched(true);
    if (!allFilled) return;
    setDownloading("pdf");
    const html = buildPreviewHTML(mode, vals);
    const win = window.open("","_blank","width=820,height=1060");
    win.document.write(`<!DOCTYPE html><html><head><title>Resume — ${vals.name||""}</title></head><body>${html}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(()=>{ win.print(); setDownloading(null); }, 600);
  };

  /* ── shared header ── */
  const Header = () => (
    <div style={{ background:B[900], padding:"14px 28px", display:"flex", alignItems:"center", gap:14 }}>
      <div style={{ width:36,height:36,borderRadius:9,background:B[400],display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0 }}>📋</div>
      <div>
        <div style={{ fontSize:17,fontWeight:800,color:"#fff",letterSpacing:"-0.3px" }}>Resume <span style={{color:B[200]}}>Designer</span></div>
        <div style={{ fontSize:10,color:B[200],marginTop:1 }}>
          {step==="pick" && "Choose your experience level to get started"}
          {step==="tips" && `${mode==="newbie"?"Fresher":"Senior"} mode — read the tips below before filling your form`}
          {step==="form" && `${mode==="newbie"?"Fresher":"Senior"} mode — filling details`}
        </div>
      </div>
      {step!=="pick" && (
        <div style={{ marginLeft:"auto",display:"flex",gap:8 }}>
          {step==="form" && (
            <div style={{ background:B[800],borderRadius:20,padding:"4px 14px",fontSize:11,color:B[100],fontWeight:700 }}>
              {filled}/{total} required fields
            </div>
          )}
          <button onClick={()=>{ if(step==="form") setStep("tips"); else { setStep("pick"); setMode(null); } }}
            style={{ background:"transparent",border:`1px solid ${B[400]}`,borderRadius:8,padding:"5px 12px",color:B[100],fontSize:12,fontWeight:600,cursor:"pointer" }}>
            ← Back
          </button>
        </div>
      )}
    </div>
  );

  /* ── STEP: pick ── */
  if (step==="pick") return (
    <div style={{ fontFamily:"'Montserrat',sans-serif", background:"#F0F4FF", minHeight:"100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}`}</style>
      <Header />
      <div style={{ padding:"36px 28px", maxWidth:700, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:22,fontWeight:800,color:B[900],marginBottom:8 }}>Who is this resume for?</div>
          <div style={{ fontSize:13,color:"#6B7280",lineHeight:1.7 }}>Choose your experience level. Each mode gives you tailored tips and the right sections for your career stage.</div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
          {[
            { mode:"newbie", emoji:"🌱", title:"Fresher / Student", sub:"0–2 years of experience", bullets:["Final year or recent graduate","Little or no full-time work history","Projects & education are your strongest cards","One-page, objective-led format"] },
            { mode:"senior", emoji:"🚀", title:"Senior Professional", sub:"3+ years of experience", bullets:["Proven work history with measurable impact","Leadership, ownership, or specialist depth","Achievements and scope are your differentiators","Two-page, summary-led format"] },
          ].map(opt => (
            <div key={opt.mode} onClick={()=>pickMode(opt.mode)}
              style={{ background:"#fff", border:`2px solid ${B[100]}`, borderRadius:16, padding:"24px 22px", cursor:"pointer", transition:"border .15s,transform .15s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=B[400]; e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=B[100]; e.currentTarget.style.transform="translateY(0)"; }}>
              <div style={{ fontSize:36,marginBottom:10 }}>{opt.emoji}</div>
              <div style={{ fontSize:16,fontWeight:800,color:B[900],marginBottom:3 }}>{opt.title}</div>
              <div style={{ fontSize:11,color:B[600],marginBottom:14,fontWeight:600 }}>{opt.sub}</div>
              {opt.bullets.map((b,i)=>(
                <div key={i} style={{ display:"flex",gap:8,alignItems:"flex-start",marginBottom:7,fontSize:12,color:"#374151" }}>
                  <span style={{ color:B[400],marginTop:2,flexShrink:0 }}>✓</span>{b}
                </div>
              ))}
              <div style={{ marginTop:20,background:B[600],borderRadius:8,padding:"10px 0",textAlign:"center",color:"#fff",fontSize:13,fontWeight:700 }}>
                Get started →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── STEP: tips ── */
  if (step==="tips") return (
    <div style={{ fontFamily:"'Montserrat',sans-serif", background:"#F0F4FF", minHeight:"100vh" }}>
      <Header />
      <div style={{ padding:"28px 28px", maxWidth:720, margin:"0 auto" }}>
        <div style={{ background:B[900],borderRadius:14,padding:"20px 24px",marginBottom:28,display:"flex",alignItems:"center",gap:16 }}>
          <div style={{ fontSize:30 }}>{mode==="newbie"?"🌱":"🚀"}</div>
          <div>
            <div style={{ fontSize:16,fontWeight:800,color:"#fff",marginBottom:4 }}>
              {mode==="newbie"?"6 tips to write a standout fresher resume":"6 tips to write a powerful senior resume"}
            </div>
            <div style={{ fontSize:12,color:B[200],lineHeight:1.6 }}>
              {mode==="newbie"
                ? "Recruiters spend under 10 seconds on a first scan. These tips help you land in the 'yes' pile even without years of experience."
                : "At senior level, every line must justify your asking salary. Read these before you type a single word."}
            </div>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:32 }}>
          {TIPS[mode].map((t,i)=><TipCard key={i} tip={t} />)}
        </div>
        <div style={{ textAlign:"center" }}>
          <button onClick={()=>setStep("form")}
            style={{ background:B[600],color:"#fff",border:"none",borderRadius:12,padding:"14px 48px",fontSize:15,fontWeight:800,cursor:"pointer",letterSpacing:"0.3px" }}>
            I'm ready — fill my resume →
          </button>
          <div style={{ fontSize:11,color:"#9CA3AF",marginTop:10 }}>You can refer back to these tips anytime</div>
        </div>
      </div>
    </div>
  );

  /* ── STEP: form ── */
  const pct = Math.round((filled/total)*100);

  return (
    <div style={{ fontFamily:"'Montserrat',sans-serif", background:"#F0F4FF", minHeight:"100vh" }}>
      <Header />

      {/* progress bar */}
      <div style={{ background:"#fff", borderBottom:`1px solid ${B[100]}`, padding:"10px 28px" }}>
        <div style={{ maxWidth:900,margin:"0 auto",display:"flex",alignItems:"center",gap:12 }}>
          <div style={{ flex:1,height:7,background:B[50],borderRadius:8,overflow:"hidden" }}>
            <div style={{ height:"100%",background:pct===100?"#16A34A":B[400],width:`${pct}%`,borderRadius:8,transition:"width .4s" }} />
          </div>
          <span style={{ fontSize:11,fontWeight:700,color:pct===100?"#16A34A":B[600],whiteSpace:"nowrap" }}>{pct}% complete</span>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", maxWidth:1000, margin:"0 auto", minHeight:"calc(100vh - 100px)" }}>

        {/* sidebar nav */}
        <div style={{ background:"#fff", borderRight:`1px solid ${B[100]}`, paddingTop:20 }}>
          <div style={{ padding:"0 14px 12px", fontSize:10, fontWeight:700, color:B[400], letterSpacing:"1.2px", textTransform:"uppercase" }}>Sections</div>
          {sections.map((sec,i) => {
            const secFilled = sec.fields.filter(f=>f.required&&(vals[f.key]||"").trim()).length;
            const secTotal  = sec.fields.filter(f=>f.required).length;
            const done = secFilled===secTotal && secTotal>0;
            return (
              <div key={sec.id} onClick={()=>setActiveSection(i)}
                style={{ padding:"11px 14px 11px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:10,
                  borderLeft:`3px solid ${activeSection===i?B[400]:"transparent"}`,
                  background: activeSection===i?B[50]:"transparent",
                  transition:"background .15s" }}>
                <span style={{ fontSize:15 }}>{sec.icon}</span>
                <span style={{ fontSize:12,fontWeight:activeSection===i?700:500,color:activeSection===i?B[800]:"#374151",flex:1 }}>{sec.label}</span>
                {done && <span style={{ fontSize:13,color:"#16A34A" }}>✓</span>}
              </div>
            );
          })}

          {/* tips button */}
          <div onClick={()=>setStep("tips")}
            style={{ margin:"20px 14px 0", background:B[50], border:`1px solid ${B[100]}`, borderRadius:10,
              padding:"10px 12px", cursor:"pointer", fontSize:11, color:B[800], fontWeight:600, lineHeight:1.5 }}>
            💡 View resume tips again
          </div>
        </div>

        {/* form panel */}
        <div style={{ padding:"24px 32px", overflowY:"auto" }}>
          {sections[activeSection] && (
            <div key={sections[activeSection].id}>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:20 }}>
                <span style={{ fontSize:24 }}>{sections[activeSection].icon}</span>
                <div>
                  <div style={{ fontSize:16,fontWeight:800,color:B[900] }}>{sections[activeSection].label}</div>
                  <div style={{ fontSize:11,color:"#9CA3AF" }}>
                    {sections[activeSection].fields.filter(f=>f.required&&(vals[f.key]||"").trim()).length}/
                    {sections[activeSection].fields.filter(f=>f.required).length} required fields filled
                  </div>
                </div>
                <div style={{ marginLeft:"auto",display:"flex",gap:8 }}>
                  {activeSection>0&&<button onClick={()=>setActiveSection(i=>i-1)} style={{ background:"transparent",border:`1px solid ${B[200]}`,borderRadius:8,padding:"6px 14px",fontSize:12,color:B[600],fontWeight:600,cursor:"pointer" }}>← Prev</button>}
                  {activeSection<sections.length-1&&<button onClick={()=>setActiveSection(i=>i+1)} style={{ background:B[400],border:"none",borderRadius:8,padding:"6px 14px",fontSize:12,color:"#fff",fontWeight:700,cursor:"pointer" }}>Next →</button>}
                </div>
              </div>

              {sections[activeSection].fields.map(f=>(
                <Field key={f.key} f={f} val={vals[f.key]} onChange={handleChange} touched={touched} />
              ))}
            </div>
          )}

          {/* section dots */}
          <div style={{ display:"flex",gap:6,justifyContent:"center",margin:"24px 0 8px" }}>
            {sections.map((_,i)=>(
              <div key={i} onClick={()=>setActiveSection(i)} style={{ width:i===activeSection?20:8,height:8,borderRadius:8,background:i===activeSection?B[400]:B[100],cursor:"pointer",transition:"width .2s,background .2s" }} />
            ))}
          </div>

          {/* download bar */}
          <div style={{ background:"#fff",border:`1px solid ${B[100]}`,borderRadius:14,padding:"20px 24px",marginTop:24 }}>
            <div style={{ fontSize:13,fontWeight:700,color:B[900],marginBottom:4 }}>Download your resume</div>
            <div style={{ fontSize:11,color:"#9CA3AF",marginBottom:16 }}>
              {allFilled ? "All required fields filled — ready to download!" : `Fill ${total-filled} more required field${total-filled===1?"":"s"} to unlock downloads`}
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
              <button onClick={downloadDocx} disabled={!allFilled||downloading==="docx"}
                style={{ padding:"13px 0",borderRadius:10,border:"none",
                  background:allFilled?B[600]:"#C7D2FE",color:allFilled?"#fff":B[800],
                  fontSize:13,fontWeight:800,cursor:allFilled?"pointer":"not-allowed",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                  opacity:downloading&&downloading!=="docx"?.5:1, transition:"background .2s" }}
                onMouseEnter={e=>{ if(allFilled) e.currentTarget.style.background=B[800]; }}
                onMouseLeave={e=>{ if(allFilled) e.currentTarget.style.background=B[600]; }}>
                {downloading==="docx"?"⏳ Building...":"⬇ Download .docx"}
              </button>
              <button onClick={downloadPDF} disabled={!allFilled||downloading==="pdf"}
                style={{ padding:"13px 0",borderRadius:10,border:`2px solid ${allFilled?B[400]:"#C7D2FE"}`,
                  background:"#fff",color:allFilled?B[600]:B[200],
                  fontSize:13,fontWeight:800,cursor:allFilled?"pointer":"not-allowed",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                  opacity:downloading&&downloading!=="pdf"?.5:1, transition:"border .2s,color .2s" }}
                onMouseEnter={e=>{ if(allFilled){ e.currentTarget.style.background=B[50]; }}}
                onMouseLeave={e=>{ if(allFilled){ e.currentTarget.style.background="#fff"; }}}>
                {downloading==="pdf"?"⏳ Opening...":"🖨 Download PDF"}
              </button>
            </div>
            {touched&&!allFilled&&(
              <div style={{ marginTop:10,textAlign:"center",fontSize:11,color:"#E24B4A",fontWeight:600 }}>
                Please fill all required (*) fields first
              </div>
            )}
            <div style={{ marginTop:12,fontSize:10,color:"#9CA3AF",textAlign:"center" }}>
              PDF opens a print dialog — choose "Save as PDF" in your browser's print menu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

