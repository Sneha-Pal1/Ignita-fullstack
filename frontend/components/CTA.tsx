"use client";

import Link from "next/link";
import BlurText from "./BlurText";

const CTA = () => {
  return (
    <section className="relative mt-32 flex items-center justify-center overflow-hidden px-6 py-24">
      {/* CURVED BACKGROUND */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        style={{ height: "300px" }}
      >
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "rgb(16, 185, 129)", stopOpacity: 0.3 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "rgb(16, 185, 129)", stopOpacity: 0 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M 0,80 Q 360,20 720,80 T 1440,80 L 1440,300 L 0,300 Z"
          fill="url(#curveGradient)"
        />
      </svg>

      {/* BACKGROUND GLOW */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-75
    bg-emerald-500/20 blur-3xl rounded-full opacity-40"
      ></div>
      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-2xl">
        <BlurText
          text="Find Your Next Event"
          delay={200}
          animateBy="words"
          direction="top"
          className="text-4xl md:text-5xl font-semibold"
          animationFrom={undefined}
          animationTo={undefined}
          onAnimationComplete={undefined}
        />

        <BlurText
          text="Fuel your growth with the right opportunities"
          delay={400}
          animateBy="words"
          direction="top"
          className="mt-4 text-gray-400"
          animationFrom={undefined}
          animationTo={undefined}
          onAnimationComplete={undefined}
        />

        <div className="mt-8 flex justify-center">
          <Link
            href="/register"
            className="px-8 py-3 rounded-full font-medium text-black
        bg-white hover:bg-gray-200 transition shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
