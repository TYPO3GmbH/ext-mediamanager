module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'html', 'header'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    // disable the rule for all files
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'import/named': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'public-field',
          'protected-field',
          'private-field',
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          'constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
        ],
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'class',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
    '@typescript-eslint/type-annotation-spacing': 'error',
    curly: 'error',
    'dot-notation': 'error',
    'eol-last': 'error',
    'no-bitwise': 'off',
    'no-caller': 'error',
    'no-debugger': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-fallthrough': 'error',
    'no-new-wrappers': 'error',
    'no-unused-labels': 'error',
    'no-unused-vars': 'off',
    'no-var': 'error',
    radix: 'error',
    semi: 'off',
    'header/header': [
      2,
      'block',
      [
        '',
        ' * This file is part of the TYPO3 CMS project.',
        ' *',
        ' * It is free software; you can redistribute it and/or modify it under',
        ' * the terms of the GNU General Public License, either version 2',
        ' * of the License, or any later version.',
        ' *',
        ' * For the full copyright and license information, please read the',
        ' * LICENSE.txt file that was distributed with this source code.',
        ' *',
        ' * The TYPO3 project - inspiring people to share!',
        ' ',
      ],
      2,
    ],
  },
  ignorePatterns: ['web_modules/**/*'],
};
