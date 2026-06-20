"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/auth-context";
import { ShinyButton } from "@/components/ui/shiny-button";

const ExploreBtn = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push("/Dashboard");
    } else {
      router.push("/register");
    }
  };

  return (
    <div className="mt-12 flex gap-6 justify-center items-center flex-wrap">
      {/* Explore Events Button */}
      <Link
        href="/events"
        className="px-8 py-2 rounded-md text-white font-bold transition duration-200 border-2 border-transparent"
        style={{
          backgroundColor: "#123e2e",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "white";
          e.currentTarget.style.color = "#123e2e";
          e.currentTarget.style.borderColor = "#123e2e";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#123e2e";
          e.currentTarget.style.color = "white";
          e.currentTarget.style.borderColor = "transparent";
        }}
      >
        <span className="flex items-center gap-2">
          Explore Events
          <svg
            fill="none"
            height="25"
            viewBox="0 0 24 24"
            width="12"
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
      </Link>

      {/* Get Started Button - Shiny Button */}
      <ShinyButton
        onClick={handleGetStarted}
        className="bg-slate-800 border-slate-700 text-white"
        style={{ "--primary": "#5dfeca" } as React.CSSProperties}
      >
        Get Started
      </ShinyButton>
    </div>
  );
};

export default ExploreBtn;
