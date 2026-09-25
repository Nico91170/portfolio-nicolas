import React from 'react';
import { getExperiencesData } from '../../data/portfolioData';
import { useLanguage } from '../../context/LanguageContext';

interface ExperienceSectionProps {
  sectionRef: (el: HTMLElement | null) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ sectionRef }) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const experiences = getExperiencesData(language);

  return (
    <section
      id="experiences"
      className="min-h-screen flex items-center py-20 opacity-0 section-transition section-cover"
      ref={sectionRef}
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2 text-gradient animate-slide-in font-mono">
            <span role="img" aria-label={isEn ? "Developer" : "Développeur"}>🧑‍💻</span> {t.experiences.title}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#e84393] via-[#fd79a8] to-[#b2bec3] mx-auto rounded-full shadow-lg shadow-[#e84393]/20"></div>
        </div>

        <div className="bg-[#2d3436] rounded-xl p-6 shadow-2xl border border-[#b2bec3]/20 overflow-hidden">
          {/* Header style IDE tab */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#b2bec3]/20">
            <div className="flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#e84393]"></div>
                <div className="w-3 h-3 rounded-full bg-[#fd79a8]"></div>
                <div className="w-3 h-3 rounded-full bg-[#b2bec3]"></div>
              </div>
              <div className="ml-4 text-[#b2bec3] text-sm font-mono flex items-center gap-2">
                <span>experiences.ts</span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#1e2324] text-[#fd79a8] border border-[#e84393]/30">
                  {experiences.length} {t.experiences.badgeMissions}
                </span>
              </div>
            </div>
            <div className="text-xs text-[#b2bec3]/60 font-mono hidden sm:block">
              {t.experiences.subtitle}
            </div>
          </div>

          <div className="space-y-8 font-mono">
            {experiences.map((exp) => (
              <div key={exp.id} className="group/item">
                {/* Entête avec déclaration TypeScript et Logo de l'entreprise */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                  <div className="flex items-center flex-wrap">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#e84393] mr-3 shrink-0 shadow-sm shadow-[#e84393]/50"></div>
                    <span className="text-[#b2bec3]/60 mr-2 font-mono text-sm">{exp.lineNum}</span>
                    <span className="text-[#b2bec3]/40 mr-2 font-mono text-sm">|</span>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-mono">
                      const {exp.varName}: Experience = {'{'}
                    </h3>
                    <span className="text-[#b2bec3]/80 ml-2 font-mono text-xs sm:text-sm">{exp.comment}</span>
                  </div>

                  {/* Logo Entreprise Showcase */}
                  <div
                    className={`flex items-center justify-center h-11 w-28 sm:h-12 sm:w-32 px-2.5 py-1.5 rounded-xl ${exp.logoBg} shadow-md border border-[#b2bec3]/20 group-hover/item:border-[#e84393] group-hover/item:shadow-lg group-hover/item:shadow-[#e84393]/20 transition-all duration-300 overflow-hidden shrink-0`}
                    title={`${exp.company} - ${exp.title}`}
                  >
                    <img
                      src={exp.logo}
                      alt={isEn ? `${exp.company} logo` : `Logo ${exp.company}`}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain group-hover/item:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Corps de l'expérience */}
                <div className="pl-4 border-l-2 border-[#e84393]/40">
                  <div className="space-y-4">
                    <div className="flex items-start group/exp hover:translate-x-2 transition-transform duration-300">
                      <div className="flex flex-col items-center mr-3">
                        <span className="text-[#b2bec3]/60 font-mono text-sm">{exp.contentLineNum}</span>
                        <span className="text-[#b2bec3]/40 font-mono text-sm">|</span>
                      </div>
                      <div className="w-full">
                        <div className="text-[#dfe6e9] font-mono">
                          <span className="text-[#e84393]">title</span>: <span className="text-[#dfe6e9]">"{exp.title}"</span>,
                        </div>
                        <div className="text-[#dfe6e9] font-mono flex items-center flex-wrap gap-2 my-0.5">
                          <div>
                            <span className="text-[#e84393]">company</span>: <span className="text-[#dfe6e9]">"{exp.company}"</span>,
                          </div>
                          <span
                            className={`inline-flex items-center justify-center h-5 w-5 rounded ${exp.logoBg} p-0.5 border border-[#b2bec3]/30 shadow-xs`}
                            aria-hidden="true"
                          >
                            <img src={exp.logo} alt="" className="max-h-full max-w-full object-contain rounded-xs" />
                          </span>
                        </div>
                        {exp.location && (
                          <div className="text-[#dfe6e9] font-mono">
                            <span className="text-[#e84393]">location</span>: <span className="text-[#dfe6e9]">"{exp.location}"</span>,
                          </div>
                        )}
                        <div className="text-[#dfe6e9] font-mono">
                          <span className="text-[#e84393]">period</span>: <span className="text-[#dfe6e9]">"{exp.period}"</span>,
                        </div>
                        <div className="text-[#dfe6e9] font-mono">
                          <span className="text-[#e84393]">responsibilities</span>: <span className="text-[#b2bec3]">[</span>
                        </div>
                        <div className="pl-4 space-y-2">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <div key={rIdx} className="text-[#dfe6e9] font-mono">
                              <span className="text-[#dfe6e9]">"{resp}"</span>
                              {rIdx < exp.responsibilities.length - 1 ? ',' : ''}
                            </div>
                          ))}
                        </div>
                        <div className="text-[#dfe6e9] font-mono">
                          <span className="text-[#b2bec3]">]</span>,
                        </div>
                        <div className="text-[#dfe6e9] font-mono mt-3">
                          <span className="text-[#e84393]">stack</span>: <span className="text-[#b2bec3]">[</span>
                        </div>
                        <div className="pl-4 flex flex-wrap gap-1.5 py-1">
                          {exp.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[#1e2324] text-[#fd79a8] border border-[#e84393]/35 shadow-sm"
                            >
                              "{tech}"
                            </span>
                          ))}
                        </div>
                        <div className="text-[#dfe6e9] font-mono">
                          <span className="text-[#b2bec3]">]</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
