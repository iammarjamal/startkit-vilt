<script setup>
import { Head } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';

import Splash from '@/components/app/Splash/index.vue';

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

    <Splash />

    <main>
        <div class="desktop flex h-full flex-col" v-if="isDesktop">
            <slot></slot>
        </div>
        <div class="scrollbar-hide phone h-full select-none" v-else>
            <slot></slot>
        </div>
    </main>
</template>

<i18n>
{
    "ar": {
        "name": "وصول",
        "حدث خطأ": "حدث خطأ أثناء المعالجة"
    },
    "en": {
        "name": "Wosul",
        "حدث خطأ": "An error occurred"
    }
}
</i18n>

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
