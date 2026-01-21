// Enter Test ID Page
// Allows user to enter a test ID to play

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AdUnit from '../components/AdUnit';
import './EnterTestId.css';

const EnterTestId = () => {
  const { t } = useTranslation();
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
        setError(t('enter.error_not_found'));
      }
    } catch (err) {
      console.error('Error checking test ID:', err);
      setError(t('enter.error_generic'));
    }
  };

  return (
    <div className="enter-test-id-container">
      <div className="enter-test-id-content">
        <h1>{t('enter.title')}</h1>
        <p>{t('enter.subtitle')}</p>

        <form onSubmit={handleSubmit} className="test-id-form">
          <input
            type="text"
            value={testId}
            onChange={(e) => setTestId(e.target.value)}
            placeholder={t('enter.placeholder')}
            className="test-id-input"
            maxLength={6}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn btn-primary">
            {t('enter.button')}
          </button>
        </form>

        <button
          className="btn btn-link"
          onClick={() => navigate('/')}
        >
          {t('enter.back_home')}
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
