import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
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
                    { dayjs: [['default', 'dayjs']] },
                    { '@inertiajs/vue3': ['useForm', 'usePage', 'Head', 'Link'] },
                    { 'vue-i18n': ['useI18n'] },
                ],
                dts: 'resources/js/types/auto-imports.d.ts',
            }),
            VueI18nPlugin({
                include: resolve(dirname(fileURLToPath(import.meta.url)), './locales/**'),
            }),
            VitePWA({
                strategies: 'injectManifest',
                srcDir: 'resources/js/plugins',
                filename: 'sw.ts',
                outDir: 'public',
                manifestFilename: 'manifest.webmanifest',
                injectRegister: false,
                pwaAssets: {
                    image: 'public/icon.png',
                    preset: 'minimal-2023',
                },

                manifest: {
                    name: env.APP_NAME || 'PWA App',
                    short_name: env.APP_NAME || 'PWA App',
                    description: env.APP_NAME || 'PWA Application',
                    theme_color: '#ffffff',
                    display: 'standalone',
                    scope: '/',
                    start_url: '/',
                    background_color: '#000000',
                    orientation: 'portrait-primary',
                    icons: [
                        { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
                        { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
                        { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
                        { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
                    ],
                },
                injectManifest: {
                    globDirectory: 'public',
                    globPatterns: [],
                    injectionPoint: undefined,
                },
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './resources/js'),
                '~': path.resolve(__dirname, './resources'),
                '#': path.resolve(__dirname),
            },
        },
    };
});
