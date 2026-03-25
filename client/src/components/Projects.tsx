/*
 * Projects — "Digital Descent"
 * Grid of project cards with ice-blue hover glow.
 * Each card has a terminal-style header, tags, and links.
 */

import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    id: "01",
    title: "AvalancheAI",
    description:
      "Real-time avalanche risk prediction engine using ML models trained on snowpack data, weather patterns, and terrain analysis. Deployed across 3 Norwegian ski resorts.",
    tags: ["Python", "FastAPI", "TensorFlow", "PostgreSQL", "Docker"],
    link: "#",
    repo: "#",
    status: "production",
  },
  {
    id: "02",
    title: "SlopeSync",
    description:
      "Cross-platform ski resort management platform. Handles lift operations, snow grooming schedules, and real-time capacity tracking for 12,000+ daily visitors.",
    tags: ["TypeScript", "React", "Node.js", "Redis", "WebSockets"],
    link: "#",
    repo: "#",
    status: "production",
  },
  {
    id: "03",
    title: "TrailMatrix",
    description:
      "3D trail visualization tool that renders topographic data as interactive wireframe maps. Built for backcountry ski touring route planning.",
    tags: ["Three.js", "React", "WebGL", "GeoJSON", "Mapbox"],
    link: "#",
    repo: "#",
    status: "open source",
  },
  {
    id: "04",
    title: "PowderBot",
    description:
      "Automated snow condition aggregator and Slack/Discord bot. Scrapes 40+ resort APIs, applies ML-based quality scoring, and delivers morning briefings.",
    tags: ["Python", "Playwright", "OpenAI", "Slack API", "AWS Lambda"],
    link: "#",
    repo: "#",
    status: "open source",
  },
  {
    id: "05",
    title: "IceCore API",
    description:
      "High-throughput REST + GraphQL API gateway handling 2M+ daily requests. Features intelligent caching, rate limiting, and zero-downtime deployments.",
    tags: ["Node.js", "GraphQL", "Redis", "Kubernetes", "Terraform"],
    link: "#",
    repo: "#",
    status: "production",
  },
  {
    id: "06",
    title: "Vertical Drop",
    description:
      "Personal ski performance tracker. Uses GPS data from ski watch to compute vertical meters, speed analytics, and run comparisons across seasons.",
    tags: ["React Native", "TypeScript", "SQLite", "Garmin SDK"],
    link: "#",
    repo: "#",
    status: "beta",
  },
];

const STATUS_COLORS: Record<string, string> = {
  production: "#7DF9FF",
  "open source": "#38BDF8",
  beta: "rgba(232,244,248,0.5)",
};

function ProjectCard({ project, delay, visible }: { project: typeof PROJECTS[0]; delay: number; visible: boolean }) {
  return (
    <div
      className={`ice-card p-6 flex flex-col transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{
        borderRadius: "4px",
        transitionDelay: `${delay}ms`,
        minHeight: "280px",
      }}
    >
      {/* Card header */}
      <div className="flex items-start justify-between mb-4">
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            color: "rgba(125,249,255,0.4)",
          }}
        >
          {project.id}
        </span>
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: STATUS_COLORS[project.status] || "#fff",
            textTransform: "uppercase",
            border: `1px solid ${STATUS_COLORS[project.status] || "#fff"}40`,
            padding: "0.15rem 0.5rem",
            borderRadius: "2px",
          }}
        >
          {project.status}
        </span>
      </div>

      <h3
        className="mb-3"
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "1.15rem",
          fontWeight: 400,
          color: "#FFFFFF",
          letterSpacing: "0.05em",
        }}
      >
        {project.title}
      </h3>

      <p
        className="flex-1 mb-5"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.88rem",
          lineHeight: 1.7,
          color: "rgba(232,244,248,0.65)",
        }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span key={tag} className="ice-tag">{tag}</span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4">
        <a
          href={project.link}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            color: "rgba(125,249,255,0.7)",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#7DF9FF")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(125,249,255,0.7)")}
        >
          Live →
        </a>
        <a
          href={project.repo}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            color: "rgba(232,244,248,0.35)",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(232,244,248,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,244,248,0.35)")}
        >
          GitHub →
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} className="relative py-28 overflow-hidden">
      <hr className="ice-divider" />

      <div
        className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
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
          // 03 — projects.filter(featured)
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
          Things I've built<br />
          <span style={{ color: "#7DF9FF" }}>at altitude.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={i * 80}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
