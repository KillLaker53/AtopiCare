module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],  // Target TypeScript files
      rules: {
        // Disable all rules for TypeScript files
        'no-console': 'off',
        'no-debugger': 'off',
        '@typescript-eslint/*': 'off',
        'prettier/prettier': 'off',
      },
      env: {
        node: true,
        jest: true,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Rules for non-TypeScript files (if any)
    'no-console': 'warn',
    'no-debugger': 'warn',
  },
};
