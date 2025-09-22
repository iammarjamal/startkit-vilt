import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/build',
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
                    'vue-i18n': ['useI18n'],
                },
            ],
        }),
        VueI18nPlugin({
            include: resolve(dirname(fileURLToPath(import.meta.url)), './locales/**'),
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            '#': path.resolve(__dirname),
        },
    },
});
