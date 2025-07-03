import React from 'react';

interface CertificationCardProps {
    title: string;
    issuer: string;
    date: string;
    pdfUrl: string;
    onClick: () => void; // Pour ouvrir la modale
}

const CertificationCard: React.FC<CertificationCardProps> = ({
    title,
    issuer,
    date,
    pdfUrl,
    onClick,
}) => {
    return (
        <div
            className="glass-effect p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift group relative overflow-hidden card-3d transform hover:scale-[1.02] border border-transparent hover:border-blue-500/50 cursor-pointer"
            onClick={onClick}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg border border-gray-700/50 group-hover:border-blue-400/50 transition-colors duration-300 flex items-center justify-center">
                    <img
                        src="/certifications/pdf-icon.png" // Une icône de PDF générique, vous pouvez la remplacer
                        alt="PDF Icon"
                        className="w-24 h-24 object-contain transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg font-bold">Voir les détails</span>
                    </div>
                </div>

                <h3 className="text-3xl font-extrabold text-gradient mb-3 group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>
                <p className="text-gray-200 mb-2 text-lg">
                    <span className="font-semibold">Émetteur :</span> {issuer}
                </p>
                <p className="text-gray-400 text-sm flex-grow">
                    <span className="font-semibold">Certifié le :</span> {date}
                </p>
                <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-full text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 self-start"
                    onClick={(e) => e.stopPropagation()} // Empêche le clic sur la carte de déclencher deux fois
                >
                    Voir le PDF
                </a>
            </div>
        </div>
    );
};

export default CertificationCard; 