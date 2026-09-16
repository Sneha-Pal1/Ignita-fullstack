"use client";

import React from "react";
import Link from "next/link";

export function LevoCTA() {
  return (
    <section className="relative w-full border-b border-white/10 bg-[#0e0e0d] py-28 overflow-hidden">
      {/* Background Amber Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FFB100]/12 blur-[180px] rounded-full" />

      <div className="mx-auto max-w-6xl px-6 sm:px-10 text-center relative z-10">
        
        <div className="levo-eyebrow mb-6 justify-center">
          <span className="h-1.5 w-1.5 bg-[#FFB100]" />
          <span>08 / GET STARTED</span>
        </div>

        {/* Terminal Header */}
        <Link
          href="/register"
          className="inline-block group cursor-pointer"
        >
          <h2 className="font-mono text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white group-hover:text-[#FFB100] transition-colors duration-200">
            &gt; start discovering<span className="inline-block w-4 h-10 sm:h-14 bg-[#FFB100] ml-2 animate-pulse align-middle" />
          </h2>
        </Link>

        <p className="mt-8 text-base sm:text-lg font-normal text-[#8a8a86] max-w-xl mx-auto">
          Create your free account to bookmark events, set customized deadline alerts, and auto-generate LinkedIn achievement posts.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-[#FFB100] text-black font-semibold text-sm tracking-widest px-8 py-4 uppercase transition-all duration-200 hover:bg-[#ffbe25]"
          >
            Create Account
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 border border-white/20 bg-transparent text-white font-medium text-sm tracking-widest px-8 py-4 uppercase transition-all duration-200 hover:border-white/50 hover:bg-white/5"
          >
            Browse All Events
          </Link>
        </div>

        <div className="mt-12 font-mono text-xs text-[#8a8a86]">
          NO CREDIT CARD REQUIRED · INSTANT ACCESS · NO SPAM
        </div>

      </div>
    </section>
  );
}
