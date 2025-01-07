export const DEFAULT_PLAYER_CONFIG = {
  techOrder: ['html5'],
  controls: true,
  responsive: true,
  fluid: true,
  html5: {
    vhs: {
      overrideNative: true
    }
  },
  playbackRates: [0.5, 1, 1.5, 2]
};

export const PLAYER_EVENTS = {
  PLAY: 'play',
  PAUSE: 'pause',
  TIME_UPDATE: 'timeupdate',
  VOLUME_CHANGE: 'volumechange',
  PLAYBACK_RATE_CHANGE: 'ratechange',
  FULLSCREEN_CHANGE: 'fullscreenchange',
  ERROR: 'error',
  READY: 'ready',
  SEEKING: 'seeking',
  SEEKED: 'seeked',
  ENDED: 'ended',
  LOADED_METADATA: 'loadedmetadata',
  LOADED_DATA: 'loadeddata',
  WAITING: 'waiting',
  PLAYING: 'playing',
  CANPLAY: 'canplay'
};

export const KEYBOARD_SHORTCUTS = {
  PLAY_PAUSE: ' ', // Space
  MUTE: 'm',
  FULLSCREEN: 'f',
  VOLUME_UP: 'ArrowUp',
  VOLUME_DOWN: 'ArrowDown',
  SEEK_FORWARD: 'ArrowRight',
  SEEK_BACKWARD: 'ArrowLeft',
  SPEED_UP: '>',
  SPEED_DOWN: '<'
};

export const SEEK_STEP = 10; // seconds
export const VOLUME_STEP = 0.1; // 0-1 scale

export const QUALITY_LEVELS = {
  AUTO: 'auto',
  '4K': '2160p',
  '1080P': '1080p',
  '720P': '720p',
  '480P': '480p',
  '360P': '360p'
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred while loading the video',
  FORMAT_ERROR: 'Video format is not supported',
  DECODE_ERROR: 'Video cannot be decoded',
  ABORTED: 'Video loading was aborted',
  UNKNOWN: 'An unknown error occurred'
}; 