"use client";

import { Search, Bookmark, Share2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover",
    desc: "Browse through thousands of student events, hackathons, and opportunities",
    icon: Search,
  },
  {
    number: "02",
    title: "Save",
    desc: "Bookmark events you're interested in and set personalized alerts",
    icon: Bookmark,
  },
  {
    number: "03",
    title: "Share",
    desc: "Generate LinkedIn posts to share your achievements and participation",
    icon: Share2,
  },
];

const HowItWorks = () => {
  return (
    <section className="mt-24 px-6">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold">How It Works</h2>
        <p className="mt-3 text-gray-400">
          Three simple steps to never miss another student event
        </p>
      </div>

      {/* Steps */}
      <div className="relative grid md:grid-cols-3 gap-0">

        {/* Connector line — desktop only */}
        <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className="relative flex flex-col items-center text-center px-8 py-2 group"
            >
              {/* Step number + icon stacked */}
              <div className="relative mb-6">
                {/* Large faded number in background */}
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-7xl font-black text-white/[0.04] select-none leading-none pointer-events-none">
                  {step.number}
                </span>

                {/* Icon circle on top */}
                <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/5 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300">
                  <Icon className="w-6 h-6 text-emerald-400" />
                  {/* Step badge */}
                  <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-[#161b22] border border-[#30363d] text-[10px] font-bold text-[#7d8590]">
                    {index + 1}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-[#e6edf3]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-400 max-w-[200px] leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
