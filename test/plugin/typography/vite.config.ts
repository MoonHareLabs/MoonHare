import { defineConfig } from 'vite';
import mh from 'vite-plugin-moonhare';
import markdown from 'vite-plugin-md';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    mh(),
    markdown(),
  ],
});
