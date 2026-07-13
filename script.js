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
