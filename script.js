const dock = document.querySelector("[data-dock]");
const pond = document.querySelector("[data-pond]");
const toast = document.querySelector("[data-toast]");
let toastTimer;
let rippleTimer = 0;

document.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
  document.documentElement.style.setProperty("--my", `${event.clientY}px`);
  document.documentElement.style.setProperty("--water-x", `${(event.clientX / innerWidth) * 100}%`);
  document.documentElement.style.setProperty("--water-y", `${(event.clientY / innerHeight) * 100}%`);

  if (!pond || Date.now() - rippleTimer < 90) return;
  rippleTimer = Date.now();
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.setProperty("--x", `${event.clientX}px`);
  ripple.style.setProperty("--y", `${event.clientY}px`);
  pond.append(ripple);
  ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
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
