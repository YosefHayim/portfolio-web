// eslint.config.js
// @ts-check
import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  // 1. ESLint core recommended
  eslintJs.configs.recommended,

  // 2. TypeScript ESLint recommended
  ...tseslint.configs.recommended,

  // 3. React + TypeScript recommended
  eslintReact.configs["recommended-typescript"],

  // 4. Your custom project rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true, // For project-aware type-checking
      },
    },
    rules: {
      "@eslint-react/no-class-component": "error",
      // Add more custom rules here if needed
    },
  },

  // 5. Prettier override should come LAST to disable conflicting rules
  eslintConfigPrettier,
];
