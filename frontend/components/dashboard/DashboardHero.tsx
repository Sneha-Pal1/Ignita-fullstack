"use client";

import { useAuthContext } from "@/lib/auth-context";

export const DashboardHero = () => {
  const { user } = useAuthContext();
  const firstName = user?.name?.split(" ")[0] || "User";

  return (
    <div className="relative mb-12">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl -z-10" />

      <div className="px-6 py-12 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {firstName}
          </span>
        </h1>
        <p className="text-lg text-gray-400">
          Track your saved events, alerts, and activity in one place
        </p>
      </div>
    </div>
  );
};
