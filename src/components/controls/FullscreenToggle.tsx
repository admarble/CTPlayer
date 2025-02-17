import React from 'react';
import { KEYBOARD_SHORTCUTS } from '@/player/constants';

interface FullscreenToggleProps {
  isFullscreen: boolean;
  onToggle: () => void;
  className?: string;
}

export const FullscreenToggle: React.FC<FullscreenToggleProps> = ({
  isFullscreen,
  onToggle,
  className = ''
}) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === KEYBOARD_SHORTCUTS.FULLSCREEN) {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <button
      className={`vjs-fullscreen-control ${className}`}
      onClick={onToggle}
      onKeyDown={handleKeyPress}
      aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    >
      <svg viewBox="0 0 24 24" className={`vjs-icon-fullscreen-${isFullscreen ? 'exit' : 'enter'}`}>
        {isFullscreen ? (
          <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
        ) : (
          <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
        )}
      </svg>
    </button>
  );
}; 