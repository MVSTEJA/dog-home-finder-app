/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dog-home-finder-app/',
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src/'),
    },
  },

  plugins: [
    splitVendorChunkPlugin(),
    react({
      jsxImportSource: '@welldone-software/why-did-you-render',
    }),
  ],
});
