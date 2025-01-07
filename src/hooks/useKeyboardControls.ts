import { useEffect } from 'react';
import type { PlayerInstance } from '../player/types';

const SEEK_TIME = 10; // seconds
const VOLUME_STEP = 0.1;

export const useKeyboardControls = (player: PlayerInstance | null) => {
  useEffect(() => {
    if (!player) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case ' ': // Space
          event.preventDefault();
          if (player.paused?.()) {
            player.play?.();
          } else {
            player.pause?.();
          }
          break;

        case 'm':
        case 'M':
          if (typeof player.muted === 'function') {
            player.muted(!player.muted());
          }
          break;

        case 'ArrowLeft':
          event.preventDefault();
          const currentTime = player.currentTime?.() ?? 0;
          player.currentTime?.(Math.max(0, currentTime - SEEK_TIME));
          break;

        case 'ArrowRight':
          event.preventDefault();
          const newTime = (player.currentTime?.() ?? 0) + SEEK_TIME;
          player.currentTime?.(Math.min(player.duration?.() ?? 0, newTime));
          break;

        case 'ArrowUp':
          event.preventDefault();
          const newVolume = Math.min(1, (player.volume?.() ?? 0) + VOLUME_STEP);
          player.volume?.(newVolume);
          break;

        case 'ArrowDown':
          event.preventDefault();
          const lowerVolume = Math.max(0, (player.volume?.() ?? 0) - VOLUME_STEP);
          player.volume?.(lowerVolume);
          break;

        case ',': // <
        case '<':
          const slower = Math.max(0.5, (player.playbackRate?.() ?? 1) - 0.5);
          player.playbackRate?.(slower);
          break;

        case '.': // >
        case '>':
          const faster = Math.min(2, (player.playbackRate?.() ?? 1) + 0.5);
          player.playbackRate?.(faster);
          break;

        case 'f':
        case 'F':
          if (player.isFullscreen?.()) {
            player.exitFullscreen?.();
          } else {
            player.requestFullscreen?.();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [player]);
}; 