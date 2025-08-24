// Router for managing navigation
const Router = {
  currentPage: "home",
  selectedArticle: null,
  mainContent: null,

  // Initialize router
  init() {
    this.mainContent = document.getElementById("main-content");
    this.setupNavigation();
    this.navigate("home");
  },

  // Setup navigation event listeners
  setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const page = e.target.getAttribute("data-page");
        this.navigate(page);
      });
    });
  },

  // Navigate to a page
  navigate(page, data = null) {
    this.currentPage = page;
    if (data) this.selectedArticle = data;

    // Update navigation active state
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-page") === page) {
        link.classList.add("active");
      }
    });

    // Clear main content
    this.mainContent.innerHTML = "";

    // Add fade animation
    this.mainContent.style.opacity = "0";

    setTimeout(() => {
      // Render current page
      this.renderCurrentPage();
      this.mainContent.style.opacity = "1";
    }, 100);
  },

  // Render the current page
  renderCurrentPage() {
    let content;

    switch (this.currentPage) {
      case "home":
        content = HomePage.create((article) => {
          this.navigate("detail", article);
        });
        break;

      case "detail":
        content = NewsDetail.create(this.selectedArticle, () => {
          this.navigate("home");
        });
        break;

      case "create":
        content = CreateStory.create(
          (newStory) => {
            console.log("New story created:", newStory);
          },
          (page) => {
            this.navigate(page);
          }
        );
        break;

      default:
        content = HomePage.create((article) => {
          this.navigate("detail", article);
        });
        break;
    }

    this.mainContent.appendChild(content);
  },
};
