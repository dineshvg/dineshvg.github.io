/* Flashcards with simple spaced repetition. Progress lives in localStorage on this device. */
(function () {
  "use strict";
  var root = document.getElementById("app");
  var dataEl = document.getElementById("deck-data");
  if (!root || !dataEl) return;
  var data = JSON.parse(dataEl.textContent);

  var KEY = "apb-cards-v1";
  var STEPS = [1, 3, 7, 14, 30]; // days until a card is due again, by box 1..5
  var DAY = 86400000;
  var day = function () { return Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / DAY); };

  var store = {};
  try { store = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { store = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* private mode */ } }

  var cards = [];
  data.decks.forEach(function (d) {
    d.cards.forEach(function (c) { cards.push({ id: c.id, q: c.q, a: c.a, deck: d.id, deckTitle: d.title }); });
  });

  var isNew = function (c) { return !store[c.id]; };
  var isDue = function (c) { return !!store[c.id] && store[c.id].due <= day(); };

  var state = { sel: "all", mode: "due", shuffle: false, queue: [], revealed: false, done: 0, total: 0 };

  function inSel(c) { return state.sel === "all" || c.deck === state.sel; }
  function shuffled(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function build() {
    var pool = cards.filter(inSel);
    if (state.mode === "due") {
      var due = pool.filter(isDue).sort(function (a, b) { return store[a.id].due - store[b.id].due; });
      pool = due.concat(pool.filter(isNew));
    }
    if (state.shuffle) pool = shuffled(pool);
    state.queue = pool; state.total = pool.length; state.done = 0; state.revealed = false;
  }
  function counts(list) {
    var n = 0, d = 0, l = 0;
    list.forEach(function (c) { if (isNew(c)) n++; else if (isDue(c)) d++; else l++; });
    return { n: n, d: d, l: l };
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]; }); }

  function grade(g) {
    var c = state.queue.shift();
    if (!c) return;
    var s = store[c.id] || { box: 0, due: day(), seen: 0 };
    s.seen += 1;
    if (g === "again") {
      s.box = 0; s.due = day();
      state.queue.splice(Math.min(3, state.queue.length), 0, c);
    } else {
      s.box = Math.min(5, s.box + (g === "easy" ? 2 : 1));
      s.due = day() + STEPS[s.box - 1];
      state.done += 1;
    }
    store[c.id] = s; save();
    state.revealed = false;
    render();
  }
  function reveal() { if (!state.revealed && state.queue.length) { state.revealed = true; render(); } }

  function nextDueText() {
    var later = cards.filter(inSel).filter(function (c) { return !isNew(c) && !isDue(c); });
    if (!later.length) return "";
    var soon = Math.min.apply(null, later.map(function (c) { return store[c.id].due; })) - day();
    return "Next cards are due " + (soon <= 1 ? "tomorrow" : "in " + soon + " days") + ".";
  }

  function render() {
    var sel = cards.filter(inSel);
    var cnt = counts(sel);
    var h = '<div class="fc-top"><div class="fc-decks" role="group" aria-label="Decks">';
    var all = counts(cards);
    h += '<button type="button" data-deck="all" aria-pressed="' + (state.sel === "all") + '">All<span class="n">' + (all.n + all.d) + "</span></button>";
    data.decks.forEach(function (d) {
      var k = counts(cards.filter(function (c) { return c.deck === d.id; }));
      h += '<button type="button" data-deck="' + esc(d.id) + '" aria-pressed="' + (state.sel === d.id) + '">' + esc(d.id) + " · " + esc(d.title) + '<span class="n">' + (k.n + k.d) + "</span></button>";
    });
    h += '</div><div class="fc-tools"><label>Show <select id="fc-mode"><option value="due"' + (state.mode === "due" ? " selected" : "") + '>New and due</option><option value="all"' + (state.mode === "all" ? " selected" : "") + '>Every card</option></select></label>';
    h += '<label><input type="checkbox" id="fc-shuffle"' + (state.shuffle ? " checked" : "") + "> Shuffle</label>";
    h += '<span class="fc-stats">New ' + cnt.n + " · Due " + cnt.d + " · Later " + cnt.l + "</span></div></div>";

    var pct = state.total ? Math.round((state.done / state.total) * 100) : 0;
    h += '<div class="fc-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><i style="width:' + pct + '%"></i></div>';

    var c = state.queue[0];
    if (!c) {
      h += '<div class="fc-card fc-empty"><p><strong>' + (state.total ? "Session complete." : "Nothing due here.") + "</strong></p><p>" + esc(nextDueText()) + "</p>";
      if (state.mode === "due") h += '<button type="button" id="fc-all">Study every card anyway</button>';
      h += '<button type="button" id="fc-again">Start again</button></div>';
    } else {
      h += '<div class="fc-card" id="fc-card"><div class="tag">' + esc(c.deck) + " · " + esc(c.deckTitle) + " · " + (state.done + 1) + " of " + state.total + '</div><div class="fc-q">' + c.q + "</div>";
      if (state.revealed) h += '<div class="fc-a" aria-live="polite">' + c.a + "</div>";
      else h += '<div class="fc-hint">Say your answer out loud first, then reveal it.</div>';
      h += "</div>";
      if (state.revealed) {
        h += '<div class="fc-actions"><button type="button" class="btn-again" data-g="again">Again<small>1 · repeat soon</small></button><button type="button" class="btn-good" data-g="good">Good<small>2 · next interval</small></button><button type="button" class="btn-easy" data-g="easy">Easy<small>3 · skip ahead</small></button></div>';
        h += '<div class="fc-hint">On a phone, swipe the card right for Good, left for Again.</div>';
      } else {
        h += '<div class="fc-actions single"><button type="button" class="btn-show" id="fc-show">Show answer<small>Space</small></button></div>';
      }
    }
    h += '<div class="fc-foot"><button type="button" id="fc-reset">Reset progress on this device</button></div>';
    root.innerHTML = h;
    wire();
  }

  function wire() {
    root.querySelectorAll("[data-deck]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.sel = b.getAttribute("data-deck");
        try { history.replaceState(null, "", state.sel === "all" ? location.pathname : "#" + state.sel); } catch (e) { /* ignore */ }
        build(); render();
      });
    });
    var mode = root.querySelector("#fc-mode");
    if (mode) mode.addEventListener("change", function () { state.mode = mode.value; build(); render(); });
    var sh = root.querySelector("#fc-shuffle");
    if (sh) sh.addEventListener("change", function () { state.shuffle = sh.checked; build(); render(); });
    var show = root.querySelector("#fc-show");
    if (show) { show.addEventListener("click", reveal); show.focus({ preventScroll: true }); }
    root.querySelectorAll("[data-g]").forEach(function (b) {
      b.addEventListener("click", function () { grade(b.getAttribute("data-g")); });
    });
    var all = root.querySelector("#fc-all");
    if (all) all.addEventListener("click", function () { state.mode = "all"; build(); render(); });
    var again = root.querySelector("#fc-again");
    if (again) again.addEventListener("click", function () { build(); render(); });
    var reset = root.querySelector("#fc-reset");
    if (reset) reset.addEventListener("click", function () {
      if (confirm("Reset all flashcard progress on this device?")) { store = {}; save(); build(); render(); }
    });
    var card = root.querySelector("#fc-card");
    if (card) swipe(card);
  }

  function swipe(card) {
    var sx = 0, dx = 0, down = false, moved = false;
    card.addEventListener("pointerdown", function (e) { down = true; moved = false; sx = e.clientX; dx = 0; });
    card.addEventListener("pointermove", function (e) {
      if (!down || !state.revealed) return;
      dx = e.clientX - sx;
      if (Math.abs(dx) > 8) { moved = true; card.style.transform = "translateX(" + dx + "px) rotate(" + dx / 40 + "deg)"; }
    });
    function end() {
      if (!down) return; down = false;
      if (state.revealed && dx > 90) grade("good");
      else if (state.revealed && dx < -90) grade("again");
      else card.style.transform = "";
    }
    card.addEventListener("pointerup", function () {
      var wasTap = !moved;
      end();
      if (wasTap && !state.revealed) reveal();
    });
    card.addEventListener("pointercancel", function () { down = false; card.style.transform = ""; });
  }

  document.addEventListener("keydown", function (e) {
    var t = e.target;
    if (t && (t.tagName === "SELECT" || t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
    if (e.key === " " || e.key === "Enter") {
      if (!state.revealed && state.queue.length && !(t && t.tagName === "BUTTON")) { e.preventDefault(); reveal(); }
    } else if (state.revealed) {
      if (e.key === "1") grade("again");
      else if (e.key === "2") grade("good");
      else if (e.key === "3") grade("easy");
    }
  });

  var h0 = (location.hash || "").replace("#", "");
  if (h0 && data.decks.some(function (d) { return d.id === h0; })) state.sel = h0;
  build();
  render();
})();
