<script setup>
import useTheme from '@/libraries/theme/theme';
import { Link } from '@inertiajs/vue3';
import { useMediaQuery, useStorage } from '@vueuse/core';
import { onMounted, computed, defineProps, ref, watch } from 'vue';

const props = defineProps({
  class: { type: String, default: '' },
  type: { type: String, default: 'logo' },
});

const EnvDev = import.meta.env.DEV;
const baseURL = EnvDev ? 'https://rqeim.com.test' : '';
const prefersDarkScheme = useMediaQuery('(prefers-color-scheme: dark)');

const language = ref('');
const storageLanguage = useStorage('language', 'ar');

onMounted(() => {
  language.value = storageLanguage.value;
});

const { isDark } = useTheme();

const imagePath = computed(() => {
  const types = {
    'icon-box': 'icons/icon',
    'icon-dark': 'icons/icon-dark',
    'icon-light': 'icons/icon-light',
    logo: `logos/logo-${language.value === 'ar' ? 'ar' : 'en'}-${isDark.value ? 'light' : 'dark'}`,
  };
  return `${baseURL}/assets/images/${types[props.type]}.webp`;
});

watch(storageLanguage, (newValue) => {
  language.value = newValue;
});
</script>

<template>
    <div class="w-full cursor-pointer">
        <Link :href="route('home.index')" prefetch="click">
            <div class="max-w-24">
                <img v-if="type !== 'logo'" :src="imagePath" :alt="type.replace('icon-', '')" :class="[props.class, 'object-contain']" />

                <img
                    v-if="type === 'logo'"
                    :src="imagePath"
                    :alt="`Logo ${language} ${isDark ? 'Light' : 'Dark'}`"
                    :class="[props.class, 'object-contain']"
                />
            </div>
        </Link>
    </div>
</template>
