"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface LevoCapabilityCardProps {
  id?: string;
  num: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  ctaText: string;
  diagram: React.ReactNode;
}

export function LevoCapabilityCard({
  id,
  num,
  category,
  title,
  description,
  tags,
  href,
  ctaText,
  diagram,
}: LevoCapabilityCardProps) {
  return (
    <section
      id={id}
      className="relative w-full border-b border-white/10 bg-[#0e0e0d] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        
        {/* Top Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-12">
          <div className="levo-eyebrow">
            <span className="h-1.5 w-1.5 bg-[#FFB100]" />
            <span>{num} / {category}</span>
          </div>

          <div className="flex items-center gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="font-mono text-[10px] uppercase tracking-wider text-[#8a8a86] border border-white/10 px-2.5 py-1 rounded-none"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 flex flex-col items-start justify-between h-full">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
                {title}
              </h2>
              <p className="text-base sm:text-lg font-normal leading-relaxed text-[#8a8a86] mb-8">
                {description}
              </p>
            </div>

            <Link
              href={href}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FFB100] group hover:underline"
            >
              <span>{ctaText}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Right Diagram Column */}
          <div className="lg:col-span-7 w-full border border-white/10 p-2 sm:p-4 bg-[#141413] relative overflow-hidden group">
            {/* Subtle amber corner glow */}
            <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 bg-[#FFB100]/10 blur-2xl rounded-full transition-all group-hover:bg-[#FFB100]/20" />
            {diagram}
          </div>

        </div>

      </div>
    </section>
  );
}
