export default function Resume() {
  return (
    <div className="container">
      <header className="header-section">
        <h1>Lebenslauf</h1>
        <p>Präzision in der Entwicklung, Leidenschaft im Sport.</p>
      </header>
      <div>
        <h2>Kontakt</h2>
        <ul>
          <li>Email: kontakt@moriskehl.de</li>
          <li>Web: moriskehl.de</li>
        </ul>
        <h2>Skills</h2>
        <ul>
          <li>JavaScript</li>
          <li>HTML/CSS</li>
          <li>UI/UX</li>
        </ul>
        <hr />
        <h2>Berufliche Erfahrung</h2>
        <div>
          <strong>2024 - Heute: Senior Software Developer</strong>
          <p>Entwicklung von Web-Applikationen mit Fokus auf Architektur.</p>
        </div>
        <div>
          <strong>2022 - 2024: Frontend Architekt</strong>
          <p>Gestaltung und Umsetzung von UI/UX.</p>
        </div>
        <hr />
        <h2>Ausbildung</h2>
        <div>
          <strong>2018 - 2022: Informatik Studium</strong>
          <p>Software-Engineering und Datenstrukturen.</p>
        </div>
      </div>
    </div>
  );
}
