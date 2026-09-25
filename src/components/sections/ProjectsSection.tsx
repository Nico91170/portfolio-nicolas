import React, { useState } from 'react';
import ProjectCard from '../ProjectCard';
import type { Project } from '../../types/portfolio';
import { useLanguage } from '../../context/LanguageContext';

interface ProjectsSectionProps {
  sectionRef?: (el: HTMLElement | null) => void;
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  sectionRef,
  projects,
  onProjectClick,
}) => {
  const { t, language } = useLanguage();
  const isEn = language === 'en';
  const [activeCategory, setActiveCategory] = useState('all');

  const filterCategories = [
    { id: 'all', label: isEn ? 'All' : 'Tous' },
    { id: 'web', label: 'Web Full-Stack' },
    { id: 'api', label: isEn ? 'Back-End & API' : 'Back-End & API' },
    { id: 'mobile', label: isEn ? 'Mobile & Games' : 'Mobile & Jeux' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projets" className="py-20" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-gradient">{t.projects.title}</h2>
          <div className="w-28 h-1.5 bg-gradient-to-r from-[#e84393] via-[#fd79a8] to-[#b2bec3] mx-auto rounded-full shadow-lg shadow-[#e84393]/20 mb-6"></div>
          <p className="text-[#b2bec3] text-lg max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8" role="tablist" aria-label={t.projects.ariaFilter}>
            {filterCategories.map((cat) => {
              const count = cat.id === 'all'
                ? projects.length
                : projects.filter((p) => p.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#e84393] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#e84393] via-[#fd79a8] to-[#e84393] text-white shadow-lg shadow-[#e84393]/35 scale-105'
                      : 'bg-[#2d3436]/90 text-[#b2bec3] hover:text-white hover:bg-[#2d3436] border border-[#b2bec3]/20 hover:border-[#e84393]/50'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white font-bold'
                        : 'bg-[#1e2324] text-[#b2bec3]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id || index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <ProjectCard
                {...project}
                onClick={() => onProjectClick(project)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
