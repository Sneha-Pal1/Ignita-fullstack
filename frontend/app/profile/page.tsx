"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthContext } from "@/lib/auth-context";
import { ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <main className="px-6 py-10 max-w-2xl mx-auto">
        <p className="text-gray-400">Loading...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isAdmin = user.role === "ADMIN";

  return (
    <main className="px-6 py-10 max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Profile Card */}
      <div className="bg-gray-900/50 border border-white/10 rounded-lg p-8">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-linear-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-4xl font-bold text-white">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Profile Info */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
          <p className="text-gray-400">{user.email}</p>
        </div>

        {/* Details Grid */}
        <div className="space-y-6 mb-8 border border-white/10 rounded-lg p-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Full Name</p>
            <p className="text-white font-semibold">{user.name}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-1">Email</p>
            <p className="text-white font-semibold">{user.email}</p>
          </div>

          {user.phone && (
            <div>
              <p className="text-gray-400 text-sm mb-1">Phone</p>
              <p className="text-white font-semibold">{user.phone}</p>
            </div>
          )}

          {user.role && (
            <div>
              <p className="text-gray-400 text-sm mb-1">Role</p>
              <p className="text-white font-semibold capitalize">{user.role}</p>
            </div>
          )}

          <div>
            <p className="text-gray-400 text-sm mb-1">User ID</p>
            <p className="text-white font-mono text-sm">{user.id}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            href="/bookmarks"
            className="flex-1 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors text-center"
          >
            View Bookmarks
          </Link>
          <button
            onClick={handleLogout}
            className="flex-1 px-6 py-3 border border-red-500/20 text-red-400 font-semibold rounded-lg hover:bg-red-500/10 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <Link
          href="/events"
          className="p-4 bg-gray-900/50 border border-white/10 rounded-lg hover:border-white/20 transition-colors text-center"
        >
          <p className="text-white font-semibold">Explore Events</p>
          <p className="text-gray-400 text-sm mt-1">Browse all events</p>
        </Link>
        {isAdmin ? (
          <Link
            href="/create"
            className="p-4 bg-gray-900/50 border border-emerald-500/20 rounded-lg hover:border-emerald-400/40 transition-colors text-center"
          >
            <p className="text-white font-semibold">Create Event</p>
            <p className="text-gray-400 text-sm mt-1">Post a new event</p>
          </Link>
        ) : (
          <div className="p-4 bg-gray-900/50 border border-white/10 rounded-lg text-center">
            <p className="text-white font-semibold">Admin access only</p>
            <p className="text-gray-400 text-sm mt-1">
              Event creation is available to admins.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
