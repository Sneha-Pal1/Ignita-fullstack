"use client";

/**
 * Skeleton screen for Dashboard loading state
 * Prevents Cumulative Layout Shift (CLS) by reserving space for content
 * Provides progressive loading UX with skeleton UI
 */
export const DashboardSkeleton = () => {
  return (
    <main className="min-h-dvh bg-slate-950 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-5">
          {/* Welcome Card Skeleton - 2 columns */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-emerald-500/20 animate-pulse">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-700 rounded w-1/4" />
                  <div className="h-8 bg-slate-700 rounded w-1/3" />
                </div>
                <div className="w-6 h-6 bg-slate-700 rounded-full" />
              </div>
              <div className="h-6 bg-slate-700 rounded w-2/3" />
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="h-12 bg-slate-700 rounded" />
                <div className="h-12 bg-slate-700 rounded" />
              </div>
            </div>
          </div>

          {/* Stats Cards Skeleton - 2 columns */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-slate-900/50 border border-emerald-500/20 animate-pulse space-y-3"
              >
                <div className="w-10 h-10 bg-slate-700 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-3 bg-slate-700 rounded w-3/4" />
                  <div className="h-6 bg-slate-700 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions Skeleton - 2 columns */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="h-5 bg-slate-700 rounded w-1/4 mb-4 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-900/50 border border-emerald-500/20 animate-pulse space-y-3"
                >
                  <div className="w-10 h-10 bg-slate-700 rounded-xl" />
                  <div className="space-y-2">
                    <div className="h-5 bg-slate-700 rounded w-2/3" />
                    <div className="h-4 bg-slate-700 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events Skeleton - 2 columns */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="h-5 bg-slate-700 rounded w-1/4 mb-4 animate-pulse" />
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-emerald-500/20 animate-pulse"
                >
                  <div className="w-16 h-10 bg-slate-700 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-slate-700 rounded w-2/3" />
                    <div className="h-4 bg-slate-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Productivity Tracker Skeleton - 2 columns */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-emerald-500/20 animate-pulse">
              <div className="space-y-6">
                <div className="flex justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-5 bg-slate-700 rounded w-1/3" />
                    <div className="h-4 bg-slate-700 rounded w-1/2" />
                  </div>
                  <div className="w-16 h-8 bg-slate-700 rounded-full" />
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-24 bg-slate-700 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookmarks Skeleton - 2 columns */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="h-5 bg-slate-700 rounded w-1/4 mb-4 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-slate-900/50 border border-emerald-500/20 overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-slate-700" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-slate-700 rounded w-2/3" />
                    <div className="h-5 bg-slate-700 rounded w-3/4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-700 rounded w-2/3" />
                      <div className="h-4 bg-slate-700 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline Skeleton - 2 columns */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="h-5 bg-slate-700 rounded w-1/4 mb-4 animate-pulse" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="relative sm:pl-8 space-y-2">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-700" />
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-emerald-500/20 space-y-2">
                    <div className="h-4 bg-slate-700 rounded w-3/4" />
                    <div className="h-3 bg-slate-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
