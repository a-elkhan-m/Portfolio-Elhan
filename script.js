document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);
  const body = document.body;
  const nav = $("nav");
  const navLinks = nav.querySelectorAll("a");
  const sections = document.querySelectorAll("section");
  const themeToggle = $("themeToggle");
  const themeIcon = themeToggle.querySelector(".theme-icon");
  const backToTopBtn = $("backToTop");
  const form = $("contactForm");
  const successMsg = $("successMsg");

  const setTheme = (light) => {
    body.classList.toggle("light-theme", light);
    themeIcon.textContent = light ? "🌙" : "☀️";
    localStorage.setItem("theme", light ? "light" : "dark");
  };

  setTheme(localStorage.getItem("theme") === "light");

  themeToggle.addEventListener("click", () => {
    setTheme(!body.classList.contains("light-theme"));
  });

  $("burger").addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("active"));
  });

  window.addEventListener("scroll", () => {
    backToTopBtn.classList.toggle("show", window.scrollY > 300);

    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = form.querySelector("button");
    const originalText = btn.textContent;

    btn.textContent = "Отправка...";
    btn.style.opacity = "0.7";

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.opacity = "1";
      successMsg.classList.add("show");
      form.reset();

      setTimeout(() => successMsg.classList.remove("show"), 4000);
    }, 1000);
  });
});
