// Requires: npm install docx
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
} from "docx";
import { useState, useCallback } from "react";

// ── Constants ──────────────────────────────────────────────────────────────────

const BLUE = {
  50: "#E6F1FB",
  100: "#B5D4F4",
  200: "#85B7EB",
  400: "#378ADD",
  600: "#185FA5",
  800: "#0C447C",
  900: "#042C53",
};

const FIELDS = [
  { key: "name",       label: "Full name",              placeholder: "e.g. Arjun Sharma",               icon: "👤", required: true  },
  { key: "email",      label: "Email address",           placeholder: "e.g. arjun@gmail.com",            icon: "✉️", required: true  },
  { key: "phone",      label: "Phone number",            placeholder: "e.g. +91 98765 43210",            icon: "📞", required: true  },
  { key: "location",   label: "City, State",             placeholder: "e.g. Mumbai, Maharashtra",        icon: "📍", required: true  },
  { key: "jobTitle",   label: "Job title applying for",  placeholder: "e.g. Senior Frontend Developer",  icon: "💼", required: true  },
  { key: "company",    label: "Company name",            placeholder: "e.g. TechCorp India",             icon: "🏢", required: true  },
  { key: "hiring",     label: "Hiring manager name",     placeholder: "e.g. Ms. Priya Mehta (optional)", icon: "🤝", required: false },
  { key: "skill",      label: "Your key skill / stack",  placeholder: "e.g. React & Node.js",            icon: "⚡", required: true  },
  { key: "experience", label: "Years of experience",     placeholder: "e.g. 4",                          icon: "📅", required: true  },
];

const TODAY = new Date().toLocaleDateString("en-IN", {
  day: "numeric", month: "long", year: "numeric",
});

// ── Letter content builder ─────────────────────────────────────────────────────

function buildLetterLines(f) {
  const salutation = f.hiring ? `Dear ${f.hiring},` : "Dear Hiring Manager,";
  return [
    salutation,
    "",
    `I am writing to express my strong interest in the ${f.jobTitle} position at ${f.company}. With ${f.experience} year${f.experience === "1" ? "" : "s"} of experience specialising in ${f.skill}, I am confident I can make an immediate and meaningful contribution to your team.`,
    "",
    `Throughout my career, I have developed deep expertise in ${f.skill}, delivering high-quality solutions that align with business goals and user needs. I am comfortable working across the full development lifecycle — from conception and architecture through to testing and deployment — and I take pride in writing clean, maintainable code.`,
    "",
    `What draws me to ${f.company} is its reputation for technical excellence and a culture of continuous improvement. I believe the combination of my hands-on experience in ${f.skill} and my collaborative, results-driven approach make me a strong fit for this role.`,
    "",
    `I would welcome the opportunity to discuss how my background can support ${f.company}'s objectives. Please find my resume attached, and feel free to reach me at ${f.email} or ${f.phone}.`,
    "",
    "Thank you sincerely for your time and consideration.",
    "",
    "Yours sincerely,",
    f.name,
    f.location,
  ];
}

// ── DOCX download (uses npm `docx` package — no CDN, no dynamic loading) ──────

async function downloadAsDocx(f) {
  const meta = [f.email, f.phone, f.location].filter(Boolean).join("  ·  ");
  const lines = buildLetterLines(f);

  const bodyParagraphs = lines.map(
    (line) =>
      new Paragraph({
        children: [
          new TextRun({
            text: line || " ",
            font: "Arial",
            size: 22,
            color: "1e1e2e",
          }),
        ],
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: line === "" ? 80 : 160 },
      })
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { width: 12240, height: 15840 },
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children: [
          // Name
          new Paragraph({
            children: [new TextRun({ text: f.name, bold: true, size: 40, font: "Arial", color: "042C53" })],
            spacing: { after: 60 },
          }),
          // Meta: email · phone · location
          new Paragraph({
            children: [new TextRun({ text: meta, size: 20, font: "Arial", color: "185FA5" })],
            spacing: { after: 60 },
          }),
          // Date
          new Paragraph({
            children: [new TextRun({ text: TODAY, size: 20, font: "Arial", color: "888888" })],
            spacing: { after: 200 },
          }),
          // Divider — paragraph with a bottom border
          new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 16, color: "378ADD", space: 1 } },
            spacing: { after: 280 },
          }),
          // Body paragraphs
          ...bodyParagraphs,
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cover_letter_${(f.company || "company").replace(/\s+/g, "_")}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── PDF print HTML builder ─────────────────────────────────────────────────────

