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
