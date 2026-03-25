/*
 * MatrixRain — Strict B/W/Blue variant
 * White characters fall like snow, occasional blue flashes.
 * Pauses automatically when the hero section leaves the viewport
 * via Intersection Observer.
 */

import { useEffect, useRef } from "react";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*_+-=[]{}|;:,.<>?/\\~`01";

const FONT_SIZE = 13;

interface Drop {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  isBlue: boolean;
  length: number;
}

interface MatrixRainProps {
  paused?: boolean;
}

export default function MatrixRain({ paused = false }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let drops: Drop[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDrops();
    };

    const initDrops = () => {
      const cols = Math.floor(canvas.width / FONT_SIZE);
      drops = Array.from({ length: cols }, (_, i) => ({
        x: i * FONT_SIZE,
        y: Math.random() * -canvas.height,
        speed: 0.7 + Math.random() * 1.6,
        opacity: 0.12 + Math.random() * 0.55,
        isBlue: Math.random() < 0.07,
        length: 6 + Math.floor(Math.random() * 18),
      }));
    };

    const draw = () => {
      animId = requestAnimationFrame(draw);

      if (pausedRef.current) return;

      // Fade trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px 'Share Tech Mono', monospace`;

      for (const drop of drops) {
        for (let i = 0; i < drop.length; i++) {
          const charY = drop.y - i * FONT_SIZE;
          if (charY < 0 || charY > canvas.height) continue;

          const trailFade = drop.opacity * (1 - i / drop.length);
          const char = CHARS[Math.floor(Math.random() * CHARS.length)];

          if (drop.isBlue) {
            if (i === 0) {
              ctx.fillStyle = `rgba(147, 197, 253, ${Math.min(trailFade * 1.5, 1)})`;
              ctx.shadowColor = "#3b82f6";
              ctx.shadowBlur = 6;
            } else {
              ctx.fillStyle = `rgba(59, 130, 246, ${trailFade * 0.65})`;
              ctx.shadowBlur = 0;
            }
          } else {
            if (i === 0) {
              ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(trailFade * 1.3, 1)})`;
              ctx.shadowColor = "rgba(255,255,255,0.6)";
              ctx.shadowBlur = 4;
            } else if (i < 4) {
              ctx.fillStyle = `rgba(220, 230, 255, ${trailFade * 0.8})`;
              ctx.shadowBlur = 0;
            } else {
              ctx.fillStyle = `rgba(160, 180, 210, ${trailFade * 0.45})`;
              ctx.shadowBlur = 0;
            }
          }

          ctx.fillText(char, drop.x, charY);
        }

        drop.y += drop.speed;

        if (drop.y - drop.length * FONT_SIZE > canvas.height) {
          drop.y = -FONT_SIZE * (2 + Math.random() * 8);
          drop.speed = 0.7 + Math.random() * 1.6;
          drop.opacity = 0.12 + Math.random() * 0.55;
          drop.isBlue = Math.random() < 0.07;
          drop.length = 6 + Math.floor(Math.random() * 18);
        }
      }

      ctx.shadowBlur = 0;
    };

    resize();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.5 }}
    />
  );
}
