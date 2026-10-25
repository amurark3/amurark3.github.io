import type { AsciiPoint } from "@/lib/ascii";

// Particles are mutated in place every animation frame; allocating ~2k objects
// at 60fps would thrash the GC, so this module is deliberately imperative.

export interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  char: string;
  baseAlpha: number;
  delay: number;
  shimmer: number;
}

export interface Pointer {
  x: number;
  y: number;
  active: boolean;
}

const SCATTER_PX = 400;
const MAX_DELAY_S = 0.4;
const REPEL_RADIUS_RATIO = 0.2;
const REPEL_STRENGTH = 4;
const SETTLE_AFTER_S = 3;
const IDLE_AFTER_S = 4;
const REST_EPSILON = 0.01;

export function toParticles(points: readonly AsciiPoint[], scatter: boolean): Particle[] {
  return points.map((point) => ({
    x: scatter ? point.x + (Math.random() - 0.5) * SCATTER_PX : point.x,
    y: scatter ? point.y + (Math.random() - 0.5) * SCATTER_PX : point.y,
    targetX: point.x,
    targetY: point.y,
    vx: 0,
    vy: 0,
    char: point.char,
    baseAlpha: point.alpha,
    delay: scatter ? Math.random() * MAX_DELAY_S : 0,
    shimmer: Math.random() * Math.PI * 2,
  }));
}

const easeOutQuad = (t: number): number => 1 - (1 - t) ** 2;
const easeOutCubic = (t: number): number => 1 - (1 - t) ** 3;

/**
 * Advances and draws one frame. Returns true while anything is still moving,
 * so the caller can stop the loop once the shape has settled.
 */
export function stepAndDraw(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  pointer: Pointer,
  elapsedS: number,
  size: number,
): boolean {
  const repelRadius = size * REPEL_RADIUS_RATIO;
  let moving = pointer.active || elapsedS < IDLE_AFTER_S;

  for (const p of particles) {
    const t = elapsedS - p.delay;
    if (t < 0) continue;

    const settling = pointer.active || t < SETTLE_AFTER_S;
    const shimmer = settling ? Math.sin(elapsedS * 2 + p.shimmer) * 0.1 : 0;
    const alpha = Math.max(0, p.baseAlpha * easeOutQuad(Math.min(t / 1.5, 1)) + shimmer);

    if (pointer.active) {
      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance > 0 && distance < repelRadius) {
        const force = (1 - distance / repelRadius) * REPEL_STRENGTH;
        p.vx += (dx / distance) * force;
        p.vy += (dy / distance) * force;
      }
    }

    const spring = 0.01 + easeOutCubic(Math.min(t / 2.5, 1)) * 0.08;
    p.vx += (p.targetX - p.x) * spring;
    p.vy += (p.targetY - p.y) * spring;

    if (settling) {
      p.vx = (p.vx + Math.sin(elapsedS * 0.5 + p.targetY * 0.1) * 0.15) * 0.92;
      p.vy = (p.vy + Math.cos(elapsedS * 0.5 + p.targetX * 0.1) * 0.15) * 0.92;
    } else {
      p.vx *= 0.85;
      p.vy *= 0.85;
    }

    p.x += p.vx;
    p.y += p.vy;

    const atRest =
      !settling && Math.abs(p.targetX - p.x) < REST_EPSILON && Math.abs(p.targetY - p.y) < REST_EPSILON;
    if (atRest) {
      p.x = p.targetX;
      p.y = p.targetY;
      p.vx = 0;
      p.vy = 0;
    } else {
      moving = true;
    }

    ctx.globalAlpha = alpha;
    ctx.fillText(p.char, p.x, p.y);
  }

  ctx.globalAlpha = 1;
  return moving;
}
