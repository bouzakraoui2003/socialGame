// Utility functions for localStorage operations

// Save test data (creator's answers)
export const saveTest = (testId, answers, creatorName) => {
  const testData = {
    testId,
    answers,
    creatorName,
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(`test_${testId}`, JSON.stringify(testData));
};

// Get test data by ID
export const getTest = (testId) => {
  const data = localStorage.getItem(`test_${testId}`);
  return data ? JSON.parse(data) : null;
};

// Save player's guesses, score, and name
export const savePlayerResult = (testId, playerName, guesses, score, answers) => {
  const resultData = {
    id: Date.now().toString(), // Unique ID for this result
    testId,
    playerName,
    guesses,
    score,
    totalQuestions: Object.keys(answers).length || 20,
    completedAt: new Date().toISOString()
  };

  // Store in an array to keep history
  const existingResults = JSON.parse(localStorage.getItem(`results_${testId}`) || '[]');
  existingResults.push(resultData);
  localStorage.setItem(`results_${testId}`, JSON.stringify(existingResults));

  return resultData;
};

// Get all player results for a test
export const getPlayerResults = (testId) => {
  const data = localStorage.getItem(`results_${testId}`);
  return data ? JSON.parse(data) : [];
};

// Global User Name Helpers
export const saveUserName = (name) => {
  if (!name) return;
  localStorage.setItem('user_name', name);
};

export const getUserName = () => {
  return localStorage.getItem('user_name') || '';
};

