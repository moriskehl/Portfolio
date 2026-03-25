/*
 * Home — Strict B/W/Blue Modern Dark Mode
 * Scroll zones:
 *   0%–25%   → Hero (ASCII mountain — GLB rendered as ASCII art)
 *   25%–50%  → Intro (about)
 *   50%–85%  → NavigationGrid (3 tiles)
 *   85%–100% → ContactFooter
 */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import NavigationGrid from "@/components/NavigationGrid";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  // Scroll progress bar (left edge, 2px blue)
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      bar.style.height =
        docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : "0%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#000000", minHeight: "100vh" }}>
      <div id="scroll-progress" />
      <Navbar />
      <Hero />
      <Intro />
      <NavigationGrid />
      <ContactFooter />
    </div>
  );
}
