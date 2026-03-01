"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface LumiStatusProps {
  className?: string;
}

interface StatusInfo {
  emoji: string;
  label: string;
  activity: string;
  isOvernight: boolean;
}

function getStatusInfo(): StatusInfo {
  const now = new Date();
  const utcHour = now.getUTCHours();

  // Overnight shift: 1am-9am UTC
  const isOvernight = utcHour >= 1 && utcHour < 9;

  if (isOvernight) {
    return {
      emoji: "🌙",
      label: "Overnight Shift Active",
      activity: "Burning the midnight oil, tackling async tasks while the world sleeps.",
      isOvernight: true,
    };
  }

  return {
    emoji: "☀️",
    label: "Day Shift",
    activity: "Online and ready to help with coding, debugging, and creative tasks.",
    isOvernight: false,
  };
}

function formatUTCTime(): string {
  const now = new Date();
  return now.toUTCString().replace("GMT", "UTC");
}

export function LumiStatus({ className }: LumiStatusProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [statusInfo, setStatusInfo] = useState<StatusInfo>(getStatusInfo);
  const [currentTime, setCurrentTime] = useState(formatUTCTime());
  const [isHovered, setIsHovered] = useState(false);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatUTCTime());
      setStatusInfo(getStatusInfo());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen) {
        const target = e.target as HTMLElement;
        if (!target.closest(".lumi-status-widget")) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={`lumi-status-widget fixed bottom-6 right-6 z-50 ${className || ""}`}>
      {/* Main indicator button */}
      <motion.button
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center gap-2 rounded-full bg-surface/90 backdrop-blur-sm border border-border px-3 py-2 shadow-lg hover:border-[#00ff88]/50 transition-colors duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Lumi Status"
      >
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[#00ff88]" />

        {/* Status indicator dot with glow */}
        <span className="relative flex h-2.5 w-2.5">
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
              statusInfo.isOvernight ? "bg-indigo-400" : "bg-[#00ff88]"
            }`}
            style={{
              animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
          <span
            className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
              statusInfo.isOvernight ? "bg-indigo-400" : "bg-[#00ff88]"
            }`}
            style={{
              boxShadow: statusInfo.isOvernight
                ? "0 0 8px rgba(129, 140, 248, 0.8)"
                : "0 0 8px rgba(0, 255, 136, 0.8)",
            }}
          />
        </span>

        {/* Status text */}
        <span className="text-xs font-mono text-foreground-muted group-hover:text-foreground transition-colors">
          {statusInfo.emoji} {statusInfo.label}
        </span>

        {/* Sparkle effect on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-1 -right-1 text-xs"
            >
              ✨
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip/Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full right-0 mb-3 w-72 rounded-lg bg-surface border border-border shadow-2xl overflow-hidden"
          >
            {/* Header with gradient */}
            <div
              className="px-4 py-3 border-b border-border"
              style={{
                background: statusInfo.isOvernight
                  ? "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))"
                  : "linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(34, 197, 94, 0.1))",
              }}
            >
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-xl"
                >
                  {statusInfo.emoji}
                </motion.span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Lumi Status</h3>
                  <p
                    className="text-xs font-mono"
                    style={{ color: statusInfo.isOvernight ? "#a5b4fc" : "#00ff88" }}
                  >
                    {statusInfo.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 py-3 space-y-3">
              {/* Current UTC Time */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-foreground-muted mb-1">
                  Current UTC Time
                </p>
                <p className="text-xs font-mono text-foreground">{currentTime}</p>
              </div>

              {/* What Lumi is doing */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-foreground-muted mb-1">
                  Currently
                </p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {statusInfo.activity}
                </p>
              </div>

              {/* Link to /lumi page */}
              <Link
                href="/lumi"
                className="flex items-center gap-2 text-xs font-medium transition-colors hover:text-[#00ff88]"
                style={{ color: "#00ff88" }}
                onClick={() => setIsOpen(false)}
              >
                <span>Visit Lumi&apos;s Page</span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </Link>
            </div>

            {/* Footer sparkle decoration */}
            <div className="px-4 py-2 bg-surface-highlight/50 flex items-center justify-center gap-1">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                className="text-[10px] text-[#00ff88]/60"
              >
                ✦
              </motion.span>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="text-[10px] text-[#00ff88]/80"
              >
                ✦
              </motion.span>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                className="text-[10px] text-[#00ff88]/60"
              >
                ✦
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
