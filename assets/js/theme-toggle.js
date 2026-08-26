(function () {
  "use strict";

  var storageKey = "portfolio-theme";
  var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;

    if (persist) {
      try { localStorage.setItem(storageKey, theme); } catch (error) {}
    }

    var toggle = document.querySelector(".theme-toggle");
    if (toggle) {
      var isDark = theme === "dark";
      toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      toggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.querySelector(".theme-toggle__sun").hidden = !isDark;
      toggle.querySelector(".theme-toggle__moon").hidden = isDark;
    }
  }

  function addToggle() {
    var navigation = document.querySelector(".greedy-nav");
    if (!navigation || navigation.querySelector(".theme-toggle")) return;

    var button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.innerHTML =
      '<span class="theme-toggle__sun" aria-hidden="true">☀</span>' +
      '<span class="theme-toggle__moon" aria-hidden="true">☾</span>';
    navigation.appendChild(button);

    button.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
    });

    applyTheme(currentTheme(), false);
  }

  document.addEventListener("DOMContentLoaded", addToggle);

  mediaQuery.addEventListener("change", function (event) {
    var saved = null;
    try { saved = localStorage.getItem(storageKey); } catch (error) {}
    if (!saved) applyTheme(event.matches ? "dark" : "light", false);
  });
}());
