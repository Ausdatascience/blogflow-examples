"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  BlogFlowProvider,
  BlogPostList,
  BlogSearch,
  Pagination,
  type PaginationVariant,
  useBlogPosts,
  type SupportedLanguage,
} from "@blogflow/sdk/react";
import type { V2PostListItem } from "@blogflow/sdk/core";
import { PostDetail } from "@/components/PostDetail";

export interface SiteConfig {
  title: string;
  description?: string;
  theme: string;
  viewMode: string;
  language: SupportedLanguage;
  paginationVariant: PaginationVariant;
  pageSize: number;
  revalidateSeconds?: number;
  search?: { enabled: boolean };
  card: {
    borderWidth: number;
    borderRadius: number;
    borderColor?: string | null;
    shadow: number;
  };
  content: {
    showExcerpt: boolean;
    showCategory: boolean;
    showDate: boolean;
    showListTitle: boolean;
    showCardTitle: boolean;
  };
}

interface ClientProps {
  initialPosts: V2PostListItem[];
  initialTotalCount: number;
  initialTotalPages: number;
  initialPage: number;
  config: SiteConfig;
}

export function Client({
  initialPosts,
  initialTotalCount,
  initialTotalPages,
  initialPage,
  config,
}: ClientProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const searchEnabled = config.search?.enabled ?? false;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (searchEnabled) {
      setCurrentPage(1);
    }
  }, [searchEnabled, searchTerm]);

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
          theme: config.theme as any,
          autoInject: true,
          cardBorderWidth: `${config.card.borderWidth}px`,
          cardBorderRadius: `${config.card.borderRadius}rem`,
          cardBorderColor: config.card.borderColor || undefined,
          cardShadow: config.card.shadow,
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
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <header className="mb-8 text-center space-y-2">
            <h1 className="text-4xl font-bold" style={{ color: "var(--blogflow-text, #0f172a)" }}>
              {config.title}
            </h1>
            {config.description && (
              <p className="text-lg" style={{ color: "var(--blogflow-text-secondary, #475569)" }}>
                {config.description}
              </p>
            )}
          </header>

          <BlogContent
            initialPosts={initialPosts}
            initialTotalCount={initialTotalCount}
            initialTotalPages={initialTotalPages}
            initialPage={initialPage}
            language={config.language}
            viewMode={config.viewMode}
            paginationVariant={config.paginationVariant}
            pageSize={config.pageSize}
            showExcerpt={config.content.showExcerpt}
            showCategory={config.content.showCategory}
            showDate={config.content.showDate}
            showTitle={config.content.showListTitle}
            showCardTitle={config.content.showCardTitle}
            searchEnabled={searchEnabled}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPostClick={handlePostClick}
          />

                {isMounted && isModalOpen && selectedSlug
                  ? createPortal(
                      <PostDetail slug={selectedSlug} language={config.language} onClose={handleCloseModal} />,
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
  initialTotalPages,
  initialPage,
  language,
  viewMode,
  paginationVariant,
  pageSize,
  showExcerpt,
  showCategory,
  showDate,
  showTitle,
  showCardTitle,
  searchEnabled,
  searchTerm,
  onSearchChange,
  currentPage,
  onPageChange,
  onPostClick,
}: {
  initialPosts: V2PostListItem[];
  initialTotalCount: number;
  initialTotalPages: number;
  initialPage: number;
  language: SupportedLanguage;
  viewMode: string;
  paginationVariant: PaginationVariant;
  pageSize: number;
  showExcerpt: boolean;
  showCategory: boolean;
  showDate: boolean;
  showTitle: boolean;
  showCardTitle: boolean;
  searchEnabled: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  onPostClick?: (slug: string) => void;
}) {
  // 判断是否需要客户端获取数据（用户交互时）
  // 初始加载时使用服务器端数据，避免重复请求
  const needsClientFetch =
    currentPage !== initialPage || // 用户切换了页码
    searchTerm !== "" || // 用户进行了搜索
    false; // 初始加载时使用服务器端数据

  // 只在需要时才进行客户端获取（避免重复请求初始数据）
  const { posts, loading, error, totalCount, totalPages } = useBlogPosts({
    lang: language,
    page: currentPage,
    pageSize,
    autoFetch: needsClientFetch, // 只在用户交互时自动获取
    search: searchEnabled ? searchTerm || undefined : undefined,
    searchFields: searchEnabled && searchTerm ? ["title", "excerpt", "category"] : undefined,
  });

  // 优先使用客户端获取的数据，否则使用服务器端初始数据
  const effectivePosts = posts.length > 0 ? posts : initialPosts;
  const effectiveTotalCount = totalCount ?? initialTotalCount;
  const effectiveTotalPages =
    totalPages ??
    (initialTotalPages > 0
      ? initialTotalPages
      : Math.max(1, Math.ceil(initialTotalCount / pageSize)));

  return (
    <>
      {searchEnabled && (
        <div className="mb-6">
          <BlogSearch
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            language={language}
            placeholder="Search by title, excerpt, or category..."
            showLanguageToggle={false}
            onLanguageChange={() => {}}
            resultCount={effectivePosts.length}
            totalCount={effectiveTotalCount}
            showTitle={false}
            showCount={false}
          />
        </div>
      )}

      {error && (
        <div className="mb-8 p-4 rounded-lg border border-red-200 bg-red-50">
          <p className="text-red-700">Error: {error}</p>
          <p className="text-sm text-red-500 mt-2">
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
              viewMode={viewMode as any}
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

