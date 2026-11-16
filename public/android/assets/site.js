/* Off-canvas navigation for phones. No dependencies. */
(function () {
  "use strict";
  var body = document.body;
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("nav");
  var scrim = document.querySelector(".scrim");
  if (!btn || !nav) return;

  function set(open) {
    body.classList.toggle("nav-open", open);
    btn.setAttribute("aria-expanded", String(open));
    if (open) {
      var cur = nav.querySelector("a.cur");
      if (cur) nav.scrollTop = Math.max(0, cur.offsetTop - nav.clientHeight / 2);
    }
  }
  btn.addEventListener("click", function () {
    set(!body.classList.contains("nav-open"));
  });
  if (scrim) scrim.addEventListener("click", function () { set(false); });
  nav.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest("a")) set(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") set(false);
  });
  var cur = nav.querySelector("a.cur");
  if (cur) nav.scrollTop = Math.max(0, cur.offsetTop - nav.clientHeight / 2);
})();

/* Theme toggle: light / dark / system, remembered in this browser. */
(function () {
  "use strict";
  var btn = document.querySelector(".theme-btn");
  if (!btn) return;
  var root = document.documentElement;
  function cur() { return root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); }
  function paint() { btn.textContent = cur() === "dark" ? "\u2600" : "\u263E"; btn.setAttribute("aria-label", cur() === "dark" ? "Switch to light theme" : "Switch to dark theme"); }
  btn.addEventListener("click", function () {
    var next = cur() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("apb-theme", next); } catch (e) { /* ignore */ }
    paint();
    if (document.querySelector("pre.mermaid")) location.reload();
  });
  paint();
})();
