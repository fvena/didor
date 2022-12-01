<script setup lang="ts">

import type { Ref, ComputedRef, WritableComputedRef } from 'vue'
import { onMounted, onBeforeUnmount, shallowRef, ref, computed, watch, withDefaults, onErrorCaptured, nextTick } from 'vue'

// CodeMirror
import type { Extension, Text } from '@codemirror/state';
import type { ViewUpdate } from '@codemirror/view';
import type { LanguageSupport } from '@codemirror/language';
import type { LintSource } from '@codemirror/lint';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { forceLinting, linter, lintGutter } from '@codemirror/lint';

import { json } from '@codemirror/lang-json';
import { markdown } from '@codemirror/lang-markdown';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';


/** Emit Interface */
export interface Emit {
  (e: 'update:modelValue', value: string | Text): void;
  (e: 'update', value: ViewUpdate): void;
  (e: 'focus', value: boolean): void;
  (
    e: 'ready',
    value: {
      view: EditorView;
      state: EditorState;
      container: HTMLElement;
    }
  ): void;
  (e: 'change', value: string | Text): void;
}

/** Props Interface */
export interface Props {
  modelValue: string,
  wrap?: boolean,
  tabSize?: number,
  readonly?: boolean,
  disabled?: boolean,
  lineSeparator?: string,
  lang?: string,
  linter?: LintSource,
  linterConfig?: Object,
  gutter?: boolean,
  gutterConfig?: Object,
  placeholder?: string,
  lines?: string,
  filename?: string,
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  wrap: false,
  tabSize: undefined,
  readonly: false,
  disabled: false,
  lineSeparator: undefined,
  lang: undefined,
  linter: undefined,
  linterConfig: () => new Object(),
  gutter: false,
  gutterConfig: () => new Object(),
  placeholder: undefined,
  lines: '',
  filename: ''
})

const emit = defineEmits<Emit>()

/** Editor DOM */
const editor = ref<HTMLElement>();

/** Internal value */
const doc = ref<string | Text>(props.modelValue);

/** CodeMirror Editor View */
const view = shallowRef<EditorView>();

/** Editor State */
const state: WritableComputedRef<EditorState> = computed({
  get: () => view.value!.state,
  set: s => view.value!.setState(s),
});

/** Focus */
const focus: WritableComputedRef<boolean> = computed({
  get: () => view.value?.hasFocus || false,
  set: f => {
    if (f) {
      view.value!.focus();
    }
  },
});

const langs: {[index: string]: LanguageSupport} = {
  json: json(),
  markdown: markdown(),
  html: html(),
  css: css(),
  javascript: javascript()
}

function getLang(lang: string): LanguageSupport {
  return langs[lang] || langs.javascript
}

/** Get CodeMirror Extension */
const extensions: ComputedRef<Extension[]> = computed(() =>
  [
    // Basic setup
    basicSetup,
    // ViewUpdate event listener
    EditorView.updateListener.of((update: ViewUpdate) =>
      emit('update', update)
    ),
    // Indent with tab
    keymap.of([indentWithTab]),
    // Readonly option
    EditorState.readOnly.of(props.readonly),
    // Editable option
    EditorView.editable.of(!props.disabled),
    // Indent tab size
    ...props.tabSize ? [EditorState.tabSize.of(props.tabSize)] : [],
    // Toggle line wrapping
    ...props.wrap ? [EditorView.lineWrapping] : [],
    // Set Line break char
    ... props.lineSeparator
      ? [EditorState.lineSeparator.of(props.lineSeparator)]
      : [],
    // Lang
    ...props.lang ? [getLang(props.lang)] : [],
    // Append Linter settings
    ...props.linter ? [linter(props.linter, props.linterConfig)] : [],
    // Show 🔴 to error line when linter enabled.
    ...props.linter && props.gutter
      ? [lintGutter(props.gutterConfig)]
      : [],
    // Placeholder
    ...props.placeholder ? [placeholder(props.placeholder)] : [],
  ]
);

// for parent-to-child binding.
watch(
  () => props.modelValue,
  value => {
    if (!view.value) return;

    // IME fix
    if (view.value.composing) return;

    // Update
    view.value.dispatch({
      changes: { from: 0, to: view.value.state.doc.length, insert: value },
      selection: view.value.state.selection,
      scrollIntoView: true,
    });
  },
  { immediate: true }
);

// focus changed
watch(focus, isFocus => emit('focus', isFocus));

onMounted(async () => {
  /** Initial value */
  let value: string | Text = doc.value;
  if (editor.value && editor.value.childNodes[0]) {
    // when slot mode, overwrite initial value
    if (doc.value !== '') {
      console.warn(
        '[DocsCode.vue] The <docs-code> tag contains child elements that overwrite the `v-model` values.'
      );
    }

    value = (editor.value.childNodes[0] as HTMLElement).innerText.trim();
  }

  // Register Codemirror
  view.value = new EditorView({
    doc: value,
    extensions: extensions.value,
    parent: editor.value,
    dispatch: tr => {
      view.value!.update([tr]);
      // TODO: Emit lint error event
      // console.log(view.state.doc.toString(), tr);
      if (tr.changes.empty) return;
      // child-to-parent binding
      const v = view.value?.state.doc.toString() || '';

      emit('update:modelValue', v);
      emit('change', v);
    },
  });

  await nextTick();

  if (!view.value || !editor.value) return;

  emit('ready', {
    view: view.value,
    state: view.value.state,
    container: editor.value,
  });
});

onBeforeUnmount(() => {
  if (!view.value) return;

  view.value.destroy();
})

onErrorCaptured((err, vm, info) => {
  console.error(err, vm, info);
  return false;
});
</script>

<template lang="pug">
.myCode(ref="editor")
</template>

<style lang="scss" scope>
</style>
