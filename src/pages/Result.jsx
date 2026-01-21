// Result Page
// Shows final score, correct/incorrect answers, and option to create new test

import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { categories } from '../data/categories';
import { savePlayerResult } from '../utils/storage';
import AdUnit from '../components/AdUnit';
import './Result.css';

const Result = () => {
  const { t } = useTranslation();
  const { testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [resultData, setResultData] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const hasSavedRef = useRef(false); // Track if we've already saved the result

  useEffect(() => {
    if (location.state) {
      setResultData(location.state);
      // Save player result with name (only once)
      if (!hasSavedRef.current) {
        const { playerName, guesses, score, answers } = location.state;
        if (playerName && guesses && answers) {
          savePlayerResult(testId, playerName, guesses, score, answers)
            .catch(err => console.error("Failed to save result", err));
          hasSavedRef.current = true;
        }
      }
    } else {
      navigate('/');
    }
  }, [location.state, navigate, testId]);

  // Animation Effect
  useEffect(() => {
    if (!resultData) return;

    const { score, answers, totalQuestions: passedTotal } = resultData;
    const total = passedTotal || (answers ? Object.keys(answers).length : 20);
    const targetPercentage = Math.round((score / total) * 100);

    let startTimestamp = null;
    const duration = 1500; // 1.5 seconds animation

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Easing function (easeOutQuart) for smooth slowdown
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      setAnimatedScore(easeProgress * targetPercentage);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [resultData]);

  const getScoreMessage = (score, total) => {
    const percentage = (score / total) * 100;

    if (percentage === 100) {
      return { message: t('result.score_perfect'), emoji: "🏆" };
    } else if (percentage >= 80) {
      return { message: t('result.score_excellent'), emoji: "🌟" };
    } else if (percentage >= 60) {
      return { message: t('result.score_good'), emoji: "👍" };
    } else if (percentage >= 40) {
      return { message: t('result.score_average'), emoji: "💪" };
    } else {
      return { message: t('result.score_bad'), emoji: "🎯" };
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

  const getTranslatedOption = (category, optionText) => {
    if (!optionText) return t('result.not_answered');
    const index = category.options.findIndex(opt => {
      const text = typeof opt === 'object' ? opt.text : opt;
      return text === optionText;
    });
    if (index === -1) return optionText;
    return t(`categories.${category.id}.options.${index}`, optionText);
  };

  if (!resultData) {
    return <div className="result-container"><div className="loading">{t('result.loading')}</div></div>;
  }

  // Determine total from passed state (totalQuestions) or derive from answers length
  const { score, guesses, answers, totalQuestions: passedTotal } = resultData;
  const totalQuestions = passedTotal || (answers ? Object.keys(answers).length : 20); // Fallback to 20 if logic fails
  const scoreMessage = getScoreMessage(score, totalQuestions);
  const percentageScore = Math.round((score / totalQuestions) * 100);

  // Filter list to only show answered questions
  const answeredCategoryIds = answers ? Object.keys(answers).map(Number) : [];
  const displayCategories = categories.filter(c => answeredCategoryIds.includes(c.id));

  return (
    <div className="result-container">
      <div className="result-content">
        <div className="result-header">
          <div className="score-display">
            <span className="score-emoji">{scoreMessage.emoji}</span>
            <h1 className="score-title">{t('result.score_title')}</h1>
            <div className="score-circle-container">
              <svg className="score-circle" viewBox="0 0 200 200">
                {/* Background Circle */}
                <circle
                  className="circle-bg"
                  cx="100"
                  cy="100"
                  r="90"
                  strokeWidth="12"
                />
                {/* Progress Circle */}
                <circle
                  className="circle-progress"
                  cx="100"
                  cy="100"
                  r="90"
                  strokeWidth="12"
                  style={{
                    strokeDasharray: 565.48, // 2 * PI * 90
                    strokeDashoffset: 565.48 - (565.48 * animatedScore) / 100
                  }}
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className="score-text-overlay">
                <div className="score-value big-percentage">
                  {Math.round(animatedScore)}%
                </div>
                <p className="score-fraction">
                  ({score}/{totalQuestions})
                </p>
              </div>
            </div>
          </div>

          <p className="score-message">{scoreMessage.message}</p>
        </div>

        {/* Ad Space */}
        <div style={{ marginBottom: '2rem' }}>
          <AdUnit />
        </div>

        <div className="answers-review">
          <h2>{t('result.your_answers')}</h2>
          <div className="answers-list">
            {displayCategories.map((category) => {
              const guess = guesses[category.id];
              const correctAnswer = answers[category.id];
              const isCorrect = guess === correctAnswer;

              const translatedGuess = getTranslatedOption(category, guess);
              const translatedCorrect = getTranslatedOption(category, correctAnswer);

              return (
                <div key={category.id} className={`answer-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="answer-header">
                    <span className="answer-icon">
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    <h3 className="answer-question">{t(`categories.${category.id}.question`, category.question)}</h3>
                  </div>
                  <div className="answer-details">
                    <div className="answer-guess">
                      <strong>{t('result.guess')}</strong> {translatedGuess}
                    </div>
                    {!isCorrect && (
                      <div className="answer-correct">
                        <strong>{t('result.correct')}</strong> {translatedCorrect}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="result-actions">
          <button className="btn btn-primary" onClick={handleCreateNew}>
            {t('result.create_own')}
          </button>
          <button
            className={`btn btn-secondary ${isCopied ? 'btn-success' : ''}`}
            onClick={handleCopyLink}
            disabled={isCopied}
          >
            {isCopied ? t('result.link_copied') : t('result.share_link')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;

