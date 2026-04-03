"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Toast {
  id: number;
  message: string;
}

const TOAST_OPTIONS = [
  "Burning the midnight oil?",
  "Early bird catches the bug!",
  "Lumi's watching you browse...",
  "Psst... try the konami code!",
];

export function LumiToast() {
  const [toast, setToast] = useState<Toast | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("lumi-toast-shown") || dismissed) return;

    const timer = setTimeout(() => {
      const message =
        TOAST_OPTIONS[Math.floor(Math.random() * TOAST_OPTIONS.length)];
      setToast({ message, id: Date.now() });
      sessionStorage.setItem("lumi-toast-shown", "true");
    }, 2000);

    return () => clearTimeout(timer);
  }, [dismissed]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 nd-transition">
      <div className="bg-nd-surface border border-nd-border-visible px-4 py-3 flex items-center gap-3 max-w-xs">
        <p className="text-sm text-nd-text-secondary font-mono">
          [LUMI] {toast.message}
        </p>
        <button
          onClick={() => {
            setToast(null);
            setDismissed(true);
          }}
          className="text-nd-text-disabled hover:text-nd-text-display nd-transition ml-2"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
