import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/player/index.ts'),
            name: 'CTPlayer',
            fileName: function (format) { return "ctplayer.".concat(format, ".js"); }
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'video.js'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'video.js': 'videojs'
                }
            }
        }
    }
});
