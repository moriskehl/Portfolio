/*
 * NotFound — 404 Page
 * Themed to match the portfolio
 */

import { Link } from "wouter";

export default function NotFound() {
  return (
    <div style={{ background: "var(--t-bg)", minHeight: "100dvh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: "var(--t-accent)",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          // error_404
        </span>

        <h1
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(4rem, 12vw, 8rem)",
            fontWeight: 400,
            color: "var(--t-text)",
            lineHeight: 1,
            marginBottom: "1rem",
          }}
        >
          4<span style={{ color: "var(--t-accent)" }}>0</span>4
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            color: "var(--t-text-secondary)",
            marginBottom: "0.5rem",
            maxWidth: "400px",
            lineHeight: 1.7,
          }}
        >
          Diese Seite existiert nicht.
        </p>
        <p
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.7rem",
            color: "var(--t-text-faint)",
            marginBottom: "3rem",
            letterSpacing: "0.1em",
          }}
        >
          Die Route wurde nicht gefunden oder wurde entfernt.
        </p>

        <Link
          href="/"
          className="btn-primary"
          style={{ textDecoration: "none" }}
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
