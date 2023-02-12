<script setup lang="ts">
import type { Record } from './Code.component.util'

import { ref, computed, watch } from 'vue'
import { increaseSelectionTab, decreaseSelectionTab, increaseTab, decreaseTab, tabNewLine, getLines, getHightlightLines } from './Code.component.util'
import prism from 'prismjs'

/** Props Interface */
export interface Props {
  modelValue: string,
  readonly?: boolean,
  lang?: string,
  lines?: string,
  filename?: string,
  linesNumbers?: boolean,
  placeholder?: string;
}

/** Emit Interface */
export interface Emit {
  (e: 'update:modelValue', value: string | Text): void;
  (e: 'update', value: string | Text): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}

//
// Props
//
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  readonly: false,
  lang: 'javascript',
  lines: '',
  filename: '',
  linesNumbers: false,
  placeholder: ''
})

//
// Emits
//
const emit = defineEmits<Emit>()

//
// Data
//
const editor = ref<HTMLTextAreaElement | null>(null)
const codeData = ref('')
const isEmpty = computed(() => codeData.value.length === 0)
const content = computed(() => prism.highlight(codeData.value, prism.languages[props.lang], props.lang) + '<br />')
const highlightLines = computed(() => getHightlightLines(props.lines, linesNumbersCount.value))
const linesNumbersCount = computed(() => {
  const lines = codeData.value.split(/\r\n|\r|\n/).length
  return lines >= 1 ? lines : 1
})
const lineHeight = computed(() => {
  if (!editor.value) return '0px'
  return window.getComputedStyle(editor.value).lineHeight
})

//
// Methods
//
/**
 * Update values and selection state of editor
 *
 * @param {Record} record - Object with the updated caret text and selection
 */
function _updateInput(record: Record): void {
  if (!editor.value) return;

  editor.value.value = record.value;
  editor.value.selectionStart = record.selectionStart;
  editor.value.selectionEnd = record.selectionEnd;

  emit('update:modelValue', record.value);
  emit('update', record.value);
}

/**
 * Launch updates events when the textarea gains focus
 */
function handleFocus(): void {
  emit('focus');
}

/**
 * Launch updates events when the textarea loses focus
 */
function handleBlur(): void {
  emit('blur');
}

/**
 * Launch updates events when the value of the textarea changes
 *
 * @param {KeyboardEvent} e
 */
function handleChange(e: KeyboardEvent): void {
  const { value } = e.target as HTMLTextAreaElement;

  emit('update:modelValue', value);
  emit('update', value);
}

/**
 * Updates the value of the textarea based on the key pressed
 *
 * @param {KeyboardEvent} e
 */
function handleKeyDown(e: KeyboardEvent): void {
  const tabCharacter = '\t';
  const { value, selectionStart, selectionEnd } = e.target as HTMLTextAreaElement;
  let record: Record = { value, selectionStart, selectionEnd };

  // Remove focus
  if (e.code === 'Escape') {
    (<HTMLTextAreaElement>e.target).blur();
    emit('blur');
  }

  // Insert a tab character at the caret position
  if (e.code === 'Tab') {
    // Prevent focus change
    e.preventDefault();

    if (e.shiftKey) record = decreaseSelectionTab(value, selectionStart, selectionEnd, tabCharacter, getLines);
    else if (selectionStart !== selectionEnd) record = increaseSelectionTab(value, selectionStart, selectionEnd, tabCharacter, getLines);
    else record = increaseTab(value, selectionStart, tabCharacter);
  }

  // Remove tab character at caret position
  if (e.code === 'Backspace') {
    const hasSelection = selectionStart !== selectionEnd;
    const textBeforeCaret = value.substring(0, selectionStart);

    if (textBeforeCaret.endsWith(tabCharacter) && !hasSelection) {
      // Prevent default delete behavior
      e.preventDefault();

      record = decreaseTab(value, selectionStart, tabCharacter);
    }
  }

  // Preserve indentation on inserting a new line
  if (e.code === 'Enter') {
    if (selectionStart === selectionEnd) {
      // Get the current line spaced
      const line = getLines(value, selectionStart).pop();
      const matches = line?.match(/^\s+/);

      if (matches && matches[0]) {
        // Prevent default new line behavior
        e.preventDefault();

        record = tabNewLine(value, selectionStart, matches[0]);
      }
    }
  }

  _updateInput(record);
}

