/*
👋 Hi! This file was autogenerated by tslint-to-eslint-config.
https://github.com/typescript-eslint/tslint-to-eslint-config

It represents the closest reasonable ESLint configuration to this
project's original TSLint configuration.

We recommend eventually switching this configuration to extend from
the recommended rulesets in typescript-eslint.
https://github.com/typescript-eslint/tslint-to-eslint-config/blob/master/docs/FAQs.md

Happy linting! 💖
*/
module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.eslint.json'],
        sourceType: 'module'
    },
    plugins: ['eslint-plugin-import', 'eslint-plugin-jsdoc', '@angular-eslint/eslint-plugin', '@typescript-eslint'],
    extends: ['prettier'],
    rules: {
        '@angular-eslint/component-class-suffix': 'error',
        '@angular-eslint/directive-class-suffix': 'error',
        '@angular-eslint/no-host-metadata-property': 'error',
        '@angular-eslint/no-input-rename': 'error',
        '@angular-eslint/no-inputs-metadata-property': 'error',
        '@angular-eslint/no-output-on-prefix': 'error',
        '@angular-eslint/no-output-rename': 'error',
        '@angular-eslint/no-outputs-metadata-property': 'error',
        '@angular-eslint/use-lifecycle-interface': 'error',
        '@angular-eslint/use-pipe-transform-interface': 'error',
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
            'off',
            {
                accessibility: 'explicit'
            }
        ],
        '@typescript-eslint/indent': 'off', // Checked by prettier
        '@typescript-eslint/member-delimiter-style': [
            'off', // Checked by prettier
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                }
            }
        ],
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: ['default'],
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow'
            },
            {
                selector: ['classProperty', 'classMethod'],
                modifiers: ['private'],
                format: ['camelCase'],
                leadingUnderscore: 'require'
            },
            {
                selector: ['classProperty'],
                modifiers: ['readonly'],
                format: ['UPPER_CASE'],
                trailingUnderscore: 'allow'
            }
        ],
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-inferrable-types': [
            'error',
            {
                ignoreParameters: true
            }
        ],
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-shadow': [
            'error',
            {
                hoist: 'all'
            }
        ],
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/quotes': [
            'off', // Checked by prettier
            'single',
            {
                avoidEscape: true
            }
        ],
        '@typescript-eslint/semi': 'off', // Checked by prettier
        '@typescript-eslint/type-annotation-spacing': 'off', // Checked by prettier
        '@typescript-eslint/unified-signatures': 'error',
        'arrow-body-style': 'error',
        'brace-style': 'off', // Checked by prettier
        'capitalized-comments': [
            'error',
            'always',
            {
                ignorePattern: 'console'
            }
        ],
        'constructor-super': 'error',
        curly: 'error',
        'object-curly-spacing': 'off', // Checked by prettier
        'eol-last': 'off', // Checked by prettier
        eqeqeq: ['error', 'smart'],
        'guard-for-in': 'error',
        'id-blacklist': 'off',
        'id-match': 'off',
        'import/no-deprecated': 'warn',
        'jsdoc/no-types': 'off',
        'max-len': [
            // Checked by prettier
            'off',
            {
                code: 200
            }
        ],
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-console': [
            'warn',
            {
                allow: [
                    'info',
                    'warn',
                    'error',
                    'dir',
                    'timeLog',
                    'assert',
                    'clear',
                    'count',
                    'countReset',
                    'group',
                    'groupEnd',
                    'table',
                    'dirxml',
                    'groupCollapsed',
                    'Console',
                    'profile',
                    'profileEnd',
                    'timeStamp',
                    'context'
                ]
            }
        ],
        'no-debugger': 'error',
        'no-empty': 'off',
        'no-eval': 'error',
        'no-fallthrough': 'error',
        'no-new-wrappers': 'error',
        'no-restricted-imports': ['error', 'rxjs/Rx'],
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'off', // Checked by prettier
        'no-undef-init': 'error',
        'no-underscore-dangle': 'off',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        radix: 'error',
        'spaced-comment': [
            'error',
            'always',
            {
                markers: ['/']
            }
        ]
    }
};
