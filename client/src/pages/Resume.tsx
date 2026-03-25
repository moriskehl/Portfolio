/*
 * Resume / CV — Werdegang
 * Dark theme timeline with scroll animations and hover effects
 */

import { useEffect, useRef, useState } from "react";
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

const EXPERIENCE = [
  {
    period: "Ab Okt. 2026",
    title: "Duales Studium Wirtschaftsinformatik",
    org: "DHBW · SV Informatik GmbH",
    desc: "Dualer Studiengang mit gleichzeitiger Praxiserfahrung in der Softwareentwicklung.",
    tags: ["Wirtschaftsinformatik", "Dual", "DHBW"],
    upcoming: true,
  },
  {
    period: "Nov. 2025 – Heute",
    title: "Minijob Kassierer & Verkauf",
    org: "Sport Stall – Urs und Kai Frohnmaier GbR",
    desc: "Verbindung meiner Leidenschaft als aktiver Skirennläufer mit wertvoller Praxiserfahrung im Wintersport-Einzelhandel. Kassenführung und Kundenberatung.",
    tags: ["Einzelhandel", "Kundenberatung", "Wintersport"],
    upcoming: false,
  },
  {
    period: "Juni 2025",
    title: "Praktikum",
    org: "SSC-Services GmbH · Böblingen",
    desc: "Entwicklung einer interaktiven IT-Puzzle-Plattform zum Bewerber-Testing mit JavaScript und Node.js. Teamarbeit mit modernen Web-Technologien.",
    tags: ["JavaScript", "Node.js", "Web Development"],
    upcoming: false,
  },
  {
    period: "Mai 2022",
    title: "Sozialpraktikum",
    org: "GWW – Gemeinnützige Werkstätten und Wohnstätten GmbH",
    desc: "Einblicke in soziale Einrichtungen und die Arbeit mit Menschen mit Beeinträchtigungen.",
    tags: ["Soziales Engagement", "Herrenberg"],
    upcoming: false,
  },
];

const EDUCATION = [
  {
    period: "2023 – 2026",
    title: "Abitur Wirtschaft (Economics)",
    org: "Berufliches Schulzentrum Leonberg",
    desc: "Profil Wirtschaftsinformatik. Seminarkurs KI — Blackjack-Kartenzähl-Algorithmus.",
  },
  {
    period: "2017 – 2023",
    title: "Sport Profil",
    org: "Maria Von Linden-Gymnasium",
    desc: "Schulische Ausbildung mit Schwerpunkt Sport. Grundlage für selbstständiges und diszipliniertes Arbeiten.",
  },
];

const SKILLS = [
  { category: "Web", items: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Node.js", "PHP"] },
  { category: "Backend", items: ["Java", "Python", "MySQL", "REST APIs"] },
  { category: "Tools", items: ["Git", "VS Code", "Vite", "Three.js"] },
  { category: "Soft", items: ["Teamarbeit", "Disziplin", "Problemlösung", "Eigeninitiative"] },
];

function TimelineItem({ item, index }: { item: typeof EXPERIENCE[0]; index: number }) {
  const { ref, visible } = useVisible();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1px 1fr",
        gap: "2rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s ease ${index * 100}ms`,
        paddingBottom: "2.5rem",
      }}
    >
      {/* Period */}
      <div
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          color: item.upcoming ? "#3b82f6" : "rgba(255,255,255,0.25)",
          textAlign: "right",
          paddingTop: "0.3rem",
          lineHeight: 1.6,
        }}
      >
        {item.period}
      </div>

      {/* Timeline line + dot */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: hovered ? "#3b82f6" : (item.upcoming ? "#3b82f6" : "rgba(255,255,255,0.15)"),
            border: `2px solid ${hovered ? "#3b82f6" : (item.upcoming ? "#3b82f6" : "rgba(255,255,255,0.08)")}`,
            transition: "all 0.3s",
            marginTop: "0.4rem",
            zIndex: 1,
          }}
        />
        <div style={{ width: "1px", flex: 1, background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* Content card */}
      <div
        style={{
          background: hovered ? "rgba(59,130,246,0.03)" : "#0a0a0a",
          border: `1px solid ${hovered ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.06)"}`,
          padding: "1.5rem",
          boxShadow: hovered ? "0 0 30px rgba(59,130,246,0.05)" : "none",
          transition: "all 0.3s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {item.upcoming && (
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.15em",
              padding: "0.2rem 0.5rem",
              border: "1px solid rgba(59,130,246,0.4)",
              background: "rgba(59,130,246,0.1)",
              color: "#3b82f6",
              display: "inline-block",
              marginBottom: "0.8rem",
            }}
          >
            UPCOMING
          </span>
        )}
        <h3
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "1rem",
            color: "#ffffff",
            marginBottom: "0.3rem",
          }}
        >
          {item.title}
        </h3>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem",
            color: "#3b82f6",
            marginBottom: "0.7rem",
          }}
        >
          {item.org}
        </div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.88rem",
            lineHeight: 1.7,
            color: "#a1a1aa",
            marginBottom: "0.8rem",
          }}
        >
          {item.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {item.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.08em",
                padding: "0.25rem 0.55rem",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Resume() {
  const { ref: headerRef, visible: headerVisible } = useVisible();
  const { ref: eduRef, visible: eduVisible } = useVisible();
  const { ref: skillRef, visible: skillVisible } = useVisible();

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
      <div ref={headerRef} className="container" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
        <span
          className="section-label"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          // werdegang
        </span>
        <h1
          className="section-heading"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          Erfahrung &<br />
          <span style={{ color: "#3b82f6" }}>Ausbildung.</span>
        </h1>
      </div>

      <hr className="divider" />

      {/* Experience Timeline */}
      <div className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <span className="section-label">// erfahrung</span>
        <div style={{ marginTop: "2rem" }}>
          {EXPERIENCE.map((item, i) => (
            <TimelineItem key={item.title + item.period} item={item} index={i} />
          ))}
        </div>
      </div>

      <hr className="divider" />

      {/* Education */}
      <div ref={eduRef} className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <span className="section-label">// ausbildung</span>
        <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1px" }}>
          {EDUCATION.map((item, i) => (
            <div
              key={item.title}
              style={{
                opacity: eduVisible ? 1 : 0,
                transform: eduVisible ? "none" : "translateY(24px)",
                transition: `opacity 0.7s ease ${i * 120}ms, transform 0.7s ease ${i * 120}ms`,
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "1.8rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <h3 style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "1rem", color: "#fff", marginBottom: "0.3rem" }}>
                    {item.title}
                  </h3>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "#3b82f6", marginBottom: "0.6rem" }}>
                    {item.org}
                  </div>
                </div>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
                  {item.period}
                </span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", lineHeight: 1.7, color: "#a1a1aa" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <hr className="divider" />

      {/* Skills */}
      <div ref={skillRef} className="container" style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
        <span className="section-label">// skills</span>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{
            marginTop: "2rem",
            border: "1px solid rgba(255,255,255,0.06)",
            opacity: skillVisible ? 1 : 0,
            transform: skillVisible ? "none" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {SKILLS.map((group) => (
            <div
              key={group.category}
              style={{
                padding: "1.5rem",
                background: "#0a0a0a",
              }}
            >
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "#3b82f6",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                }}
              >
                {group.category}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {group.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.5)",
                      paddingLeft: "0.8rem",
                      borderLeft: "1px solid rgba(255,255,255,0.08)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
