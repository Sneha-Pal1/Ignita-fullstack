"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/lib/auth-context";
import { authStorage } from "@/lib/auth";
import NotificationBell from "./notifications/NotificationBell";
import type { User } from "@/lib/auth-types";

const Navbar = () => {
  const { user: contextUser, isLoading, logout } = useAuthContext();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(contextUser);
  }, [contextUser]);

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0e0e0d]/90 backdrop-blur-md border-b border-white/10">
      <nav className="mx-auto max-w-7xl px-6 sm:px-10 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="h-2.5 w-2.5 bg-[#FFB100] group-hover:scale-125 transition-transform" />
          <span className="font-mono text-base font-bold tracking-widest text-white uppercase">
            IGNITA
          </span>
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-8 font-mono text-xs uppercase tracking-wider text-[#8a8a86] list-none">
          <li>
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
          </li>
          <li>
            <Link href="/events" className="hover:text-white transition-colors">
              EVENTS
            </Link>
          </li>
          {user?.role === "ADMIN" && (
            <li>
              <Link href="/admin" className="text-[#FFB100] hover:text-[#ffbe25] transition-colors">
                ADMIN
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link href="/Dashboard" className="hover:text-white transition-colors">
                DASHBOARD
              </Link>
            </li>
          )}
        </ul>

        {/* Auth status */}
        <div className="flex items-center gap-4">
          {!isLoading && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <NotificationBell />
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 font-mono text-xs text-white hover:text-[#FFB100] transition-colors"
                  >
                    <div className="w-7 h-7 bg-[#1c1c1a] border border-[#FFB100] flex items-center justify-center text-[11px] font-mono text-[#FFB100]">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline">{user.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="font-mono text-xs text-[#8a8a86] hover:text-white uppercase transition-colors"
                  >
                    SIGNOUT
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="font-mono text-xs uppercase tracking-widest text-[#FFB100] border border-[#FFB100]/40 px-4 py-2 hover:bg-[#FFB100] hover:text-black transition-all duration-200"
                >
                  SIGN IN →
                </Link>
              )}
            </>
          )}
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
