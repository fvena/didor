import { join } from 'path'
import { defineNuxtModule } from '@nuxt/kit'

// const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtModule({
  setup(_, nuxt) {
    nuxt.hook('components:dirs', dirs => {
      dirs.push({
        path: join(__dirname, 'components'),
        prefix: 'nx3',
      })
    })
  },
})