module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParens: "always",
  bracketSameLine: false,
  printWidth: 120,
  useTabs: false,
  quoteProps: "as-needed",
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-solidity",
  ],
  overrides: [
    {
      files: "*.sol",
      options: {
        semi: true,
        singleQuote: false,
        tabWidth: 4,
        trailingComma: "none",
        bracketSpacing: true,
        arrowParens: "avoid",
        printWidth: 120,
        useTabs: false,
        explicitTypes: "always",
        compiler: "^0.8.20",
        parser: "solidity-parser",
      },
    },
    {
      files: "*.ts",
      options: {
        importOrder: ["<THIRD_PARTY_MODULES>", "^[./]"],
        importOrderParserPlugins: ["typescript"],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true,
        parser: "typescript",
      },
    },
  ],
};
