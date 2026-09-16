"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/auth-context";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GridIcon,
  Calendar01Icon,
  FileChartColumnIncreasingIcon,
  Bookmark01Icon,
  Share01Icon,
  BellDotIcon,
  HomeIcon,
  UserIcon,
  Settings01Icon,
  Logout01Icon,
  Menu01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { label: "HOME", icon: HomeIcon, href: "/", section: "main" },
  { label: "DASHBOARD", icon: GridIcon, href: "/Dashboard", section: "main" },
  { label: "EVENTS", icon: Calendar01Icon, href: "/events", section: "main" },
  {
    label: "ANALYTICS",
    icon: FileChartColumnIncreasingIcon,
    href: "/analytics",
    section: "main",
  },
  {
    label: "BOOKMARKS",
    icon: Bookmark01Icon,
    href: "/Bookmarks",
    section: "main",
  },
  {
    label: "LINKEDIN GEN",
    icon: Share01Icon,
    href: "/linkedin-post-generator",
    section: "main",
  },
  {
    label: "NOTIFICATIONS",
    icon: BellDotIcon,
    href: "/Notification",
    section: "main",
  },
  { label: "PROFILE", icon: UserIcon, href: "/profile", section: "user" },
  {
    label: "SETTINGS",
    icon: Settings01Icon,
    href: "/settings",
    section: "user",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mainItems = navItems.filter((item) => item.section === "main");
  const userItems = navItems.filter((item) => item.section === "user");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2.5 bg-[#141413] border border-white/10 text-white"
      >
        {sidebarOpen ? (
          <HugeiconsIcon
            icon={Cancel01Icon}
            size="20"
            strokeWidth={2}
            className="text-[#FFB100]"
          />
        ) : (
          <HugeiconsIcon
            icon={Menu01Icon}
            size="20"
            strokeWidth={2}
            className="text-white"
          />
        )}
      </button>

      {/* Mobile Backdrop */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/80 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 bg-[#0a0a09] border-r border-white/10 flex flex-col justify-between overflow-y-auto z-40
          transition-transform duration-300 ease-out font-mono
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div>
          {/* Logo Section */}
          <div className="h-20 px-6 flex items-center border-b border-white/10">
            <Link href="/Dashboard" className="flex items-center gap-3 group">
              <span className="h-2.5 w-2.5 bg-[#FFB100] group-hover:scale-125 transition-transform" />
              <span className="font-bold tracking-widest text-white text-base uppercase">
                IGNITA
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="px-3 py-6 space-y-6">
            <div className="space-y-1">
              <div className="px-3 pb-2 text-[10px] text-[#555] uppercase tracking-widest">
                01 / NAVIGATION
              </div>
              {mainItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 text-xs font-semibold tracking-wider transition-all duration-150 relative
                      ${
                        active
                          ? "bg-[#FFB100]/10 text-white border-l-2 border-[#FFB100]"
                          : "text-[#8a8a86] hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    <HugeiconsIcon
                      icon={Icon}
                      size="16"
                      strokeWidth={2}
                      className={active ? "text-[#FFB100]" : "text-[#8a8a86]"}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="space-y-1">
              <div className="px-3 pb-2 text-[10px] text-[#555] uppercase tracking-widest">
                02 / USER ACCOUNT
              </div>
              {userItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 text-xs font-semibold tracking-wider transition-all duration-150 relative
                      ${
                        active
                          ? "bg-[#FFB100]/10 text-white border-l-2 border-[#FFB100]"
                          : "text-[#8a8a86] hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    <HugeiconsIcon
                      icon={Icon}
                      size="16"
                      strokeWidth={2}
                      className={active ? "text-[#FFB100]" : "text-[#8a8a86]"}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Bottom User Area */}
        <div className="p-4 border-t border-white/10 bg-[#0e0e0d]">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center gap-3 p-2 border border-white/10 bg-[#141413] hover:border-white/30 transition-colors text-left"
            >
              <div className="w-7 h-7 bg-[#1c1c1a] border border-[#FFB100] flex items-center justify-center text-[11px] font-bold text-[#FFB100] shrink-0">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white truncate font-bold uppercase">
                  {user?.name || "DEVELOPER"}
                </p>
                <p className="text-[10px] text-[#8a8a86] truncate">
                  {user?.email || "user@ignita.io"}
                </p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#141413] border border-white/10 p-1 shadow-2xl">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-white/5 transition-colors text-left"
                >
                  <HugeiconsIcon icon={Logout01Icon} size="14" strokeWidth={2} />
                  <span>LOGOUT</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </aside>
    </>
  );
};
