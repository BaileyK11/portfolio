// Page navigation
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

function navigateTo(pageName) {
  // Fade out current active page
  const activePage = document.querySelector(".page.active");
  if (activePage) {
    activePage.classList.add("fade-out");
    activePage.classList.remove("active");
  }

  // After fade out, fade in new page
  setTimeout(() => {
    pages.forEach((page) => {
      page.classList.remove("fade-out");
    });

    const targetPage = document.querySelector(`.page[data-page="${pageName}"]`);
    if (targetPage) {
      targetPage.classList.add("active");
    }

    // Update active nav link
    navLinks.forEach((link) => {
      link.classList.remove("active-link");
      if (link.dataset.page === pageName) {
        link.classList.add("active-link");
      }
    });

    // Scroll to top
    window.scrollTo(0, 0);
  }, 300);
}

// Add click listeners to all nav links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const pageName = link.dataset.page;
    navigateTo(pageName);
  });
});

// Animate elements when they appear on a page
function animatePageElements() {
  const activePage = document.querySelector(".page.active");
  if (!activePage) return;

  const elements = activePage.querySelectorAll(
    "h2, .text, .cells, .group, .headshot, .links"
  );

  elements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";

    setTimeout(() => {
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100 * (index + 1));
  });
}

// Run animation on page load and navigation
const observer = new MutationObserver(() => {
  const activePage = document.querySelector(".page.active");
  if (activePage) {
    animatePageElements();
  }
});

observer.observe(document.querySelector("main"), {
  subtree: true,
  attributeFilter: ["class"],
});

// Initial animation
animatePageElements();

// Keyboard navigation (arrow keys)
document.addEventListener("keydown", (e) => {
  const pageOrder = ["hero", "skills", "testimony", "contact"];
  const activePage = document.querySelector(".page.active");
  const currentIndex = pageOrder.indexOf(activePage.dataset.page);

  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    e.preventDefault();
    const nextIndex = Math.min(currentIndex + 1, pageOrder.length - 1);
    navigateTo(pageOrder[nextIndex]);
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    const prevIndex = Math.max(currentIndex - 1, 0);
    navigateTo(pageOrder[prevIndex]);
  }
});
