import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
// const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

// module.exports = [
//   // Any other config imports go at the top
//   eslintPluginPrettierRecommended,
// ];

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly', // Add process global here
      },
    },
    rules: {
      eqeqeq: 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'no-unused-expressions': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    ignores: ['.node_modules/*'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
