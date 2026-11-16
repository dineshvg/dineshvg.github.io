// Renders Mermaid diagrams and adds a full-screen pan/zoom viewer (touch, mouse, keyboard).
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

const dark = matchMedia("(prefers-color-scheme: dark)").matches;
const light = {
  background: "#ffffff", primaryColor: "#eef2ff", primaryTextColor: "#1c1917",
  primaryBorderColor: "#4338ca", lineColor: "#57534e", secondaryColor: "#f5f5f4",
  tertiaryColor: "#fafaf9", clusterBkg: "#fafaf9", clusterBorder: "#d6d3d1",
  edgeLabelBackground: "#ffffff", noteBkgColor: "#fef9c3", noteTextColor: "#1c1917",
  actorBkg: "#eef2ff", actorBorder: "#4338ca", actorTextColor: "#1c1917",
  signalColor: "#57534e", signalTextColor: "#1c1917", labelTextColor: "#1c1917",
  titleColor: "#1c1917", textColor: "#1c1917",
};
const night = {
  background: "#1c1b1a", primaryColor: "#27324a", primaryTextColor: "#e9e6e2",
  primaryBorderColor: "#818cf8", lineColor: "#a39d96", secondaryColor: "#242321",
  tertiaryColor: "#1c1b1a", clusterBkg: "#1c1b1a", clusterBorder: "#3b3835",
  edgeLabelBackground: "#1c1b1a", noteBkgColor: "#3b3320", noteTextColor: "#f5e9c8",
  actorBkg: "#27324a", actorBorder: "#818cf8", actorTextColor: "#e9e6e2",
  signalColor: "#a39d96", signalTextColor: "#e9e6e2", labelTextColor: "#e9e6e2",
  titleColor: "#e9e6e2", textColor: "#e9e6e2",
};

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  theme: "base",
  themeVariables: Object.assign({ fontSize: "15px" }, dark ? night : light),
  flowchart: { htmlLabels: true, useMaxWidth: true, padding: 12 },
  sequence: { useMaxWidth: true, wrap: true },
});

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

function naturalSize(svg) {
  const vb = svg.viewBox && svg.viewBox.baseVal;
  if (vb && vb.width) return { w: vb.width, h: vb.height };
  const r = svg.getBoundingClientRect();
  return { w: r.width || 600, h: r.height || 400 };
}

function openViewer(svg, opener) {
  const { w, h } = naturalSize(svg);
  const clone = svg.cloneNode(true);
  clone.removeAttribute("style");
  clone.setAttribute("width", w);
  clone.setAttribute("height", h);
  clone.style.maxWidth = "none";

  const overlay = el("div", "viewer");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Diagram viewer");
  const bar = el("div", "viewer-bar");
  const mk = (label, title, fn) => {
    const b = el("button", "", label);
    b.type = "button"; b.title = title; b.setAttribute("aria-label", title);
    b.addEventListener("click", fn);
    bar.appendChild(b);
    return b;
  };
  const stage = el("div", "viewer-stage");
  const canvas = el("div", "viewer-canvas");
  canvas.appendChild(clone);
  stage.appendChild(canvas);

  let k = 1, x = 0, y = 0;
  const apply = () => { canvas.style.transform = `translate(${x}px, ${y}px) scale(${k})`; };
  const center = () => {
    x = (stage.clientWidth - w * k) / 2;
    y = (stage.clientHeight - h * k) / 2;
    if (x < 0) x = 8; // start at the left edge when wider than the screen
    apply();
  };
  const fit = () => {
    k = Math.min(stage.clientWidth / w, stage.clientHeight / h) * 0.96;
    x = (stage.clientWidth - w * k) / 2;
    y = (stage.clientHeight - h * k) / 2;
    apply();
  };
  const zoomAt = (cx, cy, f) => {
    const k2 = Math.min(6, Math.max(0.1, k * f));
    x = cx - (cx - x) * (k2 / k);
    y = cy - (cy - y) * (k2 / k);
    k = k2;
    apply();
  };
  const mid = () => [stage.clientWidth / 2, stage.clientHeight / 2];
  const close = () => {
    overlay.remove();
    document.body.classList.remove("no-scroll");
    document.removeEventListener("keydown", onKey, true);
    if (opener) opener.focus({ preventScroll: true });
  };
  const onKey = (e) => {
    if (e.key === "Escape") { e.stopPropagation(); close(); }
    else if (e.key === "+" || e.key === "=") zoomAt(...mid(), 1.25);
    else if (e.key === "-") zoomAt(...mid(), 0.8);
    else if (e.key === "0") fit();
  };

  mk("−", "Zoom out", () => zoomAt(...mid(), 0.8));
  mk("+", "Zoom in", () => zoomAt(...mid(), 1.25));
  mk("Fit", "Fit to screen", fit);
  mk("100%", "Actual size", () => { k = 1; center(); });
  bar.appendChild(el("span", "hint", "Drag to pan. Pinch or scroll to zoom."));
  const closeBtn = mk("✕", "Close", close);

  overlay.append(bar, stage);
  document.body.appendChild(overlay);
  document.body.classList.add("no-scroll");
  document.addEventListener("keydown", onKey, true);
  fit();
  closeBtn.focus({ preventScroll: true });

  const pts = new Map();
  let last = null;
  stage.addEventListener("pointerdown", (e) => {
    stage.setPointerCapture(e.pointerId);
    pts.set(e.pointerId, [e.clientX, e.clientY]);
    last = null;
  });
  stage.addEventListener("pointermove", (e) => {
    if (!pts.has(e.pointerId)) return;
    const prev = pts.get(e.pointerId);
    pts.set(e.pointerId, [e.clientX, e.clientY]);
    const r = stage.getBoundingClientRect();
    if (pts.size === 1) {
      x += e.clientX - prev[0];
      y += e.clientY - prev[1];
      apply();
    } else if (pts.size === 2) {
      const [a, b] = [...pts.values()];
      const dist = Math.hypot(a[0] - b[0], a[1] - b[1]);
      const mx = (a[0] + b[0]) / 2 - r.left, my = (a[1] + b[1]) / 2 - r.top;
      if (last) {
        x += mx - last.mx; y += my - last.my;
        if (last.dist > 0) zoomAt(mx, my, dist / last.dist);
        else apply();
      }
      last = { dist, mx, my };
    }
  });
  const up = (e) => { pts.delete(e.pointerId); last = null; };
  stage.addEventListener("pointerup", up);
  stage.addEventListener("pointercancel", up);
  stage.addEventListener("wheel", (e) => {
    e.preventDefault();
    const r = stage.getBoundingClientRect();
    zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 1 / 1.12);
  }, { passive: false });
  stage.addEventListener("dblclick", () => { if (k < 0.99) { k = 1; center(); } else fit(); });
}

async function main() {
  const blocks = [...document.querySelectorAll("pre.mermaid")];
  if (!blocks.length) return;
  try {
    await mermaid.run({ nodes: blocks });
  } catch (err) {
    console.error("Mermaid render failed", err);
  }
  blocks.forEach((pre) => {
    const svg = pre.querySelector("svg");
    if (!svg) return;
    const fig = el("figure", "diagram");
    pre.replaceWith(fig);
    const btn = el("button", "expand", "Expand");
    btn.type = "button";
    btn.setAttribute("aria-label", "Open diagram full screen to zoom and pan");
    fig.append(pre, btn);
    const open = () => openViewer(pre.querySelector("svg"), btn);
    btn.addEventListener("click", open);
    pre.addEventListener("click", open);
  });
  document.dispatchEvent(new CustomEvent("diagrams-ready"));
}
main();
