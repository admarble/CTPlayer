import React from 'react';
import { KEYBOARD_SHORTCUTS } from '@/player/constants';

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  className?: string;
}

export const PlayButton: React.FC<PlayButtonProps> = ({
  isPlaying,
  onToggle,
  className = ''
}) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === KEYBOARD_SHORTCUTS.PLAY_PAUSE) {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <button
      className={`vjs-play-button ${className}`}
      onClick={onToggle}
      onKeyDown={handleKeyPress}
      aria-label={isPlaying ? 'Pause' : 'Play'}
      title={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying ? (
        <svg viewBox="0 0 24 24" className="vjs-icon-pause">
          <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="vjs-icon-play">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}; 