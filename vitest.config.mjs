import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import tsConfigPath from 'vite-tsconfig-paths'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: './src/',
      },
    ],
  },
  test: {
    globals: true,
    root: './',
  },
  plugins: [
    tsConfigPath(),
    swc.vite({
      module: {
        type: 'es6',
      },
    }),
  ],
})
