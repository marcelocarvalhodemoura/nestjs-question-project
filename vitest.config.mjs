import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import tsConfigPath from 'vite-tsconfig-paths'

export default defineConfig({
   plugins: [
      tsConfigPath(),
      swc.vite({
         module: {
            type: 'es6',
         },
      }),
   ],
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
    include: ['./src/**/*.spec.ts'],
     alias: {
        '@/': new URL('./src/', import.meta.url).pathname,
     }
  },

})
