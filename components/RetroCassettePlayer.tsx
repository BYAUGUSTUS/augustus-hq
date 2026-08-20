// filepath: components/RetroCassettePlayer.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  ChevronDown, 
  ChevronUp,
  Radio
} from "lucide-react";

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  nextVideo: () => void;
  previousVideo: () => void;
  mute: () => void;
  unMute: () => void;
  destroy?: () => void;
  getVideoData: () => { title?: string };
}

interface YTPlayerEvent {
  data: number;
  target: YTPlayer;
}

interface YTNamespace {
  Player: new (
    element: HTMLElement | string,
    config: {
      height: string | number;
      width: string | number;
      playerVars?: Record<string, string | number | undefined>;
      events?: {
        onReady?: (event: YTPlayerEvent) => void;
        onStateChange?: (event: YTPlayerEvent) => void;
        onError?: (event: { data: number }) => void;
      };
    }
  ) => YTPlayer;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: YTNamespace;
  }
}

const DEFAULT_PLAYLIST_ID = "PLUyaXCb44XcQ";
const BAR_COUNT = 14;

export default function RetroCassettePlayer() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [trackTitle, setTrackTitle] = useState<string>("TAPE LOADED // CLICK PLAY");
  const [isFooterVisible, setIsFooterVisible] = useState<boolean>(false);
  const [vuLevels, setVuLevels] = useState<number[]>(() => Array(BAR_COUNT).fill(8));

  const playerRef = useRef<YTPlayer | null>(null);
  const ytMountRef = useRef<HTMLDivElement>(null);

  // 1. Safe YouTube initialization with isolated imperative DOM node
  useEffect(() => {
    let isMounted = true;
    let playerInstance: YTPlayer | null = null;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player || !ytMountRef.current || !isMounted) return;

      const hostNode = document.createElement("div");
      ytMountRef.current.innerHTML = "";
      ytMountRef.current.appendChild(hostNode);

      playerInstance = new window.YT.Player(hostNode, {
        height: 200,
        width: 200,
        playerVars: {
          listType: "playlist",
          list: DEFAULT_PLAYLIST_ID,
          autoplay: 0,
          controls: 0,
          enablejsapi: 1,
          origin: typeof window !== "undefined" ? window.location.origin : undefined,
        },
        events: {
          onReady: () => {
            if (!isMounted) return;
            setTrackTitle("CASSETTE DECK // READY");
          },
          onStateChange: (event: YTPlayerEvent) => {
            if (!isMounted) return;
            if (event.data === 1) {
              setIsPlaying(true);
              const data = playerInstance?.getVideoData();
              if (data?.title) {
                setTrackTitle(data.title.toUpperCase());
              }
            } else if (event.data === 2) {
              setIsPlaying(false);
            }
          },
          onError: () => {
            if (!isMounted) return;
            setTrackTitle("TAPE SKIPPED // CLICK NEXT");
          },
        },
      });
      playerRef.current = playerInstance;
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    return () => {
      isMounted = false;
      if (playerInstance && typeof playerInstance.destroy === "function") {
        try {
          playerInstance.destroy();
        } catch {
          // ignore cleanup
        }
      }
    };
  }, []);

  // 2. VU Meter Jitter when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setVuLevels(
        Array.from({ length: BAR_COUNT }, () => Math.floor(Math.random() * 75) + 20)
      );
    }, 180);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // 3. Dock above footer when footer is in view
  useEffect(() => {
    const footerElement = document.querySelector(".snap-footer") || document.querySelector("footer");
    if (!footerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footerElement);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    if (playerRef.current?.nextVideo) {
      playerRef.current.nextVideo();
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    if (playerRef.current?.previousVideo) {
      playerRef.current.previousVideo();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const activeVu = isPlaying ? vuLevels : Array(BAR_COUNT).fill(6);

  return (
    <>
      {/* Hidden YouTube iframe host */}
      <div 
        ref={ytMountRef}
        className="fixed -top-[9999px] -left-[9999px] w-1 h-1 pointer-events-none opacity-0 overflow-hidden" 
      />

      {/* Main Full-Width Floating Container */}
      <div
        className={`fixed left-0 right-0 z-50 transition-all duration-300 w-full px-3 sm:px-8 pointer-events-none select-none font-mono ${
          isFooterVisible ? "bottom-24" : "bottom-2 sm:bottom-3"
        }`}
      >
        <AnimatePresence mode="wait">
          {/* Collapsed State Toggle Pill */}
          {!isOpen && (
            <motion.div 
              key="collapsed-pill"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="max-w-6xl mx-auto flex justify-center pointer-events-auto"
            >
              <button
                onClick={() => setIsOpen(true)}
                className="px-3 py-1 bg-[#09090b]/90 backdrop-blur-md border border-[#3F3F46]/50 text-[10px] text-[#A1A1AA] hover:text-[#C8A27A] uppercase flex items-center gap-1.5 transition-colors cursor-pointer rounded-full shadow-lg"
              >
                <Radio className="w-3 h-3 text-[#C8A27A]" />
                <span>CASSETTE DECK // {isPlaying ? "PLAYING" : "STANDBY"}</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}

          {/* Expanded Cassette Deck */}
          {isOpen && (
            <motion.div
              key="expanded-deck"
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-6xl mx-auto flex flex-col items-center pointer-events-auto"
            >
              
              {/* Centered Toggle Tab Directly Above Cassette */}
              <div className="w-full flex justify-center mb-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 bg-[#09090b]/80 backdrop-blur-md text-[10px] text-[#A1A1AA] hover:text-[#C8A27A] uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Radio className="w-3 h-3 text-[#C8A27A]" />
                  <span>CASSETTE DECK // {isPlaying ? "PLAYING" : "STANDBY"}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Middle Row: Left Visualizer + Realistic Camel Cassette + Right Visualizer */}
              <div className="w-full flex items-center justify-between gap-3 sm:gap-6">
                
                {/* Left Audio Visualizer */}
                <div className="flex-1 flex items-center justify-end gap-1 sm:gap-1.5 h-16 sm:h-20 opacity-70">
                  {activeVu.map((lvl, idx) => {
                    const edgeFactor = 0.5 + ((BAR_COUNT - idx) / BAR_COUNT) * 0.7;
                    const finalHeight = Math.min(100, lvl * edgeFactor);
                    return (
                      <div
                        key={`left-bar-${idx}`}
                        className="w-1 sm:w-1.5 bg-[#52525B] rounded-full transition-all duration-150 ease-out"
                        style={{ height: `${finalHeight}%` }}
                      />
                    );
                  })}
                </div>

                {/* Realistic Camel Vintage Cassette Body */}
                <div className="w-[280px] sm:w-[360px] h-[135px] sm:h-[155px] bg-[#C8A27A] rounded-xl p-2 sm:p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] relative flex flex-col justify-between overflow-hidden border-t border-[#DFBA94]/60 border-b border-[#9C7550] shrink-0">
                  
                  {/* 4 Corner Screws */}
                  <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-[#8A6743] border border-[#5E4024] flex items-center justify-center">
                    <div className="w-1.5 h-[1px] bg-[#3B2816]" />
                  </div>
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8A6743] border border-[#5E4024] flex items-center justify-center">
                    <div className="w-1.5 h-[1px] bg-[#3B2816]" />
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full bg-[#8A6743] border border-[#5E4024] flex items-center justify-center">
                    <div className="w-1.5 h-[1px] bg-[#3B2816]" />
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8A6743] border border-[#5E4024] flex items-center justify-center">
                    <div className="w-1.5 h-[1px] bg-[#3B2816]" />
                  </div>

                  {/* Cassette Label Header */}
                  <div className="bg-[#EFE6D5] rounded-t-sm px-2 py-1 flex items-center justify-between border-b-2 border-[#D4713B] shadow-inner">
                    <div className="text-[10px] sm:text-[11px] font-bold text-[#1C1917] tracking-wider truncate uppercase w-full">
                      {trackTitle}
                    </div>
                  </div>

                  {/* Center Cassette Well Window & Tape Spools */}
                  <div className="bg-[#1C1917] rounded-md p-1.5 my-auto mx-1 flex items-center justify-between relative border border-[#141210] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
                    
                    {/* Left Cog Reel */}
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F5F5F4] border-2 border-[#A8A29E] flex items-center justify-center shadow-md ${isPlaying ? "animate-spin" : ""}`}>
                      <div className="w-4 h-4 rounded-full bg-[#1C1917] border-2 border-dashed border-[#78716C]" />
                    </div>

                    {/* Tape Window with Magnetic Ribbon */}
                    <div className="flex-1 mx-2 h-6 sm:h-7 bg-[#292524]/90 rounded-sm border border-[#44403C] relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-x-2 h-2.5 bg-[#451A03]/80 rounded-xs" />
                      <div className="z-10 text-[8px] text-[#A8A29E] font-bold tracking-widest opacity-60">
                        ||||||||||||
                      </div>
                    </div>

                    {/* Right Cog Reel */}
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F5F5F4] border-2 border-[#A8A29E] flex items-center justify-center shadow-md ${isPlaying ? "animate-spin" : ""}`}>
                      <div className="w-4 h-4 rounded-full bg-[#1C1917] border-2 border-dashed border-[#78716C]" />
                    </div>
                  </div>

                  {/* Bottom Trapezoid Cutout Detail */}
                  <div className="w-24 sm:w-28 h-2.5 bg-[#9C7550] mx-auto rounded-t-sm" />
                </div>

                {/* Right Audio Visualizer */}
                <div className="flex-1 flex items-center justify-start gap-1 sm:gap-1.5 h-16 sm:h-20 opacity-70">
                  {activeVu.map((lvl, idx) => {
                    const edgeFactor = 0.5 + (idx / BAR_COUNT) * 0.7;
                    const finalHeight = Math.min(100, lvl * edgeFactor);
                    return (
                      <div
                        key={`right-bar-${idx}`}
                        className="w-1 sm:w-1.5 bg-[#52525B] rounded-full transition-all duration-150 ease-out"
                        style={{ height: `${finalHeight}%` }}
                      />
                    );
                  })}
                </div>

              </div>

              {/* Bottom Control Bar: Symmetrical Playback Cluster (Centered to Cassette) + Floating Volume to the Right */}
              <div className="w-[280px] sm:w-[360px] relative flex items-center justify-center mt-2.5">
                
                {/* Center 3-Button Transport Group (Dead centered with Play/Pause in middle) */}
                <div className="flex items-center justify-center gap-7 sm:gap-9">
                  <button
                    onClick={prevTrack}
                    className="text-[#71717A] hover:text-[#FFFFFF] transition-all transform hover:scale-110 active:scale-95 cursor-pointer flex items-center"
                    title="Previous Track"
                  >
                    <SkipBack className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="text-[#FFFFFF] hover:text-[#C8A27A] transition-all transform hover:scale-115 active:scale-95 cursor-pointer flex items-center"
                    title="Play / Pause"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-[#C8A27A]" />
                    ) : (
                      <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </button>

                  <button
                    onClick={nextTrack}
                    className="text-[#71717A] hover:text-[#FFFFFF] transition-all transform hover:scale-110 active:scale-95 cursor-pointer flex items-center"
                    title="Next Track"
                  >
                    <SkipForward className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </button>
                </div>

                {/* Right-aligned Volume/Mute Button (Floated to the right cursor slot) */}
                <div className="absolute right-0 flex items-center">
                  <button
                    onClick={toggleMute}
                    className="text-[#71717A] hover:text-[#FFFFFF] transition-all transform hover:scale-110 active:scale-95 cursor-pointer flex items-center p-1 rounded-sm"
                    title="Mute / Unmute"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#FF3B30]" />
                    ) : (
                      <Volume2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#A1A1AA] hover:text-[#FFFFFF]" />
                    )}
                  </button>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}