/*
 * Navbar — Strict B/W/Blue
 * Transparent → black frosted on scroll.
 * Blue underline on active section.
 * Mobile hamburger menu on small screens.
 */

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

const NAV_ROUTES = [
  { label: "Projekte", href: "/projects" },
  { label: "Erfolge", href: "/achievements" },
  { label: "Werdegang", href: "/cv" },
];

const MOBILE_LINKS = [
  { label: "Über mich", href: "/#intro" },
  { label: "Bereiche", href: "/#grid" },
  { label: "Projekte", href: "/projects" },
  { label: "Erfolge", href: "/achievements" },
  { label: "Werdegang", href: "/cv" },
  { label: "Kontakt", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const [location] = useLocation();
  const isHome = location === "/";

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const handleMobileLink = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (isHome) {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        window.location.href = href;
      }
    }
    // wouter handles /projects etc. via Link below
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled || menuOpen ? "rgba(0,0,0,0.92)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <div className="container flex items-center justify-between py-5">
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.95rem",
              letterSpacing: "0.12em",
              color: "#ffffff",
              textDecoration: "none",
              zIndex: 60,
              position: "relative",
            }}
            onClick={() => setMenuOpen(false)}
          >
            MK<span style={{ color: "#3b82f6" }}>.</span>
          </Link>

          {/* Desktop Links */}
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {!isHome && (
              <li className="hidden sm:block">
                <Link href="/" className="nav-link">
                  Startseite
                </Link>
              </li>
            )}
            {NAV_ROUTES.map((item) => (
              <li key={item.label} className="hidden sm:block">
                <Link
                  href={item.href}
                  className="nav-link"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="hidden sm:block">
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, "contact")}
                className="btn-primary btn-slanted"
                style={{ padding: "0.45rem 1.1rem", fontSize: "0.7rem" }}
              >
                <span>Kontakt</span>
              </a>
            </li>

            {/* Mobile hamburger */}
            <li className="sm:hidden">
              <button
                className={`mobile-menu-btn ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menü"
              >
                <span />
                <span />
                <span />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}>
        {!isHome && (
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Startseite
          </Link>
        )}
        {MOBILE_LINKS.map((item) =>
          item.href.startsWith("/") && !item.href.startsWith("/#") ? (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleMobileLink(item.href);
              }}
            >
              {item.label}
            </a>
          )
        )}
      </div>
    </>
  );
}
