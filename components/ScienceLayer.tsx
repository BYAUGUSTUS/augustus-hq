// filepath: components/ScienceLayer.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Download } from "lucide-react";

// Densely populated mathematical physics & robotics kinematics tracks
const EQUATION_TRACKS = [
  "\\mathbf{F} = q(\\mathbf{E} + \\mathbf{v} \\times \\mathbf{B}) \\quad \\mathcal{L} = T - V \\quad F = G \\frac{m_1 m_2}{r^2} \\quad E = mc^2 \\quad \\nabla \\cdot \\mathbf{B} = 0 \\quad \\tau = I \\alpha \\quad \\mathbf{F} = m\\mathbf{a}",
  "\\rho \\left( \\frac{\\partial \\mathbf{v}}{\\partial t} + \\mathbf{v} \\cdot \\nabla \\mathbf{v} \\right) = -\\nabla p + \\mu \\nabla^2 \\mathbf{v} \\quad i\\hbar \\frac{\\partial \\psi}{\\partial t} = \\hat{H}\\psi \\quad \\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}",
  "\\mathbf{T}_i^{i-1} = \\operatorname{Rot}_z(\\theta_i) \\operatorname{Trans}_z(d_i) \\operatorname{Trans}_x(a_i) \\operatorname{Rot}_x(\\alpha_i) \\quad \\tau = K_t I_{\\text{phase}} - B\\omega - J\\dot{\\omega} \\quad \\mathbf{J}(\\mathbf{q})\\dot{\\mathbf{q}} = \\mathbf{v}_e",
  "\\mathbf{x}_{k} = \\mathbf{A}\\mathbf{x}_{k-1} + \\mathbf{B}\\mathbf{u}_k + \\mathbf{w}_k \\quad \\mathbf{K}_k = \\mathbf{P}_k^- \\mathbf{H}^T (\\mathbf{H}\\mathbf{P}_k^- \\mathbf{H}^T + \\mathbf{R})^{-1} \\quad \\mathbf{P}_k = (\\mathbf{I} - \\mathbf{K}_k\\mathbf{H})\\mathbf{P}_k^-",
  "P_{\\text{loss}} = I^2 R + \\frac{\\tau \\omega}{\\eta_{\\text{gear}}} \\quad \\zeta = \\frac{c}{2\\sqrt{km}} \\quad \\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0 \\quad \\ddot{\\theta} + \\frac{g}{L}\\sin\\theta = 0 \\quad \\mathbf{M}(\\mathbf{q})\\ddot{\\mathbf{q}} + \\mathbf{C}(\\mathbf{q},\\dot{\\mathbf{q}})\\dot{\\mathbf{q}} + \\mathbf{g}(\\mathbf{q}) = \\boldsymbol{\\tau}",
  "\\nabla^2 \\phi = \\frac{1}{c^2} \\frac{\\partial^2 \\phi}{\\partial t^2} \\quad \\oint \\mathbf{B} \\cdot d\\boldsymbol{\\ell} = \\mu_0 I_{\\text{enc}} + \\mu_0 \\varepsilon_0 \\frac{d\\Phi_E}{dt} \\quad \\mathcal{H} = \\sum p_i \\dot{q}_i - \\mathcal{L}",
  "\\mathbf{q}_{t+1} = \\mathbf{q}_t \\otimes \\begin{bmatrix} \\cos(\\frac{\\|\\boldsymbol{\\omega}\\|\\Delta t}{2}) \\\\ \\frac{\\boldsymbol{\\omega}}{\\|\\boldsymbol{\\omega}\\|} \\sin(\\frac{\\|\\boldsymbol{\\omega}\\|\\Delta t}{2}) \\end{bmatrix} \\quad \\sigma = \\frac{F}{A} \\quad \\epsilon = \\frac{\\Delta L}{L_0}",
  "\\mathbf{u}(t) = K_p e(t) + K_i \\int_0^t e(\\tau) d\\tau + K_d \\frac{de(t)}{dt} \\quad \\operatorname{rank}(\\mathcal{C}) = n \\quad \\mathcal{O} = \\begin{bmatrix} \\mathbf{C} \\\\ \\mathbf{CA} \\\\ \\vdots \\\\ \\mathbf{CA}^{n-1} \\end{bmatrix}",
  "\\mathcal{F}\\{f(t)\\} = \\int_{-\\infty}^{\\infty} f(t) e^{-i 2\\pi f t} dt \\quad H(s) = \\frac{\\omega_n^2}{s^2 + 2\\zeta\\omega_n s + \\omega_n^2} \\quad V = \\frac{1}{2}\\mathbf{x}^T \\mathbf{P} \\mathbf{x}",
  "\\nabla \\cdot \\mathbf{D} = \\rho_v \\quad \\nabla \\times \\mathbf{H} = \\mathbf{J} + \\frac{\\partial \\mathbf{D}}{\\partial t} \\quad \\oint_S \\mathbf{E} \\cdot d\\mathbf{A} = \\frac{Q_{\\text{enc}}}{\\varepsilon_0} \\quad \\Delta U = Q - W",
  "\\lambda_{\\max}(\\mathbf{A}) \\le 1 \\quad \\dot{\\mathbf{x}} = \\mathbf{f}(\\mathbf{x}) + \\mathbf{g}(\\mathbf{x})\\mathbf{u} \\quad \\mathcal{L}_{\\mathbf{f}} h(\\mathbf{x}) = \\nabla h(\\mathbf{x}) \\cdot \\mathbf{f}(\\mathbf{x}) \\quad y = h(\\mathbf{x})",
  "\\mathbf{I} = \\int r^2 dm \\quad \\boldsymbol{\\tau} = \\mathbf{r} \\times \\mathbf{F} \\quad L = I\\omega \\quad \\frac{d}{dt}\\left(\\frac{\\partial \\mathcal{L}}{\\partial \\dot{q}_j}\\right) - \\frac{\\partial \\mathcal{L}}{\\partial q_j} = 0",
];

