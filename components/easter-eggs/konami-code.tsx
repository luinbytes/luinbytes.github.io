"use client";

import { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

const TIMEOUT_MS = 5000; // 5 second timeout

export function KonamiCode() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [lastKeyTime, setLastKeyTime] = useState<number>(0);

  const resetSequence = useCallback(() => {
    setKeySequence([]);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const currentTime = Date.now();

      // Reset if too much time has passed
      if (currentTime - lastKeyTime > TIMEOUT_MS && keySequence.length > 0) {
        resetSequence();
        return;
      }

      const nextKey = KONAMI_CODE[keySequence.length];
      const pressedKey = event.code;

      if (pressedKey === nextKey) {
        const newSequence = [...keySequence, pressedKey];
        setKeySequence(newSequence);
        setLastKeyTime(currentTime);

        // Check if sequence is complete
        if (newSequence.length === KONAMI_CODE.length) {
          setIsModalOpen(true);
          resetSequence();
        }
      } else {
        // Wrong key pressed, reset
        resetSequence();
      }
    },
    [keySequence, lastKeyTime, resetSequence]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Handle click outside modal
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  if (!isModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-black border-2 border-neon p-8 rounded-lg max-w-md mx-4 shadow-[0_0_30px_rgba(255,158,181,0.3)]">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center space-y-4">
          <div className="text-5xl mb-4">🐱</div>
          <h2 className="text-2xl font-bold text-neon">Lumi says hi!</h2>
          <p className="text-gray-300 leading-relaxed">
            Assistant to @luinbytes since 2026.
          </p>
          <p className="text-gray-400 text-sm italic">
            Powered by OpenClaw + too much coffee.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500 font-mono">
            ↑↑↓↓←→BA - You found the secret!
          </p>
        </div>
      </div>
    </div>
  );
}
