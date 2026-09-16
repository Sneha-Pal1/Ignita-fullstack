"use client";

import React from "react";
import { Bell, Bookmark, LineChart, Share2, Sparkles, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: Bell,
    title: "Deadline Alerts",
    description: "Recieve instant email and push notifications 48h, 24h, and 2h before registration closes.",
    tag: "ALERT ENGINE",
  },
  {
    icon: Bookmark,
    title: "Smart Bookmarks",
    description: "Organize events into custom folders and sync application statuses across your devices.",
    tag: "SYNC",
  },
  {
    icon: LineChart,
    title: "Analytics Dashboard",
    description: "Track your hackathon participation, win rates, and application pipeline with live graphs.",
    tag: "INSIGHTS",
  },
  {
    icon: Share2,
    title: "LinkedIn Post Generator",
    description: "Auto-generate sleek, engaging LinkedIn posts summarizing your hackathon achievements in one click.",
    tag: "AI TOOL",
  },
];

export function LevoFeaturesGrid() {
  return (
    <section className="relative w-full border-b border-white/10 bg-[#0e0e0d] py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-12">
          <div className="levo-eyebrow">
            <span className="h-1.5 w-1.5 bg-[#FFB100]" />
            <span>07 / CORE CAPABILITIES</span>
          </div>

          <div className="font-mono text-xs text-[#8a8a86]">
            BUILT FOR AGILITY
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative border border-white/10 bg-[#141413] p-6 transition-all duration-200 hover:border-[#FFB100]/50 hover:bg-[#181816]"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-[#1a1a18] text-[#FFB100] group-hover:border-[#FFB100]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#8a8a86]">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FFB100] transition-colors">
                  {feat.title}
                </h3>

                <p className="text-xs leading-relaxed text-[#8a8a86]">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
