// filepath: components/ArchitectDossier.tsx
"use client";

import { 
  FileDown, 
} from "lucide-react";

export default function ArchitectDossier() {
//   const telemetryMetrics = [
//     {
//       label: "PATENTED MECHANISMS",
//       value: "03 REGISTERED / FILED",
//       detail: "Actuator Dynamics & Joint Kinematics",
//       icon: Award,
//     },
//     {
//       label: "JOURNAL PUBLICATIONS",
//       value: "04 INTERNATIONAL PAPERS",
//       detail: "Peer-Reviewed Robotics Research",
//       icon: BookOpen,
//     },
//     {
//       label: "SYSTEM DEPLOYMENTS",
//       value: "35+ HARDWARE / AI BUILDS",
//       detail: "Custom Actuators, OpenCV Edge, RTOS",
//       icon: Cpu,
//     },
//     {
//       label: "HACKATHON PODIUMS",
//       value: "8-9 VICTORIES (1ST-3RD)",
//       detail: "National Deep-Tech & AI Sprints",
//       icon: Trophy,
//     },
//     {
//       label: "ACADEMIC BENCHMARK",
//       value: "9.5+ RECOVERY GPA (8.5+ CGPA)",
//       detail: "B.Tech CSE // Manipal Univ. Jaipur",
//       icon: GraduationCap,
//     },
//     {
//       label: "COMMERCIAL VEHICLE",
//       value: "DEVSORA ROBOTICS",
//       detail: "Autonomous Defense & Industrial Tech",
//       icon: Layers,
//     },
//   ];

  return (
    <div className="w-full h-full min-h-screen bg-[#000000] relative z-20 px-6 sm:px-12 md:px-16 lg:px-20 pt-20 sm:pt-24 md:pt-28 pb-8 font-mono select-none flex flex-col justify-between border-y border-[#27272A] overflow-hidden">

      {/* TOP SECTION: Expanded Image Box + Telemetry Grid (Fills Remaining Height) */}
      <div className="w-full flex-1 flex flex-col justify-center pb-6">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Enlarged Portrait Box & Download Action */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col items-center justify-center">
            <div className="relative w-full aspect-square max-w-115 sm:max-w-120 md:max-w-120 lg:max-w-150 border border-[#27272A] bg-[#0A0A0C] overflow-hidden group shadow-2xl">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('/hb.png')",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-25"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(0,255,157,0.15) 1px, transparent 1px)",
                  backgroundSize: "100% 4px",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-[#000000] to-transparent flex items-center justify-between text-[11px]">
                <span className="text-[#00FF9D] font-bold">HITEN BALARA</span>
                <span className="text-[#00FF9D]">[ JAIPUR ]</span>
              </div>
            </div>

            <a
              href="/Augustus_CV.pdf"
              download="Augustus_Robotics_CV.pdf"
              className="mt-4 w-full max-w-[320px] sm:max-w-90 md:max-w-95 lg:max-w-100 py-3 px-4 border border-[#00FF9D]/40 bg-[#00FF9D]/5 text-[#FFFFFF] hover:bg-[#00FF9D] hover:text-[#000000] hover:border-[#00FF9D] transition-all flex items-center justify-center gap-2.5 text-xs tracking-wider uppercase font-bold group"
            >
              <FileDown className="w-4 h-4 text-[#00FF9D] group-hover:text-[#000000] transition-colors" />
              <span>[ DOWNLOAD CV ]</span>
            </a>
          </div>

          {/* Right Column: Title, Narrative & Expanded 6-Card Matrix */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-between h-full py-2">
            <div>
              <div className="flex items-center gap-2 text-[#00FF9D] text-xs sm:text-sm uppercase tracking-tactical mb-2">
                <span>ROBOTICS R&amp;D ENGINEER || BUILDER || FOUNDER</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FFFFFF] font-sans tracking-tight uppercase mb-4">
                HITEN BALARA (AUGUSTUS H.)
              </h2>

              <p className="font-sans text-sm sm:text-base md:text-lg text-[#D4D4D8] leading-relaxed mb-6 font-normal">
                I build intelligent machines from the hardware up - combining robotics, embedded systems, computer vision, real-time software, and mechanical engineering into complete autonomous systems.
              </p>
              <p className="font-sans text-sm sm:text-base md:text-lg text-[#D4D4D8] leading-relaxed mb-6 font-normal">
                My work spans custom robotic actuators, embedded perception, robotic manipulation, edge AI, and the software infrastructure that connects them. I am particularly interested in building systems where mechanical design, electronics, firmware, and intelligence are engineered as one machine.
              </p>
              <p className="font-sans text-sm sm:text-base md:text-lg text-[#D4D4D8] leading-relaxed mb-6 font-normal">
              <span className="text-[#FFFFFF] font-semibold">Currently building:  </span> 
                DevSora Robotics - an independent deep-tech venture focused on open robotics, autonomous systems, and intelligent machines.
              </p>
            </div>

            {/* Expanded 6-Card Telemetry Matrix */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 my-2">
              {telemetryMetrics.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-3.5 sm:p-4 border border-[#27272A] bg-[#050505] hover:border-[#00FF9D]/60 transition-colors flex flex-col justify-between min-h-21.25 sm:min-h-23.75"
                  >
                    <div className="flex items-center justify-between text-[10px] text-[#71717A] mb-1">
                      <span>{item.label}</span>
                      <Icon className="w-4 h-4 text-[#00FF9D]" />
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#FFFFFF] tracking-tight">
                      {item.value}
                    </div>
                    <div className="text-[10px] text-[#71717A] mt-1 truncate">
                      {item.detail}
                    </div>
                  </div>
                );
              })}
            </div> */}
          </div>

        </div>
      </div>

      {/* BOTTOM SECTION: 2 Wide Parallel Research Columns */}
      <div className="w-full pt-4 border-t border-[#27272A]">
        <div className="text-xs text-[#00FF9D] tracking-tactical uppercase mb-3">

        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs sm:text-sm text-[#D4D4D8] leading-relaxed">
          
          {/* Column 1: Hardware & Physical Actuation */}
          <div className="p-4 sm:p-5 border border-[#27272A] bg-[#050505]/90 flex flex-col justify-between">
            <div>
              <div className="font-mono text-1xl text-[#00E5FF] tracking-wider uppercase mb-2">
                01 // PHYSICAL MECHATRONICS &amp; ACTUATOR ENGINEERING
              </div>
              <p className="mb-3">
                BUILDING THE MACHINE FROM FIRST PRINCIPLES.
              </p>
              <p className="mb-2">
                Most robotics systems are built around commercially available motors, gearboxes, drivers, and mechanical components, which often means the robot itself has to adapt to the limitations of its hardware. My approach is different. I design the mechanical and electromechanical architecture around what the machine actually needs, developing custom actuator systems, transmission mechanisms, motor electronics, structural components, and control systems whenever conventional hardware becomes the limiting factor.
              </p>
              <p className="mb-2">
                My work spans the complete physical development cycle, from mechanical concept and CAD through fabrication, electronics, embedded firmware, and closed-loop motion control. I work with high-torque BLDC actuator architectures, compact robotic joints, geared and harmonic-drive transmissions, custom motor-control electronics, CNC-machined and additively manufactured components, structural optimization, sensor integration, and real-time control of position, velocity, and torque.
              </p>
              <p className="mb-2">
                The objective is not to reinvent every component simply for the sake of doing so. It is to understand where the existing technology becomes the bottleneck, and then engineer beyond that limitation. I treat the actuator, transmission, electronics, firmware, and mechanical structure as parts of the same system rather than isolated components, allowing the entire machine to be optimized for torque density, efficiency, precision, thermal performance, reliability, and manufacturability.
              </p>
            </div>

            {/* <div className="mt-3 pt-2 border-t border-[#27272A] font-mono text-[10px] text-[#71717A] flex items-center justify-between">
              <span>FOCUS: TORQUE DENSITY &amp; HARMONIC DRIVES</span>
              <span className="text-[#00FF9D]">CAD READY</span>
            </div> */}
          </div>

          {/* Column 2: Perception, Intelligence & Ecosystem */}
          <div className="p-4 sm:p-5 border border-[#27272A] bg-[#050505]/90 flex flex-col justify-between">
            <div>
              <div className="font-mono text-1xl text-[#00FF9D] tracking-wider uppercase mb-2">
                02 // EMBEDDED INTELLIGENCE &amp; ROBOTICS SOFTWARE
              </div>
              <p className="mb-2">
                GIVING HARDWARE THE ABILITY TO SEE, THINK & ACT.
              </p>
              <p className="mb-2">
                A capable robot is more than a collection of motors, sensors, and processors. The real challenge is connecting those components into a system that can perceive its environment, understand what is happening, make decisions, and act reliably in the physical world. I build the software and embedded intelligence layer that makes that possible.
              </p>
              <p className="mb-2">
                My work combines computer vision, sensor fusion, robotics middleware, edge computing, perception, planning, and real-time control into unified robotic systems. I build around technologies such as OpenCV, ROS 2, C++, Python, NVIDIA Jetson, CUDA, PyTorch, LiDAR, depth cameras, IMUs, and other embedded sensors, with an emphasis on keeping critical computation close to the machine rather than relying entirely on cloud infrastructure.
              </p>
              <p className="mb-2">
                The software architecture is designed to connect perception with action. Cameras and depth sensors provide environmental understanding, LiDAR and IMUs contribute spatial awareness, embedded systems handle real-time interaction with hardware, and higher-level intelligence turns that information into useful decisions. The result is a robotics stack in which sensing, computation, planning, and physical control operate as parts of one coherent system.
              </p>
              <p className="mb-2">
                This philosophy is reflected in projects such as RIO, where computer vision, object understanding, robotic manipulation, voice interaction, workspace awareness, and local AI come together to create an open robotic platform capable of interacting with the physical environment rather than simply processing information on a screen.
              </p>
            </div>

            {/* <div className="mt-3 pt-2 border-t border-[#27272A] font-mono text-[10px] text-[#71717A] flex items-center justify-between">
              <span>FRAMEWORK: RIO OS &amp; OPENCV MATRIX</span>
              <span className="text-[#00E5FF]">RTOS SYNC</span>
            </div> */}
          </div>

        </div>
      </div>

      {/* FOOTER ACTION BAR */}
      <div className="mt-4 pt-3 border-t border-[#27272A] flex flex-wrap items-right text-xs text-[#71717A] gap-4 font-mono">
        {/* <div className="flex flex-wrap items-center gap-4">
          <Link
            href="#execution-log"
            className="text-[#FFFFFF] hover:text-[#00FF9D] transition-colors flex items-center gap-1.5"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#00FF9D]" />
            <span>LIVE GITHUB &amp; WORKSHOP LOG</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A]" />
          </Link>
          <span>/</span>
          <Link
            href="https://docs.byaugustus.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFFFFF] hover:text-[#00E5FF] transition-colors flex items-center gap-1.5"
          >
            <span>RIO DOCS (docs.byaugustus.com) ↗</span>
          </Link>
          <span>/</span>
          <Link
            href="https://devsora.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFFFFF] hover:text-[#00FF9D] transition-colors flex items-center gap-1.5"
          >
            <span>DEVSORA ENTERPRISE (devsora.com) ↗</span>
          </Link>
        </div> */}

        <div className="flex items-right gap-3">
          <span className="text-[#71717A]">ECOSYSTEM:</span>
          <span className="text-[#00FF9D]">[BY AUGUSTUS // 2026]</span>
        </div>
      </div>

    </div>
  );
}