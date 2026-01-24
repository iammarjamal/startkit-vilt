import '@css/app.css';

import '@fontsource/ibm-plex-sans-arabic/100.css';
import '@fontsource/ibm-plex-sans-arabic/200.css';
import '@fontsource/ibm-plex-sans-arabic/300.css';
import '@fontsource/ibm-plex-sans-arabic/400.css';
import '@fontsource/ibm-plex-sans-arabic/500.css';
import '@fontsource/ibm-plex-sans-arabic/600.css';
import '@fontsource/ibm-plex-sans-arabic/700.css';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h, DefineComponent } from 'vue';
import { MotionPlugin } from '@vueuse/motion';
import { createI18n } from 'vue-i18n';
import { initializeAppLifeCycle } from './composables/useLifeCycle';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Initialize theme and lifecycle before app creation
initializeAppLifeCycle();

createInertiaApp({
    title: (title) => (title ? `${title}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>('./pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const locale: string = (props?.initialPage?.props as any)?.app?.locale ?? 'ar';

        const i18n = createI18n({
            legacy: false,
            locale: locale,
            fallbackLocale: 'ar',
        });

        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(i18n)
            .use(MotionPlugin)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
    defaults: {
        visitOptions: (href, options) => {
            return { viewTransition: true }
        },
    },
});
