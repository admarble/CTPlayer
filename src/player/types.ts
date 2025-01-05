export interface PlaybackFunctions {
  play(): Promise<void>;
  pause(): void;
  seek(time: number): void;
  setVolume(level: number): void;
  setPlaybackRate(rate: number): void;
  setQuality(level: string): void;
}

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
} 