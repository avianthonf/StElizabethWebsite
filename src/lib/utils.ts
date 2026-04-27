import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind merge utility — merges Tailwind classes intelligently.
 * Use this instead of template literal class concatenation
 * to avoid specificity conflicts and duplicate classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Clamp utility — matches the Walker fluid typography formula.
 * size = clamp(min, pref, max)
 */
export function clamp(min: number, pref: number, max: number): string {
  return `clamp(${min}px, ${pref}px, ${max}px)`;
}

/**
 * Map a value from one range to another (linear interpolation).
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}