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
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 h-full flex flex-col gap-4">
        <div className="space-y-4 animate-pulse">
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-zinc-800 rounded-full" />
            <div className="flex-1">
              <div className="h-4 w-24 bg-zinc-800 rounded mb-2" />
              <div className="h-3 w-16 bg-zinc-800 rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-zinc-800 rounded w-full" />
            <div className="h-3 bg-zinc-800 rounded w-5/6" />
            <div className="h-3 bg-zinc-800 rounded w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 h-full flex flex-col items-center justify-center text-center">
        <FileText className="w-12 h-12 text-zinc-500 mb-3" />
        <p className="text-zinc-400">
          Your generated LinkedIn post will appear here
        </p>
        <p className="text-xs text-zinc-600 mt-2">
          Fill in the form and click "Generate Post"
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 h-full overflow-y-auto">
      {/* LinkedIn-style post preview */}
      <div className="space-y-4">
        {/* Header */}
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shrink-0" />
          <div>
            <div className="font-semibold text-zinc-100">Your Name</div>
            <div className="text-xs text-zinc-500 flex items-center gap-1">
              @yourprofile • 1s •
              <Globe className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
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
                  className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          )}

          {/* Engagement Preview */}
          <div className="pt-4 border-t border-zinc-800 flex gap-4 text-xs text-zinc-500">
            <button className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" />
              Like
            </button>
            <button className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              Comment
            </button>
            <button className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Tone indicator */}
      <div className="mt-4 pt-4 border-t border-zinc-800">
        <span className="inline-block px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-400">
          Tone: <span className="text-emerald-400 capitalize">{post.tone}</span>
        </span>
      </div>
    </div>
  );
}
