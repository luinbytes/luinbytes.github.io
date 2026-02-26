"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
  char: string;
}

const SPARKLE_CHARS = ["✨", "⭐", "💫", "✧", "★", "♡"];
const SPAWN_INTERVAL = 80;
const MAX_PARTICLES = 20;

export function CursorTrail() {
  const [enabled, setEnabled] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef(0);
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check reduced motion preference on mount
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducedMotion) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const createParticle = (x: number, y: number): Particle => ({
      x,
      y,
      size: 12 + Math.random() * 8,
      opacity: 1,
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: (Math.random() - 0.5) * 2 - 1,
      char: SPARKLE_CHARS[Math.floor(Math.random() * SPARKLE_CHARS.length)],
    });

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      if (now - lastSpawnRef.current < SPAWN_INTERVAL) return;
      if (particlesRef.current.length >= MAX_PARTICLES) return;
      
      lastSpawnRef.current = now;
      particlesRef.current.push(createParticle(e.clientX, e.clientY));
    };

    const animate = () => {
      if (!containerRef.current) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Update particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.velocityX;
        p.y += p.velocityY;
        p.opacity -= 0.025;
        p.size *= 0.97;
        return p.opacity > 0;
      });

      // Render particles
      containerRef.current.innerHTML = particlesRef.current
        .map(
          (p) => `<span style="
            position: fixed;
            left: ${p.x}px;
            top: ${p.y}px;
            font-size: ${p.size}px;
            opacity: ${p.opacity};
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            color: #ff9eb5;
            text-shadow: 0 0 6px rgba(255, 158, 181, 0.6);
          ">${p.char}</span>`
        )
        .join("");

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <div ref={containerRef} aria-hidden="true" className="fixed inset-0 pointer-events-none" />;
}
