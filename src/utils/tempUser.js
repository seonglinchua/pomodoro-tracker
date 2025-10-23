/**
 * Temporary User ID Management
 *
 * This utility manages temporary user IDs stored in localStorage.
 * Used for testing without Firebase Authentication.
 */

const TEMP_USER_ID_KEY = 'tempUserId';

/**
 * Generates a unique temporary user ID
 * Combines timestamp with random string for uniqueness
 *
 * @returns {string} Generated temporary user ID
 */
const generateTempUserId = () => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `temp-${timestamp}-${randomStr}`;
};

/**
 * Gets existing temporary user ID from localStorage or creates a new one
 *
 * @returns {string} Temporary user ID
 */
export const getTempUserId = () => {
  try {
    // Check if user ID already exists in localStorage
    let userId = localStorage.getItem(TEMP_USER_ID_KEY);

    // If no user ID exists, generate and store a new one
    if (!userId) {
      userId = generateTempUserId();
      localStorage.setItem(TEMP_USER_ID_KEY, userId);
      console.log('New temporary user ID created:', userId);
    }

    return userId;
  } catch (error) {
    // Handle localStorage errors (e.g., disabled, quota exceeded)
    console.error('Error accessing localStorage:', error);
    // Return a session-only temp ID as fallback
    return generateTempUserId();
  }
};

/**
 * Clears the temporary user ID from localStorage
 * Useful for testing or resetting the application
 *
 * @returns {void}
 */
export const clearTempUserId = () => {
  try {
    localStorage.removeItem(TEMP_USER_ID_KEY);
    console.log('Temporary user ID cleared');
  } catch (error) {
    console.error('Error clearing temporary user ID:', error);
  }
};

/**
 * Gets the current temporary user ID without creating a new one
 *
 * @returns {string|null} Temporary user ID or null if not set
 */
export const getCurrentTempUserId = () => {
  try {
    return localStorage.getItem(TEMP_USER_ID_KEY);
  } catch (error) {
    console.error('Error reading temporary user ID:', error);
    return null;
  }
};
