import path from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],

    publicDir: path.resolve('resources'),
    // mostrando pro main a pasta resources(que tem os icones/imagens do app)
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: './src/renderer/tailwind.config.js',
          }),
        ],
      },
    },
    plugins: [react()],
  },
  resolve: {
    alias: {
      '@renderer': path.resolve('src/renderer/src'),
    },
  },
})
