// Utility functions for Supabase operations
import { supabase } from './supabaseClient';

// Save test data (creator's answers)
export const saveTest = async (testId, answers, creatorName) => {
  try {
    const { error } = await supabase
      .from('tests')
      .insert([
        { id: testId, answers, creator_name: creatorName }
      ]);

    if (error) throw error;
    console.log('Test saved to Supabase:', testId);
  } catch (err) {
    console.error('Error saving test:', err);
    // Fallback? or Alert? For now, just log.
  }
};

// Get test data by ID
export const getTest = async (testId) => {
  try {
    const { data, error } = await supabase
      .from('tests')
      .select('*')
      .eq('id', testId)
      .single();

    if (error) {
      console.error('Supabase error fetching test:', error);
      return null;
    }

    // Map snake_case database fields back to camelCase for the app
    if (data) {
      return {
        testId: data.id,
        answers: data.answers,
        creatorName: data.creator_name,
        createdAt: data.created_at
      };
    }
    return null;
  } catch (err) {
    console.error('Error getting test:', err);
    return null;
  }
};

// Save player's guesses, score, and name
export const savePlayerResult = async (testId, playerName, guesses, score, answers) => {
  try {
    const { data, error } = await supabase
      .from('results')
      .insert([
        {
          id: Date.now().toString(), // Or let Postgres generate UUID
          test_id: testId,
          player_name: playerName,
          guesses: guesses,
          score: score,
          total_questions: Object.keys(answers).length || 20
        }
      ])
      .select();

    if (error) throw error;
    return data && data[0];
  } catch (err) {
    console.error('Error saving result:', err);
    return null;
  }
};

// Get all player results for a test
export const getPlayerResults = async (testId) => {
  try {
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .eq('test_id', testId)
      .order('score', { ascending: false });

    if (error) throw error;

    // Map fields back
    return data.map(item => ({
      id: item.id,
      playerName: item.player_name,
      score: item.score,
      totalQuestions: item.total_questions,
      completedAt: item.completed_at
    }));
  } catch (err) {
    console.error('Error fetching results:', err);
    return [];
  }
};

// Global User Name Helpers (Keep LocalStorage for convenience)
export const saveUserName = (name) => {
  if (!name) return;
  localStorage.setItem('user_name', name);
};

export const getUserName = () => {
  return localStorage.getItem('user_name') || '';
};

