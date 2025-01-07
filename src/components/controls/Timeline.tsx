import React, { useState, useRef } from 'react';
import { KEYBOARD_SHORTCUTS, SEEK_STEP } from '@/player/constants';

interface TimelineProps {
  currentTime: number;
  duration: number;
  buffered: number;
  onSeek: (time: number) => void;
  className?: string;
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const Timeline: React.FC<TimelineProps> = ({
  currentTime,
  duration,
  buffered,
  onSeek,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case KEYBOARD_SHORTCUTS.SEEK_FORWARD:
        event.preventDefault();
        onSeek(Math.min(duration, currentTime + SEEK_STEP));
        break;
      case KEYBOARD_SHORTCUTS.SEEK_BACKWARD:
        event.preventDefault();
        onSeek(Math.max(0, currentTime - SEEK_STEP));
        break;
    }
  };

  const calculateTimeFromEvent = (event: React.MouseEvent<HTMLDivElement>): number => {
    if (!progressBarRef.current) return 0;

    const rect = progressBarRef.current.getBoundingClientRect();
    const position = (event.clientX - rect.left) / rect.width;
    return Math.max(0, Math.min(duration, position * duration));
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const time = calculateTimeFromEvent(event);
    setHoverPosition(time);

    if (isDragging) {
      onSeek(time);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const time = calculateTimeFromEvent(event);
    onSeek(time);

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mouseup', handleMouseUp);
  };

  const progress = (currentTime / duration) * 100;
  const bufferedProgress = (buffered / duration) * 100;

  return (
    <div
      className={`vjs-timeline ${className}`}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div className="vjs-time-display">
        <span className="vjs-current-time">{formatTime(currentTime)}</span>
        <span className="vjs-time-divider">/</span>
        <span className="vjs-duration">{formatTime(duration)}</span>
      </div>

      <div
        ref={progressBarRef}
        className="vjs-progress-bar"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseLeave={() => setHoverPosition(null)}
      >
        <div className="vjs-progress-holder">
          <div
            className="vjs-play-progress"
            style={{ width: `${progress}%` }}
          />
          <div
            className="vjs-load-progress"
            style={{ width: `${bufferedProgress}%` }}
          />
        </div>

        {hoverPosition !== null && (
          <div
            className="vjs-time-tooltip"
            style={{
              left: `${(hoverPosition / duration) * 100}%`
            }}
          >
            {formatTime(hoverPosition)}
          </div>
        )}
      </div>
    </div>
  );
}; 