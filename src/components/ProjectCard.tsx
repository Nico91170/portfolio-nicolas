import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  mediaUrl: string; // Peut être une image ou une vidéo
  mediaType: 'image' | 'video';
  technologies: { name: string; icon: string }[];
  codeLink?: string;
  demoLink?: string;
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
  onClick,
}) => {
  return (
    <div
      className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-transparent hover:border-green-500/50 cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg border border-gray-700/50 group-hover:border-green-400/50 transition-colors duration-300">
          {mediaType === 'image' ? (
            <img
              src={mediaUrl}
              alt={title}
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
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg font-bold">Voir les détails</span>
          </div>
        </div>

        <h3 className="text-3xl font-extrabold text-gradient mb-3 group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>
        <p className="text-gray-200 mb-4 flex-grow text-lg">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span
              key={tech.name}
              className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer hover:text-green-400 border border-gray-600/30 hover:border-green-500/30 flex items-center gap-2"
            >
              {tech.icon && <img src={tech.icon} alt={tech.name} className="w-5 h-5" />}
              {tech.name}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700/50">
          {codeLink && (
            <a href={codeLink} className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 group/link" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <span className="mr-2 group-hover/link:animate-pulse">Code</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 group-hover/link:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-4m0 0l4-4m-4 4L10 4m4 16h6M4 4h6V3a1 1 0 011-1h2a1 1 0 011 1v1h6" />
              </svg>
            </a>
          )}
          {demoLink && (
            <a href={demoLink} className="flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300 group/link" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <span className="mr-2 group-hover/link:animate-pulse">Démo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400 group-hover/link:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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