import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  activeSection: string;
  theme: string;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onToggleTheme: () => void;
  onNavLinkClick: (sectionId: string) => void;
  onOpenCommandPalette?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  activeSection,
  theme,
  isMenuOpen,
  onToggleMenu,
  onToggleTheme,
  onNavLinkClick,
  onOpenCommandPalette,
}) => {
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { id: 'accueil', label: t.nav.accueil },
    { id: 'profil', label: t.nav.profil },
    { id: 'competences', label: t.nav.competences },
    { id: 'experiences', label: t.nav.experiences },
    { id: 'projets', label: t.nav.projets },
    { id: 'formations', label: t.nav.formations },
    { id: 'certifications', label: t.nav.certifications },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 bg-[#2d3436]/85 backdrop-filter backdrop-blur-lg border-b border-[#b2bec3]/15 shadow-lg flex items-center justify-between">
        <a href="#accueil" className="text-4xl font-extrabold text-gradient glitch" data-text="NICOLAS">
          NICOLAS
        </a>

        {/* Navigation pour écrans larges */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => onNavLinkClick(item.id)}
              className={`text-lg font-semibold transition-colors duration-300 ${
                activeSection === item.id ? 'text-[#e84393]' : 'text-[#b2bec3] hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Sélecteur de Langue (FR / EN) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#1e2324] text-[#dfe6e9] hover:text-[#e84393] hover:border-[#e84393]/50 border border-[#b2bec3]/20 transition-all duration-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#e84393]"
            aria-label={language === 'fr' ? 'Switch to English' : 'Passer en Français'}
            title={language === 'fr' ? 'Switch to English' : 'Passer en Français'}
          >
            <span className="text-sm leading-none">{language === 'fr' ? '🇫🇷' : '🇬🇧'}</span>
            <span className="font-bold tracking-wider">{language === 'fr' ? 'FR' : 'EN'}</span>
          </button>

          {/* Bouton Palette de Commandes (Ctrl+K) */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e2324] text-[#b2bec3] hover:text-white border border-[#b2bec3]/20 hover:border-[#e84393]/50 text-xs font-mono transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#e84393]"
              aria-label={language === 'fr' ? 'Rechercher ou naviguer (Ctrl+K)' : 'Search or navigate (Ctrl+K)'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#e84393]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>{language === 'fr' ? 'Rechercher' : 'Search'}</span>
              <kbd className="px-1.5 py-0.5 bg-[#2d3436] text-[#fd79a8] rounded border border-[#b2bec3]/20 text-[10px]">⌘K</kbd>
            </button>
          )}

          {/* Bouton de bascule de thème */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full bg-[#1e2324] text-[#b2bec3] hover:text-[#e84393] hover:bg-[#2d3436] border border-[#b2bec3]/20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#e84393]"
            aria-label={language === 'fr' ? 'Changer de thème (Toggle theme)' : 'Toggle theme'}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m8.05-9.636l-.707-.707M16.95 2.464l.707.707m-9.636 8.05l-.707.707M2.464 16.95l.707-.707m12.728.707l-.707-.707m-.707 12.728l.707-.707M6.343 17.657l-.707.707m12.728-.707l-.707-.707M6.343 6.343l-.707-.707m12.728.707l-.707-.707" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu Hamburger pour mobile */}
        <div className="md:hidden">
          <button
            onClick={onToggleMenu}
            className="text-[#b2bec3] hover:text-white focus:outline-none"
            aria-label={language === 'fr' ? 'Menu mobile (Toggle mobile menu)' : 'Toggle mobile menu'}
          >
            {isMenuOpen ? (
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Menu mobile (affiché ou masqué) */}
      <nav className={`fixed top-0 left-0 w-full h-full bg-[#2d3436]/95 backdrop-filter backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-6 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => onNavLinkClick(item.id)}
            className={`text-2xl font-semibold transition-colors duration-300 ${
              activeSection === item.id ? 'text-[#e84393]' : 'text-[#b2bec3] hover:text-white'
            }`}
          >
            {item.label}
          </a>
        ))}

        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e2324] text-white border border-[#e84393]/50 font-mono text-sm shadow-md"
            aria-label={language === 'fr' ? 'Switch to English' : 'Passer en Français'}
          >
            <span>{language === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}</span>
            <span className="text-xs text-[#b2bec3]">({language === 'fr' ? 'English' : 'Français'})</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="p-3 rounded-full bg-[#1e2324] text-[#b2bec3] hover:text-[#e84393] hover:bg-[#2d3436] border border-[#b2bec3]/20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#e84393]"
            aria-label={language === 'fr' ? 'Changer de thème (Toggle theme)' : 'Toggle theme'}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m8.05-9.636l-.707-.707M16.95 2.464l.707.707m-9.636 8.05l-.707.707M2.464 16.95l.707-.707m12.728.707l-.707-.707m-.707 12.728l.707-.707M6.343 17.657l-.707.707m12.728-.707l-.707-.707M6.343 6.343l-.707-.707m12.728.707l-.707-.707" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
