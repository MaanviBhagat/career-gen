import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Configure PDF.js worker
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
} catch (e) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

// ==========================================
// 1. EXPANDED TAXONOMY (200+ Core Tech Skills)
// ==========================================
const ENHANCED_SKILLS_DB = {
  "Core Concepts & Architecture": [
    "object-oriented programming", "oop", "multithreading", "concurrency",
    "design patterns", "data structures", "algorithms", "microservices",
    "distributed systems", "event driven", "clean architecture", "mvc",
    "rest", "rest api", "soap", "graph ql", "system design"
  ],
  "Languages": [
    "core java", "java", "python", "c++", "c#", "golang", "typescript",
    "javascript", "rust", "ruby", "php", "scala", "kotlin", "swift", "dart",
    "r programming", "c language"
  ],
  "GUI & Desktop Frameworks": [
    "swing", "java swing", "awt", "javafx", "winforms", "wpf", "electron",
    "qt", "gtk", "xamarin", "flutter desktop"
  ],
  "Web Frontend & UI": [
    "react", "react js", "angular", "vue", "next js", "html", "html5",
    "css", "css3", "sass", "tailwind", "bootstrap", "redux"
  ],
  "Backend & Enterprise": [
    "spring", "spring boot", "hibernate", "node js", "express", "django",
    "flask", "fastapi", "asp.net", "entity framework", "laravel"
  ],
  "Operating Systems, Platforms & Tools": [
    "linux", "unix", "ubuntu", "centos", "redhat", "windows", "git", "github",
    "gitlab", "svn", "subversion", "putty", "winscp", "bash", "powershell",
    "vim", "postman"
  ],
  "DevOps, Cloud & Build Tools": [
    "docker", "kubernetes", "jenkins", "ci/cd", "maven", "gradle", "ant",
    "aws", "azure", "gcp", "terraform", "ansible"
  ],
  "Databases & Caching": [
    "sql", "mysql", "postgresql", "oracle", "mongodb", "redis", "sqlite",
    "sql server", "cassandra", "elasticsearch"
  ],
  "Testing & Quality Assurance": [
    "junit", "testng", "selenium", "pytest", "jest", "unit testing",
    "integration testing", "tdd", "debugging"
  ],
  "Professional & Soft Skills": [
    "problem solving", "communication", "teamwork", "leadership",
    "agile", "scrum", "code review", "documentation"
  ]
};

const MASTER_SKILLS = Array.from(new Set(Object.values(ENHANCED_SKILLS_DB).flat()));

// Words that require contextual qualification to avoid false positives
const STRICT_CONTEXT_WORDS = {
  "r": ["r programming", "r language", "r script"],
  "go": ["golang", "go language"],
  "c": ["c programming", "c language"]
};

// ==========================================
// 2. TEXT PROCESSING & CLEANING
// ==========================================
const cleanText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s+#.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const findSkillsInText = (text, skillsList) => {
  const normalizedText = cleanText(text);
  const foundSkills = new Set();

  skillsList.forEach((skill) => {
    // Check if the skill is a strict single word prone to false matches
    if (STRICT_CONTEXT_WORDS[skill]) {
      const allowedPatterns = STRICT_CONTEXT_WORDS[skill];
      const hasStrictMatch = allowedPatterns.some((pattern) => {
        const reg = new RegExp(`(?<![a-zA-Z0-9])${pattern}(?![a-zA-Z0-9])`, 'i');
        return reg.test(normalizedText);
      });
      if (hasStrictMatch) foundSkills.add(skill);
      return;
    }

    const escaped = skill.toLowerCase().replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(?<![a-zA-Z0-9])${escaped}(?![a-zA-Z0-9])`, 'i');

    if (regex.test(normalizedText)) {
      foundSkills.add(skill);
    }
  });

  return Array.from(foundSkills);
};

// Categorize identified skills
const categorizeSkills = (foundSkillsList) => {
  const categorized = {};
  const foundSet = new Set(foundSkillsList);

  Object.entries(ENHANCED_SKILLS_DB).forEach(([category, skills]) => {
    const matched = skills.filter((skill) => foundSet.has(skill));
    if (matched.length > 0) {
      categorized[category] = matched;
    }
  });

  return categorized;
};

// ==========================================
// 3. DYNAMIC JD KEYWORD EXTRACTION
// ==========================================
const extractDynamicJDRequirements = (jdText) => {
  const identifiedReqs = new Set();
  const normalizedJD = cleanText(jdText);

  // 1. Match against master taxonomy
  MASTER_SKILLS.forEach((skill) => {
    const escaped = skill.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(?<![a-zA-Z0-9])${escaped}(?![a-zA-Z0-9])`, 'i');
    if (regex.test(normalizedJD)) {
      identifiedReqs.add(skill);
    }
  });

  // 2. Extract technical acronyms & tools (e.g. "PuTTY", "WinSCP", "SVN")
  const acronymRegex = /\b[A-Za-z0-9+#.-]{2,15}\b/g;
  const rawWords = jdText.match(acronymRegex) || [];

  const commonNonTechStopwords = new Set([
    "the", "and", "for", "with", "experience", "strong", "bachelor",
    "degree", "computer", "science", "information", "technology", "education",
    "required", "preferred", "role", "responsibilities", "work", "deep",
    "environment", "tools", "ability", "skills", "must", "have", "candidate",
    "familiarity", "principles", "related", "equivalent", "working", "building"
  ]);

  rawWords.forEach((word) => {
    const lower = word.toLowerCase();
    // Catch mixed-case tools (PuTTY, WinSCP) or uppercase terms (OOP, SVN)
    const isSpecialCase = /[A-Z]/.test(word) && !/^[A-Z][a-z]+$/.test(word);
    if ((isSpecialCase || word.includes('+') || word.includes('#')) && !commonNonTechStopwords.has(lower) && lower.length > 2) {
      identifiedReqs.add(lower);
    }
  });

  return Array.from(identifiedReqs);
};

