import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Study Abroad",
      path: "/StudyAbroadBlogPage",
    },
    {
      name: "AI Study Abroad Advisor",
      path: "/AIStudyAbroadAdvisor",
    },
    {
      name: "Abroad Part-Time",
      path: "/AbroadPartTime",
    },
    {
      name: "Aptitude Blog",
      path: "/AptitudeBlogPage",
    },
    {
      name: "Country Blog",
      path: "/CountryBlogPage",
    },
    {
      name: "Exams Docs Visa",
      path: "/ExamsDocsVisaBlog",
    },
    {
      name: "Entrepreneurship",
      path: "/EntrepreneurshipMagazine",
    },
    {
      name: "College Test",
      path: "/CollegeTest",
    },
    {
      name: "Intelligence Tests",
      path: "/IntelligenceTests",
    },
    {
      name: "Skill Development",
      path: "/SkillDevelopmentHub",
    },
    {
      name: "Community",
      path: "/CommunityNetworking",
    },
    
    {
      name: "AI Interview Prep Resume Guide",
      path: "/AIInterviewPrepResumeGuide",
    },
    {
      name: "Resume Analyzer",
      path: "/ResumeAnalyzer",
    },
    {
      name: "Cover Letter Generator",
      path: "/CoverLetterGenerator",
    },
    {
      name: "Resume Designer",
      path: "/ResumeDesigner",
    }
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Career Gen</h2>

      <ul className="sidebar-links">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={
                location.pathname === item.path
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;