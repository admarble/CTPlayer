import React, { useState, useRef, useEffect } from 'react';
import { KEYBOARD_SHORTCUTS, QUALITY_LEVELS } from '@/player/constants';

interface SettingsMenuProps {
  playbackRate: number;
  quality: string;
  onPlaybackRateChange: (rate: number) => void;
  onQualityChange: (quality: string) => void;
  className?: string;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
  playbackRate,
  quality,
  onPlaybackRateChange,
  onQualityChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'playback' | 'quality'>('playback');
  const menuRef = useRef<HTMLDivElement>(null);

  const playbackRates = [0.5, 1, 1.5, 2];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case KEYBOARD_SHORTCUTS.SPEED_UP:
        event.preventDefault();
        const fasterIndex = playbackRates.indexOf(playbackRate) + 1;
        if (fasterIndex < playbackRates.length) {
          onPlaybackRateChange(playbackRates[fasterIndex]);
        }
        break;
      case KEYBOARD_SHORTCUTS.SPEED_DOWN:
        event.preventDefault();
        const slowerIndex = playbackRates.indexOf(playbackRate) - 1;
        if (slowerIndex >= 0) {
          onPlaybackRateChange(playbackRates[slowerIndex]);
        }
        break;
    }
  };

  return (
    <div
      ref={menuRef}
      className={`vjs-settings-menu ${className}`}
      onKeyDown={handleKeyPress}
    >
      <button
        className="vjs-settings-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Settings"
        title="Settings"
      >
        <svg viewBox="0 0 24 24" className="vjs-icon-settings">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
        </svg>
      </button>

      {isOpen && (
        <div className="vjs-settings-popup">
          <div className="vjs-settings-tabs">
            <button
              className={`vjs-settings-tab ${activeTab === 'playback' ? 'active' : ''}`}
              onClick={() => setActiveTab('playback')}
            >
              Playback Speed
            </button>
            <button
              className={`vjs-settings-tab ${activeTab === 'quality' ? 'active' : ''}`}
              onClick={() => setActiveTab('quality')}
            >
              Quality
            </button>
          </div>

          <div className="vjs-settings-content">
            {activeTab === 'playback' && (
              <div className="vjs-playback-rates">
                {playbackRates.map((rate) => (
                  <button
                    key={rate}
                    className={`vjs-playback-rate-item ${rate === playbackRate ? 'active' : ''}`}
                    onClick={() => {
                      onPlaybackRateChange(rate);
                      setIsOpen(false);
                    }}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'quality' && (
              <div className="vjs-quality-levels">
                {Object.entries(QUALITY_LEVELS).map(([label, value]) => (
                  <button
                    key={value}
                    className={`vjs-quality-item ${value === quality ? 'active' : ''}`}
                    onClick={() => {
                      onQualityChange(value);
                      setIsOpen(false);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}; 