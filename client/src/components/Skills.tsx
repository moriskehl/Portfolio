/*
 * Skills — "Digital Descent"
 * Two columns: Tech skills (left) + Ski/Outdoor skills (right).
 * Animated ice-blue progress bars, triggered on scroll.
 */

import { useEffect, useRef, useState } from "react";

const TECH_SKILLS = [
  { name: "TypeScript / JavaScript", level: 95 },
  { name: "React / Next.js", level: 90 },
  { name: "Node.js / Express", level: 88 },
  { name: "Python / FastAPI", level: 82 },
  { name: "PostgreSQL / Redis", level: 80 },
  { name: "Docker / Kubernetes", level: 75 },
  { name: "AWS / Cloud Infra", level: 78 },
  { name: "System Design", level: 85 },
];

const SKI_SKILLS = [
  { name: "Alpine / Downhill", level: 92 },
  { name: "Off-Piste / Backcountry", level: 80 },
  { name: "Moguls", level: 70 },
  { name: "Ski Touring", level: 75 },
  { name: "Powder Hunting", level: 98 },
];

const TECH_TAGS = [
  "TypeScript", "React", "Node.js", "Python", "PostgreSQL",
  "Redis", "Docker", "Kubernetes", "AWS", "GraphQL",
  "REST APIs", "CI/CD", "Terraform", "Linux", "Git",
];

function SkillBar({ name, level, delay, visible }: { name: string; level: number; delay: number; visible: boolean }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setWidth(level), delay);
      return () => clearTimeout(t);
    }
  }, [visible, level, delay]);

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.78rem",
            letterSpacing: "0.05em",
            color: "rgba(232,244,248,0.85)",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.7rem",
            color: "rgba(125,249,255,0.7)",
          }}
        >
          {level}%
        </span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="relative py-28 overflow-hidden">
      <hr className="ice-divider mb-0" style={{ marginBottom: 0 }} />

      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(125,249,255,0.04) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
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
          // 02 — skills.map()
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
          Expertise on the<br />
          <span style={{ color: "#7DF9FF" }}>piste & the stack.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Tech skills */}
          <div
            className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h3
              className="mb-8 section-accent"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
                color: "rgba(125,249,255,0.8)",
                textTransform: "uppercase",
              }}
            >
              Engineering
            </h3>
            {TECH_SKILLS.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={200 + i * 80} visible={visible} />
            ))}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {TECH_TAGS.map((tag) => (
                <span key={tag} className="ice-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Ski skills */}
          <div
            className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h3
              className="mb-8 section-accent"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
                color: "rgba(125,249,255,0.8)",
                textTransform: "uppercase",
              }}
            >
              On the Mountain
            </h3>
            {SKI_SKILLS.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={300 + i * 100} visible={visible} />
            ))}

            {/* Mountain stats card */}
            <div
              className="ice-card mt-8 p-6"
              style={{ borderRadius: "4px" }}
            >
              <p
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  color: "rgba(125,249,255,0.5)",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                // Favorite Resorts
              </p>
              {[
                { name: "Chamonix, France", runs: "Black ★★★" },
                { name: "Verbier, Switzerland", runs: "Off-piste ★★★" },
                { name: "Åre, Sweden", runs: "All-mountain ★★" },
                { name: "Hemsedal, Norway", runs: "Powder ★★★" },
              ].map((r) => (
                <div
                  key={r.name}
                  className="flex justify-between items-center py-2"
                  style={{ borderBottom: "1px solid rgba(125,249,255,0.07)" }}
                >
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(232,244,248,0.8)" }}>
                    {r.name}
                  </span>
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", color: "rgba(125,249,255,0.6)" }}>
                    {r.runs}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
