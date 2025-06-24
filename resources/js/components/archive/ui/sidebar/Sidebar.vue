<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import 'animate.css';

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/Components/ui/resizable';

const props = defineProps({
    isOpen: {
        type: Boolean
    },

    class: {
        type: String,
    }
});

const StorageLanguage = useStorage('language');

const isOpen = ref(props.isOpen);

watch(() => props.isOpen, (newVal) => {
    isOpen.value = newVal;
});
</script>

<template>
    <Transition enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster">
        <div v-show="isOpen" @click="isOpen = false"
            class="fixed inset-0 z-20 transition-all duration-300 bg-black/70 lg:hidden"></div>
    </Transition>

    <Transition
        :enter-active-class="StorageLanguage === 'en' ? 'animate__animated animate__slideInLeft animate__faster' : 'animate__animated animate__slideInRight animate__faster'"
        :leave-active-class="StorageLanguage === 'en' ? 'animate__animated animate__slideOutLeft animate__faster' : 'animate__animated animate__slideOutRight animate__faster'">
        <aside v-show="isOpen"
            :class="[props.class, 'fixed inset-y-0 z-40 w-64 min-h-screen m-0 h-full overflow-y-scroll scrollbar-hide transition-all transform border-t-0 border-b-0 border-e start-0 md:w-72 lg:w-80 bg-light dark:bg-dark border-secondary-light dark:border-secondary-dark lg:static']">
            <slot></slot>
        </aside>
    </Transition>
</template>