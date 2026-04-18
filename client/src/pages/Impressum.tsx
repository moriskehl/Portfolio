/*
 * Impressum Page
 * Themed to match the portfolio
 */

import { Link } from "wouter";
import SubPageFooter from "../components/SubPageFooter";

export default function Impressum() {
  return (
    <div className="page-enter" style={{ background: "var(--t-bg)", minHeight: "100dvh", paddingTop: "8rem", paddingBottom: "4rem" }}>
      <div className="container">
        <span className="section-label" aria-hidden="true">// rechtliches</span>
        <h1
          className="section-heading"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: "var(--t-text)",
            marginBottom: "3rem",
          }}
        >
          Impressum.
        </h1>

        <div style={{ maxWidth: "800px", color: "var(--t-text-secondary)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.8 }}>
          <h2 style={{ fontFamily: "'Share Tech Mono', monospace", color: "var(--t-accent)", fontSize: "1.2rem", marginBottom: "1rem" }}>
            Rechtlicher Hinweis
          </h2>
          <p style={{ marginBottom: "2rem" }}>
            Dies ist eine rein private, nicht kommerzielle Webseite, die ausschließlich meiner persönlichen Darstellung dient.<br />
            Eine Rechts- oder Impressumspflicht nach § 5 TMG bzw. § 18 MStV besteht für diese Seite daher nicht.
          </p>

          <h2 style={{ fontFamily: "'Share Tech Mono', monospace", color: "var(--t-accent)", fontSize: "1.2rem", marginBottom: "1rem" }}>
            Verantwortlich für den Inhalt & Kontakt
          </h2>
          <p style={{ marginBottom: "2rem" }}>
            Moris Kehl<br />
            E-Mail: moris.kehl@gmail.com<br />
          </p>

          <h2 style={{ fontFamily: "'Share Tech Mono', monospace", color: "var(--t-accent)", fontSize: "1.2rem", marginBottom: "1rem" }}>
            Haftungsausschluss (Disclaimer)
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            Die Inhalte meiner Webseite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen.
          </p>
          <p style={{ marginBottom: "2rem" }}>
            Diese Webseite kann Links zu externen Webseiten Dritter enthalten, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>

          <h2 style={{ fontFamily: "'Share Tech Mono', monospace", color: "var(--t-accent)", fontSize: "1.2rem", marginBottom: "1rem" }}>
            Urheberrecht
          </h2>
          <p style={{ marginBottom: "2rem" }}>
            Die durch mich erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen meiner schriftlichen Zustimmung.
          </p>
        </div>
        
        <div style={{ marginTop: "4rem" }}>
          <Link 
            href="/" 
            className="btn-primary btn-slanted" 
            style={{ padding: "0.45rem 1.1rem", fontSize: "0.7rem", textDecoration: "none" }}
          >
            <span>Zurück zur Startseite</span>
          </Link>
        </div>
      </div>
      <SubPageFooter />
    </div>
  );
}
