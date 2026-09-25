import React from 'react';
import AvailabilityBadge from '../AvailabilityBadge';
import { useLanguage } from '../../context/LanguageContext';

interface HeroSectionProps {
  sectionRef: (el: HTMLElement | null) => void;
  onContactClick: () => void;
  availabilityStatus?: string;
  cvUrl?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  sectionRef,
  onContactClick,
  availabilityStatus,
  cvUrl = '/cv.pdf',
}) => {
  const { t } = useLanguage();
  const displayStatus = availabilityStatus || t.hero.status;

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center text-center py-20 section-cover opacity-100 section-transition visible"
      ref={sectionRef}
    >
      <div className="z-10">
        {/* Badge de disponibilité en direct */}
        <div className="mb-6 animate-fade-in-up animation-delay-100">
          <AvailabilityBadge statusText={displayStatus} />
        </div>

        <p className="text-xl md:text-2xl text-[#b2bec3] mb-4 font-mono animate-fade-in-up animation-delay-200">
          {t.hero.greeting}
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gradient mb-4 animate-fade-in-up animation-delay-300">
          Nicolas.
        </h1>
        <p className="text-2xl md:text-4xl text-[#dfe6e9] font-semibold mb-8 animate-fade-in-up animation-delay-500">
          {t.hero.role}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-700">
          <a
            href="#contact"
            onClick={onContactClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#e84393] via-[#fd79a8] to-[#e84393] text-white font-bold rounded-full shadow-lg shadow-[#e84393]/30 hover:shadow-[#e84393]/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#e84393]"
          >
            <span>{t.hero.contactMe}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href={cvUrl}
            download="CV_Nicolas_Pires_De_Jesus.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.hero.downloadCv}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#2d3436]/90 hover:bg-[#2d3436] text-[#b2bec3] hover:text-white font-semibold rounded-full border border-[#b2bec3]/30 hover:border-[#e84393] shadow-md shadow-black/20 hover:shadow-[#e84393]/20 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#e84393]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e84393]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{t.hero.downloadCv}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
