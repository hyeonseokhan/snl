module.exports = {
  arrowParens: 'always',
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  'unicorn.filename-case': [
    'error',
    {
      cases: {
        camelCase: true,
        pascalCase: true,
        kebabCase: false,
      },
    },
  ],
};
