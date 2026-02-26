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
const PARTICLE_LIFETIME = 800;
const SPAWN_INTERVAL = 80;
const MAX_PARTICLES = 20;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function CursorTrail() {
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef(0);
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

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
      if (!containerRef.current) return;

      // Update particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.velocityX;
        p.y += p.velocityY;
        p.opacity -= 0.02;
        p.size *= 0.98;
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
            text-shadow: 0 0 4px rgba(255, 158, 181, 0.5);
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
  }, []);

  if (prefersReducedMotion()) return null;

  return <div ref={containerRef} aria-hidden="true" />;
}
