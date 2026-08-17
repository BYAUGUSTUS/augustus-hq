// filepath: components/MobileSchematicView.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Monitor, BookOpen, GitBranch, Box } from "lucide-react";

interface MobileSchematicProps {
  title: string;
  category: string;
  description: string;
  schematicImage: string; // e.g. "/schematics/rc18_blueprint.png"
  specLabel: string;
  specValue: string;
}

export default function MobileSchematicView({
  title,
  category,
  description,
  schematicImage,
  specLabel,
  specValue,
}: MobileSchematicProps) {
  return (
    <div className="w-full h-full min-h-screen bg-[#000000] px-5 py-16 flex flex-col justify-between items-center font-mono select-none border-y border-[#27272A] relative overflow-hidden">
      
      {/* Top HUD Spec */}
      <div className="w-full flex flex-col items-start border-b border-[#27272A] pb-3 z-10">
        <div className="flex items-center gap-2 text-[10px] text-[#00FF9D] tracking-widest font-bold uppercase mb-1">
          <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
          <span>{category}</span>
        </div>
        <h3 className="text-xl font-extrabold text-[#FFFFFF] font-sans tracking-tight uppercase">
          {title}
        </h3>
        <p className="text-xs text-[#A1A1AA] font-sans leading-relaxed mt-1">
          {description}
        </p>
      </div>

      {/* Center 2D Technical Schematic Graphic */}
      <div className="w-full max-w-sm aspect-square my-auto relative border border-[#27272A] bg-[#050505] p-3 flex flex-col justify-between overflow-hidden shadow-2xl">
        
        {/* Subtle Blueprint Grid Lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "linear-gradient(to right, #00FF9D 1px, transparent 1px), linear-gradient(to bottom, #00FF9D 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        {/* Blueprint Schematic Artwork */}
        <div 
          className="w-full h-full bg-contain bg-center bg-no-repeat z-10"
          style={{
            backgroundImage: `url('${schematicImage}')`,
            filter: "contrast(1.2) brightness(0.95)",
          }}
        />

        {/* 3D Hardware Desktop Notice Badge */}
        <div className="z-10 bg-[#000000]/90 border border-[#00E5FF]/40 p-2 flex items-center justify-between text-[9px] text-[#00E5FF]">
          <div className="flex items-center gap-1.5 font-bold">
            <Monitor className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>[ 3D CAD: PC / WIDESCREEN ONLY ]</span>
          </div>
          <span className="text-[#71717A]">DESKTOP VIEWPORT</span>
        </div>

      </div>

      {/* Bottom Action Vectors & Telemetry */}
      <div className="w-full flex flex-col gap-3 z-10 border-t border-[#27272A] pt-3">
        <div className="flex items-center justify-between text-[10px] text-[#71717A]">
          <span>{specLabel}: <strong className="text-[#FFFFFF]">{specValue}</strong></span>
          <span className="text-[#00FF9D]">[VERIFIED CAD]</span>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full">
          <Link
            href="https://docs.byaugustus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-1 border border-[#27272A] bg-[#050505] text-[#A1A1AA] hover:text-[#FFFFFF] flex items-center justify-center gap-1 text-[10px] font-bold"
          >
            <BookOpen className="w-3 h-3 text-[#00FF9D]" />
            <span>[ DOCS ]</span>
          </Link>
          <Link
            href="https://github.com/byaugustus"
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-1 border border-[#27272A] bg-[#050505] text-[#A1A1AA] hover:text-[#FFFFFF] flex items-center justify-center gap-1 text-[10px] font-bold"
          >
            <GitBranch className="w-3 h-3 text-[#00FF9D]" />
            <span>[ GITHUB ]</span>
          </Link>
          <Link
            href="#slide-mosaic"
            className="py-2 px-1 border border-[#00FF9D]/40 bg-[#00FF9D]/10 text-[#00FF9D] flex items-center justify-center gap-1 text-[10px] font-bold"
          >
            <Box className="w-3 h-3 text-[#00FF9D]" />
            <span>[ VAULT ]</span>
          </Link>
        </div>
      </div>

    </div>
  );
}