// Causeu the social-media icons to bounce on desktop
document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".social-icons i");

  if (!icons) return; // safety check

  icons.forEach((icon) => {
    const randomDelay = () =>
      // 1.5 - 2.5 minutes (ms)
      Math.random() * 30000 + 150000;

    const bounce = () => {
      icon.classList.add("icon-bounce");
      setTimeout(() => icon.classList.remove("icon-bounce"), 700);
      setTimeout(bounce, randomDelay());
    };

    setTimeout(bounce, randomDelay());
  });
});

// Open and close the navigation menu on mobile
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav_menu = document.querySelector(".nav-menu");
  const nav_exit = document.querySelector(".nav-exit");

  if (!toggle || !nav_menu || !nav_exit) return;

  toggle.addEventListener("click", () => {
    nav_menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", nav_menu.classList.contains("open"));
  });

  nav_exit.addEventListener("click", () => {
    nav_menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  });
});

// Set the current year for the copyright
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
