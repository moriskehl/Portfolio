/*
 * Home — Strict B/W/Blue Modern Dark Mode
 * Scroll zones:
 *   0%–25%   → Hero (ASCII mountain — GLB rendered as ASCII art)
 *   25%–50%  → Intro (about)
 *   50%–85%  → NavigationGrid (3 tiles)
 *   85%–100% → ContactFooter
 */

import { useEffect } from "react";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import NavigationGrid from "@/components/NavigationGrid";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {


  return (
    <div style={{ background: "#000000", minHeight: "100dvh" }}>
      <Hero />
      <Intro />
      <NavigationGrid />
      <ContactFooter />
    </div>
  );
}
