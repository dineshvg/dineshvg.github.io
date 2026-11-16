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
    d.cards.forEach(function (c) { cards.push({ id: c.id, q: c.q, a: c.a, c: c.c || "", w: c.w || [], deck: d.id, deckTitle: d.title }); });
  });

  var isNew = function (c) { return !store[c.id]; };
  var isDue = function (c) { return !!store[c.id] && store[c.id].due <= day(); };

  var state = { sel: "all", mode: "due", fmt: "mc", shuffle: false, queue: [], revealed: false, done: 0, total: 0, right: 0, tried: 0, opts: null, picked: -1, optsFor: "" };
  var isMC = function (c) { return state.fmt === "mc" && c.c && c.w.length >= 1; };
  var LET = "ABCDEFGH";

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
    state.queue = pool; state.total = pool.length; state.done = 0; state.revealed = false; state.right = 0; state.tried = 0; state.picked = -1; state.opts = null;
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
    state.revealed = false; state.picked = -1; state.opts = null;
    render();
  }
  function prepOpts(c) {
    if (state.opts && state.optsFor === c.id) return;
    var list = [{ t: c.c, ok: true }].concat(c.w.map(function (t) { return { t: t, ok: false }; }));
    state.opts = shuffled(list); state.optsFor = c.id; state.picked = -1;
  }
  function pick(i) {
    var c = state.queue[0];
    if (!c || state.revealed || !state.opts || !state.opts[i]) return;
    state.picked = i; state.revealed = true; state.tried += 1;
    if (state.opts[i].ok) state.right += 1;
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
    h += '<label>Format <select id="fc-fmt"><option value="mc"' + (state.fmt === "mc" ? " selected" : "") + '>Multiple choice</option><option value="flip"' + (state.fmt === "flip" ? " selected" : "") + '>Flip cards</option></select></label>';
    h += '<label><input type="checkbox" id="fc-shuffle"' + (state.shuffle ? " checked" : "") + "> Shuffle</label>";
    h += '<span class="fc-stats">New ' + cnt.n + " · Due " + cnt.d + " · Later " + cnt.l + "</span></div></div>";

    var pct = state.total ? Math.round((state.done / state.total) * 100) : 0;
    h += '<div class="fc-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"><i style="width:' + pct + '%"></i></div>';

    var c = state.queue[0];
    if (!c) {
      h += '<div class="fc-card fc-empty"><p><strong>' + (state.total ? "Session complete." : "Nothing due here.") + "</strong></p>" + (state.tried ? "<p>" + state.right + " of " + state.tried + " answers correct.</p>" : "") + "<p>" + esc(nextDueText()) + "</p>";
      if (state.mode === "due") h += '<button type="button" id="fc-all">Study every card anyway</button>';
      h += '<button type="button" id="fc-again">Start again</button></div>';
    } else {
      var mc = isMC(c);
      h += '<div class="fc-card" id="fc-card"><div class="tag">' + esc(c.deck) + " · " + esc(c.deckTitle) + " · " + (state.done + 1) + " of " + state.total + '</div><div class="fc-q">' + c.q + "</div>";
      if (mc) {
        prepOpts(c);
        h += '<ul class="fc-opts" role="list">';
        state.opts.forEach(function (o, i) {
          var cls = "fc-opt";
          if (state.revealed) cls += o.ok ? " right" : (i === state.picked ? " wrong" : " dim");
          h += '<li><button type="button" class="' + cls + '" data-pick="' + i + '"' + (state.revealed ? " disabled" : "") + '><span class="k">' + LET[i] + "</span><span>" + o.t + "</span></button></li>";
        });
        h += "</ul>";
        if (state.revealed) {
          var ok = state.opts[state.picked].ok;
          h += '<div class="fc-result ' + (ok ? "ok" : "bad") + '" role="status">' + (ok ? "Correct" : "Not quite") + '</div><div class="fc-a" aria-live="polite"><span class="lab">Full answer</span>' + c.a + "</div>";
        }
      } else if (state.revealed) {
        h += '<div class="fc-a" aria-live="polite"><span class="lab">Answer</span>' + c.a + "</div>";
      } else {
        h += '<div class="fc-hint">Say your answer out loud first, then reveal it.</div>';
      }
      h += "</div>";
      if (mc) {
        if (state.revealed) h += '<div class="fc-actions single"><button type="button" class="btn-next" id="fc-next">Next<small>Enter</small></button></div>';
        else h += '<div class="fc-hint">Pick an option, or press A to ' + LET[state.opts.length - 1] + ".</div>";
      } else if (state.revealed) {
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
    var fmt = root.querySelector("#fc-fmt");
    if (fmt) fmt.addEventListener("change", function () { state.fmt = fmt.value; state.revealed = false; state.opts = null; state.picked = -1; render(); });
    root.querySelectorAll("[data-pick]").forEach(function (b) {
      b.addEventListener("click", function () { pick(+b.getAttribute("data-pick")); });
    });
    var nx = root.querySelector("#fc-next");
    if (nx) { nx.addEventListener("click", nextCard); nx.focus({ preventScroll: true }); }
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
    if (card && !(state.queue[0] && isMC(state.queue[0]))) swipe(card);
  }

  function nextCard() {
    if (!state.revealed || !state.opts || state.picked < 0) return;
    grade(state.opts[state.picked].ok ? "good" : "again");
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
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var c = state.queue[0];
    if (!c) return;
    if (isMC(c)) {
      var i = LET.indexOf((e.key || "").toUpperCase());
      if (!state.revealed && i > -1 && state.opts && i < state.opts.length) { pick(i); return; }
      if (!state.revealed && /^[1-9]$/.test(e.key) && state.opts && +e.key <= state.opts.length) { pick(+e.key - 1); return; }
      if (state.revealed && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); nextCard(); }
      return;
    }
    if (e.key === " " || e.key === "Enter") {
      if (!state.revealed && !(t && t.tagName === "BUTTON")) { e.preventDefault(); reveal(); }
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
