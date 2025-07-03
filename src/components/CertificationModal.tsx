import React from 'react';
import Modal from 'react-modal';

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
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
            overlayClassName="fixed inset-0 z-50"
        >
            <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-3xl font-bold text-gradient">{certification.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mb-8">
                    <p className="text-gray-200 text-lg mb-2"><span className="font-semibold">Émetteur :</span> {certification.issuer}</p>
                    <p className="text-gray-400 text-sm mb-4"><span className="font-semibold">Certifié le :</span> {certification.date}</p>

                    <div className="relative w-full h-96 rounded-lg overflow-hidden border border-gray-700/50">
                        {/* Pour afficher le PDF, vous pouvez utiliser un iframe ou un lien direct */}
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
                        className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-full text-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                    >
                        Télécharger la certification
                    </a>
                </div>
            </div>
        </Modal>
    );
};

export default CertificationModal; 