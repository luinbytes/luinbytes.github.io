"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Toast {
  id: number;
  message: string;
  emoji: string;
}

const TOAST_OPTIONS = [
  { message: "Burning the midnight oil?", emoji: "🌙" },
  { message: "Early bird catches the bug!", emoji: "🐦" },
  { message: "Lumi's watching you browse... 👀", emoji: "✨" },
  { message: "Psst... try the konami code!", emoji: "🎀" },
];

export function LumiToast() {
  const [toast, setToast] = useState<Toast | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("lumi-toast-shown") || dismissed) return;

    const timer = setTimeout(() => {
      // Random toast selection
      const selected = TOAST_OPTIONS[Math.floor(Math.random() * TOAST_OPTIONS.length)];
      setToast({ ...selected, id: Date.now() });
      sessionStorage.setItem("lumi-toast-shown", "true");
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, [dismissed]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="bg-black border border-neon/30 rounded-lg px-4 py-3 shadow-lg flex items-center gap-3 max-w-xs">
        <span className="text-2xl">{toast.emoji}</span>
        <p className="text-sm text-gray-300">{toast.message}</p>
        <button
          onClick={() => {
            setToast(null);
            setDismissed(true);
          }}
          className="text-gray-500 hover:text-white transition-colors ml-2"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
