import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended'
import * as tseslint from 'typescript-eslint'

export default [
   {
      languageOptions: {
         ecmaVersion: 'latest',
         sourceType: 'module',
         // extends: ['standard','plugin:@typescript-eslint/recommended','plugin:prettier/recommended'],
         parserOptions: {
            parser: '@typescript-eslint/parser',
         },
      },
  },
  {
    ignores: ['dist/**/*'],
  },
  eslint.configs.recommended,
  prettier,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
        },
      ],
      'prettier/prettier': [
        'error',
        {
           printWidth: 80,
           tabWidth: 2,
           singleQuote: true,
           trailingComma: 'all',
           arrowParens: 'always',
           semi: false,
        },
      ],
    },
  },
]
