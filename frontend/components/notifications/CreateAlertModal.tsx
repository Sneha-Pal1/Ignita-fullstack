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
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in scale-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full max-w-md bg-[#141413] border border-white/10 font-mono"
          style={{
            boxShadow: "0 0 40px rgba(255, 177, 0, 0.15)",
          }}
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <div className="levo-eyebrow mb-1">
                  <span className="h-1.5 w-1.5 bg-[#FFB100]" />
                  <span>ALERT CREATION</span>
                </div>
                <h2 className="text-xl font-bold text-white font-sans">
                  Create Event Alert
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 border border-white/10 bg-[#0e0e0d] text-[#8a8a86] hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Event Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8a8a86] mb-2 font-mono">
                Select Event
              </label>
              <input
                type="text"
                placeholder="Search or enter event name..."
                value={formData.eventTitle}
                onChange={(e) =>
                  setFormData({ ...formData, eventTitle: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#0e0e0d] border border-white/10 text-xs text-white placeholder-[#8a8a86] focus:border-[#FFB100] focus:outline-none transition-colors font-mono"
              />
            </div>

            {/* Reminder Type */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8a8a86] mb-2 font-mono">
                Reminder Timing
              </label>
              <div className="space-y-2">
                {reminderOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, reminderType: option.value })
                    }
                    className={`w-full px-3 py-2.5 border transition-all text-left flex items-center justify-between font-mono text-xs ${
                      formData.reminderType === option.value
                        ? "border-[#FFB100] bg-[#FFB100] text-black font-semibold"
                        : "border-white/10 bg-[#0e0e0d] text-white hover:border-[#FFB100]/40"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </span>
                    {formData.reminderType === option.value && (
                      <span className="w-2 h-2 bg-black" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8a8a86] mb-2 font-mono">
                Reminder Time
              </label>
              <input
                type="time"
                value={formData.reminderTime}
                onChange={(e) =>
                  setFormData({ ...formData, reminderTime: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#0e0e0d] border border-white/10 text-xs text-white focus:border-[#FFB100] focus:outline-none transition-colors font-mono"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 flex gap-3 font-mono">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-white/10 bg-[#0e0e0d] text-xs font-semibold text-[#8a8a86] hover:text-white uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2.5 bg-[#FFB100] hover:bg-[#ffbe26] text-black text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Create Alert
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
