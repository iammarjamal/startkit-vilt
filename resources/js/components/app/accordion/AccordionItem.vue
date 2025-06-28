<!--
Usage:
<AppAccordionItem value="item-1">
  <AppAccordionTrigger>عنوان القسم</AppAccordionTrigger>
  <AppAccordionContent>محتوى القسم</AppAccordionContent>
</AppAccordionItem>

Props:
- value: unique identifier for the item
- disabled: disable the item
-->
<script setup>
const props = defineProps({
    value: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    class: { type: String, default: '' },
});

// Inject accordion context
const accordion = inject('accordion');

// Check if item is open
const isOpen = computed(() => accordion?.isItemOpen(props.value) || false);

// Toggle item
const toggle = () => {
    if (!props.disabled && accordion) {
        accordion.toggleItem(props.value);
    }
};

// Provide item context to child components
provide('accordionItem', {
    value: props.value,
    disabled: props.disabled,
    isOpen,
    toggle,
});
</script>

<template>
    <div :class="['border-b last:border-b-0', props.class]" :data-state="isOpen ? 'open' : 'closed'">
        <slot />
    </div>
</template>
