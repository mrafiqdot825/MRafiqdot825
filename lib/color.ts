/** Lightens (positive percent) or darkens (negative percent) a hex color. */
export function shadeColor(hex: string, percent: number): string {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);

  let r = (num >> 16) + Math.round(2.55 * percent);
  let g = ((num >> 8) & 0x00ff) + Math.round(2.55 * percent);
  let b = (num & 0x0000ff) + Math.round(2.55 * percent);

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export const ACCENT_PRESETS = [
  { name: "Rose", base: "#d7bdb0" }, // current default
  { name: "Sage", base: "#a8b5a0" },
  { name: "Sky", base: "#a3c1d1" },
  { name: "Amber", base: "#d9a566" },
  { name: "Lilac", base: "#b8a5c9" },
] as const;

export const ACCENT_STORAGE_KEY = "accentColor";
