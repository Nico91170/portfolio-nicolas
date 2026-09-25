import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface FooterProps {
  onOpenLegal: (tab: 'legal' | 'privacy') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <footer className="w-full py-12 px-6 md:px-12 bg-[#1e2324]/90 backdrop-filter backdrop-blur-md border-t border-[#b2bec3]/20 text-[#b2bec3] text-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <span className="font-extrabold text-gradient text-lg">NICOLAS</span>
          <span className="hidden sm:inline text-[#b2bec3]/40">|</span>
          <p>© {new Date().getFullYear()} Nicolas Pires De Jesus. {isEn ? 'All rights reserved.' : 'Tous droits réservés.'}</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
          <button
            type="button"
            onClick={() => onOpenLegal('legal')}
            className="hover:text-[#e84393] transition-colors focus:outline-none"
          >
            {isEn ? 'Legal Notice' : 'Mentions Légales'}
          </button>
          <button
            type="button"
            onClick={() => onOpenLegal('privacy')}
            className="hover:text-[#e84393] transition-colors focus:outline-none"
          >
            {isEn ? 'Privacy & GDPR' : 'Confidentialité & RGPD'}
          </button>
          <button
            type="button"
            onClick={() => onOpenLegal('privacy')}
            className="hover:text-[#e84393] transition-colors focus:outline-none"
          >
            {isEn ? 'Cookie Policy' : 'Politique de Cookies'}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
