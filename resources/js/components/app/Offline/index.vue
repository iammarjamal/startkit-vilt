<!--
Usage:
<Offline />
Shows an alert when the device is offline.
-->
<script setup>
import { useOnline } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    class: {
        type: String,
    },
});
const { t } = useI18n();
const online = useOnline();
</script>

<template>
    <div v-if="!online">
        <div
            :class="[
                props.class,
                'relative top-0 right-0 left-0 !z-50 !my-0 flex w-full flex-col justify-center !overflow-x-hidden !rounded-none !border-0 bg-[var(--destructive)] !text-center text-[var(--destructive-foreground)]',
            ]"
            type="error"
        >
            {{ t('body.offline') }}
        </div>
    </div>
</template>

<i18n>
    {
        "ar": {
            "body": {
                "offline": "الجهاز غير متصل بالإنترنت",
            }
        },
        "en": {
            "body": {
                "offline": "The device is not connected to the Internet",
            }
        }
    }
</i18n>
