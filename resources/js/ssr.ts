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
import { createSSRApp, h, DefineComponent } from 'vue';
import createServer from '@inertiajs/vue3/server';
import { renderToString } from 'vue/server-renderer';
import { MotionPlugin } from '@vueuse/motion';
import { createI18n } from 'vue-i18n';
// Note: Theme initialization is skipped on SSR as it's client-side only

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer(
    (page) =>
        createInertiaApp({
            page,
            render: renderToString,
            title: (title) => (title ? `${title}` : appName),
            resolve: resolvePage,
            setup: ({ App, props, plugin }) => {
                const locale: string = (props?.initialPage?.props as any)?.app?.locale ?? 'ar';

                const i18n = createI18n({
                    legacy: false,
                    locale: locale,
                    fallbackLocale: 'ar',
                });

                return createSSRApp({ render: () => h(App, props) })
                    .use(plugin)
                    .use(i18n)
                    .use(MotionPlugin);
            },
        }),
    { cluster: true },
);

function resolvePage(name: string) {
    const pages = import.meta.glob<DefineComponent>('./pages/**/*.vue');

    return resolvePageComponent<DefineComponent>(`./pages/${name}.vue`, pages);
}
