/*
 * SubPageFooter — Minimal footer bar for sub-pages
 * Matches the bottom bar from ContactFooter but standalone
 */

import { Link } from "wouter";

const LINKS = [
  { label: "Projekte", href: "/projects" },
  { label: "Erfolge", href: "/achievements" },
  { label: "Werdegang", href: "/cv" },
];

export default function SubPageFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "1.5rem 0",
        background: "#000",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.18)",
          }}
        >
          © {new Date().getFullYear()} Moris Kehl
        </span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.18)",
                textDecoration: "none",
                textTransform: "uppercase" as const,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.color = "#3b82f6")
              }
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.18)")
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
