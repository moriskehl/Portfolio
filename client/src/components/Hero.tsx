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
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$_-";
    const totalFrames = Math.floor(text.length * 5 + 8);
    let frame = 0;

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
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayed(text);
          setDone(true);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, startDelay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, startDelay]);

  return { displayed, done };
}

export default function Hero() {
  const { displayed, done } = useMatrixReveal(NAME, 800);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // We now rely on onLoad from AsciiMountain or a fallback.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 5000); // 5s fallback
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setShowSub(true), 250);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "450px", background: "#000000" }}
    >
      <div 
        className="absolute inset-0"
        style={{ 
          opacity: loading ? 0 : 1, 
          transition: "opacity 2.5s ease", /* Fades in smoothly as soon as loaded */
          zIndex: 1 
        }}
      >
        <AsciiMountain onLoad={() => setLoading(false)} />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background:
            "radial-gradient(ellipse 90% 80% at 50% 55%, transparent 20%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          zIndex: 4,
          height: "220px",
          background: "linear-gradient(to bottom, transparent, #000000)",
        }}
      />

      <div
        className="absolute inset-0 flex flex-col items-center justify-start sm:justify-center text-center px-6 pt-[18vh] sm:pt-0"
        style={{ zIndex: 5, pointerEvents: "none" }}
      >
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

        <h1
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(1.8rem, 8vw, 7rem)",
            fontWeight: 400,
            letterSpacing: "0.06em",
            lineHeight: 1,
            color: "#FFFFFF",
            textShadow:
              "0 0 60px rgba(0,0,0,0.9), 0 2px 40px rgba(0,0,0,0.8)",
            marginBottom: "1.4rem",
            whiteSpace: "nowrap",
            pointerEvents: "all",
            cursor: "default",
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

        {showSub && (
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.8rem, 1.8vw, 1rem)",
              fontWeight: 300,
              letterSpacing: "0.22em",
              color: "#3b82f6",
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
      </div>

      {/* Small scroll indicator arrow */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          opacity: scrolled || !done ? 0 : 0.6,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRight: "2px solid rgba(255,255,255,0.4)",
            borderBottom: "2px solid rgba(255,255,255,0.4)",
            transform: "rotate(45deg)",
            animation: "scroll-bounce 3.5s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes scroll-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0) rotate(45deg); }
          40% { transform: translateY(-10px) rotate(45deg); }
          60% { transform: translateY(-5px) rotate(45deg); }
        }
      `}</style>
    </section>
  );
}