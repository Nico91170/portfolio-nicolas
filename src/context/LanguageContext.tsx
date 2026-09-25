/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language, type Translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLang?: Language }> = ({
  children,
  initialLang,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (initialLang) return initialLang;
    try {
      const stored = localStorage.getItem('portfolio_lang');
      if (stored === 'fr' || stored === 'en') {
        return stored;
      }
    } catch {
      // Fallback in environments without localStorage
    }
    return 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('portfolio_lang', lang);
    } catch {
      // Ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      if (language === 'en') {
        document.title = 'Nicolas Pires De Jesus | Full-Stack Developer & Web Architect';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', 'Portfolio of Nicolas Pires De Jesus, passionate Full-Stack Developer specializing in React, TypeScript, Next.js, Node.js, and modern secure web architectures.');
        }
      } else {
        document.title = 'Nicolas Pires De Jesus | Développeur Full-Stack & Web';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', 'Portfolio de Nicolas Pires De Jesus, Développeur Full-Stack passionné, spécialisé en React, TypeScript, Next.js, Node.js et architectures web modernes et sécurisées.');
        }
      }
    }
  }, [language]);

  const value: LanguageContextType = {
    language,
    t: translations[language],
    toggleLanguage,
    setLanguage,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback for components rendered outside provider (e.g. isolated unit tests)
    return {
      language: 'fr',
      t: translations.fr,
      toggleLanguage: () => {},
      setLanguage: () => {},
    };
  }
  return context;
};
