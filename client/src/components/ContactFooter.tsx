/*
 * ContactFooter — 85%–100% scroll zone
 * Minimal footer with contact info and social links.
 * Black background, white text, blue hover accents.
 */

import { useEffect, useRef, useState } from "react";

function useVisible(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

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
  const { ref, visible } = useVisible();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#0a0a0a",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#ffffff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    padding: "0.8rem 1rem",
    outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(59,130,246,0.6)";
    e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.08)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(255,255,255,0.1)";
    e.target.style.boxShadow = "none";
  };

  return (
    <footer
      id="contact"
      ref={ref}
      style={{ background: "#000000" }}
    >
      <hr className="divider" />

      {/* Contact section */}
      <div
        className="container"
        style={{ paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — info */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            <span className="section-label">// 03 — contact</span>
            <h2
              className="section-heading"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
            >
              Lass uns etwas<br />
              <span style={{ color: "#3b82f6" }}>Großes bauen.</span>
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "#a1a1aa",
                marginBottom: "2.5rem",
                maxWidth: "420px",
              }}
            >
              Offen für spannende Projekte, Werkstudentenstellen und
              Kooperationen — besonders im Bereich Software-Entwicklung
              und Wirtschaftsinformatik.
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
                      color: "rgba(255,255,255,0.25)",
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
                        color: "#ffffff",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", color: "#ffffff" }}>
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
          </div>

          {/* Right — form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "#0a0a0a",
              padding: "2.5rem",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "2rem",
                    color: "#3b82f6",
                    marginBottom: "1rem",
                  }}
                >
                  ✓
                </div>
                <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.85rem", color: "#fff", marginBottom: "0.5rem" }}>
                  Message transmitted.
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#a1a1aa" }}>
                  I'll get back to you before the next powder day.
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
                      color: "rgba(255,255,255,0.3)",
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
                    placeholder="Your name"
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
                      color: "rgba(255,255,255,0.3)",
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
                    placeholder="your@email.com"
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
                      color: "rgba(255,255,255,0.3)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%", padding: "0.9rem" }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Minimal footer bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
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
              color: "rgba(255,255,255,0.18)",
            }}
          >
            © {new Date().getFullYear()} Moris Kehl — Built with Three.js + React
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Intro", "Grid", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.18)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.18)")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
