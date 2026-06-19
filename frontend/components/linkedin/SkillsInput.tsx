"use client";

import { useState } from "react";
import { suggestedSkills } from "@/lib/data/linkedinTemplates";

interface SkillsInputProps {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export default function SkillsInput({
  skills,
  onSkillsChange,
}: SkillsInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filtered = suggestedSkills.filter(
        (skill) =>
          skill.toLowerCase().includes(value.toLowerCase()) &&
          !skills.includes(skill),
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const addSkill = (skill: string) => {
    if (!skills.includes(skill) && skills.length < 5) {
      onSkillsChange([...skills, skill]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const removeSkill = (skill: string) => {
    onSkillsChange(skills.filter((s) => s !== skill));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addSkill(inputValue.trim());
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-200">
        Skills Used
        <span className="text-zinc-500 ml-1">({skills.length}/5)</span>
      </label>

      {/* Selected Skills Tags */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-md text-sm text-emerald-300 hover:bg-emerald-500/20 transition-colors"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-1 hover:text-emerald-200 transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Field */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={() => inputValue && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Add skills (max 5)..."
          disabled={skills.length >= 5}
          className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {filteredSuggestions.map((skill) => (
              <button
                key={skill}
                onClick={() => addSkill(skill)}
                className="w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-700/50 transition-colors"
              >
                {skill}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-zinc-500">
        Press Enter to add custom skills, or select from suggestions
      </p>
    </div>
  );
}
