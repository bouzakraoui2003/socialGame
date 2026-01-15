// Play Intro Page
// Shows intro message and asks for player's name before starting the quiz

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTest, saveUserName } from '../utils/storage';
import './PlayIntro.css';

const PlayIntro = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if test exists on mount
  useEffect(() => {
    const fetchTestData = async () => {
      const data = await getTest(testId);
      if (!data) {
        console.error(`Test not found: ${testId}`);
        setTestData(null);
      } else {
        console.log(`Test found: ${testId}`);
        setTestData(data);
      }
      setLoading(false);
    };
    fetchTestData();
  }, [testId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Please enter your name or nickname');
      return;
    }

    if (!testData) {
      setError('Test not found. Cannot start.');
      return;
    }

    // Navigate to quiz with player name
    console.log(`Starting quiz for ${playerName} on test ${testId}`);
    saveUserName(playerName.trim());
    navigate(`/play/${testId}/quiz`, { state: { playerName: playerName.trim() } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!testData) {
    return (
      <div className="play-intro-container">
        <div className="play-intro-content glass-panel">
          <h1>🚫 Test Not Found</h1>
          <p>We couldn't find a test with ID: <strong>{testId}</strong></p>
          <p className="error-hint">Please check the ID and try again.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const creatorName = testData.creatorName || 'me';

  return (
    <div className="play-intro-container">
      <div className="play-intro-content">
        <div className="intro-animation">
          <h1 className="intro-title">
            <span className="title-word">How</span>{' '}
            <span className="title-word">much</span>{' '}
            <span className="title-word">do</span>{' '}
            <span className="title-word">you</span>{' '}
            <span className="title-word">know</span>{' '}
            <span className="title-word">about</span>{' '}
            <span className="title-word highlight-name">{creatorName}?</span>
          </h1>
        </div>

        <div className="intro-subtitle">
          <p>Let's see how well you know {creatorName === 'me' ? 'your friend' : creatorName}!</p>
          <p>Ready to test your knowledge? 🧠</p>
        </div>

        <form onSubmit={handleSubmit} className="name-form glass-panel">
          <div className="name-input-group">
            <label htmlFor="playerName" className="name-label">
              What's your name or nickname?
            </label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => {
                setPlayerName(e.target.value);
                setError('');
              }}
              placeholder="Enter your name..."
              className={`name-input ${error ? 'error' : ''}`}
              autoFocus
              maxLength={50}
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <button type="submit" className="btn btn-primary btn-large">
            Start Quiz 🚀
          </button>
        </form>

        <div className="intro-footer">
          <p>Good luck! 🍀</p>
        </div>
      </div>
    </div>
  );
};

export default PlayIntro;
