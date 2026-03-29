/*
 * Navbar — Strict B/W/Blue
 * Transparent → frosted on scroll.
 * Blue underline on active section.
 * Mobile hamburger menu on small screens.
 * Theme toggle (sun/moon).
 */

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon, Home, Briefcase, Trophy, GraduationCap, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_ROUTES = [
  { labelKey: "nav.projects", href: "/projects" },
  { labelKey: "nav.achievements", href: "/achievements" },
  { labelKey: "nav.cv", href: "/cv" },
];

const MOBILE_LINKS = [
  { labelKey: "nav.home", href: "/", icon: Home },
  { labelKey: "nav.projects", href: "/projects", icon: Briefcase },
  { labelKey: "nav.achievements", href: "/achievements", icon: Trophy },
  { labelKey: "nav.cv", href: "/cv", icon: GraduationCap },
  { labelKey: "nav.impressum", href: "/impressum", icon: FileText },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
        className="fixed top-0 left-0 right-0 transition-all duration-300"
        style={{
          zIndex: 60,
          background: scrolled || menuOpen ? "var(--t-nav-bg)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--t-border)" : "1px solid transparent",
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
              color: "var(--t-text)",
              textDecoration: "none",
              zIndex: 60,
              position: "relative",
            }}
            onClick={() => setMenuOpen(false)}
          >
            MK<span style={{ color: "var(--t-accent)" }}>.</span>
          </Link>

          {/* Desktop Links */}
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {!isHome && (
              <li className="hidden sm:block">
                <Link href="/" className="nav-link">
                  {t("nav.home")}
                </Link>
              </li>
            )}
            {NAV_ROUTES.map((item) => (
              <li key={item.labelKey} className="hidden sm:block">
                <Link
                  href={item.href}
                  className="nav-link"
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}

            {/* Language Switcher */}
            <li className="hidden sm:block">
              <LanguageSwitcher />
            </li>

            {/* Theme toggle */}
            <li className="hidden sm:block">
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Zu Light Mode wechseln" : "Zu Dark Mode wechseln"}
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </button>
            </li>

            <li className="hidden sm:block">
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, "contact")}
                className="btn-primary btn-slanted"
                style={{ padding: "0.45rem 1.1rem", fontSize: "0.7rem" }}
              >
                <span>{t("nav.contact")}</span>
              </a>
            </li>

            {/* Mobile hamburger */}
            <li className="sm:hidden">
              <button
                className={`mobile-menu-btn ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menü"
                aria-expanded={menuOpen}
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2.5rem" }}>
          {MOBILE_LINKS.map((item) => {
            const Icon = item.icon;
            return item.href.startsWith("/") && !item.href.startsWith("/#") ? (
              <Link
                key={item.labelKey}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
              >
                <Icon size={20} />
                {t(item.labelKey)}
              </Link>
            ) : (
              <a
                key={item.labelKey}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileLink(item.href);
                }}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
              >
                <Icon size={20} />
                {t(item.labelKey)}
              </a>
            );
          })}
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", alignItems: "center" }}>
            <LanguageSwitcher />
            {/* Mobile theme toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Zu Light Mode wechseln" : "Zu Dark Mode wechseln"}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
