
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

// Pages
import Home from './HomePage';
import AIpathway from './AIpathway';
import Careers from './Careers';
import MagazinePage from './MagazinePage';
import CareerAptitudeTest from './CareerAptitudeTest';
import Docgame1 from './Docgame1';
import Lawgame1 from './Lawgame1';
import Engineergame1 from './Engineergame1';
import Cagame1 from './Cagame1';
import Csgame1 from './Csgame1';
import InteriorDesigngame1 from './InteriorDesigngame1';
import Archgame1 from './Archgame1';
import Writergame1 from './Writergame1';
import StudyAbroadBlogPage from './StudyAbroadBlogPage';
import AptitudeBlogPage from './AptitudeBlogPage';
import CountryBlogPage from './countryblogpage';
import ExamsDocsVisaBlog from './ExamsDocsVisaBlog';
import EntrepreneurshipMagazine from './EntrepreneurshipMagazine';
import CollegeTest from './collegetest';
import IntelligenceTests from './IntelligenceTests';
import SkillDevelopmentHub from './SkillDevelopmentHub';
import CommunityNetworking from './CommunityNetworking';
import ChatbotPage from './ChatbotPage';
import AIStudyAbroadAdvisor from './AIStudyAbroadAdvisor';
import AIInterviewPrepResumeGuide from './AIInterviewPrepResumeGuide';
import ResumeAnalyzer from './Resumeanalyzer';
import CoverLetterGenerator from './Coverlettergenerator';
import ResumeDesigner from './ResumeDesigner';
import ContactPage from './ContactPage';
import AbroadPartTime from './AbroadPartTime';

function Layout() {
  const showSidebar = true;

  return (
    <>
      <Navbar />

      <div style={{ display: 'flex' }}>
        {showSidebar && <Sidebar />}

        <div
          style={{
            marginLeft: showSidebar ? '260px' : '0px',
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '80px',
            transition: 'margin-left 0.2s ease',
          }}
        >
          <div style={{ flex: 1, padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai-pathway" element={<AIpathway />} />
              <Route path="/Careers" element={<Careers />} />
              <Route path="/CareerAptitudeTest" element={<CareerAptitudeTest />} />
              <Route path="/MagazinePage" element={<MagazinePage />} />
              <Route path="/Docgame1" element={<Docgame1 />} />
              <Route path="/Lawgame1" element={<Lawgame1 />} />
              <Route path="/Engineergame1" element={<Engineergame1 />} />
              <Route path="/Cagame1" element={<Cagame1 />} />
              <Route path="/Csgame1" element={<Csgame1 />} />
              <Route path="/InteriorDesigngame1" element={<InteriorDesigngame1 />} />
              <Route path="/Archgame1" element={<Archgame1 />} />
              <Route path="/Writergame1" element={<Writergame1 />} />
              <Route path="/StudyAbroadBlogPage" element={<StudyAbroadBlogPage />} />
              <Route path="/AptitudeBlogPage" element={<AptitudeBlogPage />} />
              <Route path="/CountryBlogPage" element={<CountryBlogPage />} />
              <Route path="/ExamsDocsVisaBlog" element={<ExamsDocsVisaBlog />} />
              <Route path="/EntrepreneurshipMagazine" element={<EntrepreneurshipMagazine />} />
              <Route path="/CollegeTest" element={<CollegeTest />} />
              <Route path="/IntelligenceTests" element={<IntelligenceTests />} />
              <Route path="/SkillDevelopmentHub" element={<SkillDevelopmentHub />} />
              <Route path="/CommunityNetworking" element={<CommunityNetworking />} />
              <Route path="/ChatbotPage" element={<ChatbotPage />} />
              <Route path="/AIStudyAbroadAdvisor" element={<AIStudyAbroadAdvisor />} />
              <Route path="/AIInterviewPrepResumeGuide" element={<AIInterviewPrepResumeGuide />} />
              <Route path="/ResumeAnalyzer" element={<ResumeAnalyzer />} />
              <Route path="/CoverLetterGenerator" element={<CoverLetterGenerator />} />
              <Route path="/ResumeDesigner" element={<ResumeDesigner />} />
              <Route path="/ContactPage" element={<ContactPage />} />
              <Route path="/AbroadPartTime" element={<AbroadPartTime />} />

              <Route path="*" element={<Home />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
}
