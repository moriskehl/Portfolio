/*
 * SubPageFooter — Minimal footer bar for sub-pages
 */

import FooterBar, { FooterLinkItem } from "./FooterBar";

const LINKS: FooterLinkItem[] = [
  { label: "Projekte", href: "/projects" },
  { label: "Erfolge", href: "/achievements" },
  { label: "Werdegang", href: "/cv" },
];

export default function SubPageFooter() {
  return (
    <footer style={{ background: "var(--t-bg)" }}>
      <FooterBar links={LINKS} />
    </footer>
  );
}
