import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { renderToString } from '@vue/server-renderer';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createSSRApp, h, type DefineComponent } from 'vue';
import { createI18n } from 'vue-i18n';
import { ZiggyVue } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer(
    (page) =>
        createInertiaApp({
            page,
            render: renderToString,
            title: (title) => (title ? `${title}` : appName),
            resolve: resolvePage,
            setup: ({ App, props, plugin }) => {
                const locale = props.initialPage.props.app?.locale ?? 'ar';

                const i18n = createI18n({
                    ssr: true,
                    legacy: false,
                    locale: locale,
                    fallbackLocale: 'ar',
                    globalInjection: true,
                });

                return createSSRApp({ render: () => h(App, props) })
                    .use(plugin)
                    .use(i18n)
                    .use(ZiggyVue, {
                        ...page.props.ziggy,
                        location: new URL(page.props.ziggy.location),
                    });
            },
        }),
    { cluster: true },
);

function resolvePage(name: string) {
    const pages = import.meta.glob<DefineComponent>('./pages/**/*.vue');
    return resolvePageComponent<DefineComponent>(`./pages/${name}.vue`, pages);
}
