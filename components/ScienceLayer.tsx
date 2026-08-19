// filepath: components/ScienceLayer.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Download } from "lucide-react";

// Staggered Background Math & Physics Formulas
const EQUATION_TRACKS = [
  "\\times \\mathbf{B}) --- \\mathcal{L} = T - V --- F = G \\frac{m_1 m_2}{r^2} --- E = mc^2 --- \\nabla \\cdot \\mathbf{B} = 0 --- \\tau = I \\alpha --- \\mathbf{F} = q(\\mathbf{E} + \\mathbf{v} \\times \\mathbf{B}) --- \\mathcal{L} = T - V --- F = G \\frac{m_1 m_2}{r^2} --- E = mc^2",
  "\\frac{\\partial \\mathbf{v}}{\\partial t} + \\mathbf{v} \\cdot \\nabla \\mathbf{v} \\right) = -\\nabla p + \\mu \\nabla^2 \\mathbf{v} \\quad i\\hbar \\frac{\\partial \\psi}{\\partial t} = \\hat{H}\\psi --- \\rho \\left( \\frac{\\partial \\mathbf{v}}{\\partial t} + \\mathbf{v} \\cdot \\nabla \\mathbf{v} \\right) = -\\nabla p + \\mu \\nabla^2 \\mathbf{v}",
  "\\mathbf{T}_i^{i-1} = \\operatorname{Rot}_z(\\theta_i) \\operatorname{Trans}_z(d_i) \\operatorname{Trans}_x(a_i) \\operatorname{Rot}_x(\\alpha_i) \\quad \\tau = K_t I_{phase} - B\\omega --- \\mathbf{T}_i^{i-1} = \\operatorname{Rot}_z(\\theta_i)",
  "+ \\mathbf{B}\\mathbf{u}_k + \\mathbf{w}_k --- \\mathbf{K}_k = \\mathbf{P}_k^- \\mathbf{H}^T (\\mathbf{H}\\mathbf{P}_k^- \\mathbf{H}^T + \\mathbf{R})^{-1} \\quad \\mathbf{x}_{k} = \\mathbf{A}\\mathbf{x}_{k-1} + \\mathbf{B}\\mathbf{u}_k + \\mathbf{w}_k",
  "P_{\\text{loss}} = I^2 R + \\frac{\\tau \\omega}{\\eta_{\\text{gear}}} --- \\zeta = \\frac{c}{2\\sqrt{km}} --- \\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0 \\quad P_{\\text{loss}} = I^2 R + \\frac{\\tau \\omega}{\\eta_{\\text{gear}}} --- \\zeta = \\frac{c}{2\\sqrt{km}}",
];

export default function ScienceLayer() {
  return (
    <div className="w-full h-screen bg-[#000000] relative z-20 flex flex-col justify-end items-center px-4 sm:px-8 md:px-12 pt-12 pb-6 font-mono select-none overflow-hidden border-y border-[#27272A]">
      
      {/* Background Animated Equations */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex flex-col justify-around py-4 overflow-hidden">
        {EQUATION_TRACKS.map((track, i) => (
          <motion.div
            key={i}
            className="whitespace-nowrap text-xs sm:text-sm tracking-widest text-[#C8A27A]/60 flex gap-12 font-mono"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25 + i * 6,
            }}
          >
            <span>{track}</span>
            <span>{track}</span>
            <span>{track}</span>
          </motion.div>
        ))}
      </div>

      {/* ========================================================
          TOP / EXPANDED PREVIEW IMAGE (Fills full top area & merges directly into text)
      ======================================================== */}
      <div className="w-full flex-1 relative flex items-start justify-center overflow-hidden min-h-0">
        
        {/* Full-bleed responsive image asset */}
        <div
          className="w-full h-full max-w-6xl bg-contain sm:bg-cover bg-no-repeat bg-top"
          style={{
            backgroundImage: "url('/research_paper_preview.png')",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%)",
            filter: "contrast(1.12) brightness(0.96)",
          }}
        />

        {/* Seamless bottom fade overlay */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-[#000000] via-[#000000]/80 to-transparent backdrop-blur-[2px] pointer-events-none" />
      </div>

      {/* ========================================================
          BOTTOM CONTENT: DIRECTLY FLUSH WITH THE FADING PREVIEW
      ======================================================== */}
      <div className="w-full max-w-4xl z-10 flex flex-col items-center text-center -mt-6">
        
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FFFFFF] font-sans tracking-tight uppercase leading-tight mb-2">
          SONOAI BRIDGE PART I
        </h2>

        {/* Subtitle */}
        <p className="font-sans text-xs sm:text-sm text-[#00E5FF] font-medium max-w-2xl leading-relaxed mb-3">
          An AI-Driven Speech-to-Sign Translation and Haptic Feedback System for Accessible Communication
        </p>

        {/* Primary Author Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#27272A] bg-[#050505] text-[#A1A1AA] text-[11px] uppercase mb-4 tracking-wider">
          <span className="text-[#71717A]">PRIMARY AUTHOR:</span>
          <span className="text-[#FFFFFF] font-bold">HITEN BALARA</span>
        </div>

        {/* Parallel Action Buttons */}
        <div className="flex flex-row items-center gap-3 w-full sm:w-auto justify-center">
          <a
            href="/research_paper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-[#C8A27A] bg-[#C8A27A] text-[#000000] hover:bg-transparent hover:text-[#C8A27A] transition-all flex items-center justify-center gap-2 text-xs uppercase font-bold tracking-wider"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>OPEN FULL PAPER</span>
          </a>

          <a
            href="/research_paper.pdf"
            download="SonoAI_Bridge_Part_I_Research_Paper.pdf"
            className="px-5 py-2.5 border border-[#27272A] bg-[#050505] text-[#A1A1AA] hover:border-[#C8A27A] hover:text-[#C8A27A] transition-all flex items-center justify-center gap-2 text-xs uppercase font-bold tracking-wider"
          >
            <Download className="w-3.5 h-3.5 text-[#C8A27A]" />
            <span>DOWNLOAD PDF</span>
          </a>
        </div>

      </div>

    </div>
  );
}