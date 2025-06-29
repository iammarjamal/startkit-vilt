<!--
Usage:
<Preferences />
Shows a modal for user preferences (theme, language, etc).
-->
<script setup>
import { useI18n } from 'vue-i18n';
import Modal from '@/components/ui/dialog/index.vue';
import Theme from '@/components/app/Theme/index.vue';
import Language from '@/components/app/Language/index.vue';

const { t } = useI18n();
</script>

<template>
    <Modal>
        <template #button>
            <slot></slot>
        </template>

        <template #title>
            <h1 class="text-[var(--primary)]">{{ t('body.title') }}</h1>
        </template>

        <template #desc>
            <p class="text-[var(--muted-foreground)]">{{ t('body.desc') }}</p>
        </template>

        <template #body>
            <div class="flex flex-col gap-y-3">
                <div class="py-2 pb-5 border-b border-[var(--border)] dark:border-[var(--border)]">
                    <Language inline />
                </div>
                <div class="py-2">
                    <Theme inline />
                </div>
            </div>
        </template>
    </Modal>
</template>

<i18n lang="json">
{
    "ar": {
        "body": {
            "title": "التفضيلات",
            "desc": "تفضيلات المستخدم لتخصيص التجربة داخل التطبيق."
        }
    },
    "en": {
        "body": {
            "title": "Preferences",
            "desc": "User preferences to customize the experience within the app."
        }
    }
}
</i18n>
