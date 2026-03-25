/*
 * Contact — "Digital Descent"
 * Left: contact info + social links. Right: contact form.
 * Ice-blue focus states, terminal-style inputs.
 */

import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — replace with actual form handler
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(12,42,58,0.5)",
    border: "1px solid rgba(125,249,255,0.15)",
    color: "#E8F4F8",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    padding: "0.75rem 1rem",
    borderRadius: "2px",
    outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.68rem",
    letterSpacing: "0.2em",
    color: "rgba(125,249,255,0.6)",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: "0.5rem",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(125,249,255,0.55)";
    e.target.style.boxShadow = "0 0 16px rgba(125,249,255,0.12)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(125,249,255,0.15)";
    e.target.style.boxShadow = "none";
  };

  return (
    <section id="contact" ref={ref} className="relative py-28 overflow-hidden">
      <hr className="ice-divider" />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(125,249,255,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="container relative pt-16">
        {/* Section label */}
        <p
          className={`mb-3 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.35em",
            color: "rgba(125,249,255,0.6)",
            textTransform: "uppercase",
          }}
        >
          // 04 — contact.send()
        </p>

        <h2
          className={`mb-16 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
            fontWeight: 400,
            color: "#FFFFFF",
          }}
        >
          Let's build something<br />
          <span style={{ color: "#7DF9FF" }}>worth the descent.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left — info */}
          <div
            className={`lg:col-span-2 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="section-accent mb-8">
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "rgba(232,244,248,0.7)",
                }}
              >
                Open to senior engineering roles, technical consulting, and
                interesting side-projects — especially anything at the
                intersection of software and the outdoors.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4 mb-8">
              {[
                { label: "Email", value: "alex@nordic.dev", href: "mailto:alex@nordic.dev" },
                { label: "Location", value: "Oslo, Norway", href: "#" },
                { label: "Availability", value: "Open to offers", href: "#" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      color: "rgba(125,249,255,0.5)",
                      textTransform: "uppercase",
                      minWidth: "90px",
                      paddingTop: "2px",
                    }}
                  >
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                      color: "rgba(232,244,248,0.8)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#7DF9FF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,244,248,0.8)")}
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {[
                { label: "GitHub", href: "#" },
                { label: "LinkedIn", href: "#" },
                { label: "Twitter", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="btn-ice"
                  style={{ padding: "0.4rem 0.9rem", fontSize: "0.68rem" }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div
            className={`lg:col-span-3 ice-card p-8 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ borderRadius: "4px" }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "2.5rem",
                    color: "#7DF9FF",
                    textShadow: "0 0 20px rgba(125,249,255,0.6)",
                    marginBottom: "1rem",
                  }}
                >
                  ✓
                </div>
                <p
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.9rem",
                    letterSpacing: "0.1em",
                    color: "#E8F4F8",
                    marginBottom: "0.5rem",
                  }}
                >
                  Message transmitted.
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(232,244,248,0.5)",
                  }}
                >
                  I'll get back to you before the next powder day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label style={labelStyle}>Name</label>
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
                  <label style={labelStyle}>Email</label>
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
                  <label style={labelStyle}>Message</label>
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
                <button type="submit" className="btn-ice w-full" style={{ padding: "0.85rem" }}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
