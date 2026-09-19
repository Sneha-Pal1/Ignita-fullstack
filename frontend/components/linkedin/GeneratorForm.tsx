"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import {
  achievementTypes,
  roleOptions,
  lengthOptions,
} from "@/lib/data/linkedinTemplates";
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

export default function GeneratorForm({
  onSubmit,
  isLoading,
}: GeneratorFormProps) {
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
    <form onSubmit={handleSubmit} className="space-y-5 font-mono">
      {/* Achievement Type */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-[#8a8a86] mb-2 font-mono">
          Achievement Type
        </label>
        <select
          name="achievementType"
          value={formData.achievementType}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-[#0e0e0d] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFB100] transition-colors font-mono"
        >
          {achievementTypes.map((type) => (
            <option key={type} value={type} className="bg-[#141413]">
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Event / Achievement Name */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-[#8a8a86] mb-2 font-mono">
          Event / Achievement Name
        </label>
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleInputChange}
          placeholder="e.g., HackMIT 2026, Google Internship"
          className="w-full px-3 py-2 bg-[#0e0e0d] border border-white/10 text-xs text-white placeholder-[#8a8a86] focus:outline-none focus:border-[#FFB100] transition-colors font-mono"
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-[#8a8a86] mb-2 font-mono">
          Role / Position
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-[#0e0e0d] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFB100] transition-colors font-mono"
        >
          {roleOptions.map((role) => (
            <option key={role} value={role} className="bg-[#141413]">
              {role}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-[#8a8a86] mb-2 font-mono">
          Description / Experience
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="What did you do? What did you learn? Share the highlights..."
          rows={4}
          className="w-full px-3 py-2 bg-[#0e0e0d] border border-white/10 text-xs text-white placeholder-[#8a8a86] focus:outline-none focus:border-[#FFB100] transition-colors resize-none font-mono"
        />
      </div>

      {/* Skills Input */}
      <SkillsInput
        skills={formData.skills}
        onSkillsChange={handleSkillsChange}
      />

      {/* Tone Selector */}
      <ToneSelector tone={formData.tone} onToneChange={handleToneChange} />

      {/* Length */}
      <div>
        <label className="block text-xs uppercase tracking-wider text-[#8a8a86] mb-2 font-mono">
          Post Length
        </label>
        <div className="grid grid-cols-3 gap-2">
          {lengthOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, length: option.value }))
              }
              className={`p-2 text-xs text-center transition-colors border font-mono ${
                formData.length === option.value
                  ? "bg-[#FFB100] border-[#FFB100] text-black font-semibold"
                  : "bg-[#0e0e0d] border-white/10 text-[#8a8a86] hover:border-[#FFB100]/40 hover:text-white"
              }`}
            >
              <div className="font-semibold">{option.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3 pt-3 border-t border-white/10">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.includeEmojis}
            onChange={() => handleToggle("includeEmojis")}
            className="w-4 h-4 border-white/10 bg-[#0e0e0d] accent-[#FFB100]"
          />
          <span className="text-xs text-[#8a8a86] font-mono">Include emojis</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.includeHashtags}
            onChange={() => handleToggle("includeHashtags")}
            className="w-4 h-4 border-white/10 bg-[#0e0e0d] accent-[#FFB100]"
          />
          <span className="text-xs text-[#8a8a86] font-mono">Include hashtags</span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={
          isLoading ||
          !formData.eventName.trim() ||
          !formData.description.trim()
        }
        className="w-full px-4 py-3 bg-[#FFB100] hover:bg-[#ffbe26] disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-6 font-mono"
      >
        {isLoading ? (
          <>
            <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Generating Post...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4" />
            Generate Post
          </>
        )}
      </button>
    </form>
  );
}
