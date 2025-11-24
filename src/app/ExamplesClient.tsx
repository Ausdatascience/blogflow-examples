"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  BlogFlowProvider,
  BlogPostList,
  BlogSearch,
  Pagination,
  type PaginationVariant,
  useBlogPost,
  useBlogPosts,
  type SupportedLanguage,
} from "@blogflow/sdk/react";
import { SocialShareToolbar } from "@/components/SocialShareToolbar";
import type { V2PostListItem } from "@blogflow/sdk/core";
import { Search, X } from "lucide-react";

type ThemeName =
  | "default"
  | "blue"
  | "minimal"
  | "modern"
  | "dark"
  | "magic"
  | "fantasy"
  | "adventure"
  | "tomorrow"
  | "mainstreet"
  | "eyecare"
  | "purewhite"
  | "pureblack"
  | "cyanblue"
  | "violet"
  | "cardinal";

type ViewMode =
  | "grid"
  | "card"
  | "list"
  | "masonry"
  | "waterfall"
  | "magazine"
  | "dense"
  | "timeline"
  | "fullscreen"
  | "fast"
  | "modern"
  | "carousel";

const THEME_OPTIONS: Array<{ value: ThemeName; label: string }> = [
  { value: "default", label: "Default" },
  { value: "blue", label: "Blue" },
  { value: "minimal", label: "Minimal" },
  { value: "modern", label: "Modern" },
  { value: "dark", label: "Dark" },
  { value: "magic", label: "Magic Kingdom" },
  { value: "fantasy", label: "Fantasy" },
  { value: "adventure", label: "Adventure" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "mainstreet", label: "Main Street" },
  { value: "eyecare", label: "Eye Care" },
  { value: "purewhite", label: "Pure White" },
  { value: "pureblack", label: "Pure Black" },
  { value: "cyanblue", label: "Cyan Blue" },
  { value: "violet", label: "Violet Gradient" },
  { value: "cardinal", label: "Cardinal Gradient" },
];

const VIEW_MODE_OPTIONS: Array<{ value: ViewMode; label: string }> = [
  { value: "card", label: "Card" },
  { value: "list", label: "List" },
  { value: "grid", label: "Grid" },
  { value: "masonry", label: "Masonry (CSS)" },
  { value: "waterfall", label: "Waterfall (JS)" },
  { value: "magazine", label: "Magazine" },
  { value: "dense", label: "Dense" },
  { value: "timeline", label: "Timeline" },
  { value: "fullscreen", label: "Fullscreen" },
  { value: "fast", label: "Fast" },
  { value: "modern", label: "Modern" },
  { value: "carousel", label: "Carousel" },
];

