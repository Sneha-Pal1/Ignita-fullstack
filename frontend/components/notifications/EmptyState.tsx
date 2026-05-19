"use client";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  variant?: "notifications" | "alerts" | "activity";
}

export default function EmptyState({
  icon = "✨",
  title,
  description,
  actionText,
  onAction,
  variant = "notifications",
}: EmptyStateProps) {
  const getVariantStyles = () => {
    const styles: Record<
      string,
      { bg: string; gradientFrom: string; gradientTo: string }
    > = {
      notifications: {
        bg: "from-emerald-600/20 to-teal-600/20",
        gradientFrom: "from-emerald-500",
        gradientTo: "to-teal-500",
      },
      alerts: {
        bg: "from-cyan-600/20 to-blue-600/20",
        gradientFrom: "from-cyan-500",
        gradientTo: "to-blue-500",
      },
      activity: {
        bg: "from-purple-600/20 to-pink-600/20",
        gradientFrom: "from-purple-500",
        gradientTo: "to-pink-500",
      },
    };
    return styles[variant] || styles.notifications;
  };

  const styles = getVariantStyles();

  return (
    <div className="w-full py-16 px-6 text-center">
      {/* Large icon with glow */}
      <div className="flex justify-center mb-6">
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl bg-gradient-to-r ${styles.bg} border border-white/20 shadow-lg animate-pulse`}
          style={{
            boxShadow: `0 0 40px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
          }}
        >
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-400 max-w-sm mx-auto mb-8">{description}</p>

      {/* CTA Button */}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} text-white font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
        >
          <span>{actionText}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      )}

      {/* Decorative elements */}
      <div className="mt-12 space-y-2">
        <div className="flex justify-center gap-8">
          <div className="w-1 h-1 rounded-full bg-emerald-500/30 animate-bounce" />
          <div
            className="w-1 h-1 rounded-full bg-teal-500/30 animate-bounce"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="w-1 h-1 rounded-full bg-cyan-500/30 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
      </div>
    </div>
  );
}
