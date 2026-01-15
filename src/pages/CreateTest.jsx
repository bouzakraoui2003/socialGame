// Create Test Page
// User goes through 20 categories and selects one option for each

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
import { generateId } from '../utils/generateId';
import { saveTest, saveUserName, getUserName } from '../utils/storage';
import ProgressBar from '../components/ProgressBar';
import CategoryCard from '../components/CategoryCard';
import AdUnit from '../components/AdUnit';
import './CreateTest.css';

const CreateTest = () => {
  const navigate = useNavigate();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [creatorName, setCreatorName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [nameError, setNameError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const currentCategory = categories[currentCategoryIndex];
  const isLastCategory = currentCategoryIndex === categories.length - 1;
  const totalCategories = categories.length;
  // Adjust completed count logic if needed, but simple length check is fine for now
  const completedCount = Object.keys(answers).length;

  // Load saved answer for current category if exists
  useEffect(() => {
    window.scrollTo(0, 0);
    if (answers[currentCategory?.id]) {
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
      // Removed auto-skip so user can see/edit their name
      // setIsNameEntered(true);
    }
  }, []);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!creatorName.trim()) {
      setNameError('Please enter your name');
      return;
    }
    saveUserName(creatorName.trim());
    setIsNameEntered(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = async () => {
    if (!selectedOption) return;

    // Save answer for current category
    const newAnswers = {
      ...answers,
      [currentCategory.id]: selectedOption
    };
    setAnswers(newAnswers);

    // Move to next category or finish
    if (isLastCategory) {
      setIsSaving(true);
      // Generate test ID and save
      const testId = generateId();
      await saveTest(testId, newAnswers, creatorName);

      // Navigate to share/result page
      navigate(`/share/${testId}`);
      setIsSaving(false);
    } else {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setSelectedOption(null);
    } else {
      // If at first question, go back to name input
      setIsNameEntered(false);
    }
  };

  const handleSkip = async () => {
    // Skip current category (don't save answer)
    if (isLastCategory) {
      setIsSaving(true);
      // If last category and skipping, still finish with current answers
      const testId = generateId();
      await saveTest(testId, answers, creatorName);
      navigate(`/share/${testId}`);
      setIsSaving(false);
    } else {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setSelectedOption(null);
    }
  };

  // 1. Name Input Step
  if (!isNameEntered) {
    return (
      <div className="create-test-container name-input-mode">
        {/* Name Input Card */}
        <div className="name-creation-card glass-panel">
          <h1 className="name-title">Create Your Test</h1>
          <p className="subtitle">First, what's your name?</p>
          <p className="subtitle-small">Your friends will see this when they play.</p>

          <form onSubmit={handleNameSubmit} className="name-form">
            <div className="name-input-group">
              <input
                type="text"
                value={creatorName}
                onChange={(e) => {
                  setCreatorName(e.target.value);
                  setNameError('');
                }}
                placeholder="Enter your name..."
                className={`name-input ${nameError ? 'error' : ''}`}
                autoFocus
                maxLength={50}
              />
              {nameError && <p className="error-message">{nameError}</p>}
            </div>

            <button type="submit" className="btn btn-primary btn-large">
              Start Creating 🚀
            </button>
          </form>
        </div>

        {/* Ad Unit - Outside the card */}
        <div className="ad-container-bottom">
          <AdUnit format="horizontal" />
        </div>
      </div>
    );
  }

  if (!currentCategory) {
    return <div>Loading...</div>;
  }

  // 2. Questions Step
  return (
    <div className="create-test-container">
      <div className="create-test-content">
        <ProgressBar current={completedCount + (selectedOption ? 1 : 0)} total={totalCategories} />

        <div className="category-section">
          <h2 className="category-question">{currentCategory.question}</h2>

          <div className={`options-grid ${currentCategory.options.length <= 2 ? 'grid-center-limited' : ''}`}>
            {currentCategory.options.map((option, index) => {
              // Handle both new object structure and old string structure
              const optionText = typeof option === 'object' ? option.text : option;
              const isSelected = selectedOption === optionText;

              return (
                <CategoryCard
                  key={index}
                  option={option}
                  isSelected={isSelected}
                  onClick={() => handleOptionSelect(optionText)}
                />
              );
            })}
          </div>
        </div>

        <div className="navigation-buttons">
          <button
            className="btn btn-secondary"
            onClick={handlePrevious}
          >
            Previous
          </button>

          <button
            className="btn btn-outline"
            onClick={handleSkip}
          >
            Skip
          </button>

          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!selectedOption || isSaving}
          >
            {isSaving ? 'Saving...' : (isLastCategory ? 'Finish' : 'Next')}
          </button>

        </div>

        <AdUnit format="horizontal" />
      </div>

    </div>
  );
};

export default CreateTest;

