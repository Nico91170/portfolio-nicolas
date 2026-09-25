import React, { useState } from 'react';
import CopyEmailButton from '../CopyEmailButton';
import { useLanguage } from '../../context/LanguageContext';

interface ContactReason {
  id: string;
  icon: string;
  label: string;
  subject: string;
  template: string;
}

const getContactReasons = (language: 'fr' | 'en'): ContactReason[] => {
  if (language === 'en') {
    return [
      {
        id: 'alternance',
        icon: '💼',
        label: 'Apprenticeship Opportunity',
        subject: 'Apprenticeship Proposal - Full-Stack Developer',
        template: "Hello Nicolas,\n\nWe reviewed your portfolio and your profile matches our search for a Full-Stack Developer apprentice.\n\nWould you be available for an initial call?\n\nBest regards,\n",
      },
      {
        id: 'projet',
        icon: '🚀',
        label: 'Web or Software Project',
        subject: 'Collaboration inquiry on a web project',
        template: "Hello Nicolas,\n\nI have a development project and would like to discuss your availability and technical skills.\n\nLooking forward to speaking with you,\n",
      },
      {
        id: 'echange',
        icon: '☕',
        label: 'Technical Discussion & Networking',
        subject: 'Technical Exchange & Networking',
        template: "Hello Nicolas,\n\nCongratulations on your portfolio work! I would love to connect with you regarding...\n\nBest,\n",
      },
      {
        id: 'autre',
        icon: '💬',
        label: 'Other Request',
        subject: 'General inquiry',
        template: "Hello Nicolas,\n\nI am contacting you regarding...\n\nBest regards,\n",
      },
    ];
  }

  return [
    {
      id: 'alternance',
      icon: '💼',
      label: "Opportunité d'alternance",
      subject: "Proposition d'alternance - Développeur Full-Stack",
      template: "Bonjour Nicolas,\n\nNous avons consulté votre portfolio et votre profil correspond à notre recherche d'alternant Développeur Full-Stack.\n\nSeriez-vous disponible pour un premier échange ?\n\nBien cordialement,\n",
    },
    {
      id: 'projet',
      icon: '🚀',
      label: 'Projet web ou logiciel',
      subject: 'Demande de collaboration sur un projet web',
      template: "Bonjour Nicolas,\n\nJ'ai un projet de développement et j'aimerais échanger avec vous sur vos disponibilités et vos compétences techniques.\n\nAu plaisir d'en discuter,\n",
    },
    {
      id: 'echange',
      icon: '☕',
      label: 'Échange technique & Réseau',
      subject: 'Échange technique & Networking',
      template: "Bonjour Nicolas,\n\nFélicitations pour vos réalisations sur votre portfolio ! J'aimerais échanger avec vous au sujet de...\n\nÀ bientôt,\n",
    },
    {
      id: 'autre',
      icon: '💬',
      label: 'Autre demande',
      subject: 'Prise de contact',
      template: "Bonjour Nicolas,\n\nJe vous contacte au sujet de...\n\nBien cordialement,\n",
    },
  ];
};

interface ContactSectionProps {
  sectionRef: (el: HTMLElement | null) => void;
  email: string;
  onEmailCopied?: (email: string) => void;
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    consent: boolean;
    _hp_company: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  onOpenPrivacy: () => void;
  onSelectReason?: (subject: string, template: string) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  sectionRef,
  email,
  onEmailCopied,
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  onOpenPrivacy,
  onSelectReason,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const contactReasons = getContactReasons(language);
  const [selectedReasonId, setSelectedReasonId] = useState<string | null>(null);

  const handleReasonClick = (reason: ContactReason) => {
    setSelectedReasonId(reason.id);
    if (onSelectReason) {
      onSelectReason(reason.subject, reason.template);
    }
  };

  const handleDownloadVCard = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Pires De Jesus;Nicolas;;;',
      'FN:Nicolas Pires De Jesus',
      `TITLE:${isEn ? 'Full-Stack Developer' : 'Développeur Full-Stack'}`,
      'EMAIL;TYPE=INTERNET,WORK:nicolas.piresdejesus91170@gmail.com',
      'URL:https://portfolio-nicolas-lyart.vercel.app/',
      'URL;TYPE=LinkedIn:https://www.linkedin.com/in/nicolas-pires-de-jesus/',
      'URL;TYPE=GitHub:https://github.com/Nico91170',
      `NOTE:${isEn ? 'Passionate Full-Stack Developer (React, Next.js, Node.js, Cybersecurity)' : 'Développeur Full-Stack passionné (React, Next.js, Node.js, Cybersécurité)'}`,
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Nicolas_Pires_De_Jesus.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center py-20 opacity-0 section-transition section-cover"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto glass-effect p-8 rounded-2xl shadow-xl border border-[#b2bec3]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e84393]/10 to-[#fd79a8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#e84393]/5 to-[#fd79a8]/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
          <div className="relative z-10">
            <h2 className="text-5xl font-bold text-gradient text-center mb-4 animate-slide-in-up">
              {isEn ? 'Contact Me' : 'Me Contacter'}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#e84393] via-[#fd79a8] to-[#b2bec3] mx-auto rounded-full shadow-lg shadow-[#e84393]/20 mb-6"></div>
            <p className="text-[#dfe6e9] text-lg text-center mb-6 animate-fade-in animation-delay-300">
              {isEn
                ? "An apprenticeship opportunity, a web project, or a technical inquiry? Let's connect!"
                : "Une opportunité d'alternance, un projet web ou une question ? Échangeons ensemble !"}
            </p>

