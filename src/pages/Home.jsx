import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './Home.css';

function Home() {
  return (
    <main className="home-container animate-fade-in">
      <div className="hero-section">
        <div className="hero-content">
          <span className="badge-new">🔥 Trending Now</span>
          <h1 className="title-gradient">
            Do They Really<br />
            <span className="text-highlight">Know You?</span> <span style={{ WebkitTextFillColor: 'initial', textShadow: 'none' }}>🤔</span>
          </h1>
          <p className="subtitle">
            Create custom quizzes, challenge your friends, and unlock your true social potential in a stunning new dimension.
          </p>

          <div className="action-buttons">
            <Link to="/play" className="btn btn-primary pulse-on-hover">
              Play Now
            </Link>
            <Link to="/create" className="btn btn-secondary glass-hover">
              Create Quiz
            </Link>
          </div>
        </div>

        <div className="hero-visual animate-float">
          <div className="glass-card visual-card">
            <video
              src="/detective_video.mp4"
              className="visual-card-bg"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="card-info">
              <h3>Guess someone</h3>
              <p>will get 20/20 huh</p>
            </div>
          </div>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card glass-panel">
          <span className="feature-icon">🚀</span>
          <h3>Fast</h3>
          <p>Instant results and real-time sharing.</p>
        </div>
        <div className="feature-card glass-panel">
          <span className="feature-icon">🎨</span>
          <h3>Custom</h3>
          <p>Design your own tests with unique styles.</p>
        </div>
        <div className="feature-card glass-panel">
          <span className="feature-icon">🔒</span>
          <h3>Private</h3>
          <p>Your data is yours. Secure and ephemeral.</p>
        </div>
      </div>


    </main>
  );
}

export default Home;