//
// Watchers
//
watch(
  () => props.modelValue,
  (newVal: string) => {
    codeData.value = !newVal ? '' : newVal;
  },
  { immediate: true }
)

</script>

<template lang="pug">
.code
  h1.prueba Holaaaaaaa

  //- lines highlight
  .code__lines-highlight(
    v-if="highlightLines.length"
    data-testid="linesHighlight")

    .code__line-highlight(
      v-for="line in highlightLines"
      :key="line"
      :style="{ top: `calc(${lineHeight} * ${line - 1})`, height: lineHeight }")

  //- Lines Numbers
  pre.code__line-numbers(
    v-if="linesNumbers"
    aria-hidden="true"
    data-testid="linesNumbers")

    .code__line-number.token.comment(v-for="n in linesNumbersCount") {{ n }}

  .prism-editor__container

    //- Editor
    textarea.code__textarea(
      aria-hidden="true"
      ref="editor"
      spellcheck="false"
      autocapitalize="off"
      autocomplete="off"
      autocorrect="off"
      data-gramm="false"
      data-testid="textarea"
      :class="{ 'code__textarea--empty': isEmpty }"
      :value="codeData"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="readonly"
      @input="handleChange"
      @keydown="handleKeyDown"
      @focus="handleFocus"
      @blur="handleBlur")

    //- Code Highlight
    pre.code__highlight(v-html="content" 'data-testid'="highlight")
</template>

<style lang="scss" scope>
.prueba {
  color: color(brand);
}
// .code {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: flex-start;
//   overflow: auto;
//   tab-size: 1.5em;
//   -moz-tab-size: 1.5em;
//   position: relative;

//   @include shadow(3);

//   position: relative;
//   margin: double() 0;
//   overflow: hidden;
//   background: color(gray7);
//   border-radius: $border-radius;

//   @include hover {
//     .appCode__button {
//       opacity: 0.8;
//     }
//   }

//   &--hasFilename {
//     .appCode__button {
//       background-color: transparent;
//     }

//     &::v-deep() .CodeMirror {
//       padding-top: 0 !important;
//     }
//   }

//   &__buttons {
//     position: absolute;
//     top: 0;
//     right: quarter();
//     z-index: 10;
//   }

//   &__button {
//     display: inline-block;
//     min-width: size(1.5);
//     height: size(1.5);
//     line-height: size(1.5);
//     text-align: center;
//     cursor: pointer;
//     background-color: color(gray7);
//     border-radius: $border-radius;
//     opacity: 0;
//     transition: $transition;

//     @include hover {
//       color: color(brand);
//     }

//     svg {
//       vertical-align: middle;
//     }
//   }

//   &__filename {
//     display: flex;
//     align-items: center;
//     height: size(1.5);
//     padding-left: quarter();
//     margin-bottom: half();
//     font-size: font-size(small1);
//     font-weight: font-weight(bold);
//     background-color: color(gray7);
//     border-bottom: 1px solid $border-color;

//     svg {
//       margin: 0 quarter();
//       stroke: color(gray3);
//     }
//   }
// }

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .code__textarea {
    color: transparent !important;
  }
  .code__textarea::selection {
    background-color: #accef7 !important;
    color: transparent !important;
  }
}

.prism-editor__container {
  position: relative;
  text-align: left;
  box-sizing: border-box;
  padding: 0;
  overflow: hidden;
  width: 100%;
}

.code__line-numbers {
  height: 100%;
  overflow: hidden;
  flex-shrink: 0;
  margin-top: 0;
  margin-right: 10px;
  position: relative;
}
.code__line-number {
  /* padding: 0 3px 0 5px; */
  text-align: right;
  white-space: nowrap;
}

.code__textarea {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  resize: none;
  color: inherit;
  overflow: hidden;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -webkit-text-fill-color: transparent;
}

.code__textarea,
.code__highlight {
  margin: 0;
  border: 0;
  background: none;
  box-sizing: inherit;
  display: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-variant-ligatures: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  tab-size: inherit;
  text-indent: inherit;
  text-rendering: inherit;
  text-transform: inherit;
  white-space: pre-wrap;
  word-wrap: keep-all;
  overflow-wrap: break-word;
  padding: 0;
}
.code__textarea--empty {
  -webkit-text-fill-color: inherit !important;
}
/* highlight */
.code__highlight {
  position: relative;
  pointer-events: none;
}

