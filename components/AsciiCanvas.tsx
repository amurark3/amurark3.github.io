"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gridFor, samplePixels, spherePoints, type AsciiPoint } from "@/lib/ascii";
import { prefersReducedMotion } from "@/lib/motion";
import { stepAndDraw, toParticles, type Particle, type Pointer } from "@/lib/particles";
import { useInView } from "@/lib/useInView";

const MINT = "#64ffda";
const IMAGE_FILL_RATIO = 0.8;
const POINTER_SMOOTHING = 0.15;
const OFFSCREEN = -1000;

interface AsciiCanvasProps {
  /** Transparent-background image to render; a shaded sphere is drawn when omitted. */
  imageSrc?: string;
}

function loadImagePoints(src: string, size: number): Promise<AsciiPoint[]> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("2D canvas context unavailable"));

      const scale = Math.min((size * IMAGE_FILL_RATIO) / image.width, (size * IMAGE_FILL_RATIO) / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      ctx.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
      resolve(samplePixels(ctx.getImageData(0, 0, size, size).data, size));
    };
    image.onerror = () => reject(new Error(`Failed to load hero image: ${src}`));
    image.src = src;
  });
}

export function AsciiCanvas({ imageSrc }: AsciiCanvasProps) {
  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const startRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef<Pointer>({ x: OFFSCREEN, y: OFFSCREEN, active: false });
  const targetRef = useRef({ x: OFFSCREEN, y: OFFSCREEN });
  const [size, setSize] = useState(0);
  const [ready, setReady] = useState(false);
  const inView = useInView(wrapper);

  // Track the CSS-driven wrapper size so the canvas follows the responsive layout.
  useEffect(() => {
    if (!wrapper) return;
    const observer = new ResizeObserver(([entry]) => setSize(Math.round(entry.contentRect.width)));
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [wrapper]);

  // (Re)build the particle field whenever the size or source changes.
  useEffect(() => {
    if (!size) return;
    let cancelled = false;
    const reducedMotion = prefersReducedMotion();
    const begin = (points: AsciiPoint[]) => {
      if (cancelled) return;
      particlesRef.current = toParticles(points, !reducedMotion);
      // Reduced motion: pretend the intro already finished so the shape renders settled.
      startRef.current = performance.now() - (reducedMotion ? 60_000 : 0);
      setReady(true);
    };

    setReady(false);
    if (!imageSrc) {
      begin(spherePoints(size));
    } else {
      loadImagePoints(imageSrc, size)
        .then(begin)
        .catch((error: unknown) => {
          console.error(error);
          begin(spherePoints(size));
        });
    }
    return () => {
      cancelled = true;
    };
  }, [size, imageSrc]);

  const stop = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }, []);

  const start = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || frameRef.current !== null) return;

    const frame = () => {
      const pointer = pointerRef.current;
      const target = targetRef.current;
      pointer.x += (target.x - pointer.x) * POINTER_SMOOTHING;
      pointer.y += (target.y - pointer.y) * POINTER_SMOOTHING;

      ctx.clearRect(0, 0, size, size);
      const elapsedS = (performance.now() - startRef.current) / 1000;
      const moving = stepAndDraw(ctx, particlesRef.current, pointer, elapsedS, size);
      frameRef.current = moving ? requestAnimationFrame(frame) : null;
    };
    frameRef.current = requestAnimationFrame(frame);
  }, [size]);

  // Configure the backing store for crisp text on high-DPI screens.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !size) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = `${gridFor(size).fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = MINT;
  }, [size]);

  // Only animate while visible.
  useEffect(() => {
    if (ready && inView) start();
    return stop;
  }, [ready, inView, start, stop]);

  // Pointer interaction (disabled for reduced-motion users).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (!pointerRef.current.active) {
        // Jump straight to the first contact point instead of easing in from off-canvas.
        pointerRef.current = { ...targetRef.current, active: true };
      }
      start();
    };
    const onLeave = () => {
      targetRef.current = { x: OFFSCREEN, y: OFFSCREEN };
      pointerRef.current = { x: OFFSCREEN, y: OFFSCREEN, active: false };
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointercancel", onLeave);
    canvas.addEventListener("pointerup", onLeave);
    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
      canvas.removeEventListener("pointerup", onLeave);
    };
  }, [start]);

  return (
    <div
      ref={setWrapper}
      className="aspect-square w-[260px] sm:w-[340px] lg:w-[420px]"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full cursor-crosshair touch-pan-y" />
    </div>
  );
}
