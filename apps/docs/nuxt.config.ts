import { resolve } from 'path'

export default defineNuxtConfig({
  extends: '@didor/docs',
  content: {
    sources: {
      didorDocs: {
        prefix: '/didor-docs',
        driver: 'fs',
        base: resolve(__dirname, '../../packages/didor-docs/.docs')
      },
      didorStyles: {
        prefix: '/didor-styles',
        driver: 'fs',
        base: resolve(__dirname, '../../packages/didor-styles/.docs')
      },
    }
  }
})
