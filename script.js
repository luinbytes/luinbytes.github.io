const dock = document.querySelector("[data-dock]");
const toast = document.querySelector("[data-toast]");
let toastTimer;

function showToast() {
  if (!toast) return;

  clearTimeout(toastTimer);
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

async function copyDiscordHandle(button) {
  const text = button.dataset.copy || "";

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const input = document.createElement("input");
    input.value = text;
    input.setAttribute("aria-hidden", "true");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }

  showToast();
}

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat) return;
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;

  const door = dock?.querySelector(`[data-key="${event.key}"]`);
  if (!door) return;

  event.preventDefault();
  door.click();
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", () => copyDiscordHandle(button));
});

class DotCut {
  constructor(host) {
    this.host = host;
    this.canvas = host.querySelector(".dotcut");
    this.ctx = this.canvas?.getContext("2d");
    this.cols = 42;
    this.rows = 1;
    this.pitch = 10;
    this.ox = 0;
    this.oy = 0;
    this.scene = 0;
    this.phase = "hold";
    this.phaseT = 0;
    this.paletteMix = 1;
    this.previousPalette = 0;
    this.pointer = null;
    this.running = false;
    this.reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.scenes = [
      ["text", "LU", "wipe", 0, "drift"],
      ["rings", null, "ripple", 1, "grain"],
      ["columns", null, "columns", 2, "streak"],
      ["checker", null, "scatter", 3, "swell"],
      ["boxes", null, "collapse", 4, "grain"],
      ["bars", null, "wipe", 5, "drift"],
    ];
    this.palettes = [
      ["#080208", "#ff8bbc"], ["#160614", "#f4d9e6"], ["#080208", "#ff6fad"],
      ["#230a1f", "#d7a2ff"], ["#160614", "#fff7fb"], ["#230a1f", "#ff8bbc"],
    ];
    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);
    if (!this.ctx) return;

