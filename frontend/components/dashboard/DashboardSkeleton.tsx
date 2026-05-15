"use client";

/**
 * Skeleton screen for Dashboard loading state
 * Prevents Cumulative Layout Shift (CLS) by reserving space for content
 * Provides progressive loading UX with skeleton UI
 */
export const DashboardSkeleton = () => {
  return (
    <main className="min-h-dvh bg-gradient-to-br from-slate-950 to-slate-900 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Hero Skeleton */}
        <header className="px-5 sm:px-6 py-8 sm:py-12 rounded-xl sm:rounded-2xl bg-slate-800/50 border border-slate-700 animate-pulse">
          <div className="space-y-3">
            <div className="h-8 sm:h-10 bg-slate-700 rounded-lg w-3/4" />
            <div className="h-5 bg-slate-700 rounded-lg w-1/2" />
          </div>
        </header>

        {/* Stats Skeleton */}
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          role="status"
          aria-label="Loading statistics"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-lg sm:rounded-xl bg-slate-800/50 border border-slate-700 animate-pulse space-y-3"
            >
              <div className="w-12 h-12 bg-slate-700 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 bg-slate-700 rounded w-3/4" />
                <div className="h-6 bg-slate-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </section>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bookmarks Section */}
            <section>
              <div className="h-6 bg-slate-700 rounded-lg w-1/3 mb-6 animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-slate-800/50 border border-slate-700 overflow-hidden animate-pulse"
                  >
                    <div className="aspect-video bg-slate-700" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-slate-700 rounded w-2/3" />
                      <div className="h-5 bg-slate-700 rounded" />
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-700 rounded w-3/4" />
                        <div className="h-4 bg-slate-700 rounded w-2/3" />
                      </div>
                      <div className="h-10 bg-slate-700 rounded-lg mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="space-y-3">
              <div className="h-6 bg-slate-700 rounded-lg w-1/3 animate-pulse" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 sm:p-5 rounded-lg sm:rounded-xl bg-slate-800/50 border border-slate-700 animate-pulse"
                >
                  <div className="w-16 h-12 bg-slate-700 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-slate-700 rounded w-2/3" />
                    <div className="h-4 bg-slate-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </section>

            {/* Quick Actions Section */}
            <section>
              <div className="h-6 bg-slate-700 rounded-lg w-1/3 mb-6 animate-pulse" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-5 sm:p-6 rounded-lg sm:rounded-xl bg-slate-800/50 border border-slate-700 animate-pulse space-y-3"
                  >
                    <div className="w-10 h-10 bg-slate-700 rounded-lg" />
                    <div className="space-y-2">
                      <div className="h-5 bg-slate-700 rounded w-2/3" />
                      <div className="h-4 bg-slate-700 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Activity Timeline */}
          <aside className="lg:col-span-1">
            <div className="h-6 bg-slate-700 rounded-lg w-1/2 mb-6 animate-pulse" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="pl-16 sm:pl-20 space-y-2"
                >
                  <div className="absolute left-1 w-10 h-10 bg-slate-700 rounded-full" />
                  <div className="p-3 sm:p-4 rounded-lg bg-slate-800/50 border border-slate-700 animate-pulse space-y-2">
                    <div className="h-4 bg-slate-700 rounded w-3/4" />
                    <div className="h-3 bg-slate-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};
