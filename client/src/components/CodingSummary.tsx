import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RadialHover from "./RadialHover";
import LinkedInPostCard, { type LinkedInPost } from "./LinkedInPostCard";
import { useScrollSwap } from "../hooks/useScrollSwap";

gsap.registerPlugin(ScrollTrigger);

// LinkedIn posts shown in the carousel, newest first.
// Rendered as self-hosted cards (no iframe, so no LinkedIn cookie banner).
// Images live in client/public/linkedin/.
const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7509555878006661120",
    author: "SV Informatik GmbH",
    authorUrl: "https://de.linkedin.com/company/sv-informatik-gmbh",
    authorInitials: "SV",
    authorLogo: "/linkedin/sv-logo.jpg",
    authorMeta: "4.144 Follower:innen",
    age: "Okt. 2026",
    text: [
      "Ein neuer Abschnitt beginnt und am besten startet er gemeinsam. 🤩",
      "Unsere neuen dualen Studierenden und Auszubildenden sind bei der SV Informatik gestartet. Herzlich willkommen im Team! 👋",
      "Vor ihnen liegt eine spannende Zeit mit neuen Menschen, Aufgaben und Erfahrungen. Im gemeinsamen Einführungsmonat lernen sie verschiedene Abteilungen, unser Unternehmen und vor allem einander kennen.",
      "So entstehen von Anfang an neue Kontakte, ein besseres Verständnis für unsere Zusammenarbeit und hoffentlich auch schnell das Gefühl: Hier bin ich richtig.",
      "Wir freuen uns auf ihre Ideen, Fragen und neuen Perspektiven und wünschen allen einen richtig guten Start! 🚀",
      "👉 Was hat dir den Einstieg ins Berufsleben erleichtert? Teile deinen Tipp in den Kommentaren.",
    ],
    hashtags: ["SVInformatik", "ITKarriere", "AusbildungInDerIT", "DualesStudium", "GemeinsamZukunftEntwickeln"],
    images: ["/linkedin/sv-duale-studis-2026-1.jpg", "/linkedin/sv-duale-studis-2026-2.jpg"],
    imageAlt: "Die dualen Studierenden 2026 der SV Informatik",
    reactions: 29,
    comments: 1,
  },
  {
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7339293685739610112",
    author: "SSC-Services GmbH",
    authorUrl: "https://de.linkedin.com/company/ssc-services-gmbh",
    authorInitials: "SSC",
    authorLogo: "/linkedin/ssc-logo.jpg",
    authorMeta: "1.350 Follower:innen",
    age: "Juni 2025",
    text: [
      "🎉Code statt Kreide: Zwei Wochen Schülerpraktikum bei SSC",
      "In den letzten zwei Wochen hatten Lucas und Moris die Gelegenheit verschiedene Teams kennenzulernen und erste spannende Einblicke in den Arbeitsalltag bei SSC zu gewinnen.",
      "Da beide bereits erste Erfahrungen im Programmieren mitgebracht haben, durften sie in der zweiten Woche ein eigenes kleines Projekt umsetzen. Sie haben gemeinsam daran gearbeitet, Dinge ausprobiert und ihre Ideen eingebracht. Heute fand dann die Abschlusspräsentation statt, bei der sie ihre Ergebnisse vorstellen konnten.",
      "Es war beeindruckend zu sehen, mit welcher Motivation die beiden an ihre Aufgaben herangegangen sind und wie sie uns mit ihrer Kreativität und Engagement bei der Präsentation begeistert haben.",
      "Wir wünschen euch weiterhin viel Erfolg auf eurem Weg und würden uns freuen, euch eines Tages wieder bei SSC begrüßen zu dürfen! 🌟",
    ],
    hashtags: ["Praktikum", "IT", "Schüler"],
    images: ["/linkedin/ssc-praktikum.jpg"],
    imageAlt: "Schülerpraktikum bei SSC-Services",
    reactions: 22,
    comments: 1,
  },
];

const AUTO_SWAP_MS = 6000;

const navBtnStyle: React.CSSProperties = {
  background: "transparent",
  border: "1px solid var(--t-accent)",
  color: "var(--t-accent)",
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

export default function CodingSummary() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const postCount = LINKEDIN_POSTS.length;
  const go = (dir: number) => setActive((i) => (i + dir + postCount) % postCount);

  // Auto-advance while the section is on screen. Hovering pauses it; any click
  // or keypress inside the carousel stops it for good so it never fights the visitor.
  const carouselRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || hovered || interacted || postCount < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % postCount), AUTO_SWAP_MS);
    return () => window.clearInterval(id);
  }, [inView, hovered, interacted, postCount]);
  const { ref: swapRef, past } = useScrollSwap(0.5);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scrub text from right
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        }
      );

      // Fade and slide the media frame in from left
      gsap.fromTo(
        mediaRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="coding-summary" 
      ref={containerRef} 
      style={{ 
        background: "var(--t-bg)", 
        paddingTop: "7rem", 
        paddingBottom: "7rem", 
        position: "relative",
        overflow: "hidden" 
      }}
    >

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div ref={mediaRef} className="order-2 lg:order-1">
           <div
            ref={carouselRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onPointerDown={() => setInteracted(true)}
            onKeyDown={() => setInteracted(true)}
           >
            <div
              className="media-frame-digital"
              style={{
                width: "100%",
                height: "auto",
                overflow: "hidden"
              }}
            >
              <LinkedInPostCard key={LINKEDIN_POSTS[active].url} post={LINKEDIN_POSTS[active]} />
            </div>

            {postCount > 1 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
                <button type="button" onClick={() => go(-1)} aria-label="Previous post" style={navBtnStyle}>
                  <ChevronLeft size={18} />
                </button>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {LINKEDIN_POSTS.map((post, i) => (
                    <button
                      key={post.url}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Post ${i + 1}`}
                      aria-current={i === active}
                      style={{
                        width: i === active ? 22 : 8,
                        height: 8,
                        padding: 0,
                        border: "none",
                        cursor: "pointer",
                        background: i === active ? "var(--t-accent)" : "var(--t-text-secondary)",
                        opacity: i === active ? 1 : 0.4,
                        transition: "width 0.3s ease, opacity 0.3s ease",
                      }}
                    />
                  ))}
                </div>
                <button type="button" onClick={() => go(1)} aria-label="Next post" style={navBtnStyle}>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
           </div>
          </div>
          <div className="order-1 lg:order-2" ref={textRef}>
            <span className="section-label">
              {t("codingSummary.label")}
            </span>
            <RadialHover className="section-heading">
              <h2 ref={swapRef as React.RefObject<HTMLHeadingElement>} style={{ margin: 0, marginBottom: "1.5rem" }}>
                <span style={{ color: past ? "var(--t-text)" : "var(--t-accent)", transition: "color 0.6s ease" }}>{t("codingSummary.heading1")}</span>
                <br />
                <span style={{ color: past ? "var(--t-accent)" : "var(--t-text)", transition: "color 0.6s ease" }}>{t("codingSummary.heading2")}</span>
              </h2>
            </RadialHover>
            <div className="border-accent" style={{ marginBottom: "2rem", maxWidth: "500px" }}>
              <p style={{ color: "var(--t-text-secondary)", lineHeight: 1.8 }}>
                {t("codingSummary.desc")}
              </p>
            </div>
            
            <Link href="/projects" className="btn-outline">
              {t("codingSummary.cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
