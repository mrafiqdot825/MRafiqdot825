"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [hoverState, setHoverState] = useState<"default" | "hover" | "text" | "interactive">("default");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const scaleX = useSpring(1, springConfig);
  const scaleY = useSpring(1, springConfig);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;

      lastX = e.clientX;
      lastY = e.clientY;

      const speed = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      // Magnetic & target hover detection
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest("a, button, [role='button'], input, textarea, select, .interactive");
        const isText = target.closest("p, h1, h2, h3, h4, h5, h6, span");

        if (isInteractive) {
          setHoverState("interactive");
        } else if (isText && !isInteractive) {
          setHoverState("text");
        } else {
          setHoverState("default");
        }
      }

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Velocity stretch
      const stretch = Math.min(speed * 0.015, 0.45);
      scaleX.set(1 + stretch);
      scaleY.set(1 - stretch * 0.5);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        scaleX.set(1);
        scaleY.set(1);
      }, 100);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      clearTimeout(timeoutId);
    };
  }, [cursorX, cursorY, scaleX, scaleY, isVisible]);

  // Don't render on touch devices or before initial mouse move
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Primary Glowing Ring Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          scaleX,
          scaleY,
        }}
        animate={{
          width: hoverState === "interactive" ? 56 : hoverState === "text" ? 24 : 32,
          height: hoverState === "interactive" ? 56 : hoverState === "text" ? 24 : 32,
          backgroundColor:
            hoverState === "interactive"
              ? "rgba(215, 189, 176, 0.22)"
              : hoverState === "text"
              ? "rgba(227, 213, 202, 0.28)"
              : "rgba(215, 189, 176, 0.15)",
          borderColor:
            hoverState === "interactive"
              ? "rgba(138, 111, 98, 0.85)"
              : hoverState === "text"
              ? "rgba(201, 169, 153, 0.7)"
              : "rgba(215, 189, 176, 0.6)",
          borderWidth: hoverState === "interactive" ? "2px" : "1.5px",
          opacity: isVisible ? 1 : 0,
          boxShadow:
            hoverState === "interactive"
              ? "0 0 25px rgba(215, 189, 176, 0.45), inset 0 0 12px rgba(215, 189, 176, 0.25)"
              : "0 0 15px rgba(215, 189, 176, 0.3)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {/* Center Glowing Dot */}
        <div
          className={`absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
            hoverState === "interactive" ? "bg-(--color-rose-deep) scale-150 shadow-[0_0_8px_#8A6F62]" : "bg-rose"
          }`}
        />
      </motion.div>
    </div>
  );
}
