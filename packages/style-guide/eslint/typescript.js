const { TYPESCRIPT_FILES } = require('./constants')
const requirePackage = require('./utils/require-package')

requirePackage('typescript', 'typescript')

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: TYPESCRIPT_FILES,
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
        'plugin:import/typescript',
        require.resolve('./rules/typescript'),
        require.resolve('./rules/typescript/extension'),
        require.resolve('./rules/typescript/import'),
        require.resolve('./rules/typescript/strict'),
        require.resolve('./rules/tsdoc'),
        'plugin:prettier/recommended'
      ]
    }
  ]
}
