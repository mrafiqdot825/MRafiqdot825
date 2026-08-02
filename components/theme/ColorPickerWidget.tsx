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
          className="h-5 w-5 rounded-full border border-offwhite/50"
          style={{ backgroundColor: accent }}
        />
      </button>
    </div>
  );
}
