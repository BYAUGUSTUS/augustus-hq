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

const MASTER_BIG_PHOTO = "/BY_Major.png";

interface MosaicTileData {
  id: number;
  row: number;
  col: number;
  techName: string;
  techCategory: string;
  techIcon: typeof Terminal;
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

// Top-to-bottom telemetry pill streams with alternating layered color palettes
const LEFT_CAPSULES = [
  { label: "C++20 // RTOS", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "INVERSE KINEMATICS", bg: "bg-[#1E1915]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "CAN 2.0B BUS", bg: "bg-[#8A6743]", text: "text-[#FFFFFF]", arrowColor: "text-[#F5F0E6]" },
  { label: "CUDA PARALLEL", bg: "bg-[#2A231C]", text: "text-[#DFBA94]", arrowColor: "text-[#C8A27A]" },
  { label: "BLDC FOC DRIVER", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "ROS 2 HUMBLE", bg: "bg-[#1E1915]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "SPATIAL OPENCV", bg: "bg-[#3D2E1E]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "PREEMPT-RT KERNEL", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "STM32F4 VECTOR", bg: "bg-[#1E1915]", text: "text-[#DFBA94]", arrowColor: "text-[#C8A27A]" },
  { label: "MICRO-ROS BRIDGE", bg: "bg-[#8A6743]", text: "text-[#FFFFFF]", arrowColor: "text-[#F5F0E6]" },
  { label: "LiDAR POINTCLOUD", bg: "bg-[#2A231C]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "D-H PARAMETERS", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "ZERO-ALLOC HEAP", bg: "bg-[#1E1915]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "TORQUE VECTORING", bg: "bg-[#1E1915]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "QUATERNION SLAM", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "HARMONIC REDUCER", bg: "bg-[#8A6743]", text: "text-[#FFFFFF]", arrowColor: "text-[#F5F0E6]" },
  { label: "PYTORCH EMBEDDED", bg: "bg-[#2A231C]", text: "text-[#DFBA94]", arrowColor: "text-[#C8A27A]" },
  { label: "KALMAN SENSOR FUSION", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "EDGE NEURAL ENGINE", bg: "bg-[#1E1915]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "FINITE STATE RTOS", bg: "bg-[#3D2E1E]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "COMPLIANT ACTUATION", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "HIGH-SPEED UART", bg: "bg-[#8A6743]", text: "text-[#FFFFFF]", arrowColor: "text-[#F5F0E6]" },
  { label: "GAZEBO PHYSICS", bg: "bg-[#1E1915]", text: "text-[#DFBA94]", arrowColor: "text-[#C8A27A]" },
  { label: "DIFF DRIVE ODOMETRY", bg: "bg-[#2A231C]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "6-AXIS IMU FILTER", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "CUSTOM BLDC STATOR", bg: "bg-[#1E1915]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
];

const RIGHT_CAPSULES = [
  { label: "TORQUE VECTORING", bg: "bg-[#1E1915]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "QUATERNION SLAM", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "HARMONIC REDUCER", bg: "bg-[#8A6743]", text: "text-[#FFFFFF]", arrowColor: "text-[#F5F0E6]" },
  { label: "PYTORCH EMBEDDED", bg: "bg-[#2A231C]", text: "text-[#DFBA94]", arrowColor: "text-[#C8A27A]" },
  { label: "KALMAN SENSOR FUSION", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "EDGE NEURAL ENGINE", bg: "bg-[#1E1915]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "FINITE STATE RTOS", bg: "bg-[#3D2E1E]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "COMPLIANT ACTUATION", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "HIGH-SPEED UART", bg: "bg-[#8A6743]", text: "text-[#FFFFFF]", arrowColor: "text-[#F5F0E6]" },
  { label: "GAZEBO PHYSICS", bg: "bg-[#1E1915]", text: "text-[#DFBA94]", arrowColor: "text-[#C8A27A]" },
  { label: "DIFF DRIVE ODOMETRY", bg: "bg-[#2A231C]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "6-AXIS IMU FILTER", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "CUSTOM BLDC STATOR", bg: "bg-[#1E1915]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "C++20 // RTOS", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "INVERSE KINEMATICS", bg: "bg-[#1E1915]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "CAN 2.0B BUS", bg: "bg-[#8A6743]", text: "text-[#FFFFFF]", arrowColor: "text-[#F5F0E6]" },
  { label: "CUDA PARALLEL", bg: "bg-[#2A231C]", text: "text-[#DFBA94]", arrowColor: "text-[#C8A27A]" },
  { label: "BLDC FOC DRIVER", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "ROS 2 HUMBLE", bg: "bg-[#1E1915]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "SPATIAL OPENCV", bg: "bg-[#3D2E1E]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "PREEMPT-RT KERNEL", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "STM32F4 VECTOR", bg: "bg-[#1E1915]", text: "text-[#DFBA94]", arrowColor: "text-[#C8A27A]" },
  { label: "MICRO-ROS BRIDGE", bg: "bg-[#8A6743]", text: "text-[#FFFFFF]", arrowColor: "text-[#F5F0E6]" },
  { label: "LiDAR POINTCLOUD", bg: "bg-[#2A231C]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
  { label: "D-H PARAMETERS", bg: "bg-[#C8A27A]", text: "text-[#0C0A09]", arrowColor: "text-[#451A03]" },
  { label: "ZERO-ALLOC HEAP", bg: "bg-[#1E1915]", text: "text-[#F5F0E6]", arrowColor: "text-[#C8A27A]" },
];

export default function TemporalMosaic() {
  const [activeFace, setActiveFace] = useState<number>(0);
  const [cycleIndex, setCycleIndex] = useState<number>(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFace((prev) => (prev + 1) % 3);
      setCycleIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full h-full min-h-screen bg-[#000000] relative z-20 flex flex-col justify-between items-center px-3 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 font-mono select-none border-y border-[#27272A] overflow-hidden">
      
      {/* ========================================================
          BACKGROUND LAYER: FULL VERTICAL RESONATING PILL ARRAYS
      ======================================================== */}
      
      {/* Left Wing Pill Stream (Spans full height from top to bottom) */}
      <div className="absolute left-0 top-4 bottom-4 w-[25vw] max-w-[360px] pointer-events-none hidden xl:flex flex-col justify-between pl-3 z-0 opacity-85">
        {LEFT_CAPSULES.map((item, idx) => (
          <motion.div
            key={`left-${idx}`}
            animate={{
              rotate: [0, 4.5, 0, -4.5, 0],
              y: [0, -3.5, 0, 3.5, 0],
            }}
            transition={{
              duration: 4.2 + (idx % 4) * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.22,
            }}
            style={{ transformOrigin: "left center" }}
            className={`flex items-center gap-2 whitespace-nowrap text-xs sm:text-[13px] font-black tracking-wider py-1 px-3.5 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.8)] border border-[#DFBA94]/20 w-fit ${item.bg}`}
          >
            <span className={item.text}>{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Right Wing Pill Stream (Spans full height from top to bottom) */}
      <div className="absolute right-0 top-4 bottom-4 w-[25vw] max-w-[360px] pointer-events-none hidden xl:flex flex-col justify-between items-end pr-3 z-0 opacity-85">
        {RIGHT_CAPSULES.map((item, idx) => (
          <motion.div
            key={`right-${idx}`}
            animate={{
              rotate: [0, -4.5, 0, 4.5, 0],
              y: [0, 3.5, 0, -3.5, 0],
            }}
            transition={{
              duration: 4.5 + (idx % 4) * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.25,
            }}
            style={{ transformOrigin: "right center" }}
            className={`flex items-center gap-2 whitespace-nowrap text-xs sm:text-[13px] font-black tracking-wider py-1 px-3.5 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.8)] border border-[#DFBA94]/20 w-fit ${item.bg}`}
          >
            <span className={item.text}>{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Top Header HUD */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#27272A] pb-2 sm:pb-3 mb-2 sm:mb-4 max-w-[1000px] mx-auto w-full gap-2 shrink-0 relative z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[10px] sm:text-xs text-[#F8F9FA] tracking-widest uppercase font-bold">
            TEMPORAL MOSAIC // 4×4 ARRAY
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-[#71717A] w-full sm:w-auto justify-between sm:justify-end">
          <span className="tabular-nums">CYCLE: #{String(cycleIndex).padStart(3, "0")}</span>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              onClick={() => setActiveFace(0)}
              className={`px-2 py-0.5 sm:px-3 sm:py-1 border text-[9px] sm:text-xs uppercase transition-colors font-bold ${
                activeFace === 0
                  ? "border-[#C8A27A] text-[#C8A27A] bg-[#C8A27A]/10"
                  : "border-[#27272A] text-[#71717A] hover:text-[#F8F9FA]"
              }`}
            >
              TECH STACK
            </button>
            <button
              onClick={() => setActiveFace(1)}
              className={`px-2 py-0.5 sm:px-3 sm:py-1 border text-[9px] sm:text-xs uppercase transition-colors font-bold ${
                activeFace === 1
                  ? "border-[#C8A27A] text-[#C8A27A] bg-[#C8A27A]/10"
                  : "border-[#27272A] text-[#71717A] hover:text-[#F8F9FA]"
              }`}
            >
              DOMAINS
            </button>
            <button
              onClick={() => setActiveFace(2)}
              className={`px-2 py-0.5 sm:px-3 sm:py-1 border text-[9px] sm:text-xs uppercase transition-colors font-bold ${
                activeFace === 2
                  ? "border-[#F8F9FA] text-[#F8F9FA] bg-[#F8F9FA]/20"
                  : "border-[#27272A] text-[#71717A] hover:text-[#F8F9FA]"
              }`}
            >
              UNIFIED BRAND
            </button>
          </div>
        </div>
      </div>

      {/* 4x4 Grid Matrix Viewport */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 md:gap-3 w-full max-w-[420px] sm:max-w-[620px] md:max-w-[760px] lg:max-w-[860px] aspect-square mx-auto p-1.5 sm:p-3 border border-[#27272A] bg-[#000000] my-auto relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
        {MOSAIC_TILES.map((tile) => {
          const TechIcon = tile.techIcon;
          const DomainIcon = tile.domainIcon;

          return (
            <div
              key={tile.id}
              className="relative w-full h-full [perspective:1200px] overflow-hidden border border-[#27272A] bg-[#050505] group"
            >
              <motion.div
                className="w-full h-full relative [transform-style:preserve-3d]"
                animate={{ rotateY: activeFace * -90 }}
                transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
              >
                {/* FACE 0: TECH STACK */}
                <div
                  className="absolute inset-0 w-full h-full [backface-visibility:hidden] p-1.5 sm:p-2.5 md:p-3 flex flex-col justify-between border border-[#C8A27A]/20 bg-[#000000]"
                  style={{ transform: "rotateY(0deg) translateZ(1px)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] sm:text-[9px] md:text-[10px] text-[#C8A27A] font-bold truncate">
                      {tile.techCategory}
                    </span>
                    <TechIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#71717A] group-hover:text-[#C8A27A] transition-colors shrink-0" />
                  </div>

                  <div className="my-auto">
                    <div className="text-[10px] sm:text-sm md:text-base lg:text-lg font-black text-[#FFFFFF] tracking-tight font-sans truncate">
                      {tile.techName}
                    </div>
                  </div>

                  <div className="text-[6px] sm:text-[8px] md:text-[9px] text-[#71717A] border-t border-[#27272A] pt-0.5 flex justify-between">
                    <span className="hidden sm:inline">STACK NODE</span>
                    <span className="text-[#C8A27A]">#{String(tile.id + 1).padStart(2, "0")}</span>
                  </div>
                </div>

                {/* FACE 1: DOMAINS */}
                <div
                  className="absolute inset-0 w-full h-full [backface-visibility:hidden] p-1.5 sm:p-2.5 md:p-3 flex flex-col justify-between border border-[#C8A27A]/30 bg-[#060504]"
                  style={{ transform: "rotateY(90deg) translateZ(1px)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] sm:text-[9px] md:text-[10px] text-[#C8A27A] font-bold truncate">
                      [{tile.domainGroup}]
                    </span>
                    <DomainIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#71717A] group-hover:text-[#C8A27A] transition-colors shrink-0" />
                  </div>

                  <div className="my-auto">
                    <div className="text-[8px] sm:text-xs md:text-sm lg:text-base font-extrabold text-[#FFFFFF] tracking-tight uppercase leading-tight font-sans line-clamp-2">
                      {tile.domainName}
                    </div>
                  </div>

                  <div className="text-[6px] sm:text-[8px] md:text-[9px] text-[#C8A27A]/80 border-t border-[#27272A] pt-0.5 truncate">
                    {tile.domainDetail}
                  </div>
                </div>

                {/* FACE 2: UNIFIED COMPOSITE LOGO EMBLEM */}
                <div
                  className="absolute inset-0 w-full h-full [backface-visibility:hidden] overflow-hidden"
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
                  <div className="absolute inset-0 bg-[#C8A27A]/5 pointer-events-none" />
                  <div className="absolute top-1 right-1 text-[6px] sm:text-[8px] text-[#F8F9FA]/80 bg-[#000000]/85 px-1 py-0.5 border border-[#27272A]">
                    [{tile.row},{tile.col}]
                  </div>
                </div>
              </motion.div>

              {/* Sub-Pixel Corner Crosshairs */}
              <div className="absolute top-0.5 left-0.5 text-[6px] sm:text-[7px] text-[#71717A] pointer-events-none">+</div>
              <div className="absolute top-0.5 right-0.5 text-[6px] sm:text-[7px] text-[#71717A] pointer-events-none">+</div>
              <div className="absolute bottom-0.5 left-0.5 text-[6px] sm:text-[7px] text-[#71717A] pointer-events-none">+</div>
              <div className="absolute bottom-0.5 right-0.5 text-[6px] sm:text-[7px] text-[#71717A] pointer-events-none">+</div>
            </div>
          );
        })}
      </div>

      {/* Footer Telemetry */}
      <div className="mt-2 px-3 py-1 border border-[#27272A] bg-[#000000] flex items-center justify-between text-[8px] sm:text-[10px] md:text-xs text-[#71717A] max-w-[1000px] mx-auto w-full shrink-0 relative z-10">
        <span className="truncate">
          ACTIVE FEED:{" "}
          <strong className="text-[#FFFFFF]">
            {activeFace === 0
              ? "TECH STACK"
              : activeFace === 1
              ? "DOMAINS"
              : "UNIFIED EMBLEM"}
          </strong>
        </span>
      </div>

    </section>
  );
}