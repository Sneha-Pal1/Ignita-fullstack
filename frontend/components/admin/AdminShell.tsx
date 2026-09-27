"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "@/lib/auth-context";
import { AdminShellSkeleton } from "./AdminShellSkeleton";
import {
  BellRing,
  CalendarDays,
  ChartColumnIncreasing,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusSquare,
  Search,
  Settings2,
  Users,
  X,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
};

const navItems: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Create Event", href: "/admin/create-event", icon: PlusSquare },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: ChartColumnIncreasing },
  { label: "Alerts", href: "/alerts", icon: BellRing },
  { label: "Settings", href: "/profile", icon: Settings2 },
];

export const AdminShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!isAdmin) {
      router.replace("/Dashboard");
    }
  }, [isAdmin, isLoading, router, user]);

  const activeSection = useMemo(
    () =>
      navItems.find(
        (item) =>
          pathname === item.href || pathname.startsWith(`${item.href}/`),
      ),
    [pathname],
  );

  if (isLoading || !user || !isAdmin) {
    return <AdminShellSkeleton />;
  }

  const handleLogout = async () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#0e0e0d] text-[#f4f4f0]">
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close admin navigation"
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-72 flex-col overflow-y-auto border-r border-[#242422] bg-[#10100f] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-[#242422] px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#FFB100]/30 bg-[#FFB100]/10 text-[#FFB100] font-bold font-mono">
              I
            </div>
            <div>
              <p className="levo-eyebrow font-mono text-[11px] uppercase tracking-[0.2em] text-[#FFB100]">
                IGNITA
              </p>
              <p className="text-xs text-[#8a8a86] font-mono">Admin Control Room</p>
            </div>
          </Link>

          <button
            type="button"
            className="rounded-md border border-[#242422] p-2 text-[#8a8a86] hover:text-[#f4f4f0] lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 px-4 py-5">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-md border px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? "border-[#FFB100]/30 bg-[#FFB100]/10 text-[#FFB100] shadow-[0_0_15px_rgba(255,177,0,0.05)]"
                    : "border-transparent text-[#8a8a86] hover:border-[#242422] hover:bg-[#181816] hover:text-[#f4f4f0]"
                }`}
              >
                <Icon size={18} className={active ? "text-[#FFB100]" : ""} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#242422] p-4">
          <div className="rounded-md border border-[#242422] bg-[#141413] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a8a86]">
              Signed in as
            </p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#f4f4f0]">
                  {user.name}
                </p>
                <p className="truncate text-xs text-[#8a8a86]">{user.email}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#242422] text-[#8a8a86] transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                aria-label="Sign out"
              >
                <LogOut size={15} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-[#242422] bg-[#0e0e0d]/90 backdrop-blur-md">
          <div className="flex h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#242422] text-[#8a8a86] lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open admin navigation"
            >
              <Menu size={18} />
            </button>

            <div className="min-w-0 flex-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FFB100]">
                Admin Control Surface
              </p>
              <div className="flex items-center gap-2 min-w-0">
                <h1 className="truncate text-base font-semibold text-[#f4f4f0] sm:text-lg">
                  Welcome back, {user.name.split(" ")[0] || "Admin"}
                </h1>
                {activeSection ? (
                  <span className="hidden font-mono rounded-md border border-[#242422] bg-[#141413] px-2.5 py-1 text-xs text-[#8a8a86] sm:inline-flex">
                    {activeSection.label}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="hidden items-center gap-2 rounded-md border border-[#242422] bg-[#141413] px-4 py-2 md:flex md:w-80">
              <Search size={16} className="text-[#8a8a86]" />
              <input
                type="text"
                placeholder="Quick search"
                className="w-full bg-transparent text-sm text-[#f4f4f0] outline-none placeholder:text-[#8a8a86]/60"
              />
            </div>

            <Link
              href="/alerts"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#242422] text-[#8a8a86] transition-colors hover:border-[#FFB100]/40 hover:bg-[#FFB100]/10 hover:text-[#FFB100]"
              aria-label="View alerts"
            >
              <BellRing size={18} />
            </Link>

            <Link
              href="/profile"
              className="inline-flex h-10 min-w-10 items-center justify-center rounded-md border border-[#FFB100]/30 bg-[#FFB100]/10 px-3 font-mono text-sm font-semibold text-[#FFB100] transition-colors hover:bg-[#FFB100]/20"
            >
              {user.name.charAt(0).toUpperCase()}
            </Link>
          </div>
        </header>

        <main className="flex-1 bg-[#0e0e0d]">{children}</main>
      </div>
    </div>
  );
};
