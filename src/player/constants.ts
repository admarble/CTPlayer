export const DEFAULT_PLAYBACK_RATES = [0.5, 1, 1.5, 2];

export const DEFAULT_PLAYER_CONFIG = {
  techOrder: ["html5"],
  controls: true,
  responsive: true,
  fluid: true,
  html5: {
    vhs: {
      overrideNative: true
    }
  },
  playbackRates: DEFAULT_PLAYBACK_RATES
};

export const PLAYER_EVENTS = {
  PLAY: 'play',
  PAUSE: 'pause',
  TIME_UPDATE: 'timeupdate',
  ERROR: 'error',
  LOADED_METADATA: 'loadedmetadata',
  VOLUME_CHANGE: 'volumechange',
  FULLSCREEN_CHANGE: 'fullscreenchange'
}; 