import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface SkillsSectionProps {
  sectionRef: (el: HTMLElement | null) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ sectionRef }) => {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  return (
    <section
      id="competences"
      className="min-h-screen flex items-center py-20 opacity-0 section-transition section-cover"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-gradient animate-slide-in">{t.skills.title}</h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#e84393] via-[#fd79a8] to-[#b2bec3] mx-auto rounded-full shadow-lg shadow-[#e84393]/20"></div>
          <p className="mt-6 text-[#b2bec3] text-lg max-w-2xl mx-auto">{t.skills.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Langages de Programmation */}
          <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-[#b2bec3]/20 hover:border-[#e84393]/60">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e84393]/10 to-[#fd79a8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#e84393]/5 to-[#fd79a8]/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#e84393]/20 to-[#fd79a8]/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e84393]/20 to-[#fd79a8]/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="flex items-center mb-6 relative z-10">
              <span className="text-5xl mr-4" role="img" aria-label={isEn ? "Tools" : "Outils"}>🛠️</span>
              <div>
                <h3 className="text-2xl font-bold text-gradient mb-2">
                  {language === 'fr' ? 'Langages de Programmation' : 'Programming Languages'}
                </h3>
              </div>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> JavaScript
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> TypeScript
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> PHP
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Python
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> C#
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Java
              </span>
            </div>
          </div>

          {/* Front-End */}
          <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-[#b2bec3]/20 hover:border-[#e84393]/60">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e84393]/10 to-[#fd79a8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#e84393]/5 to-[#fd79a8]/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#e84393]/20 to-[#fd79a8]/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e84393]/20 to-[#fd79a8]/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="flex items-center mb-6 relative z-10">
              <span className="text-5xl mr-4" role="img" aria-label="Palette">🎨</span>
              <div>
                <h3 className="text-2xl font-bold text-gradient mb-2">Front-End</h3>
              </div>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> React.js
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Next.js
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" alt="Angular" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Angular
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="TailwindCSS" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> TailwindCSS
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Figma
              </span>
            </div>
          </div>

          {/* Back-End */}
          <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-[#b2bec3]/20 hover:border-[#e84393]/60">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e84393]/10 to-[#fd79a8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#e84393]/5 to-[#fd79a8]/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#e84393]/20 to-[#fd79a8]/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e84393]/20 to-[#fd79a8]/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="flex items-center mb-6 relative z-10">
              <span className="text-5xl mr-4" role="img" aria-label={isEn ? "Gear" : "Engrenage"}>⚙️</span>
              <div>
                <h3 className="text-2xl font-bold text-gradient mb-2">Back-End</h3>
              </div>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Node.js
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" alt="Django" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Django REST
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" alt=".NET" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> .NET
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" alt="Windows Forms" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Windows Forms
              </span>
            </div>
          </div>

          {/* Bases de Données */}
          <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-[#b2bec3]/20 hover:border-[#e84393]/60">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e84393]/10 to-[#fd79a8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#e84393]/5 to-[#fd79a8]/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#e84393]/20 to-[#fd79a8]/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e84393]/20 to-[#fd79a8]/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="flex items-center mb-6 relative z-10">
              <span className="text-5xl mr-4" role="img" aria-label={isEn ? "Disk" : "Disque"}>💾</span>
              <div>
                <h3 className="text-2xl font-bold text-gradient mb-2">
                  {isEn ? 'Databases' : 'Bases de Données'}
                </h3>
              </div>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> MySQL
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> PostgreSQL
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" alt="SQL Server" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> SQL Server
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" alt="Access" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Access
              </span>
            </div>
          </div>

          {/* DevOps & Outils */}
          <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-[#b2bec3]/20 hover:border-[#e84393]/60">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e84393]/10 to-[#fd79a8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#e84393]/5 to-[#fd79a8]/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#e84393]/20 to-[#fd79a8]/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e84393]/20 to-[#fd79a8]/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="flex items-center mb-6 relative z-10">
              <span className="text-5xl mr-4" role="img" aria-label={isEn ? "Toolbox" : "Boîte à outils"}>🛠️</span>
              <div>
                <h3 className="text-2xl font-bold text-gradient mb-2">
                  {isEn ? 'DevOps & Tools' : 'DevOps & Outils'}
                </h3>
              </div>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Git
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Docker
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Logo_of_Keycloak.svg" alt="Keycloak" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Keycloak
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" alt="Nginx" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Nginx
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/N8n-logo-new.svg" alt="n8n" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> n8n
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg" alt="Ubuntu" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Ubuntu
              </span>
            </div>
          </div>

          {/* Méthodologies */}
          <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-[#b2bec3]/20 hover:border-[#e84393]/60">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e84393]/10 to-[#fd79a8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#e84393]/5 to-[#fd79a8]/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#e84393]/20 to-[#fd79a8]/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e84393]/20 to-[#fd79a8]/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="flex items-center mb-6 relative z-10">
              <span className="text-5xl mr-4" role="img" aria-label={isEn ? "Clipboard" : "Presse-papiers"}>📋</span>
              <div>
                <h3 className="text-2xl font-bold text-gradient mb-2">
                  {isEn ? 'Methodologies' : 'Méthodologies'}
                </h3>
              </div>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                {isEn ? 'OOP' : 'POO'}
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                {isEn ? 'Unit Testing' : 'Tests Unitaires'}
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                Scrum
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                UML
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                MCD/MLD
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                SysML
              </span>
            </div>
          </div>

          {/* Développement de Jeux Vidéo */}
          <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-[#b2bec3]/20 hover:border-[#e84393]/60">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e84393]/10 to-[#fd79a8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#e84393]/5 to-[#fd79a8]/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#e84393]/20 to-[#fd79a8]/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e84393]/20 to-[#fd79a8]/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="flex items-center mb-6 relative z-10">
              <span className="text-5xl mr-4" role="img" aria-label={isEn ? "Gamepad" : "Manette de jeu"}>🎮</span>
              <div>
                <h3 className="text-2xl font-bold text-gradient mb-2">
                  {isEn ? 'Game Development' : 'Développement de Jeux Vidéo'}
                </h3>
              </div>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" alt="Unity" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Unity
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> C#
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" alt="Blender" className="w-5 h-5" width={20} height={20} loading="lazy" decoding="async" /> Blender
              </span>
            </div>
          </div>

          {/* Sécurité & Qualité Applicative */}
          <div className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-[#b2bec3]/20 hover:border-[#e84393]/60">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e84393]/10 to-[#fd79a8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#e84393]/5 to-[#fd79a8]/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#e84393]/20 to-[#fd79a8]/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e84393]/20 to-[#fd79a8]/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="flex items-center mb-6 relative z-10">
              <span className="text-5xl mr-4" role="img" aria-label={isEn ? "Shield" : "Bouclier"}>🛡️</span>
              <div>
                <h3 className="text-2xl font-bold text-gradient mb-2">
                  {isEn ? 'Security & Quality' : 'Sécurité & Qualité'}
                </h3>
              </div>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                OWASP Top 10
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                JWT & SSO
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                {isEn ? 'TDD & Auto Tests' : 'TDD & Tests Auto'}
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                {isEn ? 'Encryption & SSL' : 'Chiffrement & SSL'}
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                Code Review (PR)
              </span>
              <span className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/25 hover:border-[#e84393] flex items-center gap-2">
                Clean Architecture
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
