import prettier from 'eslint-config-prettier';
import vue from 'eslint-plugin-vue';

export default [
    {
        ignores: ['vendor', 'node_modules', 'public', 'bootstrap/ssr', 'tailwind.config.js'],
        plugins: { vue },
        languageOptions: {
            parser: 'vue-eslint-parser',
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
            },
        },
        rules: {
            ...vue.configs['flat/essential'].rules,
            'vue/multi-word-component-names': 'off',
        },
    },
    prettier,
];
