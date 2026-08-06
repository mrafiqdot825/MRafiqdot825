"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface GenerateButtonProps {
  /** Text shown by default */
  text?: string;
  /** Text shown when active/generating. Defaults to text + "ing" */
  activeText?: string;
  /** Glow highlight color hue (0-360) — retained for API compatibility; the visual glow stays within the rose accent family regardless */
  hue?: number;
  /** Force the active/generating state */
  isGenerating?: boolean;
  /** Additional classes on the button/link element */
  className?: string;
  /** Additional classes on the outer wrapper div */
  containerClassName?: string;
  /** Optional icon to replace the default sparkles */
  icon?: React.ReactNode;
  /** If provided, renders as an <a> tag */
  href?: string;
  /** Anchor target */
  target?: string;
  /** Anchor rel */
  rel?: string;
  /** Click event handler */
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export function GenerateButton({
  text = "Generate",
  activeText,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- accepted for API compatibility, no longer drives color
  hue,
  isGenerating: controlledIsGenerating,
  className,
  containerClassName,
  icon,
  href,
  target,
  rel,
  onClick,
  ...props
}: GenerateButtonProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isGenerating = controlledIsGenerating !== undefined ? controlledIsGenerating : isFocused;
  const resolvedActiveText = activeText || (text.endsWith("e") ? text.slice(0, -1) + "ing" : text + "ing");

  const defaultIcon = (
    <svg className="gen-btn-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path>
    </svg>
  );

  const buttonContent = (
    <>
      {icon !== undefined ? (
        icon && <span className="gen-btn-svg-container shrink-0">{icon}</span>
      ) : (
        defaultIcon
      )}

      <div className="gen-txt-wrapper" style={{ minWidth: `${Math.max(text.length, resolvedActiveText.length) * 0.55}em` }}>
        <div className="gen-txt-1">
          {text.split("").map((letter, i) => (
            <span
              key={`t1-${i}`}
              className="gen-btn-letter"
              style={{ animationDelay: isGenerating ? `${i * 0.08}s, ${1 + i * 0.08}s` : `${i * 0.08}s` }}
            >
              {letter === " " ? " " : letter}
            </span>
          ))}
        </div>
        <div className="gen-txt-2">
          {resolvedActiveText.split("").map((letter, i) => (
            <span
              key={`t2-${i}`}
              className="gen-btn-letter"
              style={{ animationDelay: isGenerating ? `${i * 0.08}s, ${1 + i * 0.08}s` : `${i * 0.08}s` }}
            >
              {letter === " " ? " " : letter}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const styleBlock = (
    <style>{`
      .gen-btn {
        --border-radius: 24px;
        --padding: 4px;
        --transition: 0.4s;
        --button-color: var(--color-cream);

        user-select: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.6em 1.2em;
        font-family: "Poppins", "Inter", "Segoe UI", sans-serif;
        font-size: 0.95em;
        font-weight: 500;

        background-color: var(--button-color);

        box-shadow:
          inset 0px 1px 1px rgba(245, 235, 225, 0.5),
          inset 0px 2px 2px rgba(245, 235, 225, 0.4),
          inset 0px 4px 4px rgba(245, 235, 225, 0.3),
          inset 0px 8px 8px rgba(245, 235, 225, 0.15),
          inset 0px 16px 16px rgba(245, 235, 225, 0.15),
          0px -1px 1px rgba(44, 44, 42, 0.02),
          0px -2px 2px rgba(44, 44, 42, 0.03),
          0px -4px 4px rgba(44, 44, 42, 0.05),
          0px -8px 8px rgba(44, 44, 42, 0.06),
          0px -16px 16px rgba(44, 44, 42, 0.08);

        border: solid 1px rgba(215, 189, 176, 0.35);
        border-radius: var(--border-radius);
        cursor: pointer;

        transition: box-shadow var(--transition), border var(--transition), background-color var(--transition);
      }

      .gen-btn::before {
        content: "";
        position: absolute;
        top: calc(0px - var(--padding));
        left: calc(0px - var(--padding));
        width: calc(100% + var(--padding) * 2);
        height: calc(100% + var(--padding) * 2);
        border-radius: calc(var(--border-radius) + var(--padding));
        pointer-events: none;
        background-image: linear-gradient(0deg, rgba(44,44,42,0.1), rgba(44,44,42,0.25));

        z-index: -1;
        transition: box-shadow var(--transition), filter var(--transition);
        box-shadow: 0 -8px 8px -6px rgba(44,44,42,0) inset,
          0 -16px 16px -8px rgba(44,44,42,0) inset,
          1px 1px 1px rgba(245,235,225,0.5),
          2px 2px 2px rgba(245,235,225,0.25),
          -1px -1px 1px rgba(44,44,42,0.1),
          -2px -2px 2px rgba(44,44,42,0.05);
      }

      .gen-btn::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        pointer-events: none;
        background-image: linear-gradient(
          0deg,
          var(--color-cream),
          var(--color-rose),
          rgba(215, 189, 176, 0.5),
          8%,
          transparent
        );
        background-position: 0 0;
        opacity: 0;
        transition: opacity var(--transition), filter var(--transition);
      }

      .gen-btn-letter {
        position: relative;
        display: inline-block;
        color: rgba(44, 44, 42, 0.45);
        animation: gen-letter-anim 2s ease-in-out infinite;
        transition: color var(--transition), text-shadow var(--transition), opacity var(--transition);
      }

      @keyframes gen-letter-anim {
        50% {
          text-shadow: 0 0 3px rgba(215, 189, 176, 0.5);
          color: var(--color-text-primary);
        }
      }

      .gen-btn-svg, .gen-btn-svg-container > * {
        flex-shrink: 0;
        height: 20px;
        width: 20px;
        margin-right: 0.5rem;
        animation: gen-flicker 2s linear infinite;
        animation-delay: 0.5s;
        filter: drop-shadow(0 0 2px rgba(215, 189, 176, 0.5));
        transition: fill var(--transition), stroke var(--transition), filter var(--transition), opacity var(--transition);
      }

      @keyframes gen-flicker {
        50% { opacity: 0.3; }
      }

      .gen-txt-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }

      .gen-txt-1,
      .gen-txt-2 {
        position: absolute;
        word-spacing: -1em;
        display: flex;
      }

      .gen-txt-1 {
        animation: gen-appear-anim 1s ease-in-out forwards;
      }

      .gen-txt-2 {
        opacity: 0;
      }

      @keyframes gen-appear-anim {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }

      /* Generating (Focus/Active) state */
      .gen-btn[data-generating="true"] .gen-txt-1 {
        animation: gen-opacity-anim 0.3s ease-in-out forwards;
        animation-delay: 1s;
      }
      .gen-btn[data-generating="true"] .gen-txt-2 {
        animation: gen-opacity-anim 0.3s ease-in-out reverse forwards;
        animation-delay: 1s;
      }

      @keyframes gen-opacity-anim {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }

      .gen-btn[data-generating="true"] .gen-btn-letter {
        animation: gen-focused-letter-anim 1s ease-in-out forwards, gen-letter-anim 1.2s ease-in-out infinite;
        animation-delay: 0s, 1s;
      }

      @keyframes gen-focused-letter-anim {
        0%, 100% { filter: blur(0px); }
        50% {
          transform: scale(2);
          filter: blur(10px) brightness(105%) drop-shadow(-36px 12px 12px rgba(215, 189, 176, 0.7));
        }
      }

      .gen-btn[data-generating="true"] .gen-btn-svg,
      .gen-btn[data-generating="true"] .gen-btn-svg-container > * {
        animation-duration: 1.2s;
        animation-delay: 0.2s;
      }

      .gen-btn[data-generating="true"]::before {
        box-shadow: 0 -8px 12px -6px rgba(245,235,225,0.3) inset,
          0 -16px 16px -8px rgba(215,189,176,0.25) inset,
          1px 1px 1px rgba(245,235,225,0.3),
          2px 2px 2px rgba(245,235,225,0.15),
          -1px -1px 1px rgba(44,44,42,0.1),
          -2px -2px 2px rgba(44,44,42,0.05);
      }

      .gen-btn[data-generating="true"]::after {
        opacity: 0.6;
        mask-image: linear-gradient(0deg, #fff, transparent);
        filter: brightness(100%);
      }

      /* Hover & Active states */
      .gen-btn:active {
        border: solid 1px rgba(215, 189, 176, 0.7);
        background-color: rgba(215, 189, 176, 0.25);
      }
      .gen-btn:active::before {
        box-shadow: 0 -8px 12px -6px rgba(245,235,225,0.6) inset,
          0 -16px 16px -8px rgba(215,189,176,0.5) inset,
          1px 1px 1px rgba(245,235,225,0.4),
          2px 2px 2px rgba(245,235,225,0.2),
          -1px -1px 1px rgba(44,44,42,0.1),
          -2px -2px 2px rgba(44,44,42,0.05);
      }
      .gen-btn:active::after {
        opacity: 1;
        mask-image: linear-gradient(0deg, #fff, transparent);
        filter: brightness(105%);
      }
      .gen-btn:active .gen-btn-letter {
        text-shadow: 0 0 1px rgba(215, 189, 176, 0.9);
        animation: none;
      }

      .gen-btn:hover {
        border: solid 1px rgba(215, 189, 176, 0.5);
      }
      .gen-btn:hover::before {
        box-shadow: 0 -8px 8px -6px rgba(245,235,225,0.6) inset,
          0 -16px 16px -8px rgba(215,189,176,0.3) inset,
          1px 1px 1px rgba(245,235,225,0.3),
          2px 2px 2px rgba(245,235,225,0.15),
          -1px -1px 1px rgba(44,44,42,0.1),
          -2px -2px 2px rgba(44,44,42,0.05);
      }
      .gen-btn:hover::after {
        opacity: 1;
        mask-image: linear-gradient(0deg, #fff, transparent);
      }
      .gen-btn:hover .gen-btn-svg,
      .gen-btn:hover .gen-btn-svg-container > * {
        fill: var(--color-text-primary);
        stroke: var(--color-text-primary);
        filter: drop-shadow(0 0 3px rgba(215, 189, 176, 0.6)) drop-shadow(0 -4px 6px rgba(44,44,42,0.15));
        animation: none;
      }
    `}</style>
  );

  return (
    <div className={cn("relative inline-block group", containerClassName)}>
      {styleBlock}

      {href ? (
        (href.startsWith("/") || href.startsWith("#")) && target !== "_blank" ? (
          <Link
            href={href}
            className={cn("gen-btn", className)}
            data-generating={isGenerating}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onClick={(e) => {
              setIsFocused(true);
              onClick?.(e as any);
            }}
            {...props}
          >
            {buttonContent}
          </Link>
        ) : (
          <a
            href={href}
            target={target}
            rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
            className={cn("gen-btn", className)}
            data-generating={isGenerating}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onClick={(e) => {
              setIsFocused(true);
              onClick?.(e as any);
            }}
            {...props}
          >
            {buttonContent}
          </a>
        )
      ) : (
        <button
          type="button"
          className={cn("gen-btn", className)}
          data-generating={isGenerating}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={(e) => {
            setIsFocused(true);
            onClick?.(e);
          }}
          {...props}
        >
          {buttonContent}
        </button>
      )}
    </div>
  );
}

export default GenerateButton;
