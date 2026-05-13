"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/lib/auth-context";
import { authStorage } from "@/lib/auth";
import type { User } from "@/lib/auth-types";

const Navbar = () => {
  const { user: contextUser, isLoading, logout } = useAuthContext();
  const [user, setUser] = useState<User | null>(null);

  // Sync with context
  useEffect(() => {
    setUser(contextUser);
  }, [contextUser]);

  // Also listen to auth changes directly
  useEffect(() => {
    const handleAuthChange = () => {
      const storedUser = authStorage.getUser();
      setUser(storedUser);
    };

    window.addEventListener("auth-change", handleAuthChange as EventListener);
    return () => {
      window.removeEventListener(
        "auth-change",
        handleAuthChange as EventListener,
      );
    };
  }, []);

  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image
            src="/icons/iglogoremovebg.png"
            alt="logo"
            width={40}
            height={40}
            style={{ width: "auto", height: "auto" }}
          />

          <p>IGNITA</p>
        </Link>

        <ul>
          <Link href="/">Home</Link>

          <Link href="/events">Events</Link>

          <Link href="/create">About</Link>

          {!isLoading && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/Bookmarks"
                    className="text-white hover:text-gray-300"
                  >
                    Bookmarks
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-white hover:text-gray-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-white border border-white/20 rounded-lg hover:border-white/40 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login" className="auth-button-navbar">
                  Sign In / Sign Up
                </Link>
              )}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
