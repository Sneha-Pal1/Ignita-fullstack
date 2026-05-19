"use client";

import { useState } from "react";

interface CreateAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (alert: {
    eventTitle: string;
    reminderType: string;
    reminderTime: string;
  }) => void;
}

export default function CreateAlertModal({
  isOpen,
  onClose,
  onSave,
}: CreateAlertModalProps) {
  const [formData, setFormData] = useState({
    eventTitle: "",
    reminderType: "1_day",
    reminderTime: "09:00",
  });

  const reminderOptions = [
    { value: "1_week", label: "1 Week Before", icon: "📅" },
    { value: "3_days", label: "3 Days Before", icon: "📌" },
    { value: "1_day", label: "1 Day Before", icon: "⏳" },
    { value: "3_hours", label: "3 Hours Before", icon: "⏰" },
  ];

  const handleSave = () => {
    if (!formData.eventTitle.trim()) {
      alert("Please select an event");
      return;
    }
    onSave(formData);
    setFormData({
      eventTitle: "",
      reminderType: "1_day",
      reminderTime: "09:00",
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in scale-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full max-w-md rounded-2xl overflow-hidden"
          style={{
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            boxShadow:
              "0 0 40px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Create Alert
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Get notified about your favorite events
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Event Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                📌 Select Event
              </label>
              <input
                type="text"
                placeholder="Search or enter event name..."
                value={formData.eventTitle}
                onChange={(e) =>
                  setFormData({ ...formData, eventTitle: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200"
              />
              <p className="text-xs text-gray-400 mt-2">
                💡 Start typing to find your events
              </p>
            </div>

            {/* Reminder Type */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                🔔 Reminder Timing
              </label>
              <div className="space-y-2">
                {reminderOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      setFormData({ ...formData, reminderType: option.value })
                    }
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 text-left flex items-center justify-between ${
                      formData.reminderType === option.value
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-white/10 bg-white/[0.02] hover:border-emerald-500/50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-sm font-medium text-white">
                        {option.label}
                      </span>
                    </span>
                    {formData.reminderType === option.value && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                🕐 Preferred Reminder Time
              </label>
              <input
                type="time"
                value={formData.reminderTime}
                onChange={(e) =>
                  setFormData({ ...formData, reminderTime: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/10 text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200"
              />
            </div>

            {/* Info */}
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <p className="text-xs text-emerald-400">
                ✨ You'll receive a notification at the selected time before the
                event.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium transition-all duration-200"
            >
              Create Alert
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
