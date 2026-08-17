// filepath: components/Stingray.tsx
"use client";

import React, { useRef, Suspense, Component, useState, useEffect } from "react";
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
import { BookOpen, GitBranch, Box, ShieldAlert } from "lucide-react";

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
    console.error("Stingray 3D GLB Load Error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Html center>
          <div className="font-mono text-xs text-[#FF3B30] bg-[#000000] p-4 border border-[#FF3B30]/40">
            [ERROR: STINGRAY MESH STREAM FAILED]
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
    const seed1 = Math.abs(Math.sin(i * 15.7891 + 92.145)) % 1;
    const seed2 = Math.abs(Math.sin(i * 49.123 + 24.567)) % 1;
    const seed3 = Math.abs(Math.sin(i * 73.456 + 61.891)) % 1;

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
      <div className="flex flex-col items-center justify-center font-mono text-[10px] sm:text-xs text-[#00FF9D] bg-[#000000]/90 p-4 border border-[#27272A] backdrop-blur-md">
        <div className="w-4 h-4 border-2 border-[#00FF9D] border-t-transparent rounded-full animate-spin mb-2" />
        <span className="tracking-widest uppercase font-bold">LOADING STINGRAY MESH</span>
      </div>
    </Html>
  );
}

function StingrayModel({ isMobile }: { isMobile: boolean }) {
  const modelRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF(
    "/models/stingray.glb",
    "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
  );

  useFrame((state) => {
    const { pointer, clock } = state;
    const elapsedTime = clock.getElapsedTime();

    if (modelRef.current) {
      modelRef.current.rotation.y = elapsedTime * 0.18 + (isMobile ? 0 : pointer.x * 0.25);
      if (!isMobile) {
        modelRef.current.rotation.x = THREE.MathUtils.lerp(
          modelRef.current.rotation.x,
          -pointer.y * 0.15,
          0.05
        );
      }
    }
  });

  return (
    <group ref={modelRef} position={[0, isMobile ? -0.4 : 0, 0]}>
      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.25}>
        <Resize scale={isMobile ? 3.0 : 4.4}>
          <Center top={false}>
            <primitive
              object={scene}
              rotation={[0, 0, 0]}
              position={[0, 0, 0]}
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
      particlesRef.current.rotation.y -= delta * 0.022;
      particlesRef.current.rotation.x -= delta * 0.009;
    }
  });

  return (
    <Points ref={particlesRef} positions={STATIC_PARTICLE_POSITIONS} stride={3}>
      <PointMaterial
        transparent
        color="#00E5FF"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

export default function Stingray() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full h-full min-h-screen relative flex items-center justify-center select-none bg-[#000000] border-y border-[#27272A] overflow-hidden">
      
      {/* TOP HUD */}
      <div className="absolute top-16 sm:top-24 left-4 sm:left-12 right-4 sm:right-12 z-30 font-mono flex flex-col md:flex-row md:items-start justify-between gap-4 pointer-events-none">
        
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs mb-1">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00FF9D] animate-pulse" />
            <span className="text-[#00FF9D] font-bold tracking-widest">[3D VIEWPORT // ACTIVE]</span>
            <span className="text-[#27272A]">/</span>
            <span className="text-[#00E5FF] text-[9px] sm:text-[10px] flex items-center gap-1 font-semibold">
              <ShieldAlert className="w-3 h-3 text-[#00E5FF]" /> AUTONOMOUS PLATFORM
            </span>
          </div>

          <h3 className="text-lg sm:text-2xl font-extrabold text-[#FFFFFF] font-sans tracking-tight uppercase">
            STINGRAY PLATFORM
          </h3>

          <p className="font-sans text-[11px] sm:text-sm text-[#A1A1AA] leading-relaxed mt-1 line-clamp-2 sm:line-clamp-none">
            Bio-mimetic autonomous vehicle integrating compliant wing actuation and edge spatial tracking.
          </p>
        </div>

        {/* Action Vectors */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          <Link
            href="https://docs.byaugustus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 border border-[#27272A] bg-[#000000]/80 text-[#A1A1AA] hover:border-[#00FF9D] hover:bg-[#00FF9D] hover:text-[#000000] transition-all flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase font-bold"
          >
            <BookOpen className="w-3 h-3 text-[#00FF9D]" />
            <span>[ DOCS ↗ ]</span>
          </Link>

          <Link
            href="https://github.com/byaugustus"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 border border-[#27272A] bg-[#000000]/80 text-[#A1A1AA] hover:border-[#00FF9D] hover:bg-[#00FF9D] hover:text-[#000000] transition-all flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase font-bold"
          >
            <GitBranch className="w-3 h-3 text-[#00FF9D]" />
            <span>[ GITHUB ↗ ]</span>
          </Link>

          <Link
            href="#slide-mosaic"
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 border border-[#00FF9D]/50 bg-[#00FF9D]/10 text-[#FFFFFF] hover:border-[#00FF9D] hover:bg-[#00FF9D] hover:text-[#000000] transition-all flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase font-bold"
          >
            <Box className="w-3 h-3 text-[#00FF9D]" />
            <span>[ VAULT CAD ↗ ]</span>
          </Link>
        </div>

      </div>

      {/* BOTTOM HUD */}
      <div className="absolute bottom-6 right-4 sm:right-12 z-20 font-mono text-[9px] sm:text-[11px] text-[#71717A] pointer-events-none text-right">
        <span>AERODYNAMICS: BIO-MIMETIC FLAPPING FOIL</span>
        <br />
        <span className="text-[#00E5FF]">CONTROL BUS: CAN 2.0B + RTOS</span>
      </div>

      {/* 3D Canvas */}
      <LazyCanvas
        camera={{ position: [0, isMobile ? 1.4 : 1.8, isMobile ? 7.2 : 6.2], fov: isMobile ? 50 : 45 }}
        className="w-full h-full touch-pan-y"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[12, 14, 10]} intensity={2.0} color="#FFFFFF" />
        <directionalLight position={[-12, -6, -10]} intensity={1.2} color="#00E5FF" />
        <pointLight position={[0, -3, 3]} intensity={1.5} color="#00FF9D" />

       <ParticleStarfield />

       <ModelErrorBoundary>
        <Suspense fallback={<ModelLoadingIndicator />}>
          <StingrayModel isMobile={isMobile} />
        </Suspense>
       </ModelErrorBoundary>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={!isMobile}
          maxPolarAngle={Math.PI / 1.4}
          minPolarAngle={Math.PI / 3.6}
          rotateSpeed={0.6}
          dampingFactor={0.05}
          />
      </LazyCanvas>
    </div>
  );
}