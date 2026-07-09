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
  ArrowDown01Icon,
  Menu01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { label: "Home", icon: HomeIcon, href: "/", section: "main" },
  { label: "Dashboard", icon: GridIcon, href: "/Dashboard", section: "main" },
  { label: "Events", icon: Calendar01Icon, href: "/events", section: "main" },
  {
    label: "Analytics",
    icon: FileChartColumnIncreasingIcon,
    href: "/analytics",
    section: "main",
  },
  {
    label: "Bookmarks",
    icon: Bookmark01Icon,
    href: "/Bookmarks",
    section: "main",
  },
  {
    label: "LinkedIn Generator",
    icon: Share01Icon,
    href: "/linkedin-post-generator",
    section: "main",
  },
  {
    label: "Notifications",
    icon: BellDotIcon,
    href: "/Notification",
    section: "main",
  },
  { label: "Profile", icon: UserIcon, href: "/profile", section: "user" },
  {
    label: "Settings",
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
          <HugeiconsIcon
            icon={Cancel01Icon}
            size="24"
            strokeWidth={2}
            className="text-white"
          />
        ) : (
          <HugeiconsIcon
            icon={Menu01Icon}
            size="24"
            strokeWidth={2}
            className="text-white"
          />
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
          fixed left-0 top-0 h-screen w-64 bg-[#161b22] border-r border-[#21262d] flex flex-col overflow-y-auto z-40
          transition-transform duration-300 ease-out
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="h-20 px-6 flex items-center border-b border-[#21262d]">
          <Link href="/Dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded flex items-center justify-center">
              <img
                src="/icons/iglogoremovebg.png"
                alt="Ignita Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-semibold text-lg text-[#e6edf3] group-hover:text-[#3fb950] transition-colors">
              Ignita
            </span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <div className="space-y-1 mb-8">
            {mainItems.map((item) => {
              const icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                  flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm
                  transition-all duration-200 group border
                  ${
                    active
                      ? "bg-[#2ea043]/10 text-[#3fb950] border-[#238636]/30"
                      : "text-[#7d8590] border-transparent hover:text-[#e6edf3] hover:bg-[#21262d]"
                  }
                `}
                >
                  <HugeiconsIcon
                    icon={icon}
                    size="18"
                    strokeWidth={2}
                    className="shrink-0"
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#21262d] my-4" />

          {/* User Section Items */}
          <div className="space-y-1">
            {userItems.map((item) => {
              const icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                  flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm
                  transition-all duration-200 group border
                  ${
                    active
                      ? "bg-[#2ea043]/10 text-[#3fb950] border-[#238636]/30"
                      : "text-[#7d8590] border-transparent hover:text-[#e6edf3] hover:bg-[#21262d]"
                  }
                `}
                >
                  <HugeiconsIcon
                    icon={icon}
                    size="18"
                    strokeWidth={2}
                    className="shrink-0"
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-[#21262d]">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#21262d] transition-colors group relative"
          >
            <div className="w-8 h-8 rounded-full bg-[#2ea043]/10 border border-[#238636]/30 flex items-center justify-center shrink-0">
              <span className="font-semibold text-[#3fb950] text-xs">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-xs font-semibold text-[#e6edf3] truncate">
                {user?.name || "User"}
              </p>
              <p className="text-[11px] text-[#7d8590] truncate">
                {user?.email || "user@example.com"}
              </p>
            </div>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size="14"
              strokeWidth={2}
              className="text-[#7d8590] shrink-0"
            />

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#161b22] border border-[#21262d] rounded-md overflow-hidden shadow-xl">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-[#7d8590] hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors text-left"
                >
                  <HugeiconsIcon
                    icon={Logout01Icon}
                    size="14"
                    strokeWidth={2}
                  />
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
