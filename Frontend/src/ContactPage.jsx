import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";




const DEVELOPERS = [
  {
    name: "Maanvi Bhagat",
    email: "maanvi.bhagat18557@sakec.ac.in",
    role: "Project Lead",
    initial: "MB",
    color: "#4F46E5",
    light: "#EEF2FF",
    gradient: "linear-gradient(135deg,#4F46E5,#6366F1)",
  },
  {
    name: "Meet Vaghasiya",
    email: "meet.vaghasiya18529@sakec.ac.in",
    role: "Backend Developer",
    initial: "MV",
    color: "#0891B2",
    light: "#E0F2FE",
    gradient: "linear-gradient(135deg,#0891B2,#06B6D4)",
  },
  {
    name: "Afiya Agwan",
    email: "afiya.agwan18531@sakec.ac.in",
    role: "UI/UX Designer",
    initial: "AA",
    color: "#7C3AED",
    light: "#F5F3FF",
    gradient: "linear-gradient(135deg,#7C3AED,#A78BFA)",
  },
  {
    name: "Khushi Vaish",
    email: "khushi.17457@sakec.ac.in",
    role: "UI/UX Designer",
    initial: "KV",
    color: "#D97706",
    light: "#FFFBEB",
    gradient: "linear-gradient(135deg,#D97706,#F59E0B)",
  },
];


const EMAILJS_SERVICE_ID  = "service_gtztrdg";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_53wimkb";
const EMAILJS_AUTO_REPLY_TEMPLATE_ID = "template_00odm3l";


const EMAILJS_PUBLIC_KEY  = "bMbq5IwHVnQV-pICB";


export default function ContactPage() {
  const formRef = useRef();


  // ✅ FIX: State keys now match the `name` attributes on each input
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });


  const [status, setStatus]         = useState("idle"); // idle | sending | success | error
  const [focused, setFocused]       = useState(null);
  const [hoveredDev, setHoveredDev] = useState(null);


  // ✅ FIX: reads e.target.name ("from_name", "from_email", etc.) and writes to matching key
  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));


