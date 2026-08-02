# Adjustable Button Color Feature — Implementation Guide

Visitor-facing accent color picker for the portfolio site. Visitors pick a base color; button, badge, and focus-state shades are derived from it automatically and persisted in `localStorage`.

---

## 1. Overview

| Item             | Detail                                                                |
| ---------------- | --------------------------------------------------------------------- |
| Who can adjust   | Any site visitor                                                      |
| Persistence      | `localStorage` (per-browser, no backend/DB needed)                    |
| Scope of change  | Accent-driven UI: buttons, active nav item, badges, input focus rings |
| New dependencies | None — uses native `color-mix()` / manual shade math                  |

---

## 2. Step 1 — Centralize hardcoded colors in `globals.css`

Currently `.liquid-glass-accent-button`, `.liquid-glass-active-item`, `.glass-badge`, and `.glass-input:focus` reference hex values directly (`#d7bdb0`, `#c9a999`, `#b8907d`) instead of the existing `--color-rose*` variables. Fix this first so the variables become the single source of truth.

**Before:**

```css
.liquid-glass-accent-button {
  background: linear-gradient(135deg, #d7bdb0, #c9a999);
  box-shadow: 0 4px 20px rgba(215, 189, 176, 0.45);
}

.liquid-glass-accent-button:hover {
  box-shadow: 0 8px 28px rgba(184, 144, 125, 0.55);
}
```

**After:**

```css
.liquid-glass-accent-button {
  background: linear-gradient(
    135deg,
    var(--color-rose),
    var(--color-rose-hover)
  );
  box-shadow: 0 4px 20px color-mix(in srgb, var(--color-rose) 45%, transparent);
}

.liquid-glass-accent-button:hover {
  box-shadow: 0 8px 28px
    color-mix(in srgb, var(--color-rose-active) 55%, transparent);
}
```

Apply the same substitution to:

- `.liquid-glass-active-item` (border/background/box-shadow use `--color-rose`)
- `.glass-badge` (border/background use `--color-rose`)
- `.glass-input:focus` (border-color and box-shadow use `--color-rose`)

No other files need to change for this step — every button in the app already uses these utility classes.

---

## 3. Step 2 — Color shading helper

Create `lib/color.ts`:

```ts
// lib/color.ts

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
```

---

## 4. Step 3 — `ThemeProvider`

Create `components/theme/ThemeProvider.tsx`:

```tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { shadeColor, ACCENT_STORAGE_KEY } from "@/lib/color";

interface ThemeContextValue {
  accent: string;
  setAccent: (hex: string) => void;
  resetAccent: () => void;
}

const DEFAULT_ACCENT = "#d7bdb0";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyAccentToDocument(hex: string) {
  const root = document.documentElement;
  root.style.setProperty("--color-rose", hex);
  root.style.setProperty("--color-rose-hover", shadeColor(hex, 15));
  root.style.setProperty("--color-rose-active", shadeColor(hex, -10));
  root.style.setProperty("--color-rose-deep", shadeColor(hex, -35));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState(DEFAULT_ACCENT);

  useEffect(() => {
    const saved = localStorage.getItem(ACCENT_STORAGE_KEY);
    if (saved) {
      applyAccentToDocument(saved);
      setAccentState(saved);
    }
  }, []);

  const setAccent = useCallback((hex: string) => {
    applyAccentToDocument(hex);
    setAccentState(hex);
    localStorage.setItem(ACCENT_STORAGE_KEY, hex);
  }, []);

  const resetAccent = useCallback(() => {
    applyAccentToDocument(DEFAULT_ACCENT);
    setAccentState(DEFAULT_ACCENT);
    localStorage.removeItem(ACCENT_STORAGE_KEY);
  }, []);

  return (
    <ThemeContext.Provider value={{ accent, setAccent, resetAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
```

**Note on flash-of-default-color:** because the saved color is applied in a `useEffect` (client-only), returning visitors may see a brief flash of the default rose before their saved color applies. To eliminate this, add an inline blocking script in `app/layout.tsx` `<head>` (see Step 6) that reads `localStorage` and sets the CSS vars before paint.

---

## 5. Step 4 — Color picker widget

