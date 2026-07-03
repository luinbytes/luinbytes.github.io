const dock = document.querySelector("[data-dock]");
const field = document.querySelector("[data-field]");
const toast = document.querySelector("[data-toast]");
let toastTimer;
let pingTimer = 0;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

document.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
  document.documentElement.style.setProperty("--my", `${event.clientY}px`);

  if (reducedMotion.matches || !field || Date.now() - pingTimer < 120) return;
  pingTimer = Date.now();
  const ping = document.createElement("span");
  ping.className = "ping";
  ping.style.setProperty("--x", `${event.clientX}px`);
  ping.style.setProperty("--y", `${event.clientY}px`);
  field.append(ping);
  ping.addEventListener("animationend", () => ping.remove(), { once: true });
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
    toast?.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast?.classList.remove("show"), 1600);
  });
});
