import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'path';
import { defineConfig } from 'vite';

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

import MotionResolver from 'motion-v/resolver';
import RekaResolver from 'reka-ui/resolver';

export default defineConfig({
    base: '/',
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.ts'],
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        AutoImport({
            imports: [
                'vue',
                '@vueuse/core',
                {
                    dayjs: [['default', 'dayjs']],
                },
                {
                    '@inertiajs/vue3': ['useForm', 'usePage', 'Head', 'Link'],
                },
                {
                    'vue-i18n': ['useI18n', ['t', 'useI18n']],
                },
            ],
        }),
        Components({
            dirs: ['resources/js/components'],
            directoryAsNamespace: false,
            deep: true,
            extensions: ['vue', 'ts'],
            resolvers: [RekaResolver(), MotionResolver()],
        }),
        VueI18nPlugin(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
    },
});
