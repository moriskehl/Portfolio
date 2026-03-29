/*
 * Achievements — Skirennlauf Erfolge
 * Themed with scroll animations and hover effects
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Medal, Activity, PlayCircle } from "lucide-react";
import SubPageFooter from "../components/SubPageFooter";
import { useScrollSwap } from "../hooks/useScrollSwap";
import { useTranslation } from "react-i18next";

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

function AchievementCard({ item, index }: { item: any; index: number }) {
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
        background: hovered ? "var(--t-card-hover-bg)" : "var(--t-bg-secondary)",
        border: `1px solid ${hovered ? "var(--t-border-hover)" : "var(--t-border)"}`,
        marginBottom: "1px",
        cursor: "default",
        boxShadow: hovered ? "0 0 40px var(--t-card-hover-shadow)" : "none",
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
            color: hovered ? "var(--t-accent)" : "var(--t-text-faint)",
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
              border: "1px solid var(--t-accent-border)",
              background: "var(--t-accent-subtle)",
              color: "var(--t-accent)",
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
            color: "var(--t-text)",
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
            color: "var(--t-text-secondary)",
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
            color: "var(--t-text-faint)",
          }}
        >
          {item.detail}
        </span>

        {item.image && (
          <div style={{ 
            marginTop: "1.5rem", 
            maxWidth: "380px",
            overflow: "hidden", 
            border: "1px solid var(--t-border-input)",
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
  const { t } = useTranslation();
  const { ref: headerRef, visible: headerVisible } = useVisible();
  const { ref: statsRef, visible: statsVisible } = useVisible();
  const { ref: swapRef, past } = useScrollSwap(0.35);

  const ACHIEVEMENTS = [
    {
      year: "2026",
      title: t("achievements.items.a2026.title"),
      badge: <><Medal size={12} /> {t("achievements.items.a2026.badge")}</>,
      desc: t("achievements.items.a2026.desc"),
      detail: t("achievements.items.a2026.detail"),
    },
    {
      year: "2025",
      title: t("achievements.items.a2025.title"),
      badge: <><Medal size={12} /> {t("achievements.items.a2025.badge")}</>,
      desc: t("achievements.items.a2025.desc"),
      detail: t("achievements.items.a2025.detail"),
    },
    {
      year: "seit 2025",
      title: t("achievements.items.seibelseckle.title"),
      badge: <><Activity size={12} /> {t("achievements.items.seibelseckle.badge")}</>,
      desc: t("achievements.items.seibelseckle.desc"),
      detail: t("achievements.items.seibelseckle.detail"),
      image: "/seibelseckle.jpg"
    },
    {
      year: "2013 – 2025",
      title: t("achievements.items.ssvNord.title"),
      badge: <><PlayCircle size={12} /> {t("achievements.items.ssvNord.badge")}</>,
      desc: t("achievements.items.ssvNord.desc"),
      detail: t("achievements.items.ssvNord.detail"),
    },
  ];

  const STATS = [
    { value: "17+", label: t("achievements.stats.saisons") },
    { value: "2×", label: t("achievements.stats.dslSilber") },
    { value: "2013", label: t("achievements.stats.teamEntry") },
    { value: "∞", label: t("achievements.stats.passion") },
  ];

  return (
    <div className="page-enter" style={{ background: "var(--t-bg)", minHeight: "100dvh" }}>

      {/* Header */}
      <div ref={headerRef} className="container" style={{ paddingTop: "8rem", paddingBottom: "4rem" }}>
        <span
          className="section-label"
          aria-hidden="true"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {t("achievements.label")}
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
          <span style={{ color: past ? "var(--t-text)" : "var(--t-accent)", transition: "color 0.6s ease" }}>{t("achievements.heading1")}</span><br />
          <span style={{ color: past ? "var(--t-accent)" : "var(--t-text)", transition: "color 0.6s ease" }}>{t("achievements.heading2")}</span>
        </h1>
      </div>

      <hr className="divider" />

      {/* Stats bar */}
      <div ref={statsRef} className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-px"
          style={{
            border: "1px solid var(--t-border)",
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
                background: "var(--t-bg-secondary)",
                borderRight: i < 3 ? "1px solid var(--t-border)" : "none",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "1.8rem",
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
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  color: "var(--t-text-faint)",
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
