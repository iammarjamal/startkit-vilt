<!--
Usage:
<Theme icon />
<Theme inline />
<Theme tabs />
Props:
- icon: show as icon button
- inline: show as inline selector
- tabs: show as button group
-->

<script setup>
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppearance } from '@/composables/useAppearance';
import { Icon } from '@iconify/vue';
import { onLongPress } from '@vueuse/core';
import { Motion } from 'motion-v';

const { t } = useI18n();

const props = defineProps({
    icon: { type: Boolean, default: false },
    iconClass: { type: String, default: '' },
    inline: { type: Boolean, default: false },
    tabs: { type: Boolean, default: false },
});

const { appearance, updateAppearance } = useAppearance();

// Theme options for select
const options = [
    { value: 'light', label: t('body.lightMode'), icon: 'mdi:weather-sunny' },
    { value: 'system', label: t('body.autoMode'), icon: 'mdi:circle-half-full' },
    { value: 'dark', label: t('body.darkMode'), icon: 'mdi:weather-night' },
];

// Theme options for tabs
const tabsList = [
    { value: 'light', icon: 'mdi:weather-sunny', label: t('body.lightMode') },
    { value: 'dark', icon: 'mdi:weather-night', label: t('body.darkMode') },
    { value: 'system', icon: 'mdi:circle-half-full', label: t('body.autoMode') },
];

// Current theme icon
const themeIcon = computed(() => {
    if (appearance.value === 'system') return 'mdi:circle-half-full';
    return appearance.value === 'light' ? 'mdi:weather-sunny' : 'mdi:weather-night';
});

// Cycle through themes
const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'];
    const nextIndex = (themes.indexOf(appearance.value) + 1) % themes.length;
    updateAppearance(themes[nextIndex]);
};

// Long press to reset to system
const themeRef = ref();
onLongPress(themeRef, () => updateAppearance('system'));

// Reactive values for v-model
const selectedValue = ref(appearance.value);

// Watch for changes in appearance and update selectedValue
watch(appearance, (newValue) => {
    selectedValue.value = newValue;
});

// Watch for changes in selectedValue and update appearance
watch(selectedValue, (newValue) => {
    if (newValue && newValue !== appearance.value) {
        updateAppearance(newValue);
    }
});

// Check if mobile
const isMobile = ref(false);
onMounted(() => {
    isMobile.value = window.innerWidth < 768;
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768;
    });
});

// Drawer state
const drawerOpen = ref(false);
</script>

