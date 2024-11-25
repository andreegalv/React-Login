import react from "eslint-plugin-react";
import globals from "globals";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        ignores: [ "src/index.js", "**/webpack.config.ts", "**/webpack.config.*.ts", "eslint.config.mjs" ],
        plugins: {
            react
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            indent: ["error", "tab", { SwitchCase: 1 }],
            "linebreak-style": ["error", "windows"],
            quotes: ["error", "double"],
            semi: ["error", "always"],

            "react/prefer-stateless-function": "error",
            "react/button-has-type": "error",
            "react/no-unused-prop-types": "error",
            "react/jsx-pascal-case": "error",
            "react/jsx-no-script-url": "error",
            "react/no-children-prop": "error",
            "react/no-danger": "error",
            "react/no-danger-with-children": "error",
            "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
            "react/jsx-fragments": "error",
            "react/jsx-no-leaked-render": ["error", { validStrategies: ["ternary"] }],
            "react/jsx-max-depth": ["error", { max: 5 }],
            "react/function-component-definition": [
                "warn",
                { namedComponents: "arrow-function" },
            ],
            "react/jsx-key": [
                "error",
                {
                    checkFragmentShorthand: true,
                    checkKeyMustBeforeSpread: true,
                    warnOnDuplicates: true,
                },
            ],
            "react/jsx-no-useless-fragment": "warn",
            "react/jsx-curly-brace-presence": "warn",
            "react/no-typos": "warn",
            "react/display-name": "warn",
            "react/self-closing-comp": "warn",
            "react/jsx-sort-props": "warn",
            "react/react-in-jsx-scope": "off",
            "react/jsx-one-expression-per-line": "off",
            "react/prop-types": "off",

            "no-debugger": "warn",
            "no-extra-semi": "off",
            "no-array-constructor": "off",
            "no-empty-function": "off",
            "no-implied-eval": "off",
            "no-loss-of-precision": "off",
            "no-unused-vars": "off",
            "require-await": "off",
        }
    }
);