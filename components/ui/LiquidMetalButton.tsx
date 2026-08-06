"use client";

import React, { memo, forwardRef } from "react";
import Link from "next/link";
import { LiquidMetal as LiquidMetalShader } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

// ============================================================================
// LiquidMetal - Base shader wrapper component
// ============================================================================

export interface LiquidMetalProps {
  /** Base background color of the liquid metal */
  colorBack?: string;
  /** Tint/highlight color for the chrome effect */
  colorTint?: string;
  /** Animation speed (0.1 - 2.0 recommended) */
  speed?: number;
  /** Pattern complexity/repetition (1 - 10) */
  repetition?: number;
  /** Wave distortion amount (0 - 1) */
  distortion?: number;
  /** Texture scale */
  scale?: number;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

export const LiquidMetal = memo(function LiquidMetal({
  colorBack = "#b3a89e",
  colorTint = "#f5ebe1",
  speed = 0.4,
  repetition = 4,
  distortion = 0.15,
  scale = 1,
  className,
  style,
}: LiquidMetalProps) {
  return (
    <div
      className={cn("absolute inset-0 z-0 overflow-hidden", className)}
      style={style}
    >
      <LiquidMetalShader
        colorBack={colorBack}
        colorTint={colorTint}
        speed={speed}
        repetition={repetition}
        distortion={distortion}
        softness={0}
        shiftRed={0.3}
        shiftBlue={-0.3}
        angle={45}
        shape="none"
        scale={scale}
        fit="cover"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
});

LiquidMetal.displayName = "LiquidMetal";

// ============================================================================
// LiquidMetalButton - Premium button with liquid metal border effect
// ============================================================================

export interface LiquidMetalButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Optional icon displayed on the left */
  icon?: React.ReactNode;
  /** Border width in pixels */
  borderWidth?: number;
  /** Configuration for the LiquidMetal shader */
  metalConfig?: Omit<LiquidMetalProps, "className" | "style">;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Optional link destination. If provided, renders as an <a> tag */
  href?: string;
  /** Anchor download attribute */
  download?: React.AnchorHTMLAttributes<HTMLAnchorElement>["download"];
  /** Anchor target attribute */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  /** Anchor rel attribute */
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  /** Disabled state (only applies when rendering as a button) */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Click event handler */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Button type attribute (only applies when rendering as a button) */
  type?: "button" | "submit" | "reset";
  /** Force the button to be dark in all modes */
  dark?: boolean;
}

export const LiquidMetalButton = forwardRef<
  any,
  LiquidMetalButtonProps
>(
  (
    {
      children,
      icon,
      borderWidth = 4,
      metalConfig,
      size = "md",
      className,
      disabled,
      href,
      download,
      target,
      rel,
      onClick,
      type = "button",
      dark = false,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: "py-2 pl-2 pr-6 gap-3 text-sm",
      md: "py-3 pl-3 pr-8 gap-4 text-base",
      lg: "py-4 pl-4 pr-10 gap-6 text-lg",
    };

    const iconSizes = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
    };

    const content = (
      <div
        className="relative rounded-full overflow-hidden shadow-[0_20px_50px_-12px_rgba(44,44,42,0.18)]"
        style={{ padding: borderWidth }}
      >
        {/* Liquid Metal Border Layer */}
        <LiquidMetal
          colorBack={metalConfig?.colorBack ?? "#b3a89e"}
          colorTint={metalConfig?.colorTint ?? "#f5ebe1"}
          speed={metalConfig?.speed ?? 0.4}
          repetition={metalConfig?.repetition ?? 4}
          distortion={metalConfig?.distortion ?? 0.15}
          scale={metalConfig?.scale ?? 1}
          className="absolute inset-0 z-0 rounded-full"
        />

        {/* Inner Button Body */}
        <div
          className={cn(
            "relative z-10 rounded-full flex items-center justify-center transition-colors duration-200",
            dark
              ? "bg-text-primary group-hover:bg-[#3d322e]"
              : "bg-cream group-hover:bg-beige",
            sizeStyles[size]
          )}
        >
          {icon && (
            <div
              className={cn(
                "rounded-full flex items-center justify-center flex-shrink-0 shadow-[inset_0_2px_4px_rgba(44,44,42,0.1)]",
                dark
                  ? "bg-[#3d322e]"
                  : "bg-beige",
                iconSizes[size]
              )}
            >
              <span className={dark ? "text-beige" : "text-text-secondary"}>
                {icon}
              </span>
            </div>
          )}
          <span className={cn("font-medium tracking-tight", dark ? "text-offwhite" : "text-text-primary")}>
            {children}
          </span>
        </div>
      </div>
    );

    if (href) {
      const isInternal = (href.startsWith("/") || href.startsWith("#")) && !download && target !== "_blank";
      const linkClass = cn(
        "relative group cursor-pointer border-none bg-transparent p-0 outline-none transition-transform active:scale-[0.98] inline-block",
        className
      );

      if (isInternal) {
        return (
          <Link
            href={href}
            onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
            className={linkClass}
            {...props}
          >
            {content}
          </Link>
        );
      }

      return (
        <a
          ref={ref}
          href={href}
          download={download}
          target={target}
          rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          className={linkClass}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        type={type}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        className={cn(
          "relative group cursor-pointer border-none bg-transparent p-0 outline-none transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          className
        )}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

LiquidMetalButton.displayName = "LiquidMetalButton";

export default LiquidMetalButton;