export default function ScienceLayer() {
  return (
    <div className="w-full h-screen bg-[#000000] relative z-20 flex flex-col justify-between items-center px-4 sm:px-8 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-14 font-mono select-none overflow-hidden border-y border-[#27272A]">
      
      {/* ========================================================
          BACKGROUND LAYER: DENSE ALTERNATING TRAVELING LINES
      ======================================================== */}
      <div className="absolute inset-0 pointer-events-none opacity-45 flex flex-col justify-between py-2 overflow-hidden z-0">
        {EQUATION_TRACKS.map((track, i) => {
          // Even indexes travel Left -> Right, Odd indexes travel Right -> Left
          const isLeftToRight = i % 2 === 0;

          return (
            <motion.div
              key={i}
              className="whitespace-nowrap text-[11px] sm:text-xs md:text-[13px] tracking-widest text-[#C8A27A] flex gap-12 font-mono drop-shadow-[0_0_6px_rgba(200,162,122,0.25)]"
              animate={{
                x: isLeftToRight ? ["-50%", "0%"] : ["0%", "-50%"],
              }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 22 + (i % 5) * 4,
              }}
            >
              <span>{track}</span>
              <span>{track}</span>
              <span>{track}</span>
              <span>{track}</span>
            </motion.div>
          );
        })}
      </div>

      {/* ========================================================
          TOP / EXPANDED PREVIEW IMAGE (With Clean Gradient Mask)
      ======================================================== */}
      <div className="w-full flex-1 relative flex items-start justify-center overflow-hidden min-h-0 z-10">
        
        {/* Full-bleed responsive image asset */}
        <div
          className="w-full h-full max-w-6xl bg-contain sm:bg-cover bg-no-repeat bg-top"
          style={{
            backgroundImage: "url('/research_paper_preview.png')",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0) 100%)",
            filter: "contrast(1.15) brightness(0.98)",
          }}
        />

        {/* Seamless bottom fade overlay */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#000000] via-[#000000]/85 to-transparent pointer-events-none" />
      </div>

      {/* ========================================================
          BOTTOM CONTENT: FLUSH FLOATING GLASS READOUT
      ======================================================= */}
      <div className="w-full max-w-4xl z-20 flex flex-col items-center text-center -mt-4 shrink-0 bg-[#000000]/80 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-[#27272A] shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
        
        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FFFFFF] font-sans tracking-tight uppercase leading-tight mb-1.5">
          SONOAI BRIDGE PART I
        </h2>

        {/* Subtitle */}
        <p className="font-sans text-xs sm:text-sm text-[#C8A27A] font-medium max-w-2xl leading-relaxed mb-3">
          An AI-Driven Speech-to-Sign Translation and Haptic Feedback System for Accessible Communication
        </p>

        {/* Primary Author Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#3A312A] bg-[#0A0A0C] text-[#D4D4D8] text-[11px] uppercase mb-3.5 tracking-wider rounded-sm">
          <span className="text-[#A89887]">PRIMARY AUTHOR:</span>
          <span className="text-[#FFFFFF] font-bold">HITEN BALARA</span>
        </div>

        {/* Parallel Action Buttons */}
        <div className="flex flex-row items-center gap-3 w-full sm:w-auto justify-center">
          <a
            href="/research_paper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 border border-[#C8A27A] bg-[#C8A27A] text-[#000000] hover:bg-transparent hover:text-[#C8A27A] transition-all flex items-center justify-center gap-2 text-xs uppercase font-bold tracking-wider rounded-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>OPEN FULL PAPER</span>
          </a>

          <a
            href="/research_paper.pdf"
            download="SonoAI_Bridge_Part_I_Research_Paper.pdf"
            className="px-5 py-2 border border-[#3A312A] bg-[#050505] text-[#F5F0E6] hover:border-[#C8A27A] hover:text-[#C8A27A] transition-all flex items-center justify-center gap-2 text-xs uppercase font-bold tracking-wider rounded-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#C8A27A]" />
            <span>DOWNLOAD PDF</span>
          </a>
        </div>

      </div>

    </div>
  );
}