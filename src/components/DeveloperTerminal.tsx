import React, { useState, useEffect, useRef } from 'react';
import type { Project } from '../types/portfolio';
import { useLanguage } from '../context/LanguageContext';

interface DeveloperTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadCv: () => void;
  onToggleTheme: () => void;
  onNavigate: (sectionId: string) => void;
  projects: Project[];
}

interface OutputLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'success' | 'info';
  text: string;
}

const getWelcomeBanner = (isEn: boolean) => [
  '╔══════════════════════════════════════════════════════════════════╗',
  '║   NICOLAS PIRES DE JESUS - INTERACTIVE DEVELOPER TERMINAL        ║',
  isEn
    ? '║   Full-Stack Developer • Pro Degree DAWI • Apprenticeship 2026   ║'
    : '║   Développeur Full-Stack • Licence Pro DAWI • Alternance 2026   ║',
  '╚══════════════════════════════════════════════════════════════════╝',
  isEn
    ? 'Type "help" to display the list of available commands.'
    : 'Tapez "help" pour afficher la liste des commandes disponibles.',
];

const DeveloperTerminal: React.FC<DeveloperTerminalProps> = ({
  isOpen,
  onClose,
  onDownloadCv,
  onToggleTheme,
  onNavigate,
  projects,
}) => {
  const { language, setLanguage, toggleLanguage } = useLanguage();
  const isEn = language === 'en';
  const [history, setHistory] = useState<OutputLine[]>(() =>
    getWelcomeBanner(isEn).map((line, i) => ({
      id: `init-${i}`,
      type: 'info',
      text: line,
    }))
  );
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Re-initialize welcome banner if language changes while empty or initial
  useEffect(() => {
    setHistory((prev) => {
      const isInitialOnly = prev.length === 5 && prev.every(l => l.id.startsWith('init-'));
      if (isInitialOnly) {
        return getWelcomeBanner(isEn).map((line, i) => ({
          id: `init-${i}`,
          type: 'info',
          text: line,
        }));
      }
      return prev;
    });
  }, [isEn]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        if (typeof bottomRef.current?.scrollIntoView === 'function') {
          bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    }
  }, [isOpen, history]);

  const handleCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    // Add to command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const cmdId = Date.now().toString();
    const newLines: OutputLine[] = [
      { id: `cmd-${cmdId}`, type: 'command', text: `nicolas@portfolio:~$ ${trimmed}` },
    ];

    const [cmd, ...args] = trimmed.toLowerCase().split(' ');

    switch (cmd) {
      case 'help':
        newLines.push({
          id: `out-${cmdId}`,
          type: 'output',
          text: [
            isEn ? 'Available commands:' : 'Commandes disponibles :',
            '  help        - ' + (isEn ? 'Display this help menu' : 'Affiche ce menu d\'aide'),
            '  lang [fr|en]- ' + (isEn ? 'Switch language (FR ↔ EN)' : 'Basculer la langue (FR ↔ EN)'),
            '  about       - ' + (isEn ? 'Profile and apprenticeship search' : 'Profil et recherche d\'alternance'),
            '  skills      - ' + (isEn ? 'Tech stack & proficiencies' : 'Stack technique & technologies maîtrisées'),
            '  projects    - ' + (isEn ? 'List of 4 projects with details' : 'Liste des 4 projets avec détails'),
            '  experiences - ' + (isEn ? 'Professional track record' : 'Historique professionnel en entreprise'),
            '  education   - ' + (isEn ? 'Academic background and degrees' : 'Formations académiques et diplômes'),
            '  certif      - ' + (isEn ? 'Certifications and credentials' : 'Certifications et attestations officielles'),
            '  cv          - ' + (isEn ? 'Download official resume (PDF)' : 'Télécharge le CV officiel au format PDF'),
            '  contact     - ' + (isEn ? 'Contact information and links' : 'Informations et liens de contact'),
            '  theme       - ' + (isEn ? 'Toggle between dark and light mode' : 'Bascule entre le mode sombre et le mode clair'),
            '  clear       - ' + (isEn ? 'Clear the terminal' : 'Efface le terminal'),
            '  whoami      - ' + (isEn ? 'Show current user' : 'Affiche l\'utilisateur actuel'),
            '  sudo <cmd>  - ' + (isEn ? 'Privileged execution' : 'Exécution privilégiée'),
            '  exit        - ' + (isEn ? 'Close the terminal' : 'Ferme le terminal'),
          ].join('\n'),
        });
        break;

      case 'about':
        newLines.push({
          id: `out-${cmdId}`,
          type: 'output',
          text: isEn
            ? [
                '👤 Nicolas Pires De Jesus - Full-Stack Developer',
                '🎓 Degree: BTS SIO SLAM (awarded) • Pro Degree DAWI (Univ. Évry Paris-Saclay)',
                '🎯 Active Search: Full-Stack / Back-End Apprenticeship (1 to 2 years)',
                '📍 Mobility: Paris, Île-de-France (91, 92, 75) & Remote',
                '💡 Core Focus: React/Next.js, Node.js, TypeScript, REST APIs, IAM/Keycloak Security',
              ].join('\n')
            : [
                '👤 Nicolas Pires De Jesus - Développeur Full-Stack',
                '🎓 Diplôme : BTS SIO SLAM (obtenu) • Licence Pro DAWI (Univ. Évry Paris-Saclay)',
                '🎯 Recherche active : Alternance Développeur Full-Stack / Back-End (1 à 2 ans)',
                '📍 Mobilité : Paris, Île-de-France (91, 92, 75) & Télétravail',
                '💡 Spécialités : React/Next.js, Node.js, TypeScript, API REST, Sécurité IAM/Keycloak',
              ].join('\n'),
        });
        break;

      case 'skills':
        newLines.push({
          id: `out-${cmdId}`,
          type: 'output',
          text: isEn
            ? [
                '🛠️  LANGUAGES    : TypeScript, JavaScript, PHP, Python, C#, Java',
                '🎨 FRONT-END    : React.js, Next.js, Angular 16, TailwindCSS, Figma',
                '⚙️  BACK-END     : Node.js, Express, Django REST, .NET, Windows Forms',
                '💾 DATABASES    : PostgreSQL, MySQL, SQL Server, MongoDB',
                '📦 DEVOPS & CI  : Docker, Git, Nginx, Keycloak (SSO), n8n, Linux Ubuntu',
                '🛡️  SECURITY     : OWASP Top 10, JWT, TDD, Clean Architecture, Vitest/Jest',
              ].join('\n')
            : [
                '🛠️  LANGAGES    : TypeScript, JavaScript, PHP, Python, C#, Java',
                '🎨 FRONT-END   : React.js, Next.js, Angular 16, TailwindCSS, Figma',
                '⚙️  BACK-END    : Node.js, Express, Django REST, .NET, Windows Forms',
                '💾 BASES DE D. : PostgreSQL, MySQL, SQL Server, MongoDB',
                '📦 DEVOPS & CI : Docker, Git, Nginx, Keycloak (SSO), n8n, Linux Ubuntu',
                '🛡️  SÉCURITÉ    : OWASP Top 10, JWT, TDD, Clean Architecture, Tests Vitest/Jest',
              ].join('\n'),
        });
        break;

      case 'projects':
        newLines.push({
          id: `out-${cmdId}`,
          type: 'output',
          text: projects
            .map(
              (p, idx) =>
                `[${idx + 1}] ${p.title} (${p.statusBadge || p.category})\n    ${p.description.slice(0, 110)}...`
            )
            .join('\n\n'),
        });
        break;

      case 'experiences':
        newLines.push({
          id: `out-${cmdId}`,
          type: 'output',
          text: isEn
            ? [
                '💼 NRJ Group (2026-2027): Full-Stack Developer Apprentice',
                '   Stack: Next.js, TypeScript, PostgreSQL, Docker, Unit Tests',
                '💼 ICMAAE (2024-2025): Full-Stack Developer Apprentice',
                '   Stack: Next.js, Keycloak (SSO), OpenLDAP, n8n, Nginx, Ubuntu',
                '💼 Snowpack (2023-2024): Front-End React Developer',
                '   Stack: React.js, JavaScript ES6+, CSS Modules, REST API',
                '💼 Mutuaide Assistance (2023): Front-End Angular Developer',
                '   Stack: Angular 16, TypeScript, PrimeNG, RxJS',
                '💼 Les Apprentis Dev (2022): WordPress Developer',
                '   Stack: WordPress, PHP, MySQL, HTML5/CSS3, SEO',
              ].join('\n')
            : [
                '💼 NRJ Group (2026-2027) : Alternant Développeur Full Stack',
                '   Stack : Next.js, TypeScript, PostgreSQL, Docker, Tests Unitaires',
                '💼 ICMAAE (2024-2025) : Alternant Développeur Full Stack',
                '   Stack : Next.js, Keycloak (SSO), OpenLDAP, n8n, Nginx, Ubuntu',
                '💼 Snowpack (2023-2024) : Développeur Front-End React',
                '   Stack : React.js, JavaScript ES6+, CSS Modules, REST API',
                '💼 Mutuaide Assistance (2023) : Développeur Front-End Angular',
                '   Stack : Angular 16, TypeScript, PrimeNG, RxJS',
                '💼 Les Apprentis Dev (2022) : Développeur WordPress',
                '   Stack : WordPress, PHP, MySQL, HTML5/CSS3, SEO',
              ].join('\n'),
        });
        break;

      case 'education':
      case 'formations':
        newLines.push({
          id: `out-${cmdId}`,
          type: 'output',
          text: isEn
            ? [
                '🎓 [1] Bachelor\'s Degree in CS & Web Development (DAWI) - University of Évry Paris-Saclay (2026 - 2027)',
                '🎓 [2] Associate Degree in Software Dev (BTS SIO SLAM) - Aurlom Education Group (2024 - 2025)',
                '🎓 [3] Associate Degree in Software Dev (BTS SIO SLAM) - Parc de Vilgénis High School (2022 - 2024)',
                '🎓 [4] Web Development Introductory Certification - Doranco Tech School (2022)',
                '🎓 [5] Technological High School Diploma (STI2D - Honors) - Gaspard Monge High School (2019 - 2021)',
              ].join('\n')
            : [
                '🎓 [1] Licence Pro 3 Métiers de l\'informatique DAWI - Université Évry Paris-Saclay (2026 - 2027)',
                '🎓 [2] BTS SIO SLAM (Alternance Obtenu) - Groupe Aurlom Éducation (2024 - 2025)',
                '🎓 [3] BTS SIO SLAM - Lycée Parc de Vilgénis (2022 - 2024)',
                '🎓 [4] Formation Initiation Développement Web - Doranco (2022)',
                '🎓 [5] Bac technologique STI2D - Lycée Gaspard Monge (2019 - 2021)',
              ].join('\n'),
        });
        break;

      case 'certif':
      case 'certifs':
      case 'certifications':
        newLines.push({
          id: `out-${cmdId}`,
          type: 'output',
          text: isEn
            ? [
                '📜 [1] Video Game Development in Unity - UDEMY (July 3, 2025)',
                '📜 [2] State Degree in Software Engineering (BTS SIO SLAM) - Versailles Academy (July 2025)',
                '📜 [3] Web Development & Programming Foundations - Doranco Tech School (2022)',
              ].join('\n')
            : [
                '📜 [1] Développement de jeux sur Unity - UDEMY (3 Juillet 2025)',
                '📜 [2] BTS SIO SLAM - Éducation Nationale / Académie de Versailles (Juillet 2025)',
                '📜 [3] Formation Initiation Développement Web & Langages - Doranco (2022)',
              ].join('\n'),
        });
        break;

      case 'cv':
        onDownloadCv();
        newLines.push({
          id: `out-${cmdId}`,
          type: 'success',
          text: isEn
            ? '✓ Resume download started successfully (CV_Nicolas_Pires_De_Jesus.pdf).'
            : '✓ Téléchargement du CV lancé avec succès (CV_Nicolas_Pires_De_Jesus.pdf).',
        });
        break;

      case 'contact':
        newLines.push({
          id: `out-${cmdId}`,
          type: 'output',
          text: [
            '📧 Email    : nicolas.piresdejesus91170@gmail.com',
            '🔗 LinkedIn : https://www.linkedin.com/in/nicolas-pires-de-jesus/',
            '🐙 GitHub   : https://github.com/Nico91170',
            isEn ? '⚡ 24h response guaranteed.' : '⚡ Réponse sous 24h garantie.',
          ].join('\n'),
        });
        onNavigate('contact');
        break;

      case 'theme':
        onToggleTheme();
        newLines.push({
          id: `out-${cmdId}`,
          type: 'success',
          text: isEn ? '✓ Theme toggled successfully.' : '✓ Thème basculé avec succès.',
        });
        break;

      case 'lang':
      case 'language':
        if (args[0] === 'fr') {
          setLanguage('fr');
          newLines.push({
            id: `out-${cmdId}`,
            type: 'success',
            text: '✓ Langue basculée en Français (FR).',
          });
        } else if (args[0] === 'en') {
          setLanguage('en');
          newLines.push({
            id: `out-${cmdId}`,
            type: 'success',
            text: '✓ Language switched to English (EN).',
          });
        } else {
          toggleLanguage();
          newLines.push({
            id: `out-${cmdId}`,
            type: 'success',
            text: isEn ? '✓ Langue basculée en Français (FR).' : '✓ Language switched to English (EN).',
          });
        }
        break;

      case 'whoami':
        newLines.push({
          id: `out-${cmdId}`,
          type: 'output',
          text: isEn
            ? 'talented-recruiter@innovative-company.com (Welcome to my portfolio!)'
            : 'recruteur-talentueux@entreprise-innovante.fr (Bienvenue sur mon portfolio !)',
        });
        break;

      case 'sudo':
        if (args.join(' ').includes('rm') || args.join(' ').includes('reboot')) {
          newLines.push({
            id: `out-${cmdId}`,
            type: 'error',
            text: isEn
              ? 'Permission denied: Nice try! Vercel Serverless & Rate Limiting security active 🛡️'
              : 'Permission denied: Nice try! Sécurité Vercel Serverless & Rate Limiting activés 🛡️',
          });
        } else {
          newLines.push({
            id: `out-${cmdId}`,
            type: 'info',
            text: isEn
              ? `[sudo] privileges granted. You are officially authorized to hire Nicolas! 😉`
              : `[sudo] privilèges accordés. Vous êtes autorisé à embaucher Nicolas ! 😉`,
          });
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        setInputVal('');
        return;

      default:
        newLines.push({
          id: `out-${cmdId}`,
          type: 'error',
          text: isEn
            ? `Command not found: "${cmd}". Type "help" to see available commands.`
            : `Commande introuvable : "${cmd}". Tapez "help" pour voir la liste des commandes.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        }
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? "CLI Developer Terminal" : "Terminal Développeur CLI"}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#1e2324] border border-[#e84393]/50 rounded-2xl shadow-2xl overflow-hidden font-mono flex flex-col h-[520px] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#2d3436] border-b border-[#b2bec3]/20">
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              aria-label={isEn ? "Close terminal" : "Fermer le terminal"}
              className="w-3.5 h-3.5 rounded-full bg-[#e84393] hover:opacity-80 transition-opacity"
            />
            <button
              onClick={() => setHistory([])}
              aria-label={isEn ? "Clear terminal" : "Nettoyer le terminal"}
              className="w-3.5 h-3.5 rounded-full bg-[#fd79a8] hover:opacity-80 transition-opacity"
            />
            <div className="w-3.5 h-3.5 rounded-full bg-[#b2bec3]" />
          </div>
          <div className="text-xs text-[#b2bec3] font-semibold flex items-center gap-1.5">
            <span className="text-[#e84393]">⚡</span> nicolas@portfolio:~ (bash)
          </div>
          <button
            onClick={onClose}
            className="text-xs text-[#b2bec3] hover:text-white px-2 py-0.5 rounded bg-[#1e2324] border border-[#b2bec3]/20"
          >
            ESC
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs sm:text-sm text-[#dfe6e9]">
          {history.map((line) => {
            if (line.type === 'command') {
              return (
                <div key={line.id} className="text-[#fd79a8] font-bold">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'error') {
              return (
                <div key={line.id} className="text-[#ff7675] whitespace-pre-wrap">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'success') {
              return (
                <div key={line.id} className="text-[#55efc4] whitespace-pre-wrap">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'info') {
              return (
                <div key={line.id} className="text-[#b2bec3] whitespace-pre-wrap">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={line.id} className="text-[#dfe6e9] whitespace-pre-wrap leading-relaxed">
                {line.text}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Prompt */}
        <div className="flex items-center px-4 py-3 bg-[#2d3436]/90 border-t border-[#b2bec3]/20">
          <span className="text-[#e84393] mr-2 shrink-0 font-bold">nicolas@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isEn ? 'Type a command (e.g. help, about, skills, cv, lang)...' : 'Tapez une commande (ex: help, about, skills, cv, lang)...'}
            className="flex-1 bg-transparent text-white placeholder-[#b2bec3]/50 focus:outline-none font-mono text-sm"
            aria-label={isEn ? 'Command prompt' : 'Invite de commande'}
          />
        </div>
      </div>
    </div>
  );
};

export default DeveloperTerminal;
