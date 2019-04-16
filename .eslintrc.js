module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            modules: true
        }
    },
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
    }
}