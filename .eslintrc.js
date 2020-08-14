module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: [
        'plugin:vue/essential',
        '@vue/standard',
        // 'airbnb-base',
        // 'plugin:prettier/recommended'
    ],

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'curly': ['error', 'multi-or-nest'],
        'no-useless-escape': 'off',
        'no-var': 'error',
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'named': 'never',
            'asyncArrow': 'always'
        }],
        'indent': ['error', 'tab'],
        'no-unused-expressions': 'off',
        'no-tabs': 0,
        'no-mixed-spaces-and-tabs': 0,
        'semi': ['error', 'always'],
        'newline-per-chained-call': ['error'],
        'brace-style': ['error', 'stroustrup'],
        // 'array-bracket-newline': ['error', { 'multiline': true, 'minItems': 2 }],
        'newline-after-var': ['error', 'always'],
        'vue/html-indent': ['error', 'tab', {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': false,
            'ignores': []
        }]
        // '@typescript-eslint/no-unused-expressions': 'error'

    },

    globals: {
        'globalConfig': true
    },

    parserOptions: {
        parser: 'babel-eslint'
    }
}