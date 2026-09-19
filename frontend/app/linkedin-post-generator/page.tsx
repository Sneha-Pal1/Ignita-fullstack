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
import { Sidebar } from "@/components/layout/Sidebar";

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
    }

    setPost(generatedPost);
    setIsLoading(false);
  };

  const handleRegenerate = async () => {
    if (!currentFormData) return;
    await handleGeneratePost(currentFormData);
  };

  const handleCopy = () => {
    if (!post) return;

    const textToCopy =
      post.hashtags && post.hashtags.length > 0
        ? `${post.content}\n\n${post.hashtags.join(" ")}`
        : post.content;

    navigator.clipboard.writeText(textToCopy).then(() => {
      const button = document.activeElement as HTMLButtonElement;
      if (button) {
        const originalText = button.textContent;
        button.textContent = "✓ COPIED!";
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
    <div className="flex min-h-screen bg-[#0e0e0d] text-[#f4f4f0]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col lg:ml-64 font-mono">
        <main className="min-h-screen bg-[#0e0e0d] text-[#f4f4f0]">
          {/* Header */}
          <div className="border-b border-white/10 bg-[#141413] sticky top-0 z-10 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="levo-eyebrow mb-2">
                <span className="h-1.5 w-1.5 bg-[#FFB100]" />
                <span>02 / AI CONTENT STUDIO</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="inline-flex h-9 w-9 items-center justify-center border border-[#FFB100]/30 bg-[#FFB100]/10 text-[#FFB100]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white font-sans sm:text-3xl">
                    LinkedIn Post Generator
                  </h1>
                  <p className="mt-0.5 text-xs text-[#8a8a86] font-mono">
                    Transform your achievements into compelling posts with AI assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Panel - Form */}
              <div className="space-y-6">
                <div className="bg-[#141413] border border-white/10 p-6">
                  <h2 className="text-sm font-semibold text-white mb-5 flex items-center gap-2 font-mono uppercase tracking-wider">
                    <Clipboard className="w-4 h-4 text-[#FFB100]" /> Achievement Details
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
                <div className="bg-[#141413] border border-white/10 p-6">
                  <h2 className="text-sm font-semibold text-white mb-5 flex items-center gap-2 font-mono uppercase tracking-wider">
                    <Eye className="w-4 h-4 text-[#FFB100]" /> Live Output Preview
                  </h2>
                  <PostPreview post={post} isLoading={isLoading} />
                </div>

                {/* Action Buttons */}
                {post && (
                  <div className="bg-[#141413] border border-white/10 p-6">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#8a8a86] mb-3">
                      Export & Regenerate Actions
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
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
              <div className="bg-[#141413] border border-white/10 p-4">
                <h3 className="font-bold text-[#FFB100] text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Pro Tip
                </h3>
                <p className="text-xs text-[#8a8a86] leading-relaxed">
                  Be specific in your description—include key challenges faced, solutions built, and metrics achieved.
                </p>
              </div>
              <div className="bg-[#141413] border border-white/10 p-4">
                <h3 className="font-bold text-[#FFB100] text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Best Practice
                </h3>
                <p className="text-xs text-[#8a8a86] leading-relaxed">
                  Use technical tone for engineering communities and storytelling tone for general networking.
                </p>
              </div>
              <div className="bg-[#141413] border border-white/10 p-4">
                <h3 className="font-bold text-[#FFB100] text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Quick Iteration
                </h3>
                <p className="text-xs text-[#8a8a86] leading-relaxed">
                  Switch between short and detailed formats to craft tailored messages for different platforms.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
