export default function Projects() {
  return (
    <div className="container">
      <header className="header-section">
        <h1>Meine Projekte</h1>
        <p>Einblicke in meine Arbeit – interaktiv und direkt hier erlebbar.</p>
      </header>
      <section className="projects-container">
        <div className="project-item">
          <h3>Projekt Eins</h3>
          <p>Standalone Web-App</p>
          <div className="iframe-container">
            {/* The paths changed because projects/ is now in public/ so it resolves from the root / */}
            <iframe src="/projects/project-one/index.html" title="Projekt Eins"></iframe>
          </div>
          <a href="/projects/project-one/index.html" target="_blank" rel="noopener noreferrer" className="btn">Vollbild öffnen</a>
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
