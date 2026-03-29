import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const currentLang = LANGUAGES.find(l => l.code === (i18n.resolvedLanguage || 'de')) || LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      className="lang-switcher"
      onMouseEnter={() => {
        clearTimeout(timeoutRef.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        timeoutRef.current = setTimeout(() => setOpen(false), 200);
      }}
    >
      <button
        className="lang-switcher-trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span className="lang-code">{currentLang.code.toUpperCase()}</span>
        <ChevronDown
          size={12}
          className="lang-chevron"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <div
        className="lang-dropdown"
        role="listbox"
        aria-label="Languages"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.96)',
          pointerEvents: open ? 'all' : 'none',
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        {LANGUAGES.map((lang) => {
          const isActive = lang.code === currentLang.code;
          return (
            <button
              key={lang.code}
              role="option"
              aria-selected={isActive}
              className={`lang-option ${isActive ? 'active' : ''}`}
              onClick={() => handleSelect(lang.code)}
            >
              <span className="lang-option-flag">{lang.flag}</span>
              <span className="lang-option-label">{lang.label}</span>
              {isActive && <Check size={12} className="lang-option-check" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
