// Play Intro Page
// Shows intro message and asks for player's name before starting the quiz

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTest, saveUserName } from '../utils/storage';
import './PlayIntro.css';

const PlayIntro = () => {
  const { t } = useTranslation();
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
      setError(t('intro.error_empty'));
      return;
    }

    if (playerName.trim().split(' ').length < 2) {
      setError(t('intro.error_short'));
      return;
    }

    if (!testData) {
      setError(t('intro.error_not_found'));
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
          <h1>{t('intro.not_found_title')}</h1>
          <p>{t('intro.not_found_desc')} <strong>{testId}</strong></p>
          <p className="error-hint">{t('intro.check_id')}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            {t('intro.go_home')}
          </button>
        </div>
      </div>
    );
  }

  const creatorName = testData.creatorName || 'me';
  const displayName = creatorName === 'me' ? t('intro.friend') : creatorName;

  return (
    <div className="play-intro-container">
      <div className="play-intro-content">
        <div className="intro-animation">
          <h1 className="intro-title">
            <span className="title-word">{t('intro.how_much_1')}</span>{' '}
            <span className="title-word">{t('intro.how_much_2')}</span>{' '}
            <span className="title-word">{t('intro.how_much_3')}</span>{' '}
            <span className="title-word">{t('intro.how_much_4')}</span>{' '}
            <span className="title-word">{t('intro.how_much_5')}</span>{' '}
            <span className="title-word">{t('intro.how_much_6')}</span>{' '}
            <span className="title-word highlight-name">{displayName}?</span>
          </h1>
        </div>

        <div className="intro-subtitle">
          <p>{t('intro.subtitle_1')} {displayName}!</p>
          <p>{t('intro.subtitle_2')} 🧠</p>
        </div>

        <form onSubmit={handleSubmit} className="name-form glass-panel">
          <div className="name-input-group">
            <label htmlFor="playerName" className="name-label">
              {t('intro.label_name')} <strong>{t('intro.label_name_bold')}</strong>?
            </label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => {
                setPlayerName(e.target.value);
                setError('');
              }}
              placeholder={t('intro.placeholder')}
              className={`name-input ${error ? 'error' : ''}`}
              autoFocus
              maxLength={50}
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <button type="submit" className="btn btn-primary btn-large">
            {t('intro.start_button')}
          </button>
        </form>

        <div className="intro-footer">
          <p>{t('intro.good_luck')}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayIntro;
