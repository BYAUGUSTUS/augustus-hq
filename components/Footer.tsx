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
    <footer className="w-full bg-[#000000] border-t border-[#27272A] py-6 px-6 sm:px-10 font-mono text-xs select-none">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Column: Live UTC Telemetry & Build Revision */}
        <div className="flex items-center gap-4 text-[#71717A]">
          <span className="text-[#FFFFFF] tabular-nums tracking-widest">
            {utcTime || "--:--:-- UTC"}
          </span>
          <span className="text-[#27272A]">/</span>
          <span className="tracking-widest">REV: 2026.04-SECURE</span>
        </div>

        {/* Center Column: Copyright Provenance */}
        <div className="text-[#71717A] tracking-widest text-center">
          © 2026 BY AUGUSTUS. ALL RIGHTS RESERVED.
        </div>

        {/* Right Column: Verified Social Nodes with Inverting Green Box Hover */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 tracking-widest uppercase">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 border border-transparent text-[#A1A1AA] hover:border-[#00FF9D] hover:bg-[#00FF9D] hover:text-[#000000] transition-all duration-150 flex items-center gap-1 group"
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