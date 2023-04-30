module.exports = {
  root: true,
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  extends: ['plugin:svelte/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'import'],
  parser: '@typescript-eslint/parser',
  rules: {
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['internal', 'parent', 'sibling', 'index']],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/prefer-default-export': 'off',
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
  },
  overrides: [
    {
      files: ['*.svelte'],
      extends: [
        // https://ota-meshi.github.io/eslint-plugin-svelte/
        'plugin:svelte/recommended',
      ],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: 2021,
        ecmaFeatures: {
          globalReturn: false,
          impliedStrict: false,
          jsx: false,
        },
      },
      rules: {
        'import/no-mutable-exports': 0,
        'svelte/no-useless-mustaches': 'error',
        'svelte/sort-attributes': 'error',
        'svelte/prefer-class-directive': 'error',
        'svelte/prefer-style-directive': 'error',
        'svelte/spaced-html-comment': 'error',
      },
    },
  ],
};
