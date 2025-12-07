import path from 'path';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import tailwindPlugin from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        React: true,
        JSX: true,
      },
    },

    plugins: {
      react: reactPlugin,
      tailwindcss: tailwindPlugin,
      'unused-imports': unusedImports,
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
    },

    settings: {
      tailwindcss: {
        config: path.join(process.cwd(), 'tailwind.config.js'),
      },
      'import/resolver': {
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          project: './tsconfig.json',
        },
      },
    },

    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'import/no-unresolved': 'off',
    },
  },

  // ignore
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
