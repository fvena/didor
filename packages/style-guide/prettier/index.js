/**
 * Some of Prettier's defaults can be overridden by an EditorConfig file. We
 * define those here to ensure that doesn't happen.
 *
 * See: https://github.com/prettier/prettier/blob/main/docs/configuration.md#editorconfig
 */
const overridableDefaults = {
  endOfLine: 'lf',
  tabWidth: 2,
  printWidth: 100,
  useTabs: false
};

module.exports = {
  ...overridableDefaults,
  arrowParens: 'avoid',
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'strict',
  jsxSingleQuote: true,
  plugins: ['prettier-plugin-packagejson'],
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  singleQuote: true,
  trailingComma: 'none',
  vueIndentScriptAndStyle: true
};
