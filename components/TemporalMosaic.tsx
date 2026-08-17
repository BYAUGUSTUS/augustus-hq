// filepath: components/TemporalMosaic.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Eye,
  Workflow,
  Terminal,
  FileCode,
  Globe,
  Binary,
  Sparkles,
  Layers,
  Container,
  Zap,
  Boxes,
  Radio,
  Bot,
  Compass,
  Monitor,
  Activity,
  Disc,
  ShieldCheck,
} from "lucide-react";

// ==========================================
// 1. MASTER UNIFIED COMPOSITE PHOTO (FACE 2)
// ==========================================
const MASTER_BIG_PHOTO = "/BY_Major.png";

interface MosaicTileData {
  id: number;
  row: number; // 0..3
  col: number; // 0..3
  // --- FACE 0: TECH STACK ---
  techName: string;
  techCategory: string;
  techIcon: typeof Terminal;
  // --- FACE 1: DOMAINS (FROM INVENTORY) ---
  domainGroup: string;
  domainName: string;
  domainDetail: string;
  domainIcon: typeof Terminal;
}

const MOSAIC_TILES: MosaicTileData[] = [
  // --- ROW 0 ---
  {
    id: 0,
    row: 0,
    col: 0,
    techName: "PYTHON",
    techCategory: "AI / SCRIPTING",
    techIcon: Terminal,
    domainGroup: "SYSTEMS",
    domainName: "EMBEDDED SYSTEMS",
    domainDetail: "Real-Time RTOS & Micro-Kernels",
    domainIcon: Cpu,
  },
  {
    id: 1,
    row: 0,
    col: 1,
    techName: "C / C++20",
    techCategory: "LOW-LEVEL FIRMWARE",
    techIcon: Code2,
    domainGroup: "SYSTEMS",
    domainName: "ROBOTICS",
    domainDetail: "Actuator Kinematics & 6-DOF Arms",
    domainIcon: Bot,
  },
  {
    id: 2,
    row: 0,
    col: 2,
    techName: "OPENCV",
    techCategory: "SPATIAL VISION",
    techIcon: Eye,
    domainGroup: "SYSTEMS",
    domainName: "HUMAN-MACHINE HMI",
    domainDetail: "Voice & Gesture Control Interfaces",
    domainIcon: Monitor,
  },
  {
    id: 3,
    row: 0,
    col: 3,
    techName: "ROS / ROS2",
    techCategory: "MIDDLEWARE",
    techIcon: Workflow,
    domainGroup: "SYSTEMS",
    domainName: "ACCESSIBILITY TECH",
    domainDetail: "Assistive Kinematic Mechanisms",
    domainIcon: Activity,
  },

  // --- ROW 1 ---
  {
    id: 4,
    row: 1,
    col: 0,
    techName: "RUST",
    techCategory: "MEMORY-SAFE SYSTEMS",
    techIcon: Binary,
    domainGroup: "HARDWARE",
    domainName: "ESP32",
    domainDetail: "Wireless Edge Controllers & Mesh",
    domainIcon: Radio,
  },
  {
    id: 5,
    row: 1,
    col: 1,
    techName: "TYPESCRIPT",
    techCategory: "FULLSTACK TYPING",
    techIcon: FileCode,
    domainGroup: "HARDWARE",
    domainName: "RASPBERRY PI",
    domainDetail: "Embedded Linux Compute Nodes",
    domainIcon: Cpu,
  },
  {
    id: 6,
    row: 1,
    col: 2,
    techName: "JAVASCRIPT",
    techCategory: "DYNAMIC ENGINE",
    techIcon: Globe,
    domainGroup: "HARDWARE",
    domainName: "NVIDIA JETSON",
    domainDetail: "Edge Neural Acceleration",
    domainIcon: Zap,
  },
  {
    id: 7,
    row: 1,
    col: 3,
    techName: "HTML / CSS",
    techCategory: "CYBERNETIC UI",
    techIcon: Layers,
    domainGroup: "HARDWARE",
    domainName: "LiDAR & SENSORS",
    domainDetail: "Point-Cloud Spatial Mapping",
    domainIcon: Eye,
  },

  // --- ROW 2 ---
  {
    id: 8,
    row: 2,
    col: 0,
    techName: "PYTORCH",
    techCategory: "NEURAL POSE EST.",
    techIcon: Sparkles,
    domainGroup: "DESIGN",
    domainName: "FUSION 360",
    domainDetail: "Parametric CAD & CNC Toolpaths",
    domainIcon: Compass,
  },
  {
    id: 9,
    row: 2,
    col: 1,
    techName: "STM32 / ARM",
    techCategory: "GATE DRIVER LOGIC",
    techIcon: Cpu,
    domainGroup: "DESIGN",
    domainName: "BLENDER",
    domainDetail: "3D Visualisation & Mesh Topology",
    domainIcon: Boxes,
  },
  {
    id: 10,
    row: 2,
    col: 2,
    techName: "CAN-BUS 2.0B",
    techCategory: "DISTRIBUTED BUS",
    techIcon: Radio,
    domainGroup: "DESIGN",
    domainName: "KICAD",
    domainDetail: "Multi-Layer Schematic Routing",
    domainIcon: Disc,
  },
  {
    id: 11,
    row: 2,
    col: 3,
    techName: "THREE.JS / WEBGL",
    techCategory: "3D VIEWPORT",
    techIcon: Boxes,
    domainGroup: "DESIGN",
    domainName: "EASYEDA",
    domainDetail: "Power Distribution & PCB Layouts",
    domainIcon: Layers,
  },

  // --- ROW 3 ---
  {
    id: 12,
    row: 3,
    col: 0,
    techName: "LINUX / KERNEL",
    techCategory: "PREEMPT-RT REALTIME",
    techIcon: Terminal,
    domainGroup: "INFRASTRUCTURE",
    domainName: "LINUX",
    domainDetail: "Low-Latency Kernel Optimization",
    domainIcon: Terminal,
  },
  {
    id: 13,
    row: 3,
    col: 1,
    techName: "DOCKER",
    techCategory: "CONTAINERIZATION",
    techIcon: Container,
    domainGroup: "INFRASTRUCTURE",
    domainName: "DOCKER",
    domainDetail: "Reproducible Edge Environments",
    domainIcon: Container,
  },
  {
    id: 14,
    row: 3,
    col: 2,
    techName: "CUDA KERNELS",
    techCategory: "PARALLEL COMPUTE",
    techIcon: Zap,
    domainGroup: "INFRASTRUCTURE",
    domainName: "NETWORKING",
    domainDetail: "High-Frequency Packet Protocols",
    domainIcon: Radio,
  },
  {
    id: 15,
    row: 3,
    col: 3,
    techName: "NEXT.JS / REACT",
    techCategory: "R&D PLATFORM",
    techIcon: Code2,
    domainGroup: "INFRASTRUCTURE",
    domainName: "AUTOMATION",
    domainDetail: "Autonomous Task Execution",
    domainIcon: ShieldCheck,
  },
];

