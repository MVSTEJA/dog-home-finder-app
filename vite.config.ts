/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteFaviconsPlugin } from 'vite-plugin-favicon';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dog-home-finder-app/',
  plugins: [
    ViteFaviconsPlugin('./src/assets/dog.png'), // svg works too!

    react({
      jsxImportSource: '@welldone-software/why-did-you-render',
    }),
  ],
});
