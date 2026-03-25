/*
 * Impressum Page
 * Dark theme matching the portfolio
 */

import { Link } from "wouter";

export default function Impressum() {
  return (
    <div className="page-enter" style={{ background: "#000", minHeight: "100dvh", paddingTop: "8rem", paddingBottom: "4rem" }}>
      <div className="container">
        <span className="section-label">// rechtliches</span>
        <h1
          className="section-heading"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: "#ffffff",
            marginBottom: "3rem",
          }}
        >
          Impressum.
        </h1>

        <div style={{ maxWidth: "800px", color: "#a1a1aa", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.8 }}>
          <h2 style={{ fontFamily: "'Share Tech Mono', monospace", color: "#3b82f6", fontSize: "1.2rem", marginBottom: "1rem" }}>
            Angaben gemäß § 5 TMG
          </h2>
          <p style={{ marginBottom: "2rem" }}>
            Moris Kehl<br />
            [Deine Straße und Hausnummer]<br />
            [PLZ] [Dein Ort]<br />
          </p>

          <h2 style={{ fontFamily: "'Share Tech Mono', monospace", color: "#3b82f6", fontSize: "1.2rem", marginBottom: "1rem" }}>
            Kontakt
          </h2>
          <p style={{ marginBottom: "2rem" }}>
            E-Mail: moris.kehl@gmail.com<br />
          </p>

          <h2 style={{ fontFamily: "'Share Tech Mono', monospace", color: "#3b82f6", fontSize: "1.2rem", marginBottom: "1rem" }}>
            Haftung für Inhalte
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p style={{ marginBottom: "2rem" }}>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>

          <h2 style={{ fontFamily: "'Share Tech Mono', monospace", color: "#3b82f6", fontSize: "1.2rem", marginBottom: "1rem" }}>
            Urheberrecht
          </h2>
          <p style={{ marginBottom: "2rem" }}>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
        </div>
        
        <div style={{ marginTop: "4rem" }}>
          <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
