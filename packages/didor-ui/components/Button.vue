<script setup lang="ts">
import { emit } from 'process';

defineProps<{
  disabled?: boolean,
}>()

defineEmits<{
  (e: 'click:myButton', value: string): void,
}>()
</script>

<template>
  <button class="btn" :disabled="disabled" @click="$emit('click:myButton', 'hello from button')">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 1rem;
  border: none;
  background-color: rgb(255, 217, 127);
  color: black;
  font-family: sans-serif;
}
</style>