Create `components/theme/ColorPickerWidget.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { ACCENT_PRESETS } from "@/lib/color";

export default function ColorPickerWidget() {
  const { accent, setAccent, resetAccent } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="glass-panel mb-3 rounded-2xl p-4 w-56">
          <p className="text-caption font-medium text-text-secondary mb-3">
            Accent color
          </p>

          <div className="grid grid-cols-5 gap-2 mb-3">
            {ACCENT_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setAccent(preset.base)}
                title={preset.name}
                aria-label={`Set accent color to ${preset.name}`}
                className="h-8 w-8 rounded-full border-2 transition-transform hover:scale-110"
                style={{
                  backgroundColor: preset.base,
                  borderColor:
                    accent.toLowerCase() === preset.base.toLowerCase()
                      ? "var(--color-text-primary)"
                      : "transparent",
                }}
              />
            ))}
          </div>

          <label className="flex items-center justify-between text-small text-text-secondary">
            Custom
            <input
              type="color"
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              className="h-8 w-12 cursor-pointer rounded border border-border-default bg-transparent"
              aria-label="Pick a custom accent color"
            />
          </label>

          <button
            onClick={resetAccent}
            className="mt-3 w-full text-caption text-text-secondary underline underline-offset-2 hover:text-text-primary"
          >
            Reset to default
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open theme color picker"
        aria-expanded={open}
        className="liquid-glass-accent-button h-12 w-12 rounded-full flex items-center justify-center shadow-lg"
      >
        <span
          className="h-5 w-5 rounded-full border border-white/50"
          style={{ backgroundColor: accent }}
        />
      </button>
    </div>
  );
}
```

Notes:

- No React state library or external color-picker package needed — the native `<input type="color">` handles the custom picker UI across all modern browsers.
- The widget reuses `.glass-panel` and `.liquid-glass-accent-button`, so it automatically matches the existing visual language.

---

## 6. Step 5 — Wire into `app/layout.tsx`

```tsx
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ColorPickerWidget from "@/components/theme/ColorPickerWidget";
// ...existing imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Prevent flash of default accent color for returning visitors */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('accentColor');
                  if (saved) {
                    var root = document.documentElement;
                    root.style.setProperty('--color-rose', saved);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full bg-bg-page text-text-primary selection:bg-accent-600/40 selection:text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-text-primary"
        >
          Skip to content
        </a>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
        <ThemeProvider>
          <GlassDistortion />
          <div id="main-content">{children}</div>
          <ColorPickerWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 7. File checklist

| File                                     | Action                                                                                                                                                     |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/globals.css`                        | Edit — replace hardcoded hex in `.liquid-glass-accent-button`, `.liquid-glass-active-item`, `.glass-badge`, `.glass-input:focus` with `var(--color-rose*)` |
| `lib/color.ts`                           | Create — `shadeColor()` helper + presets                                                                                                                   |
| `components/theme/ThemeProvider.tsx`     | Create — context provider, localStorage sync                                                                                                               |
| `components/theme/ColorPickerWidget.tsx` | Create — floating swatch/picker UI                                                                                                                         |
| `app/layout.tsx`                         | Edit — wrap children in `ThemeProvider`, mount `ColorPickerWidget`, add anti-flash inline script                                                           |

---

## 8. Testing checklist

- [ ] Default page load shows the original rose accent with no picker interaction
- [ ] Selecting a preset updates all buttons, active nav item, badges, and input focus rings immediately
- [ ] Custom color picker (`<input type="color">`) updates the same elements live while dragging
- [ ] Refreshing the page after selecting a color keeps that color (no flash of default)
- [ ] "Reset to default" clears `localStorage` and restores the original rose
- [ ] Contrast: derived hover/active shades remain legible against both light text and dark text used in the design (spot-check Amber and Sky presets, which sit lighter/darker than the default)
- [ ] Picker widget is keyboard-accessible (tab to toggle button, tab through swatches, `Enter`/`Space` activates)

---

## 9. Optional follow-ups (not required for MVP)

- Sync the picked color to a query param so it can be shared via link (e.g. `?accent=%23a3c1d1`)
- Add a subtle `prefers-color-scheme: dark` variant if a dark mode is added later
- Track accent selection in Google Analytics as a custom event, to see which presets are most popular
