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

import { router } from '@inertiajs/vue3';

export function useSmartTransitions() {
    if (typeof window === 'undefined') return;

    // 1. كشف هوية النظام (iOS/Android/Desktop)
    const detectOS = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return 'ios';
        if (/android/i.test(userAgent)) return 'android';
        return 'desktop'; // أو اجعلها 'ios' افتراضياً إذا أحببت
    };

    // تعيين الـ OS مرة واحدة عند البدء
    document.documentElement.dataset.os = detectOS();

    // =====================================================
    // 🧠 المنطق الذكي لتحديد الاتجاه (History Indexing)
    // =====================================================

    // دالة مساعدة لقراءة "رقم الصفحة" الحالي من الـ History State
    const getIndex = () => window.history.state?.index || 0;

    // متغير لتخزين موقعنا الحالي
    let currentIndex = getIndex();

    // عند أول تحميل للتطبيق، نأكد أن الصفحة لها رقم
    if (!window.history.state || typeof window.history.state.index === 'undefined') {
        const initialIndex = Date.now(); // نستخدم التوقيت كرقم فريد متصاعد
        window.history.replaceState({ ...window.history.state, index: initialIndex }, '');
        currentIndex = initialIndex;
    }

    // مراقبة أزرار المتصفح (Back / Forward)
    window.addEventListener('popstate', (event) => {
        // نقرأ رقم الصفحة التي نحن ذاهبون إليها
        const newIndex = event.state?.index;

        // إذا كان الرقم الجديد موجوداً
        if (typeof newIndex === 'number') {
            if (newIndex < currentIndex) {
                document.documentElement.dataset.direction = 'back';
            } else {
                document.documentElement.dataset.direction = 'forward';
            }
            // تحديث موقعنا الحالي
            currentIndex = newIndex;
        } else {
            // حالة احتياطية: إذا لم نجد رقماً، نفترض أنه رجوع (غالباً يحدث عند الخروج من الموقع)
            document.documentElement.dataset.direction = 'back';
        }
    });

    // مراقبة تنقلات Inertia (الضغط على الروابط داخل الموقع)
    router.on('navigate', (event) => {
        // عند الضغط على رابط، Inertia تقوم بعمل PushState جديد
        // نحن نفترض دائماً أن الضغط على رابط هو "ذهاب للأمام"
        document.documentElement.dataset.direction = 'forward';

        // تحديث المؤشر المحلي ليكون جاهزاً للخطوة القادمة
        // (Inertia ستقوم بإنشاء State جديد، لذا نحن نستبق الأحداث)
        // ملاحظة: التاريخ الفعلي يُحدثه المتصفح، لكننا نجهز الـ UI
    });

    // خطوة إضافية: حقن الـ Index في زيارات Inertia الجديدة
    // نحتاج للتأكد أن أي صفحة جديدة يدفعها Inertia تحصل على رقم أعلى
    router.on('success', (event) => {
        // بعد نجاح التنقل، نحدث الـ Index الحالي بناءً على ما تم حفظه
        // أو ننشئ واحداً جديداً إذا كان Push
        const state = window.history.state;
        if (state && typeof state.index === 'undefined') {
            const newIndex = Date.now();
            window.history.replaceState({ ...state, index: newIndex }, '');
            currentIndex = newIndex;
        } else if (state) {
            currentIndex = state.index;
        }
    });
}

useSmartTransitions();

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
    defaults: {
        visitOptions: (href, options) => {
            return { viewTransition: true };
        },
    },
});

// This will set light / dark mode on page load...
initializeTheme();
