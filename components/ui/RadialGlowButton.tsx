"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface RadialGlowButtonProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  href?: string;
  download?: React.AnchorHTMLAttributes<HTMLAnchorElement>["download"];
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
}

export function RadialGlowButton({
  children,
  className,
  containerClassName,
  href,
  download,
  target,
  rel,
  disabled,
  onClick,
  type = "button",
  ...props
}: RadialGlowButtonProps) {
  const content = (
    <>
      <span className="rg-shine">
        <span></span>
      </span>
      <span className="rg-bg"></span>
      <span className="rg-label flex items-center justify-center gap-2">{children}</span>
    </>
  );

  return (
    <div className={cn("relative inline-block", containerClassName)}>
      <style>{`
        @property --rg-pos-x { syntax: '<percentage>'; initial-value: 40%; inherits: false; }
        @property --rg-pos-y { syntax: '<percentage>'; initial-value: 140%; inherits: false; }
        @property --rg-spread-x { syntax: '<percentage>'; initial-value: 130%; inherits: false; }
        @property --rg-spread-y { syntax: '<percentage>'; initial-value: 170%; inherits: false; }
        @property --rg-color-1 { syntax: '<color>'; initial-value: #2c2c2a; inherits: false; }
        @property --rg-color-2 { syntax: '<color>'; initial-value: #3d322e; inherits: false; }
        @property --rg-color-3 { syntax: '<color>'; initial-value: #4a3b35; inherits: false; }
        @property --rg-color-4 { syntax: '<color>'; initial-value: #b8907d; inherits: false; }
        @property --rg-color-5 { syntax: '<color>'; initial-value: #d7bdb0; inherits: false; }
        @property --rg-border-angle { syntax: '<angle>'; initial-value: 180deg; inherits: true; }
        @property --rg-border-color-1 { syntax: '<color>'; initial-value: hsla(30, 40%, 90%, 0.7); inherits: true; }
        @property --rg-border-color-2 { syntax: '<color>'; initial-value: hsla(30, 30%, 85%, 0.25); inherits: true; }
        @property --rg-stop-1 { syntax: '<percentage>'; initial-value: 37.35%; inherits: false; }
        @property --rg-stop-2 { syntax: '<percentage>'; initial-value: 61.36%; inherits: false; }
        @property --rg-stop-3 { syntax: '<percentage>'; initial-value: 78.42%; inherits: false; }
        @property --rg-stop-4 { syntax: '<percentage>'; initial-value: 93.52%; inherits: false; }
        @property --rg-stop-5 { syntax: '<percentage>'; initial-value: 100%; inherits: false; }

        .rg-button {
          --transition: 0.25s;
          --spark: 1.8s;
          --speed: 1.2s;
          --cut: 1px;
          --bg: radial-gradient(
            var(--rg-spread-x) var(--rg-spread-y) at var(--rg-pos-x) var(--rg-pos-y),
            var(--rg-color-1) var(--rg-stop-1),
            var(--rg-color-2) var(--rg-stop-2),
            var(--rg-color-3) var(--rg-stop-3),
            var(--rg-color-4) var(--rg-stop-4),
            var(--rg-color-5) var(--rg-stop-5)
          );
          
          position: relative;
          width: 100%;
          min-width: 120px;
          min-height: 44px;
          padding: 10px 20px;
          border: none;
          border-radius: 11px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          line-height: 19px;
          color: rgba(245, 235, 225, 0.95);
          background: var(--bg);
          cursor: pointer;
          text-shadow: 0 0 2px rgba(44, 44, 42, 0.6);
          overflow: hidden;
          -webkit-font-smoothing: antialiased;
          -webkit-tap-highlight-color: transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: 
            --rg-pos-x .75s, --rg-pos-y .75s,
            --rg-spread-x .75s, --rg-spread-y .75s,
            --rg-color-1 .75s, --rg-color-2 .75s, --rg-color-3 .75s, --rg-color-4 .75s, --rg-color-5 .75s,
            --rg-border-angle .75s, --rg-border-color-1 .75s, --rg-border-color-2 .75s,
            --rg-stop-1 .75s, --rg-stop-2 .75s, --rg-stop-3 .75s, --rg-stop-4 .75s, --rg-stop-5 .75s;
        }

        .rg-button::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: inherit;
          background-image: linear-gradient(var(--rg-border-angle), var(--rg-border-color-1), var(--rg-border-color-2));
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
        }

        .rg-button:hover {
          --rg-pos-x: 0%;
          --rg-pos-y: 120%;
          --rg-spread-x: 110.24%;
          --rg-spread-y: 110.2%;
          --rg-color-1: #3d322e;
          --rg-color-2: #d7bdb0;
          --rg-color-3: #4a3b35;
          --rg-color-4: #c9a999;
          --rg-stop-1: 0%;
          --rg-stop-2: 10%;
          --rg-stop-3: 35.44%;
          --rg-stop-4: 71.34%;
          --rg-stop-5: 150%;
          --rg-border-angle: 190deg;
          --rg-border-color-1: hsla(20, 40%, 85%, 0.3);
          --rg-border-color-2: hsla(20, 35%, 80%, 0.4);
          --button-line-opacity: 1;
        }

        .rg-label {
          position: relative;
          z-index: 1;
        }

        .rg-bg {
          position: absolute;
          inset: var(--cut);
          background: var(--bg);
          border-radius: inherit;
          transition: background var(--transition), opacity var(--transition);
        }

        .rg-shine {
          position: absolute;
          inset: 0;
          container-type: size;
          border-radius: inherit;
          mix-blend-mode: soft-light;
          opacity: var(--button-line-opacity, 0);
          transition: opacity 0.3s;
          overflow: visible;
        }

        .rg-shine span {
          position: absolute;
          inset: 0;
          height: 100cqh;
          aspect-ratio: 1;
          animation: rg-slide var(--speed) ease-in-out infinite alternate;
          overflow: visible;
        }

        .rg-shine span::before {
          content: "";
          position: absolute;
          inset: -100%;
          background: conic-gradient(
            from calc(270deg - (90deg * 0.5)),
            transparent 0,
            #fff 90deg,
            transparent 90deg
          );
          animation: rg-spin conic-gradient calc(var(--speed) * 2) infinite linear;
          animation-name: rg-spin;
          animation-duration: calc(var(--speed) * 2);
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }

        @keyframes rg-spin {
          0% { rotate: 0deg; }
          15%, 35% { rotate: 90deg; }
          65%, 85% { rotate: 270deg; }
          100% { rotate: 360deg; }
        }

        @keyframes rg-slide {
          to { transform: translate(calc(100cqw - 100%), 0); }
        }
      `}</style>
      
      {href ? (
        (href.startsWith("/") || href.startsWith("#")) && !download && target !== "_blank" ? (
          <Link
            href={href}
            className={cn("rg-button", className)}
            onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
            {...props}
          >
            {content}
          </Link>
        ) : (
          <a
            href={href}
            download={download}
            target={target}
            rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
            className={cn("rg-button", className)}
            onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
            {...props}
          >
            {content}
          </a>
        )
      ) : (
        <button
          disabled={disabled}
          type={type}
          className={cn("rg-button", className)}
          onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
          {...props}
        >
          {content}
        </button>
      )}
    </div>
  );
}

export default RadialGlowButton;
