<script setup>
import { usePage } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';

import Language from '@/components/app/Language/index.vue';
import Logo from '@/components/app/Logo/index.vue';
import Theme from '@/components/app/Theme/index.vue';

const { t } = useI18n();
const url = usePage().props.app.url;

const props = defineProps({
    title: {
        type: String,
        required: false,
    },
    desc: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        default: 'side',
        validator: (value) => ['side', 'full'].includes(value),
    },
});
</script>

<template>
    <App :title="props.title" :desc="props.desc">
        <div :class="['min-h-screen w-full', props.type === 'side' ? 'lg:grid lg:grid-cols-2' : 'flex items-center justify-center']">
            <!-- Left Section -->
            <div class="flex h-screen w-full flex-col items-center justify-center gap-6 px-4 sm:h-full sm:px-0">
                <div class="flex w-full max-w-md flex-col items-center justify-center">
                    <Logo type="logo" />
                </div>

                <div class="xs:border-none flex w-full max-w-md items-center justify-center rounded-2xl py-16 sm:border">
                    <div class="w-full max-w-sm min-h-xl max-h-xl h-xl">
                        <slot />
                    </div>
                </div>

                <div class="flex w-full max-w-md items-center justify-between gap-x-1 px-2 pt-1">
                    <div class="text-start text-sm leading-5 text-balance text-muted-foreground">
                        {{ t('body.agree') }}
                        <a class="underline hover:text-primary" href="/terms">{{ t('body.terms') }}</a>
                        {{ t('body.and') }}
                        <a class="underline hover:text-primary" href="/privacy">{{ t('body.privacy') }}</a>
                    </div>
                    <div class="flex flex-row items-center gap-x-2">
                        <Theme icon />
                        <Language icon />
                    </div>
                </div>
            </div>

            <!-- Right Section (Visible only in 'side' type) -->
            <div v-if="props.type === 'side'" class="hidden bg-muted lg:block dark:bg-muted/20">
                <div class="p-86">
                    <img
                        :src="url + '/assets/images/icons/icon.webp'"
                        alt="Wosul Logo"
                        class="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    </App>
</template>

<i18n lang="json">
{
    "en": {
        "body": {
            "agree": "By continuing, you agree to our",
            "terms": "Terms of Service",
            "and": "and",
            "privacy": "Privacy Policy"
        }
    },
    "ar": {
        "body": {
            "agree": "بالمتابعة ، فإنك توافق على",
            "terms": "شروط الخدمة",
            "and": "و",
            "privacy": "سياسة الخصوصية"
        }
    }
}
</i18n>
