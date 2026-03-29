import { Link } from "wouter";

export interface FooterLinkItem {
  label: string;
  href?: string;
  id?: string;
}

interface Props {
  links: FooterLinkItem[];
  className?: string;
}

export default function FooterBar({ links, className }: Props) {
  const linkStyle: React.CSSProperties = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.6rem",
    letterSpacing: "0.18em",
    color: "var(--t-text-muted)",
    textDecoration: "none",
    textTransform: "uppercase",
    transition: "color 0.2s",
  };

  return (
    <div
      className={className}
      style={{
        borderTop: "1px solid var(--t-border)",
        padding: "1.5rem 0",
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
          {links.map((item) => {
            if (item.id) {
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id!)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-text-muted)")}
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link
                key={item.href || ""}
                href={item.href || ""}
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-text-muted)")}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/impressum"
            style={linkStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-text-muted)")}
          >
            Impressum
          </Link>
        </div>
      </div>
    </div>
  );
}
