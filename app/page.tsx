// filepath: app/page.tsx
"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import ArchitectDossier from "@/components/ArchitectDossier";
import TemporalMosaic from "@/components/TemporalMosaic";
import ScienceLayer from "@/components/ScienceLayer";
import TacticalSidebar from "@/components/TacticalSidebar";
import Footer from "@/components/Footer";

// Dynamically import 3D Canvas components with SSR disabled for WebGL hydration stability
const Hero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
});

const RARM = dynamic(() => import("@/components/RARM"), {
  ssr: false,
});

const Stingray = dynamic(() => import("@/components/Stingray"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <div className="slideshow-deck select-none relative">
      
      {/* Minimalist Sidebar Navigator (Scroll-Spy) */}
      <TacticalSidebar />

      {/* SLIDE 1: Hero Kinetic Headline */}
      <section id="slide-hero" className="snap-slide px-6 text-center z-10 pt-16">
        <span className="font-mono text-xs text-[#71717A] tracking-tactical uppercase mb-4">
          SEC-SPEC // ROBOTICS &amp; AI SYSTEMS R&amp;D
        </span>

        <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-anduril text-[#FFFFFF] font-sans leading-none uppercase">
          BY~AUGUSTUS
        </h1>

        <p className="max-w-2xl text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#A1A1AA] mt-6 font-sans">
          Autonomous deep-tech research installation. Engineering custom
          high-torque actuators, embedded vision pipelines, and physical
          robotic systems from first principles.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 font-mono text-xs tracking-wider uppercase">
          <Link
            href="#slide-dossier"
            className="w-full sm:w-auto px-6 py-3 border border-[#27272A] text-[#FFFFFF] bg-[#000000]/60 backdrop-blur-sm hover:bg-[#FFFFFF] hover:text-[#000000] transition-colors text-center"
          >
            [ EXPLORE THE VAULT ↗ ]
          </Link>
          <Link
            href="#execution-log"
            className="w-full sm:w-auto px-6 py-3 border border-[#27272A] text-[#FFFFFF] bg-[#000000]/60 backdrop-blur-sm hover:border-[#00FF9D] hover:text-[#00FF9D] transition-colors text-center"
          >
            [ VIEW EXECUTION LOG ]
          </Link>
        </div>
      </section>

      {/* SLIDE 2: Architect Dossier */}
      <section id="slide-dossier" className="snap-slide bg-[#000000]">
        <ArchitectDossier />
      </section>

      {/* SLIDE 3: RC18 Kinematic Chassis Viewport */}
      <section id="slide-hero3d" className="snap-slide bg-[#000000]">
        <Hero3D />
      </section>

      {/* SLIDE 4: 6-DOF Voice-Controlled Robotic Arm Viewport */}
      <section id="slide-rarm" className="snap-slide bg-[#000000]">
        <RARM />
      </section>

      {/* SLIDE 5: Stingray UAV Viewport */}
      <section id="slide-stingray" className="snap-slide bg-[#000000]">
        <Stingray />
      </section>

      {/* SLIDE 6: Temporal Mosaic 4x4 */}
      <section id="slide-mosaic" className="snap-slide bg-[#000000]">
        <TemporalMosaic />
      </section>
      {/* SLIDE 7: Research Paper Viewer */}
      <section id="slide-science" className="snap-slide bg-[#000000]">
        <ScienceLayer />
      </section>

      {/* ========================================================
          FLUSH FOOTER SNAP
      ======================================================== */}
      {/* FLUSH FOOTER SNAP */}
      <div className="snap-footer">
        <Footer />
      </div>

    </div>
  );
}