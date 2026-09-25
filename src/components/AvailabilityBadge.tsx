import React from 'react';

interface AvailabilityBadgeProps {
  statusText?: string;
  available?: boolean;
  className?: string;
}

const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({
  statusText = 'Disponible pour de nouvelles opportunités',
  available = true,
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-label={statusText}
      className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 ${
        available
          ? 'bg-[#e84393]/15 border border-[#e84393]/40 text-[#fd79a8] shadow-sm shadow-[#e84393]/20 hover:border-[#e84393]/60 hover:bg-[#e84393]/20'
          : 'bg-[#2d3436]/90 border border-[#b2bec3]/30 text-[#b2bec3] shadow-sm shadow-black/20'
      } ${className}`}
    >
      {/* Point clignotant / pulsant */}
      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
        {available && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fd79a8] opacity-75"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            available ? 'bg-[#e84393]' : 'bg-[#b2bec3]'
          }`}
        ></span>
      </span>

      {/* Texte de statut */}
      <span className="text-xs sm:text-sm font-medium tracking-wide">
        {statusText}
      </span>
    </div>
  );
};

export default AvailabilityBadge;
