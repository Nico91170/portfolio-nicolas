import React, { useState } from 'react';
import Modal from 'react-modal';

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
            <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-3xl font-bold text-gradient">{project.title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Carrousel */}
                    <div className="relative mb-8">
                        <div className="relative w-full h-96 rounded-lg overflow-hidden">
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
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextMedia}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                        {allMedia[currentMediaIndex].caption && (
                            <p className="text-center text-gray-400 mt-2">{allMedia[currentMediaIndex].caption}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
                        <p className="text-gray-300">{project.description}</p>
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4">Technologies utilisées</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech.name}
                                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm font-medium flex items-center gap-2"
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
                            <h3 className="text-xl font-semibold text-white mb-4">Défis et Solutions</h3>
                            {project.challenges && (
                                <div className="mb-6">
                                    <h4 className="text-lg font-medium text-red-400 mb-2">Défis</h4>
                                    <ul className="space-y-4">
                                        {project.challenges.map((challenge, index) => (
                                            <li key={index} className="bg-gray-800/50 p-4 rounded-lg">
                                                <h5 className="text-white font-medium mb-2">{challenge.title}</h5>
                                                <p className="text-gray-300">{challenge.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {project.solutions && (
                                <div>
                                    <h4 className="text-lg font-medium text-green-400 mb-2">Solutions</h4>
                                    <ul className="space-y-4">
                                        {project.solutions.map((solution, index) => (
                                            <li key={index} className="bg-gray-800/50 p-4 rounded-lg">
                                                <h5 className="text-white font-medium mb-2">{solution.title}</h5>
                                                <p className="text-gray-300">{solution.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Liens */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                        {project.codeLink && (
                            <a
                                href={project.codeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
                            >
                                <span className="mr-2">Voir le code</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-4m0 0l4-4m-4 4L10 4m4 16h6M4 4h6V3a1 1 0 011-1h2a1 1 0 011 1v1h6" />
                                </svg>
                            </a>
                        )}
                        {project.demoLink && (
                            <a
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300"
                            >
                                <span className="mr-2">Voir la démo</span>
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