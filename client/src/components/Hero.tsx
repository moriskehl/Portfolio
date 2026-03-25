/*
 * Hero — ASCII Mountain variant
 * No matrix rain. The entire background is the live ASCII render of the GLB mountain.
 * Layer stack: AsciiMountain → vignette → text overlay
 */

import { useCallback, useEffect, useRef, useState } from "react";
import AsciiMountain from "./AsciiMountain";

const NAME = "MORIS_KEHL";

function useMatrixReveal(text: string, startDelay = 400) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$_-";
    const totalFrames = text.length * 5 + 8;
    let frame = 0;
    let raf: number;

    const timer = setTimeout(() => {
      const tick = () => {
        frame++;
        const revealed = Math.floor((frame / totalFrames) * text.length);
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (i < revealed) {
            result += text[i];
          } else if (i < revealed + 3) {
            result += SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
          } else {
            result += "\u00A0";
          }
        }
        setDisplayed(result);
        if (frame < totalFrames) {
          raf = requestAnimationFrame(tick);
        } else {
          setDisplayed(text);
          setDone(true);
        }
      };
      raf = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, startDelay]);

  return { displayed, done };
}

export default function Hero() {
  const { displayed, done } = useMatrixReveal(NAME, 800);
  const [showSub, setShowSub] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [loading, setLoading] = useState(true);

  // Hide loading overlay once ASCII starts rendering (after a short grace period)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!done) return;
    const t1 = setTimeout(() => setShowSub(true), 250);
    const t2 = setTimeout(() => setShowCta(true), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [done]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px", background: "#000000" }}
    >
      {/* Layer 1 — ASCII mountain (fills entire hero) */}
      <AsciiMountain />

      {/* Layer 2 — Loading state */}
      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 10,
            background: "#000000",
            transition: "opacity 0.8s ease",
          }}
        >
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
            }}
          >
            loading terrain...
          </div>
        </div>
      )}

      {/* Layer 3 — Radial vignette to darken edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background:
            "radial-gradient(ellipse 90% 80% at 50% 55%, transparent 20%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Layer 4 — Bottom fade into content sections */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          zIndex: 4,
          height: "220px",
          background: "linear-gradient(to bottom, transparent, #000000)",
        }}
      />

      {/* Layer 5 — Hero text (pointer-events:none so controls panel underneath stays clickable) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        style={{ zIndex: 5, pointerEvents: "none" }}
      >
        {/* Pre-title */}
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.32em",
            color: "#3b82f6",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "1.4rem",
            opacity: 0,
            animation: "fade-up 0.7s ease 0.2s forwards",
          }}
        >
          // portfolio.init()
        </span>

        {/* Name */}
        <h1
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(2.6rem, 8.5vw, 7rem)",
            fontWeight: 400,
            letterSpacing: "0.06em",
            lineHeight: 1,
            color: "#FFFFFF",
            textShadow:
              "0 0 60px rgba(0,0,0,0.9), 0 2px 40px rgba(0,0,0,0.8)",
            marginBottom: "1.4rem",
            whiteSpace: "nowrap",
          }}
        >
          {displayed}
          {!done && (
            <span
              style={{
                color: "#3b82f6",
                fontWeight: 400,
                marginLeft: "4px",
                textShadow: "0 0 10px rgba(59,130,246,0.9)",
                animation: "blink 0.75s step-end infinite",
                display: "inline",
                fontSize: "0.85em",
              }}
            >|</span>
          )}
        </h1>

        {/* Subtitle */}
        {showSub && (
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
              fontWeight: 300,
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.45)",
              marginBottom: "3rem",
              textTransform: "uppercase",
              opacity: 0,
              animation: "fade-up 0.7s ease forwards",
              textShadow: "0 0 20px rgba(0,0,0,0.9)",
            }}
          >
            Wirtschaftsinformatiker&nbsp;&nbsp;·&nbsp;&nbsp;Skirennfahrer
          </p>
        )}

        {/* CTAs */}
        {showCta && (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
              opacity: 0,
              animation: "fade-up 0.7s ease forwards",
              pointerEvents: "all",
            }}
          >
            <button className="btn-primary" onClick={() => scrollTo("intro")}>
              View Work
            </button>
            <button
              className="btn-outline"
              onClick={() => scrollTo("contact")}
            >
              Get In Touch
            </button>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          zIndex: 5,
          opacity: showCta ? 1 : 0,
          transition: "opacity 1.2s ease 0.8s",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background:
              "linear-gradient(to bottom, rgba(59,130,246,0.7), transparent)",
          }}
        />
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.56rem",
            letterSpacing: "0.32em",
            color: "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
      </div>
    </section>
  );
}