const LANGUAGE_OPTIONS: Array<{ value: SupportedLanguage; label: string }> = [
  { value: "en", label: "English" },
  { value: "zh", label: "Chinese" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
];

const PAGINATION_VARIANT_OPTIONS: Array<{ value: PaginationVariant; label: string }> = [
  { value: "text", label: "Text" },
  { value: "icon", label: "Icon" },
  { value: "mixed", label: "Mixed" },
  { value: "simple", label: "Simple" },
];

interface ExamplesClientProps {
  initialPosts: V2PostListItem[];
  initialTotalCount: number;
  initialTotalPages: number;
  initialPage: number;
}

export function ExamplesClient({
  initialPosts,
  initialTotalCount,
  initialTotalPages,
  initialPage,
}: ExamplesClientProps) {
  const [theme, setTheme] = useState<ThemeName>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const [paginationVariant, setPaginationVariant] = useState<PaginationVariant>("icon");

  const [cardBorderWidth, setCardBorderWidth] = useState(1);
  const [cardBorderRadius, setCardBorderRadius] = useState(0.75);
  const [cardBorderColor, setCardBorderColor] = useState("");
  const [cardShadow, setCardShadow] = useState(1);

  const [showExcerpt, setShowExcerpt] = useState(true);
  const [showCategory, setShowCategory] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [showCardTitle, setShowCardTitle] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [accordionState, setAccordionState] = useState({
    appearance: true,
    content: true,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, language]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  const handlePostClick = (slug: string) => {
    setSelectedSlug(slug);
    setIsModalOpen(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSlug(null);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  };

  return (
    <BlogFlowProvider
      config={{
        apiKey: process.env.NEXT_PUBLIC_BLOGFLOW_API_KEY || "",
        styles: {
          theme,
          autoInject: true,
          cardBorderWidth: `${cardBorderWidth}px`,
          cardBorderRadius: `${cardBorderRadius}rem`,
          cardBorderColor: cardBorderColor || undefined,
          cardShadow,
        },
      }}
    >
      <div
        className="min-h-screen transition-colors duration-300"
        style={{
          background: "var(--blogflow-bg, #f8fafc)",
          color: "var(--blogflow-text, #0f172a)",
        }}
      >
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <header className="mb-8">
            <h1
              className="text-4xl font-bold mb-2"
              style={{ color: "var(--blogflow-text, #0f172a)" }}
            >
              BlogFlow SDK Examples
            </h1>
            <p
              className="text-lg"
              style={{ color: "var(--blogflow-text-secondary, #475569)" }}
            >
              Explore the React components and card styling APIs.
            </p>
          </header>

          <div className="mb-8 space-y-4">
            <AccordionSection
              title="Appearance"
              isOpen={accordionState.appearance}
              onToggle={() =>
                setAccordionState((prev) => ({
                  ...prev,
                  appearance: !prev.appearance,
                }))
              }
            >
              <div className="flex justify-center">
                <div
                  className="inline-flex flex-wrap items-end gap-4 px-4 py-3 rounded-lg border transition-colors"
                  style={{
                    backgroundColor: "var(--blogflow-bg-hover, rgba(5, 13, 31, 0.5))",
                    borderColor: "var(--blogflow-border, #1f2937)",
                  }}
                >
                  <SelectControl
                    label="Theme"
                    value={theme}
                    options={THEME_OPTIONS}
                    onChange={(value) => setTheme(value as ThemeName)}
                  />
                  <SelectControl
                    label="View Mode"
                    value={viewMode}
                    options={VIEW_MODE_OPTIONS}
                    onChange={(value) => setViewMode(value as ViewMode)}
                  />
                  <SelectControl
                    label="Content Language"
                    value={language}
                    options={LANGUAGE_OPTIONS}
                    onChange={(value) => setLanguage(value as SupportedLanguage)}
                  />
                <SelectControl
                  label="Pagination Style"
                  value={paginationVariant}
                  options={PAGINATION_VARIANT_OPTIONS}
                  onChange={(value) => setPaginationVariant(value as PaginationVariant)}
                />
                  <RangeInput
                    label={`Border Width: ${cardBorderWidth}px`}
                    min={0}
                    max={10}
                    step={1}
                    value={cardBorderWidth}
                    onChange={setCardBorderWidth}
                  />
                  <ColorInput
                    label="Border Color"
                    value={cardBorderColor}
                    onChange={setCardBorderColor}
                  />
                  <RangeInput
                    label={`Border Radius: ${cardBorderRadius}rem`}
                    min={0}
                    max={3}
                    step={0.25}
                    value={cardBorderRadius}
                    onChange={setCardBorderRadius}
                  />
                  <RangeInput
                    label={`Shadow Intensity: ${cardShadow}${
                      cardShadow === 0 ? " (off)" : ""
                    }`}
                    min={0}
                    max={10}
                    step={1}
                    value={cardShadow}
                    onChange={setCardShadow}
                  />
                <button
                  onClick={() => setShowSearchBar((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border transition-colors"
                  style={{
                    backgroundColor: showSearchBar
                      ? "var(--blogflow-primary, #06b6d4)"
                      : "transparent",
                    color: "var(--blogflow-text, #ffffff)",
                    borderColor: "var(--blogflow-border, #1f2937)",
                  }}
                >
                  {showSearchBar ? (
                    <>
                      <X className="w-4 h-4" />
                      Hide Search
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Show Search
                    </>
                  )}
                </button>
                </div>
              </div>
            </AccordionSection>

            <AccordionSection
              title="Content Options"
              isOpen={accordionState.content}
              onToggle={() =>
                setAccordionState((prev) => ({
                  ...prev,
                  content: !prev.content,
                }))
              }
            >
              <div className="flex justify-center">
                <div
                  className="inline-flex flex-wrap gap-4 px-4 py-3 rounded-lg border transition-colors"
                  style={{
                    backgroundColor: "var(--blogflow-bg-hover, rgba(5, 13, 31, 0.5))",
                    borderColor: "var(--blogflow-border, #1f2937)",
                  }}
                >
                  <ToggleInput
                    inputId="showExcerpt"
                    label="Show excerpt"
                    checked={showExcerpt}
                    onChange={setShowExcerpt}
                  />
                  <ToggleInput
                    inputId="showCategory"
                    label="Show category"
                    checked={showCategory}
                    onChange={setShowCategory}
                  />
                  <ToggleInput
                    inputId="showDate"
                    label="Show date"
                    checked={showDate}
                    onChange={setShowDate}
                  />
                  <ToggleInput
                    inputId="showTitle"
                    label="Show list title"
                    checked={showTitle}
                    onChange={setShowTitle}
                  />
                  <ToggleInput
                    inputId="showCardTitle"
                    label="Show card title"
                    checked={showCardTitle}
                    onChange={setShowCardTitle}
                  />
                </div>
              </div>
            </AccordionSection>
          </div>

          <BlogContent
            initialPosts={initialPosts}
            initialTotalCount={initialTotalCount}
            language={language}
            viewMode={viewMode}
            paginationVariant={paginationVariant}
            showExcerpt={showExcerpt}
            showCategory={showCategory}
            showDate={showDate}
            showTitle={showTitle}
            showCardTitle={showCardTitle}
            onPostClick={handlePostClick}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onLanguageChange={setLanguage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            showSearchBar={showSearchBar}
          />

          {isMounted && isModalOpen && selectedSlug
            ? createPortal(
                <PostModal
                  slug={selectedSlug}
                  language={language}
                  onClose={handleCloseModal}
                />,
                document.body
              )
            : null}
        </main>
      </div>
    </BlogFlowProvider>
  );
}

function BlogContent({
  initialPosts,
  initialTotalCount,
  language,
  viewMode,
  paginationVariant,
  showExcerpt,
  showCategory,
  showDate,
  showTitle,
  showCardTitle,
  onPostClick,
  searchTerm,
  onSearchChange,
  onLanguageChange,
  currentPage,
  onPageChange,
  showSearchBar,
}: {
  initialPosts: V2PostListItem[];
  initialTotalCount: number;
  language: SupportedLanguage;
  viewMode: ViewMode;
  paginationVariant: PaginationVariant;
  showExcerpt: boolean;
  showCategory: boolean;
  showDate: boolean;
  showTitle: boolean;
  showCardTitle: boolean;
  onPostClick?: (slug: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onLanguageChange: (lang: SupportedLanguage) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  showSearchBar: boolean;
}) {
  const { posts, loading, error, totalCount, totalPages } = useBlogPosts({
    lang: language,
    page: currentPage,
    pageSize: 12,
    autoFetch: true,
    search: searchTerm || undefined,
    searchFields: searchTerm ? ["title", "excerpt", "category"] : undefined,
  });

  const effectivePosts = posts.length > 0 ? posts : initialPosts;
  const effectiveTotalCount = totalCount ?? initialTotalCount;
  const effectiveTotalPages = totalPages ?? Math.max(1, Math.ceil(initialTotalCount / 12));

  return (
    <>
      {showSearchBar && (
        <div className="mb-6">
          <BlogSearch
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            language={language}
            placeholder="Search by title, excerpt, or category..."
            showLanguageToggle
            onLanguageChange={onLanguageChange}
            resultCount={posts.length}
            totalCount={initialTotalCount}
            showTitle={false}
            showCount={false}
          />
        </div>
      )}

      {error && (
        <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">Error: {error}</p>
          <p className="text-sm text-red-600 dark:text-red-300 mt-2">
            Make sure BLOGFLOW_API_KEY or NEXT_PUBLIC_BLOGFLOW_API_KEY is configured.
          </p>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-300 border-t-blue-500" />
        </div>
      )}

      {!loading && !error && (
        <div>
          {showTitle && (
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
              Posts ({effectivePosts.length})
            </h2>
          )}
          {effectiveTotalPages > 1 && (
            <div className="mb-4">
              <Pagination
                currentPage={currentPage}
                totalPages={effectiveTotalPages}
                totalCount={effectiveTotalCount}
                onPageChange={onPageChange}
                language={language}
                loading={loading}
                showInfo
                showQuickJump
                showFirstLast
                maxVisiblePages={5}
                variant={paginationVariant}
              />
            </div>
          )}
          <div className={showCardTitle ? "" : "bf-hide-card-title"}>
            <BlogPostList
              posts={effectivePosts}
              language={language}
              viewMode={viewMode}
              cardProps={{
                showExcerpt,
                showCategory,
                showDate,
              }}
              emptyMessage="No posts available"
              onPostClick={onPostClick}
            />
          </div>
          {effectiveTotalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={effectiveTotalPages}
                totalCount={effectiveTotalCount}
                onPageChange={onPageChange}
                language={language}
                loading={loading}
                showInfo
                showQuickJump
                showFirstLast
                maxVisiblePages={5}
                variant={paginationVariant}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

function PostModal({
  slug,
  language,
  onClose,
}: {
  slug: string;
  language: SupportedLanguage;
  onClose: () => void;
}) {
  const { post, loading, error } = useBlogPost(slug, {
    lang: language,
    autoFetch: true,
  });

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/posts/${slug}`
      : slug;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl transition-colors duration-300"
        style={{
          background: "var(--blogflow-bg, #0f172a)",
          borderColor: "var(--blogflow-border, rgba(148, 163, 184, 0.3))",
          color: "var(--blogflow-text, #e2e8f0)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full px-3 py-1 text-sm transition-colors"
          style={{
            background: "var(--blogflow-bg-hover, rgba(255,255,255,0.1))",
            color: "var(--blogflow-text, #e2e8f0)",
          }}
        >
          Close
        </button>

        <div className="p-6 md:p-8 space-y-6">
          {loading && (
            <div className="flex justify-center py-16">
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
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center">
              <p className="text-red-100">Failed to load article: {error}</p>
            </div>
          )}

          {!loading && !error && post && (
            <article className="space-y-4">
              <SocialShareToolbar
                url={shareUrl}
                title={post.title}
                description={post.excerpt || ""}
                language={language}
                position="top"
              />
              <div className="space-y-2">
                {post.category && (
                  <span
                    className="inline-block rounded-full px-4 py-1 text-sm font-semibold"
                    style={{
                      background: "var(--blogflow-category-bg, #1d4ed8)",
                      color: "var(--blogflow-category-text, #fff)",
                    }}
                  >
                    {post.category}
                  </span>
                )}
                <h1 className="text-3xl font-bold">{post.title}</h1>
                {post.created_at && (
                  <p
                    className="text-sm"
                    style={{ color: "var(--blogflow-text-secondary, #94a3b8)" }}
                  >
                    {new Date(post.created_at).toLocaleDateString(
                      language === "zh" ? "zh-CN" : "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </p>
                )}
              </div>

              {post.excerpt && (
                <p
                  className="text-lg"
                  style={{ color: "var(--blogflow-text-secondary, #cbd5f5)" }}
                >
                  {post.excerpt}
                </p>
              )}

              {post.featured_image_url && (
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full object-cover"
                  />
                </div>
              )}

              <div
                className="prose prose-invert max-w-none"
                style={{ color: "var(--blogflow-text, #e2e8f0)" }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
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

function AccordionSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="rounded-lg border transition-colors duration-300"
      style={{
        backgroundColor: "var(--blogflow-bg-hover, rgba(5, 13, 31, 0.5))",
        borderColor: "var(--blogflow-border, #1f2937)",
      }}
    >
      <button
        className="w-full flex items-center justify-between p-4 text-left text-sm font-medium hover:opacity-80 transition-opacity"
        style={{ color: "var(--blogflow-text, #ffffff)" }}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronIcon open={isOpen} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-4">{children}</div>
      </div>
    </div>
  );
}

function SelectControl({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function RangeInput({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || "#1f2937"}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 h-10 rounded-lg border border-zinc-300 dark:border-zinc-700 cursor-pointer"
        />
        <button
          onClick={() => onChange("")}
          className="px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700"
        >
          Use default
        </button>
      </div>
    </div>
  );
}

function ToggleInput({
  label,
  inputId,
  checked,
  onChange,
}: {
  label: string;
  inputId: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      htmlFor={inputId}
      className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300"
    >
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 rounded border-zinc-300 dark:border-zinc-700"
      />
      {label}
    </label>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}


