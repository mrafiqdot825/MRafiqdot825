"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export interface MouseBackgroundGlowProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export const MouseBackgroundGlow: React.FC<MouseBackgroundGlowProps> = ({
  className,
  primaryColor = "rgba(124, 58, 237, 0.18)", // Electric Purple
  secondaryColor = "rgba(0, 229, 255, 0.14)", // Neon Cyan
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Smooth lerp spring physics for fluid movement
  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Don't render on touch/coarse devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className || ""}`}
      aria-hidden="true"
    >
      {/* Primary Purple Ambient Light Orb */}
      <motion.div
        className="fixed top-0 left-0 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
        }}
      />

      {/* Secondary Cyan Ambient Light Orb (Offset for Iridescent Gradient Effect) */}
      <motion.div
        className="fixed top-0 left-0 w-[450px] h-[450px] rounded-full blur-[120px] pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-30%",
          translateY: "-70%",
          background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};

export default MouseBackgroundGlow;
