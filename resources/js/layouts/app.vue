<script setup lang="ts">
import { computed } from 'vue';
import { Head } from '@inertiajs/vue3';
import { IonApp, IonPage } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import { useMediaQuery } from '@vueuse/core'; // تأكد من تثبيت هذه المكتبة
import 'vue-sonner/style.css';
import { Toaster } from '@/components/ui/sonner';
import { SplashScreen } from '@/components/ui/splash-screen';
import { OfflineBanner } from '@/components/ui/offline-banner';

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    desc: {
        type: String,
        default: '',
    },
});

const { t } = useI18n();

// تحسين منطق العنوان لتجنب التكرار
const pageTitle = computed(() => {
    return props.title ? `${t('name')} - ${props.title}` : t('name');
});

const desc = computed(() => props.desc);

// Desktop Detection
const isDesktop = useMediaQuery('(min-width: 768px)');
</script>

<template>

    <Head>
        <title inertia>{{ pageTitle }}</title>
        <meta name="description" :content="desc" />
        <meta property="og:site_name" :content="t('name')" />
        <meta property="og:title" :content="pageTitle" />
        <meta property="og:description" :content="desc" />
        <meta property="twitter:title" :content="pageTitle" />
        <meta property="twitter:description" :content="desc" />
    </Head>

    <SplashScreen />
    <OfflineBanner />

    <main class="h-full">
        <div class="desktop flex h-full flex-col" v-if="isDesktop">
            <slot />
        </div>

        <div class="scrollbar-hide phone h-full select-none" v-else>
            <ion-app>
                <ion-page>
                    <slot />
                </ion-page>
            </ion-app>
        </div>

        <Toaster />
    </main>
</template>

<i18n lang="json">{
    "ar": {
        "name": "رقيم",
        "error_occurred": "حدث خطأ أثناء المعالجة"
    },
    "en": {
        "name": "Rqeim",
        "error_occurred": "An error occurred"
    }
}</i18n>

<style scoped>
/* تحسينات CSS للهاتف */
.phone :deep(*) {
    scroll-behavior: smooth !important;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-drag: none;
    -webkit-overflow-scrolling: touch;
    -webkit-user-select: none;
    user-select: none;
}
</style>