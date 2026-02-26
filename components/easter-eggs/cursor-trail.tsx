"use client";

import { useEffect, useRef } from "react";

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
const SPAWN_INTERVAL = 60;
const MAX_PARTICLES = 30;

export function CursorTrail() {
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    const createParticle = (x: number, y: number): Particle => ({
      x,
      y,
      size: 14 + Math.random() * 10,
      opacity: 1,
      velocityX: (Math.random() - 0.5) * 3,
      velocityY: (Math.random() - 0.5) * 3 - 1.5,
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
      if (!mountedRef.current) return;
      
      // Update particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.velocityX;
        p.y += p.velocityY;
        p.opacity -= 0.03;
        p.size *= 0.96;
        return p.opacity > 0;
      });

      // Render particles
      if (containerRef.current) {
        containerRef.current.innerHTML = particlesRef.current
          .map(
            (p) => `<span style="
              position: fixed;
              left: ${p.x}px;
              top: ${p.y}px;
              font-size: ${Math.max(8, p.size)}px;
              opacity: ${Math.max(0, p.opacity)};
              pointer-events: none;
              transform: translate(-50%, -50%);
              z-index: 9999;
              color: #ff9eb5;
              text-shadow: 0 0 8px rgba(255, 158, 181, 0.8);
            ">${p.char}</span>`
          )
          .join("");
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      mountedRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      aria-hidden="true" 
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
