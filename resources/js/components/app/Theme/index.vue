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

const shouldAnimate = ref(false);

const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'];
    const nextIndex = (themes.indexOf(appearance.value) + 1) % themes.length;
    shouldAnimate.value = true;
    updateAppearance(themes[nextIndex]);
    setTimeout(() => {
        shouldAnimate.value = false;
    }, 600);
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
        shouldAnimate.value = true;
        updateAppearance(newValue);
        setTimeout(() => {
            shouldAnimate.value = false;
        }, 600);
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

const animationProps = computed(() => {
    if (appearance.value === 'system') {
        return {
            initial: { scale: 0.5, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.5, opacity: 0 },
            transition: { duration: 0.4, type: 'spring' },
        };
    } else if (appearance.value === 'dark') {
        return {
            initial: { rotate: -180, opacity: 0 },
            animate: { rotate: 0, opacity: 1 },
            exit: { rotate: 180, opacity: 0 },
            transition: { duration: 0.4, type: 'spring' },
        };
    } else {
        // light
        return {
            initial: { rotate: -180, opacity: 0 },
            animate: { rotate: 0, opacity: 1 },
            exit: { rotate: 180, opacity: 0 },
            transition: { duration: 0.4, type: 'spring' },
        };
    }
});
</script>

<template>
    <!-- Icon button mode -->
    <div v-if="icon" ref="themeRef" class="select-none">
        <button
            type="button"
            class="cursor-pointer rounded-md p-2 transition-colors hover:bg-[var(--muted)]/50 dark:hover:bg-[var(--muted)]/30"
            @click="cycleTheme"
            :title="t('body.theme')"
        >
            <Motion v-if="shouldAnimate" :key="themeIcon" v-bind="animationProps">
                <Icon :icon="themeIcon" class="h-5 w-5 text-[var(--foreground)] transition-colors dark:text-[var(--foreground)]" :class="iconClass" />
            </Motion>
            <Icon
                v-else
                :icon="themeIcon"
                class="h-5 w-5 text-[var(--foreground)] transition-colors dark:text-[var(--foreground)]"
                :class="iconClass"
            />
        </button>
    </div>

    <!-- Inline select mode -->
    <div v-else-if="inline" class="flex items-center justify-between">
        <h1 class="text-start text-xl font-bold text-[var(--foreground)] dark:text-[var(--foreground)]">
            {{ t('body.theme') }}
        </h1>
        <!-- Mobile: Drawer Select -->
        <Drawer v-if="isMobile" v-model:open="drawerOpen">
            <DrawerTrigger as-child>
                <button
                    class="flex w-[180px] items-center justify-between rounded-md border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] dark:border-[var(--border)] dark:bg-[var(--background)] dark:text-[var(--foreground)]"
                >
                    <div class="flex items-center gap-2 text-start">
                        <Icon :icon="options.find((opt) => opt.value === selectedValue)?.icon || 'mdi:theme-light-dark'" class="h-4 w-4" />
                        <span>{{ options.find((opt) => opt.value === selectedValue)?.label || t('body.selectPlaceholder') }}</span>
                    </div>
                    <Icon icon="mdi:chevron-down" class="h-4 w-4" />
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle class="flex items-center gap-2 text-start">
                        <Icon icon="mdi:theme-light-dark" class="h-5 w-5" />
                        {{ t('body.theme') }}
                    </DrawerTitle>
                </DrawerHeader>
                <div class="flex w-full flex-col items-center justify-start space-y-3 p-6">
                    <button
                        v-for="(option, index) in options"
                        :key="option.value"
                        @click="
                            () => {
                                selectedValue = option.value;
                                drawerOpen = false;
                            }
                        "
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
                <SelectItem
                    v-for="(option, index) in options"
                    :key="option.value"
                    :value="option.value"
                    class="text-[var(--foreground)] hover:bg-[var(--muted)] focus:bg-[var(--muted)] dark:text-[var(--foreground)] dark:hover:bg-[var(--muted)] dark:focus:bg-[var(--muted)]"
                >
                    <div class="flex items-center gap-2 rtl:flex-row-reverse">
                        <Icon :icon="option.icon" class="h-4 w-4" />
                        <span>{{ option.label }}</span>
                    </div>
                </SelectItem>
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
