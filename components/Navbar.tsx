// filepath: components/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Plus } from "lucide-react";

interface SubLink {
  title: string;
  href: string;
  isExternal?: boolean;
}

interface NavCategory {
  id: string;
  label: string;
  href: string;
  domainTitle: string;
  domainDescription: string;
  subLinks: SubLink[];
  isExternal?: boolean;
}

const NAV_DOMAINS: NavCategory[] = [
  {
    id: "vault",
    label: "VAULT",
    href: "#vault",
    domainTitle: "HARDWARE ARCHITECTURE // VAULT",
    domainDescription:
      "Precision-engineered electromechanical actuators, embedded spatial vision systems, and custom chassis assemblies developed from first principles.",
    subLinks: [
      { title: "Custom Actuator V2.1 (4.8 Nm)", href: "#vault" },
      { title: "RC18 High-Speed Kinematic Platform", href: "#vault" },
      { title: "6-DOF Robotic Joint Assembly", href: "#vault" },
      { title: "Embedded OpenCV Perception Pipeline", href: "#vault" },
      { title: "Phoenix Deck System Controller", href: "#vault" },
      { title: "Full CAD & Schematic Topology", href: "#vault" },
    ],
  },
  {
    id: "log",
    label: "LOG",
    href: "#execution-log",
    domainTitle: "LIVE EXECUTION LEDGER // TIMELINE",
    domainDescription:
      "Real-time chronological telemetry feed tracking public GitHub firmware commits, bench test benchmarks, and physical workshop milestones.",
    subLinks: [
      { title: "RIO Framework Software Commits", href: "#execution-log" },
      { title: "CNC Milling & Prototyping Logs", href: "#execution-log" },
      { title: "Thermal & Harmonic Stress Benchmarks", href: "#execution-log" },
      { title: "Firmware Protocol & CAN-Bus Updates", href: "#execution-log" },
      { title: "Patent & Academic Publications", href: "#execution-log" },
    ],
  },
  {
    id: "docs",
    label: "DOCS",
    href: "https://docs.byaugustus.com",
    isExternal: true,
    domainTitle: "TECHNICAL SPECIFICATION ENGINE",
    domainDescription:
      "Markdown-based documentation hub containing API specifications, motor dynamics derivations, and toolchain configurations for the RIO Robotics Framework.",
    subLinks: [
      { title: "RIO Framework Quickstart Guide", href: "https://docs.byaugustus.com", isExternal: true },
      { title: "Hardware-to-Software Protocols", href: "https://docs.byaugustus.com", isExternal: true },
      { title: "Motor Torque & Kinematics Equations", href: "https://docs.byaugustus.com", isExternal: true },
      { title: "Edge Vision Kernel Architecture", href: "https://docs.byaugustus.com", isExternal: true },
      { title: "BOM & Component Schematics", href: "https://docs.byaugustus.com", isExternal: true },
    ],
  },
];

