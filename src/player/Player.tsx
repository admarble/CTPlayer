import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { PlayerConfig } from './types';
import { DEFAULT_PLAYER_CONFIG } from './constants';

interface PlayerProps {
  src: string;
  config?: Partial<PlayerConfig>;
}

export const Player: React.FC<PlayerProps> = ({ src, config = {} }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    playerRef.current = videojs(videoRef.current, {
      ...DEFAULT_PLAYER_CONFIG,
      ...config
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [config]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}; 