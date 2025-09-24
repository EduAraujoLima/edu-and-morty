// @ts-check

// ESLint Flat Config para Angular 20 com ESLint 9 e typescript-eslint v8
// Referência: https://github.com/angular-eslint/angular-eslint/blob/main/docs/CONFIGURING_FLAT_CONFIG.md

const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  // Ignorar pastas e arquivos gerados/externos
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'node_modules/**',
      // arquivos comuns a serem ignorados
      '*.min.*',
      '*.bundle.*',
    ],
  },
  // TypeScript (inclui components, services, etc.)
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    // Lint em templates inline
    processor: angular.processInlineTemplates,
    rules: {
      // Ajuste os prefixos conforme necessário
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
    },
  },
  // Templates HTML (arquivos externos e inline via processor acima)
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
);
