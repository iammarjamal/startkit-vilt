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
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [
            laravel({
                input: ['resources/js/app.ts'],
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
            wayfinder(),
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
                        { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
                        { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
                        { src: 'apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
                    ],
                },
                injectManifest: {
                    globDirectory: 'public',
                    globPatterns: ['**/*.{js,css,html,ico,png,svg}', 'offline.html'],
                    injectionPoint: undefined,
                },
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
