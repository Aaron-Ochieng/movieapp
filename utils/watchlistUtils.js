// movie-discovery/utils/watchlistUtils.js

const WATCHLIST_KEY = 'movieWatchlist';

/**
 * Retrieves the current watchlist from local storage.
 * @returns {Array<Object>} An array of movie objects in the watchlist.
 */
export const getWatchlist = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const watchlist = localStorage.getItem(WATCHLIST_KEY);
    return watchlist ? JSON.parse(watchlist) : [];
  } catch (error) {
    console.error('Failed to get watchlist from local storage:', error);
    return [];
  }
};

/**
 * Saves the given watchlist to local storage.
 * @param {Array<Object>} watchlist The array of movie objects to save.
 */
const saveWatchlist = (watchlist) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  } catch (error) {
    console.error('Failed to save watchlist to local storage:', error);
  }
};

/**
 * Adds a movie to the watchlist.
 * @param {Object} movie The movie object to add.
 * @returns {Array<Object>} The updated watchlist.
 */
export const addMovieToWatchlist = (movie) => {
  const currentWatchlist = getWatchlist();
  if (!currentWatchlist.some((m) => m.id === movie.id)) {
    const updatedWatchlist = [...currentWatchlist, { ...movie, watched: false }];
    saveWatchlist(updatedWatchlist);
    return updatedWatchlist;
  }
  return currentWatchlist; // Movie already in watchlist
};

/**
 * Removes a movie from the watchlist.
 * @param {number} movieId The ID of the movie to remove.
 * @returns {Array<Object>} The updated watchlist.
 */
export const removeMovieFromWatchlist = (movieId) => {
  const currentWatchlist = getWatchlist();
  const updatedWatchlist = currentWatchlist.filter((movie) => movie.id !== movieId);
  saveWatchlist(updatedWatchlist);
  return updatedWatchlist;
};

/**
 * Toggles the 'watched' status of a movie in the watchlist.
 * @param {number} movieId The ID of the movie to toggle.
 * @returns {Array<Object>} The updated watchlist.
 */
export const toggleMovieWatchedStatus = (movieId) => {
  const currentWatchlist = getWatchlist();
  const updatedWatchlist = currentWatchlist.map((movie) =>
    movie.id === movieId ? { ...movie, watched: !movie.watched } : movie
  );
  saveWatchlist(updatedWatchlist);
  return updatedWatchlist;
};

/**
 * Checks if a movie is in the watchlist.
 * @param {number} movieId The ID of the movie to check.
 * @returns {boolean} True if the movie is in the watchlist, false otherwise.
 */
export const isMovieInWatchlist = (movieId) => {
  const currentWatchlist = getWatchlist();
  return currentWatchlist.some((movie) => movie.id === movieId);
};

/**
 * Checks if a movie is marked as watched in the watchlist.
 * @param {number} movieId The ID of the movie to check.
 * @returns {boolean} True if the movie is in the watchlist and marked as watched, false otherwise.
 */
export const isMovieWatched = (movieId) => {
  const currentWatchlist = getWatchlist();
  const movie = currentWatchlist.find((m) => m.id === movieId);
  return movie ? movie.watched : false;
};
