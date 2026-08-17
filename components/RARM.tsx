// filepath: components/RARM.tsx
"use client";

import React, { useRef, Suspense, Component, useSyncExternalStore } from "react";
import Link from "next/link";
import { useFrame } from "@react-three/fiber";
import LazyCanvas from "@/components/LazyCanvas";
import {
  OrbitControls,
  Points,
  PointMaterial,
  useGLTF,
  Center,
  Resize,
  Float,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { BookOpen, GitBranch, Box, Mic, Monitor } from "lucide-react";

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("RARM 3D GLB Load Error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="font-mono text-xs text-[#FF3B30] bg-[#000000] p-4 border border-[#FF3B30]/40">
            [ERROR: 6-DOF ARM MESH STREAM FAILED]
          </div>
        </Html>
      );
    }
    return this.props.children;
  }
}

const PARTICLE_COUNT = 300;

function createDeterministicPointPositions(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const seed1 = Math.abs(Math.sin(i * 14.1234 + 81.123)) % 1;
    const seed2 = Math.abs(Math.sin(i * 41.567 + 19.876)) % 1;
    const seed3 = Math.abs(Math.sin(i * 87.654 + 33.211)) % 1;

    const radius = 3.5 + seed1 * 4.5;
    const theta = seed2 * Math.PI * 2;
    const phi = Math.acos(seed3 * 2 - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
}

const STATIC_PARTICLE_POSITIONS = createDeterministicPointPositions(PARTICLE_COUNT);

function ModelLoadingIndicator() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center font-mono text-xs text-[#00FF9D] bg-[#000000]/90 p-4 border border-[#27272A] backdrop-blur-md">
        <div className="w-4 h-4 border-2 border-[#00FF9D] border-t-transparent rounded-full animate-spin mb-2" />
        <span className="tracking-widest uppercase font-bold">LOADING 6-DOF ARM MESH</span>
      </div>
    </Html>
  );
}

function RoboticArmModel() {
  const modelRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF(
    "/models/RARM.glb",
    "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
  );

  useFrame((state) => {
    const { pointer, clock } = state;
    const elapsedTime = clock.getElapsedTime();

    if (modelRef.current) {
      modelRef.current.rotation.y = elapsedTime * 0.15 + pointer.x * 0.25;
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        -pointer.y * 0.12,
        0.05
      );
    }
  });

  return (
    <group ref={modelRef} position={[0, -0.2, 0]}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
        <Resize scale={4.2}>
          <Center top={false}>
            <primitive
              object={scene}
              rotation={[0, 0, 0]}
              position={[0, -0.5, 0]}
            />
          </Center>
        </Resize>
      </Float>
    </group>
  );
}

function ParticleStarfield() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02;
      particlesRef.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <Points ref={particlesRef} positions={STATIC_PARTICLE_POSITIONS} stride={3}>
      <PointMaterial
        transparent
        color="#00FF9D"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

