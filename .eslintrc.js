module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
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
    'indent': ['error', 2],
    'no-unused-expressions': 'off',
    "no-tabs": 0,
    "no-mixed-spaces-and-tabs": 0
    //'@typescript-eslint/no-unused-expressions': 'error'
  },

  globals: {
    'globalConfig': true
  },

  parserOptions: {
    parser: 'babel-eslint'
  }
}
