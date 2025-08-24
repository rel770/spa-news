// News card component
const NewsCard = {
  // Create a news card element
  create(article, onClick) {
    const { title, author, urlToImage, publishedAt, isUserGenerated } = article;

    // Format date
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    // Create card element
    const card = document.createElement("div");
    card.className = `news-card ${isUserGenerated ? "user-generated" : ""}`;
    card.addEventListener("click", () => onClick(article));

    // Create image container
    const imageContainer = document.createElement("div");
    imageContainer.className = "news-card-image";

    const img = document.createElement("img");
    img.src =
      urlToImage ||
      "https://dummyimage.com/320x200/000000/ffffff.png&text=No+Image";
    img.alt = title;
    img.onerror = () => {
      img.src =
        "https://dummyimage.com/320x200/000000/ffffff.png&text=No+Image";
    };

    imageContainer.appendChild(img);

    // Add user badge if user-generated
    if (isUserGenerated) {
      const userBadge = document.createElement("div");
      userBadge.className = "user-badge";
      userBadge.textContent = "User Story";
      imageContainer.appendChild(userBadge);
    }

    // Create content container
    const content = document.createElement("div");
    content.className = "news-card-content";

    const titleElement = document.createElement("h3");
    titleElement.className = "news-card-title";
    titleElement.textContent = title;

    const meta = document.createElement("div");
    meta.className = "news-card-meta";

    const authorElement = document.createElement("span");
    authorElement.className = "news-card-author";
    authorElement.textContent = author || "Unknown";

    const dateElement = document.createElement("span");
    dateElement.className = "news-card-date";
    dateElement.textContent = formatDate(publishedAt);

    meta.appendChild(authorElement);
    meta.appendChild(dateElement);

    content.appendChild(titleElement);
    content.appendChild(meta);

    card.appendChild(imageContainer);
    card.appendChild(content);

    return card;
  },
};
