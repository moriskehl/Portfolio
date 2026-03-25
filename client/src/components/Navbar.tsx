/*
 * Navbar — Strict B/W/Blue
 * Transparent → black frosted on scroll.
 * Blue underline on active section.
 */

import { useEffect, useState } from "react";

const NAV = [
  { label: "Intro", href: "intro" },
  { label: "Grid", href: "grid" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const ids = ["intro", "grid", "contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(id);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="container flex items-center justify-between py-5">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, "hero")}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.95rem",
            letterSpacing: "0.12em",
            color: "#ffffff",
            textDecoration: "none",
          }}
        >
          MK<span style={{ color: "#3b82f6" }}>.</span>
        </a>

        {/* Links */}
        <ul className="flex items-center gap-8 list-none m-0 p-0">
          {NAV.map((item) => (
            <li key={item.label} className="hidden sm:block">
              <a
                href={`#${item.href}`}
                onClick={(e) => scrollTo(e, item.href)}
                className={`nav-link ${active === item.href ? "active" : ""}`}
                style={active === item.href ? { color: "#ffffff" } : {}}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "contact")}
              className="btn-primary"
              style={{ padding: "0.45rem 1.1rem", fontSize: "0.7rem" }}
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
