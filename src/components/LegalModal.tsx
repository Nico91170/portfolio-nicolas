import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useLanguage } from '../context/LanguageContext';

export interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'legal' | 'privacy';
}

const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'legal'
}) => {
  const [activeTab, setActiveTab] = useState<'legal' | 'privacy'>(initialTab);
  const { language } = useLanguage();
  const isEn = language === 'en';

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      overlayClassName="fixed inset-0 z-50"
    >
      <div className="bg-[#2d3436] border border-[#b2bec3]/20 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header de la modale */}
        <div className="p-6 border-b border-[#b2bec3]/20 flex items-center justify-between bg-[#1e2324]/90">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setActiveTab('legal')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeTab === 'legal'
                  ? 'bg-gradient-to-r from-[#e84393] to-[#fd79a8] text-white shadow-lg shadow-[#e84393]/25'
                  : 'text-[#b2bec3] hover:text-white hover:bg-[#1e2324]'
              }`}
            >
              {isEn ? 'Legal Notice' : 'Mentions Légales'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeTab === 'privacy'
                  ? 'bg-gradient-to-r from-[#e84393] to-[#fd79a8] text-white shadow-lg shadow-[#e84393]/25'
                  : 'text-[#b2bec3] hover:text-white hover:bg-[#1e2324]'
              }`}
            >
              {isEn ? 'Privacy & GDPR' : 'Confidentialité & RGPD'}
            </button>
          </div>

          <button
            onClick={onClose}
            type="button"
            aria-label={isEn ? 'Close' : 'Fermer'}
            className="text-[#b2bec3] hover:text-white p-2 rounded-lg hover:bg-[#1e2324] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenu textuel défilable */}
        <div className="p-6 sm:p-8 overflow-y-auto text-[#dfe6e9] space-y-6 text-sm sm:text-base leading-relaxed">
          {activeTab === 'legal' ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gradient mb-2">
                  {isEn ? '1. Site Publisher' : '1. Éditeur du Site'}
                </h3>
                <p>
                  {isEn ? (
                    <>
                      This portfolio website accessible at{' '}
                      <span className="text-[#fd79a8] font-mono">https://portfolio-nicolas-lyart.vercel.app/</span>{' '}
                      is published by:
                    </>
                  ) : (
                    <>
                      Le présent site portfolio accessible à l'adresse{' '}
                      <span className="text-[#fd79a8] font-mono">https://portfolio-nicolas-lyart.vercel.app/</span>{' '}
                      est édité par :
                    </>
                  )}
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-[#dfe6e9]">
                  <li>
                    <strong>{isEn ? 'Full Name:' : 'Nom & Prénom :'}</strong> Nicolas Pires De Jesus
                  </li>
                  <li>
                    <strong>{isEn ? 'Status:' : 'Statut :'}</strong> {isEn ? 'Web & Software Developer' : 'Développeur Web & Logiciel'}
                  </li>
                  <li>
                    <strong>{isEn ? 'Contact:' : 'Contact :'}</strong>{' '}
                    {isEn
                      ? 'Reachable via the secure contact form on this website'
                      : 'Accessible via le formulaire de contact sécurisé du site'}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gradient mb-2">
                  {isEn ? '2. Hosting' : '2. Hébergement'}
                </h3>
                <p>
                  {isEn ? (
                    <>The website is hosted by <strong>Vercel Inc.</strong>:</>
                  ) : (
                    <>Le site est hébergé par la société <strong>Vercel Inc.</strong> :</>
                  )}
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-[#dfe6e9]">
                  <li><strong>{isEn ? 'Company:' : 'Société :'}</strong> Vercel Inc.</li>
                  <li><strong>{isEn ? 'Address:' : 'Adresse :'}</strong> 440 N Barranca Ave #4133, Covina, CA 91723, {isEn ? 'United States' : 'États-Unis'}</li>
                  <li>
                    <strong>{isEn ? 'Website:' : 'Site Web :'}</strong>{' '}
                    <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[#e84393] underline hover:text-[#fd79a8]">https://vercel.com</a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gradient mb-2">
                  {isEn ? '3. Intellectual Property' : '3. Propriété Intellectuelle'}
                </h3>
                <p>
                  {isEn
                    ? 'All content on this site (texts, graphics, images, source code, logos, videos, and general structure) is protected by international copyright and intellectual property laws.'
                    : 'L\'ensemble des contenus présents sur ce site (textes, graphismes, images, code source, logos, vidéos, structure générale) est protégé par les lois françaises et internationales relatives au droit d\'auteur et à la propriété intellectuelle.'}
                </p>
                <p className="mt-2">
                  {isEn
                    ? 'Any reproduction, representation, modification or distribution, in whole or in part, without prior express authorization from Nicolas Pires De Jesus, is strictly prohibited.'
                    : 'Toute reproduction, représentation, modification ou diffusion, totale ou partielle, de l\'un quelconque de ces éléments, sans l\'autorisation expresse et préalable de Nicolas Pires De Jesus, est strictement interdite.'}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gradient mb-2">
                  {isEn ? '4. External Hyperlinks' : '4. Liens Hypertextes'}
                </h3>
                <p>
                  {isEn
                    ? 'The site may contain links to external third-party platforms (LinkedIn, GitHub, etc.). The publisher exercises no control over external platforms and declines all responsibility regarding their content or privacy practices.'
                    : 'Le site peut contenir des liens vers des sites tiers (LinkedIn, GitHub, etc.). L\'éditeur n\'exerce aucun contrôle sur le contenu de ces sites externes et décline toute responsabilité quant à leurs pratiques ou contenus.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gradient mb-2">
                  {isEn ? '1. Data Controller' : '1. Responsable du Traitement'}
                </h3>
                <p>
                  {isEn ? (
                    <>The data controller for personal data collected on this portfolio is <strong>Nicolas Pires De Jesus</strong>.</>
                  ) : (
                    <>Le responsable du traitement des données personnelles collectées sur ce portfolio est <strong>Nicolas Pires De Jesus</strong>.</>
                  )}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gradient mb-2">
                  {isEn ? '2. Collected Data & Purpose' : '2. Données Collectées & Finalité'}
                </h3>
                <p>
                  {isEn
                    ? 'This site only collects personal data through its contact form:'
                    : 'Ce site ne collecte des données personnelles que via son formulaire de contact :'}
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-[#dfe6e9]">
                  <li>
                    <strong>{isEn ? 'Collected details:' : 'Données recueillies :'}</strong>{' '}
                    {isEn ? 'Name, email address, message subject, message content.' : 'Nom, adresse e-mail, sujet du message, texte du message.'}
                  </li>
                  <li>
                    <strong>{isEn ? 'Purpose:' : 'Finalité :'}</strong>{' '}
                    {isEn
                      ? 'Process your inquiry and reply regarding professional recruitment, projects or questions.'
                      : 'Traiter votre message et vous répondre dans le cadre de sollicitations professionnelles, opportunités de projets ou questions.'}
                  </li>
                  <li>
                    <strong>{isEn ? 'Legal basis:' : 'Base légale :'}</strong>{' '}
                    {isEn
                      ? 'User explicit consent (Article 6.1.a of the General Data Protection Regulation - GDPR).'
                      : 'Consentement explicite de l\'utilisateur (Article 6.1.a du Règlement Général sur la Protection des Données - RGPD).'}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gradient mb-2">
                  {isEn ? '3. Retention & Confidentiality' : '3. Durée de Conservation & Destinataires'}
                </h3>
                <p>
                  {isEn ? (
                    <>
                      Collected data is retained for a maximum of <strong>1 year</strong> after the last exchange, unless required by legal archival obligations.
                    </>
                  ) : (
                    <>
                      Les informations recueillies sont conservées pour une durée maximale de <strong>1 an</strong> à compter du dernier échange, sauf obligation légale ou archivage nécessaire.
                    </>
                  )}
                </p>
                <p className="mt-2">
                  {isEn ? (
                    <>This data is strictly confidential and is <strong>never sold, rented, or transferred</strong> to third parties.</>
                  ) : (
                    <>Ces données sont strictement confidentielles et ne sont <strong>ni vendues, ni louées, ni cédées</strong> à des tiers.</>
                  )}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gradient mb-2">
                  {isEn ? '4. Data Security' : '4. Sécurité des Données'}
                </h3>
                <p>
                  {isEn
                    ? 'The site enforces strong technical safeguards: HTTPS with HSTS, isolated serverless API handlers, anti-spam honeypot mechanism, sanitization/validation of inputs, and Content Security Policy (CSP).'
                    : 'Le site applique des mesures de sécurité techniques avancées : protocole HTTPS obligatoire avec HSTS, fonction API serverless isolée, protection anti-spam honeypot, validation des entrées et politique de sécurité du contenu (CSP).'}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gradient mb-2">
                  {isEn
                    ? '5. Cookie Policy & Audience Analytics (Zero-Cookie)'
                    : '5. Politique relative aux Cookies & Mesure d\'Audience (Zero-Cookie)'}
                </h3>
                <p>
                  {isEn
                    ? 'In strict compliance with European privacy standards (GDPR / ePrivacy) and CNIL recommendations, this portfolio uses a zero-cookie approach:'
                    : 'Conformément aux recommandations et délibérations de la CNIL, ce portfolio applique une politique stricte de respect de la vie privée :'}
                </p>
                <div className="mt-3 bg-[#1e2324]/70 p-4 rounded-xl border border-[#b2bec3]/20 space-y-2 text-sm leading-relaxed">
                  <p>
                    🌱 <strong>{isEn ? 'Zero-Cookie Architecture:' : 'Modèle Zero-Cookie :'}</strong>{' '}
                    {isEn
                      ? 'No advertising cookies, commercial trackers, or persistent identifiers are placed on your browser.'
                      : 'Aucun cookie publicitaire, traceur commercial ou identifiant persistant n\'est déposé sur votre terminal.'}
                  </p>
                  <p>
                    📊 <strong>{isEn ? 'Privacy-Friendly Analytics (Vercel Web Analytics):' : 'Mesure d\'audience respectueuse (Vercel Web Analytics) :'}</strong>{' '}
                    {isEn
                      ? 'The website uses Vercel Web Analytics without cookies and without precise geolocation. Data (page visits, device type, country) is anonymized and used solely for technical aggregate metrics.'
                      : 'Le site utilise la solution Vercel Web Analytics, configurée sans cookies et sans géolocalisation fine. Les données collectées (pages consultées, type d\'appareil, pays) sont strictement anonymisées et servent uniquement à des statistiques techniques d\'audience globale.'}
                  </p>
                  <p className="text-xs text-[#fd79a8] font-semibold">
                    {isEn
                      ? '✓ Fully exempt from prior consent requirements (no intrusive cookie banners required).'
                      : '✓ Conforme à l\'exemption de consentement préalable selon les lignes directrices de la CNIL (aucun bandeau intrusif requis).'}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gradient mb-2">
                  {isEn ? '6. Your Rights' : '6. Vos Droits (Accès, Rectification, Suppression)'}
                </h3>
                <p>
                  {isEn
                    ? 'Under the GDPR, you have the right to access, rectify, delete, restrict, and export your personal information.'
                    : 'Conformément au RGPD et à la loi « Informatique et Libertés », vous disposez d\'un droit d\'accès, de rectification, de suppression, de limitation et de portabilité de vos données personnelles.'}
                </p>
                <p className="mt-2">
                  {isEn ? (
                    <>
                      To exercise these rights, please contact me through the contact form. You also have the right to lodge a complaint with your supervisory authority (such as the CNIL at{' '}
                      <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#e84393] underline hover:text-[#fd79a8]">www.cnil.fr</a>).
                    </>
                  ) : (
                    <>
                      Pour exercer ces droits, vous pouvez me contacter directement via le formulaire de contact. Vous disposez également du droit d'introduire une réclamation auprès de la CNIL ({' '}
                      <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#e84393] underline hover:text-[#fd79a8]">www.cnil.fr</a>).
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer de la modale */}
        <div className="p-4 border-t border-[#b2bec3]/20 bg-[#1e2324]/90 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-[#2d3436] hover:bg-[#1e2324] text-[#dfe6e9] hover:text-white border border-[#b2bec3]/20 rounded-lg font-medium transition-colors"
          >
            {isEn ? 'Close' : 'Fermer'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LegalModal;
