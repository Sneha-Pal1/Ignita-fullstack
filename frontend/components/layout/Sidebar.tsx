"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/auth-context";
import {
  LayoutGrid,
  Calendar,
  Bookmark,
  Bell,
  TrendingUp,
  Share2,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", icon: LayoutGrid, href: "/Dashboard", section: "main" },
  { label: "Events", icon: Calendar, href: "/events", section: "main" },
  { label: "Bookmarks", icon: Bookmark, href: "/Bookmarks", section: "main" },
  {
    label: "Notifications",
    icon: Bell,
    href: "/Notification",
    section: "main",
  },
  {
    label: "Analytics",
    icon: TrendingUp,
    href: "/analytics",
    section: "main",
  },
  {
    label: "LinkedIn Generator",
    icon: Share2,
    href: "/linkedin-post-generator",
    section: "main",
  },
  { label: "Profile", icon: User, href: "/profile", section: "user" },
  { label: "Settings", icon: Settings, href: "/settings", section: "user" },
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
    return pathname === href || pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 hover:bg-zinc-900 rounded-lg transition-colors"
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-dvh w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col overflow-y-auto z-40
          transition-transform duration-300 ease-out
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="h-20 px-6 flex items-center border-b border-zinc-800">
          <Link href="/Dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <span className="font-bold text-white text-lg">I</span>
            </div>
            <span className="font-bold text-xl text-white group-hover:text-emerald-400 transition-colors">
              Ignita
            </span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <div className="space-y-1 mb-8">
            {mainItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm
                  transition-all duration-200 group
                  ${
                    active
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50"
                  }
                `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-800 my-4" />

          {/* User Section Items */}
          <div className="space-y-1">
            {userItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm
                  transition-all duration-200 group
                  ${
                    active
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50"
                  }
                `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-900 transition-colors group relative"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <span className="font-semibold text-emerald-400 text-sm">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-zinc-500 truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0" />

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute bottom-full left-4 right-4 mb-2 bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden shadow-xl">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
