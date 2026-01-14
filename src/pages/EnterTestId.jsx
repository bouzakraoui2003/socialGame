// Enter Test ID Page
// Allows user to enter a test ID to play

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnterTestId.css';

const EnterTestId = () => {
  const [testId, setTestId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!testId.trim()) return;

    const formattedId = testId.trim().toUpperCase();

    // Check if ID exists (client-side check for now)
    const testData = localStorage.getItem(`test_${formattedId}`);

    if (testData) {
      setError('');
      navigate(`/play/${formattedId}`);
    } else {
      setError('No one created a test with this ID. Please check and try again.');
    }
  };

  return (
    <div className="enter-test-id-container">
      <div className="enter-test-id-content">
        <h1>🎮 Play a Test</h1>
        <p>Enter the test ID your friend shared with you</p>

        <form onSubmit={handleSubmit} className="test-id-form">
          <input
            type="text"
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
            placeholder="Enter test ID (e.g., ABC123)"
            className="test-id-input"
            maxLength={6}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn btn-primary">
            Start Playing
          </button>
        </form>

        <button
          className="btn btn-link"
          onClick={() => navigate('/')}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default EnterTestId;

