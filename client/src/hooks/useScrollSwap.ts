/*
 * useScrollSwap — Scroll-triggered heading color swap
 * Returns `past` boolean: true once element is scrolled past the midpoint.
 * Usage: When `past` is true, swap the blue/white text colors in section headings.
 */

import { useEffect, useRef, useState } from "react";

export function useScrollSwap(offset = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const trigger = window.innerHeight * offset;
      setPast(rect.top < trigger);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return { ref, past };
}
