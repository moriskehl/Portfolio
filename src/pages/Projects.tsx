export default function Projects() {
  return (
    <div className="container">
      <header className="header-section">
        <h1>Meine Projekte</h1>
        <p>Einblicke in meine Arbeit – interaktiv und direkt hier erlebbar.</p>
      </header>
      <section className="projects-container">
        <div className="project-item">
          <h3>Abiball Portal</h3>
          <p>Mock-System für Planung & Organisation (PHP Applikation)</p>
          <div className="iframe-container">
            {/* Das lokale PHP Projekt läuft auf Port 8080. Für Produktion muss hier eine Live-URL rein! */}
            <iframe src="http://localhost:8080/" title="Abiball Portal"></iframe>
          </div>
          <a href="http://localhost:8080/" target="_blank" rel="noopener noreferrer" className="btn">Vollbild öffnen</a>
        </div>
        <div className="project-item">
          <h3>Projekt Zwei</h3>
          <p>Interaktives Interface</p>
          <div className="iframe-container">
            <iframe src="/projects/project-two/index.html" title="Projekt Zwei"></iframe>
          </div>
          <a href="/projects/project-two/index.html" target="_blank" rel="noopener noreferrer" className="btn">Vollbild öffnen</a>
        </div>
      </section>
    </div>
  );
}
