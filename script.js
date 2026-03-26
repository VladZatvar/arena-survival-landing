/**
 * Smoothly scrolls the page to the element with the given selector.
 *
 * @param {string} selector CSS selector of the target element.
 * @returns {void}
 */
function scrollToSection(selector) {
  const target = document.querySelector(selector);

  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

/**
 * Updates the footer year with the current year.
 *
 * @param {string} selector CSS selector of the element where the year should be displayed.
 * @returns {void}
 */
function updateFooterYear(selector) {
  const yearElement = document.querySelector(selector);

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Toggles visibility of the back-to-top button depending on scroll position.
 *
 * @param {string} selector CSS selector of the button element.
 * @param {number} offset Scroll position after which the button becomes visible.
 * @returns {void}
 */
function toggleBackToTopButton(selector, offset = 300) {
  const button = document.querySelector(selector);

  if (!button) {
    return;
  }

  if (window.scrollY > offset) {
    button.classList.add("visible");
  } else {
    button.classList.remove("visible");
  }
}

/**
 * Initializes interactive behaviors for the landing page.
 *
 * @returns {void}
 */
function initializeLandingPage() {
  updateFooterYear("#current-year");

  const backToTopButton = document.querySelector("#back-to-top");
  const aboutButton = document.querySelector('a[href="#about"]');
  const contactsButton = document.querySelector('a[href="#contacts"]');

  if (aboutButton) {
    aboutButton.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection("#about");
    });
  }

  if (contactsButton) {
    contactsButton.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToSection("#contacts");
    });
  }

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      toggleBackToTopButton("#back-to-top");
    });

    backToTopButton.addEventListener("click", () => {
      scrollToSection("body");
    });
  }
}

document.addEventListener("DOMContentLoaded", initializeLandingPage);
