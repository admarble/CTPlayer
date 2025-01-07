import type { PlayerConfig } from '../player/types';

export const defaultConfig: PlayerConfig = {
  techOrder: ['html5'],
  controls: true,
  responsive: true,
  fluid: true,
  html5: {
    vhs: {
      overrideNative: true
    }
  },
  playbackRates: [0.5, 1, 1.5, 2],
  controlBar: {
    children: [
      'playToggle',
      'volumePanel',
      'currentTimeDisplay',
      'timeDivider',
      'durationDisplay',
      'progressControl',
      'playbackRateMenuButton',
      'fullscreenToggle'
    ]
  }
};

export default defaultConfig; 