// Window resize subscriber without useEffect state cascade
function subscribeWindow(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getIsMobileSnapshot() {
  return window.innerWidth < 768;
}

function getServerSnapshot() {
  return false;
}

export default function RARM() {
  const isMobile = useSyncExternalStore(
    subscribeWindow,
    getIsMobileSnapshot,
    getServerSnapshot
  );

  // ========================================================
  // MOBILE / SMALL SCREEN FALLBACK: SCHEMATIC BLUEPRINT VIEW
  // ========================================================
  if (isMobile) {
    return (
      <div className="w-full h-full min-h-screen bg-[#000000] px-5 py-16 flex flex-col justify-between items-center font-mono select-none border-y border-[#27272A] relative overflow-hidden">
        
        {/* Top Spec Header */}
        <div className="w-full flex flex-col items-start border-b border-[#27272A] pb-3 z-10">
          <div className="flex items-center gap-2 text-[10px] text-[#00FF9D] tracking-widest font-bold uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
            <span>SEC-SPEC // 04</span>
            <span className="text-[#27272A]">/</span>
            <span className="text-[#00E5FF] flex items-center gap-1">
              <Mic className="w-3 h-3 text-[#00E5FF]" /> VOICE CONTROLLED
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-[#FFFFFF] font-sans tracking-tight uppercase">
            6-DOF ROBOTIC ARM
          </h3>

          <p className="font-sans text-xs text-[#A1A1AA] leading-relaxed mt-1">
            Precision articulated kinematic arm integrating custom harmonic drives, embedded speech recognition, and real-time inverse kinematics[cite: 1, 2].
          </p>
        </div>

        {/* Center Blueprint Graphic Box */}
        <div className="w-full max-w-[320px] aspect-square my-auto relative border border-[#27272A] bg-[#050505] p-3 flex flex-col justify-between overflow-hidden shadow-2xl">
          
          {/* Blueprint Grid Lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(to right, #00FF9D 1px, transparent 1px), linear-gradient(to bottom, #00FF9D 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Blueprint Image / Emblem Preview */}
          <div
            className="w-full h-full bg-contain bg-center bg-no-repeat z-10"
            style={{
              backgroundImage: "url('/BY_Major.png')",
              filter: "contrast(1.2) brightness(0.95)",
            }}
          />

          {/* Desktop Only Notice Banner */}
          <div className="z-20 bg-[#000000]/95 border border-[#00E5FF]/40 p-2.5 flex items-center justify-between text-[10px] text-[#00E5FF]">
            <div className="flex items-center gap-1.5 font-bold">
              <Monitor className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>[ 3D CAD: PC / WIDESCREEN ONLY ]</span>
            </div>
            <span className="text-[#71717A] text-[9px]">DESKTOP VIEW</span>
          </div>
        </div>

        {/* Bottom Actions & Spec Readout */}
        <div className="w-full flex flex-col gap-3 z-10 border-t border-[#27272A] pt-3">
          <div className="flex items-center justify-between text-[10px] text-[#71717A]">
            <span>KINEMATICS: <strong className="text-[#FFFFFF]">6-AXIS D-H MATRIX</strong></span>
            <span className="text-[#00FF9D]">[VERIFIED CAD]</span>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full">
            <Link
              href="https://docs.byaugustus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-1 border border-[#27272A] bg-[#050505] text-[#A1A1AA] hover:text-[#FFFFFF] flex items-center justify-center gap-1 text-[10px] font-bold"
            >
              <BookOpen className="w-3 h-3 text-[#00FF9D]" />
              <span>[ DOCS ]</span>
            </Link>

            <Link
              href="https://github.com/byaugustus"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-1 border border-[#27272A] bg-[#050505] text-[#A1A1AA] hover:text-[#FFFFFF] flex items-center justify-center gap-1 text-[10px] font-bold"
            >
              <GitBranch className="w-3 h-3 text-[#00FF9D]" />
              <span>[ GITHUB ]</span>
            </Link>

            <Link
              href="#slide-mosaic"
              className="py-2.5 px-1 border border-[#00FF9D]/40 bg-[#00FF9D]/10 text-[#00FF9D] flex items-center justify-center gap-1 text-[10px] font-bold"
            >
              <Box className="w-3 h-3 text-[#00FF9D]" />
              <span>[ VAULT ]</span>
            </Link>
          </div>
        </div>

      </div>
    );
  }

  // ========================================================
  // DESKTOP VIEWPORT: FULL 3D INTERACTIVE THREE.JS CANVAS
  // ========================================================
  return (
    <div className="w-full h-full min-h-screen relative flex items-center justify-center select-none bg-[#000000] border-y border-[#27272A] overflow-hidden">
      
      {/* TOP HUD */}
      <div className="absolute top-20 sm:top-24 left-6 sm:left-12 right-6 sm:right-12 z-30 font-mono flex flex-col md:flex-row md:items-start justify-between gap-4 pointer-events-none">
        
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-xs mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
            <span className="text-[#00FF9D] font-bold tracking-widest">[3D VIEWPORT // ACTIVE]</span>
            <span className="text-[#27272A]">/</span>
            <span className="text-[#00E5FF] text-[10px] flex items-center gap-1 font-semibold">
              <Mic className="w-3.5 h-3.5 text-[#00E5FF]" /> VOICE CONTROLLED
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-sans tracking-tight uppercase">
            6-DOF ROBOTIC ARM
          </h3>

          <p className="font-sans text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mt-1">
            Precision articulated kinematic arm integrating custom harmonic drives, embedded speech recognition, and real-time inverse kinematics[cite: 1, 2].
          </p>
        </div>

        {/* Action Vectors */}
        <div className="flex flex-wrap items-center gap-2.5 pointer-events-auto">
          <Link
            href="https://docs.byaugustus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-[#27272A] bg-[#000000]/80 text-[#A1A1AA] hover:border-[#00FF9D] hover:bg-[#00FF9D] hover:text-[#000000] transition-all flex items-center gap-1.5 text-xs uppercase font-bold"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#00FF9D]" />
            <span>[ DOCS ↗ ]</span>
          </Link>

          <Link
            href="https://github.com/byaugustus"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-[#27272A] bg-[#000000]/80 text-[#A1A1AA] hover:border-[#00FF9D] hover:bg-[#00FF9D] hover:text-[#000000] transition-all flex items-center gap-1.5 text-xs uppercase font-bold"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#00FF9D]" />
            <span>[ GITHUB ↗ ]</span>
          </Link>

          <Link
            href="#slide-mosaic"
            className="px-3.5 py-1.5 border border-[#00FF9D]/50 bg-[#00FF9D]/10 text-[#FFFFFF] hover:border-[#00FF9D] hover:bg-[#00FF9D] hover:text-[#000000] transition-all flex items-center gap-1.5 text-xs uppercase font-bold"
          >
            <Box className="w-3.5 h-3.5 text-[#00FF9D]" />
            <span>[ VAULT CAD ↗ ]</span>
          </Link>
        </div>

      </div>

      {/* BOTTOM HUD */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 font-mono text-xs text-[#71717A] pointer-events-none text-right">
        <span>KINEMATICS: 6-AXIS D-H MATRIX</span>
        <br />
        <span className="text-[#00FF9D]">NLP INFERENCE: REAL-TIME RTOS</span>
      </div>

      {/* 3D Canvas */}
      <LazyCanvas
        camera={{ position: [0, 2.0, 5.8], fov: 45 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[12, 14, 10]} intensity={2.0} color="#FFFFFF" />
        <directionalLight position={[-12, -6, -10]} intensity={1.2} color="#00FF9D" />
        <pointLight position={[0, -2, 3]} intensity={1.5} color="#00E5FF" />

        <ParticleStarfield />

        <ModelErrorBoundary>
          <Suspense fallback={<ModelLoadingIndicator />}>
            <RoboticArmModel />
          </Suspense>
        </ModelErrorBoundary>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.4}
          minPolarAngle={Math.PI / 3.6}
          rotateSpeed={0.6}
          dampingFactor={0.05}
        />
      </LazyCanvas>
    </div>
  );
}