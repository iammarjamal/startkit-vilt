<!--
Usage:
<Theme inline />
<Theme tabs />
Props:
- inline: show as inline selector
- icon: show as icon button
- tabs: show as button group (like AppearanceTabs)
-->
<script setup>
import { useAppearance } from '@/composables/useAppearance';
import { Icon } from '@iconify/vue';

const { t } = useI18n();

const props = defineProps({
    icon: { type: Boolean, default: false },
    iconClass: { type: String, default: '' },
    inline: { type: Boolean, default: false },
    inlineClass: { type: String, default: '' },
    tabs: { type: Boolean, default: false },
});

const { appearance, updateAppearance } = useAppearance();

const themeRef = ref();
onLongPress(themeRef, () => updateAppearance('system'));

const selectOption = ref(appearance.value);
watch(selectOption, (value) => {
    updateAppearance(value);
});

const options = computed(() => [
    { value: 'light', label: t('body.lightMode'), selected: appearance.value === 'light' },
    { value: 'system', label: t('body.autoMode'), selected: appearance.value === 'system' },
    { value: 'dark', label: t('body.darkMode'), selected: appearance.value === 'dark' },
]);

const tabsList = [
    { value: 'light', icon: 'mdi:weather-sunny', label: t('body.lightMode') },
    { value: 'dark', icon: 'mdi:weather-night', label: t('body.darkMode') },
    { value: 'system', icon: 'mdi:monitor', label: t('body.autoMode') },
];

// Get current theme for icon display
const currentTheme = computed(() => {
    if (appearance.value === 'system') {
        // Check if we're in browser environment
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        // Default to light for SSR
        return 'light';
    }
    return appearance.value;
});

// Get icon based on current theme
const themeIcon = computed(() => {
    if (appearance.value === 'system') {
        return 'mdi:monitor';
    }
    return appearance.value === 'light' ? 'mdi:weather-sunny' : 'mdi:weather-night';
});
</script>

<template>
    <!-- Icon button mode -->
    <div v-if="icon" ref="themeRef" class="select-none">
        <a href="#" class="cursor-pointer" @click="updateAppearance(currentTheme.value === 'dark' ? 'light' : 'dark')">
            <AppIcon :name="themeIcon" size="24" class="text-[var(--primary)] dark:text-[var(--primary-foreground)]" :class="iconClass" />
        </a>
    </div>
    <!-- Inline select mode -->
    <div v-else-if="inline" class="flex items-center justify-between">
        <h1 class="text-xl font-bold text-[var(--primary)]">{{ t('body.theme') }}</h1>
        <AppSelect :placeholder="t('body.selectPlaceholder')" :options="options" :selected="appearance" v-model="selectOption" :key="appearance" />
    </div>
    <!-- Tabs button group mode (AppearanceTabs) -->
    <div v-else-if="tabs" class="inline-flex gap-1 rounded-lg bg-[var(--muted)] p-1 dark:bg-[var(--background)]">
        <button
            v-for="{ value, icon, label } in tabsList"
            :key="value"
            @click="updateAppearance(value)"
            :class="[
                'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                appearance.value === value
                    ? 'bg-[var(--background)] shadow-xs dark:bg-[var(--muted)] dark:text-[var(--foreground)]'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)]/60 hover:text-[var(--primary)] dark:text-[var(--muted-foreground)] dark:hover:bg-[var(--background)]/60',
            ]"
        >
            <Icon :icon="icon" class="-ml-1 h-4 w-4" />
            <span class="ml-1.5 text-sm">{{ label }}</span>
        </button>
    </div>
</template>

<i18n>
{
    "ar": {
        "body": {
            "theme": "نمط العرض",
            "selectPlaceholder": "اختر نمط العرض",
            "lightMode": "النمط المضيء",
            "autoMode": "النمط الافتراضي",
            "darkMode": "النمط الداكن"
        }
    },
    "en": {
        "body": {
            "theme": "Theme",
            "selectPlaceholder": "Select Theme",
            "lightMode": "Light Mode",
            "autoMode": "Auto Mode",
            "darkMode": "Dark Mode"
        }
    }
}
</i18n>
