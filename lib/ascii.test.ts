import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ASCII_RAMP,
  brightnessToChar,
  gridFor,
  samplePixels,
  spherePoints,
} from "./ascii.ts";

test("brightnessToChar maps the ends of the ramp and clamps out-of-range input", () => {
  assert.equal(brightnessToChar(0), ASCII_RAMP[0]);
  assert.equal(brightnessToChar(1), ASCII_RAMP[ASCII_RAMP.length - 1]);
  assert.equal(brightnessToChar(-3), ASCII_RAMP[0]);
  assert.equal(brightnessToChar(7), ASCII_RAMP[ASCII_RAMP.length - 1]);
});

test("gridFor uses a smaller font on small canvases", () => {
  const small = gridFor(280);
  const large = gridFor(420);
  assert.ok(small.fontSize < large.fontSize);
  assert.ok(small.stepX > 0 && small.stepY > small.stepX);
});

test("spherePoints stays inside the sphere and uses only ramp characters", () => {
  const size = 300;
  const points = spherePoints(size);
  const center = size / 2;
  const radius = size * 0.42;

  assert.ok(points.length > 500, `expected a dense sphere, got ${points.length} points`);
  for (const p of points) {
    assert.ok(Math.hypot(p.x - center, p.y - center) <= radius + 0.001);
    assert.ok(ASCII_RAMP.includes(p.char));
    assert.ok(p.alpha >= 0.4 && p.alpha <= 1);
  }
});

test("spherePoints is lit from the upper left", () => {
  const size = 300;
  const center = size / 2;
  const points = spherePoints(size);
  const mean = (xs: number[]): number => xs.reduce((a, b) => a + b, 0) / xs.length;

  const upperLeft = mean(points.filter((p) => p.x < center && p.y < center).map((p) => p.alpha));
  const lowerRight = mean(points.filter((p) => p.x > center && p.y > center).map((p) => p.alpha));
  assert.ok(upperLeft > lowerRight);
});

test("samplePixels skips transparent pixels", () => {
  const size = 40;
  const transparent = new Uint8ClampedArray(size * size * 4);
  assert.deepEqual(samplePixels(transparent, size), []);
});

test("samplePixels maps opaque white pixels to the brightest character", () => {
  const size = 40;
  const white = new Uint8ClampedArray(size * size * 4).fill(255);
  const points = samplePixels(white, size);

  assert.ok(points.length > 0);
  assert.ok(points.every((p) => p.char === ASCII_RAMP[ASCII_RAMP.length - 1] && p.alpha === 1));
});
