/*
 * Intro — 25%–50% scroll zone
 * Clean, distraction-free background.
 * Focus on maximum readability: DM Sans body, Share Tech Mono headings.
 * Blue accent for key phrases only.
 */

import { useRef, useLayoutEffect } from "react";
import { Trophy } from "lucide-react";
import { useScrollSwap } from "../hooks/useScrollSwap";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RadialHover from "./RadialHover";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const { t } = useTranslation();
  const { ref: swapRef, past } = useScrollSwap(0.35);
  const containerRef = useRef<HTMLDivElement>(null);

  const STATS = [
    { value: "17+", label: t("intro.stats.yearsSkiing") },
    { value: "2×", label: t("intro.stats.dslRank") },
    { value: "5+", label: t("intro.stats.projects") },
    { value: "∞", label: t("intro.stats.motivation") },
  ];

  /* GSAP Deterministic Scroll */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const leftElements = gsap.utils.toArray('.scrub-left');
      const rightElements = gsap.utils.toArray('.scrub-right');

      leftElements.forEach((el: any) => {
        gsap.fromTo(el, 
          { opacity: 0, x: -30, y: 10 },
          {
            opacity: 1, x: 0, y: 0, ease: "none",
            scrollTrigger: { trigger: containerRef.current, start: "top 80%", end: "top 30%", scrub: true }
          }
        );
      });

      rightElements.forEach((el: any) => {
        gsap.fromTo(el, 
          { opacity: 0, x: 40, y: 10 },
          {
            opacity: 1, x: 0, y: 0, ease: "none",
            scrollTrigger: { trigger: containerRef.current, start: "top 80%", end: "top 30%", scrub: true }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  /* Render the terminal content */
  const renderTerminalContent = () => {
    return (
      <div
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "0.78rem",
          lineHeight: 2.1,
        }}
      >
        {[
          { cmd: "whoami", out: "moris_kehl" },
          { cmd: "cat status.txt", out: t("intro.terminal.status") },
          { cmd: "cat location.txt", out: t("intro.terminal.location") },
          { cmd: "ski --ranking", out: <span style={{display: "inline-flex", alignItems: "center", gap: "0.4rem"}}>{t("intro.terminal.ranking")} <Trophy size={12} /></span> },
        ].map((line, i) => (
          <div key={i}>
            <span style={{ color: "var(--t-text-faint)" }}>$ </span>
            <span style={{ color: "var(--t-text-muted)" }}>{line.cmd}</span>
            <br />
            <span style={{ color: "var(--t-text)", paddingLeft: "1rem" }}>
              {line.out}
            </span>
          </div>
        ))}
        <span style={{ color: "var(--t-text-faint)" }}>
          $ <span className="cursor-blink" />
        </span>
      </div>
    );
  };

  return (
    <section
      id="intro"
      ref={containerRef}
      style={{ background: "var(--t-bg)", paddingTop: "7rem", paddingBottom: "7rem", overflow: "hidden" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left — text */}
          <div>
            {/* Headshot */}
            <div
              className="scrub-left"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid var(--t-accent-border)",
                marginBottom: "1.5rem",
              }}
            >
              <img
                src="/headshot.jpg"
                alt="Moris Kehl"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            
            <span
              className="section-label scrub-left"
              aria-hidden="true"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              {t("intro.label")}
            </span>

            <RadialHover className="section-heading scrub-left">
              <h2 ref={swapRef as React.RefObject<HTMLHeadingElement>} style={{ margin: 0 }}>
                <span style={{ color: past ? "var(--t-text)" : "var(--t-accent)", transition: "color 0.6s ease" }}>{t("intro.heading1")}</span><br />
                <span style={{ color: past ? "var(--t-accent)" : "var(--t-text)", transition: "color 0.6s ease" }}>{t("intro.heading2")}</span>
              </h2>
            </RadialHover>

            <div
              className="border-accent scrub-left"
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "var(--t-text-secondary)",
                  marginBottom: "1.2rem",
                }}
              >
                {t("intro.bio")}
              </p>
            </div>
          </div>

          {/* Right — stats + terminal */}
          <div
            className="scrub-right"
          >
            {/* Stats */}
            <div
              className="grid grid-cols-2 gap-px mb-px"
              style={{ border: "1px solid var(--t-border)" }}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    padding: "1.8rem 1.5rem",
                    background: "var(--t-bg)",
                    borderRight: i % 2 === 0 ? "1px solid var(--t-border)" : "none",
                    borderBottom: i < 2 ? "1px solid var(--t-border)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "2.2rem",
                      color: "var(--t-accent)",
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
                      color: "var(--t-text-faint)",
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
                background: "var(--t-bg-secondary)",
                border: "1px solid var(--t-border)",
                borderTop: "none",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.2rem",
                  paddingBottom: "0.8rem",
                  borderBottom: "1px solid var(--t-border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      color: "var(--t-text-faint)",
                    }}
                  >
                    moris@kehl:~$
                  </span>
                </div>
                <div style={{ display: "flex", gap: "14px", color: "var(--t-text-faint)", fontSize: "0.7rem", fontFamily: "sans-serif" }}>
                  <span style={{ cursor: "default" }}>—</span>
                  <span style={{ cursor: "default" }}>□</span>
                  <span style={{ cursor: "default" }}>✕</span>
                </div>
              </div>

              {renderTerminalContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
