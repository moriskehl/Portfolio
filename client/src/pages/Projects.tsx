/*
 * Projects — Full-page with scroll animations
 * Matches landing page design, supports theme toggle
 */

import { useState, useEffect, useRef } from "react";
import SubPageFooter from "../components/SubPageFooter";
import { Link } from "wouter";
import { useScrollSwap } from "../hooks/useScrollSwap";
import { useTranslation } from "react-i18next";

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

export default function Projects() {
  const { t } = useTranslation();
  const { ref: headerRef, visible: headerVisible } = useVisible();
  const { ref: swapRef, past } = useScrollSwap(0.35);

  const PROJECTS = [
    {
      title: t("projects.abiball.title"),
      desc: t("projects.abiball.desc"),
      tech: ["PHP", "JavaScript", "CSS"],
      url: "https://bsz.app",
      iframe: true,
    },
    {
      title: t("projects.itPuzzle.title"),
      desc: t("projects.itPuzzle.desc"),
      tech: ["JavaScript", "Node.js", "HTML/CSS"],
      url: null,
      iframe: false,
    },
    {
      title: t("projects.blackjack.title"),
      desc: t("projects.blackjack.desc"),
      tech: ["Python", "Machine Learning", "Yolov8", "Statistik"],
      url: null,
      iframe: false,
    },
    {
      title: t("projects.portfolio.title"),
      desc: t("projects.portfolio.desc"),
      tech: ["React", "TypeScript", "Three.js", "Vite"],
      url: "https://moriskehl.tech",
      iframe: true,
    },
  ];

  return (
    <div className="page-enter" style={{ background: "var(--t-bg)", minHeight: "100dvh" }}>

      {/* Header */}
      <div
        ref={headerRef}
        className="container"
        style={{ paddingTop: "8rem", paddingBottom: "4rem" }}
      >
        <span
          className="section-label"
          aria-hidden="true"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {t("projects.label")}
        </span>
        <h1
          ref={swapRef as React.RefObject<HTMLHeadingElement>}
          className="section-heading"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          <span style={{ color: past ? "var(--t-text)" : "var(--t-accent)", transition: "color 0.6s ease" }}>{t("projects.heading1")}</span><br />
          <span style={{ color: past ? "var(--t-accent)" : "var(--t-text)", transition: "color 0.6s ease" }}>{t("projects.heading2")}</span>
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--t-text-secondary)",
            maxWidth: "500px",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          {t("projects.subtext")}
        </p>
      </div>

      <hr className="divider" />

      {/* Project cards */}
      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>

      <SubPageFooter />
    </div>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const { t } = useTranslation();
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
        background: "var(--t-bg-secondary)",
        border: `1px solid ${hovered ? "var(--t-border-hover)" : "var(--t-border)"}`,
        padding: "2rem",
        marginBottom: "1px",
        cursor: "default",
        boxShadow: hovered ? "0 0 30px var(--t-card-hover-shadow)" : "none",
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
              color: hovered ? "var(--t-accent)" : "var(--t-text-faint)",
              transition: "color 0.3s",
            }}
            aria-hidden="true"
          >
            // projekt_{String(index + 1).padStart(2, "0")}
          </span>
          <h3
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "1.3rem",
              color: "var(--t-text)",
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
            {t("projects.ctaLive")}
          </a>
        )}
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.92rem",
          lineHeight: 1.75,
          color: "var(--t-text-secondary)",
          marginBottom: "1.2rem",
        }}
      >
        {project.desc}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: project.iframe ? "1.5rem" : 0 }}>
        {project.tech.map((tech: string) => (
          <span
            key={tech}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              padding: "0.3rem 0.7rem",
              border: "1px solid var(--t-tag-border)",
              color: "var(--t-tag-color)",
              background: "var(--t-tag-bg)",
            }}
          >
            {tech}
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
                  border: `1px solid ${aspectRatio === ratio ? "var(--t-accent-border)" : "var(--t-border-input)"}`,
                  background: aspectRatio === ratio ? "var(--t-accent-subtle)" : "transparent",
                  color: aspectRatio === ratio ? "var(--t-accent)" : "var(--t-text-faint)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {ratio === "16/9" ? "Desktop" : "Mobile"}
              </button>
            ))}
          </div>
          <div
            className="slanted-frame"
            style={{
              width: "100%",
              maxWidth: aspectRatio === "9/16" ? "300px" : "800px",
              margin: aspectRatio === "9/16" ? "0 auto" : "0",
              aspectRatio,
              background: "var(--t-bg)",
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


