<script setup>
import { ref, computed, useAttrs } from 'vue';

const props = defineProps({
    title: String,
    class: {
        type: String,
        default: null,
    },
    classInActive: {
        type: String,
        default: 'border-transparent',
    },
    classActive: {
        type: String,
        default: 'border-secondary-light/60 dark:border-secondary-dark/60',
    },
    disabled: Boolean,
});

const attributes = useAttrs();
const activeAccordion = ref(null);
const id = ref(`accordion-${Math.random().toString(36).substring(2, 11)}`);

const itemClass = computed(() => ({
    [`${props.classActive} text-dark dark:text-light`]: activeAccordion.value === id.value,
    [`${props.classInActive} text-dark hover:text-dark/80 dark:text-light dark:hover:text-light/80`]: activeAccordion.value !== id.value,
    [props.class]: true,
}));

const buttonClass = computed(
    () =>
        `flex items-center justify-between cursor-pointer w-full px-5 py-4 font-semibold text-start select-none ${props.disabled ? 'opacity-25' : ''}`,
);

const setActiveAccordion = (accordionId) => {
    activeAccordion.value = activeAccordion.value === accordionId ? null : accordionId;
};
</script>

<template>
    <div @click="setActiveAccordion(id)" :class="itemClass" class="duration-200 ease-out border border-secondary-light dark:border-secondary-dark rounded-md cursor-pointer group" v-bind="attributes">
        <button :class="buttonClass" :disabled="disabled">
            <span class="font-bold">{{ title }}</span>
            <svg
                class="w-5 h-5 duration-300 ease-out transform"
                :class="{ '-rotate-45': activeAccordion === id }"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
            </svg>
        </button>
        <transition
            enter-active-class="transition-all duration-300 ease-in-out"
            leave-active-class="transition-all duration-300 ease-in-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="max-h-screen opacity-100"
            leave-from-class="max-h-screen opacity-100"
            leave-to-class="opacity-0 max-h-0"
        >
            <div v-show="activeAccordion === id" ref="accordionContent">
                <div class="p-5 pt-0 opacity-80">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>
