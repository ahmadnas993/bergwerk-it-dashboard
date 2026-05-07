import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

// Note: eslint-plugin-react@7.37.5 is incompatible with ESLint 10 (uses pre-v9 APIs).
// We rely on TypeScript + react-hooks rules instead until the plugin updates.

export default [
    {
        ignores: [
            'public/build/**',
            'node_modules/**',
            'vendor/**',
            'storage/**',
            'bootstrap/cache/**',
            'resources/js/types/generated/**',
        ],
    },
    js.configs.recommended,
    {
        files: ['resources/js/**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.es2022,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            'react-hooks': reactHooksPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            // JSX globals are TypeScript-checked, not ESLint-checked
            'no-undef': 'off',
        },
    },
    prettierConfig,
];
