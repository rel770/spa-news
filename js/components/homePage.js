// Home page component
const HomePage = {
  // Create home page
  create(onSelectArticle) {
    const container = document.createElement("div");
    container.className = "home-page";

    // Header
    const header = document.createElement("div");
    header.className = "home-header";

    const title = document.createElement("h2");
    title.textContent = "Latest News";

    const refreshButton = document.createElement("button");
    refreshButton.className = "refresh-button";
    refreshButton.innerHTML = "Refresh";
    refreshButton.title = "Refresh news";

    header.appendChild(title);
    header.appendChild(refreshButton);

    // News grid
    const newsGrid = document.createElement("div");
    newsGrid.className = "news-grid";

    // Loading state
    const showLoading = () => {
      newsGrid.innerHTML = "";
      const loading = document.createElement("div");
      loading.className = "loading";
      loading.innerHTML = `
                <div class="loading-spinner"></div>
                <p>Loading news...</p>
            `;
      newsGrid.appendChild(loading);
    };

    // Error state
    const showError = (message) => {
      newsGrid.innerHTML = "";
      const error = document.createElement("div");
      error.className = "error";
      error.innerHTML = `
                <p>${message}</p>
                <button onclick="loadNews()">Try Again</button>
            `;
      newsGrid.appendChild(error);
    };

    // Load and display news
    const loadNews = async () => {
      try {
        showLoading();

        // Get API news and user stories
        const [apiNews, userStories] = await Promise.all([
          NewsService.fetchNews(),
          Promise.resolve(NewsService.getUserStories()),
        ]);

        // Combine and sort by date
        const allArticles = [...userStories, ...apiNews].sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );

        // Clear grid and add cards
        newsGrid.innerHTML = "";

        if (allArticles.length > 0)
          allArticles.forEach((article, idx) =>
            newsGrid.appendChild(NewsCard.create(article, onSelectArticle))
          );
        else {
          const noNews = document.createElement("p");
          noNews.className = "no-news";
          noNews.textContent = "No news available.";
          newsGrid.appendChild(noNews);
        }
      } catch (error) {
        showError("Failed to load news. Please try again later.");
        console.error("Error loading news:", error);
      }
    };

    // Refresh handler
    const handleRefresh = () => {
      // Clear cache and reload
      StorageUtils.remove("news_technology");
      loadNews();
    };

    refreshButton.addEventListener("click", handleRefresh);

    // Initial load
    loadNews();

    container.appendChild(header);
    container.appendChild(newsGrid);

    // Expose loadNews function globally for error retry
    window.loadNews = loadNews;

    return container;
  },
};
