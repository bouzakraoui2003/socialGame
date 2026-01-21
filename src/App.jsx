// Main App Component with Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTest from './pages/CreateTest';
import EnterTestId from './pages/EnterTestId';
import PlayIntro from './pages/PlayIntro';
import PlayTest from './pages/PlayTest';
import Share from './pages/Share';
import Result from './pages/Result';
import ResultsViewer from './pages/ResultsViewer';
import Background3D from './components/Background3D';

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

import './components/Background3D.css';
import './App.css';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <LanguageSwitcher />
        <Background3D />

        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateTest />} />
            <Route path="/play" element={<EnterTestId />} />
            <Route path="/play/:testId" element={<PlayIntro />} />
            <Route path="/play/:testId/quiz" element={<PlayTest />} />
            <Route path="/share/:testId" element={<Share />} />
            <Route path="/result/:testId" element={<Result />} />
            <Route path="/results/:testId" element={<ResultsViewer />} />

            {/* Content Pages */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />

            {/* Legal & Info Pages */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
