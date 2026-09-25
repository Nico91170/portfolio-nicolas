import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface ToastProps {
  message: string | null;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 5000 }) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div
      role={isSuccess ? 'status' : 'alert'}
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-slide-in-up"
    >
      <div
        className={`flex items-start p-4 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 ${
          isSuccess
            ? 'bg-[#2d3436]/95 border-[#e84393]/50 text-[#dfe6e9] shadow-[#e84393]/15'
            : 'bg-[#2d3436]/95 border-[#fd79a8]/70 text-[#dfe6e9] shadow-[#e84393]/20'
        }`}
      >
        <div className="flex-shrink-0 mr-3 mt-0.5">
          {isSuccess ? (
            <svg className="w-5 h-5 text-[#e84393]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-[#fd79a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <div className="flex-1 text-sm font-medium pr-2">
          {message}
        </div>
        <button
          onClick={onClose}
          type="button"
          aria-label={isEn ? 'Close notification' : 'Fermer la notification'}
          className="flex-shrink-0 ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg inline-flex items-center justify-center text-[#b2bec3] hover:text-white hover:bg-[#1e2324] transition-colors focus:outline-none focus:ring-2 focus:ring-[#e84393]"
        >
          <span className="sr-only">{isEn ? 'Close' : 'Fermer'}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
