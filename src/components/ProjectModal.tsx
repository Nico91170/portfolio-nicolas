import React, { useState } from 'react';
import Modal from 'react-modal';
import { useLanguage } from '../context/LanguageContext';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        description: string;
        mediaUrl: string;
        mediaType: 'image' | 'video';
        technologies: { name: string; icon: string }[];
        codeLink?: string;
        demoLink?: string;
        additionalMedia?: { url: string; type: 'image' | 'video'; caption?: string }[];
        challenges?: { title: string; description: string }[];
        solutions?: { title: string; description: string }[];
    };
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
    const { language } = useLanguage();
    const isEn = language === 'en';
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const allMedia = [
        { url: project.mediaUrl, type: project.mediaType },
        ...(project.additionalMedia || [])
    ];

    const nextMedia = () => {
        setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length);
    };

    const prevMedia = () => {
        setCurrentMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
            overlayClassName="fixed inset-0 z-50"
        >
            <div className="bg-[#2d3436] border border-[#b2bec3]/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-3xl font-bold text-gradient">{project.title}</h2>
                        <button
                            onClick={onClose}
                            aria-label={isEn ? 'Close modal' : 'Fermer la modale'}
                            className="text-[#b2bec3] hover:text-white p-2 rounded-lg hover:bg-[#1e2324] transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Carrousel */}
                    <div className="relative mb-8">
                        <div className="relative w-full h-96 rounded-xl overflow-hidden border border-[#b2bec3]/20 bg-[#1e2324]">
                            {allMedia[currentMediaIndex].type === 'image' ? (
                                <img
                                    src={allMedia[currentMediaIndex].url}
                                    alt={`${project.title} - Image ${currentMediaIndex + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <video
                                    src={allMedia[currentMediaIndex].url}
                                    controls
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        {allMedia.length > 1 && (
                            <>
                                <button
                                    onClick={prevMedia}
                                    aria-label={isEn ? 'Previous media' : 'Média précédent'}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-[#e84393] transition-colors duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextMedia}
                                    aria-label={isEn ? 'Next media' : 'Média suivant'}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-[#e84393] transition-colors duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                        {allMedia[currentMediaIndex].caption && (
                            <p className="text-center text-[#b2bec3] mt-2 text-sm">{allMedia[currentMediaIndex].caption}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4">{isEn ? 'Description' : 'Description'}</h3>
                        <p className="text-[#dfe6e9] leading-relaxed">{project.description}</p>
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4">{isEn ? 'Technologies Used' : 'Technologies utilisées'}</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech.name}
                                    className="px-4 py-2 bg-[#1e2324]/80 text-[#b2bec3] rounded-full text-sm font-medium flex items-center gap-2 border border-[#b2bec3]/20"
                                >
                                    {tech.icon && <img src={tech.icon} alt={tech.name} className="w-5 h-5" />}
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Défis et Solutions */}
                    {(project.challenges || project.solutions) && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-white mb-4">{isEn ? 'Challenges & Solutions' : 'Défis et Solutions'}</h3>
                            {project.challenges && (
                                <div className="mb-6">
                                    <h4 className="text-lg font-medium text-[#e84393] mb-2">{isEn ? 'Challenges' : 'Défis'}</h4>
                                    <ul className="space-y-4">
                                        {project.challenges.map((challenge, index) => (
                                            <li key={index} className="bg-[#1e2324]/70 border border-[#b2bec3]/10 p-4 rounded-lg">
                                                <h5 className="text-white font-medium mb-2">{challenge.title}</h5>
                                                <p className="text-[#dfe6e9]">{challenge.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {project.solutions && (
                                <div>
                                    <h4 className="text-lg font-medium text-[#fd79a8] mb-2">{isEn ? 'Solutions' : 'Solutions'}</h4>
                                    <ul className="space-y-4">
                                        {project.solutions.map((solution, index) => (
                                            <li key={index} className="bg-[#1e2324]/70 border border-[#b2bec3]/10 p-4 rounded-lg">
                                                <h5 className="text-white font-medium mb-2">{solution.title}</h5>
                                                <p className="text-[#dfe6e9]">{solution.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Liens */}
                    <div className="flex justify-between items-center pt-4 border-t border-[#b2bec3]/20">
                        {project.codeLink && project.codeLink !== '#' ? (
                            <a
                                href={project.codeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-[#e84393] hover:text-[#fd79a8] font-semibold transition-colors duration-300"
                            >
                                <span className="mr-2">{isEn ? 'View Code' : 'Voir le code'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-4m0 0l4-4m-4 4L10 4m4 16h6M4 4h6V3a1 1 0 011-1h2a1 1 0 011 1v1h6" />
                                </svg>
                            </a>
                        ) : (
                            <span className="text-sm text-[#b2bec3]/60 italic">{isEn ? 'Source code on request' : 'Code disponible sur demande'}</span>
                        )}
                        {project.demoLink && project.demoLink !== '#' && (
                            <a
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-[#fd79a8] hover:text-white font-semibold transition-colors duration-300"
                            >
                                <span className="mr-2">{isEn ? 'Live Demo' : 'Voir la démo'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l4 4m0 0l4-4m-4 4V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v1h-7v7l4-4m0 0l4 4m-4-4L10 4m4 16h6M4 4h6V3a1 1 0 011-1h2a1 1 0 011 1v1h6" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProjectModal; 