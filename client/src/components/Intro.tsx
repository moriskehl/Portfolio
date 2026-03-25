/*
 * Intro — 25%–50% scroll zone
 * Clean, distraction-free black background.
 * Focus on maximum readability: DM Sans body, Share Tech Mono headings.
 * Blue accent for key phrases only.
 */

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "17+", label: "Jahre auf Ski" },
  { value: "2×", label: "2. Platz DSL" },
  { value: "5+", label: "Projekte" },
  { value: "∞", label: "Motivation" },
];

function useVisible(threshold = 0.15) {
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

export default function Intro() {
  const { ref, visible } = useVisible();

  return (
    <section
      id="intro"
      ref={ref}
      style={{ background: "#000000", paddingTop: "7rem", paddingBottom: "7rem" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left — text */}
          <div>
            {/* Headshot */}
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(59,130,246,0.3)",
                marginBottom: "1.5rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(16px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              <img
                src="/headshot.jpg"
                alt="Moris Kehl"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <span
              className="section-label"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(16px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              // 01 — über mich
            </span>

            <h2
              className="section-heading"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
              }}
            >
              Von der Piste<br />
              <span style={{ color: "#3b82f6" }}>zum Code.</span>
            </h2>

            <div
              className="border-accent"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "#a1a1aa",
                  marginBottom: "1.2rem",
                }}
              >
                Ich bin Moris — Wirtschaftsinformatik-Abiturient am BSZ Leonberg
                und ab Oktober dualer Student an der DHBW mit SV Informatik GmbH.
                Gleichzeitig fahre ich seit meinem dritten Lebensjahr Skirennlauf
                und starte mit dem Ski Team Seibelseckle in der Deutschen Ski Liga.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "#a1a1aa",
                }}
              >
                Piste und Code haben mehr gemeinsam, als man denkt:
                Präzision, Geschwindigkeit und die Fähigkeit,
                das Gelände vorausschauend zu lesen.
              </p>
            </div>
          </div>

          {/* Right — stats + terminal */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
            }}
          >
            {/* Stats */}
            <div
              className="grid grid-cols-2 gap-px mb-px"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    padding: "1.8rem 1.5rem",
                    background: "#000",
                    borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "2.2rem",
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
                      fontSize: "0.75rem",
                      letterSpacing: "0.08em",
                      color: "rgba(255,255,255,0.3)",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal block */}
            <div
              style={{
                background: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.06)",
                borderTop: "none",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "1.2rem",
                  paddingBottom: "0.8rem",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {[0.15, 0.2, 0.3].map((op, i) => (
                  <div
                    key={i}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: `rgba(255,255,255,${op})`,
                    }}
                  />
                ))}
                <span
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.2)",
                    marginLeft: "8px",
                  }}
                >
                  moris@kehl:~$
                </span>
              </div>

              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.78rem",
                  lineHeight: 2.1,
                }}
              >
                {[
                  { cmd: "whoami", out: "moris_kehl" },
                  { cmd: "cat status.txt", out: "Dualer Student ab Okt. 2026" },
                  { cmd: "cat location.txt", out: "Stuttgart, Deutschland" },
                  { cmd: "ski --ranking", out: "2. Platz Deutsche Ski Liga 🏆" },
                ].map((line, i) => (
                  <div key={i}>
                    <span style={{ color: "rgba(255,255,255,0.25)" }}>$ </span>
                    <span style={{ color: "rgba(255,255,255,0.55)" }}>{line.cmd}</span>
                    <br />
                    <span style={{ color: "#ffffff", paddingLeft: "1rem" }}>
                      {line.out}
                    </span>
                  </div>
                ))}
                <span style={{ color: "rgba(255,255,255,0.25)" }}>
                  $ <span className="cursor-blink" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