function buildPreviewHTML(f) {
  const meta = [f.email, f.phone, f.location].filter(Boolean).join("  &middot;  ");
  const bodyLines = buildLetterLines(f);

  const bodyHtml = bodyLines
    .map((line) =>
      line === ""
        ? `<p class="spacer">&nbsp;</p>`
        : `<p class="body">${line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`
    )
    .join("\n");

  return `
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: Arial, sans-serif;
        color: #1e1e2e;
        padding: 72pt 72pt 72pt 72pt;
        font-size: 11pt;
        line-height: 1.7;
      }
      .name {
        font-size: 22pt;
        font-weight: 700;
        color: #042C53;
        margin-bottom: 4pt;
      }
      .meta {
        font-size: 10pt;
        color: #185FA5;
        margin-bottom: 4pt;
      }
      .date {
        font-size: 10pt;
        color: #888;
        margin-bottom: 12pt;
      }
      .divider {
        border: none;
        border-bottom: 1.5pt solid #378ADD;
        margin-bottom: 18pt;
      }
      p.body {
        text-align: justify;
        margin-bottom: 4pt;
      }
      p.spacer {
        margin-bottom: 8pt;
      }
      @media print {
        body { padding: 0; }
        @page { margin: 1in; size: letter; }
      }
    </style>
    <div class="name">${f.name.replace(/&/g, "&amp;")}</div>
    <div class="meta">${meta}</div>
    <div class="date">${TODAY}</div>
    <hr class="divider" />
    ${bodyHtml}
  `;
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function CompletionBar({ filled, total }) {
  const pct = Math.round((filled / total) * 100);
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: BLUE[800] }}>Form completion</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: pct === 100 ? "#16A34A" : BLUE[600] }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: 8, background: "#E8EAFF", borderRadius: 8, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 8,
          background: pct === 100 ? "#16A34A" : BLUE[400],
          width: `${pct}%`, transition: "width 0.4s ease",
        }} />
      </div>
    </div>
  );
}

