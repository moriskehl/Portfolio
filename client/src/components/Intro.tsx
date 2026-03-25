/*
 * Intro — 25%–50% scroll zone
 * Clean, distraction-free black background.
 * Focus on maximum readability: DM Sans body, Share Tech Mono headings.
 * Blue accent for key phrases only.
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy } from "lucide-react";
import { useScrollSwap } from "../hooks/useScrollSwap";

const STATS = [
  { value: "17+", label: "Jahre auf Ski" },
  { value: "2×", label: "2. Platz DSL" },
  { value: "5+", label: "Projekte" },
  { value: "∞", label: "Motivation" },
];

export default function Intro() {
  const { ref: swapRef, past } = useScrollSwap(0.35);

  return (
    <section
      id="intro"
      style={{ background: "#000000", paddingTop: "7rem", paddingBottom: "7rem", overflow: "hidden" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left — text */}
          <div>
            {/* Headshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(59,130,246,0.3)",
                marginBottom: "1.5rem",
              }}
            >
              <img
                src="/headshot.jpg"
                alt="Moris Kehl"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>
            
            <motion.span
              className="section-label"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: "block" }}
            >
              // 01 — über mich
            </motion.span>

            <motion.h2
              ref={swapRef as React.RefObject<HTMLHeadingElement>}
              className="section-heading"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span style={{ color: past ? "#ffffff" : "#3b82f6", transition: "color 0.6s ease" }}>Von der Piste</span><br />
              <span style={{ color: past ? "#3b82f6" : "#ffffff", transition: "color 0.6s ease" }}>zum Code.</span>
            </motion.h2>

            <motion.div
              className="border-accent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
                Ich bin Moris, Abiturient am BSZ Leonberg
                und ab Oktober dualer Student an der DHBW mit SV Informatik GmbH.
                <br />
                Gleichzeitig fahre ich seit meinem dritten Lebensjahr Skirennlauf
                und starte mit dem Ski Team Seibelseckle in der Deutschen Ski Liga.
              </p>
            </motion.div>
          </div>

          {/* Right — stats + terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
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
                  justifyContent: "space-between",
                  marginBottom: "1.2rem",
                  paddingBottom: "0.8rem",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      color: "rgba(255,255,255,0.2)",
                    }}
                  >
                    moris@kehl:~$
                  </span>
                </div>
                <div style={{ display: "flex", gap: "14px", color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", fontFamily: "sans-serif" }}>
                  <span style={{ cursor: "default" }}>—</span>
                  <span style={{ cursor: "default" }}>□</span>
                  <span style={{ cursor: "default" }}>✕</span>
                </div>
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
                  { cmd: "ski --ranking", out: <span style={{display: "inline-flex", alignItems: "center", gap: "0.4rem"}}>2. Platz Deutsche Ski Liga <Trophy size={12} /></span> },
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
