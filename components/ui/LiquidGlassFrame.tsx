"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface LiquidGlassFrameProps {
  children: React.ReactNode;
  className?: string;
  badgeText?: string;
  subBadgeText?: string;
}

export const LiquidGlassFrame: React.FC<LiquidGlassFrameProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative group max-w-sm mx-auto lg:mr-0 w-full select-none",
        className,
      )}
    >
      {/* 1. Fluid Ambient Glow Aura (Behind Glass) */}
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-rose/40 via-beige/30 to-cream/40 opacity-50 group-hover:opacity-90 blur-2xl transition-all duration-700 animate-pulse" />

      {/* 2. Rotating Liquid Gradient Border Container */}
      <div className="relative p-[2.5px] rounded-[2.2rem] overflow-hidden bg-gradient-to-br from-cream/50 via-beige/40 to-rose/50 shadow-[0_0_50px_rgba(215,189,176,0.3)] transition-all duration-500 group-hover:shadow-[0_0_70px_rgba(215,189,176,0.45)]">
        {/* Animated sheen background mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(215,189,176,0.25),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(227,213,202,0.3),transparent_60%)] group-hover:scale-110 transition-transform duration-700" />

        {/* 3. Liquid Glass Frame Base */}
        <div className="relative overflow-hidden rounded-[2.1rem] bg-cream/85 backdrop-blur-2xl backdrop-saturate-200 p-3 sm:p-4 border border-beige/60 shadow-[inset_0_1.5px_2px_rgba(245,235,225,0.7),inset_0_-2px_15px_rgba(215,189,176,0.25)]">
          {/* Glass Specular Light Reflection Ring */}
          <div className="absolute inset-0 pointer-events-none rounded-[2.1rem] bg-gradient-to-b from-cream/40 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Light Sweep Reflection Beam on Hover */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.1rem]">
            <div className="absolute -top-1/2 -bottom-1/2 left-0 w-1/2 bg-gradient-to-r from-transparent via-beige/50 to-transparent -rotate-45 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
          </div>

          {/* Image Content Container */}
          <div className="relative z-10 overflow-hidden rounded-2xl bg-beige/30 border border-beige/40 shadow-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidGlassFrame;
