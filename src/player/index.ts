import { Player } from './Player';
import type { PlayerConfig } from './types';

export { Player };
export type { PlayerConfig };

// Re-export commonly used utilities
export { default as usePlayer } from './hooks/usePlayer';
export { default as useVideoEvents } from './hooks/useVideoEvents';

// Default configuration
export { default as defaultConfig } from '../config/player.config';

// Constants
export * from './constants';

// Export a convenience function to create a new player instance
export function createPlayer(elementId: string, config?: Partial<PlayerConfig>) {
  return new Player(elementId, config);
}

// Export version information
export const VERSION = '1.0.0'; 