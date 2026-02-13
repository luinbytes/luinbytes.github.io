"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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

const KONAMI_DISPLAY = ["↑", "↑", "↓", "↓", "←", "→", "B", "A"];

const TIMEOUT_MS = 5000;
const D_PAD_TIMEOUT_MS = 10000;
const SHAKE_THRESHOLD = 18;

function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768
  );
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function KonamiCode() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDPadOpen, setIsDPadOpen] = useState(false);
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  
  // Use refs to track sequence - avoids stale closure issues
  const keySequenceRef = useRef<string[]>([]);
  const lastKeyTimeRef = useRef<number>(0);
  const dPadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shakeEnabledRef = useRef(false);
  const lastShakeTimeRef = useRef(0);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const resetSequence = useCallback(() => {
    keySequenceRef.current = [];
    lastKeyTimeRef.current = 0;
  }, []);

  const handleSuccess = useCallback(() => {
    setIsModalOpen(true);
    setIsDPadOpen(false);
    resetSequence();
  }, [resetSequence]);

  const handleKeyPress = useCallback(
    (key: string) => {
      const currentTime = Date.now();
      const lastTime = lastKeyTimeRef.current;

      // Reset if too much time has passed
      if (currentTime - lastTime > TIMEOUT_MS && keySequenceRef.current.length > 0) {
        resetSequence();
      }

      const nextKey = KONAMI_CODE[keySequenceRef.current.length];

      if (key === nextKey) {
        keySequenceRef.current = [...keySequenceRef.current, key];
        lastKeyTimeRef.current = currentTime;

        // Reset D-PAD timeout on activity
        if (isDPadOpen && dPadTimeoutRef.current) {
          clearTimeout(dPadTimeoutRef.current);
          dPadTimeoutRef.current = setTimeout(() => {
            setIsDPadOpen(false);
            resetSequence();
          }, D_PAD_TIMEOUT_MS);
        }

        // Check if sequence is complete
        if (keySequenceRef.current.length === KONAMI_CODE.length) {
          handleSuccess();
        }
      } else {
        // Wrong key pressed, reset
        resetSequence();
      }
    },
    [resetSequence, handleSuccess, isDPadOpen]
  );

  // Keyboard handler - defined once, uses refs for current values
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    handleKeyPress(event.code);
  }, [handleKeyPress]);

  // D-PAD button handler
  const handleDPadPress = useCallback(
    (key: string) => (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      setPressedButton(key);
      setTimeout(() => setPressedButton(null), 150);
      
      handleKeyPress(key);
    },
    [handleKeyPress]
  );

  // Shake detection
  const handleDeviceMotion = useCallback(
    (event: DeviceMotionEvent) => {
      if (!shakeEnabledRef.current || isDPadOpen || isModalOpen) return;

      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const { x, y, z } = acceleration;
      const totalAcceleration = Math.sqrt(
        (x || 0) ** 2 + (y || 0) ** 2 + (z || 0) ** 2
      );

      const now = Date.now();
      
      if (now - lastShakeTimeRef.current < 1000) return;

      if (totalAcceleration > SHAKE_THRESHOLD) {
        lastShakeTimeRef.current = now;
        setIsDPadOpen(true);
        if (dPadTimeoutRef.current) clearTimeout(dPadTimeoutRef.current);
        dPadTimeoutRef.current = setTimeout(() => {
          setIsDPadOpen(false);
          resetSequence();
        }, D_PAD_TIMEOUT_MS);
      }
    },
    [isDPadOpen, isModalOpen, resetSequence]
  );

  const requestMotionPermission = useCallback(async () => {
    if (typeof DeviceMotionEvent !== "undefined" && 
        typeof (DeviceMotionEvent as any).requestPermission === "function") {
      try {
        const permission = await (DeviceMotionEvent as any).requestPermission();
        return permission === "granted";
      } catch {
        return false;
      }
    }
    return true;
  }, []);

  // Check device type on mount
  useEffect(() => {
    setIsMobileDevice(isMobile());
    setReducedMotion(prefersReducedMotion());
  }, []);

  // Setup keyboard listener - only once
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Setup shake detection
  useEffect(() => {
    if (!isMobileDevice || reducedMotion) return;

    shakeEnabledRef.current = true;

    const handleFirstTouch = async () => {
      const granted = await requestMotionPermission();
      if (granted) {
        window.addEventListener("devicemotion", handleDeviceMotion);
      }
      document.removeEventListener("touchstart", handleFirstTouch);
    };

    if (typeof DeviceMotionEvent !== "undefined" && 
        typeof (DeviceMotionEvent as any).requestPermission === "function") {
      document.addEventListener("touchstart", handleFirstTouch, { once: true });
    } else {
      window.addEventListener("devicemotion", handleDeviceMotion);
    }

    return () => {
      window.removeEventListener("devicemotion", handleDeviceMotion);
      document.removeEventListener("touchstart", handleFirstTouch);
      if (dPadTimeoutRef.current) {
        clearTimeout(dPadTimeoutRef.current);
      }
    };
  }, [isMobileDevice, reducedMotion, handleDeviceMotion, requestMotionPermission]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const closeDPad = useCallback(() => {
    setIsDPadOpen(false);
    resetSequence();
    if (dPadTimeoutRef.current) {
      clearTimeout(dPadTimeoutRef.current);
    }
  }, [resetSequence]);

  const handleDPadBackdropClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (e.target === e.currentTarget) {
        closeDPad();
      }
    },
    [closeDPad]
  );

  const handleModalBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  const DPadButton = ({ 
    keyName, 
    display, 
    className = "" 
  }: { 
    keyName: string; 
    display: string; 
    className?: string;
  }) => (
    <button
      onTouchStart={handleDPadPress(keyName)}
      onClick={handleDPadPress(keyName)}
      className={`
        min-w-[52px] min-h-[52px]
        flex items-center justify-center
        bg-black border-2 border-neon/60
        text-neon font-bold text-lg
        rounded-lg select-none
        touch-manipulation
        transition-all duration-75
        hover:border-neon hover:bg-neon/10
        active:scale-90 active:bg-neon/30
        ${pressedButton === keyName ? "scale-90 bg-neon/30" : ""}
        ${className}
      `}
      aria-label={display}
    >
      {display}
    </button>
  );

  return (
    <>
      {isDPadOpen && !isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={handleDPadBackdropClick}
          onTouchEnd={handleDPadBackdropClick}
        >
          <div className="relative bg-black border-2 border-neon p-6 rounded-lg shadow-[0_0_30px_rgba(255,158,181,0.2)]">
            <button
              onClick={closeDPad}
              className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors p-2"
              aria-label="Close D-PAD"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <p className="text-neon text-xs font-mono mb-1">Enter the Code</p>
              <p className="text-gray-500 text-xs">
                {keySequenceRef.current.length > 0 
                  ? KONAMI_DISPLAY.slice(0, keySequenceRef.current.length).join(" ") + " _".repeat(KONAMI_CODE.length - keySequenceRef.current.length)
                  : KONAMI_DISPLAY.join(" ")
                }
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <DPadButton keyName="ArrowUp" display="↑" />

              <div className="flex items-center gap-2">
                <DPadButton keyName="ArrowLeft" display="←" />
                <div className="flex flex-col gap-2">
                  <div className="min-w-[52px] min-h-[52px]" />
                  <DPadButton keyName="ArrowDown" display="↓" />
                </div>
                <DPadButton keyName="ArrowRight" display="→" />
              </div>

              <div className="flex gap-2 mt-2">
                <div className="flex-1" />
                <DPadButton keyName="KeyB" display="B" className="bg-neon/5" />
                <DPadButton keyName="KeyA" display="A" className="bg-neon/5" />
              </div>
            </div>

            <p className="text-center text-gray-600 text-xs mt-4">
              Tap the sequence or shake again to hide
            </p>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={handleModalBackdropClick}
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
      )}
    </>
  );
}
