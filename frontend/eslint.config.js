import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginCypress from "eslint-plugin-cypress/flat";
import pluginMocha from "eslint-plugin-mocha";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    plugins: {
      cypress: pluginCypress,
    },
  },
  {
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "cypress/no-unnecessary-waiting": "warn", // Example rule
      "cypress/unsafe-to-chain-command": "error",
      "mocha/no-exclusive-tests": "error", // Prevent `.only` in tests
      "mocha/no-skipped-tests": "error",
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginMocha.configs.recommended,
  pluginCypress.configs.recommended,
];
