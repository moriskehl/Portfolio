import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Snowflake } from "lucide-react";
import RadialHover from "./RadialHover";
import { useScrollSwap } from "../hooks/useScrollSwap";

gsap.registerPlugin(ScrollTrigger);

export default function SkiingSummary() {
  const { t } = useTranslation();
  const { ref: swapRef, past } = useScrollSwap(0.5);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear previous ScrollTriggers for this component
    const ctx = gsap.context(() => {
      // Pin text horizontally and scrub it smoothly in
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -50 },
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

      // Fade and slide the image in from right
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 100 },
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
      id="skiing-summary" 
      ref={containerRef} 
      style={{ 
        background: "var(--t-bg-secondary)", 
        paddingTop: "7rem", 
        paddingBottom: "7rem", 
        position: "relative",
        overflow: "hidden" 
      }}
    >

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div ref={textRef}>
            <span className="section-label">
              {t("skiingSummary.label")}
            </span>
            <RadialHover className="section-heading">
              <h2 ref={swapRef as React.RefObject<HTMLHeadingElement>} style={{ margin: 0, marginBottom: "1.5rem" }}>
                <span style={{ color: past ? "var(--t-text)" : "var(--t-accent)", transition: "color 0.6s ease" }}>{t("skiingSummary.heading1")}</span>
                <br />
                <span style={{ color: past ? "var(--t-accent)" : "var(--t-text)", transition: "color 0.6s ease" }}>{t("skiingSummary.heading2")}</span>
              </h2>
            </RadialHover>
            <div className="border-accent" style={{ marginBottom: "2rem", maxWidth: "500px" }}>
              <p style={{ color: "var(--t-text-secondary)", lineHeight: 1.8 }}>
                {t("skiingSummary.desc")}
              </p>
            </div>
            
            <Link href="/achievements" className="btn-outline">
              {t("skiingSummary.cta")}
            </Link>
          </div>

          <div 
            ref={imageRef} 
            className="media-frame-digital mt-8 lg:mt-0"
            style={{ width: "100%", height: "auto", aspectRatio: "3/2" }}
          >
            <img 
              src="/ski.jpg" 
              alt="Ski Racing" 
              className="image-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
