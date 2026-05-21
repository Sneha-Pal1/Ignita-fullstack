"use client";

/**
 * Skeleton screen for Dashboard loading state
 * Prevents Cumulative Layout Shift (CLS) by reserving space for content
 * Provides progressive loading UX with skeleton UI
 */
export const DashboardSkeleton = () => {
  return (
    <div className="flex h-dvh overflow-hidden bg-zinc-950">
      {/* Sidebar Skeleton */}
      <aside className="fixed left-0 top-0 h-dvh w-64 bg-zinc-950 border-r border-zinc-800 animate-pulse">
        {/* Logo */}
        <div className="h-20 px-6 flex items-center border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800" />
            <div className="h-6 w-24 bg-zinc-800 rounded" />
          </div>
        </div>

        {/* Nav Items */}
        <div className="p-6 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className="w-5 h-5 bg-zinc-800 rounded" />
              <div className="h-4 w-24 bg-zinc-800 rounded" />
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        {/* Top Header Skeleton */}
        <header className="h-20 border-b border-zinc-800 bg-zinc-950 animate-pulse px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="h-5 w-32 bg-zinc-800 rounded" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-48 bg-zinc-800 rounded" />
            <div className="h-10 w-10 bg-zinc-800 rounded" />
            <div className="h-10 w-10 bg-zinc-800 rounded-full" />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4 border border-zinc-800 bg-zinc-900/50 animate-pulse"
                  >
                    <div className="w-9 h-9 bg-zinc-800 rounded-lg mb-3" />
                    <div className="h-6 w-12 bg-zinc-800 rounded mb-1" />
                    <div className="h-3 w-20 bg-zinc-800 rounded" />
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 animate-pulse">
                <div className="p-6 border-b border-zinc-800">
                  <div className="h-5 w-32 bg-zinc-800 rounded" />
                </div>
                <div className="divide-y divide-zinc-800">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="p-4 flex gap-4">
                      <div className="w-10 h-10 bg-zinc-800 rounded-lg flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-32 bg-zinc-800 rounded" />
                        <div className="h-3 w-24 bg-zinc-800 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 animate-pulse">
                <div className="p-6 border-b border-zinc-800">
                  <div className="h-5 w-32 bg-zinc-800 rounded" />
                </div>
                <div className="divide-y divide-zinc-800">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-5">
                      <div className="space-y-2">
                        <div className="h-4 w-40 bg-zinc-800 rounded" />
                        <div className="h-3 w-48 bg-zinc-800 rounded" />
                        <div className="h-3 w-32 bg-zinc-800 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Notifications */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 animate-pulse">
                <div className="p-6 border-b border-zinc-800">
                  <div className="h-5 w-32 bg-zinc-800 rounded" />
                </div>
                <div className="divide-y divide-zinc-800">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-4 space-y-2">
                      <div className="h-4 w-24 bg-zinc-800 rounded" />
                      <div className="h-3 w-32 bg-zinc-800 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Deadlines */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 animate-pulse">
                <div className="p-6 border-b border-zinc-800">
                  <div className="h-5 w-40 bg-zinc-800 rounded" />
                </div>
                <div className="p-4 space-y-3">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-zinc-800/30 space-y-2"
                    >
                      <div className="h-4 w-32 bg-zinc-800 rounded" />
                      <div className="h-3 w-24 bg-zinc-800 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
