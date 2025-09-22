<script setup>
import { Icon } from '@iconify/vue';
import { useMediaQuery } from '@vueuse/core';
import { Motion } from 'motion-v';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

// UI Components imports
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Access i18n functions and current locale
const { t, locale } = useI18n();

// Define component properties for different display modes
const props = defineProps({
    icon: { type: Boolean, default: false }, // Show as icon button
    iconClass: { type: String, default: '' }, // CSS classes for the icon
    inline: { type: Boolean, default: false }, // Show as inline language selector
    tabs: { type: Boolean, default: false }, // Show as a button group (tabs)
});

// Language options for the Select component
const options = [
    { value: 'ar', label: 'اللغة العربية', icon: 'flag:sa-4x3' },
    { value: 'en', label: 'English Language', icon: 'flag:us-4x3' },
];

// Language options for the Tabs component
const tabsList = [
    { value: 'ar', icon: 'flag:sa-4x3', label: 'العربية' },
    { value: 'en', icon: 'flag:us-4x3', label: 'English' },
];

// Determine if the screen is mobile based on a media query
const isMobile = useMediaQuery('(max-width: 767px)');

// Reactive state for the mobile drawer
const drawerOpen = ref(false);

/**
 * Computes the currently selected language from the URL path.
 * Defaults to 'ar' if no valid language segment is found.
 */
const selectedLanguage = computed(() => {
    // Check for window existence to prevent SSR errors
    if (typeof window === 'undefined') return 'ar';
    const segs = window.location.pathname.split('/').filter(Boolean);
    // Return 'ar' or 'en' if found, otherwise default to 'ar'
    return segs[0] && ['ar', 'en'].includes(segs[0]) ? segs[0] : 'ar';
});

/**
 * Computes the icon for the current language.
 */
const languageIcon = computed(() => {
    return selectedLanguage.value === 'ar' ? 'flag:sa-4x3' : 'flag:us-4x3';
});

// Reactive value for v-model binding, initialized with the current language
const selectedValue = ref(selectedLanguage.value);

// Reference for the element to attach long-press listener
const languageRef = ref(null); // Initialize with null for template ref

// Switch language and reload
function switchLanguage(newLocale) {
    locale.value = newLocale;
    // Update URL with new lang
    const segs = window.location.pathname.split('/').filter(Boolean);
    if (segs[0] && ['ar', 'en'].includes(segs[0])) segs[0] = newLocale;
    else segs.unshift(newLocale);
    const newPath = `/${segs.join('/')}${window.location.search}${window.location.hash}`;
    if (typeof window !== 'undefined') {
        window.location.href = newPath;
    }
}

// Toggle between ar/en
function toggleLanguage() {
    switchLanguage(selectedLanguage.value === 'ar' ? 'en' : 'ar');
}

// Watch for changes in selectedValue from UI components (Select, Tabs)
watch(selectedValue, (newValue) => {
    // Only switch language if the value actually changed
    if (newValue && newValue !== selectedLanguage.value) {
        switchLanguage(newValue);
        // Close drawer if open (only relevant for mobile drawer)
        if (isMobile.value) {
            drawerOpen.value = false;
        }
    }
});

// Watch for external changes to selectedLanguage (e.g., URL change from Inertia)
// and update selectedValue for UI components to reflect
watch(selectedLanguage, (newValue) => {
    selectedValue.value = newValue;
});
</script>

