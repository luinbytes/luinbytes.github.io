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

const TIMEOUT_MS = 5000; // 5 second timeout for keyboard
const D_PAD_TIMEOUT_MS = 10000; // 10 second auto-dismiss for D-PAD
const SHAKE_THRESHOLD = 18; // Acceleration threshold for shake detection

// Check if device is mobile
function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768
  );
}

// Check for reduced motion preference
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function KonamiCode() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDPadOpen, setIsDPadOpen] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [lastKeyTime, setLastKeyTime] = useState<number>(0);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  
  const dPadTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shakeEnabledRef = useRef(false);
  const lastShakeTimeRef = useRef(0);

  const resetSequence = useCallback(() => {
    setKeySequence([]);
  }, []);

  const handleSuccess = useCallback(() => {
    setIsModalOpen(true);
    setIsDPadOpen(false);
    resetSequence();
  }, [resetSequence]);

  // Handle key press (both keyboard and D-PAD)
  const handleKeyPress = useCallback(
    (key: string) => {
      const currentTime = Date.now();

      // Reset if too much time has passed
      if (currentTime - lastKeyTime > TIMEOUT_MS && keySequence.length > 0) {
        resetSequence();
      }

      const nextKey = KONAMI_CODE[keySequence.length];

      if (key === nextKey) {
        const newSequence = [...keySequence, key];
        setKeySequence(newSequence);
        setLastKeyTime(currentTime);

        // Reset D-PAD timeout on activity
        if (isDPadOpen) {
          resetDPadTimeout();
        }

        // Check if sequence is complete
        if (newSequence.length === KONAMI_CODE.length) {
          handleSuccess();
        }
      } else {
        // Wrong key pressed, reset
        resetSequence();
      }
    },
    [keySequence, lastKeyTime, resetSequence, handleSuccess, isDPadOpen]
  );

  const resetDPadTimeout = useCallback(() => {
    if (dPadTimeoutRef.current) {
      clearTimeout(dPadTimeoutRef.current);
    }
    dPadTimeoutRef.current = setTimeout(() => {
      setIsDPadOpen(false);
      resetSequence();
    }, D_PAD_TIMEOUT_MS);
  }, [resetSequence]);

  // Keyboard handler
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      handleKeyPress(event.code);
    },
    [handleKeyPress]
  );

  // D-PAD button handler
  const handleDPadPress = useCallback(
    (key: string) => (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Visual feedback
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
      
      // Debounce shakes (prevent multiple triggers)
      if (now - lastShakeTimeRef.current < 1000) return;

      if (totalAcceleration > SHAKE_THRESHOLD) {
        lastShakeTimeRef.current = now;
        setIsDPadOpen(true);
        resetDPadTimeout();
      }
    },
    [isDPadOpen, isModalOpen, resetDPadTimeout]
  );

  // Request permission for iOS
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
    return true; // Non-iOS devices don't need permission
  }, []);

  // Setup effects
  useEffect(() => {
    setIsMobileDevice(isMobile());
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    // Keyboard listener (desktop)
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isMobileDevice || reducedMotion) return;

    // Enable shake detection
    shakeEnabledRef.current = true;

    // iOS requires user interaction to request permission
    const handleFirstTouch = async () => {
      const granted = await requestMotionPermission();
      if (granted) {
        window.addEventListener("devicemotion", handleDeviceMotion);
      }
      document.removeEventListener("touchstart", handleFirstTouch);
    };

    // Check if permission is needed
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

  // Handle click outside D-PAD
  const handleDPadBackdropClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (e.target === e.currentTarget) {
        closeDPad();
      }
    },
    [closeDPad]
  );

  // Handle click outside modal
  const handleModalBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  // D-PAD Button component
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
      {/* D-PAD Modal (Mobile) */}
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
                {keySequence.length > 0 
                  ? KONAMI_DISPLAY.slice(0, keySequence.length).join(" ") + " _".repeat(KONAMI_CODE.length - keySequence.length)
                  : KONAMI_DISPLAY.join(" ")
                }
              </p>
            </div>

            {/* D-PAD Layout */}
            <div className="flex flex-col items-center gap-2">
              {/* Up button */}
              <DPadButton keyName="ArrowUp" display="↑" />

              {/* Middle row: Left, Down, Right */}
              <div className="flex items-center gap-2">
                <DPadButton keyName="ArrowLeft" display="←" />
                <div className="flex flex-col gap-2">
                  <div className="min-w-[52px] min-h-[52px]" /> {/* Spacer */}
                  <DPadButton keyName="ArrowDown" display="↓" />
                </div>
                <DPadButton keyName="ArrowRight" display="→" />
              </div>

              {/* B and A buttons */}
              <div className="flex gap-2 mt-2">
                <div className="flex-1" /> {/* Spacer */}
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

      {/* Success Modal */}
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
