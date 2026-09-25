import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface CertificationCardProps {
    title: string;
    issuer: string;
    date: string;
    pdfUrl: string;
    onClick: () => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
    title,
    issuer,
    date,
    pdfUrl,
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
                <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg border border-[#b2bec3]/20 group-hover:border-[#e84393]/50 transition-colors duration-300 flex items-center justify-center bg-[#1e2324]/60">
                    <img
                        src="/certifications/pdf-icon.svg"
                        alt={isEn ? "PDF Certification icon" : "Icône Certification PDF"}
                        width={96}
                        height={96}
                        loading="lazy"
                        decoding="async"
                        className="w-24 h-24 object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                    />
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
                <p className="text-[#dfe6e9] mb-2 text-lg">
                    <span className="font-semibold text-white">{isEn ? 'Issuer:' : 'Émetteur :'}</span> {issuer}
                </p>
                <p className="text-[#b2bec3] text-sm flex-grow">
                    <span className="font-semibold text-[#dfe6e9]">{isEn ? 'Issued on:' : 'Certifié le :'}</span> {date}
                </p>
                <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#e84393] to-[#fd79a8] text-white font-bold rounded-full text-base hover:from-[#d63384] hover:to-[#e84393] transition-all duration-300 transform hover:scale-105 self-start shadow-md shadow-[#e84393]/30 focus:outline-none focus:ring-2 focus:ring-[#e84393]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <span>{isEn ? 'View PDF' : 'Voir le PDF'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default CertificationCard; 