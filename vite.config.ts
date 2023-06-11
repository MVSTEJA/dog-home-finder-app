/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src/'),
    },
  },

  plugins: [
    pluginRewriteAll(),
    react({
      jsxImportSource: '@welldone-software/why-did-you-render',
    }),
  ],
});
