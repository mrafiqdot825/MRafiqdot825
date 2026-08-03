"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme, type ThemeMode } from "./ThemeProvider";
import { ACCENT_PRESETS } from "@/lib/color";

const PROMPT_TEXT = "Customize colors!";

const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const SystemIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const MODE_OPTIONS: {
  label: string;
  value: ThemeMode;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}[] = [
  { label: "Light", value: "light", icon: SunIcon },
  { label: "Dark", value: "dark", icon: MoonIcon },
  { label: "Auto", value: "system", icon: SystemIcon },
];

export default function ColorPickerWidget() {
  const { accent, setAccent, resetAccent, mode, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === PROMPT_TEXT) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayText === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, 800);
    } else {
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
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.05}
      whileDrag={{ scale: 1.05 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end cursor-grab active:cursor-grabbing select-none"
    >
      {/* Theme & Accent Menu Panel */}
      {open && (
        <div className="glass-panel mb-3 rounded-2xl p-4 w-60 shadow-2xl">
          {/* Header with Drag hint */}
          <div className="flex items-center justify-between mb-3 border-b border-border-default/60 pb-2">
            <span className="text-caption font-bold text-text-primary uppercase tracking-wider">
              Theme Settings
            </span>
            <span className="text-[10px] font-mono text-text-secondary flex items-center gap-1 opacity-75">
              <span>⠿</span> Drag anywhere
            </span>
          </div>

          {/* Mode Selector */}
          <div className="mb-4">
            <p className="text-caption font-semibold text-text-secondary mb-2 uppercase tracking-wider">
              Theme Mode
            </p>
            <div className="grid grid-cols-3 gap-1 bg-bg-surface/80 p-1 rounded-xl border border-border-default">
              {MODE_OPTIONS.map((opt) => {
                const IconComp = opt.icon;
                const isActive = mode === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setMode(opt.value)}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-caption font-medium transition-all cursor-pointer select-none ${
                      isActive
                        ? "bg-bg-page text-text-primary shadow-xs border border-border-default font-bold"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5 stroke-current flex-shrink-0" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Color Swatches */}
          <div className="mb-3">
            <p className="text-caption font-semibold text-text-secondary mb-2 uppercase tracking-wider">
              Accent Color
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

            <label className="flex items-center justify-between text-small text-text-secondary cursor-pointer">
              Custom
              <input
                type="color"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
                className="h-8 w-12 cursor-pointer rounded border border-border-default bg-transparent"
                aria-label="Pick a custom accent color"
              />
            </label>
          </div>

          <button
            onClick={resetAccent}
            className="mt-3 w-full text-caption text-text-secondary underline underline-offset-2 hover:text-text-primary cursor-pointer text-center"
          >
            Reset to default
          </button>
        </div>
      )}

      {/* Floating Color Widget Button with Looping Typewriter Text & Drag handle */}
      <button
        onClick={handleToggleOpen}
        aria-label={open ? "Close theme color picker" : "Open theme color picker"}
        aria-expanded={open}
        className={`liquid-glass-accent-button cursor-grab active:cursor-grabbing h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 select-none ${
          open ? "w-12 px-0" : "gap-2.5 px-3.5"
        }`}
      >
        {!open && displayText && (
          <span className="text-small font-medium text-text-primary tracking-tight pl-1 whitespace-nowrap cursor-grab active:cursor-grabbing">
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
            className="h-5 w-5 rounded-full border border-offwhite/50 shadow-sm flex-shrink-0 cursor-grab active:cursor-grabbing"
            style={{ backgroundColor: accent }}
          />
        )}
      </button>
    </motion.div>
  );
}








