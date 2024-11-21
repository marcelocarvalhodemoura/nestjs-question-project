import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import tsConfigPath from 'vite-tsconfig-paths'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  test: {
    globals: true,
    include: ['**/*.e2e-spec.ts'],
    root: './',
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    setupFiles: ['./test/setup-e2e.ts'],
  },
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: './src/',
      },
    ],
  },
  plugins: [
    legacy(),
    tsConfigPath(),
    swc.vite({
      module: {
        type: 'es6',
      },
    }),
  ],
})
