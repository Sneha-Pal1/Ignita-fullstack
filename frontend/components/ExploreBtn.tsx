"use client";

const ExploreBtn = () => {
  return (
    <div className="mt-12 flex gap-6 justify-center items-center flex-wrap">
      {/* Explore Events Button */}
      <button
        type="button"
        className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
        onClick={() => console.log("EXPLORE")}
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
          <span className="flex items-center gap-2">
            Explore Events
            <svg
              fill="none"
              height="30"
              viewBox="0 0 24 24"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 8.75L14.25 12L10.75 15.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </span>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-sky-400/0 via-sky-400/90 to-sky-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </button>

      {/* Get Started Button */}
      <button
        type="button"
        className="px-8 py-2 rounded-full relative bg-emerald-950 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600"
        onClick={() => console.log("GET_STARTED")}
      >
        <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-800 to-transparent" />
        <span className="relative z-20">Get Started</span>
      </button>
    </div>
  );
};

export default ExploreBtn;
