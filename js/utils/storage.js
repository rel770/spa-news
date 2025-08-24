// Local storage utilities for caching
const StorageUtils = {
  // Save data to localStorage
  save: (key, data) => {
    try {
      const item = {
        data: data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },

  // Get data from localStorage
  get: (key, maxAge = CONFIG.CACHE_DURATION) => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const parsed = JSON.parse(item);
      const now = Date.now();

      // Check if data is expired
      if (now - parsed.timestamp > maxAge) {
        localStorage.removeItem(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },

  // Clear specific key
  remove: (key) => localStorage.removeItem(key),
  
  // Clear all cache
  clearAll: () => localStorage.clear(),
};
