// filepath: components/LazyCanvas.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

interface LazyCanvasProps {
  children: React.ReactNode;
  camera: { position: [number, number, number]; fov: number };
  className?: string;
}

export default function LazyCanvas({ children, camera, className }: LazyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {isInView ? (
        <Canvas
          camera={camera}
          dpr={[1, 1.5]} // Restrict maximum pixel ratio to prevent CPU thrashing
          gl={{
            antialias: false, // Disabling MSAA drops frame buffer allocations significantly
            powerPreference: "high-performance",
            depth: true,
            stencil: false,
          }}
          className={className}
        >
          {children}
        </Canvas>
      ) : (
        <div className="w-full h-full bg-[#000000] flex items-center justify-center font-mono text-[10px] text-[#71717A]">
          [CANVAS STANDBY // GPU PAUSED]
        </div>
      )}
    </div>
  );
}