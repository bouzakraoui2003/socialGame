// Play Test Page
// Friend tries to guess creator's choices category by category

import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { categories } from '../data/categories';
import { getTest } from '../utils/storage';
import ProgressBar from '../components/ProgressBar';
import CategoryCard from '../components/CategoryCard';
import AdUnit from '../components/AdUnit';

import './PlayTest.css';

const PlayTest = () => {
  const { testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [testData, setTestData] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [guesses, setGuesses] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  // Derived state: subset of categories to play
  const [playCategories, setPlayCategories] = useState([]);

  // Loading state
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Load test data and player name
  useEffect(() => {
    // Check if player name is in location state
    if (location.state?.playerName) {
      setPlayerName(location.state.playerName);
    } else {
      // No player name, redirect to intro
      navigate(`/play/${testId}`, { replace: true });
      return;
    }

    const fetchTestData = async () => {
      const data = await getTest(testId);
      if (!data) {
        // Test not found, redirect to home
        navigate('/');
        return;
      }
      setTestData(data);

      const answeredIds = Object.keys(data.answers).map(Number);
      const filtered = categories.filter(c => answeredIds.includes(c.id));
      setPlayCategories(filtered);

      // Start Image Preloading
      preloadImages(filtered);
    };
    fetchTestData();
  }, [testId, navigate, location.state]);

  const preloadImages = async (categoriesToLoad) => {
    const imageUrls = categoriesToLoad.flatMap(cat =>
      cat.options
        .filter(opt => typeof opt === 'object' && opt.image)
        .map(opt => opt.image)
    );

    if (imageUrls.length === 0) {
      setLoadingProgress(100);
      setImagesLoaded(true);
      return;
    }

    let loadedCount = 0;
    const total = imageUrls.length;

    // Helper to update progress
    const updateProgress = () => {
      loadedCount++;
      setLoadingProgress(Math.round((loadedCount / total) * 100));
    };

    const promises = imageUrls.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          updateProgress();
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to preload image: ${src}`);
          updateProgress();
          resolve();
        };
      });
    });

    await Promise.all(promises);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setImagesLoaded(true);
    }, 500);
  };

  const currentCategory = playCategories[currentCategoryIndex];
  const isLastCategory = currentCategoryIndex === playCategories.length - 1;
  const totalCategories = playCategories.length;

  // Reset selected option when category changes
  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentCategory && guesses[currentCategory.id]) {
      setSelectedOption(guesses[currentCategory.id]);
    } else {
      setSelectedOption(null);
    }
  }, [currentCategoryIndex, currentCategory, guesses]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    // Save guess for current category
    const newGuesses = {
      ...guesses,
      [currentCategory.id]: selectedOption
    };
    setGuesses(newGuesses);

    // Check if guess is correct
    const correctAnswer = testData.answers[currentCategory.id];
    const isCorrect = correctAnswer === selectedOption;
    const newScore = isCorrect ? score + 1 : score;

    // Move to next category or finish
    if (isLastCategory) {
      // Navigate to result page with guesses, score, and player name
      navigate(`/result/${testId}`, {
        state: {
          playerName,
          guesses: newGuesses,
          score: newScore,
          answers: testData.answers,
          totalQuestions: totalCategories // Pass explicitly so result knows denominator
        }
      });
    } else {
      setScore(newScore);
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      // Recalculate score when going back
      const correctAnswer = testData?.answers[currentCategory.id];
      const currentGuess = guesses[currentCategory.id];
      if (correctAnswer && currentGuess === correctAnswer) {
        setScore(Math.max(0, score - 1));
      }

      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setSelectedOption(null);
    }
  };

  if (!testData || !currentCategory || !imagesLoaded) {
    return (
      <div className="play-test-container loading-container">
        <div className="loading-content">
          <h2 className="loading-title">Preparing your test...</h2>

          <div className="loading-bar-track">
            <div
              className="loading-bar-fill"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="loading-text">{loadingProgress}% Ready</p>
        </div>
      </div>
    );
  }

  return (
    <div className="play-test-container">
      <div className="play-test-content">
        <ProgressBar current={currentCategoryIndex + 1} total={totalCategories} />

        <div className="category-section">
          <h2 className="category-question">{currentCategory.question}</h2>
          <p className="category-instruction">Guess what {testData.creatorName || 'the creator'} chose!</p>

          <div className={`options-grid grid-count-${currentCategory.options.length} ${currentCategory.options.length <= 2 ? 'grid-center-limited' : ''}`}>
            {currentCategory.options.map((option, index) => {
              const optionText = typeof option === 'object' ? option.text : option;
              const isSelected = selectedOption === optionText;

              return (
                <div key={index} className="card-wrapper">
                  <CategoryCard
                    option={option}
                    isSelected={isSelected}
                    onClick={() => handleOptionSelect(optionText)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="navigation-buttons">
          <button
            className="btn btn-secondary"
            onClick={handlePrevious}
            disabled={currentCategoryIndex === 0}
          >
            Previous
          </button>

          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={!selectedOption}
          >
            {isLastCategory ? 'See Results' : 'Next'}
          </button>
        </div>

        {/* Ad Space */}
        <div style={{ marginTop: '2rem' }}>
          <AdUnit format="square" />
        </div>

      </div>

    </div>
  );
};

export default PlayTest;
