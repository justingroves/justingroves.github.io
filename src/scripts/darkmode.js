const theme = (() => {
  const localStorageTheme = localStorage?.getItem("theme") ?? "";

  if (["dark", "light"].includes(localStorageTheme)) {
    return localStorageTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
})();

document.documentElement.classList.toggle("dark", theme === "dark");

function toggleTheme() {
  const root = document.documentElement;

  root.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    root.classList.contains("dark") ? "dark" : "light",
  );
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.addEventListener("click", toggleTheme);
  });
});
