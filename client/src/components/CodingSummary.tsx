import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2 } from "lucide-react";
import RadialHover from "./RadialHover";
import { useScrollSwap } from "../hooks/useScrollSwap";

gsap.registerPlugin(ScrollTrigger);

export default function CodingSummary() {
  const { t } = useTranslation();
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
          <div 
            ref={mediaRef} 
            className="media-frame-digital order-2 lg:order-1"
            style={{ width: "100%", height: "545px", overflow: "hidden" }}
          >
            <iframe 
              src="https://www.linkedin.com/embed/feed/update/urn:li:share:7339293684368109568?collapsed=1" 
              style={{
                width: "102%",
                height: "600px",
                marginTop: "-4px",
                marginLeft: "-1%",
                border: "none",
                pointerEvents: "auto"
              }}
              allowFullScreen={true} 
              title="LinkedIn Beitrag"
            />
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
