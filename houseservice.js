// Navbar scroll effect
window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 20);
});

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((el) => {
      if (el.isIntersecting) {
        el.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Steps reveal
const stepObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((el) => {
      if (el.isIntersecting) {
        const steps = document.querySelectorAll(".step");
        steps.forEach((step, i) => {
          setTimeout(() => step.classList.add("visible"), i * 150);
        });
      }
    });
  },
  { threshold: 0.2 },
);

const stepsSection = document.querySelector(".steps-list");
if (stepsSection) stepObserver.observe(stepsSection);

// Reputation bars animate on scroll
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((el) => {
      if (el.isIntersecting) {
        document.querySelectorAll(".rep-bar").forEach((bar) => {
          bar.style.width = bar.getAttribute("data-width");
        });
      }
    });
  },
  { threshold: 0.3 },
);

const repSection = document.querySelector(".reputation-section");
if (repSection) barObserver.observe(repSection);

// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Counter animation for stats
function animateCounter(el, target, suffix = "") {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString("pt-BR") + suffix;
  }, 25);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll(".stat-num");
        const targets = [2400, 15000, 4.9, 47];
        const suffixes = ["+", "+", " ★", ""];
        nums.forEach((el, i) => {
          if (i === 2) {
            let v = 0;
            const t = setInterval(() => {
              v += 0.1;
              if (v >= 4.9) {
                v = 4.9;
                clearInterval(t);
              }
              el.textContent = v.toFixed(1) + " ★";
            }, 30);
          } else {
            animateCounter(el, targets[i], suffixes[i]);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const statsBanner = document.querySelector(".stats-banner");
if (statsBanner) statsObserver.observe(statsBanner);
