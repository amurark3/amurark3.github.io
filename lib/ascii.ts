// Pure helpers that turn a shape into ASCII "particles" for the hero canvas.

export const ASCII_RAMP = " .:-=+*#%@";

export interface AsciiPoint {
  x: number;
  y: number;
  char: string;
  alpha: number;
}

export interface Grid {
  fontSize: number;
  stepX: number;
  stepY: number;
}

const SMALL_CANVAS_MAX = 300;
const SPHERE_RADIUS_RATIO = 0.42;
const OPAQUE_ALPHA_THRESHOLD = 128;
// Upper-left key light, pointing toward the viewer.
const LIGHT = normalize([-0.5, -0.6, 0.62]);

function normalize([x, y, z]: readonly [number, number, number]): [number, number, number] {
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
}

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));
const round1 = (value: number): number => Math.round(value * 10) / 10;
const round2 = (value: number): number => Math.round(value * 100) / 100;

export function brightnessToChar(brightness: number): string {
  const index = Math.floor(clamp01(brightness) * (ASCII_RAMP.length - 1));
  return ASCII_RAMP[index];
}

export function gridFor(size: number): Grid {
  const fontSize = size <= SMALL_CANVAS_MAX ? 5 : 7;
  return { fontSize, stepX: fontSize * 0.7, stepY: fontSize * 1.1 };
}

function toPoint(x: number, y: number, brightness: number): AsciiPoint {
  return {
    x: round1(x),
    y: round1(y),
    char: brightnessToChar(brightness),
    alpha: round2(0.4 + clamp01(brightness) * 0.6),
  };
}

/** A Lambert-shaded sphere, used when no portrait image is configured. */
export function spherePoints(size: number): AsciiPoint[] {
  const { stepX, stepY } = gridFor(size);
  const center = size / 2;
  const radius = size * SPHERE_RADIUS_RATIO;
  const points: AsciiPoint[] = [];

  for (let y = 0; y < size; y += stepY) {
    for (let x = 0; x < size; x += stepX) {
      const nx = (x - center) / radius;
      const ny = (y - center) / radius;
      const distanceSq = nx * nx + ny * ny;
      if (distanceSq > 1) continue;

      const nz = Math.sqrt(1 - distanceSq);
      const lambert = Math.max(0, nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2]);
      points.push(toPoint(x, y, 0.12 + lambert * 0.88));
    }
  }
  return points;
}

/** Samples square RGBA pixel data (size × size) into points, skipping transparent pixels. */
export function samplePixels(data: Uint8ClampedArray, size: number): AsciiPoint[] {
  const { stepX, stepY } = gridFor(size);
  const points: AsciiPoint[] = [];

  for (let y = 0; y < size; y += stepY) {
    for (let x = 0; x < size; x += stepX) {
      const offset = (Math.floor(y) * size + Math.floor(x)) * 4;
      if (data[offset + 3] <= OPAQUE_ALPHA_THRESHOLD) continue;

      const brightness = (data[offset] + data[offset + 1] + data[offset + 2]) / 765;
      points.push(toPoint(x, y, brightness));
    }
  }
  return points;
}
