import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";
import LiquidMetalButton, { type LiquidMetalProps } from "./LiquidMetalButton";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  download?: AnchorHTMLAttributes<HTMLAnchorElement>["download"];
  className?: string;
  variant?: "primary" | "secondary" | "metal" | "liquid";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  disabled?: boolean;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  // Props for the metal/liquid variant:
  icon?: ReactNode;
  iconRight?: ReactNode;
  borderWidth?: number;
  metalConfig?: Omit<LiquidMetalProps, "className" | "style">;
  size?: "sm" | "md" | "lg";
  dark?: boolean;
};

const Button = ({
  children,
  href,
  download,
  className,
  variant = "primary",
  type = "button",
  onClick,
  disabled,
  target,
  rel,
  icon,
  iconRight,
  borderWidth,
  metalConfig,
  size,
  dark,
  ...props
}: ButtonProps) => {
  if (variant === "metal") {
    return (
      <LiquidMetalButton
        href={href}
        download={download}
        target={target}
        rel={rel}
        disabled={disabled}
        onClick={onClick}
        className={className}
        icon={icon}
        borderWidth={borderWidth}
        metalConfig={metalConfig}
        size={size}
        type={type}
        dark={dark}
        {...props}
      >
        {children}
      </LiquidMetalButton>
    );
  }

  const baseClass = cn(
    "inline-flex items-center justify-center font-body text-sm font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-accent-600 focus:ring-offset-2 cursor-pointer select-none",
    variant === "liquid"
      ? "liquid-glass-accent-button text-text-primary rounded-xl px-5 py-3 font-semibold"
      : variant === "primary"
      ? "liquid-glass-accent-button text-text-primary rounded-xl px-6 py-3 font-semibold"
      : "glass-button-secondary text-text-primary rounded-xl px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed",
    size === "sm" && "px-4 py-2 text-xs rounded-lg",
    size === "lg" && "px-8 py-4 text-base rounded-2xl",
    className,
  );

  if (href) {
    const isInternal = (href.startsWith("/") || href.startsWith("#")) && !download && target !== "_blank";

    if (isInternal) {
      return (
        <Link
          href={href}
          onClick={onClick}
          target={target}
          className={baseClass}
        >
          {icon && <span className="mr-2 inline-flex items-center shrink-0">{icon}</span>}
          {children}
          {iconRight && <span className="ml-2 inline-flex items-center shrink-0">{iconRight}</span>}
        </Link>
      );
    }

    return (
      <a
        href={href}
        onClick={onClick}
        download={download}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={baseClass}
      >
        {icon && <span className="mr-2 inline-flex items-center shrink-0">{icon}</span>}
        {children}
        {iconRight && <span className="ml-2 inline-flex items-center shrink-0">{iconRight}</span>}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClass}>
      {icon && <span className="mr-2 inline-flex items-center shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="ml-2 inline-flex items-center shrink-0">{iconRight}</span>}
    </button>
  );
};

export default Button;
