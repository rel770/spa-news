// News API service
const NewsService = {
  // Fetch news from API or cache
  async fetchNews(query = CONFIG.DEFAULT_QUERY) {
    const cacheKey = `news_${query}`;

    // Try to get from cache first
    const cachedNews = StorageUtils.get(cacheKey);
    if (cachedNews) {
      console.log("Loading news from cache");
      return cachedNews;
    }

    // Fetch from API
    try {
      const url = `${CONFIG.NEWS_API_URL}?q=${encodeURIComponent(
        query
      )}&apiKey=${CONFIG.API_KEY}&pageSize=20&sortBy=publishedAt`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "ok") {
        // Cache the results
        StorageUtils.save(cacheKey, data.articles);
        console.log("News fetched from API and cached");
        return data.articles;
      } else {
        throw new Error(data.message || "API error");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  },

  // Get user-created stories from localStorage
  getUserStories: () => StorageUtils.get("user_stories") || [],

  // Save a new user story
  saveUserStory(story) {
    const stories = this.getUserStories();
    const newStory = {
      ...story,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      isUserGenerated: true,
    };
    stories.unshift(newStory); // Add to beginning
    StorageUtils.save("user_stories", stories);
    return newStory;
  },
};
