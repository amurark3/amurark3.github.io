"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isLight = resolvedTheme === "light";

    if (prefersReduced) {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (isLight) {
        gradient.addColorStop(0, "#f8fafc");
        gradient.addColorStop(1, "#eef2ff");
      } else {
        gradient.addColorStop(0, "#0f1729");
        gradient.addColorStop(1, "#1a0a2e");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const MAX_PARTICLES = isMobile ? 30 : 80;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animId: number;

    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = Array.from({ length: MAX_PARTICLES }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    function drawGradient() {
      if (!ctx || !canvas) return;
      const grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height));
      if (isLight) {
        grad.addColorStop(0, "rgba(248,250,252,1)");
        grad.addColorStop(0.5, "rgba(238,242,255,1)");
        grad.addColorStop(1, "rgba(241,245,249,1)");
      } else {
        grad.addColorStop(0, "rgba(15,23,42,1)");
        grad.addColorStop(0.5, "rgba(20,10,45,1)");
        grad.addColorStop(1, "rgba(10,15,35,1)");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    function drawParticles() {
      if (!ctx) return;
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(59,130,246,${p.opacity * 0.5})`
          : `rgba(99,179,237,${p.opacity})`;
        ctx.fill();
      });
    }

    function drawConnections() {
      if (!ctx) return;
      const MAX_DIST = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = isLight ? 0.06 : 0.08;
            ctx.strokeStyle = isLight
              ? `rgba(59,130,246,${alpha * (1 - dist / MAX_DIST)})`
              : `rgba(99,179,237,${alpha * (1 - dist / MAX_DIST)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function update() {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });
    }

    function render() {
      drawGradient();
      drawConnections();
      drawParticles();
      update();
      animId = requestAnimationFrame(render);
    }

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ pointerEvents: "none", zIndex: 0 }}
    />
  );
}
