"use client";

import Image from "next/image";
import { Bell, BarChart3, Bookmark, Pencil } from "lucide-react";
import PixelCard from "./ui/PixelCard";

const features = [
  {
    title: "Smart Alerts",
    desc: "Get notified about new events and never miss deadlines",
    icon: Bell,
    image: "/images/feature_alerts.png",
  },
  {
    title: "Analytics",
    desc: "Track your activity and event participation insights",
    icon: BarChart3,
    image: "/images/feature_analytics.png",
  },
  {
    title: "Bookmark Events",
    desc: "Save events and revisit them anytime easily",
    icon: Bookmark,
    image: "/images/feature_bookmark.png",
  },
  {
    title: "LinkedIn Generator",
    desc: "Generate ready-to-post LinkedIn content instantly",
    icon: Pencil,
    image: "/images/feature_linkedin.png",
  },
];

const Features = () => {
  return (
    <section className="mt-24 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold">Top Features</h2>
      <p className="mt-3 text-gray-400">
        Everything you need to grow, track, and showcase your journey
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <PixelCard
              key={index}
              variant="default"
              className="text-left"
            >
              <div>
                {/* Image at the top */}
                <div className="relative w-full h-36 overflow-hidden rounded-t-sm">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Content below */}
                <div className="p-5">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-emerald-500/10 mb-3">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="mt-1.5 text-sm text-gray-400">{feature.desc}</p>
                </div>
              </div>
            </PixelCard>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
