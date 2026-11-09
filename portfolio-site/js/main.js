/*
 * Small enhancements only. The page is complete without this file:
 * strokes render fully drawn, the clock shows "San Jose", the copy button stays hidden.
 */
(() => {
  "use strict";

  const TIME_ZONE = "America/Los_Angeles";
  const CLOCK_INTERVAL_MS = 15000;
  const COPY_RESET_MS = 2200;
  const DRAW_THRESHOLD = 0.35;

  const COPY_LABELS = Object.freeze({
    idle: "Copy address",
    copied: "Copied",
    error: "Copy failed — select it instead",
  });

  const COPY_STATUS = Object.freeze({
    idle: "",
    copied: "Email address copied to clipboard.",
    error: "Couldn't copy. Select the address to copy it manually.",
  });

  function createClockFormatter() {
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, hour: "numeric", minute: "2-digit" });
    } catch (error) {
      return null; // No time zone support: keep the static "San Jose" label.
    }
  }

  function startClock() {
    const clock = document.querySelector(".js-clock");
    const separator = document.querySelector(".js-clock-sep");
    const formatter = typeof Intl === "undefined" ? null : createClockFormatter();
    if (!clock || !separator || !formatter) return;

    const render = () => {
      const now = new Date();
      clock.textContent = formatter.format(now);
      clock.setAttribute("datetime", now.toISOString());
    };

    render();
    separator.hidden = false;
    window.setInterval(render, CLOCK_INTERVAL_MS);
  }

  function setYear() {
    const year = document.querySelector(".js-year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function prefersReducedMotion() {
    return Boolean(window.matchMedia) && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function armDrawings() {
    const targets = document.querySelectorAll("[data-draw]");
    if (!targets.length || !("IntersectionObserver" in window) || prefersReducedMotion()) return;

    document.documentElement.classList.add("draw-ready");

    const observer = new IntersectionObserver((entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => {
          entry.target.classList.add("is-drawn");
          observer.unobserve(entry.target);
        });
    }, { threshold: DRAW_THRESHOLD });

    targets.forEach((target) => observer.observe(target));
  }

  function setCopyState(button, status, state) {
    button.setAttribute("data-state", state);
    button.textContent = COPY_LABELS[state];
    status.textContent = COPY_STATUS[state];
  }

  function enableCopy() {
    const button = document.querySelector(".js-copy");
    const status = document.querySelector(".js-copy-status");
    const canCopy = Boolean(navigator.clipboard) && window.isSecureContext;
    if (!button || !status || !canCopy) return;

    let resetTimer = null;
    button.hidden = false;

    button.addEventListener("click", async () => {
      window.clearTimeout(resetTimer);
      button.disabled = true;

      try {
        await navigator.clipboard.writeText(button.getAttribute("data-copy") || "");
        setCopyState(button, status, "copied");
      } catch (error) {
        setCopyState(button, status, "error");
      } finally {
        button.disabled = false;
        resetTimer = window.setTimeout(() => setCopyState(button, status, "idle"), COPY_RESET_MS);
      }
    });
  }

  function init() {
    startClock();
    setYear();
    armDrawings();
    enableCopy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
