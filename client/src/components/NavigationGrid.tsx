/*
 * NavigationGrid — 50%–85% scroll zone
 * Responsive 3-column (desktop) / 1-column (mobile) tile grid.
 * Tiles: Software & Systems, Alpine Sport, Career.
 */

import { useRef, useState } from "react";
import { GraduationCap, Code2, FileText, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { useScrollSwap } from "../hooks/useScrollSwap";

function Tile({
  tile,
  index,
}: {
  tile: any;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={tile.url || "#"} className="flex flex-col" style={{ height: "100%" }}>
      <motion.div
        className="tile"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.15 + 0.1 }}
        style={{
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
            color: hovered ? "var(--t-accent)" : "var(--t-text-faint)",
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
          {tile.items.map((item: string) => (
            <li
              key={item}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                color: "var(--t-text-faint)",
                paddingLeft: "1rem",
                borderLeft: `1px solid ${hovered ? "var(--t-accent-border)" : "var(--t-item-border-left)"}`,
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
            color: hovered ? "var(--t-accent)" : "var(--t-text-faint)",
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
  const { t } = useTranslation();
  const { ref: swapRef, past } = useScrollSwap(0.35);

  const TILES = [
    {
      id: "software",
      icon: "{ }",
      title: t("navGrid.software.title"),
      desc: t("navGrid.software.desc"),
      cta: t("navGrid.software.cta"),
      url: "/projects",
      items: [
        t("navGrid.software.item1"),
        t("navGrid.software.item2"),
        t("navGrid.software.item3"),
        t("navGrid.software.item4"),
      ],
    },
    {
      id: "alpine",
      icon: "/\\",
      title: t("navGrid.alpine.title"),
      desc: t("navGrid.alpine.desc"),
      cta: t("navGrid.alpine.cta"),
      url: "/achievements",
      items: [
        t("navGrid.alpine.item1"),
        t("navGrid.alpine.item2"),
        t("navGrid.alpine.item3"),
        t("navGrid.alpine.item4"),
      ],
    },
    {
      id: "career",
      icon: <FileText size={22} className="card-icon" />,
      title: t("navGrid.career.title"),
      desc: t("navGrid.career.desc"),
      cta: t("navGrid.career.cta"),
      url: "/cv",
      items: [
        t("navGrid.career.item1"),
        t("navGrid.career.item2"),
        t("navGrid.career.item3"),
        t("navGrid.career.item4"),
      ],
    },
  ];

  return (
    <section
      id="grid"
      style={{ background: "var(--t-bg)", paddingTop: "7rem", paddingBottom: "7rem", overflow: "hidden" }}
    >
      <hr className="divider" />

      <div className="container" style={{ paddingTop: "5rem" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "4rem",
          }}
        >
          <span className="section-label" aria-hidden="true">{t("navGrid.label")}</span>
          <h2 ref={swapRef as React.RefObject<HTMLHeadingElement>} className="section-heading" style={{ marginBottom: 0 }}>
            <span style={{ color: past ? "var(--t-text)" : "var(--t-accent)", transition: "color 0.6s ease" }}>{t("navGrid.headingMain")}</span>{" "}
            <span style={{ color: past ? "var(--t-accent)" : "var(--t-text)", transition: "color 0.6s ease" }}>{t("navGrid.headingAccent")}</span>
          </h2>
        </motion.div>

        {/* 3-column grid */}
        <div
          className="nav-tiles-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "var(--t-grid-gap-bg)",
          }}
        >
          {TILES.map((tile, i) => (
            <Tile
              key={tile.id}
              tile={tile}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
