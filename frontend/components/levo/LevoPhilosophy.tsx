"use client";

import React, { useEffect, useRef, useState } from "react";

const PHILOSOPHY_TEXT = 
  "Opportunities are everywhere. Finding the right ones shouldn't be. Hackathons, internships, contests, and workshops are scattered across countless platforms. Ignita brings them together, so you can spend less time searching and more time building.";

// Highlight key words in amber like Levo Studio
const AMBER_WORDS = new Set(["everywhere.", "scattered", "together,", "building."]);

export function LevoPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = rect.height - windowHeight;
      if (totalScroll <= 0) return;
      
      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, currentScroll / totalScroll));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const words = PHILOSOPHY_TEXT.split(" ");
  const totalWords = words.length;

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative min-h-[160vh] w-full border-b border-white/10 bg-[#0e0e0d]"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden pt-16">
        {/* Background Radial Amber Glow */}
        <div className="pointer-events-none absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FFB100]/8 blur-[160px] rounded-full" />

        <div className="mx-auto max-w-6xl px-6 sm:px-10 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Eyebrow & Pinbar Column (Left 4 cols) */}
          <div className="md:col-span-4 flex md:flex-col justify-between items-start h-full py-4 border-r border-white/10 pr-6">
            <div className="levo-eyebrow">
              <span className="h-1.5 w-1.5 bg-[#FFB100]" />
              <span>02 / PHILOSOPHY</span>
            </div>

            {/* Vertical Pin Bar indicator */}
            <div className="hidden md:flex flex-col items-center gap-3 my-auto py-8">
              <div className="h-32 w-[2px] bg-white/10 relative overflow-hidden">
                <div
                  className="w-full bg-[#FFB100] transition-all duration-75"
                  style={{ height: `${scrollProgress * 100}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-[#FFB100]">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>

            <div className="font-mono text-[11px] text-[#8a8a86] uppercase tracking-wider">
              ENGINE ARCHITECTURE
            </div>
          </div>

          {/* Text Crawl Display (Right 8 cols ~ 60% width) */}
          <div className="md:col-span-8 pl-0 md:pl-6 max-w-3xl">
            <p 
              className="font-sans font-semibold tracking-[-0.02em] leading-[1.4]"
              style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                fontSize: "clamp(26px, 3.6vw, 44px)",
                WebkitFontSmoothing: "antialiased",
                textRendering: "optimizeLegibility",
              }}
            >
              {words.map((word, idx) => {
                // Map scroll progress so reveal completes at scrollProgress = 0.85
                const revealEnd = 0.85;
                const normalizedProgress = Math.min(1, Math.max(0, scrollProgress / revealEnd));

                const targetStart = idx / Math.max(1, totalWords - 1);
                const windowSize = 0.05;
                const rawW = (normalizedProgress - (targetStart - windowSize)) / (2 * windowSize);
                const w = Math.min(1, Math.max(0, rawW));

                // Interpolate blur and opacity
                const blur = (1 - w) * 10;
                const opacity = 0.05 + w * 0.95;
                const isAmber = AMBER_WORDS.has(word);

                return (
                  <span
                    key={idx}
                    style={{
                      filter: blur > 0.1 ? `blur(${blur.toFixed(2)}px)` : "none",
                      opacity: opacity.toFixed(3),
                      color: isAmber ? "#FFB100" : "#ffffff",
                      fontFamily: "var(--font-geist-sans), sans-serif",
                      fontWeight: 600,
                      willChange: "filter, opacity",
                      transition: "filter 0.1s linear, opacity 0.1s linear",
                    }}
                    className="inline-block mr-[0.28em]"
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
