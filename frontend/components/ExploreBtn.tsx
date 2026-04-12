"use client";

const ExploreBtn = () => {
  return (
    <div className="mt-12 flex gap-6 justify-center items-center flex-wrap">
      {/* Explore Events Button */}
      <button
        type="button"
        className="relative px-10 py-4 rounded-full font-semibold text-lg text-white border-2 border-cyan-400 bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105 transition-all duration-300 ease-out overflow-hidden group"
        onClick={() => console.log("EXPLORE")}
      >
        <span className="relative z-10 flex items-center gap-2">
          Explore Events
          <span className="inline-block group-hover:translate-y-0.5 transition-transform">
            ↓
          </span>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </button>

      {/* Get Started Button */}
      <button
        type="button"
        className="relative px-10 py-4 rounded-full font-semibold text-lg text-white border-2 border-amber-600 bg-gradient-to-r from-amber-700 to-amber-600 hover:shadow-[0_0_30px_rgba(217,119,6,0.6)] hover:scale-105 transition-all duration-300 ease-out overflow-hidden group"
        onClick={() => console.log("GET_STARTED")}
      >
        <span className="relative z-10 flex items-center gap-2">
          Get Started
          <span className="inline-block group-hover:translate-x-1 transition-transform">
            ›
          </span>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </button>
    </div>
  );
};

export default ExploreBtn;
