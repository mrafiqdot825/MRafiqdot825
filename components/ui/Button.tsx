import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import LiquidMetalButton, { type LiquidMetalProps } from "./LiquidMetalButton";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  download?: AnchorHTMLAttributes<HTMLAnchorElement>["download"];
  className?: string;
  variant?: "primary" | "secondary" | "metal";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  disabled?: boolean;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  // Props for the metal variant:
  icon?: ReactNode;
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
    "inline-flex items-center justify-center font-body text-sm font-medium transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-accent-600 focus:ring-offset-2",
    variant === "primary"
      ? "bg-accent-600 text-text-primary rounded-[12px] px-6 py-3 hover:bg-accent-700 active:bg-accent-800 disabled:bg-accent-100 disabled:text-text-muted disabled:cursor-not-allowed"
      : "glass-button-secondary text-text-primary rounded-[12px] px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed",
    className,
  );

  if (href) {
    return (
      <a href={href} download={download} target={target} rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)} className={baseClass}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClass}>
      {children}
    </button>
  );
};

export default Button;
