<!--
Usage:
<AppAccordionTrigger>
  عنوان القسم
</AppAccordionTrigger>

Props:
- disabled: disable the trigger
-->
<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
    disabled: { type: Boolean, default: false },
    class: { type: String, default: '' },
});

// Inject accordion item context
const accordionItem = inject('accordionItem');

// Handle click
const handleClick = (event) => {
    if (!props.disabled && accordionItem) {
        accordionItem.toggle();
    }
};

// Handle keyboard events
const handleKeydown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick(event);
    }
};
</script>

<template>
    <div class="flex">
        <button
            type="button"
            :disabled="disabled || accordionItem?.disabled"
            @click="handleClick"
            @keydown="handleKeydown"
            :class="[
                'flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
                '[&[data-state=open]>svg]:rotate-180',
                props.class,
            ]"
            :data-state="accordionItem?.isOpen ? 'open' : 'closed'"
            role="button"
            :aria-expanded="accordionItem?.isOpen"
            :aria-disabled="disabled || accordionItem?.disabled"
        >
            <slot />
            <slot name="icon">
                <Icon
                    icon="mdi:chevron-down"
                    class="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200"
                />
            </slot>
        </button>
    </div>
</template>
