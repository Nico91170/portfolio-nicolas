import React, { useState, useRef, useEffect, Suspense } from 'react';
import Modal from 'react-modal';
import { Analytics } from '@vercel/analytics/react';
import Background from './components/Background';
import Toast from './components/Toast';
import ScrollProgressBar from './components/ScrollProgressBar';
import BackToTop from './components/BackToTop';

// Lazy loading des modales pour alléger drastiquement le bundle initial
const ProjectModal = React.lazy(() => import('./components/ProjectModal'));
const CertificationModal = React.lazy(() => import('./components/CertificationModal'));
const LegalModal = React.lazy(() => import('./components/LegalModal'));
const CommandPalette = React.lazy(() => import('./components/CommandPalette'));
const DeveloperTerminal = React.lazy(() => import('./components/DeveloperTerminal'));

import Header from './components/sections/Header';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import EducationSection from './components/sections/EducationSection';
import CertificationsSection from './components/sections/CertificationsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/sections/Footer';

import { contactEmail, cvUrl, getProjectsData, getCertificationsData } from './data/portfolioData';
import type { Project, Certification } from './types/portfolio';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import './App.css';

function AppContent() {
  const { t, language } = useLanguage();
  const localizedProjects = getProjectsData(language);
  const localizedCertifications = getCertificationsData(language);
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false,
    _hp_company: '',
  });
  const [toast, setToast] = useState<{ message: string | null; type: 'success' | 'error' }>({
    message: null,
    type: 'success',
  });
  const formLoadedAtRef = useRef<number>(Date.now());
  const [theme, setTheme] = useState('dark');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'legal' | 'privacy'>('legal');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Écouteur global pour raccourci clavier Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (sectionId: string) => {
    handleNavLinkClick(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCv = () => {
    const link = document.createElement('a');
    link.href = cvUrl;
    link.setAttribute('download', 'CV_Nicolas_Pires_De_Jesus_FullStack.pdf');
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast({
      message: t.toasts.cvDownloaded,
      type: 'success',
    });
  };

  const handleCopyEmail = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(contactEmail).catch(() => {});
    }
    setToast({
      message: t.toasts.emailCopied,
      type: 'success',
    });
  };

  const handleDownloadVCard = () => {
    const isEn = language === 'en';
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Nicolas Pires De Jesus',
      'N:Pires De Jesus;Nicolas;;;',
      `TITLE:${isEn ? 'Full-Stack Developer & Software Engineer' : 'Développeur Full-Stack & Concepteur Web'}`,
      `EMAIL;TYPE=INTERNET,WORK:${contactEmail}`,
      'URL:https://portfolio-nicolas.vercel.app',
      `NOTE:${isEn ? 'Pro Degree DAWI Student - Seeking Full-Stack Apprenticeship' : 'Étudiant Licence Pro DAWI - Recherche Alternance Développeur Full-Stack'}`,
      'END:VCARD',
    ].join('\r\n');
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Nicolas_Pires_De_Jesus.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setToast({
      message: t.toasts.vcardDownloaded,
      type: 'success',
    });
  };

  const sectionsRef = useRef<HTMLElement[]>([]);
  const dividersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    Modal.setAppElement('#root');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    const sections = sectionsRef.current.slice();
    const dividers = dividersRef.current.slice();

    sections.forEach((section) => {
      observer.observe(section);
    });

    dividers.forEach((divider) => {
      observer.observe(divider);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
      dividers.forEach((divider) => {
        observer.unobserve(divider);
      });
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const addDividerToRefs = (el: HTMLDivElement | null) => {
    if (el && !dividersRef.current.includes(el)) {
      dividersRef.current.push(el);
    }
  };

  const handleNavLinkClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenLegal = (tab: 'legal' | 'privacy' = 'legal') => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  const handleCloseLegal = () => {
    setIsLegalOpen(false);
  };

  const handleSelectReason = (subject: string, template: string) => {
    setFormData((prev) => ({
      ...prev,
      subject,
      message: template,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      setToast({
        message: language === 'en' ? 'Name must be between 2 and 100 characters.' : 'Le nom doit contenir entre 2 et 100 caractères.',
        type: 'error',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setToast({
        message: language === 'en' ? 'Please enter a valid email address.' : 'Veuillez renseigner une adresse email valide.',
        type: 'error',
      });
      return;
    }

    if (trimmedSubject.length < 2 || trimmedSubject.length > 150) {
      setToast({
        message: language === 'en' ? 'Subject must be between 2 and 150 characters.' : 'Le sujet doit contenir entre 2 et 150 caractères.',
        type: 'error',
      });
      return;
    }

    if (trimmedMessage.length < 10 || trimmedMessage.length > 3000) {
      setToast({
        message: language === 'en' ? 'Message must be between 10 and 3000 characters.' : 'Le message doit contenir entre 10 et 3000 caractères.',
        type: 'error',
      });
      return;
    }

    if (!formData.consent) {
      setToast({
        message: language === 'en' ? 'You must accept the privacy policy to submit.' : 'Vous devez accepter les conditions de confidentialité.',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
          _loadedAt: formLoadedAtRef.current,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setToast({
          message: language === 'en' ? t.toasts.formSuccess : (data.message || t.toasts.formSuccess),
          type: 'success',
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          consent: false,
          _hp_company: '',
        });
        formLoadedAtRef.current = Date.now();
      } else {
        setToast({
          message: language === 'en' ? t.toasts.formError : (data.error || t.toasts.formError),
          type: 'error',
        });
      }
    } catch {
      setToast({
        message: t.toasts.networkError,
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <ScrollProgressBar />
      <Background />
      <div className="relative z-10">
        <Header
          activeSection={activeSection}
          theme={theme}
          isMenuOpen={isMenuOpen}
          onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          onToggleTheme={toggleTheme}
          onNavLinkClick={handleNavLinkClick}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        <HeroSection
          sectionRef={addToRefs}
          onContactClick={() => handleNavLinkClick('contact')}
          availabilityStatus={t.hero.status}
          cvUrl={cvUrl}
        />

        <div className="section-divider" ref={addDividerToRefs}></div>

        <AboutSection sectionRef={addToRefs} cvUrl={cvUrl} />

        <div className="section-divider" ref={addDividerToRefs}></div>

        <SkillsSection sectionRef={addToRefs} />

        <div className="section-divider" ref={addDividerToRefs}></div>

        <ExperienceSection sectionRef={addToRefs} />

        <div className="section-divider" ref={addDividerToRefs}></div>

        <ProjectsSection
          sectionRef={addToRefs}
          projects={localizedProjects}
          onProjectClick={(project) => setSelectedProject(project)}
        />

        <Suspense fallback={null}>
          <ProjectModal
            isOpen={selectedProject !== null}
            onClose={() => setSelectedProject(null)}
            project={selectedProject ? localizedProjects.find((p) => p.id === selectedProject.id) || selectedProject : localizedProjects[0]}
          />
        </Suspense>

        <div className="section-divider" ref={addDividerToRefs}></div>

        <EducationSection sectionRef={addToRefs} />

        <div className="section-divider" ref={addDividerToRefs}></div>

        <CertificationsSection
          sectionRef={addToRefs}
          certifications={localizedCertifications}
          onCertificationClick={(certification) => setSelectedCertification(certification)}
        />

        <Suspense fallback={null}>
          <CertificationModal
            isOpen={selectedCertification !== null}
            onClose={() => setSelectedCertification(null)}
            certification={selectedCertification ? localizedCertifications.find((c) => c.id === selectedCertification.id) || selectedCertification : localizedCertifications[0]}
          />
        </Suspense>

        <div className="section-divider" ref={addDividerToRefs}></div>

        <ContactSection
          sectionRef={addToRefs}
          email={contactEmail}
          onEmailCopied={() =>
            setToast({
              message: t.toasts.emailCopied,
              type: 'success',
            })
          }
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onOpenPrivacy={() => handleOpenLegal('privacy')}
          onSelectReason={handleSelectReason}
        />

        <Footer onOpenLegal={handleOpenLegal} />
      </div>

      {/* Bouton Flottant Développeur Terminal */}
      <button
        type="button"
        onClick={() => setIsTerminalOpen(true)}
        aria-label={language === 'fr' ? 'Ouvrir le terminal développeur' : 'Open developer terminal'}
        title={language === 'fr' ? 'Ouvrir le terminal développeur (Easter Egg CLI)' : 'Open developer terminal (CLI Easter Egg)'}
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-full glass-effect text-[#b2bec3] hover:text-white hover:border-[#e84393] shadow-lg shadow-black/40 hover:shadow-[#e84393]/30 transition-all duration-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#e84393] group"
      >
        <span className="text-[#e84393] font-bold group-hover:scale-110 transition-transform">&gt;_</span>
        <span className="tracking-wide">Terminal</span>
      </button>

      <Suspense fallback={null}>
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={handleNavigate}
          onToggleTheme={toggleTheme}
          onDownloadCv={handleDownloadCv}
          onCopyEmail={handleCopyEmail}
          onDownloadVCard={handleDownloadVCard}
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          projects={localizedProjects}
          certifications={localizedCertifications}
        />
      </Suspense>

      <Suspense fallback={null}>
        <DeveloperTerminal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          onDownloadCv={handleDownloadCv}
          onToggleTheme={toggleTheme}
          onNavigate={handleNavigate}
          projects={localizedProjects}
        />
      </Suspense>

      <Suspense fallback={null}>
        <LegalModal
          isOpen={isLegalOpen}
          onClose={handleCloseLegal}
          initialTab={legalTab}
        />
      </Suspense>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: null, type: 'success' })}
      />

      <BackToTop />
      <Analytics />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
