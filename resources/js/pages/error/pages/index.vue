<script setup>
import App from '@/layouts/app.vue';
import { router } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
    status: {
        type: Number,
        required: true,
    },
});

const titleMap = {
    503: '503',
    500: '500',
    404: '404',
    403: '403',
};

const title = computed(() => titleMap[props.status] || `${props.status}: ${t('error.unknown')}`);

function goBack() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const referrer = document.referrer;
        const currentOrigin = window.location.origin;

        const fromSameOrigin = referrer && new URL(referrer).origin === currentOrigin;

        if (window.history.length > 1) {
            window.history.back();
        } else if (fromSameOrigin) {
            router.visit(referrer);
        } else {
            router.visit('/');
        }
    } else {
        router.visit('/');
    }
}
</script>

<template>
    <App :title="props.title" :desc="props.desc">
        <div class="m-auto flex h-full min-h-screen w-full flex-col items-center justify-center gap-2">
            <div class="flex h-full min-h-screen flex-col place-content-center items-center justify-center px-4">
                <WidgetsTheme />
                <div class="flex w-full flex-col items-center justify-center gap-y-2">
                    <h1 class="text-[7rem] leading-tight font-bold">{{ title }}</h1>

                    <span class="font-medium">{{ t(`error.${props.status}.title`) }}</span>

                    <p class="text-center text-muted-foreground">
                        {{ t(`error.${props.status}.desc`) }}
                    </p>
                </div>
                <div class="mt-6 flex gap-x-4">
                    <button
                        @click="router.visit(route('home.index'))"
                        class="inline-flex h-9 cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow transition-all duration-300 hover:bg-primary/90 hover:opacity-70 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                        {{ t('error.home') }}
                    </button>

                    <button
                        @click="goBack()"
                        class="inline-flex h-9 cursor-pointer items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium whitespace-nowrap shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:opacity-70 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                        {{ t('error.back') }}
                    </button>
                </div>
            </div>
        </div>
    </App>
</template>

<i18n lang="json">
{
    "ar": {
        "error": {
            "403": {
                "title": "دخول غير مصرح",
                "desc": "يرجى تسجيل الدخول باستخدام بيانات اعتماد صالحة للوصول إلى هذا المورد."
            },
            "404": {
                "title": "الصفحة غير موجودة",
                "desc": "قد تكون الصفحة التي تبحث عنها قد أُزيلت أو غير متوفرة مؤقتًا."
            },
            "500": {
                "title": "خطأ في الخادم",
                "desc": "حدث خطأ غير متوقع. الرجاء المحاولة لاحقًا."
            },
            "503": {
                "title": "الخدمة غير متوفرة",
                "desc": "الخدمة غير متوفرة حاليًا للصيانة. الرجاء المحاولة لاحقًا."
            },
            "unknown": "خطأ غير معروف",
            "back": "عودة",
            "home": "الرجوع للرئيسية"
        }
    },
    "en": {
        "error": {
            "403": {
                "title": "Unauthorized Access",
                "desc": "Please log in with the appropriate credentials to access this resource."
            },
            "404": {
                "title": "Page Not Found",
                "desc": "The page you are looking for might have been removed or is temporarily unavailable."
            },
            "500": {
                "title": "Server Error",
                "desc": "Something went wrong on our end. Please try again later."
            },
            "503": {
                "title": "Service Unavailable",
                "desc": "The service is currently down for maintenance. Please try again shortly."
            },
            "unknown": "Unknown Error",
            "back": "Go Back",
            "home": "Back to Home"
        }
    }
}
</i18n>
