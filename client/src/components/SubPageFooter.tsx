/*
 * SubPageFooter — Minimal footer bar for sub-pages
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
        borderTop: "1px solid var(--t-border)",
        padding: "1.5rem 0",
        background: "var(--t-bg)",
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
            color: "var(--t-text-micro)",
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
                color: "var(--t-text-muted)",
                textDecoration: "none",
                textTransform: "uppercase" as const,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.color = "var(--t-accent)")
              }
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                (e.currentTarget.style.color = "var(--t-text-muted)")
              }
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/impressum"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              color: "var(--t-text-muted)",
              textDecoration: "none",
              textTransform: "uppercase" as const,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
              (e.currentTarget.style.color = "var(--t-accent)")
            }
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
              (e.currentTarget.style.color = "var(--t-text-muted)")
            }
          >
            Impressum
          </Link>
        </div>
      </div>
    </footer>
  );
}
