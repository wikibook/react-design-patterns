import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  resolve: {
    alias: [
      {
        find: 'next/image',
        replacement: fileURLToPath(
          new URL('./src/shims/next-image.tsx', import.meta.url),
        ),
      },
      {
        find: 'next/link',
        replacement: fileURLToPath(
          new URL('./src/shims/next-link.tsx', import.meta.url),
        ),
      },
      {
        find: 'next',
        replacement: fileURLToPath(
          new URL('./src/shims/next.ts', import.meta.url),
        ),
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  plugins: [
    tailwindcss(),
    react(),
    babel({
      plugins: [
        ['@babel/plugin-proposal-decorators', { version: '2023-11' }],
        ['@babel/plugin-transform-class-properties', { loose: false }],
        ['@babel/plugin-transform-class-static-block', {}],
      ],
    }),
  ],
});
