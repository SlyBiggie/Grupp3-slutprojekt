// Simple search functionality for message filtering (Linns feature)

export function initSearch() {
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.id = "message-search";
  searchInput.className = "message-search";
  searchInput.placeholder = "Search messages...";

  const messageDiv = document.getElementById("messageColumn");
  if (messageDiv && messageDiv.parentNode) {
    messageDiv.parentNode.insertBefore(searchInput, messageDiv);
  }

  searchInput.addEventListener("input", filterMessages);
}

// Filter messages based on search input value

function filterMessages() {
  const searchTerm = document
    .getElementById("message-search")
    .value.toLowerCase()
    .trim();
  const messages = document.querySelectorAll(".message");

  messages.forEach((message) => {
    const userName = message
      .querySelector(".user-name")
      .textContent.toLowerCase();
    const userMessage = message
      .querySelector(".message-content p")
      .textContent.toLowerCase();

    if (
      searchTerm === "" ||
      userName.includes(searchTerm) ||
      userMessage.includes(searchTerm)
    ) {
      message.style.display = "";
    } else {
      message.style.display = "none";
    }
  });
}
