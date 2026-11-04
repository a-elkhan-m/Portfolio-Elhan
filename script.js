document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav a");
  const sections = document.querySelectorAll("section");
  const revealElements = document.querySelectorAll(".reveal");

  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("successMsg");

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector(".theme-icon");
  const backToTopBtn = document.getElementById("backToTop");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    body.classList.add("light-theme");
    themeIcon.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    if (body.classList.contains("light-theme")) {
      themeIcon.textContent = "🌙";
      localStorage.setItem("theme", "light");
    } else {
      themeIcon.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    }
  });

  burger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current) && current !== "") {
        link.classList.add("active");
      }
    });
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));

  if (form) {
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

        setTimeout(() => {
          successMsg.classList.remove("show");
        }, 4000);
      }, 1000);
    });
  }
});
