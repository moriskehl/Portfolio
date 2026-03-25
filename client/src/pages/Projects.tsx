import { useState } from 'react';

export default function Projects() {
  const [aspectRatio, setAspectRatio] = useState<'16/9' | '9/16'>('16/9');

  return (
    <div className="container">
      <header className="header-section">
        <h1>Meine Projekte</h1>
        <p>Einblicke in meine Arbeit – interaktiv und direkt hier erlebbar.</p>
      </header>

      <section className="projects-container">
        
        {/* Universelle Steuerung für alle Iframes (kann auch pro Projekt gebaut werden) */}
        <div className="controls">
          <strong>Ansicht:</strong>
          <button 
            className={`btn-toggle ${aspectRatio === '16/9' ? 'active' : ''}`}
            onClick={() => setAspectRatio('16/9')}
          >
            Desktop (16:9)
          </button>
          <button 
            className={`btn-toggle ${aspectRatio === '9/16' ? 'active' : ''}`}
            onClick={() => setAspectRatio('9/16')}
          >
            Mobile (9:16)
          </button>
        </div>

        <div className="project-item">
          <h3>Abiball Portal</h3>
          <p>Mock-System für Planung & Organisation (PHP Applikation)</p>
          
          <div className={`iframe-wrapper ${aspectRatio === '16/9' ? 'aspect-16-9' : 'aspect-9-16'}`}>
            <div className="iframe-scaler">
              {/* Das Projekt läuft live unter bsz.app */}
              <iframe src="https://bsz.app" title="Abiball Portal"></iframe>
            </div>
          </div>
          
          <a href="https://bsz.app" target="_blank" rel="noopener noreferrer" className="btn">Vollbild öffnen</a>
        </div>
        
        <div className="project-item">
          <h3>Projekt Zwei</h3>
          <p>Interaktives Interface</p>

          <div className={`iframe-wrapper ${aspectRatio === '16/9' ? 'aspect-16-9' : 'aspect-9-16'}`}>
            <div className="iframe-scaler">
              <iframe src="/projects/project-two/index.html" title="Projekt Zwei"></iframe>
            </div>
          </div>

          <a href="/projects/project-two/index.html" target="_blank" rel="noopener noreferrer" className="btn">Vollbild öffnen</a>
        </div>
      </section>
    </div>
  );
}