.code__lines-highlight {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.code__line-highlight {
  width: 100%;
  position: absolute;
  left: 0;
  background-color: #c6c6c6;
}

/**
 * prism.js Coy theme for JavaScript, CoffeeScript, CSS and HTML
 * Based on https://github.com/tshedor/workshop-wp-theme (Example: http://workshop.kansan.com/category/sessions/basics or http://workshop.timshedor.com/category/sessions/basics);
 * @author Tim  Shedor
 */

code[class*="language-"],
pre[class*="language-"] {
	color: black;
	font-family: 'Source Code Pro', Menlo, Monaco, Consolas, monospace !important;
	direction: ltr;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	line-height: 1.5;

	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}

/* Code blocks */
pre[class*="language-"] {
	position: relative;
	margin: .5em 0;
	-webkit-box-shadow: -1px 0px 0px 0px #358ccb, 0px 0px 0px 1px #dfdfdf;
	-moz-box-shadow: -1px 0px 0px 0px #358ccb, 0px 0px 0px 1px #dfdfdf;
	box-shadow: -1px 0px 0px 0px #358ccb, 0px 0px 0px 1px #dfdfdf;
	border-left: 10px solid #358ccb;
	background-color: #fdfdfd;
	background-image: -webkit-linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%);
	background-image: -moz-linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%);
	background-image: -ms-linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%);
	background-image: -o-linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%);
	background-image: linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%);
	background-size: 3em 3em;
	background-origin: content-box;
	overflow: visible;
	max-height: 30em;
}

code[class*="language"] {
	max-height: inherit;
	height: 100%;
	padding: 0 1em;
	display: block;
	overflow: auto;
}

/* Margin bottom to accomodate shadow */
:not(pre) > code[class*="language-"],
pre[class*="language-"] {
	background-color: #fdfdfd;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	margin-bottom: 1em;
}

/* Inline code */
:not(pre) > code[class*="language-"] {
	position: relative;
	padding: .2em;
	-webkit-border-radius: 0.3em;
	-moz-border-radius: 0.3em;
	-ms-border-radius: 0.3em;
	-o-border-radius: 0.3em;
	border-radius: 0.3em;
	color: #c92c2c;
	border: 1px solid rgba(0, 0, 0, 0.1);
}

pre[class*="language-"]:before,
pre[class*="language-"]:after {
	content: '';
	z-index: -2;
	display: block;
	position: absolute;
	bottom: 0.75em;
	left: 0.18em;
	width: 40%;
	height: 20%;
	-webkit-box-shadow: 0px 13px 8px #979797;
	-moz-box-shadow: 0px 13px 8px #979797;
	box-shadow: 0px 13px 8px #979797;
	-webkit-transform: rotate(-2deg);
	-moz-transform: rotate(-2deg);
	-ms-transform: rotate(-2deg);
	-o-transform: rotate(-2deg);
	transform: rotate(-2deg);
}

:not(pre) > code[class*="language-"]:after,
pre[class*="language-"]:after {
	right: 0.75em;
	left: auto;
	-webkit-transform: rotate(2deg);
	-moz-transform: rotate(2deg);
	-ms-transform: rotate(2deg);
	-o-transform: rotate(2deg);
	transform: rotate(2deg);
}

.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: #7D8B99;
}

.token.punctuation {
	color: #5F6364;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.function-name,
.token.constant,
.token.symbol,
.token.deleted {
	color: #bb1642;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.function,
.token.builtin,
.token.inserted {
	color: #047d65;
}

.token.operator,
.token.entity,
.token.url,
.token.variable {
	color: #75438a;
}

.token.atrule,
.token.attr-value,
.token.keyword,
.token.class-name {
	color: #1d75b3;
}

.token.regex,
.token.important {
	color: #b35e14;
}

.language-css .token.string,
.style .token.string {
	color: #75438a;
}

.token.important {
	font-weight: normal;
}

.token.bold {
	font-weight: bold;
}
.token.italic {
	font-style: italic;
}

.token.entity {
	cursor: help;
}

.namespace {
	opacity: .7;
}

@media screen and (max-width: 767px) {
	pre[class*="language-"]:before,
	pre[class*="language-"]:after {
		bottom: 14px;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
	}

}

/* Plugin styles */
.token.tab:not(:empty):before,
.token.cr:before,
.token.lf:before {
	color: #e0d7d1;
}
</style>
