# The Didor Style Guide

## Introduction

This repository is the home of Didor's style guide, which includes configs for
popular linting and styling tools.

The following configs are available and are designed to be used together.

- [ESLint](#eslint)
- [Prettier](#prettier)
- [Stylelint](#stylelint)
- [TypeScript](#typescript)

## Installation

All of our configs are contained in one package, `@didor/style-guide`. To install:

```sh
npm i @didor/style-guide
```

Some of our ESLint configs require peer dependencies. We'll note those
alongside the available configs in the [ESLint](#eslint) section.

## Prettier

> Note: Prettier is a peer-dependency of this package, and should be installed
> at the root of your project.
>
> See: <https://prettier.io/docs/en/install.html>

To use the shared Prettier config, set the following in `package.json`.

```json
{
  "prettier": "@didor/style-guide/prettier"
}
```

## ESLint

> Note: ESLint is a peer-dependency of this package, and should be installed
> at the root of your project.
>
> See: <https://eslint.org/docs/user-guide/getting-started#installation-and-usage>

This ESLint config is designed to be composable.

The following base configs are available. You can use one or both of these
configs, but they should always be first in `extends`:

- `@didor/style-guide/eslint/browser`
- `@didor/style-guide/eslint/node`

Note that you can scope configs, so that configs only target specific files.
For more information, see: [Scoped configuration with `overrides`](#scoped-configuration-with-overrides).

The following additional configs are available:

- `@didor/style-guide/eslint/vue`
- `@didor/style-guide/eslint/typescript` (requires `typescript` to be installed and [additional configuration](#configuring-eslint-for-typescript))

> You'll need to use `require.resolve` to provide ESLint with absolute paths,
> due to an issue around ESLint config resolution (see
> [eslint/eslint#9188](https://github.com/eslint/eslint/issues/9188)).

For example, use the shared ESLint config(s) in a Vue.js project, set the
following in `.eslintrc.js`.

```js
module.exports = {
  extends: [
    require.resolve('@didor/style-guide/eslint/browser'),
    require.resolve('@didor/style-guide/eslint/vue')
  ]
};
```

### Configuring ESLint for TypeScript

Some of the rules enabled in the TypeScript config require additional type
information, you'll need to provide the path to your `tsconfig.json`.

For more information, see: <https://typescript-eslint.io/docs/linting/type-linting>

```js
const { resolve } = require('path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@didor/style-guide/eslint/node'),
    require.resolve('@didor/style-guide/eslint/typescript')
  ],
  parserOptions: {
    project
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  }
};
```

### Scoped configuration with `overrides`

ESLint configs can be scoped to include/exclude specific paths. This ensures
that rules don't "leak" into places where those rules don't apply.

In this example, Vitest rules are only being applied to files matching Vitest's
default test match pattern.

```js
module.exports = {
  extends: [require.resolve('@didor/style-guide/eslint/node')],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: [require.resolve('@didor/style-guide/eslint/vitest')]
    }
  ]
};
```

#### A note on file extensions

By default, all TypeScript rules are scoped to files ending with `.ts` and
`.tsx`.

However, when using overrides, file extensions must be included or ESLint will
only include `.js` files.

```js
module.exports = {
  overrides: [{ files: [`directory/**/*.[jt]s?(x)`], rules: { 'my-rule': 'off' } }]
};
```

## TypeScript

To use the shared TypeScript config, set the following in `tsconfig.json`.

```json
{
  "extends": "@didor/style-guide/typescript"
}
```

## Stylelint

> Note: Stylelint is a peer-dependency of this package, and should be installed
> at the root of your project.
>
> See: <https://stylelint.io/user-guide/get-startedl>

To use the shared Stylelint config, set the following in `package.json`.

```json
{
  "stylelint": {
    "extends": "@didor/style-guide/stylelint"
  }
}
```
