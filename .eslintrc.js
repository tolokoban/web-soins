module.exports = {
    env: {
        browser: true
    },
    extends: ["react-app", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.eslint.json",
        sourceType: "module"
    },
    plugins: [
        "eslint-plugin-prefer-arrow",
        "eslint-plugin-import",
        "eslint-plugin-no-null",
        "eslint-plugin-unicorn",
        "eslint-plugin-jsdoc",
        "@typescript-eslint"
    ],
    rules: {
        complexity: ["warning", 20]
    }
}
