// News detail component
const NewsDetail = {
  // Create news detail view
  create(article, onBack) {
    const {
      title,
      author,
      description,
      content,
      urlToImage,
      publishedAt,
      url,
      isUserGenerated,
    } = article;

    // Format date
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    // Create main container
    const container = document.createElement("div");
    container.className = "news-detail";

    // Back button
    const backButton = document.createElement("button");
    backButton.className = "back-button";
    backButton.textContent = "← Back to News";
    backButton.addEventListener("click", onBack);

    // Article container
    const articleElement = document.createElement("article");
    articleElement.className = "news-detail-content";

    // Header
    const header = document.createElement("header");
    header.className = "news-detail-header";

    const titleElement = document.createElement("h1");
    titleElement.className = "news-detail-title";
    titleElement.textContent = title;

    const meta = document.createElement("div");
    meta.className = "news-detail-meta";

    const authorElement = document.createElement("span");
    authorElement.className = "news-detail-author";
    authorElement.textContent = `By ${author || "Unknown"}`;

    const dateElement = document.createElement("span");
    dateElement.className = "news-detail-date";
    dateElement.textContent = formatDate(publishedAt);

    meta.appendChild(authorElement);
    meta.appendChild(dateElement);

    // User story badge
    if (isUserGenerated) {
      const badge = document.createElement("span");
      badge.className = "user-story-badge";
      badge.textContent = "User Story";
      meta.appendChild(badge);
    }

    header.appendChild(titleElement);
    header.appendChild(meta);

    // Image
    let imageContainer = null;
    if (urlToImage) {
      imageContainer = document.createElement("div");
      imageContainer.className = "news-detail-image";

      const img = document.createElement("img");
      img.src = urlToImage;
      img.alt = title;
      img.onerror = () => {
        img.src =
          "https://dummyimage.com/800x400/000000/ffffff.png&text=No+Image";
      };

      imageContainer.appendChild(img);
    }

    // Body
    const body = document.createElement("div");
    body.className = "news-detail-body";

    // Description
    if (description) {
      const descriptionElement = document.createElement("p");
      descriptionElement.className = "news-detail-description";
      descriptionElement.textContent = description;
      body.appendChild(descriptionElement);
    }

    // Content
    if (content) {
      const contentContainer = document.createElement("div");
      contentContainer.className = "news-detail-content-text";

      const paragraphs = content.split("\n");
      paragraphs.forEach((paragraph) => {
        if (paragraph.trim()) {
          const p = document.createElement("p");
          p.textContent = paragraph;
          contentContainer.appendChild(p);
        }
      });

      body.appendChild(contentContainer);
    }

    // Footer
    let footer = null;
    if (!isUserGenerated && url) {
      footer = document.createElement("footer");
      footer.className = "news-detail-footer";

      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "read-more-link";
      link.textContent = "Read full article on original site →";

      footer.appendChild(link);
    }

    // Assemble everything
    articleElement.appendChild(header);
    if (imageContainer) articleElement.appendChild(imageContainer);
    articleElement.appendChild(body);
    if (footer) articleElement.appendChild(footer);

    container.appendChild(backButton);
    container.appendChild(articleElement);

    return container;
  },
};
