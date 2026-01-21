
// Create Test Page
// User goes through 20+ categories (randomized) and selects options
// Enforces max 3 skips

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { categories } from '../data/categories';
import { generateId } from '../utils/generateId';
import { saveTest, saveUserName, getUserName } from '../utils/storage';
import ProgressBar from '../components/ProgressBar';
import CategoryCard from '../components/CategoryCard';
import AdUnit from '../components/AdUnit';
import './CreateTest.css';

const CreateTest = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // We'll manage a local randomized copy of categories
  const [randomizedCategories, setRandomizedCategories] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [creatorName, setCreatorName] = useState('');

  // Steps: 0 = Name Input, 1 = Warning, 2 = Questions
  const [step, setStep] = useState(0);
  const [nameError, setNameError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [skipCount, setSkipCount] = useState(0);

  // Initialize and randomize categories on mount
  useEffect(() => {
    // Basic Shuffle
    const shuffled = [...categories].sort(() => Math.random() - 0.5);
    setRandomizedCategories(shuffled);
  }, []);

  const currentCategory = randomizedCategories[currentCategoryIndex];
  const isLastCategory = currentCategoryIndex === randomizedCategories.length - 1;
  const totalCategories = randomizedCategories.length;
  const answeredCount = Object.keys(answers).length;

  // Load saved answer for current category if exists (handle going back)
  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentCategory && answers[currentCategory.id]) {
      setSelectedOption(answers[currentCategory.id]);
    } else {
      setSelectedOption(null);
    }
  }, [currentCategoryIndex, currentCategory, answers]);

  // Check for global user name on mount
  useEffect(() => {
    const savedName = getUserName();
    if (savedName) {
      setCreatorName(savedName);
    }
  }, []);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!creatorName.trim()) {
      setNameError(t('create.error_empty'));
      return;
    }
    if (creatorName.trim().split(' ').length < 2) {
      setNameError(t('create.error_short'));
      return;
    }
    saveUserName(creatorName.trim());
    // Move to Warning Step instead of straight to questions
    setStep(1);
  };

  const handleWarningAck = () => {
    // Acknowledge warning, start test
    setStep(2);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = async () => {
    if (!selectedOption) return;

    // Save answer
    const newAnswers = {
      ...answers,
      [currentCategory.id]: selectedOption
    };
    setAnswers(newAnswers);

    // Verify if we are done
    // Logic update: Stop EXACTLY when we have 20 answers.
    const answeredCount = Object.keys(newAnswers).length;
    if (answeredCount >= 20 || isLastCategory) {
      await finishTest(newAnswers);
    } else {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setSelectedOption(null);
    }
  };

  const handleSkip = async () => {
    if (skipCount >= 3) return; // Should be disabled, but safety check

    const newSkipCount = skipCount + 1;
    setSkipCount(newSkipCount);

    // Remove from answers if it was previously answered
    const newAnswers = { ...answers };
    delete newAnswers[currentCategory.id];
    setAnswers(newAnswers);

    if (isLastCategory) {
      await finishTest(newAnswers);
    } else {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setSelectedOption(null);
    }
  };

  const finishTest = async (finalAnswers) => {
    setIsSaving(true);
    const testId = generateId();
    await saveTest(testId, finalAnswers, creatorName);
    navigate(`/share/${testId}`);
    setIsSaving(false);
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);

      // If going back to a skipped question, decremenet skip count?
      // Simple logic: if previous answer is missing, assume it was skipped.
      const prevCatId = randomizedCategories[currentCategoryIndex - 1].id;
      if (!answers[prevCatId]) {
        setSkipCount(Math.max(0, skipCount - 1));
      }
      setSelectedOption(null);
    } else {
      // Back to Warning
      setStep(1);
    }
  };

  // Wait for shuffle
  if (!randomizedCategories.length) return <div>Loading...</div>;

  // 1. Name Input Step
  if (step === 0) {
    return (
      <div className="create-test-container name-input-mode">
        {/* Name Input Card */}
        <div className="name-creation-card glass-panel">
          <h1 className="name-title">{t('create.title')}</h1>
          <p className="subtitle">{t('create.subtitle_1')} <strong>{t('create.subtitle_2')}</strong>?</p>
          <p className="subtitle-small">{t('create.subtitle_small')}</p>

          <form onSubmit={handleNameSubmit} className="name-form">
            <div className="name-input-group">
              <input
                type="text"
                value={creatorName}
                onChange={(e) => {
                  setCreatorName(e.target.value);
                  setNameError('');
                }}
                placeholder={t('create.placeholder')}
                className={`name-input ${nameError ? 'error' : ''}`}
                autoFocus
                maxLength={50}
              />
              {nameError && <p className="error-message">{nameError}</p>}
            </div>

            <button type="submit" className="btn btn-primary btn-large">
              {t('create.next')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Warning Step
  if (step === 1) {
    return (
      <div className="create-test-container warning-mode">
        <div className="warning-card glass-panel animate-fade-in">
          <span className="warning-icon">⚠️</span>
          <h2 className="warning-title">{t('create.warning_title')}</h2>
          <p className="warning-text">
            {t('create.warning_text_1')} <strong>{t('create.warning_text_2')}</strong>.
          </p>
          <p className="warning-subtext">
            {t('create.warning_subtext')}
          </p>
          <button className="btn btn-primary btn-large pulse-on-hover" onClick={handleWarningAck}>
            {t('create.warning_button')}
          </button>
        </div>
      </div>
    );
  }

  // 3. Questions Step
  if (step === 2 && currentCategory) {
    const remainingSkips = 3 - skipCount;
    return (
      <div className="create-test-container">
        <div className="create-test-content">
          <div className="progress-header">
            <ProgressBar current={answeredCount + (selectedOption ? 1 : 0)} total={20} />
            <div className="skip-indicator">
              {t('create.skips_left')} <span className={`skip-count ${remainingSkips === 0 ? 'zero' : ''}`}>{remainingSkips}</span>
            </div>
          </div>

          <div className="category-section">
            <h2 className="category-question">{t(`categories.${currentCategory.id}.question`, currentCategory.question)}</h2>

            <div className={`options-grid grid-count-${currentCategory.options.length} ${currentCategory.options.length <= 2 ? 'grid-center-limited' : ''}`}>
              {currentCategory.options.map((option, index) => {
                const originalText = typeof option === 'object' ? option.text : option;
                const translatedText = t(`categories.${currentCategory.id}.options.${index}`, originalText);

                // Construct display option with translated text, keeping image
                const displayOption = typeof option === 'object'
                  ? { ...option, text: translatedText }
                  : { text: translatedText, image: null };

                const isSelected = selectedOption === originalText;

                return (
                  <CategoryCard
                    key={index}
                    option={displayOption}
                    isSelected={isSelected}
                    onClick={() => handleOptionSelect(originalText)}
                  />
                );
              })}
            </div>
          </div>

          <div className="navigation-buttons">
            <button className="btn btn-secondary" onClick={handlePrevious}>
              {t('create.previous')}
            </button>

            <div className="right-buttons">
              <button
                className="btn btn-outline btn-skip"
                onClick={handleSkip}
                disabled={remainingSkips <= 0}
                title={remainingSkips <= 0 ? "No skips left!" : "Skip this question"}
              >
                {t('create.skip')} ({remainingSkips})
              </button>

              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={!selectedOption || isSaving}
              >
                {isSaving ? t('create.saving') : (isLastCategory ? t('create.finish') : t('quiz.next'))}
              </button>
            </div>
          </div>

          <AdUnit format="horizontal" />
        </div>
      </div>
    );
  }

  return null;
};

export default CreateTest;