function FieldRow({ field, value, onChange, touched }) {
  const isEmpty = touched && field.required && !value.trim();
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        display: "flex", alignItems: "center", gap: 6,
        fontSize: 12, fontWeight: 700,
        color: isEmpty ? "#E24B4A" : BLUE[800],
        marginBottom: 5, letterSpacing: "0.3px",
      }}>
        <span>{field.icon}</span>
        {field.label.toUpperCase()}
        {field.required && <span style={{ color: BLUE[400], marginLeft: 2 }}>*</span>}
        {isEmpty && (
          <span style={{ color: "#E24B4A", fontWeight: 400, marginLeft: "auto", fontSize: 11 }}>
            Required
          </span>
        )}
      </label>
      <input
        type="text"
        value={value}
        placeholder={field.placeholder}
        onChange={(e) => onChange(field.key, e.target.value)}
        style={{
          width: "100%", padding: "10px 14px",
          border: `1.5px solid ${isEmpty ? "#E24B4A" : value.trim() ? BLUE[400] : "#C7D2FE"}`,
          borderRadius: 10, fontSize: 13, fontFamily: "inherit",
          background: value.trim() ? BLUE[50] : "#fff",
          color: "#1e1e2e", outline: "none",
          transition: "border-color 0.2s, background 0.2s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.target.style.borderColor = BLUE[600])}
        onBlur={(e) =>
          (e.target.style.borderColor = isEmpty
            ? "#E24B4A"
            : value.trim()
            ? BLUE[400]
            : "#C7D2FE")
        }
      />
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────

export default function CoverLetterGenerator() {
  const [values, setValues] = useState(
    Object.fromEntries(FIELDS.map((f) => [f.key, ""]))
  );
  const [touched, setTouched]         = useState(false);
  const [downloading, setDownloading] = useState(null); // null | "docx" | "pdf"
  const [error, setError]             = useState("");

  const handleChange = useCallback(
    (key, val) => setValues((prev) => ({ ...prev, [key]: val })),
    []
  );

  const requiredFields = FIELDS.filter((f) => f.required);
  const filledRequired = requiredFields.filter((f) => values[f.key].trim()).length;
  const allFilled      = filledRequired === requiredFields.length;

  const downloadDocx = async () => {
    setTouched(true);
    setError("");
    if (!allFilled) return;
    setDownloading("docx");
    try {
      await downloadAsDocx(values);
    } catch (err) {
      setError("Download failed: " + err.message);
    } finally {
      setDownloading(null);
    }
  };

  const downloadPDF = () => {
    setTouched(true);
    if (!allFilled) return;
    setDownloading("pdf");
    const html = buildPreviewHTML(values);
    const win = window.open("", "_blank", "width=820,height=1060");
    win.document.write(
      `<!DOCTYPE html><html><head><title>Cover Letter — ${values.name || ""}</title></head><body>${html}</body></html>`
    );
    win.document.close();
    win.focus();
    setTimeout(() => {
      win.print();
      setDownloading(null);
    }, 600);
  };

  const letterPreview = allFilled ? buildLetterLines(values).join("\n") : null;

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: "#F0F4FF", minHeight: "100vh" }}>

      {/* ── Header ── */}
      <div style={{ background: BLUE[900], padding: "18px 32px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, background: BLUE[400],
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
        }}>
          📄
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" }}>
            Cover Letter <span style={{ color: BLUE[200] }}>Generator</span>
          </div>
          <div style={{ fontSize: 11, color: BLUE[200], marginTop: 1 }}>
            Fill in the fields · Download as .docx or .pdf
          </div>
        </div>
        <div style={{
          marginLeft: "auto", background: BLUE[800], borderRadius: 20,
          padding: "5px 14px", fontSize: 11, color: BLUE[100], fontWeight: 700, letterSpacing: "0.5px",
        }}>
          {filledRequired}/{requiredFields.length} fields
        </div>
      </div>

      {/* ── Two-column body ── */}
      <div style={{ display: "grid", gridTemplateColumns: "400px 1fr", minHeight: "calc(100vh - 66px)" }}>

        {/* Left — Form */}
        <div style={{ background: "#fff", padding: "24px 24px 32px", borderRight: `1px solid ${BLUE[100]}`, overflowY: "auto" }}>
          <CompletionBar filled={filledRequired} total={requiredFields.length} />

          <div style={{
            background: BLUE[50], border: `1px solid ${BLUE[100]}`, borderRadius: 10,
            padding: "10px 14px", marginBottom: 20, fontSize: 12, color: BLUE[800], lineHeight: 1.6,
          }}>
            <span style={{ fontWeight: 700 }}>How it works:</span> Fill every field marked{" "}
            <span style={{ color: BLUE[400], fontWeight: 700 }}>*</span>, then choose your download
            format. Generated instantly — no server, no account.
          </div>

          {FIELDS.map((field) => (
            <FieldRow
              key={field.key}
              field={field}
              value={values[field.key]}
              onChange={handleChange}
              touched={touched}
            />
          ))}

          {/* ── Download buttons ── */}
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            {/* Word .docx */}
            <button
              onClick={downloadDocx}
              disabled={!!downloading}
              style={{
                flex: 1, padding: "13px 0",
                background: allFilled ? BLUE[600] : "#C7D2FE",
                color: allFilled ? "#fff" : BLUE[800],
                border: "none", borderRadius: 12, fontSize: 13, fontWeight: 800,
                fontFamily: "inherit", letterSpacing: "0.4px", transition: "background 0.2s",
                cursor: allFilled && !downloading ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
              onMouseEnter={(e) => { if (allFilled && !downloading) e.currentTarget.style.background = BLUE[800]; }}
              onMouseLeave={(e) => { if (allFilled && !downloading) e.currentTarget.style.background = allFilled ? BLUE[600] : "#C7D2FE"; }}
            >
              {downloading === "docx" ? "⏳ Generating…" : "⬇ Word (.docx)"}
            </button>

            {/* PDF */}
            <button
              onClick={downloadPDF}
              disabled={!!downloading}
              style={{
                flex: 1, padding: "13px 0",
                background: allFilled ? "#DC2626" : "#FEE2E2",
                color: allFilled ? "#fff" : "#991B1B",
                border: "none", borderRadius: 12, fontSize: 13, fontWeight: 800,
                fontFamily: "inherit", letterSpacing: "0.4px", transition: "background 0.2s",
                cursor: allFilled && !downloading ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
              onMouseEnter={(e) => { if (allFilled && !downloading) e.currentTarget.style.background = "#991B1B"; }}
              onMouseLeave={(e) => { if (allFilled && !downloading) e.currentTarget.style.background = allFilled ? "#DC2626" : "#FEE2E2"; }}
            >
              {downloading === "pdf" ? "⏳ Opening…" : "⬇ PDF (.pdf)"}
            </button>
          </div>

          {touched && !allFilled && (
            <div style={{ marginTop: 10, textAlign: "center", fontSize: 12, color: "#E24B4A", fontWeight: 600 }}>
              Please fill all required (*) fields first
            </div>
          )}
          {error && (
            <div style={{ marginTop: 10, textAlign: "center", fontSize: 12, color: "#E24B4A", fontWeight: 600 }}>
              {error}
            </div>
          )}
        </div>

        {/* Right — Live Preview */}
        <div style={{ background: "#EEF2FF", padding: "24px", overflowY: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: BLUE[600], letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14 }}>
            Live preview
          </div>

          <div style={{
            background: "#fff", borderRadius: 12, padding: "36px 40px",
            boxShadow: "0 2px 12px rgba(55,138,221,0.10)",
            fontFamily: "Arial, sans-serif", fontSize: 13, lineHeight: 1.8,
            color: "#1e1e2e", minHeight: 480,
          }}>
            {letterPreview ? (
              <>
                <div style={{ fontSize: 22, fontWeight: 700, color: BLUE[900], marginBottom: 4 }}>{values.name}</div>
                <div style={{ fontSize: 12, color: BLUE[600], marginBottom: 4 }}>
                  {[values.email, values.phone, values.location].filter(Boolean).join("  ·  ")}
                </div>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>{TODAY}</div>
                <div style={{ borderBottom: `3px solid ${BLUE[400]}`, marginBottom: 20 }} />
                <div style={{ whiteSpace: "pre-wrap", fontSize: 13, color: "#374151", lineHeight: 1.85 }}>
                  {letterPreview}
                </div>
              </>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 380, gap: 14, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: BLUE[50], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
                  📝
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: BLUE[800] }}>Your letter will appear here</div>
                <div style={{ fontSize: 13, color: "#9CA3AF", maxWidth: 260 }}>
                  Fill in all required fields on the left to see a live preview of your cover letter
                </div>
                <div style={{ marginTop: 8 }}>
                  {requiredFields.map((f) => (
                    <div key={f.key} style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      margin: "3px", padding: "4px 10px", borderRadius: 20,
                      fontSize: 11, fontWeight: 600,
                      background: values[f.key].trim() ? "#F0FDF4" : BLUE[50],
                      color: values[f.key].trim() ? "#16A34A" : BLUE[600],
                      border: `1px solid ${values[f.key].trim() ? "#BBF7D0" : BLUE[100]}`,
                    }}>
                      {values[f.key].trim() ? "✓" : "○"} {f.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

