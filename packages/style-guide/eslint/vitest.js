/* eslint-env node */
module.exports = {
  extends: [
    'plugin:vitest-globals/recommended',
    'plugin:testing-library/vue',
    require.resolve('./rules/vitest')
  ],
  plugins: ['testing-library'],
  env: {
    'vitest-globals/env': true
  }
};
