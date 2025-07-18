<script setup>
import Splash from '@/components/app/Splash/index.vue';
import { Head, usePage } from '@inertiajs/vue3';
import { useMediaQuery } from '@vueuse/core';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const page = usePage();
const { t: i18nT } = useI18n();
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

    <!-- Splash Screen (shows only once) -->
    <Splash />

    <!-- App -->
    <main>
        <div class="desktop flex h-full flex-col" v-if="isDesktop">
            <slot></slot>
        </div>
        <div class="scrollbar-hide phone h-full select-none" v-else>
            <slot></slot>
        </div>
    </main>
    <!-- App -->
</template>

<i18n>
    {
        "ar": {
            'name': 'رقيم'
        },
        "en": {
            'name': 'Rqeim'
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