export default function Navbar() {
  const [localTime, setLocalTime] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<NavCategory | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 12-Hour AM/PM Local Time Formatter
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12;
      hours = hours ? hours : 12; // 0 becomes 12
      const strHours = String(hours).padStart(2, "0");

      setLocalTime(`${strHours}:${minutes}:${seconds} ${ampm} LOCAL`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = (cat: NavCategory) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveCategory(cat);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 150);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full bg-[#000000] border-b border-[#27272A] select-none"
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Main Navigation Bar */}
      <div className="max-w-[1800px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        
        {/* Left Anchor: Brand & Inverting Cyber Phosphor Box */}
        <div className="flex items-center gap-3 sm:gap-4 font-mono">
          <Link
            href="/"
            onClick={() => setActiveCategory(null)}
            className="text-sm font-extrabold tracking-widest text-[#FFFFFF] px-2 py-1 border border-transparent hover:bg-[#00FF9D] hover:text-[#000000] hover:border-[#00FF9D] transition-all duration-150 uppercase"
          >
            BY~AUGUSTUS
          </Link>
          <span className="text-[#343A40]">/</span>
          <span className="text-xs text-[#71717A] tracking-tactical tabular-nums hidden sm:inline-block">
            {localTime || "--:--:-- -- LOCAL"}
          </span>
        </div>

        {/* Center / Right Anchor: Mega-Dropdown Triggers */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 font-mono text-xs tracking-widest uppercase h-full">
          {NAV_DOMAINS.map((cat) => {
            const isActive = activeCategory?.id === cat.id;
            return (
              <div
                key={cat.id}
                className="h-full flex items-center"
                onMouseEnter={() => handleMouseEnter(cat)}
              >
                <Link
                  href={cat.href}
                  target={cat.isExternal ? "_blank" : undefined}
                  rel={cat.isExternal ? "noopener noreferrer" : undefined}
                  className={`h-full flex items-center transition-colors relative ${
                    isActive ? "text-[#FFFFFF]" : "text-[#A1A1AA] hover:text-[#FFFFFF]"
                  }`}
                >
                  <span>{cat.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF9D]"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </div>
            );
          })}

          {/* Action Node Button */}
          <Link
            href="https://devsora.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 border border-[#343A40] text-[#FFFFFF] hover:border-[#00FF9D] hover:bg-[#00FF9D] hover:text-[#000000] transition-all duration-150 flex items-center gap-1.5"
          >
            <span>[DEVSORA ↗]</span>
          </Link>
        </nav>

        {/* Mobile Trigger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden text-[#FFFFFF] p-2 hover:text-[#00FF9D] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Mega-Dropdown Drawer */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
            className="hidden md:block w-full bg-[#000000]/95 backdrop-blur-xl border-b border-[#27272A] shadow-2xl"
          >
            <div className="max-w-[1800px] mx-auto px-6 sm:px-10 py-12 grid grid-cols-12 gap-12 font-sans">
              
              {/* Left Column: Domain Narrative */}
              <div className="col-span-4 flex flex-col justify-between pr-8 border-r border-[#27272A]">
                <div>
                  <div className="font-mono text-[11px] text-[#71717A] tracking-tactical uppercase mb-4">
                    {activeCategory.domainTitle}
                  </div>
                  <p className="text-sm md:text-base text-[#D4D4D8] leading-relaxed font-normal">
                    {activeCategory.domainDescription}
                  </p>
                </div>

                <div className="pt-8">
                  <Link
                    href={activeCategory.href}
                    onClick={() => setActiveCategory(null)}
                    target={activeCategory.isExternal ? "_blank" : undefined}
                    rel={activeCategory.isExternal ? "noopener noreferrer" : undefined}
                    className="font-mono text-xs text-[#FFFFFF] hover:text-[#00FF9D] tracking-widest uppercase flex items-center gap-2 group"
                  >
                    <span>EXPLORE ALL {activeCategory.label} SYSTEMS</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A] group-hover:text-[#00FF9D] transition-colors" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Sub-Links Grid */}
              <div className="col-span-8 grid grid-cols-2 gap-x-10 gap-y-4 font-sans">
                {activeCategory.subLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    onClick={() => setActiveCategory(null)}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    className="group py-2 border-b border-[#27272A]/40 hover:border-[#00FF9D]/60 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[#71717A] group-hover:text-[#00FF9D] transition-colors font-mono text-xs">
                        +
                      </span>
                      <span className="text-sm font-medium text-[#D4D4D8] group-hover:text-[#FFFFFF] transition-colors tracking-tight">
                        {link.title}
                      </span>
                    </div>
                    {link.isExternal && (
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A] group-hover:text-[#00FF9D] transition-colors" />
                    )}
                  </Link>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer (Accordion Style) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-y-auto max-h-[85vh] bg-[#000000] border-b border-[#27272A]"
          >
            <div className="px-6 py-6 flex flex-col gap-6 font-mono text-xs tracking-widest uppercase">
              {NAV_DOMAINS.map((cat) => {
                const isExpanded = expandedMobileId === cat.id;
                return (
                  <div key={cat.id} className="border-b border-[#27272A] pb-4">
                    <div
                      className="flex items-center justify-between py-2 text-[#FFFFFF] cursor-pointer"
                      onClick={() =>
                        setExpandedMobileId(isExpanded ? null : cat.id)
                      }
                    >
                      <span className="text-sm font-bold">{cat.label}</span>
                      <Plus
                        className={`w-4 h-4 text-[#71717A] transition-transform duration-200 ${
                          isExpanded ? "rotate-45 text-[#00FF9D]" : ""
                        }`}
                      />
                    </div>

                    {isExpanded && (
                      <div className="mt-3 pl-2 flex flex-col gap-3 font-sans normal-case tracking-normal">
                        <p className="text-xs text-[#71717A] mb-2 leading-relaxed font-mono uppercase tracking-wider">
                          {cat.domainDescription}
                        </p>
                        {cat.subLinks.map((link) => (
                          <Link
                            key={link.title}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            target={link.isExternal ? "_blank" : undefined}
                            rel={link.isExternal ? "noopener noreferrer" : undefined}
                            className="py-1 text-sm text-[#A1A1AA] hover:text-[#FFFFFF] flex items-center justify-between"
                          >
                            <span>+ {link.title}</span>
                            {link.isExternal && (
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A]" />
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                href="https://devsora.com"
                onClick={() => setMobileMenuOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-3 px-4 border border-[#343A40] text-[#FFFFFF] hover:border-[#00FF9D] hover:bg-[#00FF9D] hover:text-[#000000] transition-all flex items-center justify-center gap-1.5"
              >
                <span>[DEVSORA ↗]</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}