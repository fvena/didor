<script setup lang="ts">
import { ref } from 'vue'

const code = ref(`
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World 2!')
<\\/script>

<template>
  <h1 class="example">test {{ msg }} hello</h1>
  <input v-model="msg">
</template>

<style scoped>
  .example {
    color: blue;
  }
</style>
`)

const codeJava = ref(`
import { ref } from 'vue'

const msg = ref('Hello World 2!')
`)
</script>

<template lang="pug">
DocsPreview(:code="code")

DocsCode(v-model="code" lang="html")
DocsCode(v-model="codeJava" lang="javascript")
</template>

<style lang="scss" scope>

</style>
