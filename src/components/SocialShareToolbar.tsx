"use client";

import { useState } from "react";
import {
  Facebook,
  Linkedin,
  Link as LinkIcon,
  Check,
  Share2,
  Heart,
} from "lucide-react";
import type { SupportedLanguage } from "@blogflow/sdk/react";

interface SocialShareToolbarProps {
  url: string;
  title: string;
  description?: string;
  language?: SupportedLanguage;
  position?: "top" | "bottom";
}

const LABELS: Record<
  SupportedLanguage | "en",
  { share: string; copyLink: string; copied: string; shareOn: string }
> = {
  en: { share: "Share", copyLink: "Copy Link", copied: "Copied!", shareOn: "Share on" },
  zh: { share: "分享", copyLink: "复制链接", copied: "已复制！", shareOn: "分享到" },
  es: { share: "Compartir", copyLink: "Copiar enlace", copied: "¡Copiado!", shareOn: "Compartir en" },
  fr: { share: "Partager", copyLink: "Copier le lien", copied: "Copié !", shareOn: "Partager sur" },
  de: { share: "Teilen", copyLink: "Link kopieren", copied: "Kopiert!", shareOn: "Teilen auf" },
  ja: { share: "共有", copyLink: "リンクをコピー", copied: "コピーしました", shareOn: "共有先" },
  ko: { share: "공유", copyLink: "링크 복사", copied: "복사됨!", shareOn: "공유" },
};

export function SocialShareToolbar({
  url,
  title,
  description = "",
  language = "en",
  position = "bottom",
}: SocialShareToolbarProps) {
  const [copied, setCopied] = useState(false);
  const labels = LABELS[language] || LABELS.en;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
      title
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    xiaohongshu: `https://www.xiaohongshu.com/explore?source=web_share&url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const buttonBaseStyle = {
    backgroundColor: "var(--blogflow-bg-hover, rgba(255, 255, 255, 0.05))",
    color: "var(--blogflow-text, #ffffff)",
    border: "1px solid var(--blogflow-border, rgba(255, 255, 255, 0.1))",
  };

  return (
    <div
      className={
        position === "top"
          ? "mb-8 pb-8 border-b"
          : "mt-8 pt-8 border-t"
      }
      style={{ borderColor: "var(--blogflow-border, rgba(255, 255, 255, 0.1))" }}
    >
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Share2
            className="w-5 h-5"
            style={{ color: "var(--blogflow-text-secondary, #9ca3af)" }}
          />
          <span
            className="text-sm font-medium"
            style={{ color: "var(--blogflow-text-secondary, #9ca3af)" }}
          >
            {labels.share}:
          </span>
        </div>

        <button
          onClick={() => handleShare("facebook")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={buttonBaseStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--blogflow-bg-hover, rgba(255, 255, 255, 0.1))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--blogflow-bg-hover, rgba(255, 255, 255, 0.05))";
          }}
          aria-label={`${labels.shareOn} Facebook`}
        >
          <Facebook className="w-4 h-4" style={{ color: "#1877F2" }} />
          <span className="text-sm">Facebook</span>
        </button>

        <button
          onClick={() => handleShare("x")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={buttonBaseStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--blogflow-bg-hover, rgba(255, 255, 255, 0.1))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--blogflow-bg-hover, rgba(255, 255, 255, 0.05))";
          }}
          aria-label={`${labels.shareOn} X`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-sm">X</span>
        </button>

        <button
          onClick={() => handleShare("linkedin")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={buttonBaseStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--blogflow-bg-hover, rgba(255, 255, 255, 0.1))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--blogflow-bg-hover, rgba(255, 255, 255, 0.05))";
          }}
          aria-label={`${labels.shareOn} LinkedIn`}
        >
          <Linkedin className="w-4 h-4" style={{ color: "#0A66C2" }} />
          <span className="text-sm">LinkedIn</span>
        </button>

        <button
          onClick={() => handleShare("xiaohongshu")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={buttonBaseStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--blogflow-bg-hover, rgba(255, 255, 255, 0.1))";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--blogflow-bg-hover, rgba(255, 255, 255, 0.05))";
          }}
          aria-label="Share on Xiaohongshu"
        >
          <Heart className="w-4 h-4" style={{ color: "#FF2442" }} />
          <span className="text-sm">
            {language === "zh" ? "小红书" : "Xiaohongshu"}
          </span>
        </button>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={{
            ...buttonBaseStyle,
            backgroundColor: copied
              ? "var(--blogflow-primary, #06b6d4)"
              : buttonBaseStyle.backgroundColor,
            color: copied ? "#ffffff" : buttonBaseStyle.color,
          }}
          aria-label={labels.copyLink}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-sm">{labels.copied}</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-4 h-4" />
              <span className="text-sm">{labels.copyLink}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}


