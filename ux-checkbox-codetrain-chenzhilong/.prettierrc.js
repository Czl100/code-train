module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'never',
  tabWidth: 2,
  useTabs: false,
  semi: true,
  quoteProps: 'consistent',
  jsxSingleQuote: false,
  bracketSpacing: true,
  jsxBracketSameLine: true,
  arrowParens: 'always',
  requirePragma: false,
  insertPragma: false,
  endOfLine: 'lf',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
};
