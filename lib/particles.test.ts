import { test } from "node:test";
import assert from "node:assert/strict";
import { stepAndDraw, toParticles, type Pointer } from "./particles.ts";

const FRAME_S = 1 / 60;
const idlePointer = (): Pointer => ({ x: -1000, y: -1000, active: false });

// Records draw calls instead of rendering.
function fakeContext(): CanvasRenderingContext2D & { draws: number } {
  const ctx = { draws: 0, globalAlpha: 1, fillText: () => ctx.draws++ };
  return ctx as unknown as CanvasRenderingContext2D & { draws: number };
}

const points = [
  { x: 50, y: 50, char: "#", alpha: 0.9 },
  { x: 120, y: 80, char: ".", alpha: 0.5 },
];

test("toParticles keeps targets and only scatters when asked", () => {
  const settled = toParticles(points, false);
  assert.deepEqual(
    settled.map(({ x, y, targetX, targetY, delay }) => ({ x, y, targetX, targetY, delay })),
    points.map(({ x, y }) => ({ x, y, targetX: x, targetY: y, delay: 0 })),
  );

  const scattered = toParticles(points, true);
  assert.ok(scattered.every((p, i) => p.targetX === points[i].x && p.targetY === points[i].y));
});

test("scattered particles settle on their targets and the loop goes idle", () => {
  const particles = toParticles(points, true);
  const ctx = fakeContext();
  let moving = true;
  let elapsed = 0;

  for (let frame = 0; frame < 60 * 20 && moving; frame++) {
    elapsed += FRAME_S;
    moving = stepAndDraw(ctx, particles, idlePointer(), elapsed, 200);
  }

  assert.equal(moving, false, "animation should stop once settled");
  for (const p of particles) {
    assert.equal(p.x, p.targetX);
    assert.equal(p.y, p.targetY);
  }
  assert.ok(ctx.draws > 0);
});

test("an active pointer pushes nearby particles away", () => {
  const [particle] = toParticles([{ x: 100, y: 100, char: "#", alpha: 1 }], false);
  const pointer: Pointer = { x: 95, y: 100, active: true };

  const moving = stepAndDraw(fakeContext(), [particle], pointer, 10, 200);

  assert.equal(moving, true);
  assert.ok(particle.x > 100, "particle should move away from the pointer on the x axis");
});
