<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    active: {
        type: String,
        default: null,
    },
});

const activeAccordion = ref(`accordion-${props.active}`);

function setActiveAccordion(id) {
    activeAccordion.value = activeAccordion.value === id ? '' : id;
}
</script>

<template>
    <div
        :class="['flex flex-col gap-y-2 relative border border-secondary-light-forgeground dark:border-secondary-dark-forgeground rounded w-full max-w-md mx-auto text-xs']"
        v-bind="$attrs"
    >
        <slot :active-accordion="activeAccordion" :set-active-accordion="setActiveAccordion"></slot>
    </div>
</template>
