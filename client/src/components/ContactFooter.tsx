/*
 * ContactFooter — 85%–100% scroll zone
 * Minimal footer with contact info and social links.
 */

import { useRef, useState, useLayoutEffect } from "react";
import { useScrollSwap } from "../hooks/useScrollSwap";
import { toast } from "sonner";
import { Link } from "wouter";
import FooterBar from "./FooterBar";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RadialHover from "./RadialHover";

gsap.registerPlugin(ScrollTrigger);

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const LinktreeIcon = () => (
  <img
    src="/linktree.png"
    alt=""
    width="14"
    height="14"
    style={{
      flexShrink: 0,
      filter: "var(--t-icon-filter, brightness(0) invert(1))",
      opacity: 0.85,
    }}
  />
);

export default function ContactFooter() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  
  const SOCIALS = [
    { label: "GitHub", href: "https://github.com/moriskehl", icon: GitHubIcon },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/moris-kehl/", icon: LinkedInIcon },
    { label: "Linktree", href: "https://linktr.ee/moriskehl", icon: LinktreeIcon },
  ];

  const CONTACT_INFO = [
    { label: t("contact.info.email"), value: "moris.kehl@gmail.com", href: "mailto:moris.kehl@gmail.com" },
    { label: t("contact.info.location"), value: t("contact.info.locationValue"), href: null },
    { label: t("contact.info.status"), value: t("contact.info.statusValue"), href: null },
    { label: t("nav.cv"), value: "moriskehl.tech/cv", href: "/cv" }
  ];

  const { ref: swapRef, past } = useScrollSwap(0.35);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  /* GSAP Deterministic Scroll */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const leftEl = document.querySelector(".contact-scrub-left");
      const rightEl = document.querySelector(".contact-scrub-right");

      if (leftEl) {
        gsap.fromTo(leftEl, 
          { opacity: 0, x: -50 },
          {
            opacity: 1, x: 0, ease: "none",
            scrollTrigger: { trigger: containerRef.current, start: "top 90%", end: "top 40%", scrub: true }
          }
        );
      }
      
      if (rightEl) {
        gsap.fromTo(rightEl, 
          { opacity: 0, x: 50 },
          {
            opacity: 1, x: 0, ease: "none",
            scrollTrigger: { trigger: containerRef.current, start: "top 90%", end: "top 40%", scrub: true }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const FORMSPREE_URL = "https://formspree.io/f/mwvwkvbb";

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (response.ok) {
        setSent(true);
      } else {
        toast.error(t("contact.form.errorSend"));
      }
    } catch (err) {
      toast.error(t("contact.form.errorNetwork"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--t-input-bg)",
    border: "1px solid var(--t-border-input)",
    color: "var(--t-text)",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    padding: "0.8rem 1rem",
    outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s, background-color 0.3s",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(59,130,246,0.6)";
    e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.08)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "var(--t-border-input)";
    e.target.style.boxShadow = "none";
  };

  const commonHrefStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.92rem",
    color: "var(--t-text)",
    textDecoration: "none",
    transition: "color 0.2s",
  };

  return (
    <footer
      id="contact"
      ref={containerRef}
      style={{ background: "var(--t-bg)", overflow: "hidden" }}
    >
      <hr className="divider" />

      {/* Contact section */}
      <div
        className="container"
        style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — info */}
          <div className="contact-scrub-left">
            <span className="section-label" aria-hidden="true">{t("contact.label")}</span>
            <RadialHover className="section-heading">
              <h2
                ref={swapRef as React.RefObject<HTMLHeadingElement>}
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", margin: 0 }}
              >
                <span style={{ color: past ? "var(--t-text)" : "var(--t-accent)", transition: "color 0.6s ease" }}>{t("contact.heading1")}</span><br />
                <span style={{ color: past ? "var(--t-accent)" : "var(--t-text)", transition: "color 0.6s ease" }}>{t("contact.heading2")}</span>
              </h2>
            </RadialHover>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "var(--t-text-secondary)",
                marginBottom: "2.5rem",
                maxWidth: "420px",
              }}
            >
              {t("contact.subtext")}
            </p>

            {/* Contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
              {CONTACT_INFO.map((item) => (
                <div key={item.label} style={{ display: "flex", gap: "1.5rem", alignItems: "baseline" }}>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.2em",
                      color: "var(--t-text-faint)",
                      textTransform: "uppercase",
                      minWidth: "72px",
                    }}
                  >
                    {item.label}
                  </span>
                  {item.href ? (
                    item.href.startsWith("/") ? (
                      <Link href={item.href} >
                        <span
                          style={{ ...commonHrefStyle, cursor: "pointer" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t-accent)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-text)")}
                        >
                          {item.value}
                        </span>
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        style={commonHrefStyle}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t-accent)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-text)")}
                      >
                        {item.value}
                      </a>
                    )
                  ) : (
                    <span style={{ ...commonHrefStyle }}>
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ padding: "0.45rem 1rem", fontSize: "0.68rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <s.icon />
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            className="contact-scrub-right"
            style={{
              border: "1px solid var(--t-border)",
              background: "var(--t-bg-secondary)",
              padding: "2.5rem",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "2rem",
                    color: "var(--t-accent)",
                    marginBottom: "1rem",
                  }}
                >
                  ✓
                </div>
                <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.85rem", color: "var(--t-text)", marginBottom: "0.5rem" }}>
                  {t("contact.form.successTitle")}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "var(--t-text-secondary)" }}>
                  {t("contact.form.successDesc")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.2em",
                      color: "var(--t-text-faint)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {t("contact.form.nameLabel")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("contact.form.namePlaceholder")}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.2em",
                      color: "var(--t-text-faint)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {t("contact.form.emailLabel")}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder={t("contact.form.emailPlaceholder")}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.2em",
                      color: "var(--t-text-faint)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {t("contact.form.messageLabel")}
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder={t("contact.form.messagePlaceholder")}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary btn-slanted" style={{ width: "100%", padding: "0.9rem", opacity: loading ? 0.7 : 1, cursor: loading ? "default" : "pointer" }}>
                  <span>{loading ? t("contact.form.sending") : t("contact.form.send")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Minimal footer bar */}
      <FooterBar 
        links={[{label: t("footer.about"), id: "intro"}, {label: t("footer.sections"), id: "coding-summary"}, {label: t("footer.contact"), id: "contact"}]}
      />
    </footer>
  );
}
