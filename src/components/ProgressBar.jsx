import React from 'react';
import './ProgressBar.css';

function ProgressBar({ current, total }) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="progress-container">
      <div className="progress-label">
        <span>Question {current}</span>
        <span className="total">of {total}</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        >
          <div className="progress-glow"></div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
