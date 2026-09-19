"use client";

import { GeneratedPost } from "@/lib/data/linkedinTemplates";
import {
  FileText,
  Globe,
  ThumbsUp,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

interface PostPreviewProps {
  post: GeneratedPost | null;
  isLoading: boolean;
}

export default function PostPreview({ post, isLoading }: PostPreviewProps) {
  if (isLoading) {
    return (
      <div className="bg-[#141413] border border-white/10 p-6 h-full flex flex-col gap-4 font-mono">
        <div className="space-y-4 animate-pulse">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-white/10" />
            <div className="flex-1">
              <div className="h-4 w-24 bg-white/10 mb-2" />
              <div className="h-3 w-16 bg-white/10" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-white/10 w-full" />
            <div className="h-3 bg-white/10 w-5/6" />
            <div className="h-3 bg-white/10 w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#141413] border border-white/10 p-8 h-full flex flex-col items-center justify-center text-center font-mono min-h-[300px]">
        <FileText className="w-10 h-10 text-[#FFB100] mb-3" />
        <p className="text-white text-sm font-sans font-semibold">
          Generated LinkedIn Post Preview
        </p>
        <p className="text-xs text-[#8a8a86] mt-1 font-mono">
          Fill in the achievement form and click "Generate Post"
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#141413] border border-white/10 p-6 h-full overflow-y-auto font-mono">
      {/* LinkedIn-style post preview */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-[#FFB100] text-black font-bold text-sm flex items-center justify-center shrink-0 font-mono">
            IG
          </div>
          <div>
            <div className="font-semibold text-white text-sm font-sans">Ignita Builder</div>
            <div className="text-xs text-[#8a8a86] flex items-center gap-1 font-mono">
              @ignita • 1s •
              <Globe className="w-3 h-3 text-[#FFB100]" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap font-sans">
            {post.content}
          </div>

          {/* Hashtags */}
          {post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.hashtags.map((tag) => (
                <a
                  key={tag}
                  href={`https://www.linkedin.com/feed/hashtag/${tag.replace("#", "").toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFB100] hover:underline text-xs font-mono transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          )}

          {/* Engagement Preview */}
          <div className="pt-4 border-t border-white/10 flex gap-4 text-xs font-mono text-[#8a8a86]">
            <button className="hover:text-[#FFB100] transition-colors flex items-center gap-1">
              <ThumbsUp className="w-3.5 h-3.5" />
              Like
            </button>
            <button className="hover:text-[#FFB100] transition-colors flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              Comment
            </button>
            <button className="hover:text-[#FFB100] transition-colors flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Tone indicator */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <span className="inline-block px-2.5 py-1 bg-[#0e0e0d] border border-white/10 text-xs text-[#8a8a86]">
          TONE: <span className="text-[#FFB100] uppercase font-bold">{post.tone}</span>
        </span>
      </div>
    </div>
  );
}
