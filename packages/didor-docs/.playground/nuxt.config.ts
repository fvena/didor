export default defineNuxtConfig({
  extends: '..',
  typescript: {
    includeWorkspace: true
  },

  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: '@use "../assets/_colors.scss";',
  //       }
  //     }
  //   }
  // },
})
