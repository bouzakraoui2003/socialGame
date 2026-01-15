// Result Page
// Shows final score, correct/incorrect answers, and option to create new test

import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { categories } from '../data/categories';
import { savePlayerResult } from '../utils/storage';
import AdUnit from '../components/AdUnit';
import './Result.css';

const Result = () => {
  const { testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const hasSavedRef = useRef(false); // Track if we've already saved the result

  useEffect(() => {
    if (location.state) {
      setResultData(location.state);
      // Save player result with name (only once)
      if (!hasSavedRef.current) {
        const { playerName, guesses, score, answers } = location.state;
        if (playerName && guesses && answers) {
          // Fire and forget, but handled cleanly
          savePlayerResult(testId, playerName, guesses, score, answers)
            .catch(err => console.error("Failed to save result", err));
          hasSavedRef.current = true; // Mark as saved immediately to prevent double-save
        }
      }
    } else {
      // If no state, redirect to home
      navigate('/');
    }
  }, [location.state, navigate, testId]);

  const getScoreMessage = (score, total) => {
    const percentage = (score / total) * 100;

    if (percentage === 100) {
      return { message: "Perfect! You know them inside out! 🎉", emoji: "🏆" };
    } else if (percentage >= 80) {
      return { message: "Excellent! You're a great friend! 🌟", emoji: "✨" };
    } else if (percentage >= 60) {
      return { message: "Good job! You know them pretty well! 👍", emoji: "😊" };
    } else if (percentage >= 40) {
      return { message: "Not bad, but there's room for improvement! 💪", emoji: "🤔" };
    } else {
      return { message: "Better luck next time! Keep trying! 💪", emoji: "🎯" };
    }
  };

  const getShareableLink = () => {
    return `${window.location.origin}/play/${testId}`;
  };

  const handleCopyLink = () => {
    const link = getShareableLink();
    navigator.clipboard.writeText(link).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleCreateNew = () => {
    navigate('/create');
  };

  if (!resultData) {
    return <div className="result-container"><div className="loading">Loading...</div></div>;
  }

  const { score, guesses, answers, playerName } = resultData;
  const totalQuestions = answers ? Object.keys(answers).length : categories.length;
  const scoreMessage = getScoreMessage(score, totalQuestions);

  return (
    <div className="result-container">
      <div className="result-content">
        <div className="result-header">
          <div className="score-display">
            <span className="score-emoji">{scoreMessage.emoji}</span>
            <h1 className="score-title">Your Score</h1>
            <div className="score-value">
              {score}/{totalQuestions}
            </div>
            <p className="score-percentage">
              {Math.round((score / totalQuestions) * 100)}%
            </p>
          </div>

          <p className="score-message">{scoreMessage.message}</p>
        </div>

        <AdUnit format="horizontal" />

        <div className="answers-review">
          <h2>Your Answers</h2>
          <div className="answers-list">
            {categories.map((category) => {
              const guess = guesses[category.id];
              const correctAnswer = answers[category.id];
              const isCorrect = guess === correctAnswer;

              return (
                <div key={category.id} className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="answer-header">
                    <span className="answer-icon">
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    <h3 className="answer-question">{category.question}</h3>
                  </div>
                  <div className="answer-details">
                    <div className="answer-guess">
                      <strong>Your guess:</strong> {guess || 'Not answered'}
                    </div>
                    <div className="answer-correct">
                      <strong>Correct answer:</strong> {correctAnswer || 'Not answered'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="result-actions">
          <button className="btn btn-primary" onClick={handleCreateNew}>
            Create Your Own Test
          </button>
          <button
            className={`btn btn-secondary ${isCopied ? 'btn-success' : ''}`}
            onClick={handleCopyLink}
            disabled={isCopied}
          >
            {isCopied ? 'Link Copied To Clipboard! ✅' : 'Share This Test 🔗'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;

