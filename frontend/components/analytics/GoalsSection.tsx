"use client";

import { Flame, Target } from "lucide-react";

interface GoalData {
  title: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
}

interface GoalsSectionProps {
  goals?: GoalData[];
  currentStreak?: number;
  streakRecord?: number;
  engagementScore?: number;
}

export function GoalsSection({
  goals,
  currentStreak = 0,
  streakRecord = 0,
  engagementScore = 0,
}: GoalsSectionProps) {
  const localGoals = goals ?? [];

  return (
    <div className="space-y-6">
      {/* Streak Card */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Streaks & Goals</h2>
        <p className="text-sm text-zinc-400">
          Key patterns and trends from your activity data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current Streak */}
        <div className="p-6 bg-gradient-to-br from-amber-600/30 to-amber-900/30 border border-amber-500/30 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">🔥</div>
            <div>
              <p className="text-xs font-medium text-amber-300">
                Current Streak
              </p>
              <p className="text-2xl font-bold text-white">
                {currentStreak} days
              </p>
            </div>
          </div>
          <p className="text-xs text-amber-200/80">
            Keep it up! You're on fire.
          </p>
        </div>

        {/* Streak Record */}
        <div className="p-6 bg-zinc-800/50 border border-zinc-700 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">🏆</div>
            <div>
              <p className="text-xs font-medium text-zinc-400">Personal Best</p>
              <p className="text-2xl font-bold text-white">
                {streakRecord} days
              </p>
            </div>
          </div>
          <p className="text-xs text-zinc-500">
            {streakRecord - currentStreak} more days to tie your record!
          </p>
        </div>

        {/* Engagement Score */}
        <div className="p-6 bg-emerald-600/20 border border-emerald-500/30 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">⚡</div>
            <div>
              <p className="text-xs font-medium text-emerald-300">
                Engagement Score
              </p>
              <p className="text-2xl font-bold text-white">
                {engagementScore}/100
              </p>
            </div>
          </div>
          <p className="text-xs text-emerald-200/80">
            You're a power user! Keep building.
          </p>
        </div>
      </div>

      {/* Goals */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Monthly Goals</h3>

        <div className="space-y-4">
          {localGoals.map((goal) => (
            <div
              key={goal.title}
              className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-white">{goal.title}</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {goal.current} of {goal.target} {goal.unit}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-400">
                    {goal.progress}%
                  </p>
                </div>
              </div>

              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 bg-emerald-600/20 border border-emerald-500/30 rounded-xl text-center">
        <p className="text-sm font-medium text-emerald-300">
          🎉 You're crushing your goals! Keep up the momentum.
        </p>
      </div>
    </div>
  );
}
