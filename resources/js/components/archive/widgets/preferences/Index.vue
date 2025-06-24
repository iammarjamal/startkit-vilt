<script setup>
import { useI18n } from 'vue-i18n';
import Modal from '@/Components/element/Modal/Modal.vue';
import Theme from '@/Components/widget/Theme/Theme.vue';
import Language from '@/Components/widget/Language/Language.vue';

const { t } = useI18n();
</script>

<template>
    <Modal>
        <template #button>
            <slot></slot>
        </template>

        <template #title>
            <h1>{{ t('body.title') }}</h1>
        </template>

        <template #desc>
            <p>{{ t('body.desc') }}</p>
        </template>

        <template #body>
            <div class="flex flex-col gap-y-3">
                <div class="py-2 pb-5 border-b border-secondary-light dark:border-secondary-dark">
                    <Language inline />
                </div>
                <div class="py-2">
                    <Theme inline />
                </div>
            </div>
        </template>
    </Modal>
</template>

<i18n>
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