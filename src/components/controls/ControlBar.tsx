import React from 'react';
import { PlayButton, VolumeControl, Timeline, SettingsMenu, FullscreenToggle, PiPToggle } from './';
import { PlayerState } from '@/player/types';

interface ControlBarProps {
  player: any; // Will be properly typed once we handle the video.js types
  playerState: PlayerState;
  className?: string;
}

const ControlBar: React.FC<ControlBarProps> = ({
  player,
  playerState,
  className = ''
}) => {
  return (
    <div className={`vjs-control-bar ${className}`}>
      <div className="vjs-control-bar-left">
        <PlayButton
          isPlaying={playerState.isPlaying}
          onToggle={() => {
            if (playerState.isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
        <VolumeControl
          volume={playerState.volume}
          onVolumeChange={(value: number) => player.volume(value)}
          onMuteToggle={() => player.muted(!player.muted())}
        />
      </div>

      <Timeline
        currentTime={playerState.currentTime}
        duration={playerState.duration}
        buffered={playerState.buffered}
        onSeek={(time: number) => player.currentTime(time)}
      />

      <div className="vjs-control-bar-right">
        <SettingsMenu
          playbackRate={playerState.playbackRate}
          quality={playerState.quality}
          onPlaybackRateChange={(rate: number) => player.playbackRate(rate)}
          onQualityChange={(level: string) => player.quality(level)}
        />
        <PiPToggle
          isPiPActive={playerState.isPiPActive}
          onToggle={() => player.requestPictureInPicture()}
        />
        <FullscreenToggle
          isFullscreen={playerState.isFullscreen}
          onToggle={() => player.requestFullscreen()}
        />
      </div>
    </div>
  );
};

export default ControlBar; 