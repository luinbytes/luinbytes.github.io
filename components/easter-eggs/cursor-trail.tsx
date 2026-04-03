"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
}

const SPAWN_INTERVAL = 80;
const MAX_PARTICLES = 20;

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
      size: 3 + Math.random() * 3,
      opacity: 0.6,
      velocityX: (Math.random() - 0.5) * 1,
      velocityY: (Math.random() - 0.5) * 1,
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
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.velocityX;
        p.y += p.velocityY;
        p.opacity -= 0.02;
        p.size *= 0.98;
        return p.opacity > 0;
      });

      if (containerRef.current) {
        containerRef.current.innerHTML = particlesRef.current
          .map(
            (p) => `<span style="
              position: fixed;
              left: ${p.x}px;
              top: ${p.y}px;
              width: ${Math.max(1, p.size)}px;
              height: ${Math.max(1, p.size)}px;
              background: #FFFFFF;
              opacity: ${Math.max(0, p.opacity)};
              pointer-events: none;
              transform: translate(-50%, -50%);
              z-index: 9999;
            "></span>`
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
