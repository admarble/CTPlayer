import React from 'react';
import { PLAYER_EVENTS } from '../../player/constants';

interface PlayButtonProps {
  player: any;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ player }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    if (!player) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    player.on(PLAYER_EVENTS.PLAY, handlePlay);
    player.on(PLAYER_EVENTS.PAUSE, handlePause);

    return () => {
      player.off(PLAYER_EVENTS.PLAY, handlePlay);
      player.off(PLAYER_EVENTS.PAUSE, handlePause);
    };
  }, [player]);

  const togglePlay = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <button
      className="vjs-play-control vjs-control"
      onClick={togglePlay}
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      <span className={`vjs-icon-${isPlaying ? 'pause' : 'play'}`} />
    </button>
  );
}; 