    new ResizeObserver(this.resize).observe(host);
    this.canvas.addEventListener("pointermove", (event) => {
      const rect = this.canvas.getBoundingClientRect();
      this.pointer = this.toCell(event.clientX - rect.left, event.clientY - rect.top);
    });
    this.canvas.addEventListener("pointerleave", () => { this.pointer = null; });
    document.addEventListener("visibilitychange", () => document.hidden ? this.stop() : this.start());
    this.visibility = new IntersectionObserver(([entry]) => entry.isIntersecting ? this.start() : this.stop(), { threshold: 0.01 });
    this.visibility.observe(host);
    this.resize();
  }

  resize() {
    const width = this.host.clientWidth;
    const height = this.host.clientHeight;
    if (!width || !height || !this.ctx) return;

    this.dpr = Math.min(devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(width * this.dpr);
    this.canvas.height = Math.round(height * this.dpr);
    this.glyphCanvas = null;
    this.pitch = width / (this.cols + 1.5);
    this.rows = Math.max(3, Math.floor((height - 1.5 * this.pitch) / this.pitch));
    this.ox = (width - this.cols * this.pitch) / 2;
    this.oy = (height - this.rows * this.pitch) / 2;
    const size = this.cols * this.rows;
    this.from = new Float32Array(size);
    this.live = new Float32Array(size);
    this.delay = new Float32Array(size);
    this.random = Float32Array.from({ length: size }, (_, i) => hash(i * 1.37 + 0.5));
    this.target = this.rasterize(this.scenes[this.scene]);
    this.live.set(this.target);
    this.from.set(this.target);
    this.draw();
  }

  rasterize(scene) {
    const out = new Uint8Array(this.cols * this.rows).fill(1);
    const cx = (this.cols - 1) / 2;
    const cy = (this.rows - 1) / 2;
    const [kind, value] = scene;
    for (let y = 0; y < this.rows; y++) for (let x = 0; x < this.cols; x++) {
      let cut = false;
      if (kind === "checker") cut = (Math.floor(x / 3) + Math.floor(y / 3)) % 2 === 0;
      if (kind === "bars") cut = Math.floor((x + y) / 3) % 2 === 0;
      if (kind === "columns") cut = Math.floor((x + (Math.floor(y / 3) % 2 ? 2 : 0)) / 4) % 2 === 0;
      if (kind === "boxes") cut = Math.floor(Math.max(Math.abs(x - cx), Math.abs(y - cy)) / 2.5) % 2 === 0;
      if (kind === "rings") cut = Math.floor(Math.hypot(x - cx, y - cy) / Math.hypot(this.cols, this.rows) * 12) % 2 === 0;
      if (kind === "text") cut = this.glyph(value, x, y);
      if (cut) out[y * this.cols + x] = 0;
    }
    return out;
  }

  glyph(value, x, y) {
    if (!this.glyphCanvas) {
      this.glyphCanvas = document.createElement("canvas");
      this.glyphCanvas.width = this.cols;
      this.glyphCanvas.height = this.rows;
      const ctx = this.glyphCanvas.getContext("2d");
      ctx.fillStyle = "white";
      const size = this.rows * 0.8;
      ctx.font = `900 ${size}px Arial Black, Impact, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(value, this.cols / 2, this.rows / 2);
      this.glyphData = ctx.getImageData(0, 0, this.cols, this.rows).data;
    }
    return this.glyphData[(y * this.cols + x) * 4] > 110;
  }

  advance() {
    this.previousPalette = this.scenes[this.scene][3];
    this.scene = (this.scene + 1) % this.scenes.length;
    this.from.set(this.live);
    this.target = this.rasterize(this.scenes[this.scene]);
    this.phase = "morph";
    this.phaseT = 0;
    this.paletteMix = 0;
    this.glyphCanvas = null;
    for (let y = 0; y < this.rows; y++) for (let x = 0; x < this.cols; x++) {
      const i = y * this.cols + x;
      this.delay[i] = cellDelay(this.scenes[this.scene][2], x, y, this.cols, this.rows, this.random[i]);
    }
  }

  step(dt) {
    if (this.reduced) return;
    this.phaseT += dt * 1000;
    if (this.phase === "hold" && this.phaseT >= 900) this.advance();
    if (this.phase === "morph" && this.phaseT >= 560) { this.phase = "hold"; this.phaseT = 0; }
    const progress = this.phase === "morph" ? Math.min(1, this.phaseT / 560) : 1;
    for (let i = 0; i < this.live.length; i++) {
      const local = easeOut(clamp((progress - this.delay[i] * 0.72) / 0.28));
      this.live[i] = this.from[i] + (this.target[i] - this.from[i]) * local;
    }
    this.paletteMix = Math.min(1, this.paletteMix + dt * 2.2);
  }

  draw(dt = 0) {
    if (!this.ctx) return;
    this.step(dt);
    const [oldBg, oldInk] = this.palettes[this.previousPalette];
    const [newBg, newInk] = this.palettes[this.scenes[this.scene][3]];
    this.ctx.fillStyle = mixHex(oldBg, newBg, easeInOut(this.paletteMix));
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = mixHex(oldInk, newInk, easeInOut(this.paletteMix));
    const path = new Path2D();
    const scale = this.dpr;
    const radius = this.pitch * scale / 2;
    for (let y = 0; y < this.rows; y++) for (let x = 0; x < this.cols; x++) {
      const i = y * this.cols + x;
      let amount = this.live[i];
      if (this.pointer) {
        const dx = x + 0.5 - this.pointer.x;
        const dy = y + 0.5 - this.pointer.y;
        const d = Math.max(Math.abs(dx), Math.abs(dy));
        if (d < 2.4) amount *= Math.min(1, (d / 2.4) ** 2);
      }
      const r = radius * amount;
      if (r <= 0.25) continue;
      const cx = (this.ox + (x + 0.5) * this.pitch) * scale;
      const cy = (this.oy + (y + 0.5) * this.pitch) * scale;
      path.moveTo(cx + r, cy);
      path.arc(cx, cy, r, 0, Math.PI * 2);
      if (r > 3 * scale && this.scenes[this.scene][4]) {
        const hole = (r - 1.8 * scale) * styleValue(this.scenes[this.scene][4], x, y, this.cols, this.rows);
        if (hole > 0.4) { path.moveTo(cx + hole, cy); path.arc(cx, cy, hole, 0, Math.PI * 2, true); }
      }
    }
    this.ctx.fill(path, "evenodd");
  }

  tick(now) {
    if (!this.running) return;
    const dt = Math.min((now - this.last) / 1000, 1 / 30);
    this.last = now;
    this.draw(dt);
    this.raf = requestAnimationFrame(this.tick);
  }

  start() {
    if (this.running || this.reduced || !this.ctx || document.hidden) return;
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  toCell(x, y) { return { x: (x - this.ox) / this.pitch, y: (y - this.oy) / this.pitch }; }
}

const clamp = (value) => Math.max(0, Math.min(1, value));
const easeOut = (value) => 1 - (1 - value) ** 3;
const easeInOut = (value) => value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;
const hash = (value) => { const n = Math.sin(value * 127.1 + 311.7) * 43758.5453; return n - Math.floor(n); };
const cellDelay = (kind, x, y, cols, rows, rand) => {
  const fx = x / Math.max(1, cols - 1), fy = y / Math.max(1, rows - 1);
  if (kind === "ripple") return Math.min(1, Math.hypot(fx - 0.5, fy - 0.5) * 0.9 + rand * 0.1);
  if (kind === "collapse") return Math.min(1, (1 - Math.hypot(fx - 0.5, fy - 0.5) / 0.707) * 0.85 + rand * 0.15);
  if (kind === "scatter") return rand;
  return Math.min(1, fx * 0.75 + fy * 0.25 + rand * 0.12);
};
const styleValue = (style, x, y, cols, rows) => {
  if (style === "grain") return clamp(hash(x * 13 + y * 31) * 1.3);
  if (style === "swell") return clamp(1 - Math.hypot(x - cols / 2, y - rows / 2) / Math.hypot(cols, rows) * 2);
  if (style === "streak") return clamp(Math.sin(x * 0.28 + y * 0.62) * 0.5 + 0.5);
  return clamp(Math.sin(x * 0.41 + y * 0.23) * 0.35 + Math.sin(x * 0.17 - y * 0.53) * 0.35 + 0.5);
};
const mixHex = (a, b, t) => {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const channel = (shift) => Math.round(((pa >> shift) & 255) * (1 - t) + ((pb >> shift) & 255) * t);
  return `rgb(${channel(16)},${channel(8)},${channel(0)})`;
};

const dotcut = document.querySelector(".landmark");
if (dotcut) new DotCut(dotcut);
