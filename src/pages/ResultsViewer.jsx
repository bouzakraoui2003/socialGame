// Results Viewer Page
// Test owner can see all player results with names and scores

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTest, getPlayerResults } from '../utils/storage';
import { categories } from '../data/categories';
import AdUnit from '../components/AdUnit';
import './ResultsViewer.css';

const ResultsViewer = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [testData, setTestData] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPlayerId, setExpandedPlayerId] = useState(null);

  const toggleExpand = (playerId) => {
    if (expandedPlayerId === playerId) {
      setExpandedPlayerId(null);
    } else {
      setExpandedPlayerId(playerId);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Verify test exists
      const data = await getTest(testId);
      if (!data) {
        navigate('/');
        return;
      }
      setTestData(data);

      // Load all player results
      const playerResults = await getPlayerResults(testId);
      // Sort by score (highest first), then by date (newest first)
      const sortedResults = playerResults.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return new Date(b.completedAt) - new Date(a.completedAt);
      });
      setResults(sortedResults);
      setLoading(false);
    };
    fetchData();
  }, [testId, navigate]);

  const getScoreMessage = (score, total) => {
    const percentage = (score / total) * 100;

    if (percentage === 100) {
      return { message: "Perfect! 🏆", emoji: "🏆", color: "#22c55e" };
    } else if (percentage >= 80) {
      return { message: "Excellent! ✨", emoji: "✨", color: "#3b82f6" };
    } else if (percentage >= 60) {
      return { message: "Good job! 👍", emoji: "👍", color: "#8b5cf6" };
    } else if (percentage >= 40) {
      return { message: "Not bad! 💪", emoji: "💪", color: "#f59e0b" };
    } else {
      return { message: "Keep trying! 🎯", emoji: "🎯", color: "#ef4444" };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getShareableLink = () => {
    return `${window.location.origin}/play/${testId}`;
  };

  const handleCopyLink = () => {
    const link = getShareableLink();
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  if (loading) {
    return (
      <div className="results-viewer-container">
        <div className="loading">Loading results...</div>
      </div>
    );
  }

  const totalQuestions = testData.answers ? Object.keys(testData.answers).length : 20;

  return (
    <div className="results-viewer-container">
      <div className="results-viewer-content">
        <div className="results-header">
          <h1>Test Results</h1>
          <p>See how well your friends know you!</p>
        </div>

        <div className="results-stats">
          <div className="stat-card">
            <div className="stat-number">{results.length}</div>
            <div className="stat-label">Total Players</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {results.length > 0
                ? Math.round((results.reduce((sum, r) => sum + r.score, 0) / results.length / totalQuestions) * 100)
                : 0}%
            </div>
            <div className="stat-label">Average Score</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {results.length > 0 ? Math.max(...results.map(r => r.score)) : 0}/{totalQuestions}
            </div>
            <div className="stat-label">Highest Score</div>
          </div>
        </div>

        {/* Ad Space */}
        <div style={{ margin: '2rem 0' }}>
          <AdUnit />
        </div>

        {results.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">📭</div>
            <h2>No results yet!</h2>
            <p>Share your test link with friends to see their results here.</p>
            <button className="btn btn-primary" onClick={handleCopyLink}>
              Copy Test Link
            </button>
          </div>
        ) : (
          <div className="results-list">
            <h2 className="results-list-title">Player Results</h2>
            {results.map((result, index) => {
              const scoreMessage = getScoreMessage(result.score, result.totalQuestions || totalQuestions);
              return (

                <div key={result.id || index} className={`result-card ${expandedPlayerId === result.id ? 'expanded' : ''}`}>
                  <div className="result-summary" onClick={() => toggleExpand(result.id)}>
                    <div className="result-rank">
                      #{index + 1}
                    </div>
                    <div className="result-main">
                      <div className="result-header-info">
                        <h3 className="result-player-name">{result.playerName}</h3>
                        <span className="result-date">{formatDate(result.completedAt)}</span>
                      </div>
                      <div className="result-score-section">
                        <div className="result-score">
                          <span className="score-value">{result.score}</span>
                          <span className="score-total">/{result.totalQuestions || totalQuestions}</span>
                          <span className="score-percentage">
                            ({Math.round((result.score / (result.totalQuestions || totalQuestions)) * 100)}%)
                          </span>
                        </div>
                        <div
                          className="result-message"
                          style={{ color: scoreMessage.color }}
                        >
                          <span className="result-emoji">{scoreMessage.emoji}</span>
                          {scoreMessage.message}
                          <span className="expand-icon">{expandedPlayerId === result.id ? '▲' : '▼'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed View */}
                  {expandedPlayerId === result.id && (
                    <div className="result-details">
                      <div className="details-divider"></div>
                      <h4>Detailed Answers</h4>
                      <div className="detailed-answers-list">
                        {categories.map((category) => {
                          const guess = result.guesses ? result.guesses[category.id] : null;
                          const correctAnswer = testData.answers[category.id];
                          const isCorrect = guess === correctAnswer;

                          // Handle objects/strings for display
                          const guessText = typeof guess === 'object' ? guess.text : guess;
                          const answerText = typeof correctAnswer === 'object' ? correctAnswer.text : correctAnswer;

                          return (
                            <div key={category.id} className={`detail-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                              <div className="detail-question">{category.question}</div>
                              <div className="detail-comparison">
                                <div className="detail-row">
                                  <span className="detail-label">Friend:</span>
                                  <span className="detail-value">{guessText || 'Skipped'}</span>
                                </div>
                                {!isCorrect && (
                                  <div className="detail-row correct-row">
                                    <span className="detail-label">You:</span>
                                    <span className="detail-value">{answerText}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="results-actions">
          <button className="btn btn-primary" onClick={handleCopyLink}>
            Copy Test Link
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(`/share/${testId}`)}>
            Back to Share
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/')}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsViewer;

