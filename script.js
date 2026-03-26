function createErrorDetails(code, message, context = {}) {
  return {
    code,
    message,
    context,
    timestamp: new Date().toISOString(),
  };
}

function showUserError(message) {
  const existingMessage = document.querySelector(".user-error-message");

  if (existingMessage) {
    existingMessage.remove();
  }

  const errorBox = document.createElement("div");
  errorBox.className = "user-error-message";
  errorBox.textContent = message;

  document.body.prepend(errorBox);
}

/**
 * Smoothly scrolls the page to the element with the given selector.
 *
 * @param {string} selector CSS selector of the target element.
 * @returns {void}
 */
function scrollToSection(selector) {
  try {
    window.appLogger.logDebug("Спроба прокрутки до секції", { selector });

    const target = document.querySelector(selector);

    if (!target) {
      const error = createErrorDetails(
        "NAV-001",
        "Не знайдено цільову секцію",
        { selector },
      );
      window.appLogger.logWarn(error.message, error);
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.appLogger.logInfo("Успішна прокрутка до секції", { selector });
  } catch (error) {
    const errorDetails = createErrorDetails(
      "NAV-500",
      "Помилка під час прокрутки до секції",
      {
        selector,
        errorMessage: error.message,
      },
    );

    window.appLogger.logError(errorDetails.message, errorDetails);
    showUserError(
      "Сталася помилка під час переходу по сторінці. Спробуйте ще раз.",
    );
  }
}

/**
 * Updates the footer year with the current year.
 *
 * @param {string} selector CSS selector of the element where the year should be displayed.
 * @returns {void}
 */
function updateFooterYear(selector) {
  try {
    const yearElement = document.querySelector(selector);

    if (!yearElement) {
      const error = createErrorDetails(
        "UI-001",
        "Не знайдено елемент для оновлення року",
        {
          selector,
        },
      );
      window.appLogger.logWarn(error.message, error);
      return;
    }

    yearElement.textContent = new Date().getFullYear();
    window.appLogger.logInfo("Рік у футері успішно оновлено", { selector });
  } catch (error) {
    const errorDetails = createErrorDetails(
      "UI-500",
      "Помилка під час оновлення року в футері",
      {
        selector,
        errorMessage: error.message,
      },
    );

    window.appLogger.logError(errorDetails.message, errorDetails);
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
  try {
    const button = document.querySelector(selector);

    if (!button) {
      const error = createErrorDetails(
        "UI-002",
        "Не знайдено кнопку повернення догори",
        {
          selector,
        },
      );
      window.appLogger.logWarn(error.message, error);
      return;
    }

    if (window.scrollY > offset) {
      button.classList.add("visible");
    } else {
      button.classList.remove("visible");
    }
  } catch (error) {
    const errorDetails = createErrorDetails(
      "UI-500",
      "Помилка під час перемикання видимості кнопки повернення догори",
      {
        selector,
        offset,
        errorMessage: error.message,
      },
    );

    window.appLogger.logError(errorDetails.message, errorDetails);
  }
}

/**
 * Initializes interactive behaviors for the landing page.
 *
 * @returns {void}
 */
function initializeLandingPage() {
  try {
    window.appLogger.logInfo("Ініціалізація лендінгу розпочата", {
      page: window.location.pathname,
      logLevel: window.appLogger.getCurrentLogLevel(),
    });

    updateFooterYear("#current-year");

    const backToTopButton = document.querySelector("#back-to-top");
    const aboutButton = document.querySelector('a[href="#about"]');
    const contactsButton = document.querySelector('a[href="#contacts"]');

    if (aboutButton) {
      aboutButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.appLogger.logInfo("Натиснуто пункт меню About", {
          action: "navigate",
          target: "#about",
        });
        scrollToSection("#about");
      });
    } else {
      window.appLogger.logWarn("Пункт меню About не знайдено", {
        code: "NAV-002",
      });
    }

    if (contactsButton) {
      contactsButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.appLogger.logInfo("Натиснуто пункт меню Contacts", {
          action: "navigate",
          target: "#contacts",
        });
        scrollToSection("#contacts");
      });
    } else {
      window.appLogger.logWarn("Пункт меню Contacts не знайдено", {
        code: "NAV-003",
      });
    }

    if (backToTopButton) {
      window.addEventListener("scroll", () => {
        toggleBackToTopButton("#back-to-top");
      });

      backToTopButton.addEventListener("click", () => {
        window.appLogger.logInfo("Натиснуто кнопку повернення догори", {
          action: "back_to_top",
        });
        scrollToSection("body");
      });
    } else {
      window.appLogger.logWarn("Кнопка повернення догори не знайдена", {
        code: "UI-003",
      });
    }

    window.appLogger.logInfo("Ініціалізація лендінгу завершена успішно");
  } catch (error) {
    const errorDetails = createErrorDetails(
      "APP-500",
      "Критична помилка ініціалізації сторінки",
      {
        errorMessage: error.message,
        page: window.location.pathname,
      },
    );

    window.appLogger.logError(errorDetails.message, errorDetails);
    showUserError(
      "Сталася помилка під час завантаження сторінки. Оновіть сторінку або спробуйте пізніше.",
    );
  }
}

window.addEventListener("error", (event) => {
  const errorDetails = createErrorDetails(
    "JS-500",
    "Глобальна JavaScript-помилка",
    {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    },
  );

  window.appLogger.logError(errorDetails.message, errorDetails);
});

document.addEventListener("DOMContentLoaded", initializeLandingPage);
