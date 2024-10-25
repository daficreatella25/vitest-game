module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
      "plugin:@shopify/typescript",
      "plugin:@shopify/react",
      "plugin:@shopify/prettier",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh"],
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "jsx-a11y/label-has-for": [
        2,
        {
          required: {
            some: ["nesting", "id"],
          },
          allowChildren: false,
        },
      ],
      "@typescript-eslint/naming-convention": "off",
      "@shopify/jsx-no-complex-expressions": "off",
      "@typescript-eslint/ban-types": "off",
      "import/extensions": "off",
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      '@shopify/jsx-no-hardcoded-content': 'off',
      "react-hooks/exhaustive-deps": "off"
    },
  };
  