<template>
    <!-- Icon button mode -->
    <div v-if="icon" ref="themeRef" class="select-none">
        <Motion
            :initial="{ scale: 0.8, opacity: 0 }"
            :animate="{ scale: 1, opacity: 1 }"
            :whileHover="{ scale: 1.05 }"
            :whileTap="{ scale: 0.95 }"
            transition="{ duration: 0.3 }"
        >
            <button
                type="button"
                class="cursor-pointer rounded-md p-2 transition-colors hover:bg-[var(--muted)]/50 dark:hover:bg-[var(--muted)]/30"
                @click="cycleTheme"
                :title="t('body.theme')"
            >
                <Motion
                    :key="themeIcon"
                    :initial="{ rotate: -180, scale: 0.8 }"
                    :animate="{ rotate: 0, scale: 1 }"
                    :exit="{ rotate: 180, scale: 0.8 }"
                    transition="{ duration: 0.4, type: 'spring' }"
                >
                    <Icon
                        :icon="themeIcon"
                        class="h-5 w-5 text-[var(--foreground)] transition-colors dark:text-[var(--foreground)]"
                        :class="iconClass"
                    />
                </Motion>
            </button>
        </Motion>
    </div>

    <!-- Inline select mode -->
    <div v-else-if="inline" class="flex items-center justify-between">
        <Motion :initial="{ x: -20, opacity: 0 }" :animate="{ x: 0, opacity: 1 }" transition="{ duration: 0.5 }">
            <h1 class="text-right text-xl font-bold text-[var(--foreground)] dark:text-[var(--foreground)]">
                {{ t('body.theme') }}
            </h1>
        </Motion>

        <!-- Mobile: Drawer Select -->
        <Drawer v-if="isMobile" v-model:open="drawerOpen">
            <DrawerTrigger as-child>
                <button
                    class="flex w-[180px] items-center justify-between rounded-md border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] dark:border-[var(--border)] dark:bg-[var(--background)] dark:text-[var(--foreground)]"
                >
                    <div class="flex items-center gap-2 text-right">
                        <Icon :icon="options.find((opt) => opt.value === selectedValue)?.icon || 'mdi:theme-light-dark'" class="h-4 w-4" />
                        <span>{{ options.find((opt) => opt.value === selectedValue)?.label || t('body.selectPlaceholder') }}</span>
                    </div>
                    <Icon icon="mdi:chevron-down" class="h-4 w-4" />
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle class="flex items-center gap-2 text-right">
                        <Icon icon="mdi:theme-light-dark" class="h-5 w-5" />
                        {{ t('body.theme') }}
                    </DrawerTitle>
                </DrawerHeader>
                <div class="space-y-3 p-6">
                    <Motion
                        v-for="(option, index) in options"
                        :key="option.value"
                        :initial="{ x: 50, opacity: 0, scale: 0.9 }"
                        :animate="{ x: 0, opacity: 1, scale: 1 }"
                        :whileHover="{ scale: 1.02 }"
                        :whileTap="{ scale: 0.98 }"
                        :transition="{ delay: index * 0.1, duration: 0.3, type: 'spring' }"
                    >
                        <button
                            @click="
                                () => {
                                    selectedValue = option.value;
                                    drawerOpen = false;
                                }
                            "
                            :class="[
                                'flex w-full items-center gap-3 rounded-lg p-4 text-right transition-all duration-200',
                                'border-2 hover:border-[var(--primary)]/50',
                                selectedValue === option.value
                                    ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                                    : 'border-transparent text-[var(--foreground)] hover:bg-[var(--muted)] dark:text-[var(--foreground)] dark:hover:bg-[var(--muted)]',
                            ]"
                        >
                            <Motion :initial="{ rotate: -90 }" :animate="{ rotate: 0 }" transition="{ duration: 0.3, delay: index * 0.1 }">
                                <Icon :icon="option.icon" class="h-6 w-6" />
                            </Motion>
                            <div class="flex flex-col text-start">
                                <span class="font-medium">{{ option.label }}</span>
                                <span class="text-xs text-[var(--muted-foreground)]">
                                    {{
                                        option.value === 'light'
                                            ? t('body.lightDescription')
                                            : option.value === 'dark'
                                              ? t('body.darkDescription')
                                              : t('body.systemDescription')
                                    }}
                                </span>
                            </div>
                            <Motion
                                v-if="selectedValue === option.value"
                                :initial="{ scale: 0, opacity: 0 }"
                                :animate="{ scale: 1, opacity: 1 }"
                                transition="{ duration: 0.2 }"
                                class="ms-auto"
                            >
                                <Icon icon="mdi:check-circle" class="h-5 w-5 text-[var(--primary)]" />
                            </Motion>
                        </button>
                    </Motion>
                </div>
            </DrawerContent>
        </Drawer>

        <!-- Desktop: Regular Select -->
        <Select v-else v-model="selectedValue">
            <SelectTrigger
                class="w-[180px] border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] dark:border-[var(--border)] dark:bg-[var(--background)] dark:text-[var(--foreground)]"
            >
                <SelectValue :placeholder="t('body.selectPlaceholder')" />
            </SelectTrigger>
            <SelectContent class="border-[var(--border)] bg-[var(--background)] dark:border-[var(--border)] dark:bg-[var(--background)]">
                <Motion
                    v-for="(option, index) in options"
                    :key="option.value"
                    :initial="{ y: 10, opacity: 0 }"
                    :animate="{ y: 0, opacity: 1 }"
                    :transition="{ delay: index * 0.1 }"
                >
                    <SelectItem
                        :value="option.value"
                        class="text-[var(--foreground)] hover:bg-[var(--muted)] focus:bg-[var(--muted)] dark:text-[var(--foreground)] dark:hover:bg-[var(--muted)] dark:focus:bg-[var(--muted)]"
                    >
                        <div class="flex items-center gap-2 rtl:flex-row-reverse">
                            <Icon :icon="option.icon" class="h-4 w-4" />
                            <span>{{ option.label }}</span>
                        </div>
                    </SelectItem>
                </Motion>
            </SelectContent>
        </Select>
    </div>

    <!-- Tabs mode using UI components -->
    <div v-else-if="tabs">
        <Tabs v-model="selectedValue">
            <TabsList
                class="relative grid w-full grid-cols-3 border-[var(--border)] bg-[var(--muted)] dark:border-[var(--border)] dark:bg-[var(--muted)]"
            >
                <TabsTrigger
                    v-for="(tab, index) in tabsList"
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
</template>

<i18n lang="json">
{
    "ar": {
        "body": {
            "theme": "نمط العرض",
            "selectPlaceholder": "اختر نمط العرض",
            "lightMode": "النمط المضيء",
            "autoMode": "النمط التلقائي",
            "darkMode": "النمط الداكن",
            "lightDescription": "النمط المضيء وواضح",
            "darkDescription": "النمط الداكن ومريح للعين",
            "systemDescription": "يتكيف مع إعدادات النظام"
        }
    },
    "en": {
        "body": {
            "theme": "Theme",
            "selectPlaceholder": "Select Theme",
            "lightMode": "Light Mode",
            "autoMode": "Auto Mode",
            "darkMode": "Dark Mode",
            "lightDescription": "Light mode, clear and bright",
            "darkDescription": "Dark mode, easy on the eyes",
            "systemDescription": "Adapts to system settings"
        }
    }
}
</i18n>
