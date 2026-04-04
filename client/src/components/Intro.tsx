/*
 * Intro — 25%–50% scroll zone
 * Clean, distraction-free background.
 * Focus on maximum readability: DM Sans body, Share Tech Mono headings.
 * Blue accent for key phrases only.
 *
 * Easter Egg: clicking ✕ on the terminal opens a sudo password prompt
 * that grants access to /secret when the correct password is entered.
 */

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useScrollSwap } from "../hooks/useScrollSwap";
import { useTranslation } from "react-i18next";
import { useLocation } from "wouter";
import { hashPassword } from "../lib/crypto";

/* SHA-256 hash of the dashboard password */
const PASSWORD_HASH = "eabe6030fabfa54fefca1e4241c8f107083f589c40efe73a2436dd50580a1d47";

export default function Intro() {
  const { t } = useTranslation();
  const { ref: swapRef, past } = useScrollSwap(0.35);
  const [, navigate] = useLocation();

  /* Easter-egg state */
  const [secretMode, setSecretMode] = useState(false);
  const [secretInput, setSecretInput] = useState("");
  const [secretError, setSecretError] = useState(false);
  const [secretGranted, setSecretGranted] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const STATS = [
    { value: "17+", label: t("intro.stats.yearsSkiing") },
    { value: "2×", label: t("intro.stats.dslRank") },
    { value: "5+", label: t("intro.stats.projects") },
    { value: "∞", label: t("intro.stats.motivation") },
  ];

  /* Focus input when secret mode activates */
  useEffect(() => {
    if (secretMode && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [secretMode]);

  /* Progress bar animation after access granted */
  useEffect(() => {
    if (!secretGranted) return;
    let frame = 0;
    const total = 30;
    const interval = setInterval(() => {
      frame++;
      setProgress(Math.min(100, Math.round((frame / total) * 100)));
      if (frame >= total) {
        clearInterval(interval);
        navigate("/secret");
      }
    }, 40);
    return () => clearInterval(interval);
  }, [secretGranted, navigate]);

  const handleSecretSubmit = useCallback(async () => {
    if (!secretInput.trim()) return;

    const hash = await hashPassword(secretInput);
    if (hash === PASSWORD_HASH) {
      sessionStorage.setItem("__sk", "1");
      setSecretGranted(true);
    } else {
      setSecretError(true);
      setSecretInput("");
      setTimeout(() => setSecretError(false), 600);
    }
  }, [secretInput]);

  const handleCloseClick = () => {
    if (secretMode) {
      /* Cancel secret mode */
      setSecretMode(false);
      setSecretInput("");
      setSecretError(false);
    } else {
      setSecretMode(true);
    }
  };

  /* Render the terminal content */
  const renderTerminalContent = () => {
    if (secretGranted) {
      return (
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.78rem",
            lineHeight: 2.1,
          }}
        >
          <div>
            <span style={{ color: "var(--t-text-faint)" }}>$ </span>
            <span style={{ color: "var(--t-text-muted)" }}>sudo access --restricted</span>
          </div>
          <div style={{ color: "#22c55e", paddingLeft: "1rem" }}>
            {t("secret.granted")}
          </div>
          <div style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
            <span style={{ color: "var(--t-text-faint)" }}>[</span>
            <span style={{ color: "#22c55e" }}>
              {"█".repeat(Math.floor(progress / 5))}
            </span>
            <span style={{ color: "var(--t-text-faint)" }}>
              {"░".repeat(20 - Math.floor(progress / 5))}
            </span>
            <span style={{ color: "var(--t-text-faint)" }}>] </span>
            <span style={{ color: "var(--t-text-muted)" }}>{progress}%</span>
          </div>
        </div>
      );
    }

    if (secretMode) {
      return (
        <div
          className={secretError ? "secret-shake" : ""}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.78rem",
            lineHeight: 2.1,
          }}
        >
          <div>
            <span style={{ color: "var(--t-text-faint)" }}>$ </span>
            <span style={{ color: "var(--t-text-muted)" }}>sudo access --restricted</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", paddingLeft: "1rem" }}>
            <span style={{ color: "var(--t-text-muted)", whiteSpace: "nowrap" }}>
              {t("secret.prompt")}{" "}
            </span>
            <div style={{ position: "relative", flex: 1 }}>
              <input
                ref={inputRef}
                type="password"
                value={secretInput}
                onChange={(e) => setSecretInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSecretSubmit();
                  if (e.key === "Escape") handleCloseClick();
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--t-text)",
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "0.78rem",
                  width: "100%",
                  padding: 0,
                  caretColor: "var(--t-accent)",
                }}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>
          {secretError && (
            <div style={{ color: "#ef4444", paddingLeft: "1rem", fontSize: "0.75rem" }}>
              {t("secret.denied")}
            </div>
          )}
        </div>
      );
    }

    /* Default terminal content */
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
      style={{ background: "var(--t-bg)", paddingTop: "7rem", paddingBottom: "7rem", overflow: "hidden" }}
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
                border: "2px solid var(--t-accent-border)",
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
              aria-hidden="true"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: "block" }}
            >
              {t("intro.label")}
            </motion.span>

            <motion.h2
              ref={swapRef as React.RefObject<HTMLHeadingElement>}
              className="section-heading"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span style={{ color: past ? "var(--t-text)" : "var(--t-accent)", transition: "color 0.6s ease" }}>{t("intro.heading1")}</span><br />
              <span style={{ color: past ? "var(--t-accent)" : "var(--t-text)", transition: "color 0.6s ease" }}>{t("intro.heading2")}</span>
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
                  color: "var(--t-text-secondary)",
                  marginBottom: "1.2rem",
                }}
              >
                {t("intro.bio")}
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
                  <span
                    onClick={handleCloseClick}
                    style={{
                      cursor: "pointer",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = secretMode ? "var(--t-accent)" : "#ef4444")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--t-text-faint)")}
                    title={secretMode ? "Cancel" : ""}
                  >
                    ✕
                  </span>
                </div>
              </div>

              {renderTerminalContent()}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
