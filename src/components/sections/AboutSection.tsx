import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface AboutSectionProps {
  sectionRef: (el: HTMLElement | null) => void;
  cvUrl?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ sectionRef, cvUrl = '/cv.pdf' }) => {
  const { language, t } = useLanguage();

  return (
    <section
      id="profil"
      className="min-h-screen flex items-center py-20 opacity-0 section-transition section-cover"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto glass-effect p-8 rounded-2xl shadow-xl border border-[#b2bec3]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e84393]/10 to-[#fd79a8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#e84393]/5 to-[#fd79a8]/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
          <div className="relative z-10 text-center">
            <picture>
              <source srcSet="/profile.webp" type="image/webp" />
              <img
                src="/profile.png"
                alt={language === 'en' ? "Professional portrait of Nicolas Pires De Jesus, Web & Software Developer" : "Portrait professionnel de Nicolas Pires De Jesus, Développeur Web & Logiciel"}
                width={160}
                height={160}
                loading="lazy"
                decoding="async"
                className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-[#e84393] shadow-lg object-cover transform transition-transform duration-500 hover:scale-105"
              />
            </picture>
            <h2 className="text-5xl font-extrabold text-gradient mb-4 animate-slide-in-up animation-delay-300">
              {t.about.title}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#e84393] via-[#fd79a8] to-[#b2bec3] mx-auto rounded-full shadow-lg shadow-[#e84393]/20 mb-8"></div>
            <p className="text-[#dfe6e9] text-lg leading-relaxed mb-6 animate-fade-in animation-delay-600">
              {language === 'fr' ? (
                <>
                  Je suis Nicolas, développeur Full-Stack passionné par la conception d'applications web innovantes, performantes et sécurisées. Titulaire d'un <span className="text-[#e84393] font-semibold">BTS SIO SLAM</span> et en préparation d'une <span className="text-[#fd79a8] font-semibold">Licence Pro DAWI à l'Université Évry Paris-Saclay</span>, je me spécialise dans le développement Full Stack et la cybersécurité. Mon parcours m'a permis de consolider une solide expertise en <span className="text-white font-semibold">développement web moderne (Next.js, React, Node.js)</span>, en <span className="text-[#b2bec3] font-semibold">sécurité applicative (Keycloak, SSO, Nginx)</span> et en <span className="text-white font-semibold">gestion de bases de données</span>.
                </>
              ) : (
                <>
                  I am Nicolas, a Full-Stack developer passionate about building innovative, fast, and secure web applications. Holding a <span className="text-[#e84393] font-semibold">State Degree in Software Engineering (BTS SIO SLAM)</span> and preparing a <span className="text-[#fd79a8] font-semibold">Bachelor's Degree (Licence Pro DAWI) at University of Évry Paris-Saclay</span>, I specialize in Full-Stack development and web application security. My background has enabled me to build solid expertise in <span className="text-white font-semibold">modern web engineering (Next.js, React, Node.js)</span>, <span className="text-[#b2bec3] font-semibold">application security (Keycloak, SSO, Nginx)</span>, and <span className="text-white font-semibold">database management</span>.
                </>
              )}
            </p>
            <p className="text-[#b2bec3] text-lg leading-relaxed animate-fade-in animation-delay-900 mb-8">
              {t.about.intro2}
            </p>

            {/* Statistiques clés (KPIs) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 animate-fade-in animation-delay-1000">
              <div className="p-4 rounded-xl bg-[#1e2324]/70 border border-[#b2bec3]/20 hover:border-[#e84393]/60 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">3+</div>
                <div className="text-xs text-[#b2bec3] uppercase tracking-wider font-medium">
                  {language === 'fr' ? "Années d'études" : 'Years of Study'}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#1e2324]/70 border border-[#b2bec3]/20 hover:border-[#e84393]/60 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">4+</div>
                <div className="text-xs text-[#b2bec3] uppercase tracking-wider font-medium">
                  {language === 'fr' ? 'Expériences pro' : 'Work Experiences'}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#1e2324]/70 border border-[#b2bec3]/20 hover:border-[#e84393]/60 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">10+</div>
                <div className="text-xs text-[#b2bec3] uppercase tracking-wider font-medium">Technologies</div>
              </div>
              <div className="p-4 rounded-xl bg-[#1e2324]/70 border border-[#b2bec3]/20 hover:border-[#e84393]/60 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">100%</div>
                <div className="text-xs text-[#b2bec3] uppercase tracking-wider font-medium">
                  {language === 'fr' ? 'Motivation' : 'Dedication'}
                </div>
              </div>
            </div>

            {/* Encadré Objectif & Modalités d'Alternance */}
            <div className="my-8 p-6 rounded-2xl bg-[#1e2324]/85 border border-[#e84393]/40 text-left shadow-xl shadow-black/30 animate-fade-in animation-delay-1100">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#b2bec3]/15">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#e84393] animate-pulse"></span>
                  <h3 className="text-xl font-bold text-white">{t.about.recruiterCardTitle}</h3>
                </div>
                <span className="px-3 py-1 bg-[#e84393]/20 text-[#fd79a8] rounded-full text-xs font-semibold border border-[#e84393]/40">
                  {t.about.badge}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-sm">
                <div className="flex items-start gap-2.5 text-[#dfe6e9]">
                  <span className="text-[#e84393] font-bold text-base leading-none">🎓</span>
                  <div>
                    <strong className="text-white block font-semibold">{t.about.diplomaLabel}{language === 'en' ? ':' : ' :'}</strong>
                    <span className="text-[#b2bec3]">{t.about.diplomaValue}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-[#dfe6e9]">
                  <span className="text-[#e84393] font-bold text-base leading-none">💼</span>
                  <div>
                    <strong className="text-white block font-semibold">{t.about.contractLabel}{language === 'en' ? ':' : ' :'}</strong>
                    <span className="text-[#b2bec3]">{t.about.contractValue}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-[#dfe6e9]">
                  <span className="text-[#e84393] font-bold text-base leading-none">📍</span>
                  <div>
                    <strong className="text-white block font-semibold">{t.about.locationLabel}{language === 'en' ? ':' : ' :'}</strong>
                    <span className="text-[#b2bec3]">{t.about.locationValue}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-[#dfe6e9]">
                  <span className="text-[#e84393] font-bold text-base leading-none">🚀</span>
                  <div>
                    <strong className="text-white block font-semibold">{t.about.targetRolesLabel}{language === 'en' ? ':' : ' :'}</strong>
                    <span className="text-[#b2bec3]">{t.about.targetRolesValue}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center animate-fade-in animation-delay-1200">
              <a
                href={cvUrl}
                download="CV_Nicolas_Pires_De_Jesus.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.hero.downloadCv}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2d3436]/90 hover:bg-[#2d3436] text-[#b2bec3] hover:text-white font-semibold rounded-full border border-[#b2bec3]/30 hover:border-[#e84393] shadow-md shadow-black/20 hover:shadow-[#e84393]/20 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#e84393]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e84393]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{t.about.cvButton}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