const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("sending");


  try {
    await emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_ADMIN_TEMPLATE_ID,
      formRef.current,
      EMAILJS_PUBLIC_KEY
    );


    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_AUTO_REPLY_TEMPLATE_ID,
      {
        from_name: form.from_name,
        from_email: form.from_email,
        subject: form.subject,
        message: form.message,
        to_email: form.from_email,
      },
      EMAILJS_PUBLIC_KEY
    );


    setStatus("success");
    setForm({ from_name: "", from_email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);


  } catch (err) {
    console.error("EmailJS error:", err);
    setStatus("error");
  }
};




  /* ── Dynamic input styles ── */
  // ✅ FIX: field keys updated to match new state keys
  const inp = (field) => ({
    width: "100%", boxSizing: "border-box",
    padding: "11px 14px",
    border: `1.5px solid ${focused === field ? "#4F46E5" : "#DDE3F0"}`,
    borderRadius: 10, fontSize: 13,
    fontFamily: "'Montserrat', sans-serif",
    color: "#1e1e2e",
    background: focused === field ? "#F8F9FF" : "#FAFBFF",
    outline: "none",
    transition: "border-color .2s, background .2s, box-shadow .2s",
    boxShadow: focused === field ? "0 0 0 3px rgba(79,70,229,0.10)" : "none",
  });


  return (
    <div style={{ fontFamily: "'Montserrat',sans-serif", background: "#F8F9FF", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }


        .dev-card { transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease; }
        .dev-card:hover { transform: translateY(-6px); }


        .submit-btn {
          background: linear-gradient(135deg, #F59E0B, #F97316);
          color: #fff; border: none; border-radius: 30px;
          padding: 13px 0; width: 100%;
          font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 14px;
          letter-spacing: 0.4px; cursor: pointer;
          box-shadow: 0 4px 18px rgba(245,158,11,.35);
          transition: transform .18s, box-shadow .18s, opacity .18s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,158,11,.45); }
        .submit-btn:disabled { opacity: .6; cursor: not-allowed; transform: none; }


        .email-link { text-decoration: none; font-weight: 600; font-size: 11.5px; word-break: break-all; transition: opacity .15s; }
        .email-link:hover { opacity: .75; text-decoration: underline; }


        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { width: 16px; height: 16px; border: 2.5px solid rgba(255,255,255,.4); border-top-color: #fff; border-radius: 50%; animation: spin .75s linear infinite; flex-shrink: 0; }


        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        .f1 { animation: fadeUp .5s ease both; }
        .f2 { animation: fadeUp .5s .12s ease both; }
        .f3 { animation: fadeUp .5s .24s ease both; }
      `}</style>


      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <div style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 50%, #FFF7ED 100%)",
        borderBottom: "1px solid #DDE3F0",
        padding: "56px 48px 100px",
      }}>
        <div style={{ position:"absolute", top:-50, right:260, width:160, height:160, borderRadius:"50%", background:"rgba(79,70,229,.07)" }} />
        <div style={{ position:"absolute", top:20, right:80, width:80, height:80, borderRadius:"50%", background:"rgba(245,158,11,.10)" }} />
        <div style={{ position:"absolute", bottom:-40, left:"38%", width:120, height:120, borderRadius:"50%", background:"rgba(79,70,229,.06)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:60,
          background:"radial-gradient(ellipse 30% 100% at 10% 200%, #fff 0%,transparent 70%), radial-gradient(ellipse 28% 90% at 35% 190%, #f0f4ff 0%,transparent 70%), radial-gradient(ellipse 32% 100% at 62% 200%, #fff 0%,transparent 70%), radial-gradient(ellipse 28% 90% at 88% 200%, #f0f4ff 0%,transparent 70%)",
        }} />


        <div style={{ position:"relative", zIndex:1, maxWidth:700, margin:"0 auto", textAlign:"center" }} className="f1">
          <div style={{ display:"inline-block", background:"linear-gradient(135deg,#4F46E5,#6366F1)", color:"#fff", borderRadius:30, padding:"5px 20px", fontSize:10, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginBottom:18 }}>
            Get in touch
          </div>
          <h1 style={{ fontFamily:"'Crimson Pro',serif", fontSize:56, fontWeight:700, color:"#1e1e2e", lineHeight:1.08, marginBottom:14 }}>
            Contact <span style={{ color:"#4F46E5" }}>Career Gen</span>
          </h1>
          <p style={{ fontFamily:"'Crimson Pro',serif", fontStyle:"italic", fontSize:19, color:"#6B7280", lineHeight:1.6 }}>
            Share your feedback, ideas, or suggestions — we read every message.
          </p>
        </div>
      </div>


      {/* ══════════════════════════ BODY ══════════════════════════ */}
      <div style={{ maxWidth:1080, margin:"0 auto", padding:"52px 32px 80px" }}>


        {/* ── Row 1: form + sidebar ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:36, marginBottom:72, alignItems:"start" }} className="f2">


          {/* ═══ FEEDBACK FORM ═══ */}
          <div style={{ background:"#fff", borderRadius:20, padding:"36px 32px 30px", border:"1px solid #E8EAFF", boxShadow:"0 6px 32px rgba(79,70,229,.09)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:28 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:"linear-gradient(135deg,#4F46E5,#6366F1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>✉️</div>
              <div>
                <div style={{ fontSize:17, fontWeight:800, color:"#1e1e2e" }}>Send us a message</div>
                <div style={{ fontSize:12, color:"#9CA3AF", marginTop:1 }}>Feedback · Suggestions · Bug reports</div>
              </div>
            </div>


            <form ref={formRef} onSubmit={handleSubmit}>
              <input type="hidden" name="to_email" value="maanvi.bhagat18557@sakec.ac.in" />


              {/* name + email */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                <div>
                  <label style={{ display:"block", fontSize:10, fontWeight:700, color:"#374151", letterSpacing:".6px", textTransform:"uppercase", marginBottom:5 }}>
                    Your name <span style={{color:"#4F46E5"}}>*</span>
                  </label>
                  {/* ✅ value now reads from form.from_name */}
                  <input
                    name="from_name"
                    value={form.from_name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    required
                    style={inp("from_name")}
                    onFocus={() => setFocused("from_name")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div>
                  <label style={{ display:"block", fontSize:10, fontWeight:700, color:"#374151", letterSpacing:".6px", textTransform:"uppercase", marginBottom:5 }}>
                    Your email <span style={{color:"#4F46E5"}}>*</span>
                  </label>
                  {/* ✅ value now reads from form.from_email */}
                  <input
                    name="from_email"
                    type="email"
                    value={form.from_email}
                    onChange={handleChange}
                    placeholder="e.g. rahul@gmail.com"
                    required
                    style={inp("from_email")}
                    onFocus={() => setFocused("from_email")}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>


              {/* subject */}
              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block", fontSize:10, fontWeight:700, color:"#374151", letterSpacing:".6px", textTransform:"uppercase", marginBottom:5 }}>Subject</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="e.g. Suggestion for Resume Analyzer"
                  style={inp("subject")}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                />
              </div>


              {/* message */}
              <div style={{ marginBottom:22 }}>
                <label style={{ display:"block", fontSize:10, fontWeight:700, color:"#374151", letterSpacing:".6px", textTransform:"uppercase", marginBottom:5 }}>
                  Message <span style={{color:"#4F46E5"}}>*</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Share your thoughts, feedback, or ideas for making Career Gen better…"
                  style={{ ...inp("message"), resize:"vertical", lineHeight:1.65 }}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
              </div>


              {/* status banners */}
              {status === "success" && (
                <div style={{ background:"#F0FDF4", border:"1px solid #BBF7D0", borderRadius:10, padding:"11px 14px", marginBottom:14, fontSize:13, color:"#15803D", fontWeight:600 }}>
                  ✅ Message sent! We'll get back to you within 24–48 hours.
                </div>
              )}
              {status === "error" && (
                <div style={{ background:"#FFF1F2", border:"1px solid #FECDD3", borderRadius:10, padding:"11px 14px", marginBottom:14, fontSize:13, color:"#BE123C", fontWeight:600 }}>
                  ❌ Delivery failed. Please email us directly at maanvi.bhagat18557@sakec.ac.in
                </div>
              )}


              <button type="submit" className="submit-btn" disabled={status === "sending"}>
                {status === "sending"
                  ? <><span className="spinner" /> Sending…</>
                  : "✦ Send Feedback"}
              </button>


              <div style={{ marginTop:12, fontSize:11, color:"#9CA3AF", textAlign:"center" }}>
                Delivered to <span style={{ color:"#4F46E5", fontWeight:600 }}>maanvi.bhagat18557@sakec.ac.in</span> via EmailJS
              </div>
            </form>
          </div>


          {/* ═══ RIGHT SIDEBAR ═══ */}
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>


            {/* about card */}
            <div style={{ background:"linear-gradient(135deg,#312E81,#4F46E5)", borderRadius:20, padding:"28px 22px", color:"#fff", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-30, right:-20, width:90, height:90, borderRadius:"50%", background:"rgba(255,255,255,.07)" }} />
              <div style={{ position:"absolute", bottom:-15, left:-5, width:60, height:60, borderRadius:"50%", background:"rgba(245,158,11,.15)" }} />
              <div style={{ fontSize:28, marginBottom:10 }}>🎓</div>
              <div style={{ fontSize:15, fontWeight:800, marginBottom:8, position:"relative" }}>About Career Gen</div>
              <div style={{ fontSize:12, lineHeight:1.75, color:"rgba(255,255,255,.82)", position:"relative" }}>
                An AI-powered platform built by <strong>BE students of SAKEC</strong>, Mumbai — helping every student find the right career with data-driven tools.
              </div>
              <div style={{ marginTop:16, display:"flex", flexWrap:"wrap", gap:7, position:"relative" }}>
                {["Resume Builder","AI Analyzer","Aptitude Test","Career Match"].map(t => (
                  <span key={t} style={{ background:"rgba(255,255,255,.14)", borderRadius:20, padding:"4px 11px", fontSize:10, fontWeight:700 }}>{t}</span>
                ))}
              </div>
            </div>


            {/* contact info */}
            <div style={{ background:"#fff", borderRadius:20, padding:"22px 20px", border:"1px solid #E8EAFF", boxShadow:"0 2px 12px rgba(79,70,229,.06)" }}>
              <div style={{ fontSize:13, fontWeight:700, color:"#1e1e2e", marginBottom:14 }}>📬 Direct contact</div>
              {[
                { icon:"📧", label:"Email us at", val:"maanvi.bhagat18557@sakec.ac.in", link:true },
                { icon:"🏫", label:"Institution",  val:"SAKEC, Mumbai" },
                { icon:"⏰", label:"Response time", val:"Within 24–48 hours" },
              ].map(item => (
                <div key={item.label} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:13 }}>
                  <span style={{ fontSize:15, marginTop:1, flexShrink:0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize:9, fontWeight:700, color:"#9CA3AF", textTransform:"uppercase", letterSpacing:".6px", marginBottom:2 }}>{item.label}</div>
                    {item.link
                      ? <a href="mailto:maanvi.bhagat18557@sakec.ac.in" className="email-link" style={{ color:"#4F46E5" }}>{item.val}</a>
                      : <div style={{ fontSize:12, color:"#374151", fontWeight:500 }}>{item.val}</div>}
                  </div>
                </div>
              ))}
            </div>


            {/* what to send */}
            <div style={{ background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:16, padding:"18px 20px" }}>
              <div style={{ fontSize:13, fontWeight:700, color:"#92400E", marginBottom:10 }}>💡 What to send us</div>
              {["Bug reports & broken features","New feature requests","Career resource suggestions","General feedback & praise","Partnership / collaboration ideas"].map((item, i) => (
                <div key={i} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8, fontSize:12, color:"#78350F" }}>
                  <span style={{ color:"#F59E0B", fontWeight:700, flexShrink:0 }}>→</span>{item}
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* ══════════════════ DEVELOPER CARDS ══════════════════ */}
        <div className="f3">
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ display:"inline-block", background:"#EEF2FF", color:"#4F46E5", borderRadius:30, padding:"5px 20px", fontSize:10, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginBottom:14 }}>
              Meet the team
            </div>
            <h2 style={{ fontFamily:"'Crimson Pro',serif", fontSize:40, fontWeight:700, color:"#1e1e2e", marginBottom:8 }}>
              The developers behind <span style={{ color:"#4F46E5" }}>Career Gen</span>
            </h2>
            <p style={{ fontSize:13, color:"#9CA3AF", maxWidth:400, margin:"0 auto" }}>
              Four students from SAKEC building tools to help their peers navigate careers smarter.
            </p>
          </div>


          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18 }}>
            {DEVELOPERS.map((dev, i) => (
              <div key={dev.email} className="dev-card"
                style={{
                  background:"#fff", borderRadius:18, overflow:"hidden",
                  border:`1.5px solid ${hoveredDev === i ? dev.color + "55" : "#E8EAFF"}`,
                  boxShadow: hoveredDev === i
                    ? `0 14px 44px ${dev.color}22, 0 2px 8px rgba(0,0,0,.05)`
                    : "0 2px 12px rgba(79,70,229,.07)",
                }}
                onMouseEnter={() => setHoveredDev(i)}
                onMouseLeave={() => setHoveredDev(null)}>


                <div style={{ height:5, background:dev.gradient }} />


                <div style={{ background:`linear-gradient(180deg, ${dev.light} 0%, #fff 100%)`, padding:"22px 20px 16px", textAlign:"center" }}>
                  <div style={{
                    width:64, height:64, borderRadius:"50%",
                    background:dev.gradient,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:16, fontWeight:800, color:"#fff",
                    margin:"0 auto 12px",
                    boxShadow:`0 4px 16px ${dev.color}44`,
                  }}>
                    {dev.initial}
                  </div>
                  <div style={{ fontSize:15, fontWeight:800, color:"#1e1e2e", lineHeight:1.25, marginBottom:6 }}>{dev.name}</div>
                  <span style={{ display:"inline-block", background:dev.light, color:dev.color, borderRadius:20, padding:"3px 12px", fontSize:10, fontWeight:700 }}>
                    {dev.role}
                  </span>
                </div>


                <div style={{ padding:"0 18px 18px" }}>
                  <div style={{ height:1, background:"#F1F5F9", marginBottom:14 }} />
                  <div style={{ display:"flex", gap:7, alignItems:"flex-start" }}>
                    <span style={{ fontSize:13, flexShrink:0, marginTop:1 }}>✉️</span>
                    <a href={`mailto:${dev.email}`} className="email-link" style={{ color:dev.color }}>
                      {dev.email}
                    </a>
                  </div>
                  <div style={{ display:"flex", gap:7, alignItems:"center", marginTop:10, fontSize:11, color:"#9CA3AF", fontWeight:500 }}>
                    <span>🏫</span> SAKEC, Mumbai
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div style={{
            marginTop:40, textAlign:"center",
            padding:"18px 28px",
            background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)",
            borderRadius:14, border:"1px solid #C7D2FE",
          }}>
            <span style={{ fontSize:13, color:"#4F46E5", fontWeight:600 }}>
              🎓 Career Gen is a student project by <strong>BE students of SAKEC (2026)</strong> — built with ❤️ to help peers discover their perfect career path.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
