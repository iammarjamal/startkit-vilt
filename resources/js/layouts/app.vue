<script setup>
import { Head } from '@inertiajs/vue3';
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

const title = computed(() => props.title || t('name'));
const desc = computed(() => props.desc);

// Desktop Detection
const isDesktop = useMediaQuery('(min-width: 768px)');
</script>

<template>

    <Head>
        <title inertia>{{ t('name') }} - {{ title }}</title>
        <meta name="description" :content="desc" />
        <meta property="og:site_name" :content="title" />
        <meta property="og:title" :content="title" />
        <meta property="og:description" :content="desc" />
        <meta property="twitter:title" :content="title" />
        <meta property="twitter:description" :content="desc" />
    </Head>

    <SplashScreen />
    <OfflineBanner />

    <main>
        <div class="desktop flex h-full flex-col" v-if="isDesktop">
            <slot></slot>
        </div>
        <div class="scrollbar-hide phone h-full select-none" v-else>
            <slot />
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
.phone * {
    scroll-behavior: smooth !important;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-drag: none;
    -webkit-overflow-scrolling: touch;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}
</style>
