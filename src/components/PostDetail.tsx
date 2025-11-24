"use client";

import { useEffect } from "react";
import { useBlogPost, type SupportedLanguage } from "@blogflow/sdk/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { X } from "lucide-react";
import { SocialShareToolbar } from "./SocialShareToolbar";

interface PostDetailProps {
  slug: string;
  language: SupportedLanguage;
  onClose: () => void;
}

export function PostDetail({ slug, language, onClose }: PostDetailProps) {
  const { post, loading, error } = useBlogPost(slug, {
    lang: language,
    autoFetch: true,
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/posts/${slug}`
      : slug;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden border"
        style={{
          backgroundColor: "var(--blogflow-bg, #0f172a)",
          borderColor: "var(--blogflow-border, rgba(148, 163, 184, 0.3))",
          color: "var(--blogflow-text, #e2e8f0)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors hover:opacity-80"
          style={{
            backgroundColor: "var(--blogflow-bg-hover, rgba(255,255,255,0.1))",
            color: "var(--blogflow-text, #e2e8f0)",
          }}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content area */}
        <div className="overflow-y-auto max-h-[90vh] p-6 md:p-8">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div
                className="h-12 w-12 animate-spin rounded-full border-4"
                style={{
                  borderColor: "var(--blogflow-border, rgba(255,255,255,0.2))",
                  borderTopColor: "var(--blogflow-primary, #38bdf8)",
                }}
              />
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-8 text-center">
              <p className="text-lg font-medium text-red-400">
                {language === "zh" ? "加载失败" : "Failed to load"}: {error}
              </p>
            </div>
          )}

          {!loading && !error && post && (
            <article>
              {/* Social share toolbar - top */}
              <SocialShareToolbar
                url={shareUrl}
                title={post.title}
                description={post.excerpt || ""}
                language={language}
                position="top"
              />

              {/* Article header */}
              <header className="mb-8 mt-8">
                {/* Category tag */}
                {post.category && (
                  <div className="mb-4">
                    <span
                      className="inline-block rounded-full px-4 py-1 text-sm font-semibold"
                      style={{
                        backgroundColor: "var(--blogflow-primary, #06b6d4)",
                        color: "var(--blogflow-text, #ffffff)",
                      }}
                    >
                      {post.category}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1
                  className="mb-4 text-3xl md:text-4xl font-bold"
                  style={{ color: "var(--blogflow-text, #ffffff)" }}
                >
                  {post.title}
                </h1>

                {/* Meta information */}
                <div
                  className="flex flex-wrap items-center gap-4 text-sm"
                  style={{ color: "var(--blogflow-text-secondary, #9ca3af)" }}
                >
                  {post.created_at && (
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <time>
                        {new Date(post.created_at).toLocaleDateString(
                          language === "zh" ? "zh-CN" : "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                {post.excerpt && (
                  <p
                    className="mt-6 text-lg"
                    style={{ color: "var(--blogflow-text-secondary, #d1d5db)" }}
                  >
                    {post.excerpt}
                  </p>
                )}
              </header>

              {/* Featured image */}
              {post.featured_image_url && (
                <div className="mb-8 overflow-hidden rounded-xl">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="h-auto w-full object-cover"
                  />
                </div>
              )}

              {/* Markdown content */}
              <div className="prose prose-lg max-w-none prose-invert">
                <style jsx global>{`
                  .prose {
                    --tw-prose-body: var(--blogflow-text, #e2e8f0);
                    --tw-prose-headings: var(--blogflow-text, #ffffff);
                    --tw-prose-lead: var(--blogflow-text-secondary, #9ca3af);
                    --tw-prose-links: var(--blogflow-primary, #38bdf8);
                    --tw-prose-bold: var(--blogflow-text, #ffffff);
                    --tw-prose-counters: var(--blogflow-text-secondary, #9ca3af);
                    --tw-prose-bullets: var(--blogflow-text-secondary, #9ca3af);
                    --tw-prose-hr: var(--blogflow-border, rgba(148, 163, 184, 0.3));
                    --tw-prose-quotes: var(--blogflow-text, #e2e8f0);
                    --tw-prose-quote-borders: var(--blogflow-border, rgba(148, 163, 184, 0.3));
                    --tw-prose-captions: var(--blogflow-text-secondary, #9ca3af);
                    --tw-prose-code: var(--blogflow-text, #e2e8f0);
                    --tw-prose-pre-code: var(--blogflow-text, #e2e8f0);
                    --tw-prose-pre-bg: var(--blogflow-bg-hover, rgba(255,255,255,0.05));
                    --tw-prose-th-borders: var(--blogflow-border, rgba(148, 163, 184, 0.3));
                    --tw-prose-td-borders: var(--blogflow-border, rgba(148, 163, 184, 0.3));
                  }
                  .prose a {
                    color: var(--blogflow-primary, #38bdf8);
                  }
                  .prose a:hover {
                    opacity: 0.8;
                  }
                  .prose code {
                    background-color: var(--blogflow-bg-hover, rgba(255,255,255,0.1));
                    padding: 0.2em 0.4em;
                    border-radius: 0.25rem;
                    color: var(--blogflow-text, #e2e8f0);
                  }
                  .prose pre {
                    background-color: var(--blogflow-bg-hover, rgba(255,255,255,0.05));
                    border: 1px solid var(--blogflow-border, rgba(148, 163, 184, 0.3));
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                  }
                  .prose pre code {
                    background-color: transparent;
                    padding: 0;
                  }
                  .prose img {
                    border-radius: 0.5rem;
                    max-width: 100%;
                    height: auto;
                  }
                  .prose h1,
                  .prose h2,
                  .prose h3,
                  .prose h4,
                  .prose h5,
                  .prose h6 {
                    color: var(--blogflow-text, #ffffff);
                    font-weight: 700;
                  }
                  .prose p {
                    color: var(--blogflow-text, #e2e8f0);
                  }
                  .prose strong {
                    color: var(--blogflow-text, #ffffff);
                    font-weight: 600;
                  }
                  .prose blockquote {
                    border-left-color: var(--blogflow-primary, #38bdf8);
                    color: var(--blogflow-text-secondary, #9ca3af);
                  }
                  .prose table {
                    border-color: var(--blogflow-border, rgba(148, 163, 184, 0.3));
                  }
                  .prose th {
                    border-color: var(--blogflow-border, rgba(148, 163, 184, 0.3));
                    color: var(--blogflow-text, #ffffff);
                  }
                  .prose td {
                    border-color: var(--blogflow-border, rgba(148, 163, 184, 0.3));
                    color: var(--blogflow-text, #e2e8f0);
                  }
                `}</style>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Social share toolbar - bottom */}
              <SocialShareToolbar
                url={shareUrl}
                title={post.title}
                description={post.excerpt || ""}
                language={language}
                position="bottom"
              />
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

