# Matrix Ski Portfolio – Moris Kehl

Dieses Repository enthält den Quellcode für meine persönliche Portfolio-Website. Das Projekt vereint meine Leidenschaft für den **alpinen Skisport** mit meiner Begeisterung für die **Softwareentwicklung**.

## 🎯 Zweck der Seite
Die Website dient als digitale Visitenkarte und Showcase für meine Projekte, meinen sportlichen Werdegang und meine technischen Fähigkeiten. Sie wurde mit einem Fokus auf moderne Webtechnologien, Performance und ein einzigartiges "Matrix-Ski"-Design entwickelt.

## ✨ Hauptfunktionen
- **Kombiniertes Design**: Ein moderner "Digital Descent"-Look, der Ski-Elemente mit einer Coding-Ästhetik (ASCII, Terminals, Glitch-Effekte) verbindet.
- **3D ASCII-Rendering**: Ein interaktives 3D-Skimodell (STL), das mit Three.js gerendert und durch einen Custom-Shader in dynamische ASCII-Zeichen umgewandelt wird.
- **Interaktive Animationen**: Flüssige, scroll-gesteuerte Übergänge und Hover-Effekte mittels GSAP und Framer Motion.
- **Mehrsprachigkeit (i18n)**: Unterstützung für Deutsch, Englisch und Französisch.
- **Projekt-Showcase**: Detaillierte Vorstellung meiner wichtigsten Softwareprojekte (z. B. Abiball Portal, Blackjack AI).
- **Finanz-Dashboard (Secret)**: Ein passwortgeschützter Bereich mit einem modularen Dashboard für Finanzdaten, inklusive AES-256-Verschlüsselung im LocalStorage.
- **Responsive Design**: Optimierte Darstellung für alle Endgeräte, vom Smartphone bis zum Desktop.

## 🛠️ Tech Stack
- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
- **Animationen**: [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
- **3D/Grafik**: [Three.js](https://threejs.org/) & [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- **Routing**: [Wouter](https://github.com/molefrog/wouter)
- **Lokalisierung**: [i18next](https://www.i18next.com/)
- **Backend/Integration**: [Express](https://expressjs.com/) (Server-Layer) & [Appwrite](https://appwrite.io/) (für bestimmte Services)

## 🚀 Installation & Lokale Entwicklung

### Voraussetzungen
Stellen Sie sicher, dass [Node.js](https://nodejs.org/) und [pnpm](https://pnpm.io/) installiert sind.

### Setup
1. Repository klonen:
   ```bash
   git clone [repository-url]
   cd Portfolio
   ```

2. Abhängigkeiten installieren:
   ```bash
   pnpm install
   ```

3. Entwicklungsserver starten:
   ```bash
   pnpm run dev
   ```

4. Build erstellen:
   ```bash
   pnpm run build
   ```

## 📄 Lizenz
Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Details finden Sie in der `LICENSE` Datei (falls vorhanden).

## 💖 Sponsoring & Unterstützung
Du kannst die Sichtbarkeit dieses Open-Source-Projekts erhöhen, indem du einen Sponsor-Button aktivierst.

### Über FUNDING-Dateien
Die Konfiguration des Sponsor-Buttons erfolgt über eine `FUNDING.yml`-Datei im Ordner `.github` deines Repositorys. Du kannst verschiedene Plattformen wie GitHub Sponsors, Ko-fi, Patreon oder benutzerdefinierte URLs verknüpfen.

**Beispiel für eine `FUNDING.yml`:**
```yaml
github: [dein-benutzername]
ko_fi: dein-benutzername
custom: ["https://deine-website.de"]
```

### Sponsor-Button aktivieren
1. Navigiere zu den **Settings** deines Repositorys auf GitHub.
2. Wähle im Abschnitt **Features** die Option **Sponsorships** aus.
3. Klicke auf **Set up sponsor button** und erstelle die `FUNDING.yml`.

---
*Entwickelt von Moris Kehl*
