/*
 * NavigationGrid — 50%–85% scroll zone
 * Responsive 3-column (desktop) / 1-column (mobile) tile grid.
 * Tiles: Software & Systems, Alpine Sport, Career.
 * Black bg, white text, blue hover (border + glow + icon).
 */

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Link } from "wouter";
import { useScrollSwap } from "../hooks/useScrollSwap";

const TILES = [
  {
    id: "software",
    icon: "{ }",
    title: "Software & Projekte",
    desc: "Web-Entwicklung, KI-Experimente und Full-Stack Projekte — von PHP-Portalen bis hin zu Kartenzähl-Algorithmen.",
    cta: "Projekte ansehen",
    url: "/projects",
    items: [
      "Abiball Portal — PHP-Eventmanagement (bsz.app)",
      "IT-Puzzle — Bewerber-Testplattform (SSC-Services)",
      "Blackjack AI — Kartenzähl-KI (Seminarkurs)",
      "Portfolio — React + Three.js + ASCII-Renderer",
    ],
  },
  {
    id: "alpine",
    icon: "/\\",
    title: "Skirennlauf",
    desc: "Seit dem Alter von 2,5 Jahren auf Ski. Aktiver Rennläufer im Ski Team Seibelseckle in der Deutschen Ski Liga.",
    cta: "Erfolge ansehen",
    url: "/achievements",
    items: [
      "2026 — 2. Platz Deutsche Ski Liga (Team)",
      "2025 — 2. Platz Deutsche Ski Liga (Team)",
      "Ski Team Seibelseckle — Aktiver Rennläufer",
      "17+ Saisons auf Schnee",
    ],
  },
  {
    id: "career",
    icon: "—",
    title: "Werdegang",
    desc: "Vom Sportgymnasium über das Wirtschaftsinformatik-Abitur zum dualen Studium — mit Praxiserfahrung in IT und Einzelhandel.",
    cta: "Lebenslauf ansehen",
    url: "/cv",
    items: [
      "Ab Okt. 2026 — Duales Studium DHBW, SV Informatik GmbH",
      "2025 — Praktikum, SSC-Services GmbH (JavaScript, Node.js)",
      "2023–2026 — Abitur Wirtschaft, BSZ Leonberg",
      "2017–2023 — Sport Profil, Maria Von Linden-Gymnasium",
    ],
  },
];

function Tile({
  tile,
  opacity,
  x,
  y,
}: {
  tile: (typeof TILES)[0];
  opacity: MotionValue<number>;
  x?: MotionValue<number>;
  y?: MotionValue<number>;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={tile.url || "#"} className="flex flex-col" style={{ height: "100%" }}>
      <motion.div
        className="tile"
        style={{
          opacity,
          x,
          y,
          minHeight: "420px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Icon */}
        <div
          className="tile-icon"
          style={{
            fontSize: "1.2rem",
            letterSpacing: "0.05em",
            color: hovered ? "#3b82f6" : "rgba(255,255,255,0.2)",
            transition: "color 0.3s ease",
          }}
        >
          {tile.icon}
        </div>

        {/* Title */}
        <h3 className="tile-title">{tile.title}</h3>

        {/* Description */}
        <p className="tile-desc">{tile.desc}</p>

        {/* Item list */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0.5rem 0",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {tile.items.map((item) => (
            <li
              key={item}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.35)",
                paddingLeft: "1rem",
                borderLeft: `1px solid ${hovered ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.1)"}`,
                transition: "border-color 0.3s ease",
                lineHeight: 1.5,
              }}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div
          className="tile-arrow"
          style={{
            marginTop: "auto",
            color: hovered ? "#3b82f6" : "rgba(255,255,255,0.2)",
            transform: hovered ? "translateX(6px)" : "none",
            transition: "color 0.3s ease, transform 0.3s ease",
          }}
        >
          {tile.cta} →
        </div>
      </motion.div>
    </Link>
  );
}

export default function NavigationGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 35%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const xTitle = useTransform(scrollYProgress, [0, 1], [-50, 0]);
  const xTile0 = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const yTile1 = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const xTile2 = useTransform(scrollYProgress, [0, 1], [80, 0]);

  const { ref: swapRef, past } = useScrollSwap(0.35);

  return (
    <section
      id="grid"
      ref={containerRef}
      style={{ background: "#000000", paddingTop: "7rem", paddingBottom: "7rem" }}
    >
      <hr className="divider" />

      <div className="container" style={{ paddingTop: "5rem" }}>
        {/* Section header */}
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "4rem",
            opacity,
            x: xTitle,
          }}
        >
          <span className="section-label">// 02 — entdecken</span>
          <h2 ref={swapRef as React.RefObject<HTMLHeadingElement>} className="section-heading" style={{ marginBottom: 0 }}>
            <span style={{ color: past ? "#ffffff" : "#3b82f6", transition: "color 0.6s ease" }}>Erkunde das</span>{" "}
            <span style={{ color: past ? "#3b82f6" : "#ffffff", transition: "color 0.6s ease" }}>Terrain.</span>
          </h2>
        </motion.div>

        {/* 3-column grid */}
        <div
          className="nav-tiles-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          {TILES.map((tile, i) => (
            <Tile
              key={tile.id}
              tile={tile}
              opacity={opacity}
              x={i === 0 ? xTile0 : i === 2 ? xTile2 : undefined}
              y={i === 1 ? yTile1 : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
