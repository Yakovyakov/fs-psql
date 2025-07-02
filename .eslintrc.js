// .eslintrc.js
module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import', 'promise', 'security', 'prettier'],
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-use-before-define': ['error', { functions: false }],
    'consistent-return': 'off',
    'func-names': 'off',
    'no-shadow': ['error', { allow: ['req', 'res', 'next'] }],
    'no-param-reassign': ['error', { props: false }],
    'semi': ['error', 'never'],
    
     'no-extra-semi': 'error',
    'semi-style': ['error', 'first'],
    // import
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
      optionalDependencies: false,
      peerDependencies: false,
    }],
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
    }],
    
    // Node.js
    'node/no-unpublished-require': ['error', {
      allowModules: ['supertest', 'faker', 'dotenv', 'cross-env'],
    }],
    'node/no-unsupported-features/es-syntax': ['error', { 
      ignores: ['modules'] 
    }],
    'node/no-unsupported-features/es-syntax': 'off',
    
    // Security
    'security/detect-object-injection': 'off',
    'security/detect-non-literal-require': 'off',
    'security/detect-non-literal-fs-filename': 'off',
    
    // Prettier
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true,
      },
      rules: {
        'node/no-unpublished-require': 'off',
        'node/no-missing-require': 'off',
        'security/detect-non-literal-fs-filename': 'off',
      },
    },
    {
      files: ['migrations/**/*.js', 'seeders/**/*.js', 'config/**/*.js'],
      rules: {
        'import/no-dynamic-require': 'off',
        'global-require': 'off',
        'node/no-unpublished-require': 'off',
        'node/no-missing-require': 'off',
        'no-console': 'off',
        'security/detect-non-literal-require': 'off',
      },
    },
  ],
};