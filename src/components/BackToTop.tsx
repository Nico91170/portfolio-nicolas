import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={language === 'en' ? 'Back to top of page' : 'Retourner en haut de la page'}
      className={`fixed bottom-6 left-6 z-40 p-3.5 rounded-full glass-effect text-[#dfe6e9] hover:text-white hover:border-[#e84393] shadow-lg shadow-black/40 hover:shadow-[#e84393]/30 transition-all duration-300 transform group focus:outline-none focus:ring-2 focus:ring-[#e84393] ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-6 scale-90 pointer-events-none'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 transform group-hover:-translate-y-1 transition-transform duration-300 text-[#e84393] group-hover:text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

export default BackToTop;
