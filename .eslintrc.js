module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    overrides: [
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        indent: [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        quotes: [
            'error',
            'single',
        ],
        semi: [
            'error',
            'always',
        ],
        'keyword-spacing': 'error',
        'no-trailing-spaces': 'error',
        'space-before-blocks': 'error',
        'arrow-body-style': 'error',
        'no-multi-spaces': 'error',
        'eol-last': 'error',
        'comma-dangle': [
            'error',
            'always-multiline',
        ],
        'quote-props': [
            'error',
            'as-needed',
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                maxBOF: 0,
                max: 1,
                maxEOF: 0,
            },
        ],
    },
};
