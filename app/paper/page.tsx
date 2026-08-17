// filepath: app/paper/page.tsx
"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export default function PaperViewerPage() {
  return (
    <div className="w-screen h-screen bg-[#000000] text-[#FFFFFF] font-mono flex flex-col select-none overflow-hidden">
      
      {/* Top Header Controls */}
      <div className="h-16 px-6 border-b border-[#27272A] bg-[#050505] flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <Link
            href="/#slide-science"
            className="px-3 py-1.5 border border-[#27272A] text-xs text-[#A1A1AA] hover:border-[#00FF9D] hover:text-[#00FF9D] transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>[ RETURN TO DECK ]</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[#71717A]">
            <span>MANUSCRIPT:</span>
            <span className="text-[#FFFFFF] font-bold">RESEARCH_PAPER_AUGUSTUS_2026.PDF</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/research_paper.pdf"
            download="Augustus_Research_Paper.pdf"
            className="px-3 py-1.5 border border-[#00FF9D]/40 bg-[#00FF9D]/10 text-[#00FF9D] hover:bg-[#00FF9D] hover:text-[#000000] transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>[ DOWNLOAD RAW PDF ]</span>
          </a>
        </div>
      </div>

      {/* Embedded PDF Viewer Frame */}
      <div className="flex-1 w-full h-full bg-[#0A0A0C] p-2 sm:p-4">
        <iframe
          src="/research_paper.pdf#toolbar=0"
          className="w-full h-full border border-[#27272A] bg-[#000000]"
          title="Research Paper Manuscript Viewer"
        />
      </div>

    </div>
  );
}