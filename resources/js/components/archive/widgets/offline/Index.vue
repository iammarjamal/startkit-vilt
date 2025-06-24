<script setup>
import { useOnline } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

import 'animate.css';

import Alert from '@/components/elements/alert/index.vue';

const props = defineProps({
    class: {
        type: String,
    },
});
const { t } = useI18n();
const online = useOnline();
</script>

<template>
    <Transition
        name="Offline"
        enter-active-class="animate__animated animate__slideInDown animate__faster"
        leave-active-class="animate__animated animate__slideOutUp animate__faster"
    >
        <div v-if="!online">
            <Alert
                :class="[
                    props.class,
                    'relative left-0 right-0 top-0 !z-50 !my-0 flex w-full flex-col justify-center !overflow-x-hidden !rounded-none !border-0 !text-center',
                ]"
                type="error"
            >
                {{ t('body.offline') }}
            </Alert>
        </div>
    </Transition>
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
