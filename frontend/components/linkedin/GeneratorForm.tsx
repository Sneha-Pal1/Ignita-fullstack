"use client";

import { useState } from "react";
import { achievementTypes, roleOptions, lengthOptions } from "@/lib/data/linkedinTemplates";
import SkillsInput from "./SkillsInput";
import ToneSelector from "./ToneSelector";

interface FormData {
  achievementType: string;
  eventName: string;
  role: string;
  description: string;
  skills: string[];
  tone: string;
  includeEmojis: boolean;
  includeHashtags: boolean;
  length: string;
}

interface GeneratorFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export default function GeneratorForm({ onSubmit, isLoading }: GeneratorFormProps) {
  const [formData, setFormData] = useState<FormData>({
    achievementType: "Hackathon",
    eventName: "",
    role: "Participant",
    description: "",
    skills: [],
    tone: "professional",
    includeEmojis: true,
    includeHashtags: true,
    length: "medium",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = (field: "includeEmojis" | "includeHashtags") => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSkillsChange = (skills: string[]) => {
    setFormData((prev) => ({
      ...prev,
      skills,
    }));
  };

  const handleToneChange = (tone: string) => {
    setFormData((prev) => ({
      ...prev,
      tone,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Achievement Type */}
      <div>
        <label className="block text-sm font-medium text-zinc-200 mb-2">
          Achievement Type
        </label>
        <select
          name="achievementType"
          value={formData.achievementType}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
        >
          {achievementTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Event / Achievement Name */}
      <div>
        <label className="block text-sm font-medium text-zinc-200 mb-2">
          Event / Achievement Name
        </label>
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleInputChange}
          placeholder="e.g., HackMIT 2026, Google Internship"
          className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-zinc-200 mb-2">
          Role / Position
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
        >
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-zinc-200 mb-2">
          Description / Experience
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="What did you do? What did you learn? Share the highlights..."
          rows={4}
          className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors resize-none"
        />
      </div>

      {/* Skills Input */}
      <SkillsInput
        skills={formData.skills}
        onSkillsChange={handleSkillsChange}
      />

      {/* Tone Selector */}
      <ToneSelector
        tone={formData.tone}
        onToneChange={handleToneChange}
      />

      {/* Length */}
      <div>
        <label className="block text-sm font-medium text-zinc-200 mb-2">
          Post Length
        </label>
        <div className="grid grid-cols-3 gap-2">
          {lengthOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, length: option.value }))}
              className={`p-2 rounded-lg text-xs text-center transition-colors border ${
                formData.length === option.value
                  ? "bg-emerald-500/10 border-emerald-500 text-emerald-100"
                  : "bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:border-zinc-600"
              }`}
            >
              <div className="font-medium">{option.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3 pt-2 border-t border-zinc-800">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.includeEmojis}
            onChange={() => handleToggle("includeEmojis")}
            className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 accent-emerald-600"
          />
          <span className="text-sm text-zinc-300">Include emojis</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.includeHashtags}
            onChange={() => handleToggle("includeHashtags")}
            className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 accent-emerald-600"
          />
          <span className="text-sm text-zinc-300">Include hashtags</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !formData.eventName.trim() || !formData.description.trim()}
        className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 mt-6"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            ✨ Generate Post
          </>
        )}
      </button>
    </form>
  );
}
