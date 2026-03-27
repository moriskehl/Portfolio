/*
 * ContactFooter — 85%–100% scroll zone
 * Minimal footer with contact info and social links.
 */

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollSwap } from "../hooks/useScrollSwap";

import { Link } from "wouter";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/moriskehl" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/moris-kehl/" },
];

const CONTACT_INFO = [
  { label: "Email", value: "moris.kehl@gmail.com", href: "mailto:moris.kehl@gmail.com" },
  { label: "Standort", value: "Stuttgart, Deutschland", href: null },
  { label: "Status", value: "Dualer Student ab Okt. 2026", href: null },
];

export default function ContactFooter() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start 40%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const xLeft = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const xRight = useTransform(scrollYProgress, [0, 1], [50, 0]);

  const { ref: swapRef, past } = useScrollSwap(0.35);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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
        alert("Fehler beim Senden! Hast du deine Formspree-ID im Code (ContactFooter.tsx) eingetragen?");
      }
    } catch (err) {
      alert("Netzwerkfehler. Bitte versuche es später noch einmal.");
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

  return (
    <footer
      id="contact"
      ref={containerRef}
      style={{ background: "var(--t-bg)" }}
    >
      <hr className="divider" />

      {/* Contact section */}
      <div
        className="container"
        style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — info */}
          <motion.div
            style={{
              opacity,
              x: xLeft,
            }}
          >
            <span className="section-label">// 03 — kontakt</span>
            <h2
              ref={swapRef as React.RefObject<HTMLHeadingElement>}
              className="section-heading"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
            >
              <span style={{ color: past ? "var(--t-text)" : "var(--t-accent)", transition: "color 0.6s ease" }}>Lass uns etwas</span><br />
              <span style={{ color: past ? "var(--t-accent)" : "var(--t-text)", transition: "color 0.6s ease" }}>Großes bauen.</span>
            </h2>

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
              Offen für spannende Projekte, fachlichen Austausch und neue Herausforderungen.
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
                    <a
                      href={item.href}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.92rem",
                        color: "var(--t-text)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t-accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-text)")}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", color: "var(--t-text)" }}>
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
                  className="btn-outline"
                  style={{ padding: "0.45rem 1rem", fontSize: "0.68rem" }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            style={{
              opacity,
              x: xRight,
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
                  Nachricht gesendet.
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "var(--t-text-secondary)" }}>
                  Ich melde mich bald bei dir zurück.
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
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Dein Name"
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
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="deine@email.de"
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
                    Nachricht
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Erzähl mir von deinem Projekt..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary btn-slanted" style={{ width: "100%", padding: "0.9rem", opacity: loading ? 0.7 : 1, cursor: loading ? "default" : "pointer" }}>
                  <span>{loading ? "Wird gesendet..." : "Nachricht senden"}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Minimal footer bar */}
      <div
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
            {[{label: "Über mich", id: "intro"}, {label: "Bereiche", id: "grid"}, {label: "Kontakt", id: "contact"}].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  color: "var(--t-text-muted)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-text-muted)")}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/impressum"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                color: "var(--t-text-muted)",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-text-muted)")}
            >
              Impressum
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
