"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { ACCENT_PRESETS } from "@/lib/color";

const PROMPT_TEXT = "Customize colors!";

export default function ColorPickerWidget() {
  const { accent, setAccent, resetAccent } = useTheme();
  const [open, setOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === PROMPT_TEXT) {
      // Pause at full text for 2.2 seconds before starting backspace
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayText === "") {
      // Pause briefly at empty state before re-typing
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, 800);
    } else {
      // Typing speed: 65ms per char, Deleting speed: 35ms per char
      const speed = isDeleting ? 35 : 65;
      timer = setTimeout(() => {
        setDisplayText((current) =>
          isDeleting
            ? PROMPT_TEXT.slice(0, current.length - 1)
            : PROMPT_TEXT.slice(0, current.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting]);

  const handleToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Color Palette Menu Panel */}
      {open && (
        <div className="glass-panel mb-3 rounded-2xl p-4 w-56 shadow-2xl">
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
                className="h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer"
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
            className="mt-3 w-full text-caption text-text-secondary underline underline-offset-2 hover:text-text-primary cursor-pointer"
          >
            Reset to default
          </button>
        </div>
      )}

      {/* Floating Color Widget Button with Looping Typewriter Text & Close Cross Icon */}
      <button
        onClick={handleToggleOpen}
        aria-label={open ? "Close theme color picker" : "Open theme color picker"}
        aria-expanded={open}
        className={`liquid-glass-accent-button cursor-pointer h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 select-none ${open ? "w-12 px-0" : "gap-2.5 px-3.5"
          }`}
      >
        {!open && displayText && (
          <span className="text-small font-medium text-text-primary tracking-tight pl-1 whitespace-nowrap cursor-pointer">
            {displayText}
          </span>
        )}

        {open ? (
          <svg
            className="w-5 h-5 stroke-current text-text-primary transition-transform duration-200"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.5"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <span
            className="h-5 w-5 rounded-full border border-offwhite/50 shadow-sm flex-shrink-0 cursor-pointer"
            style={{ backgroundColor: accent }}
          />
        )}
      </button>
    </div>
  );
}






