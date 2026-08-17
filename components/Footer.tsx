// filepath: components/Footer.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const [utcTime, setUtcTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setUtcTime(`${hours}:${minutes}:${seconds} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { label: "GITHUB", href: "https://github.com/byaugustus" },
    { label: "LINKEDIN", href: "https://linkedin.com" },
    { label: "YOUTUBE", href: "https://youtube.com/@byaugustus" },
    { label: "DEVSORA", href: "https://devsora.com" },
  ];

  return (
    <footer className="w-full bg-[#000000] border-t border-[#27272A] pt-6 pb-12 sm:pb-6 px-4 sm:px-10 font-mono text-[10px] sm:text-xs select-none">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
        
        {/* Left Column: Live UTC Telemetry & Build Revision */}
        <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 text-[#71717A] text-[10px] sm:text-xs">
          <span className="text-[#FFFFFF] tabular-nums tracking-widest font-semibold">
            {utcTime || "--:--:-- UTC"}
          </span>
          <span className="text-[#27272A]">/</span>
          <span className="tracking-widest">REV: 2026.04-SECURE</span>
        </div>

        {/* Center Column: Copyright Provenance */}
        <div className="text-[#71717A] tracking-widest text-[9px] sm:text-xs">
          © 2026 BY AUGUSTUS. ALL RIGHTS RESERVED.
        </div>

        {/* Right Column: 2x2 Grid on Mobile / Row on Desktop */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 tracking-widest uppercase w-full sm:w-auto">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 sm:py-1 border border-[#27272A] sm:border-transparent bg-[#050505] sm:bg-transparent text-[#A1A1AA] hover:border-[#00FF9D] hover:bg-[#00FF9D] hover:text-[#000000] transition-all duration-150 flex items-center justify-center gap-1 group text-[10px] sm:text-xs font-bold"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-3 h-3 text-[#71717A] group-hover:text-[#000000] transition-colors" />
            </Link>
          ))}
        </div>

      </div>
    </footer>
  );
}