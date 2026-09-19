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
    <div className="space-y-3 font-mono">
      <label className="block text-xs uppercase tracking-wider text-[#8a8a86]">
        Skills Used
        <span className="text-[#8a8a86] ml-1">({skills.length}/5)</span>
      </label>

      {/* Selected Skills Tags */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill}
              className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FFB100]/10 border border-[#FFB100]/40 text-xs text-[#FFB100] font-mono"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-1 hover:text-white transition-colors"
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
          className="w-full px-3 py-2 bg-[#0e0e0d] border border-white/10 text-xs text-white placeholder-[#8a8a86] focus:outline-none focus:border-[#FFB100] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono"
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#141413] border border-white/10 shadow-xl z-10 max-h-48 overflow-y-auto">
            {filteredSuggestions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addSkill(skill)}
                className="w-full text-left px-3 py-2 text-xs font-mono text-white hover:bg-[#FFB100] hover:text-black transition-colors"
              >
                {skill}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