            {/* Badges de Réassurance Recruteur */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-xs text-[#b2bec3] animate-fade-in animation-delay-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e2324]/80 border border-[#b2bec3]/20">
                <span className="text-emerald-400">⚡</span> {isEn ? 'Quick reply guaranteed within 24h' : 'Réponse rapide garantie sous 24h'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e2324]/80 border border-[#b2bec3]/20">
                <span className="text-[#e84393]">📍</span> {isEn ? 'Paris / Greater Region & Remote' : 'Paris / Île-de-France & Télétravail'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e2324]/80 border border-[#b2bec3]/20">
                <span className="text-[#fd79a8]">🎓</span> {isEn ? 'Apprenticeship Bachelor DAWI' : 'Alternance Licence Pro DAWI'}
              </span>
            </div>

            {/* Actions rapides : Copier Email & Télécharger VCard */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10 animate-fade-in animation-delay-500">
              <CopyEmailButton email={email} onCopySuccess={onEmailCopied} />
              <button
                type="button"
                onClick={handleDownloadVCard}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2d3436]/90 hover:bg-[#2d3436] text-[#b2bec3] hover:text-white border border-[#b2bec3]/25 hover:border-[#e84393] transition-all duration-300 text-sm font-semibold shadow-md shadow-black/20 hover:shadow-[#e84393]/20 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#e84393]"
                title={isEn ? 'Save contact card to your phone or address book' : "Enregistrer la fiche contact sur votre téléphone ou carnet d'adresses"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#e84393]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                <span>{isEn ? 'Add to my contacts (.vcf)' : 'Ajouter à mes contacts (.vcf)'}</span>
              </button>
            </div>

            {/* Sélecteur de motif rapide (Recruiter Quick Chooser) */}
            <div className="mb-6 animate-fade-in animation-delay-600">
              <label className="block text-[#dfe6e9] text-sm font-bold mb-3">
                {isEn ? 'Select the purpose of your inquiry (pre-fills message):' : "Sélectionnez l'objet de votre démarche (pré-remplit le message) :"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {contactReasons.map((reason) => {
                  const isSelected = selectedReasonId === reason.id;
                  return (
                    <button
                      key={reason.id}
                      type="button"
                      onClick={() => handleReasonClick(reason)}
                      className={`p-3 rounded-xl text-left text-sm font-medium transition-all duration-300 flex items-center gap-3 border ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#e84393]/30 to-[#fd79a8]/20 border-[#e84393] text-white shadow-md shadow-[#e84393]/20 scale-[1.01]'
                          : 'bg-[#1e2324]/80 text-[#b2bec3] hover:text-white hover:bg-[#1e2324] border-[#b2bec3]/20 hover:border-[#e84393]/50'
                      }`}
                    >
                      <span className="text-xl" role="img" aria-hidden="true">{reason.icon}</span>
                      <span className="truncate">{reason.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6 animate-fade-in animation-delay-600">
              {/* Champ Honeypot Anti-Bot (invisible aux utilisateurs réels) */}
              <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                <label htmlFor="_hp_company">{isEn ? 'Do not fill this field:' : 'Ne pas remplir ce champ :'}</label>
                <input
                  type="text"
                  id="_hp_company"
                  name="_hp_company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData._hp_company}
                  onChange={onChange}
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-[#dfe6e9] text-sm font-bold mb-2">
                  {isEn ? 'Name:' : 'Nom :'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  className="w-full p-3 rounded-lg bg-[#1e2324] text-white border border-[#b2bec3]/30 focus:border-[#e84393] focus:ring-2 focus:ring-[#e84393]/40 outline-none transition-all duration-300 placeholder-[#b2bec3]/60"
                  placeholder={isEn ? 'Your name' : 'Votre nom'}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[#dfe6e9] text-sm font-bold mb-2">
                  {isEn ? 'Email:' : 'Email :'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  maxLength={120}
                  autoComplete="email"
                  className="w-full p-3 rounded-lg bg-[#1e2324] text-white border border-[#b2bec3]/30 focus:border-[#e84393] focus:ring-2 focus:ring-[#e84393]/40 outline-none transition-all duration-300 placeholder-[#b2bec3]/60"
                  placeholder={isEn ? 'Your email address' : 'Votre adresse email'}
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-[#dfe6e9] text-sm font-bold mb-2">
                  {isEn ? 'Subject:' : 'Sujet :'}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={onChange}
                  minLength={2}
                  maxLength={150}
                  autoComplete="off"
                  className="w-full p-3 rounded-lg bg-[#1e2324] text-white border border-[#b2bec3]/30 focus:border-[#e84393] focus:ring-2 focus:ring-[#e84393]/40 outline-none transition-all duration-300 placeholder-[#b2bec3]/60"
                  placeholder={isEn ? 'Subject of your message' : 'Sujet de votre message'}
                  required
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="message" className="text-[#dfe6e9] text-sm font-bold">
                    {isEn ? 'Message:' : 'Message :'}
                  </label>
                  <span className={`text-xs ${formData.message.length > 2800 ? 'text-[#e84393] font-semibold' : 'text-[#b2bec3]/70'}`}>
                    {formData.message.length} / 3000
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={onChange}
                  minLength={10}
                  maxLength={3000}
                  rows={5}
                  className="w-full p-3 rounded-lg bg-[#1e2324] text-white border border-[#b2bec3]/30 focus:border-[#e84393] focus:ring-2 focus:ring-[#e84393]/40 outline-none transition-all duration-300 placeholder-[#b2bec3]/60"
                  placeholder={isEn ? 'Your message (minimum 10 characters)' : 'Votre message (minimum 10 caractères)'}
                  required
                ></textarea>
              </div>
              {/* Consentement RGPD */}
              <div className="flex items-start space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={onChange}
                  required
                  className="mt-1 h-4 w-4 rounded border-[#b2bec3]/30 bg-[#1e2324] text-[#e84393] focus:ring-[#e84393] cursor-pointer"
                />
                <label htmlFor="consent" className="text-[#b2bec3] text-xs sm:text-sm leading-relaxed cursor-pointer select-none">
                  {isEn
                    ? 'I agree that the information entered will be collected and processed to contact me regarding my request, in accordance with '
                    : "J'accepte que les informations saisies soient recueillies et traitées pour me recontacter dans le cadre de ma demande, conformément aux "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenPrivacy();
                    }}
                    className="text-[#e84393] underline hover:text-[#fd79a8] font-medium focus:outline-none"
                  >
                    {isEn ? 'GDPR privacy rules' : 'règles de confidentialité RGPD'}
                  </button>
                  .
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-[#e84393] via-[#fd79a8] to-[#e84393] text-white font-bold rounded-full shadow-lg shadow-[#e84393]/30 hover:shadow-[#e84393]/50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#e84393] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? (isEn ? 'Sending...' : 'Envoi en cours...')
                    : (isEn ? 'Send message' : 'Envoyer le message')}
                </button>
                <p className="text-center text-xs text-[#b2bec3]/60 flex items-center justify-center gap-1.5 pt-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {isEn ? 'Protected by rate limiting, anti-spam honeypot and end-to-end sanitization' : 'Protégé par rate limiting, honeypot anti-spam et assainissement strict'}
                </p>
              </div>
            </form>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-gradient mb-4">
                {isEn ? 'Find me on:' : 'Retrouvez-moi sur :'}
              </h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.linkedin.com/in/nicolas-pires-de-jesus/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-[#b2bec3] hover:text-[#e84393] transition-colors duration-300 transform hover:scale-110"
                >
                  <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://github.com/Nico91170"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-[#b2bec3] hover:text-[#e84393] transition-colors duration-300 transform hover:scale-110"
                >
                  <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 0C5.372 0 0 5.372 0 12c0 5.303 3.438 9.796 8.207 11.387.6.111.819-.258.819-.575v-2.203c-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.332-1.759-1.332-1.759-1.085-.745.082-.729.082-.729 1.205.085 1.838 1.238 1.838 1.238 1.07 1.834 2.807 1.304 3.492 1 .108-.777.421-1.305.769-1.606-2.665-.304-5.467-1.334-5.467-5.931 0-1.312.466-2.385 1.235-3.22-.122-.303-.535-1.52.117-3.176 0 0 1.008-.323 3.301 1.23.957-.266 1.983-.399 3.003-.399 1.02 0 2.046.133 3.003.399 2.293-1.553 3.301-1.23 3.301-1.23.652 1.656.241 2.873.119 3.176.77.835 1.235 1.908 1.235 3.22 0 4.609-2.807 5.624-5.478 5.921.43.372.819 1.102.819 2.223v3.293c0 .317.21.69.825.572C20.565 21.796 24 17.303 24 12c0-6.628-5.372-12-12-12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
