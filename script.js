const dock = document.querySelector("[data-dock]");
const field = document.querySelector("[data-field]");
const toast = document.querySelector("[data-toast]");
let toastTimer;
let pingTimer = 0;
let activePings = 0;
let pointerFrame = 0;
let pointerX = 0;
let pointerY = 0;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function showToast() {
  if (!toast) return;

  clearTimeout(toastTimer);
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

document.addEventListener("pointermove", (event) => {
  if (!event.isPrimary || event.pointerType !== "mouse") return;

  pointerX = event.clientX;
  pointerY = event.clientY;
  if (!pointerFrame) {
    pointerFrame = requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--mx", `${pointerX}px`);
      document.documentElement.style.setProperty("--my", `${pointerY}px`);
      pointerFrame = 0;
    });
  }

  const now = performance.now();
  if (
    reducedMotion.matches ||
    !field ||
    document.hidden ||
    activePings >= 2 ||
    now - pingTimer < 220
  ) return;

  pingTimer = now;
  activePings += 1;
  const ping = document.createElement("span");
  ping.className = "ping";
  ping.style.setProperty("--x", `${pointerX}px`);
  ping.style.setProperty("--y", `${pointerY}px`);
  field.append(ping);
  const removePing = () => {
    if (!ping.isConnected) return;
    activePings -= 1;
    ping.remove();
  };
  ping.addEventListener("animationend", removePing, { once: true });
  ping.addEventListener("animationcancel", removePing, { once: true });
});

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  const tile = dock?.querySelector(`[data-key="${event.key}"]`);
  if (!tile) return;
  event.preventDefault();
  tile.click();
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy || "";
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const input = document.createElement("input");
      input.value = text;
      document.body.append(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    showToast();
  });
});
