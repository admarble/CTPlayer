# CTPlayer - Smart Video Player

A modern, feature-rich video player built with Video.js and React, offering advanced playback controls and a customizable interface.

## Features

- 🎮 Full playback controls (play/pause, volume, timeline scrubbing)
- 🎯 Keyboard shortcuts for common actions
- 📱 Responsive design and mobile-optimized controls
- 🎨 Customizable theme and appearance
- 🔧 Quality selection and playback speed control
- ⌨️ Accessibility features

## Installation

```bash
# Using npm
npm install ctplayer

# Using yarn
yarn add ctplayer
```

## Quick Start

```tsx
import { Player } from 'ctplayer';
import 'ctplayer/dist/styles.css';

function App() {
  return (
    <Player
      src="https://example.com/video.mp4"
      poster="https://example.com/poster.jpg"
      autoplay={false}
      controls={true}
      onReady={(player) => {
        console.log('Player is ready');
      }}
      onError={(error) => {
        console.error('Player error:', error);
      }}
    />
  );
}
```

## Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ctplayer.git
cd ctplayer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Configuration

The player accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | required | URL of the video file |
| poster | string | undefined | URL of the poster image |
| width | number/string | undefined | Player width |
| height | number/string | undefined | Player height |
| autoplay | boolean | false | Auto-play the video |
| controls | boolean | true | Show player controls |
| className | string | '' | Additional CSS classes |
| onReady | function | undefined | Called when player is ready |
| onError | function | undefined | Called on player error |

## Keyboard Shortcuts

- Space: Play/Pause
- M: Mute/Unmute
- F: Toggle fullscreen
- Arrow Up/Down: Volume control
- Arrow Left/Right: Seek backward/forward
- < / >: Decrease/Increase playback speed

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Chrome for Android 90+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 