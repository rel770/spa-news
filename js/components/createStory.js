// Create story component
const CreateStory = {
  // Create story form
  create(onStoryCreated, onNavigate) {
    const container = document.createElement("div");
    container.className = "create-story";

    const formContainer = document.createElement("div");
    formContainer.className = "create-story-container";

    const title = document.createElement("h2");
    title.className = "create-story-title";
    title.textContent = "Create New Story";

    const form = document.createElement("form");
    form.className = "create-story-form";

    // Form state
    const formData = {
      title: "",
      author: "",
      description: "",
      content: "",
      urlToImage: "",
    };

    // Create form fields
    const fields = [
      {
        id: "title",
        label: "Title *",
        type: "input",
        required: true,
        placeholder: "Enter story title...",
      },
      {
        id: "author",
        label: "Author",
        type: "input",
        placeholder: "Enter author name...",
      },
      {
        id: "description",
        label: "Description",
        type: "textarea",
        rows: 3,
        placeholder: "Enter a brief description...",
      },
      {
        id: "content",
        label: "Content *",
        type: "textarea",
        rows: 8,
        required: true,
        placeholder: "Enter the full story content...",
      },
    ];

    fields.forEach((field) => {
      const formGroup = document.createElement("div");
      formGroup.className = "form-group";

      const label = document.createElement("label");
      label.htmlFor = field.id;
      label.textContent = field.label;

      let input;
      if (field.type === "textarea") {
        input = document.createElement("textarea");
        input.rows = field.rows;
      } else {
        input = document.createElement("input");
        input.type = "text";
      }

      input.id = field.id;
      input.placeholder = field.placeholder;
      if (field.required) input.required = true;

      input.addEventListener("input", (e) => {
        formData[field.id] = e.target.value;
      });

      formGroup.appendChild(label);
      formGroup.appendChild(input);
      form.appendChild(formGroup);
    });

    // Image upload section
    const imageGroup = document.createElement("div");
    imageGroup.className = "form-group";

    const imageLabel = document.createElement("label");
    imageLabel.htmlFor = "image";
    imageLabel.textContent = "Image";

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "image";
    fileInput.accept = "image/*";

    const imageHelp = document.createElement("small");
    imageHelp.textContent = "Or enter image URL:";

    const urlInput = document.createElement("input");
    urlInput.type = "url";
    urlInput.placeholder = "https://example.com/image.jpg";

    const imagePreview = document.createElement("div");
    imagePreview.className = "image-preview";
    imagePreview.style.display = "none";

    // File upload handler
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          formData.urlToImage = event.target.result;
          urlInput.value = event.target.result;
          updateImagePreview();
        };
        reader.readAsDataURL(file);
      }
    });

    // URL input handler
    urlInput.addEventListener("input", (e) => {
      formData.urlToImage = e.target.value;
      updateImagePreview();
    });

    // Update image preview
    const updateImagePreview = () => {
      if (formData.urlToImage) {
        imagePreview.innerHTML = "";
        const img = document.createElement("img");
        img.src = formData.urlToImage;
        img.alt = "Preview";
        img.onerror = () => {
          imagePreview.style.display = "none";
        };
        img.onload = () => {
          imagePreview.style.display = "block";
        };
        imagePreview.appendChild(img);
      } else {
        imagePreview.style.display = "none";
      }
    };

    imageGroup.appendChild(imageLabel);
    imageGroup.appendChild(fileInput);
    imageGroup.appendChild(imageHelp);
    imageGroup.appendChild(urlInput);
    imageGroup.appendChild(imagePreview);

    // Submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "submit-button";
    submitButton.textContent = "Create Story";

    // Message container
    const messageContainer = document.createElement("div");
    messageContainer.className = "submit-message";
    messageContainer.style.display = "none";

    // Form submit handler
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Validate form
      if (!formData.title.trim() || !formData.content.trim()) {
        showMessage(
          "Please fill in at least the title and content fields.",
          "error"
        );
        return;
      }

      submitButton.disabled = true;
      submitButton.textContent = "Creating...";
      messageContainer.style.display = "none";

      try {
        // Save the story
        const newStory = NewsService.saveUserStory(formData);

        // Show success message
        showMessage("Story created successfully!", "success");

        // Reset form
        form.reset();
        Object.keys(formData).forEach((key) => (formData[key] = ""));
        updateImagePreview();

        // Call callback if provided
        if (onStoryCreated) {
          onStoryCreated(newStory);
        }

        // Navigate to home after 2 seconds
        setTimeout(() => {
          onNavigate("home");
        }, 2000);
      } catch (error) {
        showMessage("Error creating story. Please try again.", "error");
        console.error("Error creating story:", error);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Create Story";
      }
    });

    // Show message function
    const showMessage = (text, type) => {
      messageContainer.textContent = text;
      messageContainer.className = `submit-message ${type}`;
      messageContainer.style.display = "block";
    };

    // Assemble form
    form.appendChild(imageGroup);
    form.appendChild(submitButton);
    form.appendChild(messageContainer);

    formContainer.appendChild(title);
    formContainer.appendChild(form);
    container.appendChild(formContainer);

    return container;
  },
};
