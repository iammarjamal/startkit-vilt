<script setup>
import Select from "@/components/ui/select/index.vue";

const { t } = useI18n();

const props = defineProps({
    icon: {
        type: Boolean,
        default: false,
    },
    iconClass: {
        type: String,
        default: "",
    },
    inline: {
        type: Boolean,
        default: false,
    },
    inlineClass: {
        type: String,
        default: "",
    },
});

const internalIcon = ref(props.icon);
const mode = useColorMode({
    storageKey: "useTheme",
});
const isMode = useStorage("useTheme");

const themeRef = ref();
onLongPress(themeRef, () => (mode.value = "auto"));

const selectOption = ref(isMode.value); // ربطه بـ isMode بشكل مباشر
watch(selectOption, (value) => {
    mode.value = value; // تحديث mode عند تغيير القيمة في select
    isMode.value = value; // تحديث isMode أيضاً عند تغيير القيمة
});

const options = computed(() => [
  {
    value: "light",
    label: t("body.lightMode"),
    selected: isMode.value === "light",
  },
  {
    value: "auto",
    label: t("body.autoMode"),
    selected: isMode.value === "auto",
  },
  {
    value: "dark",
    label: t("body.darkMode"),
    selected: isMode.value === "dark",
  },
]);
</script>

<template>
    <div
        v-if="internalIcon"
        ref="themeRef"
        @click="mode = mode === 'dark' ? 'light' : 'dark'"
        class="select-none"
    >
        <a href="#" class="cursor-pointer">
            <UiIcon
                :icon="
                    isMode === 'auto'
                        ? 'radix-icons:half-2'
                        : isMode === 'light'
                        ? 'mynaui:sun'
                        : isMode === 'dark'
                        ? 'mynaui:moon'
                        : 'radix-icons:half-2'
                "
                class="text-dark dark:text-light text-2xl"
                :class="iconClass"
            />
        </a>
    </div>

    <div v-if="inline" class="flex items-center justify-between">
        <h1 class="text-xl font-bold">{{ t("body.theme") }}</h1>
        <Select
            :placeholder="t('body.selectPlaceholder')"
            :options="options"
            :selected="isMode"
            v-model="selectOption"
            :key="isMode"
        />
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
