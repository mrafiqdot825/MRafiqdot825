"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type LoadingScreenProps = {
  message?: string;
  title?: string;
  subtitle?: string;
};

export default function LoadingScreen({
  title = "MRafiq.dev",
  subtitle = "Crafting high-impact digital experiences",
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle assembly physics
    const numParticles = 80;
    const particles = Array.from({ length: numParticles }, () => {
      const targetAngle = Math.random() * Math.PI * 2;
      const targetRadius = 120 + Math.random() * 40;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: width / 2 + Math.cos(targetAngle) * targetRadius,
        targetY: height / 2 + Math.sin(targetAngle) * targetRadius,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 2.5 + 1.5,
        color: Math.random() > 0.5 ? "#D7BDB0" : "#8A6F62",
        alpha: Math.random() * 0.7 + 0.3,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += (p.targetX - p.x) * 0.04;
        p.y += (p.targetY - p.y) * 0.04;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-offwhite overflow-hidden">
      {/* Particle Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
        {/* Glowing Logo Icon */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-rose/40 bg-cream/80 shadow-[0_0_35px_rgba(215,189,176,0.4)] backdrop-blur-md overflow-hidden mb-6">
          <Image
            src="/logo.png"
            alt="Muhammad Rafiq logo"
            width={72}
            height={72}
            className="h-full w-full object-cover scale-[1.35] animate-pulse"
          />
        </div>

        {/* Title & Brand */}
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl">
          {title}
        </h1>

        <p className="mt-3 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-(--color-rose-deep)">
          {subtitle}
        </p>

        {/* Progress Bar Container */}
        <div className="mt-8 w-full max-w-xs">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-beige border border-beige p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-(--color-rose-active) via-rose to-(--color-rose-hover) transition-all duration-150 ease-out shadow-[0_0_12px_rgba(215,189,176,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono font-semibold text-text-muted">
            <span className="uppercase tracking-widest text-(--color-rose-deep)">INITIALIZING EXPERIENCE</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </main>
  );
}
