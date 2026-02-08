import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import path from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [
            laravel({
                input: ['resources/js/app.ts'],
                ssr: 'resources/js/ssr.ts',
                refresh: true,
            }),
            wayfinder(),
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
                    { dayjs: [['default', 'dayjs']] },
                    { '@inertiajs/vue3': ['useForm', 'usePage', 'Head', 'Link'] },
                    { 'vue-i18n': ['useI18n'] },
                ],
                dts: 'resources/js/types/auto-imports.d.ts',
            }),
            VueI18nPlugin({
                include: path.resolve(dirname(fileURLToPath(import.meta.url)), './locales/**'),
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './resources/js'),
                '@css': path.resolve(__dirname, './resources/css'),
                '@assets': path.resolve(__dirname, './resources/assets'),
                '@resources': path.resolve(__dirname, './resources'),
                '#': path.resolve(__dirname),
            },
        },
    };
});
