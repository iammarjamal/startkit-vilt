<script setup>
import { usePage } from '@inertiajs/vue3'
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
// Props
const props = defineProps({
    icon: { type: Boolean, default: false },
    iconClass: { type: String, default: "" },
    inline: { type: Boolean, default: false },
    inlineClass: { type: String, default: "" },
});

// نخزن اللغة في LocalStorage
const StorageLanguage = useStorage("language", usePage().props.app.locale);
StorageLanguage.value = usePage().props.app.locale;
// دالة لتغيير اللغة وتحديث المسار
const switchLanguage = (lang) => {
    // حدّد اللغة في i18n و storage
    locale.value = lang;
    StorageLanguage.value = lang;

    // نفصل المسار إلى أجزاء
    const segments = window.location.pathname.split("/").filter(Boolean);
    // العدّل الجزء الأوّل أو أضف إن لم يوجد
    if (segments.length > 0) {
        segments[0] = lang;
    } else {
        segments.unshift(lang);
    }
    // أعِد بناء المسار مع الحفاظ على search و hash
    const newPath = `/${segments.join("/")}${window.location.search}${
        window.location.hash
    }`;
    window.location.pathname = newPath;
};

// خيارات القائمة
const options = computed(() => [
    {
        value: "ar",
        label: "اللغة العربية",
        selected: StorageLanguage.value === "ar",
    },
    {
        value: "en",
        label: "English Language",
        selected: StorageLanguage.value === "en",
    },
]);

// v-model يعكس القيمة هنا
const selectOption = ref(StorageLanguage.value);

// كلما تغيّرت selectOption نوّن اللغة
watch(selectOption, (lang) => {
    switchLanguage(lang);
});
</script>

<template>
    <div>
        <!-- أيقونة التبديل -->
        <div v-if="icon">
            <a
                href="#"
                class="cursor-pointer"
                @click.prevent="
                    switchLanguage(StorageLanguage === 'ar' ? 'en' : 'ar')
                "
            >
                <UiIcon
                    icon="mdi:language"
                    class="text-2xl text-dark dark:text-light"
                />
            </a>
        </div>

        <!-- قائمة الاختيار المضمنة -->
        <div v-if="inline" :class="inlineClass">
            <div class="flex items-center justify-between">
                <h1 class="text-xl font-bold">{{ t("body.language") }}</h1>
                <UiSelect
                    :placeholder="t('body.selectPlaceholder')"
                    :options="options"
                    v-model="selectOption"
                />
            </div>
        </div>
    </div>
</template>

<i18n>
{
  "ar": {
    "body": {
      "language": "لغة العرض",
      "selectPlaceholder": "اختر لغة العرض"
    }
  },
  "en": {
    "body": {
      "language": "Language",
      "selectPlaceholder": "Choose preferred Language"
    }
  }
}
</i18n>
