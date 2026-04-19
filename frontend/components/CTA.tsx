"use client";

import Link from "next/link";

const CTA = () => {
  return (
    <section className="mt-28 px-6">
      {" "}
      <div
        className="max-w-4xl mx-auto text-center p-10 rounded-2xl
     bg-gradient-to-r from-emerald-500/10 to-teal-500/10
     border border-white/10"
      >
        {/* Heading */}{" "}
        <h2 className="text-3xl md:text-4xl font-semibold">
          Never Miss Your Next Big Opportunity 🚀{" "}
        </h2>
        <p className="mt-4 text-gray-400">
          Fuel your growth with the right opportunities
        </p>
        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          {/* Primary */}
          <Link
            href="/events"
            className="px-8 py-3 rounded-full font-medium text-white
        bg-gradient-to-r from-emerald-400 to-teal-500
        hover:scale-105 transition-all duration-300
        shadow-lg shadow-emerald-500/20"
          >
            Explore Events
          </Link>

          {/* Secondary */}
          <Link
            href="/register"
            className="px-8 py-3 rounded-full font-medium text-white
        border border-white/20 bg-white/5
        hover:bg-white/10 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
