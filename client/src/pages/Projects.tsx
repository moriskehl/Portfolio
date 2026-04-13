/*
 * Projects — Full-page with scroll animations
 * Matches landing page design, supports theme toggle
 */

import { useState, useEffect, useRef } from "react";
import SubPageFooter from "../components/SubPageFooter";
import { useScrollSwap } from "../hooks/useScrollSwap";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { t } = useTranslation();
  const headerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<Array<HTMLDivElement | null>>([]);
  const diskRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const { ref: swapRef, past } = useScrollSwap(0.35);

  const PROJECTS = [
    {
      title: t("projects.portfolio.title"),
      date: t("projects.portfolio.date"),
      timelineYear: "2026",
      desc: t("projects.portfolio.desc"),
      tech: ["React", "TypeScript", "Three.js", "Vite"],
      url: "https://moriskehl.tech",
      iframe: true,
    },
    {
      title: t("projects.abiball.title"),
      date: t("projects.abiball.date"),
      timelineYear: "2026",
      desc: t("projects.abiball.desc"),
      tech: ["PHP", "JavaScript", "CSS"],
      url: "https://bsz.app",
      iframe: true,
    },
    {
      title: t("projects.blackjack.title"),
      date: t("projects.blackjack.date"),
      timelineYear: "2025",
      desc: t("projects.blackjack.desc"),
      tech: ["Python", "Machine Learning", "Yolov8", "Statistik"],
      url: null,
      iframe: false,
    },
    {
      title: t("projects.schluesselerlebnis.title"),
      date: t("projects.schluesselerlebnis.date"),
      timelineYear: "2025",
      desc: t("projects.schluesselerlebnis.desc"),
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      url: "https://schluesselerlebnis.appwrite.network/",
      iframe: true,
    },
  ];

  const angleStep = 14;
  const spread = (PROJECTS.length - 1) * angleStep;
  const startRotation = spread / 2;

  useEffect(() => {
    if (!headerRef.current) return;

    const elements = headerRef.current.querySelectorAll(".anim-in");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", delay: 0.1 }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = Number((entry.target as HTMLElement).dataset.projectIndex ?? 0);
          setActiveProject(idx);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-45% 0px -45% 0px",
      }
    );

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (diskRef.current) {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = maxScroll > 0 ? window.scrollY / maxScroll : 0;
            const currentRotation = startRotation - scrollPercent * spread;
            diskRef.current.style.setProperty("--disk-rotation", `${currentRotation}deg`);
          }
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [spread, startRotation]);

  const scrollToProject = (index: number) => {
    const target = projectRefs.current[index];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div style={{ background: "var(--t-bg)", minHeight: "100dvh", position: "relative" }}>
      {/* Timeline - kept outside animated wrapper to fix position:fixed issues with transforms */}
      <nav ref={diskRef} className="disk-track" aria-label="Project navigation">
        {PROJECTS.map((project, i) => {
          const angle = (i - (PROJECTS.length - 1) / 2) * angleStep;
          return (
            <button
              key={`${project.title}-timeline`}
              type="button"
              className={`disk-item ${activeProject === i ? "is-active" : ""}`}
              onClick={() => scrollToProject(i)}
              aria-label={`Jump to ${project.title}`}
              style={{ "--angle": `${angle}deg` } as React.CSSProperties}
            >
              <span className="disk-item-number">{project.timelineYear}</span>
            </button>
          );
        })}
      </nav>

      <div className="page-enter" style={{ position: "relative", zIndex: 10, pointerEvents: "none" }}>
        <div style={{ background: "var(--t-bg)", position: "relative", zIndex: 20, pointerEvents: "none" }}>
          {/* Header */}
          <div
            ref={headerRef}
            className="container"
            style={{ paddingTop: "10rem", paddingBottom: "1.5rem", pointerEvents: "auto" }}
          >
          <span
            className="section-label anim-in"
            aria-hidden="true"
            style={{ opacity: 0 }}
          >
            {t("projects.label")}
          </span>
          <h1
            ref={swapRef as React.RefObject<HTMLHeadingElement>}
            className="section-heading anim-in"
            style={{ opacity: 0 }}
          >
            <span style={{ color: past ? "var(--t-text)" : "var(--t-accent)", transition: "color 0.6s ease" }}>{t("projects.heading1")}</span><br />
            <span style={{ color: past ? "var(--t-accent)" : "var(--t-text)", transition: "color 0.6s ease" }}>{t("projects.heading2")}</span>
          </h1>
          <p
            className="anim-in"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--t-text-secondary)",
              maxWidth: "500px",
              opacity: 0,
            }}
          >
            {t("projects.subtext")}
          </p>
        </div>
        <hr className="divider" style={{ margin: "1.5rem 0" }} />
      </div>

        {/* Project cards */}
        <div
          className="container projects-layout"
          style={{ paddingTop: "3.5rem", paddingBottom: "6.5rem", pointerEvents: "auto" }}
        >
          <div className="projects-cards">
            {PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={i}
                total={PROJECTS.length}
                registerRef={(node) => {
                  projectRefs.current[i] = node;
                }}
              />
            ))}
          </div>
        </div>

      </div>

      <div style={{ marginTop: "4rem", position: "relative", zIndex: 10, pointerEvents: "auto" }}>
        <SubPageFooter />
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  total,
  registerRef,
}: {
  project: any;
  index: number;
  total: number;
  registerRef: (node: HTMLDivElement | null) => void;
}) {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<"16/9" | "9/16">("16/9");

  useEffect(() => {
    registerRef(cardRef.current);
    return () => registerRef(null);
  }, [registerRef]);

  useEffect(() => {
    if (!cardRef.current) return;

    // Subtle scrub animation coming from below
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=5%", // Start when top of card hits 95% of viewport
            end: "top center+=15%",  // End when its near center
            scrub: true,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      data-project-index={index}
      className="project-card-slanted"
      style={{
        opacity: 0,
        background: "var(--t-bg-secondary)",
        border: `1px solid ${hovered ? "var(--t-border-hover)" : "var(--t-border)"}`,
        padding: "2.3rem",
        marginBottom: index === total - 1 ? "0" : "3.2rem",
        cursor: "default",
        boxShadow: hovered ? "0 0 30px var(--t-card-hover-shadow)" : "none",
        transition: "border 0.4s ease, box-shadow 0.4s ease", // hover transitions
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
            // projekt_{String(index + 1).padStart(2, "0")} • {project.date}
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
            className="btn-outline desktop-only"
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

      {/* Iframe */}
      {project.iframe && (
        <>
          <div className="desktop-only" style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
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
            className="slanted-frame desktop-only"
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

          <div className="mobile-only" style={{ marginTop: "1rem" }}>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-slanted"
                style={{ width: "100%", padding: "0.8rem" }}
              >
                <span>{t("projects.ctaLive")}</span>
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
}


