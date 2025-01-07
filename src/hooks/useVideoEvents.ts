import { useEffect } from 'react';
import type { PlayerInstance } from '../player/types';

type VideoEventHandler = () => void;
type VideoErrorHandler = (error: Error) => void;

interface VideoEventHandlers {
  onPlay?: VideoEventHandler;
  onPause?: VideoEventHandler;
  onTimeUpdate?: VideoEventHandler;
  onVolumeChange?: VideoEventHandler;
  onRateChange?: VideoEventHandler;
  onError?: VideoErrorHandler;
}

const useVideoEvents = (
  player: PlayerInstance | null,
  handlers: VideoEventHandlers
) => {
  useEffect(() => {
    if (!player) return;

    if (handlers.onPlay) {
      player.on('play', handlers.onPlay);
    }
    if (handlers.onPause) {
      player.on('pause', handlers.onPause);
    }
    if (handlers.onTimeUpdate) {
      player.on('timeupdate', handlers.onTimeUpdate);
    }
    if (handlers.onVolumeChange) {
      player.on('volumechange', handlers.onVolumeChange);
    }
    if (handlers.onRateChange) {
      player.on('ratechange', handlers.onRateChange);
    }
    if (handlers.onError) {
      player.on('error', handlers.onError);
    }

    return () => {
      if (handlers.onPlay) {
        player.off('play', handlers.onPlay);
      }
      if (handlers.onPause) {
        player.off('pause', handlers.onPause);
      }
      if (handlers.onTimeUpdate) {
        player.off('timeupdate', handlers.onTimeUpdate);
      }
      if (handlers.onVolumeChange) {
        player.off('volumechange', handlers.onVolumeChange);
      }
      if (handlers.onRateChange) {
        player.off('ratechange', handlers.onRateChange);
      }
      if (handlers.onError) {
        player.off('error', handlers.onError);
      }
    };
  }, [player, handlers]);
};

export default useVideoEvents; 