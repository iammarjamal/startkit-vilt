<script setup>
import { Icon } from '@iconify/vue';
import { router } from '@inertiajs/vue3';

import Splash from '@/components/app/Splash/index.vue';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const { t, locale } = useI18n();

// Props for icon/inline mode
const props = defineProps({
    icon: Boolean,
    iconClass: String,
    inline: Boolean,
    inlineClass: String,
});

// Loading state for splash
const isLoading = ref(false);
const SPLASH_TIME = 1000;
const LANG_LOADING_KEY = 'langLoading';

// Language options
const options = [
    { value: 'ar', label: 'اللغة العربية' },
    { value: 'en', label: 'English Language' },
];

// Get current language from URL
const selectedLanguage = computed(() => {
    if (typeof window === 'undefined') return 'ar';
    const segs = window.location.pathname.split('/').filter(Boolean);
    return segs[0] && ['ar', 'en'].includes(segs[0]) ? segs[0] : 'ar';
});

// Handle splash on mount if needed
onMounted(() => {
    if (localStorage.getItem(LANG_LOADING_KEY) === '1') {
        isLoading.value = true;
        setTimeout(() => {
            isLoading.value = false;
            localStorage.removeItem(LANG_LOADING_KEY);
        }, SPLASH_TIME);
    }
});

// Switch language and reload
function switchLanguage(newLocale) {
    if (selectedLanguage.value === newLocale) return;
    isLoading.value = true;
    localStorage.setItem(LANG_LOADING_KEY, '1');
    locale.value = newLocale;
    // Update URL with new lang
    const segs = window.location.pathname.split('/').filter(Boolean);
    if (segs[0] && ['ar', 'en'].includes(segs[0])) segs[0] = newLocale;
    else segs.unshift(newLocale);
    const newPath = `/${segs.join('/')}${window.location.search}${window.location.hash}`;
    router.visit(newPath, {
        preserveState: false,
        preserveScroll: false,
        onFinish: () => window.location.reload(),
    });
}

// Toggle between ar/en
function toggleLanguage() {
    switchLanguage(selectedLanguage.value === 'ar' ? 'en' : 'ar');
}
</script>

<template>
    <div>
        <!-- Icon button mode -->
        <button
            v-if="icon"
            type="button"
            class="cursor-pointer rounded-md p-2 transition-colors hover:bg-[var(--muted)]/50 dark:hover:bg-[var(--muted)]/30"
            @click="toggleLanguage"
            :title="t('body.language')"
        >
            <Icon icon="mdi:language" class="h-5 w-5 text-[var(--foreground)]" :class="iconClass" />
        </button>

        <!-- Inline select mode -->
        <div v-else-if="inline" :class="inlineClass">
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold text-[var(--primary)]">{{ t('body.language') }}</h1>
                <Select :model-value="selectedLanguage" @update:model-value="switchLanguage">
                    <SelectTrigger class="w-[180px] border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]">
                        <SelectValue :placeholder="t('body.selectPlaceholder')" />
                    </SelectTrigger>
                    <SelectContent class="border-[var(--border)] bg-[var(--background)]">
                        <SelectItem
                            v-for="option in options"
                            :key="option.value"
                            :value="option.value"
                            class="text-[var(--foreground)] hover:bg-[var(--muted)] focus:bg-[var(--muted)]"
                        >
                            <div class="flex items-center gap-2">
                                <Icon :icon="option.value === 'ar' ? 'flag:sa-4x3' : 'flag:us-4x3'" class="h-4 w-4" />
                                <span>{{ option.label }}</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <!-- Splash loading transition -->
        <Transition
            enter-active-class="transition-opacity duration-500 ease-in-out"
            enter-from-class="opacity-100"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-500 ease-in-out"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <Splash v-if="isLoading" v-model:show="isLoading" :once="false" :time="SPLASH_TIME" />
        </Transition>
    </div>
</template>

<i18n lang="json">
{
    "ar": {
        "body": {
            "language": "لغة العرض",
            "selectPlaceholder": "اختر لغة العرض",
            "loading": "جاري التحميل ..."
        }
    },
    "en": {
        "body": {
            "language": "Language",
            "selectPlaceholder": "Choose preferred Language",
            "loading": "Loading ..."
        }
    }
}
</i18n>
