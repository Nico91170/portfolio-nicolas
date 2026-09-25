import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectCardProps {
  title: string;
  description: string;
  mediaUrl: string; // Peut être une image ou une vidéo
  mediaType: 'image' | 'video';
  technologies: { name: string; icon: string }[];
  codeLink?: string;
  demoLink?: string;
  statusBadge?: string;
  metrics?: string[];
  category?: string;
  onClick: () => void; // Pour ouvrir le carrousel/modale
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  mediaUrl,
  mediaType,
  technologies,
  codeLink,
  demoLink,
  statusBadge,
  metrics,
  onClick,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -6);
    setRotateY(((x - centerX) / centerX) * 6);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl group relative overflow-hidden cursor-pointer border border-[#b2bec3]/20 hover:border-[#e84393]/60"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Dynamic Cursor Spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(232, 67, 147, 0.18), transparent 80%)`,
          }}
        />
      )}

      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#e84393]/20 to-[#fd79a8]/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg border border-[#b2bec3]/20 group-hover:border-[#e84393]/50 transition-colors duration-300 bg-[#1e2324]/50">
          {statusBadge && (
            <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-[#2d3436]/90 backdrop-blur-md border border-[#e84393]/50 text-[#fd79a8] rounded-full text-xs font-bold shadow-lg shadow-black/40">
              {statusBadge}
            </div>
          )}
          {mediaType === 'image' ? (
            <img
              src={mediaUrl}
              alt={title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <video
              src={mediaUrl}
              title={title}
              loop
              muted
              autoPlay
              playsInline
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg font-bold flex items-center gap-2">
              <span>{isEn ? 'View Details' : 'Voir les détails'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e84393]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>

        <h3 className="text-3xl font-extrabold text-gradient mb-3 group-hover:text-[#fd79a8] transition-colors duration-300">{title}</h3>
        <p className="text-[#dfe6e9] mb-4 flex-grow text-lg">
          {description}
        </p>
        {metrics && metrics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {metrics.map((metric, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 bg-[#e84393]/10 text-[#fd79a8] border border-[#e84393]/25 rounded-md text-xs font-semibold"
              >
                ✦ {metric}
              </span>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span
              key={tech.name}
              className="px-4 py-2 bg-[#2d3436]/90 text-[#b2bec3] rounded-full text-sm font-medium hover:bg-[#2d3436] hover:scale-105 transition-all duration-300 cursor-pointer hover:text-[#e84393] border border-[#b2bec3]/20 hover:border-[#e84393]/40 flex items-center gap-2"
            >
              {tech.icon && <img src={tech.icon} alt={tech.name} className="w-5 h-5" />}
              {tech.name}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-[#b2bec3]/20">
          {codeLink && codeLink !== '#' ? (
            <a href={codeLink} className="flex items-center text-[#e84393] hover:text-[#fd79a8] transition-colors duration-300 group/link font-semibold" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <span className="mr-2 group-hover/link:animate-pulse">Code</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e84393] group-hover/link:text-[#fd79a8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-4m0 0l4-4m-4 4L10 4m4 16h6M4 4h6V3a1 1 0 011-1h2a1 1 0 011 1v1h6" />
              </svg>
            </a>
          ) : (
            <span className="text-xs text-[#b2bec3]/60 italic">{isEn ? 'Source code on request' : 'Code source sur demande'}</span>
          )}
          {demoLink && demoLink !== '#' && (
            <a href={demoLink} className="flex items-center text-[#fd79a8] hover:text-white transition-colors duration-300 group/link font-semibold" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <span className="mr-2 group-hover/link:animate-pulse">{isEn ? 'Demo' : 'Démo'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#fd79a8] group-hover/link:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l4 4m0 0l4-4m-4 4V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v1h-7v7l4-4m0 0l4 4m-4-4L10 4m4 16h6M4 4h6V3a1 1 0 011-1h2a1 1 0 011 1v1h6" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 