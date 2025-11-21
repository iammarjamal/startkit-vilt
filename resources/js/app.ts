import '@fontsource/ibm-plex-sans-arabic/100.css';
import '@fontsource/ibm-plex-sans-arabic/200.css';
import '@fontsource/ibm-plex-sans-arabic/300.css';
import '@fontsource/ibm-plex-sans-arabic/400.css';
import '@fontsource/ibm-plex-sans-arabic/500.css';
import '@fontsource/ibm-plex-sans-arabic/600.css';
import '@fontsource/ibm-plex-sans-arabic/700.css';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue3';
import { MotionPlugin } from '@vueuse/motion';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { createI18n } from 'vue-i18n';
import { ZiggyVue } from 'ziggy-js';
import { initializeTheme } from './composables/useAppearance';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Register Service Worker from root
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
            console.log('PWA: Service Worker registered successfully:', registration.scope);
        })
        .catch((error) => {
            console.error('PWA: Service Worker registration failed:', error);
        });
}

createInertiaApp({
    title: (title) => (title ? `${title}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>('./pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const locale: string = (props?.initialPage?.props as any)?.app?.locale ?? 'ar';

        const i18n = createI18n({
            ssr: true,
            locale: locale,
            fallbackLocale: 'ar',
        });

        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(i18n)
            .use(MotionPlugin)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on page load...
initializeTheme();
