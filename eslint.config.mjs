// eslint.config.mjs (flat config in ESM format)
export default [
    {
        ignores: ['eslint.config.mjs', 'node_modules/**']
    },
    {
        languageOptions: {
            ecmaVersion: 2018,
            sourceType: 'commonjs',
            globals: {
                // Node.js globals
                console: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                exports: 'writable',
                module: 'writable',
                require: 'readonly',
                Buffer: 'readonly',
                global: 'readonly',
                // Test globals
                describe: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                test: 'readonly'
            }
        },
        rules: {
            'indent': [
                'error',
                4
            ],
            'linebreak-style': [
                'error',
                'unix'
            ],
            'quotes': [
                'error',
                'single'
            ],
            'semi': [
                'error',
                'always'
            ],
            'no-console': 'off',
            'no-trailing-spaces': 'error'
        }
    }
];
