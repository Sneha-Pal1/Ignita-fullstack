"use client";

import { Bell, BarChart3, Bookmark, Pencil } from "lucide-react";
import PixelCard from "./ui/PixelCard";

const features = [
  {
    title: "Smart Alerts",
    desc: "Get notified about new events and never miss deadlines",
    icon: Bell,
  },
  {
    title: "Analytics",
    desc: "Track your activity and event participation insights",
    icon: BarChart3,
  },
  {
    title: "Bookmark Events",
    desc: "Save events and revisit them anytime easily",
    icon: Bookmark,
  },
  {
    title: "LinkedIn Generator",
    desc: "Generate ready-to-post LinkedIn content instantly",
    icon: Pencil,
  },
];

const Features = () => {
  return (
    <section className="mt-24 px-6 text-center">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold">Top Features </h2>

      <p className="mt-3 text-gray-400">
        Everything you need to grow, track, and showcase your journey
      </p>

      {/* Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <PixelCard
              key={index}
              variant={["blue", "yellow", "pink", "default"][index % 4] as any}
              className="text-left"
            >
              <div className="p-6">
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-emerald-500/10 mb-4 group-hover:scale-110 transition">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-medium">{feature.title}</h3>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-400">{feature.desc}</p>
              </div>
            </PixelCard>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
