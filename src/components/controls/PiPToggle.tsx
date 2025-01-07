import React from 'react';

interface PiPToggleProps {
  isPiPActive: boolean;
  onToggle: () => void;
  className?: string;
}

const PiPToggle: React.FC<PiPToggleProps> = ({
  isPiPActive,
  onToggle,
  className = ''
}) => {
  return (
    <button
      className={`vjs-pip-control ${isPiPActive ? 'vjs-pip-active' : ''} ${className}`}
      onClick={onToggle}
      aria-label={isPiPActive ? 'Exit Picture in Picture' : 'Enter Picture in Picture'}
      title={isPiPActive ? 'Exit Picture in Picture' : 'Enter Picture in Picture'}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <rect x="12" y="12" width="8" height="8" rx="1" />
      </svg>
    </button>
  );
};

export default PiPToggle; 