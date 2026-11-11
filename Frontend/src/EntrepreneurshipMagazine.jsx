import { useState } from "react";

export default function EntrepreneurshipMagazine() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const tags = ["All", "Startup Basics", "Freelancing", "Legal", "Funding"];

  const sampleArticles = [
    {
      id: 1,
      title: "Start Smart: Validating Your Business Idea in India",
      excerpt:
        "Quick ways to validate demand, test a minimum viable product (MVP), and gather early paying customers without heavy upfront costs.",
      author: "A. Sharma",
      tag: "Startup Basics",
      time: "8 min read",
      link: "https://www.startupindia.gov.in/content/sih/en/startup-scheme.html",
    },
    {
      id: 2,
      title: "Freelancing 101: Getting Your First 10 Clients",
      excerpt:
        "How to craft proposals, price your services for the Indian market and leverage platforms + direct outreach for steady income.",
      author: "R. Patel",
      tag: "Freelancing",
      time: "6 min read",
      link: "https://www.upwork.com/resources/freelancing-tips-beginners",
    },
    {
      id: 3,
      title: "Legal & Taxes: Simple Steps for Small Indian Businesses",
      excerpt:
        "Overview of basic registrations (MSME, GST), invoicing best practices, and tips to set up for tax season.",
      author: "N. Kaur",
      tag: "Legal",
      time: "7 min read",
      link: "https://www.gst.gov.in/",
    },
    {
      id: 4,
      title: "Funding Options: Bootstrapping, Grants, and Early Angels",
      excerpt:
        "Practical guide on when to bootstrap vs. seek capital and where to look for grants & early-stage investors.",
      author: "S. Rao",
      tag: "Funding",
      time: "9 min read",
      link: "https://www.investindia.gov.in/team-india-blogs/funding-support-startups",
    },
  ];

  const ResourcesList = [
    {
      title: "Startup India",
      href: "https://www.startupindia.gov.in/",
    },
    {
      title: "MSME Registration Guide",
      href: "https://udyamregistration.gov.in/",
    },
    {
      title: "GST Basics for Freelancers",
      href: "https://cleartax.in/s/freelancer-gst-registration",
    },
    {
      title: "Freelance Platforms",
      href: "https://www.freelancer.in/",
    },
    {
      title: "Startup Incubators",
      href: "https://www.investindia.gov.in/team-india-blogs/startup-incubators-india",
    },
  ];

  const filtered = sampleArticles.filter((a) => {
    const byTag = filter === "All" ? true : a.tag === filter;

    const bySearch =
      search.trim() === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());

    return byTag && bySearch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:'Poppins',sans-serif;
        }

        body{
          background:#f4f8ff;
          overflow-x:hidden;
        }

        .mag-bg{
          min-height:100vh;

          margin-left:280px;
          width:calc(100% - 280px);

          padding:120px 40px 40px;

          background:linear-gradient(
            180deg,
            #f5ffff 0%,
            #dff8fb 100%
          );

          display:flex;
          justify-content:center;
          align-items:flex-start;
        }

        .mag-wrap{
          width:100%;
          max-width:1200px;

          display:grid;
          grid-template-columns:2fr 1fr;
          gap:24px;

          align-items:start;
        }

        .hero{
          grid-column:1 / span 2;

          background:linear-gradient(
            135deg,
            rgba(0,188,212,0.12),
            rgba(0,188,212,0.04)
          );

          border-radius:24px;
          padding:45px;

          box-shadow:0 10px 30px rgba(0,188,212,0.08);
        }

        .hero-kicker{
          display:inline-block;

          background:rgba(0,188,212,0.12);

          color:#007c91;

          padding:8px 16px;

          border-radius:999px;

          font-size:0.9rem;
          font-weight:600;

          margin-bottom:18px;
        }

        .hero-title{
          font-size:2.8rem;
          line-height:1.3;
          color:#004d4f;

          margin-bottom:18px;
        }

        .hero-sub{
          color:#07585b;
          line-height:1.8;

          font-size:1rem;

          margin-bottom:24px;
        }

        .cta-row{
          display:flex;
          gap:16px;
          flex-wrap:wrap;
        }

        .cta-btn{
          border:none;
          outline:none;

          padding:14px 22px;

          border-radius:14px;

          font-weight:600;
          cursor:pointer;

          transition:0.3s ease;
        }

        .cta-btn:hover{
          transform:translateY(-3px);
        }

        .primary-btn{
          background:#00bcd4;
          color:white;

          box-shadow:0 8px 18px rgba(0,188,212,0.2);
        }

        .ghost-btn{
          background:white;
          color:#007c91;

          border:2px solid rgba(0,188,212,0.2);
        }

        .content{
          display:flex;
          flex-direction:column;
          gap:20px;
        }

        .search-input{
          width:100%;

          padding:16px 18px;

          border-radius:14px;

          border:1px solid rgba(0,0,0,0.08);

          outline:none;

          font-size:1rem;

          background:white;
        }

        .chips{
          display:flex;
          flex-wrap:wrap;
          gap:12px;
        }

        .chip{
          border:none;
          cursor:pointer;

          padding:10px 18px;

          border-radius:999px;

          background:white;

          color:#007c91;

          font-weight:600;

          transition:0.3s;
        }

        .chip.active{
          background:#00bcd4;
          color:white;
        }

        .article-grid{
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:20px;
        }

        .article-grid a{
          text-decoration:none;
        }

        .article-card{
          background:white;

          border-radius:18px;

          padding:22px;

          min-height:240px;

          display:flex;
          flex-direction:column;
          justify-content:space-between;

          transition:0.3s ease;

          box-shadow:0 8px 20px rgba(0,0,0,0.05);
        }

        .article-card:hover{
          transform:translateY(-5px);

          box-shadow:0 14px 28px rgba(0,188,212,0.15);
        }

        .article-tag{
          display:inline-block;

          background:#e0f7fa;
          color:#007c91;

          padding:6px 12px;

          border-radius:999px;

          font-size:0.8rem;
          font-weight:600;
        }

        .article-title{
          margin-top:16px;
          margin-bottom:12px;

          color:#004643;

          font-size:1.2rem;
          line-height:1.5;
        }

        .article-excerpt{
          color:#555;
          line-height:1.7;
          font-size:0.95rem;
        }

        .article-meta{
          margin-top:18px;

          display:flex;
          justify-content:space-between;

          font-size:0.85rem;

          color:#777;
        }

        .right-sidebar{
          position:sticky;
          top:120px;

          height:fit-content;
        }

        .side-card{
          background:white;

          padding:24px;

          border-radius:18px;

          box-shadow:0 8px 20px rgba(0,0,0,0.05);
        }

        .side-card h4{
          color:#006064;

          margin-bottom:18px;

          font-size:1.2rem;
        }

        .resource-list{
          list-style:none;

          display:flex;
          flex-direction:column;
          gap:14px;
        }

        .resource-list a{
          text-decoration:none;

          color:#007c91;

          font-weight:600;

          padding:10px 12px;

          border-radius:12px;

          transition:0.3s ease;

          display:block;
        }

        .resource-list a:hover{
          background:rgba(0,188,212,0.08);
        }

        @media(max-width:992px){

          .mag-bg{
            margin-left:0;

            width:100%;

            padding:120px 20px 30px;

            display:block;
          }

          .mag-wrap{
            grid-template-columns:1fr;
          }

          .hero{
            grid-column:auto;

            padding:30px;
          }

          .article-grid{
            grid-template-columns:1fr;
          }

          .right-sidebar{
            position:relative;
            top:0;
          }

          .hero-title{
            font-size:2rem;
          }
        }

        @media(max-width:600px){

          .hero-title{
            font-size:1.6rem;
          }

          .hero-sub{
            font-size:0.95rem;
          }

          .cta-row{
            flex-direction:column;
          }

          .cta-btn{
            width:100%;
          }
        }
      `}</style>

      <div className="mag-bg">
        <div className="mag-wrap">

          <section className="hero">
            <span className="hero-kicker">
              Entrepreneurship • Freelancing
            </span>

            <h1 className="hero-title">
              Launch, Scale & Freelance — A Practical Guide for India
            </h1>

            <p className="hero-sub">
              Actionable toolkits, legal basics, funding options, and
              real-world freelancing playbooks designed for students and
              early-stage founders in India.
            </p>

            <div className="cta-row">
              <a
                href="https://www.startupindia.gov.in/"
                target="_blank"
                rel="noreferrer"
              >
                <button className="cta-btn primary-btn">
                  Get Mentorship
                </button>
              </a>

              <a
                href="https://www.startupindia.gov.in/"
                target="_blank"
                rel="noreferrer"
              >
                <button className="cta-btn ghost-btn">
                  Download Checklist
                </button>
              </a>
            </div>
          </section>

          <main className="content">

            <input
              className="search-input"
              placeholder="Search guides, templates, laws..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="chips">
              {tags.map((t) => (
                <button
                  key={t}
                  className={`chip ${filter === t ? "active" : ""}`}
                  onClick={() => setFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="article-grid">
              {filtered.map((a) => (
                <a
                  key={a.id}
                  href={a.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="article-card">

                    <div>
                      <span className="article-tag">
                        {a.tag}
                      </span>

                      <h3 className="article-title">
                        {a.title}
                      </h3>

                      <p className="article-excerpt">
                        {a.excerpt}
                      </p>
                    </div>

                    <div className="article-meta">
                      <span>{a.author}</span>
                      <span>{a.time}</span>
                    </div>

                  </div>
                </a>
              ))}
            </div>

          </main>

          <aside className="right-sidebar">

            <div className="side-card">

              <h4>Official Resources</h4>

              <ul className="resource-list">
                {ResourcesList.map((r, i) => (
                  <li key={i}>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {r.title}
                    </a>
                  </li>
                ))}
              </ul>

            </div>

          </aside>

        </div>
      </div>
    </>
  );
}