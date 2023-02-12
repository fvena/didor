<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { debounce } from '../../../utils';
import srcdoc from './srcdoc.html?raw'

interface Props {
  code: string
}

const props = defineProps<Props>()
const previewCode = ref<string>('')
const delay = ref<NodeJS.Timeout>()
const preview = ref<HTMLIFrameElement>()

// Genera un id aleatorio para el iframe
const uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

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

  // Actualizo la plantilla con los datos recibidos
  let sandboxSrc = srcdoc
    .replace(/<!--IMPORT_COMPONENT-->/, codeEscaped)
    .replace(/<!--UID-->/g, uid)

  // Para poder pasar el código al iframe,
  // es necesario convertirlo a un objeto Blob y luego a un objeto URL
  const blob = new Blob([sandboxSrc], { type: 'text/html' });
  return URL.createObjectURL(blob);
}

function handleMessage(event: MessageEvent): void {
  if (event.data.uid !== uid) return

  if (event.data.action === 'resize' && preview.value) {
    preview.value.height = event.data.value
    return
  }

  if (event.data.action === 'error') {
    if (event.data.value instanceof SyntaxError) {
      console.error('SyntaxError: ', event.data.value.message)
      console.error('SyntaxError: ', event.data.value.name)
      console.error('SyntaxError: ', event.data.value.fileName)
      console.error('SyntaxError: ', event.data.value.lineNumber)
      console.error('SyntaxError: ', event.data.value.columnNumber)
      console.error('SyntaxError: ', event.data.value.stack)
      return
    }

    console.error('from parent', event.data.value)
    return
  }
}

watch(
  () => props.code,
  newValue => refreshPreview(newValue)
)


onMounted(() => {
  previewCode.value = getPreviewCode(props.code)
  window.addEventListener("message", handleMessage, false);
})

onBeforeUnmount(() => {
  window.removeEventListener("message", handleMessage);
})
</script>

<template lang="pug">
.preview
  iframe#preview(
    v-if="previewCode"
    :src="previewCode"
    ref="preview"
    title="output"
    sandbox="allow-scripts"
    width="100%"
    height="100%")
</template>

<style lang="scss" scoped>
.preview,
.preview :deep(iframe) {
  // width: 100%;
  // height: 100%;
  border: none;
  background-color: #fff;
}
</style>
