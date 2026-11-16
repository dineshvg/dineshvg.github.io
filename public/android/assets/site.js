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
