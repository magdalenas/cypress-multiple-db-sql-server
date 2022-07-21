module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended', 'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['prettier', '@typescript-eslint',]
};
