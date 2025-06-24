import { ref, computed, watch } from "vue";
import { usePage } from "@inertiajs/vue3";
import { useI18n } from "vue-i18n";
import { useStorage } from "@vueuse/core";

export function useLanguage() {
    const { t, locale } = useI18n();
    const initial = usePage().props.app.locale;
    const storage = useStorage("language", initial);
    storage.value = initial;

    const options = computed(() => [
        {
            value: "ar",
            label: t("body.language_ar"),
            selected: storage.value === "ar",
        },
        {
            value: "en",
            label: t("body.language_en"),
            selected: storage.value === "en",
        },
    ]);

    const switchLanguage = (lang) => {
        locale.value = lang;
        storage.value = lang;

        const segments = window.location.pathname.split("/").filter(Boolean);
        if (segments.length) segments[0] = lang;
        else segments.unshift(lang);

        const newPath = `/${segments.join("/")}${window.location.search}${
            window.location.hash
        }`;
        window.location.pathname = newPath;
    };

    const selected = ref(storage.value);
    watch(selected, switchLanguage);

    return {
        t,
        locale,
        options,
        selected,
        switchLanguage,
    };
}
