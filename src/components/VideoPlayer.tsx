import React, { useEffect, useRef } from 'react';
import { Player } from '../player';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import type { PlayerConfig } from '../player/types';

interface VideoPlayerProps {
  elementId: string;
  config?: Partial<PlayerConfig>;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ elementId, config }) => {
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current) {
      playerRef.current = new Player(elementId, {
        ...config,
        userActions: {
          ...config?.userActions,
          hotkeys: true
        }
      });
    }

    // Initialize keyboard controls
    useKeyboardControls(playerRef.current.getPlayer());

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [elementId, config]);

  return (
    <div className="video-player-container">
      <video
        id={elementId}
        className="video-js vjs-default-skin"
        playsInline
      />
    </div>
  );
}; 