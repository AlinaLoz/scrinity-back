module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'eslint-config-prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    "@typescript-eslint/explicit-module-boundary-types": "off",
    '@typescript-eslint/no-explicit-any': 'off',
    "brace-style": ["error", "1tbs"],
    "curly": ["error", "all"],
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2],
    'no-tabs': 2,
    'space-before-blocks': ['error'],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/no-inferrable-types': 'off',
    'quotes': ['error', 'single'],
    "semi": "off",
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-console": ["error"],
    "comma-dangle": ["error", "always-multiline"],
    "eol-last": ["error", "always"],
    "no-trailing-spaces": ["error"],
    "no-multiple-empty-lines": ["error", {"max": 1}],
    "key-spacing": ["error", { "beforeColon": false }]
  },
};
