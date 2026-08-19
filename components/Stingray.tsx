// filepath: components/Stingray.tsx
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
import { BookOpen, GitBranch, Box, ShieldAlert, Monitor } from "lucide-react";

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
      <div className="flex flex-col items-center justify-center font-mono text-[10px] sm:text-xs text-[#C8A27A] bg-[#000000]/90 p-4 border border-[#27272A] backdrop-blur-md">
        <div className="w-4 h-4 border-2 border-[#C8A27A] border-t-transparent rounded-full animate-spin mb-2" />
        <span className="tracking-widest uppercase font-bold">LOADING STINGRAY MESH</span>
      </div>
    </Html>
  );
}

function StingrayModel() {
  const modelRef = useRef<THREE.Group>(null);

  const { scene } = useGLTF(
    "/models/stingray.glb",
    "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
  );

  useFrame((state) => {
    const { pointer, clock } = state;
    const elapsedTime = clock.getElapsedTime();

    if (modelRef.current) {
      modelRef.current.rotation.y = elapsedTime * 0.18 + pointer.x * 0.25;
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        -pointer.y * 0.15,
        0.05
      );
    }
  });

  return (
    <group ref={modelRef}>
      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.25}>
        <Resize scale={4.4}>
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

export default function Stingray() {
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
      <div className="w-full h-full min-h-screen relative z-20 flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 font-mono select-none border-y border-[#27272A] overflow-hidden">
        
        {/* TOP HUD: Info, Title, & Action Buttons */}
        <div className="absolute top-16 sm:top-20 md:top-24 left-4 sm:left-8 md:left-12 right-4 sm:right-8 md:right-12 z-30 font-mono flex flex-col md:flex-row md:items-start justify-between gap-4 pointer-events-none">
          
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs mb-1.5">
              <span className="text-[#C8A27A] font-bold tracking-widest uppercase">
                [3D VIEWPORT // ACTIVE]
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FFFFFF] font-sans tracking-tight uppercase">
              STINGRAY PLATFORM
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mt-1 line-clamp-2 sm:line-clamp-none">
              Bio-mimetic autonomous vehicle integrating compliant wing actuation and edge spatial tracking.
            </p>
          </div>

          {/* Action Vectors */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pointer-events-auto">
            <Link
              href="https://docs.byaugustus.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-[#27272A] bg-[#000000]/80 text-[#A1A1AA] hover:border-[#C8A27A] hover:bg-[#C8A27A] hover:text-[#000000] transition-all flex items-center gap-1.5 text-xs uppercase font-bold backdrop-blur-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C8A27A]" />
              <span>[ DOCS ↗ ]</span>
            </Link>

            <Link
              href="https://github.com/byaugustus"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-[#27272A] bg-[#000000]/80 text-[#A1A1AA] hover:border-[#C8A27A] hover:bg-[#C8A27A] hover:text-[#000000] transition-all flex items-center gap-1.5 text-xs uppercase font-bold backdrop-blur-sm"
            >
              <GitBranch className="w-3.5 h-3.5 text-[#C8A27A]" />
              <span>[ GITHUB ↗ ]</span>
            </Link>

            <Link
              href="#slide-mosaic"
              className="px-3.5 py-1.5 border border-[#C8A27A]/50 bg-[#C8A27A]/10 text-[#FFFFFF] hover:border-[#C8A27A] hover:bg-[#C8A27A] hover:text-[#000000] transition-all flex items-center gap-1.5 text-xs uppercase font-bold backdrop-blur-sm"
            >
              <Box className="w-3.5 h-3.5 text-[#C8A27A]" />
              <span>[ VAULT CAD ↗ ]</span>
            </Link>
          </div>

        </div>

        {/* FULL VERTICAL SCHEMATIC VIEWPORT (Edge-Fade Masked Bleed) */}
        <div className="w-full h-[78vh] sm:h-[82vh] md:h-[86vh] max-w-6xl relative flex items-center justify-center mt-12 sm:mt-16 pointer-events-none">
          <div
            className="w-full h-full bg-contain bg-center bg-no-repeat transition-transform duration-700"
            style={{
              backgroundImage: "url('/BY_Major.png')", // Replace with RC18 blueprint/schematic asset if desired
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0) 100%)",
              filter: "contrast(1.15) brightness(0.95)",
            }}
          />
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
            <span className="text-[#C8A27A] font-bold tracking-widest">[3D VIEWPORT // ACTIVE]</span>
            <span className="text-[#27272A]">/</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#FFFFFF] font-sans tracking-tight uppercase">
            STINGRAY PLATFORM
          </h3>

          <p className="font-sans text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mt-1">
            Bio-mimetic autonomous vehicle integrating compliant wing actuation and edge spatial tracking.
          </p>
        </div>

        {/* Action Vectors */}
        <div className="flex flex-wrap items-center gap-2.5 pointer-events-auto">
          <Link
            href="https://docs.byaugustus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-[#27272A] bg-[#000000]/80 text-[#A1A1AA] hover:border-[#C8A27A] hover:bg-[#C8A27A] hover:text-[#000000] transition-all flex items-center gap-1.5 text-xs uppercase font-bold"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C8A27A]" />
            <span>[ DOCS ↗ ]</span>
          </Link>

          <Link
            href="https://github.com/byaugustus"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-[#27272A] bg-[#000000]/80 text-[#A1A1AA] hover:border-[#C8A27A] hover:bg-[#C8A27A] hover:text-[#000000] transition-all flex items-center gap-1.5 text-xs uppercase font-bold"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#C8A27A]" />
            <span>[ GITHUB ↗ ]</span>
          </Link>

          <Link
            href="#slide-mosaic"
            className="px-3.5 py-1.5 border border-[#C8A27A]/50 bg-[#C8A27A]/10 text-[#FFFFFF] hover:border-[#C8A27A] hover:bg-[#C8A27A] hover:text-[#000000] transition-all flex items-center gap-1.5 text-xs uppercase font-bold"
          >
            <Box className="w-3.5 h-3.5 text-[#C8A27A]" />
            <span>[ VAULT CAD ↗ ]</span>
          </Link>
        </div>

      </div>

      {/* BOTTOM HUD */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 font-mono text-xs text-[#71717A] pointer-events-none text-right">
        <span>AERODYNAMICS: BIO-MIMETIC FLAPPING FOIL</span>
        <br />
        <span className="text-[#00E5FF]">CONTROL BUS: CAN 2.0B + RTOS</span>
      </div>

      {/* 3D Canvas */}
      <LazyCanvas
        camera={{ position: [0, 2.0, 6.0], fov: 45 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[12, 14, 10]} intensity={2.0} color="#FFFFFF" />
        <directionalLight position={[-12, -6, -10]} intensity={1.2} color="#00E5FF" />
        <pointLight position={[0, -2, 3]} intensity={1.5} color="#C8A27A" />

        <ParticleStarfield />

        <ModelErrorBoundary>
          <Suspense fallback={<ModelLoadingIndicator />}>
            <StingrayModel />
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