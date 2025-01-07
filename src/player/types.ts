import type videojs from 'video.js';

export type VideoJsPlayer = ReturnType<typeof videojs>;

export interface PlayerConfig {
  techOrder: string[];
  controls: boolean;
  responsive: boolean;
  fluid: boolean;
  html5: {
    vhs: {
      overrideNative: boolean;
    };
  };
  playbackRates: number[];
  userActions?: {
    hotkeys?: boolean;
  };
  controlBar?: {
    children?: string[];
  };
}

export type PlayerInstance = VideoJsPlayer;

export interface PlayerState {
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  buffered: number;
  playbackRate: number;
  quality: string;
  isFullscreen: boolean;
  isPiPActive: boolean;
} 