import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    rules: {
      semi: ['error', 'always'], // Enforces the use of semicolons
      'prefer-const': 'error', // Enforces the use of const over let when variables are not reassigned
      'no-unused-vars': 'warn', // Warns about unused variables instead of throwing an error
      'eqeqeq': 'error', // Enforces the use of === and !==
      'curly': 'error', // Enforces consistent brace style for all control statements
      'no-console': 'off', // Allows the use of console statements
    }
  }
  
];