"use client";
 
 import React from "react";
 import { motion } from "framer-motion";
 import { cn } from "@/lib/utils";
 
 export type AnimatedButtonProps = React.HTMLAttributes<HTMLElement> & {
     children?: React.ReactNode;
     as?: "button" | "a";
     href?: string;
     target?: string;
     rel?: string;
     download?: any;
     type?: "button" | "submit" | "reset";
     disabled?: boolean;
     whileHover?: any;
     whileTap?: any;
     transition?: any;
     animate?: any;
     initial?: any;
     dark?: boolean;
   };

/**
 * AnimatedButton
 * - theme-aware: uses Tailwind `dark:` classes so it works in both light and dark mode
 * - accepts all native button/anchor props (onClick, className, type, href, etc.)
 */
export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children = "Browse Components",
  className = "",
  as = "button",
  href,
  target,
  rel,
  download,
  type,
  disabled,
  dark = false,
  ...rest
}) => {
  const Component = as === "a" ? motion.a : motion.button;

  // Compile props specific to each tag type to avoid React HTML attribute warnings
  const elementProps = as === "a"
    ? { href, target, rel: rel || (target === "_blank" ? "noopener noreferrer" : undefined), download }
    : { type: type || "button", disabled };

  return (
    <Component
      {...elementProps}
      {...(rest as any)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      }}
      // Set a CSS variable `--shine` used for the border sweep effect.
      className={cn(
        "group inline-flex items-center justify-center px-6 py-2.5 rounded-xl relative overflow-hidden transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose disabled:pointer-events-none disabled:opacity-50 font-medium",
        dark
          ? "bg-text-primary border border-text-primary text-offwhite [--shine:rgba(245,235,225,.5)]"
          : "bg-cream border border-beige text-text-primary [--shine:rgba(44,44,42,.35)]",
        className,
      )}
    >
      {/* Text with shine mask */}
      <motion.span
        className="tracking-wide font-light flex items-center justify-center h-full w-full relative z-10"
        style={{
          WebkitMaskImage:
            "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
          maskImage:
            "linear-gradient(-75deg, white calc(var(--mask-x) + 20%), transparent calc(var(--mask-x) + 30%), white calc(var(--mask-x) + 100%))",
        }}
        initial={{ ["--mask-x" as any]: "100%" } as any}
        animate={{ ["--mask-x" as any]: "-100%" } as any}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
          repeatDelay: 1,
        }}
      >
        {children}
      </motion.span>

      {/* Border shine effect uses the --shine variable so it adapts to theme */}
      <motion.span
        className="block absolute inset-0 rounded-[12px] p-px"
        style={{
          background:
            "linear-gradient(-75deg, transparent 30%, var(--shine) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
        }}
        initial={{ backgroundPosition: "100% 0", opacity: 0 }}
        animate={{ backgroundPosition: ["100% 0", "0% 0"], opacity: [0, 1, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1,
        }}
      />
    </Component>
  );
};

export default AnimatedButton;
