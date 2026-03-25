/*
 * Footer — "Digital Descent"
 * Minimal, terminal-style. Left: copyright. Right: nav links.
 */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-8"
      style={{ borderTop: "1px solid rgba(125,249,255,0.08)" }}
    >
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.15em",
            color: "rgba(232,244,248,0.25)",
          }}
        >
          © {year} Alex Nordic — Built with Three.js + React
        </p>

        <div className="flex items-center gap-6">
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                color: "rgba(232,244,248,0.25)",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#7DF9FF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,244,248,0.25)")}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
