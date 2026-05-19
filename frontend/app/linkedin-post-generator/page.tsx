"use client";

import { useState } from "react";
import {
  Briefcase,
  Clipboard,
  Eye,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react";
import GeneratorForm from "@/components/linkedin/GeneratorForm";
import PostPreview from "@/components/linkedin/PostPreview";
import ActionButtons from "@/components/linkedin/ActionButtons";
import { generateMockPost, GeneratedPost } from "@/lib/data/linkedinTemplates";

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

export default function LinkedInGeneratorPage() {
  const [post, setPost] = useState<GeneratedPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);

  const handleGeneratePost = async (formData: FormData) => {
    setCurrentFormData(formData);
    setIsLoading(true);

    // Simulate API call with 1 second delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const generatedPost = generateMockPost(
      formData.eventName,
      formData.achievementType,
      formData.description,
      formData.skills,
      formData.tone,
      formData.includeEmojis,
    );

    // Adjust length if needed
    if (formData.length === "short") {
      const sentences = generatedPost.content.split(". ");
      generatedPost.content = sentences.slice(0, 2).join(". ") + ".";
    } else if (formData.length === "detailed") {
      // Already detailed by default
    }

    setPost(generatedPost);
    setIsLoading(false);
  };

  const handleRegenerate = async () => {
    if (!currentFormData) return;

    // Vary the tone slightly or regenerate with different variation
    await handleGeneratePost(currentFormData);
  };

  const handleCopy = () => {
    if (!post) return;

    const textToCopy = post.includeHashtags
      ? `${post.content}\n\n${post.hashtags.join(" ")}`
      : post.content;

    navigator.clipboard.writeText(textToCopy).then(() => {
      // Show brief feedback
      const button = document.activeElement as HTMLButtonElement;
      if (button) {
        const originalText = button.textContent;
        button.textContent = "✓ Copied!";
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    });
  };

  const handleClear = () => {
    setPost(null);
    setCurrentFormData(null);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-8 h-8" />
            <h1 className="text-3xl font-bold">LinkedIn Post Generator</h1>
          </div>
          <p className="text-zinc-400">
            Transform your achievements into compelling LinkedIn posts with
            AI-powered suggestions
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                <Clipboard className="w-5 h-5" /> Your Achievement
              </h2>
              <GeneratorForm
                onSubmit={handleGeneratePost}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Right Panel - Preview & Actions */}
          <div className="space-y-6">
            {/* Post Preview */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" /> Live Preview
              </h2>
              <PostPreview post={post} isLoading={isLoading} />
            </div>

            {/* Action Buttons */}
            {post && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
                <h3 className="text-sm font-medium text-zinc-300 mb-3">
                  Actions
                </h3>
                <ActionButtons
                  isLoading={isLoading}
                  isGenerated={!!post}
                  onGenerate={() =>
                    currentFormData && handleGeneratePost(currentFormData)
                  }
                  onRegenerate={handleRegenerate}
                  onCopy={handleCopy}
                  onClear={handleClear}
                />
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <h3 className="font-medium text-emerald-400 mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Pro Tip
            </h3>
            <p className="text-sm text-zinc-400">
              Be specific in your description—include challenges faced and
              solutions implemented
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <h3 className="font-medium text-emerald-400 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Best Practice
            </h3>
            <p className="text-sm text-zinc-400">
              Use the appropriate tone for your audience. Technical tone works
              best for engineering communities
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <h3 className="font-medium text-emerald-400 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Quick Start
            </h3>
            <p className="text-sm text-zinc-400">
              Try different tones and regenerate posts to find the perfect
              version for your audience
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