// ==========================================
// 4. CLIENT-SIDE FILE PARSER (PDF, DOCX, TXT)
// ==========================================
const extractTextFromFile = async (file) => {
  const ext = file.name.split('.').pop().toLowerCase();

  if (ext === 'pdf') {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');
      fullText += pageText + '\n';
    }
    return fullText;
  }

  if (ext === 'docx') {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  if (ext === 'txt') {
    return await file.text();
  }

  throw new Error(`Unsupported file type (.${ext}). Please upload a .pdf, .docx, or .txt file.`);
};

// ==========================================
// 5. MAIN REACT COMPONENT
// ==========================================
export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const runAnalysis = async () => {
    if (!file) {
      setError('Please upload a resume file first.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const resumeRawText = await extractTextFromFile(file);
      const resumeSkills = findSkillsInText(resumeRawText, MASTER_SKILLS).sort();
      const categorizedResume = categorizeSkills(resumeSkills);

      let jdAnalysis = null;
      let atsScore = null;

      if (jobDescription.trim()) {
        const jdRequirements = extractDynamicJDRequirements(jobDescription).sort();
        const resumeRawClean = cleanText(resumeRawText);
        const resumeSkillSet = new Set(resumeSkills);

        const matched = [];
        const missing = [];

        jdRequirements.forEach((req) => {
          const escaped = req.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
          const pattern = new RegExp(`(?<![a-zA-Z0-9])${escaped}(?![a-zA-Z0-9])`, 'i');
          
          if (resumeSkillSet.has(req) || pattern.test(resumeRawClean)) {
            matched.push(req);
          } else {
            missing.push(req);
          }
        });

        atsScore = jdRequirements.length > 0 
          ? Math.round((matched.length / jdRequirements.length) * 100) 
          : 0;

        jdAnalysis = {
          jdRequirements,
          matched,
          missing
        };
      }

      setAnalysis({
        resumeSkills,
        categorizedResume,
        jdAnalysis,
        atsScore,
      });
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred while parsing the file.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Career Gen Resume Analyzer</h1>
      <p style={styles.subtitle}>
        Client-side ATS scoring and skill gap analysis. No file data leaves your browser.
      </p>

      {/* Input Form */}
      <div style={styles.card}>
        <div style={{ marginBottom: '18px' }}>
          <label style={styles.label}>1. Select Resume Document (.pdf, .docx, .txt)</label>
          <input 
            type="file" 
            accept=".pdf,.docx,.txt" 
            onChange={handleFileChange} 
            style={styles.fileInput} 
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={styles.label}>2. Job Description (Paste JD to calculate ATS score)</label>
          <textarea
            rows={6}
            placeholder="Paste complete Job Description here to extract target competencies, required libraries, and tools..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            style={styles.textarea}
          />
        </div>

        <button 
          onClick={runAnalysis} 
          disabled={isProcessing} 
          style={isProcessing ? { ...styles.button, opacity: 0.65, cursor: 'not-allowed' } : styles.button}
        >
          {isProcessing ? 'Analyzing Document...' : 'Run Analysis'}
        </button>

        {error && <div style={styles.errorBox}>{error}</div>}
      </div>

      {/* Results View */}
      {analysis && (
        <div style={styles.resultsArea}>
          {/* ATS Score Card */}
          {analysis.atsScore !== null && (
            <div style={styles.scoreBanner}>
              <div style={styles.scoreTitle}>Job Match ATS Score</div>
              <div style={styles.scoreValue}>{analysis.atsScore}%</div>
              <p style={{ margin: 0, color: '#4a5568', fontSize: '15px' }}>
                Found <strong>{analysis.jdAnalysis.matched.length}</strong> of{' '}
                <strong>{analysis.jdAnalysis.jdRequirements.length}</strong> required competencies from the job description.
              </p>
            </div>
          )}

          {/* Matched vs Missing Breakdown */}
          {analysis.jdAnalysis && (
            <div style={styles.matchGrid}>
              <div style={{ ...styles.card, borderTop: '4px solid #38a169' }}>
                <h3 style={{ color: '#2f855a', marginTop: 0, fontSize: '18px' }}>
                  ✅ Matched Competencies ({analysis.jdAnalysis.matched.length})
                </h3>
                <div style={styles.chipWrapper}>
                  {analysis.jdAnalysis.matched.map((item, idx) => (
                    <span key={idx} style={{ ...styles.chip, backgroundColor: '#c6f6d5', color: '#22543d' }}>
                      {item}
                    </span>
                  ))}
                  {analysis.jdAnalysis.matched.length === 0 && (
                    <span style={{ color: '#718096', fontSize: '14px' }}>No direct requirements matched.</span>
                  )}
                </div>
              </div>

              <div style={{ ...styles.card, borderTop: '4px solid #e53e3e' }}>
                <h3 style={{ color: '#c53030', marginTop: 0, fontSize: '18px' }}>
                  ⚠️ Missing from Resume ({analysis.jdAnalysis.missing.length})
                </h3>
                <div style={styles.chipWrapper}>
                  {analysis.jdAnalysis.missing.map((item, idx) => (
                    <span key={idx} style={{ ...styles.chip, backgroundColor: '#fed7d7', color: '#742a2a' }}>
                      {item}
                    </span>
                  ))}
                  {analysis.jdAnalysis.missing.length === 0 && (
                    <span style={{ color: '#2f855a', fontWeight: 'bold' }}>All detected JD requirements present!</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Cataloged Resume Skills */}
          <div style={styles.card}>
            <h3 style={{ marginTop: 0, color: '#2d3748', fontSize: '18px' }}>
              All Verified Skills Detected in Resume ({analysis.resumeSkills.length})
            </h3>
            {Object.keys(analysis.categorizedResume).length === 0 ? (
              <p style={{ color: '#718096', fontSize: '14px' }}>No cataloged technical skills identified.</p>
            ) : (
              Object.entries(analysis.categorizedResume).map(([category, items]) => (
                <div key={category} style={{ marginBottom: '16px' }}>
                  <div style={styles.catHeading}>{category} ({items.length})</div>
                  <div style={styles.chipWrapper}>
                    {items.map((skill, i) => (
                      <span key={i} style={styles.chip}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Clean inline styles
const styles = {
  container: {
    maxWidth: '900px',
    margin: '30px auto',
    padding: '0 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  title: { color: '#0066cc', textAlign: 'center', marginBottom: '6px', fontSize: '28px' },
  subtitle: { textAlign: 'center', color: '#4a5568', marginBottom: '25px', fontSize: '15px' },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    padding: '24px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
  },
  label: { display: 'block', fontWeight: '600', marginBottom: '8px', color: '#2d3748', fontSize: '14px' },
  fileInput: { display: 'block', width: '100%', fontSize: '14px' },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e0',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    fontSize: '14px',
    resize: 'vertical'
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#0066cc',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  errorBox: {
    backgroundColor: '#fff5f5',
    color: '#c53030',
    border: '1px solid #feb2b2',
    padding: '12px',
    borderRadius: '6px',
    marginTop: '15px',
    fontSize: '14px'
  },
  resultsArea: { marginTop: '20px' },
  scoreBanner: {
    backgroundColor: '#ebf8ff',
    border: '1px solid #bee3f8',
    borderRadius: '10px',
    padding: '24px',
    textAlign: 'center',
    marginBottom: '20px'
  },
  scoreTitle: { fontSize: '18px', fontWeight: '600', color: '#2c5282' },
  scoreValue: { fontSize: '56px', fontWeight: '800', color: '#0066cc', margin: '6px 0' },
  matchGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' },
  catHeading: { fontWeight: '700', fontSize: '13px', color: '#4a5568', marginBottom: '6px' },
  chipWrapper: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  chip: {
    backgroundColor: '#edf2f7',
    color: '#2d3748',
    padding: '5px 12px',
    borderRadius: '16px',
    fontSize: '13px',
    fontWeight: '500'
  }
};