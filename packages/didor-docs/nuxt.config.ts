import type content from '@nuxt/content'
import { createResolver, logger } from '@nuxt/kit'
import { defineNuxtConfig } from 'nuxt/config'
import { version } from './package.json'

const { resolve } = createResolver(import.meta.url)

logger.success(`Using Didor Docs v${version}`)

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    // https://content.nuxtjs.org
    '@nuxt/content'
  ],

  content: {
    documentDriven: true
  },

  components: [
    {
      prefix: '',
      path: resolve('./components'),
      global: true
    }
  ],

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            codemirror: [
              // Split CodeMirror code.
              'codemirror',
              '@codemirror/autocomplete',
              '@codemirror/commands',
              '@codemirror/language',
              '@codemirror/lint',
              '@codemirror/search',
              '@codemirror/state',
              '@codemirror/view',
              // Add the following as needed.
              '@codemirror/lang-html',
              '@codemirror/lang-javascript',
              '@codemirror/lang-markdown',
              '@codemirror/lang-css',
              '@codemirror/lang-json',
            ]
          }
        }
      }
    }
    //   css: {
    //     preprocessorOptions: {
    //       scss: {
    //         additionalData: '@use "./assets/_colors.scss";',
    //       }
    //     }
    //   }
  },

  css: [
    resolve('./assets/scss/main.scss')
  ],
})
