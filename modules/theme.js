// Theme Module - Handles dark/light mode functionality

function createThemeToggle() {
  const nav = document.querySelector(".nav_");

  const themeToggle = document.createElement("div");
  themeToggle.id = "theme-toggle";
  themeToggle.className = "theme-toggle";
  themeToggle.setAttribute("title", "Toggle light/dark mode");

  const savedTheme = localStorage.getItem("theme") || "light";

  themeToggle.innerHTML =
    savedTheme === "light"
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';

  const toggleMenu = document.querySelector(".toggleMenu");
  nav.insertBefore(themeToggle, toggleMenu);

  document.body.classList.toggle("dark-theme", savedTheme === "dark");

  themeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-theme");

    themeToggle.innerHTML = isDarkMode
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });
}

// Initialize the theme toggle
export function initTheme() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createThemeToggle);
  } else {
    createThemeToggle();
  }
}
