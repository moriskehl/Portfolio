/*
 * NotFound — 404 Page
 * Dark theme matching the rest of the portfolio
 */

import { Link } from "wouter";
import Navbar from "../components/Navbar";

export default function NotFound() {
  return (
    <div style={{ background: "#000", minHeight: "100dvh" }}>
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
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: "#3b82f6",
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
            color: "#ffffff",
            lineHeight: 1,
            marginBottom: "1rem",
          }}
        >
          4<span style={{ color: "#3b82f6" }}>0</span>4
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            color: "#a1a1aa",
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
            color: "rgba(255,255,255,0.2)",
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
