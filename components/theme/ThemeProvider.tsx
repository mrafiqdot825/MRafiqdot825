"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { shadeColor, ACCENT_STORAGE_KEY } from "@/lib/color";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextValue {
  accent: string;
  setAccent: (hex: string) => void;
  resetAccent: () => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const DEFAULT_ACCENT = "#d7bdb0";
const MODE_STORAGE_KEY = "themeMode";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyAccentToDocument(hex: string) {
  const root = document.documentElement;
  root.style.setProperty("--color-rose", hex);
  root.style.setProperty("--color-rose-hover", shadeColor(hex, 15));
  root.style.setProperty("--color-rose-active", shadeColor(hex, -10));
  root.style.setProperty("--color-rose-deep", shadeColor(hex, -35));
}

function applyModeToDocument(mode: ThemeMode) {
  const root = document.documentElement;
  const isDark =
    mode === "dark" ||
    (mode === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState(DEFAULT_ACCENT);
  const [mode, setModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    const savedAccent = localStorage.getItem(ACCENT_STORAGE_KEY);
    if (savedAccent) {
      applyAccentToDocument(savedAccent);
      setAccentState(savedAccent);
    }

    const savedMode = (localStorage.getItem(MODE_STORAGE_KEY) as ThemeMode) || "system";
    applyModeToDocument(savedMode);
    setModeState(savedMode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      const current = (localStorage.getItem(MODE_STORAGE_KEY) as ThemeMode) || "system";
      if (current === "system") {
        applyModeToDocument("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
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

  const setMode = useCallback((newMode: ThemeMode) => {
    applyModeToDocument(newMode);
    setModeState(newMode);
    localStorage.setItem(MODE_STORAGE_KEY, newMode);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ accent, setAccent, resetAccent, mode, setMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

