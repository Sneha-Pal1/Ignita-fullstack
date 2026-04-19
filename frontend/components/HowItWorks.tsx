"use client";

import { Search, Bookmark, Share2 } from "lucide-react";

const steps = [
  {
    title: "Discover",
    desc: "Browse through thousands of student events, hackathons, and opportunities",
    icon: Search,
  },
  {
    title: "Save",
    desc: "Bookmark events you're interested in and set personalized alerts",
    icon: Bookmark,
  },
  {
    title: "Share",
    desc: "Generate LinkedIn posts to share your achievements and participation",
    icon: Share2,
  },
];

const HowItWorks = () => {
  return (
    <section className="mt-24 text-center px-6">
      {/* Heading */}{" "}
      <h2 className="text-3xl md:text-4xl font-semibold">How It Works </h2>
      <p className="mt-3 text-gray-400">
        Three simple steps to never miss another student event
      </p>
      {/* Steps */}
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-500/10 mb-5 group-hover:scale-110 transition">
                <Icon className="w-7 h-7 text-emerald-400" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium">{step.title}</h3>

              {/* Description */}
              <p className="mt-2 text-gray-400 text-sm max-w-xs">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
