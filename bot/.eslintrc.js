module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
    ],
    overrides: [
        {
            env: {
                "node": true
            },
            files: [
                ".eslintrc.{js,cjs}"
            ],
            parserOptions: {
                sourceType: "script"
            }
        }
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname
    },
    plugins: [
        "@typescript-eslint",
        "prettier"
    ],
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        "prettier/prettier": "error",
        quotes: ["error", "single"]
    }
}
