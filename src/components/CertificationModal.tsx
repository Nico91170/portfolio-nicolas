import React from 'react';
import Modal from 'react-modal';
import { useLanguage } from '../context/LanguageContext';

interface CertificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    certification: {
        title: string;
        issuer: string;
        date: string;
        pdfUrl: string;
    };
}

const CertificationModal: React.FC<CertificationModalProps> = ({ isOpen, onClose, certification }) => {
    const { language } = useLanguage();
    const isEn = language === 'en';

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
            overlayClassName="fixed inset-0 z-50"
        >
            <div className="bg-[#2d3436] border border-[#b2bec3]/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-3xl font-bold text-gradient">{certification.title}</h2>
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

                <div className="mb-8">
                    <p className="text-[#dfe6e9] text-lg mb-2"><span className="font-semibold text-white">{isEn ? 'Issuer:' : 'Émetteur :'}</span> {certification.issuer}</p>
                    <p className="text-[#b2bec3] text-sm mb-4"><span className="font-semibold text-[#dfe6e9]">{isEn ? 'Issued on:' : 'Certifié le :'}</span> {certification.date}</p>

                    <div className="relative w-full h-96 rounded-xl overflow-hidden border border-[#b2bec3]/20 bg-[#1e2324]">
                        <iframe
                            src={certification.pdfUrl}
                            title={certification.title}
                            className="w-full h-full object-contain"
                            style={{ border: 'none' }}
                        ></iframe>
                    </div>
                </div>

                <div className="flex justify-center">
                    <a
                        href={certification.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block px-8 py-3 bg-[#e84393] text-white font-bold rounded-full text-lg hover:bg-[#d63384] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#e84393]/30"
                    >
                        {isEn ? 'Download Certificate' : 'Télécharger la certification'}
                    </a>
                </div>
            </div>
        </Modal>
    );
};

export default CertificationModal; 