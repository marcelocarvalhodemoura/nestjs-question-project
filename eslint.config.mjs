import js from '@eslint/js'
import pkg from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

export default [
   {
      languageOptions: {
         ecmaVersion: 2022,
         sourceType: 'module',
      },
   },
   {
      ignores: ['dist/**/*'],
   },
   js.configs.recommended,
   pkg,
   ...tseslint.configs.recommended,
   {
      rules: {
         'no-unused-vars': 'warn',
         'no-undef': 'warn',
         'prettier/prettier': [
            'error',
            {
               printWidth: 100,
               singleQuote: true,
               tabWidth: 2,
               trialingComma: 'all',
               arrowParens: 'always',
               semi: false,
            },
         ],
      },
   },
]
