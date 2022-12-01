<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

interface Props {
  code: string
}

const props = defineProps<Props>()
const previewCode = ref<string>('')
const delay = ref<NodeJS.Timeout>()

/**
 * Actualiza la demo cada vez que hay cambios en el código
 * Para evitar que cada vez que se pulse una tecla se repinte la previsualización
 * añadimos un timeout de 1sg.
 */
function refreshPreview(code: string): void {
  clearTimeout(delay.value);

  delay.value = setTimeout(() => {
    previewCode.value = getPreviewCode(code);
  }, 1000);
}

function getPreviewCode(code: string): string {
  // El código introducido por el usuario puede contener la etiqueta de cierre <\/script>
  // La cadena "<\/script>" da problemas dentro de un string porque se interpretan como el cierre de la etiqueta <script>
  // Para evitarlo la escapamos con la barra invertida, aunque en nuestro caso tenemos que hacerlo dos veces
  // para que no de error en la propia función de reemplazar
  let codeEscaped = code.replace('<\/script>', '<\\/script>')

  // Compruebo si es un componente completo o solo la parte del template
  if (!codeEscaped.includes('<template>')) {
    codeEscaped = `<template>${codeEscaped}</template>`;
  }

  const source = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        html {
          font-family: 'Source Sans Pro', Helvetica Neue, Arial, sans-serif;
          font-style: normal;
          font-weight: 400;
          line-height: 1.6rem;
          color: #3b4c54;
        }

        body {
          margin: 0;
        }

        .wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3.2rem 1.6rem;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div id="app"></div>
      </div>

      <script src="https://unpkg.com/vue@next/dist/vue.runtime.global.prod.js"><\/script>
      <script src="https://cdn.jsdelivr.net/npm/vue3-sfc-loader@0.8.4/dist/vue3-sfc-loader.js"><\/script>
      <script>
        const sfcContent = \`${codeEscaped}\`
        const options = {
          moduleCache: { vue: Vue },
          getFile: () => sfcContent,
          addStyle: (styleStr) => {
            const style = document.createElement('style');
            style.textContent = styleStr;
            const ref = document.head.getElementsByTagName('style')[0] || null;
            document.head.insertBefore(style, ref);
          },
        }
        const { loadModule } = window["vue3-sfc-loader"];
        Vue.createApp(Vue.defineAsyncComponent(() => loadModule('/myPugComponent.vue', options))).mount('#app');
    <\/script>
    </body>
    </html>
  `

  const blob = new Blob([source], { type: 'text/html' });
  return URL.createObjectURL(blob);
}

watch(
  () => props.code,
  newValue => refreshPreview(newValue)
)

onMounted(() => {
  previewCode.value = getPreviewCode(props.code)
})
</script>

<template lang="pug">
iframe.preview__iframe(
  v-if="previewCode"
  :src="previewCode"
  title="output"
  sandbox="allow-scripts"
  width="100%"
  height="100%")
</template>

<style lang="scss" scope></style>
