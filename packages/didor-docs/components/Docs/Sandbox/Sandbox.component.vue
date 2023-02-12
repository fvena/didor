<script setup lang="ts">
import { ref } from 'vue'

const code = ref(`<script setup>
  import Vue from 'vue'
  import { ref } from 'vue'

  const msg = ref('Hello World 3!')
<\/script>

<template>
  <h1 class="example">test {{ msg }} hello</h1>
  <input v-model="msg">
</template>

<style scoped>
  .example {
    color: blue;
  }
</style>`)
</script>

<template lang="pug">
DocsPreview(:code="code")
DocsCode(v-model="code" lines="12, 3-6, 12, 5-8," lang="html" placeholder="test" linesNumbers)
</template>

<style lang="scss" scope>

</style>
