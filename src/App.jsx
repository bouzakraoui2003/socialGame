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

import './components/Background3D.css';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