<template>
    <div>
        <div v-if="icon" ref="languageRef" class="select-none">
            <button
                type="button"
                class="cursor-pointer rounded-md p-2 transition-colors hover:bg-[var(--muted)]/50 dark:hover:bg-[var(--muted)]/30"
                @click="toggleLanguage"
                :title="t('body.language')"
            >
                <Icon
                    :icon="languageIcon"
                    class="h-5 w-5 text-[var(--foreground)] transition-colors dark:text-[var(--foreground)]"
                    :class="iconClass"
                />
            </button>
        </div>

        <div v-else-if="inline" class="flex items-center justify-between">
            <h1 class="text-start text-xl font-bold text-[var(--foreground)] dark:text-[var(--foreground)]">
                {{ t('body.language') }}
            </h1>
            <Drawer v-if="isMobile" v-model:open="drawerOpen">
                <DrawerTrigger as-child>
                    <button
                        type="button"
                        class="flex w-[180px] items-center justify-between rounded-md border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] dark:border-[var(--border)] dark:bg-[var(--background)] dark:text-[var(--foreground)]"
                    >
                        <div class="flex items-center gap-2 text-start">
                            <Icon :icon="options.find((opt) => opt.value === selectedValue)?.icon || 'mdi:language'" class="h-4 w-4" />
                            <span>{{ options.find((opt) => opt.value === selectedValue)?.label || t('body.selectPlaceholder') }}</span>
                        </div>
                        <Icon icon="mdi:chevron-down" class="h-4 w-4" />
                    </button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle class="flex items-center gap-2 text-start">
                            <Icon icon="mdi:language" class="h-5 w-5" />
                            {{ t('body.language') }}
                        </DrawerTitle>
                    </DrawerHeader>
                    <div class="flex w-full flex-col items-center justify-start space-y-3 p-6">
                        <button
                            v-for="option in options"
                            :key="option.value"
                            type="button"
                            @click="selectedValue = option.value"
                            :class="[
                                'flex w-full items-center gap-3 rounded-lg p-4 text-start transition-all duration-200',
                                'border-2 hover:border-[var(--primary)]/50',
                                selectedValue === option.value
                                    ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                                    : 'border-transparent text-[var(--foreground)] hover:bg-[var(--muted)] dark:text-[var(--foreground)] dark:hover:bg-[var(--muted)]',
                            ]"
                        >
                            <Icon :icon="option.icon" class="h-6 w-6" />
                            <div class="flex flex-col text-start">
                                <span class="font-medium">{{ option.label }}</span>
                                <span class="text-xs text-[var(--muted-foreground)]">
                                    {{ option.value === 'ar' ? t('body.arabicDescription') : t('body.englishDescription') }}
                                </span>
                            </div>
                            <Motion
                                v-if="selectedValue === option.value"
                                :initial="{ scale: 0, opacity: 0 }"
                                :animate="{ scale: 1, opacity: 1 }"
                                :transition="{ duration: 0.2 }"
                                class="ms-auto"
                            >
                                <Icon icon="mdi:check-circle" class="h-5 w-5 text-[var(--primary)]" />
                            </Motion>
                        </button>
                    </div>
                </DrawerContent>
            </Drawer>
            <Select v-else v-model="selectedValue">
                <SelectTrigger
                    class="w-[180px] border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] dark:border-[var(--border)] dark:bg-[var(--background)] dark:text-[var(--foreground)]"
                >
                    <SelectValue :placeholder="t('body.selectPlaceholder')" />
                </SelectTrigger>
                <SelectContent class="border-[var(--border)] bg-[var(--background)] dark:border-[var(--border)] dark:bg-[var(--background)]">
                    <SelectItem
                        v-for="option in options"
                        :key="option.value"
                        :value="option.value"
                        class="text-[var(--foreground)] hover:bg-[var(--muted)] focus:bg-[var(--muted)] dark:text-[var(--foreground)] dark:hover:bg-[var(--muted)] dark:focus:bg-[var(--muted)]"
                    >
                        <div class="flex gap-2 rtl:flex-row-reverse">
                            <Icon :icon="option.icon" class="h-4 w-4" />
                            <span>{{ option.label }}</span>
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div v-else-if="tabs">
            <Tabs v-model="selectedValue">
                <TabsList
                    class="relative grid w-full grid-cols-2 border-[var(--border)] bg-[var(--muted)] dark:border-[var(--border)] dark:bg-[var(--muted)]"
                >
                    <TabsTrigger
                        v-for="tab in tabsList"
                        :key="tab.value"
                        :value="tab.value"
                        :title="tab.label"
                        class="relative z-10 flex items-center gap-2 text-center text-[var(--muted-foreground)] hover:bg-[var(--background)]/80 hover:text-[var(--foreground)] data-[state=active]:bg-[var(--background)] data-[state=active]:text-[var(--foreground)] dark:text-[var(--muted-foreground)] dark:hover:bg-[var(--background)]/80 dark:hover:text-[var(--foreground)] dark:data-[state=active]:bg-[var(--background)] dark:data-[state=active]:text-[var(--foreground)]"
                    >
                        <Icon :icon="tab.icon" class="h-4 w-4" />
                        <span>{{ tab.label }}</span>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    </div>
</template>

<i18n lang="json">
{
    "ar": {
        "body": {
            "language": "لغة العرض",
            "selectPlaceholder": "اختر لغة العرض",
            "loading": "جاري التحميل ...",
            "arabicDescription": "اللغة العربية الأصيلة",
            "englishDescription": "اللغة الإنجليزية العالمية"
        }
    },
    "en": {
        "body": {
            "language": "Language",
            "selectPlaceholder": "Choose preferred Language",
            "loading": "Loading ...",
            "arabicDescription": "Arabic language interface",
            "englishDescription": "English language interface"
        }
    }
}
</i18n>
