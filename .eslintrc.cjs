module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-trailing-spaces": "off",
    "semi": [
      "error",
      "always"
    ],
    "@typescript-eslint/semi": "off",
    "indent": [
      "warn",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "quotes": [
      2,
      "single",
      {
        "avoidEscape": true
      }
    ],
    "no-multiple-empty-lines": [
      "warn",
      {
        "max": 1,
        "maxEOF": 1
      }
    ],
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
}
