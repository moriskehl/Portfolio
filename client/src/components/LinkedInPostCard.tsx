/**
 * LinkedInPostCard — self-hosted stand-in for the LinkedIn embed iframe.
 * No request goes to LinkedIn until the visitor clicks through, so there is
 * no cookie banner and no third-party cookies.
 */
import { useState } from "react";
import { ThumbsUp, MessageSquareText, Share2, ChevronLeft, ChevronRight } from "lucide-react";

export interface LinkedInPost {
  /** Link to the original post on LinkedIn */
  url: string;
  author: string;
  authorUrl: string;
  /** Short text for the round avatar when no logo file is given */
  authorInitials: string;
  /** Optional logo in client/public, e.g. "/linkedin/ssc-logo.png" */
  authorLogo?: string;
  authorMeta: string;
  age: string;
  /** Paragraphs of the post text */
  text: string[];
  hashtags?: string[];
  /** Images in client/public; several entries become a swipeable document like on LinkedIn */
  images?: string[];
  imageAlt?: string;
  reactions?: number;
  comments?: number;
}

const LI_BLUE = "#0a66c2";
const TEXT = "rgba(0,0,0,0.9)";
const MUTED = "rgba(0,0,0,0.6)";
const FONT =
  '-apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Arial, sans-serif';

const LinkedInLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill={LI_BLUE}
      d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
    />
  </svg>
);

const pageBtnStyle: React.CSSProperties = {
  position: "absolute", top: "50%", transform: "translateY(-50%)",
  width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  background: "rgba(0,0,0,0.6)", color: "#fff",
};

const linkProps = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function LinkedInPostCard({ post }: { post: LinkedInPost }) {
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(0);
  const images = post.images ?? [];
  const [logoOk, setLogoOk] = useState(true);

  const actions = [
    { label: "Gefällt mir", Icon: ThumbsUp },
    { label: "Kommentieren", Icon: MessageSquareText },
    { label: "Teilen", Icon: Share2 },
  ];

  return (
    <article
      style={{
        width: "100%",
        background: "#fff",
        color: TEXT,
        fontFamily: FONT,
        fontSize: 14,
        lineHeight: 1.45,
        textAlign: "left",
      }}
    >
      {/* Header */}
      <header style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "12px 16px 0" }}>
        <a href={post.authorUrl} {...linkProps} style={{ flexShrink: 0 }} aria-label={post.author}>
          {post.authorLogo && logoOk ? (
            <img
              src={post.authorLogo}
              alt=""
              width={48}
              height={48}
              onError={() => setLogoOk(false)}
              style={{ display: "block", objectFit: "contain" }}
            />
          ) : (
            <span
              style={{
                width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center",
                background: "#e8f0f8", color: LI_BLUE, fontWeight: 700, fontSize: 15,
              }}
            >
              {post.authorInitials}
            </span>
          )}
        </a>
        <div style={{ flex: 1, minWidth: 0 }}>
          <a
            href={post.authorUrl}
            {...linkProps}
            style={{ color: TEXT, fontWeight: 600, textDecoration: "none", display: "block" }}
          >
            {post.author}
          </a>
          <div style={{ color: MUTED, fontSize: 12 }}>{post.authorMeta}</div>
          <div style={{ color: MUTED, fontSize: 12 }}>{post.age}</div>
        </div>
        <a href={post.url} {...linkProps} aria-label="LinkedIn" style={{ flexShrink: 0 }}>
          <LinkedInLogo />
        </a>
      </header>

      {/* Text */}
      <div style={{ padding: "8px 16px 0" }}>
        <div
          style={
            expanded
              ? undefined
              : {
                  display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                  // Always reserve three lines so every collapsed card has the same height
                  minHeight: "calc(3 * 1.45em)",
                }
          }
        >
          {post.text.map((p, i) => (
            <p key={i} style={{ margin: i === 0 ? 0 : "0.6em 0 0" }}>{p}</p>
          ))}
          {post.hashtags && post.hashtags.length > 0 && (
            <p style={{ margin: "0.6em 0 0" }}>
              {post.hashtags.map((h) => (
                <a
                  key={h}
                  href={`https://www.linkedin.com/feed/hashtag/${encodeURIComponent(h.toLowerCase())}`}
                  {...linkProps}
                  style={{ color: LI_BLUE, fontWeight: 600, textDecoration: "none", marginRight: 6 }}
                >
                  #{h}
                </a>
              ))}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          style={{
            display: "block", marginLeft: "auto", background: "none", border: "none", padding: "2px 0",
            color: MUTED, fontFamily: FONT, fontSize: 14, cursor: "pointer",
          }}
        >
          {expanded ? "weniger anzeigen" : "…mehr"}
        </button>
      </div>

      {/* Image / document pages */}
      {images.length > 0 && (
        <div style={{ position: "relative", marginTop: 8, background: "#f3f2ef" }}>
          <a href={post.url} {...linkProps} style={{ display: "block" }}>
            <img
              src={images[page]}
              alt={post.imageAlt ?? ""}
              loading="lazy"
              // Fixed 4:3 box: all cards are the same size, so swapping never shifts the page
              style={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "contain" }}
            />
          </a>
          {images.length > 1 && (
            <>
              {page > 0 && (
                <button type="button" onClick={() => setPage(page - 1)} aria-label="Vorherige Seite" style={{ ...pageBtnStyle, left: 8 }}>
                  <ChevronLeft size={20} />
                </button>
              )}
              {page < images.length - 1 && (
                <button type="button" onClick={() => setPage(page + 1)} aria-label="Nächste Seite" style={{ ...pageBtnStyle, right: 8 }}>
                  <ChevronRight size={20} />
                </button>
              )}
              <span
                style={{
                  position: "absolute", left: 8, bottom: 8, padding: "2px 8px", borderRadius: 4,
                  background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 12,
                }}
              >
                {page + 1} / {images.length}
              </span>
            </>
          )}
        </div>
      )}

      {/* Counts */}
      {(post.reactions != null || post.comments != null) && (
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "8px 16px", color: MUTED, fontSize: 12,
          }}
        >
          <a href={post.url} {...linkProps} style={{ color: MUTED, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            {post.reactions != null && (
              <>
                <span
                  style={{
                    width: 16, height: 16, borderRadius: "50%", background: "#378fe9",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <ThumbsUp size={9} color="#fff" fill="#fff" />
                </span>
                {post.reactions}
              </>
            )}
          </a>
          {post.comments != null && (
            <a href={post.url} {...linkProps} style={{ color: MUTED, textDecoration: "none" }}>
              {post.comments} {post.comments === 1 ? "Kommentar" : "Kommentare"}
            </a>
          )}
        </div>
      )}

      {/* Actions — like the embed, each one opens the post on LinkedIn */}
      <div style={{ display: "flex", borderTop: "1px solid rgba(0,0,0,0.08)", margin: "0 16px", padding: "4px 0 8px" }}>
        {actions.map(({ label, Icon }) => (
          <a
            key={label}
            href={post.url}
            {...linkProps}
            style={{
              display: "flex", alignItems: "center", gap: 6, padding: "10px 12px 10px 0", marginRight: 12,
              color: MUTED, fontWeight: 600, fontSize: 14, textDecoration: "none",
            }}
          >
            <Icon size={18} />
            {label}
          </a>
        ))}
      </div>
    </article>
  );
}
