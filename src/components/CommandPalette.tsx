import React, { useState, useEffect, useRef } from 'react';
import type { Project, Certification } from '../types/portfolio';
import { useLanguage } from '../context/LanguageContext';

export interface CommandItem {
  id: string;
  category: 'Navigation' | 'Actions' | 'Projets' | 'Projects' | 'Certifications';
  title: string;
  subtitle?: string;
  icon: string;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onToggleTheme: () => void;
  onDownloadCv: () => void;
  onCopyEmail: () => void;
  onDownloadVCard: () => void;
  onSelectProject: (project: Project) => void;
  onOpenTerminal?: () => void;
  projects: Project[];
  certifications?: Certification[];
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onToggleTheme,
  onDownloadCv,
  onCopyEmail,
  onDownloadVCard,
  onSelectProject,
  onOpenTerminal,
  projects,
  certifications = [],
}) => {
  const { language, toggleLanguage } = useLanguage();
  const isEn = language === 'en';
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input and add global Escape listener on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      };

      window.addEventListener('keydown', handleGlobalKeyDown);
      return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }
  }, [isOpen, onClose]);

  // Command items definition
  const baseCommands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-accueil',
      category: 'Navigation',
      title: isEn ? 'Home' : 'Accueil',
      subtitle: isEn ? 'Top of page & Hero presentation' : 'Haut de page & Présentation',
      icon: '🏠',
      action: () => { onNavigate('accueil'); onClose(); },
    },
    {
      id: 'nav-profil',
      category: 'Navigation',
      title: isEn ? 'About Me & Apprenticeship' : 'À Propos de Moi & Alternance',
      subtitle: isEn ? 'Goals, education and profile' : 'Objectif, formation et parcours',
      icon: '🧑‍💻',
      action: () => { onNavigate('profil'); onClose(); },
    },
    {
      id: 'nav-competences',
      category: 'Navigation',
      title: isEn ? 'Technical Skills' : 'Compétences Techniques',
      subtitle: isEn ? 'Tech stack, languages, frameworks & security' : 'Stack, langages, frameworks & sécurité',
      icon: '🛠️',
      action: () => { onNavigate('competences'); onClose(); },
    },
    {
      id: 'nav-experiences',
      category: 'Navigation',
      title: isEn ? 'Work Experience' : 'Expériences Professionnelles',
      subtitle: 'NRJ Group, ICMAAE, Snowpack, Mutuaide...',
      icon: '💼',
      action: () => { onNavigate('experiences'); onClose(); },
    },
    {
      id: 'nav-projets',
      category: 'Navigation',
      title: isEn ? 'Featured Projects' : 'Projets Réalisés',
      subtitle: isEn ? 'Web, Back-End, API and Mobile Games' : 'Web, Back-End, API et Jeux mobiles',
      icon: '🚀',
      action: () => { onNavigate('projets'); onClose(); },
    },
    {
      id: 'nav-formations',
      category: 'Navigation',
      title: isEn ? 'Education & Degrees' : 'Formations & Diplômes',
      subtitle: 'Licence Pro DAWI, BTS SIO SLAM',
      icon: '🎓',
      action: () => { onNavigate('formations'); onClose(); },
    },
    {
      id: 'nav-certifications',
      category: 'Navigation',
      title: isEn ? 'Certifications & Credentials' : 'Certifications & Attestations',
      subtitle: 'Unity 3D, BTS SIO, Doranco',
      icon: '📜',
      action: () => { onNavigate('certifications'); onClose(); },
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: isEn ? 'Contact Me' : 'Me Contacter',
      subtitle: isEn ? 'Recruiter contact form' : 'Formulaire de contact recruteurs',
      icon: '✉️',
      action: () => { onNavigate('contact'); onClose(); },
    },

    // Actions
    {
      id: 'act-lang',
      category: 'Actions',
      title: isEn ? 'Passer en Français (🇫🇷 FR)' : 'Switch to English (🇬🇧 EN)',
      subtitle: isEn ? 'Changer la langue du portfolio en Français' : 'Toggle portfolio language to English',
      icon: '🌍',
      shortcut: 'LANG',
      action: () => { toggleLanguage(); onClose(); },
    },
    {
      id: 'act-cv',
      category: 'Actions',
      title: isEn ? 'Download Resume (PDF)' : 'Télécharger mon CV (PDF)',
      subtitle: 'CV_Nicolas_Pires_De_Jesus.pdf',
      icon: '📄',
      shortcut: 'CV',
      action: () => { onDownloadCv(); onClose(); },
    },
    {
      id: 'act-email',
      category: 'Actions',
      title: isEn ? 'Copy Email Address' : 'Copier mon adresse e-mail',
      subtitle: 'nicolas.piresdejesus91170@gmail.com',
      icon: '📋',
      action: () => { onCopyEmail(); onClose(); },
    },
    {
      id: 'act-vcard',
      category: 'Actions',
      title: isEn ? 'Download Contact (vCard)' : 'Télécharger ma fiche contact (vCard)',
      subtitle: isEn ? 'Instant add to your contacts (.vcf)' : 'Ajout instantané dans vos contacts (.vcf)',
      icon: '🎴',
      action: () => { onDownloadVCard(); onClose(); },
    },
    {
      id: 'act-theme',
      category: 'Actions',
      title: isEn ? 'Toggle Theme' : 'Basculer le Thème',
      subtitle: isEn ? 'Toggle between dark and light mode' : 'Alterner entre mode sombre et clair',
      icon: '🌓',
      action: () => { onToggleTheme(); onClose(); },
    },
  ];

  if (onOpenTerminal) {
    baseCommands.push({
      id: 'act-terminal',
      category: 'Actions',
      title: isEn ? 'Open Developer CLI Terminal' : 'Ouvrir le Terminal Développeur CLI',
      subtitle: isEn ? 'Interactive console with shell commands' : 'Console interactive avec commandes shell',
      icon: '💻',
      shortcut: '>_',
      action: () => { onOpenTerminal(); onClose(); },
    });
  }

  // Add project items
  const projectCommands: CommandItem[] = projects.map((p) => ({
    id: `project-${p.id}`,
    category: isEn ? 'Projects' : 'Projets',
    title: p.title,
    subtitle: `${p.technologies.map((t) => t.name).join(', ')} • ${p.statusBadge || ''}`,
    icon: p.category === 'mobile' ? '📱' : p.category === 'api' ? '⚙️' : '🌐',
    action: () => { onSelectProject(p); onClose(); },
  }));

  // Add certification items
  const certCommands: CommandItem[] = certifications.map((c) => ({
    id: `cert-${c.id}`,
    category: 'Certifications',
    title: c.title,
    subtitle: `${c.issuer} • ${c.date}`,
    icon: '📜',
    action: () => { onNavigate('certifications'); onClose(); },
  }));

  const allCommands = [...baseCommands, ...projectCommands, ...certCommands];

  const filteredCommands = allCommands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q)) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredCommands[selectedIndex];
      if (current) {
        current.action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
      if (selectedEl && typeof selectedEl.scrollIntoView === 'function') {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? 'Command palette' : 'Palette de commandes'}
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#2d3436] border border-[#b2bec3]/25 hover:border-[#e84393]/60 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#b2bec3]/20 bg-[#1e2324]/90">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#e84393] mr-3 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={isEn ? 'Search section, project, action...' : 'Rechercher une section, un projet, une action...'}
            className="w-full bg-transparent text-white placeholder-[#b2bec3]/60 text-base focus:outline-none"
            aria-label={isEn ? 'Search in command palette' : 'Recherche dans la palette de commandes'}
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 bg-[#2d3436] text-[#b2bec3] rounded text-xs border border-[#b2bec3]/20 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-80 overflow-y-auto p-2 divide-y divide-[#b2bec3]/10">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-[#b2bec3]/70 font-mono text-sm">
              {isEn
                ? `No results for "${query}". Try "CV", "Project", or "Apprenticeship".`
                : `Aucun résultat pour "${query}". Essayez "CV", "Projet" ou "Alternance".`}
            </div>
          ) : (
            filteredCommands.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  data-index={index}
                  type="button"
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-150 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#e84393]/20 to-[#fd79a8]/10 border border-[#e84393]/50 text-white'
                      : 'hover:bg-[#1e2324]/50 text-[#dfe6e9]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">{cmd.icon}</span>
                    <div className="truncate">
                      <div className="text-sm font-semibold flex items-center gap-2">
                        <span className={isSelected ? 'text-white' : 'text-[#dfe6e9]'}>
                          {cmd.title}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#1e2324] text-[#b2bec3]/70 border border-[#b2bec3]/20">
                          {cmd.category}
                        </span>
                      </div>
                      {cmd.subtitle && (
                        <div className="text-xs text-[#b2bec3] truncate">
                          {cmd.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                  {cmd.shortcut && (
                    <kbd className="shrink-0 px-2 py-0.5 text-xs font-mono bg-[#1e2324] text-[#fd79a8] rounded border border-[#e84393]/30">
                      {cmd.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-[#1e2324]/90 border-t border-[#b2bec3]/20 flex items-center justify-between text-xs text-[#b2bec3] font-mono">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-[#2d3436] rounded border border-[#b2bec3]/20 text-[10px]">↑↓</kbd> {isEn ? 'Navigate' : 'Naviguer'}</span>
            <span><kbd className="px-1.5 py-0.5 bg-[#2d3436] rounded border border-[#b2bec3]/20 text-[10px]">↵</kbd> {isEn ? 'Open' : 'Ouvrir'}</span>
          </div>
          <span className="text-[#fd79a8]">
            {filteredCommands.length} {isEn ? `result${filteredCommands.length > 1 ? 's' : ''}` : `résultat${filteredCommands.length > 1 ? 's' : ''}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
