// filepath: components/ProjectExample01.tsx
"use client";

import React from "react";
import Link from "next/link";

interface ProjectExample01Props {
  title?: string;
  category?: string;
  description?: string;
  schematicImage?: string;
  docsUrl?: string;
  githubUrl?: string;
  vaultUrl?: string;
}

export default function ProjectExample01({
  title = "FLANKER B // Su-27",
  description = "JET || EXAMPLE PAGE FOR TESTING || QWERTYUIASDFGHJzXCVBNWERTYUDSFGHCVBNFYVGHVEXRECTRVFYGBUHNIWSERCDTFVYGBUHNIJZESXRDCTFVYGBUHN",
  schematicImage = "/ProjectExampleImage.png",
  docsUrl = "https://docs.byaugustus.com",
  githubUrl = "https://github.com/byaugustus",
  vaultUrl = "#slide-mosaic",
}: ProjectExample01Props) {
  return (
    <div className="w-full h-full min-h-screen relative z-20 flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 font-mono select-none border-y border-[#27272A] overflow-hidden">

      {/* TOP HUD: Info, Title, & Action Buttons (Aligned to Match 3D Viewports) */}
      <div className="absolute top-24 sm:top-28 md:top-32 left-4 sm:left-8 md:left-12 right-4 sm:right-8 md:right-12 z-30 font-mono flex flex-col md:flex-row md:items-start justify-between gap-4 pointer-events-none">
        
        <div className="max-w-2xl">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FFFFFF] font-sans tracking-tight uppercase">
            {title}
          </h3>

          <p className="font-sans text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mt-1 line-clamp-2 sm:line-clamp-none">
            {description}
          </p>
        </div>

        {/* Action Vectors */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pointer-events-auto">
          <Link
            href={docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-[#27272A] bg-[#000000]/80 text-[#A1A1AA] hover:border-[#C8A27A] hover:bg-[#C8A27A] hover:text-[#000000] transition-all flex items-center gap-1.5 text-xs uppercase font-bold backdrop-blur-sm"
          >
            <span>DOCS</span>
          </Link>

          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-[#27272A] bg-[#000000]/80 text-[#A1A1AA] hover:border-[#C8A27A] hover:bg-[#C8A27A] hover:text-[#000000] transition-all flex items-center gap-1.5 text-xs uppercase font-bold backdrop-blur-sm"
          >
            <span>GITHUB</span>
          </Link>
        </div>

      </div>

      {/* FULL VERTICAL SCHEMATIC VIEWPORT (Top-to-Bottom Bleed with Subtle Edge Fade) */}
      <div className="w-full h-[78vh] sm:h-[82vh] md:h-[86vh] max-w-6xl relative flex items-center justify-center mt-12 sm:mt-16 pointer-events-none">
        <div
          className="w-full h-full bg-contain bg-center bg-no-repeat transition-transform duration-700"
          style={{
            backgroundImage: `url('${schematicImage}')`,
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