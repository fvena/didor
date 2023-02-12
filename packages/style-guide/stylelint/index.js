module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-recess-order',
    'stylelint-config-prettier'
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'string-no-newline': null,
    'selector-max-universal': 1,
    'selector-max-type': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'color-hex-length': 'long',
    'no-duplicate-selectors': null,
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else'],
      },
    ],
    'scss/dollar-variable-colon-space-after': 'always',
    'scss/dollar-variable-colon-space-before': 'never',
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/operator-no-newline-before': true,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/operator-no-unspaced': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
  },
};
