// filepath: components/TacticalSidebar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface SectionNode {
  id: string;
  slideId: string;
  label: string;
}

const SECTIONS: SectionNode[] = [
  { id: "hero", slideId: "slide-hero", label: "MAIN DECK" },
  { id: "dossier", slideId: "slide-dossier", label: "ARCHITECT DOSSIER" },
  { id: "hero3d", slideId: "slide-hero3d", label: "RC18 KINEMATIC CHASSIS" },
  { id: "rarm", slideId: "slide-rarm", label: "6-DOF ROBOTIC ARM" },
  { id: "stingray", slideId: "slide-stingray", label: "STINGRAY UAV" },
  { id: "project", slideId: "slide-project", label: "PROJECT EXAMPLE" },
  { id: "project01", slideId: "slide-project01", label: "PROJECT EXAMPLE 01" },
  { id: "mosaic", slideId: "slide-mosaic", label: "TEMPORAL MOSAIC" },
  { id: "science", slideId: "slide-science", label: "RESEARCH PAPER" },
];

export default function TacticalSidebar() {
  const [activeSlide, setActiveSlide] = useState<string>("slide-hero");
  const [hoveredSlide, setHoveredSlide] = useState<string | null>(null);
  const ratioMap = useRef<Record<string, number>>({});

  useEffect(() => {
    const scrollContainer = document.querySelector(".slideshow-deck");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratioMap.current[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        // Find the section with highest visible area on screen
        let maxRatio = 0;
        let mostVisibleId = "";

        Object.entries(ratioMap.current).forEach(([id, ratio]) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisibleId = id;
          }
        });

        if (mostVisibleId) {
          setActiveSlide(mostVisibleId);
        }
      },
      {
        root: scrollContainer || null,
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      }
    );

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.slideId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (slideId: string) => {
    const el = document.getElementById(slideId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-50 font-mono select-none hidden md:flex flex-col items-end gap-3.5 group/nav">
      {SECTIONS.map((sec) => {
        const isActive = activeSlide === sec.slideId;
        const isHovered = hoveredSlide === sec.slideId;

        return (
          <button
            key={sec.id}
            type="button"
            onClick={() => scrollToSection(sec.slideId)}
            onMouseEnter={() => setHoveredSlide(sec.slideId)}
            onMouseLeave={() => setHoveredSlide(null)}
            className="flex items-center justify-end gap-3 py-1 cursor-pointer group"
          >
            {/* Section Name Label */}
            <motion.div
              initial={false}
              animate={{
                opacity: isActive || isHovered ? 1 : 0,
                x: isActive || isHovered ? 0 : 8,
              }}
              transition={{ duration: 0.15 }}
              className="text-[10px] tracking-widest uppercase flex items-center gap-1.5 whitespace-nowrap pointer-events-none"
            >
              <span
                className={`font-semibold ${
                  isActive
                    ? "text-[#FFFFFF]"
                    : isHovered
                    ? "text-[#D4D4D8]"
                    : "text-[#71717A]"
                }`}
              >
                {sec.label}
              </span>
            </motion.div>

            {/* Minimalist Horizontal Line Indicator */}
            <motion.div
              animate={{
                width: isActive ? 28 : isHovered ? 22 : 14,
                height: isActive ? 2.5 : 1.5,
                backgroundColor: isActive
                  ? "#C8A27A"
                  : isHovered
                  ? "#FFFFFF"
                  : "#3F3F46",
                boxShadow: isActive
                  ? "0 0 10px rgba(0, 255, 157, 0.7)"
                  : "none",
              }}
              transition={{ duration: 0.2 }}
              className="rounded-full"
            />
          </button>
        );
      })}
    </aside>
  );
}