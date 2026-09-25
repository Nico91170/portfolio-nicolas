import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface EducationSectionProps {
  sectionRef: (el: HTMLElement | null) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({ sectionRef }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <section
      id="formations"
      className="min-h-screen flex items-center py-20 opacity-0 section-transition section-cover"
      ref={sectionRef}
    >
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2 text-gradient animate-slide-in font-mono">
            {isEn ? '// Education' : '// Formations'}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#e84393] via-[#fd79a8] to-[#b2bec3] mx-auto rounded-full shadow-lg shadow-[#e84393]/20"></div>
        </div>
        <div className="bg-[#2d3436] rounded-xl p-6 shadow-2xl border border-[#b2bec3]/20">
          <div className="flex items-center mb-4 pb-4 border-b border-[#b2bec3]/20">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#e84393]"></div>
              <div className="w-3 h-3 rounded-full bg-[#fd79a8]"></div>
              <div className="w-3 h-3 rounded-full bg-[#b2bec3]"></div>
            </div>
            <div className="ml-4 text-[#b2bec3] text-sm font-mono">
              {isEn ? 'education.ts' : 'formations.ts'}
            </div>
          </div>
          <div className="space-y-6 font-mono">
            {/* Formation 1 */}
            <div className="group/formation hover:bg-[#1e2324]/60 transition-colors duration-300 rounded-lg p-4 border border-transparent hover:border-[#b2bec3]/20">
              <div className="flex items-start">
                <div className="text-[#b2bec3]/60 mr-4 select-none">01</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e84393]">const</span>
                    <span className="text-white font-medium">{isEn ? 'education1' : 'formation1'}</span>
                    <span className="text-[#b2bec3]">=</span>
                    <span className="text-[#fd79a8]">{'{'}</span>
                  </div>
                  <div className="ml-6 mt-2 space-y-2">
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'degree' : 'diplome'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">
                        {isEn
                          ? '"Bachelor\'s Degree in CS & Web Development (DAWI)"'
                          : '"Licence Pro 3 Métiers de l\'informatique DAWI"'}
                      </span>
                      <span className="text-[#b2bec3]">,</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'institution' : 'etablissement'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">{isEn ? '"University of Évry Paris-Saclay"' : '"Université Évry Paris-Saclay"'}</span>
                      <span className="text-[#b2bec3]">,</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'period' : 'periode'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">"2026 - 2027"</span>
                    </div>
                  </div>
                  <div className="text-[#fd79a8]">{'}'}</div>
                </div>
              </div>
            </div>

            {/* Formation 2 */}
            <div className="group/formation hover:bg-[#1e2324]/60 transition-colors duration-300 rounded-lg p-4 border border-transparent hover:border-[#b2bec3]/20">
              <div className="flex items-start">
                <div className="text-[#b2bec3]/60 mr-4 select-none">02</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e84393]">const</span>
                    <span className="text-white font-medium">{isEn ? 'education2' : 'formation2'}</span>
                    <span className="text-[#b2bec3]">=</span>
                    <span className="text-[#fd79a8]">{'{'}</span>
                  </div>
                  <div className="ml-6 mt-2 space-y-2">
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'degree' : 'diplome'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">
                        {isEn
                          ? '"Associate Degree in Software Dev (BTS SIO SLAM - Graduated)"'
                          : '"BTS SIO SLAM (Alternance Obtenu)"'}
                      </span>
                      <span className="text-[#b2bec3]">,</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'institution' : 'etablissement'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">{isEn ? '"Aurlom Education Group"' : '"Groupe Aurlom Éducation"'}</span>
                      <span className="text-[#b2bec3]">,</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'period' : 'periode'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">"2024 - 2025"</span>
                    </div>
                  </div>
                  <div className="text-[#fd79a8]">{'}'}</div>
                </div>
              </div>
            </div>

            {/* Formation 3 */}
            <div className="group/formation hover:bg-[#1e2324]/60 transition-colors duration-300 rounded-lg p-4 border border-transparent hover:border-[#b2bec3]/20">
              <div className="flex items-start">
                <div className="text-[#b2bec3]/60 mr-4 select-none">03</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e84393]">const</span>
                    <span className="text-white font-medium">{isEn ? 'education3' : 'formation3'}</span>
                    <span className="text-[#b2bec3]">=</span>
                    <span className="text-[#fd79a8]">{'{'}</span>
                  </div>
                  <div className="ml-6 mt-2 space-y-2">
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'degree' : 'diplome'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">
                        {isEn
                          ? '"Associate Degree in Software Dev (BTS SIO SLAM)"'
                          : '"BTS SIO SLAM"'}
                      </span>
                      <span className="text-[#b2bec3]">,</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'institution' : 'etablissement'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">{isEn ? '"Parc de Vilgénis High School"' : '"Lycée Parc de Vilgénis"'}</span>
                      <span className="text-[#b2bec3]">,</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'period' : 'periode'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">"2022 - 2024"</span>
                    </div>
                  </div>
                  <div className="text-[#fd79a8]">{'}'}</div>
                </div>
              </div>
            </div>

            {/* Formation 4 */}
            <div className="group/formation hover:bg-[#1e2324]/60 transition-colors duration-300 rounded-lg p-4 border border-transparent hover:border-[#b2bec3]/20">
              <div className="flex items-start">
                <div className="text-[#b2bec3]/60 mr-4 select-none">04</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e84393]">const</span>
                    <span className="text-white font-medium">{isEn ? 'education4' : 'formation4'}</span>
                    <span className="text-[#b2bec3]">=</span>
                    <span className="text-[#fd79a8]">{'{'}</span>
                  </div>
                  <div className="ml-6 mt-2 space-y-2">
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'degree' : 'diplome'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">
                        {isEn
                          ? '"Web Development Introductory Certification"'
                          : '"Formation Initiation Développement Web"'}
                      </span>
                      <span className="text-[#b2bec3]">,</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'institution' : 'etablissement'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">{isEn ? '"Doranco Tech School"' : '"Doranco"'}</span>
                      <span className="text-[#b2bec3]">,</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'period' : 'periode'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">"2022"</span>
                    </div>
                  </div>
                  <div className="text-[#fd79a8]">{'}'}</div>
                </div>
              </div>
            </div>

            {/* Formation 5 */}
            <div className="group/formation hover:bg-[#1e2324]/60 transition-colors duration-300 rounded-lg p-4 border border-transparent hover:border-[#b2bec3]/20">
              <div className="flex items-start">
                <div className="text-[#b2bec3]/60 mr-4 select-none">05</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[#e84393]">const</span>
                    <span className="text-white font-medium">{isEn ? 'education5' : 'formation5'}</span>
                    <span className="text-[#b2bec3]">=</span>
                    <span className="text-[#fd79a8]">{'{'}</span>
                  </div>
                  <div className="ml-6 mt-2 space-y-2">
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'degree' : 'diplome'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">
                        {isEn
                          ? '"Technological High School Diploma (STI2D - Honors)"'
                          : '"Bac technologique STI2D"'}
                      </span>
                      <span className="text-[#b2bec3]">,</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'institution' : 'etablissement'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">{isEn ? '"Gaspard Monge High School"' : '"Lycée Gaspard Monge"'}</span>
                      <span className="text-[#b2bec3]">,</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#e84393]">{isEn ? 'period' : 'periode'}</span>
                      <span className="text-[#b2bec3]">: </span>
                      <span className="text-[#dfe6e9]">"2019 - 2021"</span>
                    </div>
                  </div>
                  <div className="text-[#fd79a8]">{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
