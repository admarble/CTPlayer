import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import type { PlayerConfig, VideoJsPlayer } from './types';
import { defaultConfig } from '../config/player.config';
import { useKeyboardControls } from '../hooks/useKeyboardControls';

export class Player {
  private player: VideoJsPlayer | null = null;
  private config: PlayerConfig;

  constructor(elementId: string, config: Partial<PlayerConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.initialize(elementId);
  }

  public getPlayer(): VideoJsPlayer | null {
    return this.player;
  }

  private initialize(elementId: string): void {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Element with id "${elementId}" not found`);
      }

      this.player = videojs(element, {
        ...this.config,
        userActions: {
          ...this.config.userActions,
          hotkeys: true // Enable built-in hotkey support
        }
      });
      
      // Initialize keyboard controls
      useKeyboardControls(this.player);
      
      this.setupEventHandlers();
    }
  }

  private setupEventHandlers(): void {
    if (!this.player) return;

    this.player.on('play', () => {
      // Handle play event
    });

    this.player.on('pause', () => {
      // Handle pause event
    });

    this.player.on('timeupdate', () => {
      // Handle time updates
    });

    this.player.on('error', (error: Error) => {
      console.error('Video player error:', error);
    });

    this.player.on('enterpictureinpicture', () => {
      // Handle PiP enter
    });

    this.player.on('leavepictureinpicture', () => {
      // Handle PiP exit
    });
  }

  // Public API methods
  public async play(): Promise<void> {
    return this.player?.play();
  }

  public pause(): void {
    this.player?.pause();
  }

  public seek(time: number): void {
    if (this.player) {
      this.player.currentTime(time);
    }
  }

  public setVolume(level: number): void {
    if (this.player) {
      this.player.volume(Math.max(0, Math.min(1, level)));
    }
  }

  public setPlaybackRate(rate: number): void {
    if (this.player) {
      this.player.playbackRate(rate);
    }
  }

  /** @param _level The quality level to set (not implemented yet) */
  public setQuality(_level: string): void {
    // Implementation depends on quality selection plugin/implementation
    console.warn('Quality selection not implemented');
  }

  public dispose(): void {
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }
  }

  public async requestPictureInPicture(): Promise<void> {
    if (!this.player) return;
    
    const videoElement = this.player.tech().el() as HTMLVideoElement;
    
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled && videoElement) {
      try {
        await videoElement.requestPictureInPicture();
      } catch (error) {
        console.error('Failed to enter Picture-in-Picture mode:', error);
      }
    }
  }
} 