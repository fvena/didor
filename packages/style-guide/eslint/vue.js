/* eslint-env node */
module.exports = {
  extends: [
    'plugin:vuejs-accessibility/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue-pug/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    require.resolve('./rules/vue'),
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended'
  ],
  plugins: ['vuejs-accessibility'],
  env: {
    'vue/setup-compiler-macros': true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};
