document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".social-icon i");

  if (!icons) return; // safety check

  icons.forEach((icon) => {
    const randomDelay = () =>
      // 2.5 - 3.5 minutes (ms)
      Math.random() * 60000 + 150000;

    const bounce = () => {
      icon.classList.add("icon-bounce");
      setTimeout(() => icon.classList.remove("icon-bounce"), 700);
      setTimeout(bounce, randomDelay());
    };

    setTimeout(bounce, randomDelay());
  });
});
