// filepath: components/CustomCursor.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
//   const [coords, setCoords] = useState({ x: 0, y: 0 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      // setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("clickable")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-9999 overflow-hidden select-none">
      {/* 1. Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#00FF9D] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* 2. Tactical Reticle Outer Frame */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <motion.div
          animate={{
            width: isHovered ? 44 : 26,
            height: isHovered ? 44 : 26,
            borderColor: isHovered ? "#00FF9D" : "rgba(197, 160, 89, 0.6)",
            rotate: isHovered ? 45 : 0,
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative border border-dashed rounded-full flex items-center justify-center"
        >
          {/* Sub-Pixel Corner Brackets
          <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-[#00FF9D]" />
          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r border-[#00FF9D]" />
          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l border-[#00FF9D]" />
          <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-[#00FF9D]" /> */}
        </motion.div>

        {/* 3. Live Screen Coordinate HUD */}
        {/* <motion.div
          animate={{ opacity: isHovered ? 1 : 0.4 }}
          className="absolute left-6 top-6 font-mono text-[8px] tracking-widest text-[#71717A] whitespace-nowrap"
        >
          <span className="text-[#00FF9D]">X:</span> {coords.x} <span className="text-[#C5A059]">Y:</span> {coords.y}
        </motion.div> */}
      </motion.div>
    </div>
  );
}