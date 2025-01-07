import { useState, useEffect } from 'react';
import type { PlayerInstance, PlayerState } from '@/player/types';

const usePlayer = (player: PlayerInstance | null): PlayerState => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    volume: 1,
    currentTime: 0,
    duration: 0,
    buffered: 0,
    playbackRate: 1,
    quality: 'auto',
    isFullscreen: false,
  });

  useEffect(() => {
    if (!player) return;

    const updateState = () => {
      setPlayerState({
        isPlaying: !player.paused?.() ?? false,
        volume: player.volume?.() ?? 1,
        currentTime: player.currentTime?.() ?? 0,
        duration: player.duration?.() ?? 0,
        buffered: player.buffered?.().length ? player.buffered().end(0) : 0,
        playbackRate: player.playbackRate?.() ?? 1,
        quality: 'auto',
        isFullscreen: player.isFullscreen?.() ?? false,
      });
    };

    player.on('timeupdate', updateState);
    player.on('play', updateState);
    player.on('pause', updateState);
    player.on('volumechange', updateState);
    player.on('ratechange', updateState);
    player.on('fullscreenchange', updateState);

    return () => {
      player.off('timeupdate', updateState);
      player.off('play', updateState);
      player.off('pause', updateState);
      player.off('volumechange', updateState);
      player.off('ratechange', updateState);
      player.off('fullscreenchange', updateState);
    };
  }, [player]);

  return playerState;
};

export default usePlayer; 