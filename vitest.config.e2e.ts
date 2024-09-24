import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import tsConfigPath from 'vite-tsconfig-paths'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
   test: {
      globals: true,
      include: ['**/*.e2e-spec.ts'],
      root: './',
      setupFiles: ['./test/setup-e2e.ts'],
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
