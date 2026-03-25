/*
 * Achievements — Skirennlauf Erfolge
 * Dark theme with scroll animations and hover effects
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Medal, Activity, PlayCircle } from "lucide-react";
import SubPageFooter from "../components/SubPageFooter";
import { useScrollSwap } from "../hooks/useScrollSwap";

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

const ACHIEVEMENTS = [
  {
    year: "2026",
    title: "2. Platz Deutsche Ski Liga",
    badge: <><Medal size={12} /> Silber</>,
    desc: "Erneut auf dem Podium, wir konnten den zweiten Platz in der Teamwertung der Deutschen Ski Liga verteidigen.",
    detail: "Deutsche Ski Liga · Teamwertung",
  },
  {
    year: "2025",
    title: "2. Platz Deutsche Ski Liga",
    badge: <><Medal size={12} /> Silber</>,
    desc: "Ein großer Erfolg auf nationaler Ebene.",
    detail: "Deutsche Ski Liga · Teamwertung",
  },
  {
    year: "seit 2025",
    title: "Ski Team Seibelseckle",
    badge: <><Activity size={12} /> Aktiv</>,
    desc: "Training, Wettkämpfe und Leidenschaft für den Wintersport im Ski Team Seibelseckle.",
    detail: "Skirennlauf · Schwarzwald",
    image: "/seibelseckle.jpg"
  },
  {
    year: "2013 – 2025",
    title: "Bezirk SSV Nord",
    badge: <><PlayCircle size={12} /> Start der Rennkarriere</>,
    desc: "Mit 6 Jahren dem Bezirk SSV Nord beigetreten und dort über ein Jahrzehnt den Grundstein für die Skirennlauf-Karriere gelegt.",
    detail: "Grundlagen & Renntraining",
  },
];

const STATS = [
  { value: "17+", label: "Saisons" },
  { value: "2×", label: "DSL Silber" },
  { value: "2013", label: "Team-Beitritt" },
  { value: "∞", label: "Leidenschaft" },
];

function AchievementCard({ item, index }: { item: typeof ACHIEVEMENTS[0] & { image?: string }; index: number }) {
  const { ref, visible } = useVisible();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr",
        gap: "2rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(28px)",
        transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
        padding: "2.5rem 2rem",
        background: hovered ? "rgba(59,130,246,0.03)" : "#0a0a0a",
        border: `1px solid ${hovered ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.06)"}`,
        marginBottom: "1px",
        cursor: "default",
        boxShadow: hovered ? "0 0 40px rgba(59,130,246,0.05)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Year column */}
      <div>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            color: hovered ? "#3b82f6" : "rgba(255,255,255,0.2)",
            transition: "color 0.3s",
            writingMode: "vertical-lr",
            transform: "rotate(180deg)",
            whiteSpace: "nowrap",
          }}
        >
          {item.year}
        </div>
      </div>

      {/* Content */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}>
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              padding: "0.3rem 0.7rem",
              border: "1px solid rgba(59,130,246,0.3)",
              background: "rgba(59,130,246,0.08)",
              color: "#3b82f6",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            {item.badge}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "1.2rem",
            color: "#ffffff",
            marginBottom: "0.8rem",
          }}
        >
          {item.title}
        </h3>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.92rem",
            lineHeight: 1.75,
            color: "#a1a1aa",
            marginBottom: "0.8rem",
          }}
        >
          {item.desc}
        </p>

        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          {item.detail}
        </span>

        {item.image && (
          <div style={{ 
            marginTop: "1.5rem", 
            maxWidth: "380px",
            overflow: "hidden", 
            border: "1px solid rgba(255,255,255,0.15)",
            clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
          }}>
            <img
              src={item.image}
              alt={item.title}
              style={{ 
                width: "100%", 
                height: "auto", 
                display: "block",
                clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)" 
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Achievements() {
  const { ref: headerRef, visible: headerVisible } = useVisible();
  const { ref: statsRef, visible: statsVisible } = useVisible();
  const { ref: swapRef, past } = useScrollSwap(0.35);

  return (
    <div className="page-enter" style={{ background: "#000", minHeight: "100dvh" }}>

      {/* Header */}
      <div ref={headerRef} className="container" style={{ paddingTop: "8rem", paddingBottom: "4rem" }}>
        <span
          className="section-label"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          // erfolge
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
          <span style={{ color: past ? "#ffffff" : "#3b82f6", transition: "color 0.6s ease" }}>Skirennlauf &</span><br />
          <span style={{ color: past ? "#3b82f6" : "#ffffff", transition: "color 0.6s ease" }}>Erfolge.</span>
        </h1>
      </div>

      <hr className="divider" />

      {/* Stats bar */}
      <div ref={statsRef} className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-px"
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            opacity: statsVisible ? 1 : 0,
            transform: statsVisible ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "1.5rem",
                background: "#0a0a0a",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "1.8rem",
                  color: "#3b82f6",
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement cards */}
      <div className="container" style={{ paddingBottom: "6rem" }}>
        {ACHIEVEMENTS.map((item, i) => (
          <AchievementCard key={item.title + item.year} item={item} index={i} />
        ))}
      </div>

      <SubPageFooter />
    </div>
  );
}
