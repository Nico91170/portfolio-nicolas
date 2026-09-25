import React from 'react';
import CertificationCard from '../CertificationCard';
import type { Certification } from '../../types/portfolio';
import { useLanguage } from '../../context/LanguageContext';

interface CertificationsSectionProps {
  sectionRef: (el: HTMLElement | null) => void;
  certifications: Certification[];
  onCertificationClick: (certification: Certification) => void;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  sectionRef,
  certifications,
  onCertificationClick,
}) => {
  const { t } = useLanguage();

  return (
    <section
      id="certifications"
      className="min-h-screen flex items-center py-20 opacity-0 section-transition section-cover"
      ref={sectionRef}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-gradient animate-slide-in">{t.certifications.title}</h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#e84393] via-[#fd79a8] to-[#b2bec3] mx-auto rounded-full shadow-lg shadow-[#e84393]/20"></div>
          <p className="mt-6 text-[#b2bec3] text-lg max-w-2xl mx-auto">{t.certifications.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
          {certifications.map((certification) => (
            <CertificationCard
              key={certification.id}
              {...certification}
              onClick={() => onCertificationClick(certification)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
