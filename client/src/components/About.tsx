/*
 * About — "Digital Descent"
 * Asymmetric two-column layout: left text block, right terminal-style card.
 * Ice-blue accents, section-accent border-left.
 */

import { useEffect, useRef, useState } from "react";

const STATS = [
  { label: "Years in IT", value: "8+" },
  { label: "Ski Seasons", value: "12" },
  { label: "Projects Shipped", value: "40+" },
  { label: "Black Runs Survived", value: "∞" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="relative py-28 overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,249,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(125,249,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative">
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
          // 01 — about.me
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left — text */}
          <div className="lg:col-span-3">
            <h2
              className={`mb-6 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 400,
                color: "#FFFFFF",
                lineHeight: 1.15,
              }}
            >
              Where the slopes<br />
              <span style={{ color: "#7DF9FF" }}>meet the stack.</span>
            </h2>

            <div
              className={`section-accent transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "rgba(232,244,248,0.75)",
                  marginBottom: "1.2rem",
                }}
              >
                I'm a software engineer with a passion for building clean, scalable systems —
                and an equally strong obsession with finding fresh powder on a Saturday morning.
                The two worlds aren't as different as they seem: both demand precision, adaptability,
                and the ability to read the terrain ahead.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "rgba(232,244,248,0.75)",
                }}
              >
                By day I architect backend systems and lead engineering teams. By winter weekend,
                I'm chasing black runs in the Alps. This portfolio sits at the intersection of both.
              </p>
            </div>

            {/* Stats row */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "2rem",
                      color: "#7DF9FF",
                      textShadow: "0 0 16px rgba(125,249,255,0.6)",
                      lineHeight: 1,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.72rem",
                      letterSpacing: "0.1em",
                      color: "rgba(232,244,248,0.45)",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — terminal card */}
          <div
            className={`lg:col-span-2 ice-card p-6 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ borderRadius: "4px" }}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-5 pb-4" style={{ borderBottom: "1px solid rgba(125,249,255,0.1)" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "rgba(125,249,255,0.2)" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "rgba(56,189,248,0.3)" }} />
              <span
                className="ml-2"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "rgba(125,249,255,0.4)",
                }}
              >
                alex@nordic:~$
              </span>
            </div>

            {/* Terminal content */}
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "0.8rem",
                lineHeight: 2,
                color: "rgba(232,244,248,0.8)",
              }}
            >
              {[
                { prompt: "$ whoami", output: "alex_nordic" },
                { prompt: "$ cat role.txt", output: "Senior Software Engineer" },
                { prompt: "$ cat location.txt", output: "Oslo, Norway 🇳🇴" },
                { prompt: "$ cat hobbies.json", output: '["skiing","hiking","code"]' },
                { prompt: "$ uptime", output: "8 yrs, 40+ projects" },
                { prompt: "$ ski --status", output: "⛷  powder detected — 28cm" },
              ].map((line, i) => (
                <div key={i}>
                  <span style={{ color: "rgba(125,249,255,0.6)" }}>{line.prompt}</span>
                  <br />
                  <span style={{ color: "#E8F4F8", paddingLeft: "1rem" }}>{line.output}</span>
                </div>
              ))}
              <span style={{ color: "rgba(125,249,255,0.6)" }}>$ <span className="cursor-blink" /></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
