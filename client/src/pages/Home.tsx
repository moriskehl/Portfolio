/*
 * Home — Strict B/W/Blue Modern Dark Mode
 * Scroll zones:
 *   0%–25%   → Hero (ASCII mountain — GLB rendered as ASCII art)
 *   25%–50%  → Intro (about)
 *   50%–85%  → NavigationGrid (3 tiles)
 *   85%–100% → ContactFooter
 */

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import NavigationGrid from "@/components/NavigationGrid";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

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

  // Slow down scrolling while hero is visible (40% speed)
  useEffect(() => {
    const SPEED_FACTOR = 0.4; // 1 = normal, 0.4 = 40% speed
    const onWheel = (e: WheelEvent) => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0;
      if (heroBottom > 0) {
        e.preventDefault();
        window.scrollBy({ top: e.deltaY * SPEED_FACTOR, behavior: "instant" });
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div style={{ background: "#000000", minHeight: "100vh" }}>
      <div id="scroll-progress" />
      <Navbar />
      <div ref={heroRef}>
        <Hero />
      </div>
      <Intro />
      <NavigationGrid />
      <ContactFooter />
    </div>
  );
}
