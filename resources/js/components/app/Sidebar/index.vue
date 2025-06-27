<!--
Usage:
<Sidebar />
This is a placeholder Sidebar component.
-->
<script setup>
import { useStorage } from '@vueuse/core';
import 'animate.css';
import { ref, watch } from 'vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
    },

    class: {
        type: String,
    },
});

const StorageLanguage = useStorage('language');

const isOpen = ref(props.isOpen);

watch(
    () => props.isOpen,
    (newVal) => {
        isOpen.value = newVal;
    },
);
</script>

<template>
    <Transition
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
        <div v-show="isOpen" @click="isOpen = false" class="fixed inset-0 z-20 bg-[var(--muted)]/70 transition-all duration-300 lg:hidden"></div>
    </Transition>

    <Transition
        :enter-active-class="
            StorageLanguage === 'en'
                ? 'animate__animated animate__slideInLeft animate__faster'
                : 'animate__animated animate__slideInRight animate__faster'
        "
        :leave-active-class="
            StorageLanguage === 'en'
                ? 'animate__animated animate__slideOutLeft animate__faster'
                : 'animate__animated animate__slideOutRight animate__faster'
        "
    >
        <aside
            v-show="isOpen"
            :class="[
                props.class,
                'scrollbar-hide fixed inset-y-0 start-0 z-40 m-0 h-full min-h-screen w-64 transform overflow-y-scroll border-e border-t-0 border-b-0 border-[var(--sidebar-border)] bg-[var(--sidebar)] transition-all md:w-72 lg:static lg:w-80 dark:border-[var(--sidebar-border)] dark:bg-[var(--sidebar)]',
            ]"
        >
            <slot></slot>
        </aside>
    </Transition>
</template>
