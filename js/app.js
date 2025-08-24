// Main application initialization
class App {
  constructor() {
    this.init();
  }

  // Initialize the application
  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading")
      document.addEventListener("DOMContentLoaded", () => this.start());
    else this.start();
  }

  // Start the application
  start() {
    console.log("SPA News App started");

    // Initialize router
    Router.init();

    // Add CSS transitions
    this.addTransitions();
  }

  // Add CSS transitions for smooth navigation
  addTransitions() {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.style.transition = "opacity 0.3s ease-in-out";
    }
  }
}

// Start the application
new App();
