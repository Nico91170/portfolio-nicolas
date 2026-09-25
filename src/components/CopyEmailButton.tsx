import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface CopyEmailButtonProps {
  email: string;
  onCopySuccess?: (email: string) => void;
  className?: string;
}

const CopyEmailButton: React.FC<CopyEmailButtonProps> = ({
  email,
  onCopySuccess,
  className = '',
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      if (onCopySuccess) {
        onCopySuccess(email);
      }
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={
        copied
          ? (isEn ? 'Email address copied' : 'Adresse e-mail copiée')
          : (isEn ? 'Copy email address to clipboard' : "Copier l'adresse e-mail dans le presse-papier")
      }
      className={`group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#2d3436]/90 hover:bg-[#2d3436] border transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#e84393] ${
        copied
          ? 'border-[#e84393] text-white shadow-lg shadow-[#e84393]/30'
          : 'border-[#b2bec3]/30 hover:border-[#e84393]/60 text-[#dfe6e9] shadow-md shadow-black/20'
      } ${className}`}
    >
      {/* Icône enveloppe */}
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#1e2324]/60 group-hover:bg-[#e84393]/20 transition-colors">
        {copied ? (
          <svg
            className="w-4 h-4 text-[#e84393] animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-[#e84393]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        )}
      </span>

      {/* Adresse e-mail */}
      <span className="font-mono text-sm tracking-wide font-medium select-all">
        {email}
      </span>

      {/* Badge indicateur d'action */}
      <span
        className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full transition-all duration-300 ${
          copied
            ? 'bg-[#e84393]/25 text-[#fd79a8] border border-[#e84393]/50'
            : 'bg-[#e84393]/15 text-[#fd79a8] border border-[#e84393]/30 group-hover:bg-[#e84393]/25'
        }`}
      >
        {copied ? (
          <>
            <span>{isEn ? 'Copied!' : 'Copié !'}</span>
          </>
        ) : (
          <>
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>{isEn ? 'Copy' : 'Copier'}</span>
          </>
        )}
      </span>
    </button>
  );
};

export default CopyEmailButton;
