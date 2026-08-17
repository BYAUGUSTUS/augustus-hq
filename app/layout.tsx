// filepath: app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BY~AUGUSTUS",
  description:
    "Autonomous deep-tech research installation. Engineering custom high-torque actuators, embedded vision pipelines, and physical robotic systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} w-screen h-screen bg-[#000000] text-[#FFFFFF] font-sans antialiased relative overflow-hidden`}
      >

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Global Fixed Background Layers */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 tactical-ambient-gradient" />
          <div className="absolute inset-0 tactical-green-grid" />
          <div className="absolute inset-0 tactical-major-grid" />
          <div className="absolute inset-0 tactical-noise-overlay opacity-50" />
        </div>

        {/* Tactical Fixed Header */}
        <Navbar />

        {/* Main Content Area */}
        <main className="w-full h-full relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}