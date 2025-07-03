<!--
Usage:
<Logo />
<Logo iconOnly />
<Logo theme="dark" />
<Logo theme="light" />
Props:
- iconOnly: show only icon without text
- theme: force theme color (dark/light)
-->
<script setup>
import { Link } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
    class: { type: String, default: '' },
    type: { type: String, default: 'logo' },
    lang: { type: String, default: '' },
    theme: { type: String, default: '' }, // 'dark' or 'light'
});

// reactive language (SSR/CSR safe)
const language = ref(props.lang || 'ar');
// reactive theme (SSR/CSR safe)
const isDark = ref(false);

function detectLanguage() {
    // 1. من props
    if (props.lang) return props.lang;
    // 2. من مسار الرابط إذا كان url/{lang}/...
    if (typeof window !== 'undefined') {
        const match = window.location.pathname.match(/^\/?([a-zA-Z]{2})(\/|$)/);
        if (match && (match[1] === 'ar' || match[1] === 'en')) {
            return match[1];
        }
        // 3. من localStorage
        if (window.localStorage && localStorage.getItem('language')) {
            return localStorage.getItem('language');
        }
        // 4. من document.documentElement.lang
        if (window.document && document.documentElement.lang) {
            return document.documentElement.lang;
        }
    }
    // 5. افتراضي
    return 'ar';
}

function detectTheme() {
    if (typeof window !== 'undefined') {
        return document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
    }
    return false;
}

// تحديث اللغة والثيم عند التركيب والتفاعل
onMounted(() => {
    language.value = detectLanguage();
    isDark.value = detectTheme();

    // تحديث عند تغيير اللغة في localStorage أو تغيير الثيم
    window.addEventListener('storage', (e) => {
        if (e.key === 'language') {
            language.value = detectLanguage();
        }
    });
    const observer = new MutationObserver(() => {
        isDark.value = detectTheme();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
});

const imagePath = computed(() => {
    // إذا كان هناك theme محدد، استخدمه
    const forcedTheme = props.theme === 'dark' || props.theme === 'light';
    const themeToUse = forcedTheme ? props.theme : isDark.value ? 'light' : 'dark';

    if (props.type === 'icon') {
        return themeToUse === 'dark' ? '/assets/images/icons/icon-dark.webp' : '/assets/images/icons/icon-light.webp';
    }
    return `/assets/images/logos/logo-${language.value === 'ar' ? 'ar' : 'en'}-${themeToUse}.webp`;
});
</script>

<template>
    <Link :href="route('auth.index')">
        <div class="max-w-24">
            <Transition
                enter-active-class="transition-opacity duration-500 ease-in"
                enter-from-class="absolute opacity-0"
                enter-to-class="opacity-100"
            >
                <img
                    :key="imagePath"
                    :src="imagePath"
                    :alt="`Logo ${language} ${isDark ? 'Light' : 'Dark'}`"
                    :class="[props.class, 'object-contain']"
                />
            </Transition>
        </div>
    </Link>
</template>
