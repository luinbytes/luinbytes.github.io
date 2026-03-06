'use client';

import { useEffect, useRef } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  createdAt: number;
}

interface SparkleTrailProps {
  colorHue?: number;
  maxSparkles?: number;
  fadeTime?: number;
}

export function SparkleTrail({
  colorHue = 340, // Pink to match neon theme
  maxSparkles = 15,
  fadeTime = 800,
}: SparkleTrailProps) {
  const sparklesRef = useRef<Sparkle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTimeRef = useRef(0);
  const idCounterRef = useRef(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle to every 40ms for performance
      if (now - lastTimeRef.current < 40) return;
      lastTimeRef.current = now;

      const newSparkle: Sparkle = {
        id: idCounterRef.current++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 5 + 2,
        color: `hsl(${colorHue + Math.random() * 20 - 10}, ${80 + Math.random() * 15}%, ${70 + Math.random() * 15}%)`,
        createdAt: now,
      };

      sparklesRef.current = [...sparklesRef.current.slice(-maxSparkles), newSparkle];
    };

    const renderLoop = () => {
      const now = Date.now();
      
      // Clean up old sparkles
      sparklesRef.current = sparklesRef.current.filter(
        (s) => now - s.createdAt < fadeTime
      );

      // Re-render
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        sparklesRef.current.forEach((sparkle) => {
          const age = now - sparkle.createdAt;
          const opacity = Math.max(0, 1 - age / fadeTime);
          const el = document.createElement('div');
          el.style.cssText = `
            position: fixed;
            left: ${sparkle.x}px;
            top: ${sparkle.y}px;
            width: ${sparkle.size}px;
            height: ${sparkle.size}px;
            border-radius: 50%;
            background: ${sparkle.color};
            pointer-events: none;
            opacity: ${opacity};
            transform: translate(-50%, -50%);
            box-shadow: 0 0 ${sparkle.size * 2}px ${sparkle.color};
            z-index: 9999;
            transition: opacity 0.1s ease-out;
          `;
          containerRef.current?.appendChild(el);
        });
      }

      requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [colorHue, maxSparkles, fadeTime]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
