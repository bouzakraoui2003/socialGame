// Enter Test ID Page
// Allows user to enter a test ID to play

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdUnit from '../components/AdUnit';
import './EnterTestId.css';

const EnterTestId = () => {
  const [testId, setTestId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!testId.trim()) return;

    const formattedId = testId.trim().toUpperCase(); // IDs are case-sensitive usually, but let's assume uppercase based on generateId

    // Check if ID exists in Supabase
    try {
      const { getTest } = await import('../utils/storage');
      const testData = await getTest(formattedId);

      if (testData) {
        setError('');
        navigate(`/play/${formattedId}`);
      } else {
        setError('Test not found. Please check the ID and try again.');
      }
    } catch (err) {
      console.error('Error checking test ID:', err);
      setError('An error occurred. Please try again.');
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

        {/* Ad Space */}
        <div style={{ marginTop: '2rem' }}>
          <AdUnit format="square" />
        </div>
      </div>
    </div>
  );
};

export default EnterTestId;
