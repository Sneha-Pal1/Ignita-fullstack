"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export function LevoHero() {
  return (
    <section className="relative w-full border-b border-white/10 pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background radial amber glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FFB100]/10 blur-[140px] rounded-full" />

      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFB100]/30 bg-[#FFB100]/5 px-3.5 py-1.5 text-xs font-mono tracking-widest text-[#FFB100]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFB100] animate-pulse" />
          <span>IGNITA / STUDENT & DEVELOPER ENGINE</span>
        </div>

        {/* Main Title */}
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl leading-[1.02] mb-8">
          Every hackathon. <br />
          Every deadline. <br />
          <span className="text-[#FFB100]">One place.</span>
        </h1>

        {/* Subtitle / Lede */}
        <p className="max-w-2xl text-lg sm:text-xl font-normal leading-relaxed text-[#8a8a86] mb-10">
          Ignita indexes hackathons, software engineering internships, competitive programming contests, and tech workshops across the globe into a real-time, unified dashboard.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-16">
          <Link
            href="/events"
            className="inline-flex items-center gap-3 bg-[#FFB100] text-black font-semibold text-sm tracking-wide px-8 py-4 uppercase transition-all duration-200 hover:bg-[#ffbe25] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Discovering</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#philosophy"
            className="inline-flex items-center gap-2 border border-white/20 bg-transparent text-white font-medium text-sm tracking-wide px-7 py-4 uppercase transition-all duration-200 hover:border-white/50 hover:bg-white/5"
          >
            <span>See How It Works</span>
            <ChevronDown className="w-4 h-4 text-[#8a8a86]" />
          </a>
        </div>

        {/* Levo-style Footer Meta Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8a8a86]">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-white font-semibold uppercase">● HACKATHONS</span>
            <span>·</span>
            <span className="text-white font-semibold uppercase">● INTERNSHIPS</span>
            <span>·</span>
            <span className="text-white font-semibold uppercase">● CONTESTS</span>
            <span>·</span>
            <span className="text-white font-semibold uppercase">● WORKSHOPS</span>
          </div>
          <div className="flex items-center gap-2 text-[#FFB100]">
            <span className="uppercase text-[10px] tracking-widest">SCROLL TO EXPLORE</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
