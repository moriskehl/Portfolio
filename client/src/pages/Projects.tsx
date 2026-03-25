/*
 * Projects — Full-page dark theme with scroll animations
 * Matches landing page design: B/W/Blue, Share Tech Mono + DM Sans
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

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

const PROJECTS = [
  {
    title: "Abiball Portal",
    desc: "Full-Stack Event-Management-System für die Abiball-Planung. PHP-Backend mit Benutzer-Authentifizierung, Sitzplan-Editor und Zahlungsverfolgung.",
    tech: ["PHP", "MySQL", "JavaScript", "CSS"],
    url: "https://bsz.app",
    iframe: true,
  },
  {
    title: "IT-Puzzle",
    desc: "Interaktive Web-Plattform zum Testen von Bewerbern mit IT-bezogenen Rätseln und Challenges. Erstellt während meines Praktikums bei SSC-Services.",
    tech: ["JavaScript", "Node.js", "HTML/CSS"],
    url: null,
    iframe: false,
  },
  {
    title: "Blackjack AI",
    desc: "Kartenzähl-KI für Blackjack — entwickelt als Seminarkurs-Projekt zum Thema Künstliche Intelligenz. Implementiert verschiedene Zählstrategien.",
    tech: ["Python", "Machine Learning", "Statistik"],
    url: null,
    iframe: false,
  },
  {
    title: "Portfolio Website",
    desc: "Diese Website — gebaut mit React, Three.js und einem custom ASCII-Renderer der ein 3D-STL-Modell als Code-Zeichen darstellt.",
    tech: ["React", "TypeScript", "Three.js", "Vite"],
    url: null,
    iframe: false,
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const { ref, visible } = useVisible();
  const [hovered, setHovered] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<"16/9" | "9/16">("16/9");

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
        background: "#0a0a0a",
        border: `1px solid ${hovered ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.06)"}`,
        padding: "2rem",
        marginBottom: "1px",
        cursor: "default",
        boxShadow: hovered ? "0 0 30px rgba(59,130,246,0.06)" : "none",
        transition2: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div>
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: hovered ? "#3b82f6" : "rgba(255,255,255,0.2)",
              transition: "color 0.3s",
            }}
          >
            // projekt_{String(index + 1).padStart(2, "0")}
          </span>
          <h3
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "1.3rem",
              color: "#ffffff",
              marginTop: "0.4rem",
              marginBottom: "0.6rem",
            }}
          >
            {project.title}
          </h3>
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ padding: "0.4rem 0.9rem", fontSize: "0.65rem", pointerEvents: "all" }}
          >
            Live ansehen →
          </a>
        )}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.92rem",
          lineHeight: 1.75,
          color: "#a1a1aa",
          marginBottom: "1.2rem",
        }}
      >
        {project.desc}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: project.iframe ? "1.5rem" : 0 }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              padding: "0.3rem 0.7rem",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Iframe for Abiball */}
      {project.iframe && (
        <>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            {(["16/9", "9/16"] as const).map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  padding: "0.35rem 0.8rem",
                  border: `1px solid ${aspectRatio === ratio ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.1)"}`,
                  background: aspectRatio === ratio ? "rgba(59,130,246,0.1)" : "transparent",
                  color: aspectRatio === ratio ? "#3b82f6" : "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {ratio === "16/9" ? "Desktop" : "Mobile"}
              </button>
            ))}
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "#000",
            }}
          >
            <div className="iframe-scaler">
              <iframe src={project.url!} title={project.title} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Projects() {
  const { ref: headerRef, visible: headerVisible } = useVisible();

  return (
    <div style={{ background: "#000", minHeight: "100vh", paddingTop: "6rem" }}>
      {/* Back nav */}
      <div className="container" style={{ paddingTop: "2rem" }}>
        <Link href="/">
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.25)",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
          >
            ← ZURÜCK
          </span>
        </Link>
      </div>

      {/* Header */}
      <div
        ref={headerRef}
        className="container"
        style={{ paddingTop: "3rem", paddingBottom: "4rem" }}
      >
        <span
          className="section-label"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          // projekte
        </span>
        <h1
          className="section-heading"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          Software &<br />
          <span style={{ color: "#3b82f6" }}>Systeme.</span>
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#a1a1aa",
            maxWidth: "500px",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          Einblicke in meine Arbeit — von Full-Stack Webanwendungen
          bis zu KI-Experimenten.
        </p>
      </div>

      <hr className="divider" />

      {/* Project cards */}
      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
