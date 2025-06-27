<!--
Usage:
<Accordion>
  <AccordionItem title="Section 1">Content 1</AccordionItem>
  <AccordionItem title="Section 2">Content 2</AccordionItem>
</Accordion>
-->

<script setup>
import { defineProps, ref } from 'vue';

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
    <div :class="['relative mx-auto flex w-full max-w-md flex-col gap-y-2 rounded border border-[var(--border)] text-xs']" v-bind="$attrs">
        <slot :active-accordion="activeAccordion" :set-active-accordion="setActiveAccordion"></slot>
    </div>
</template>