export default function TemporalMosaic() {
  const [activeFace, setActiveFace] = useState<number>(0);
  const [cycleIndex, setCycleIndex] = useState<number>(1);

  // Turn right continuously every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFace((prev) => (prev + 1) % 3);
      setCycleIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full h-full bg-[#000000] relative z-20 flex flex-col justify-center px-4 sm:px-6 py-8 font-mono select-none border-y border-[#27272A] overflow-hidden">
      {/* Top Header HUD */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#27272A] pb-3 mb-6 max-w-275 mx-auto w-full gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm text-[#F8F9FA] tracking-widest uppercase font-bold">
            TEMPORAL MOSAIC // 4×4 MACHINE VISION ARRAY
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-[#71717A]">
          <span className="tabular-nums">CYCLE: #{String(cycleIndex).padStart(3, "0")}</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveFace(0)}
              className={`px-3 py-1 border text-xs uppercase transition-colors font-bold ${
                activeFace === 0
                  ? "border-[#00FF9D] text-[#00FF9D] bg-[#00FF9D]/10"
                  : "border-[#27272A] text-[#71717A] hover:text-[#F8F9FA]"
              }`}
            >
              [ 01: TECH STACK ]
            </button>
            <button
              onClick={() => setActiveFace(1)}
              className={`px-3 py-1 border text-xs uppercase transition-colors font-bold ${
                activeFace === 1
                  ? "border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/10"
                  : "border-[#27272A] text-[#71717A] hover:text-[#F8F9FA]"
              }`}
            >
              [ 02: DOMAINS ]
            </button>
            <button
              onClick={() => setActiveFace(2)}
              className={`px-3 py-1 border text-xs uppercase transition-colors font-bold ${
                activeFace === 2
                  ? "border-[#F8F9FA] text-[#F8F9FA] bg-[#F8F9FA]/20"
                  : "border-[#27272A] text-[#71717A] hover:text-[#F8F9FA]"
              }`}
            >
              [ 03: UNIFIED LOGO ]
            </button>
          </div>
        </div>
      </div>

      {/* 4x4 Grid Matrix Viewport */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-250 aspect-square mx-auto p-3 sm:p-4 border border-[#27272A] bg-[#000000]">
        {MOSAIC_TILES.map((tile) => {
          const TechIcon = tile.techIcon;
          const DomainIcon = tile.domainIcon;

          return (
            <div
              key={tile.id}
              className="relative w-full h-full perspective-distant overflow-hidden border border-[#27272A] bg-[#050505] group"
            >
              <motion.div
                className="w-full h-full relative transform-3d"
                animate={{ rotateY: activeFace * -90 }}
                transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {/* ====================================================
                    FACE 0: TECH STACK (BIG BOLD LABELS)
                ==================================================== */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden p-3 sm:p-4 flex flex-col justify-between border border-[#00FF9D]/20 bg-[#000000]"
                  style={{ transform: "rotateY(0deg) translateZ(1px)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] sm:text-[10px] text-[#00FF9D] tracking-wider font-bold">
                      {tile.techCategory}
                    </span>
                    <TechIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#71717A] group-hover:text-[#00FF9D] transition-colors" />
                  </div>

                  {/* PROMINENT LARGE TECH TITLE */}
                  <div className="my-auto">
                    <div className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-[#FFFFFF] tracking-tight font-sans">
                      {tile.techName}
                    </div>
                  </div>

                  <div className="text-[8px] sm:text-[9px] text-[#71717A] tracking-widest border-t border-[#27272A] pt-1 flex items-center justify-between">
                    <span>STACK NODE</span>
                    <span className="text-[#00FF9D]">#{String(tile.id + 1).padStart(2, "0")}</span>
                  </div>
                </div>

                {/* ====================================================
                    FACE 1: DOMAINS (FROM INVENTORY)
                ==================================================== */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden p-3 sm:p-4 flex flex-col justify-between border border-[#00E5FF]/20 bg-[#02050A]"
                  style={{ transform: "rotateY(90deg) translateZ(1px)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] sm:text-[10px] text-[#00E5FF] tracking-wider font-bold">
                      [{tile.domainGroup}]
                    </span>
                    <DomainIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#71717A] group-hover:text-[#00E5FF] transition-colors" />
                  </div>

                  {/* PROMINENT LARGE DOMAIN TITLE */}
                  <div className="my-auto">
                    <div className="text-xs sm:text-sm md:text-base font-extrabold text-[#FFFFFF] tracking-tight uppercase leading-tight font-sans">
                      {tile.domainName}
                    </div>
                  </div>

                  <div className="text-[8px] sm:text-[9px] text-[#00E5FF]/80 tracking-widest border-t border-[#27272A] pt-1 truncate">
                    {tile.domainDetail}
                  </div>
                </div>

                {/* ====================================================
                    FACE 2: UNIFIED 1/16th COMPOSITE EMBLEM PHOTO
                ==================================================== */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden overflow-hidden"
                  style={{ transform: "rotateY(180deg) translateZ(1px)" }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${MASTER_BIG_PHOTO})`,
                      backgroundSize: "400% 400%",
                      backgroundPosition: `${(tile.col / 3) * 100}% ${(tile.row / 3) * 100}%`,
                      imageRendering: "pixelated",
                      filter: "contrast(1.5) brightness(1.05)",
                    }}
                  />
                  <div className="absolute inset-0 bg-[#00FF9D]/5 pointer-events-none" />
                  <div className="absolute top-1 right-1 text-[7px] sm:text-[9px] text-[#F8F9FA]/80 bg-[#000000]/85 px-1 py-0.5 border border-[#27272A]">
                    [{tile.row},{tile.col}]
                  </div>
                </div>
              </motion.div>

              {/* Sub-Pixel Corner Crosshairs */}
              <div className="absolute top-1 left-1 text-[7px] text-[#71717A] pointer-events-none">+</div>
              <div className="absolute top-1 right-1 text-[7px] text-[#71717A] pointer-events-none">+</div>
              <div className="absolute bottom-1 left-1 text-[7px] text-[#71717A] pointer-events-none">+</div>
              <div className="absolute bottom-1 right-1 text-[7px] text-[#71717A] pointer-events-none">+</div>
            </div>
          );
        })}
      </div>

      {/* Telemetry Footer Readout */}
      {/* <div className="mt-4 px-4 py-2 border border-[#27272A] bg-[#000000] flex items-center justify-between text-xs text-[#71717A] max-w-[1000px] mx-auto w-full">
        <span>
          ACTIVE FEED:{" "}
          <span className="text-[#FFFFFF]">
            {activeFace === 0
              ? "01 // CORE TOOLING & TECH STACK"
              : activeFace === 1
              ? "02 // SYSTEMS, HARDWARE & INFRASTRUCTURE DOMAINS"
              : "03 // UNIFIED BY AUGUSTUS COMPOSITE EMBLEM"}
          </span>
        </span>
        <span className="text-[#00FF9D] tracking-wider">[STATE: KINETIC_SYNC]</span>
      </div> */}
    </section>
  );
}