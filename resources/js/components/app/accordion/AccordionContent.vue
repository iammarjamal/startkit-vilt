<!--
Usage:
<AppAccordionContent>
  محتوى القسم
</AppAccordionContent>

Props:
- class: additional CSS classes
-->
<script setup>
const props = defineProps({
    class: { type: String, default: '' },
});

// Inject accordion item context
const accordionItem = inject('accordionItem');

// Content height for animation
const contentHeight = ref(0);
const contentRef = ref(null);

// Update content height when content changes
const updateContentHeight = () => {
    if (contentRef.value) {
        contentHeight.value = contentRef.value.scrollHeight;
    }
};

// Watch for content changes and open state
watch(
    () => accordionItem?.isOpen,
    () => {
        nextTick(() => {
            updateContentHeight();
        });
    },
);

onMounted(() => {
    updateContentHeight();
});

// Watch for slot content changes
onUpdated(() => {
    updateContentHeight();
});
</script>

<template>
    <div
        ref="contentRef"
        :class="['overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down', props.class]"
        :data-state="accordionItem?.isOpen ? 'open' : 'closed'"
        :style="{
            maxHeight: accordionItem?.isOpen ? `${contentHeight}px` : '0px',
            transition: 'max-height 0.2s ease-in-out',
        }"
    >
        <div class="pt-0 pb-4">
            <slot />
        </div>
    </div>
</template>

<style scoped>
@keyframes accordion-down {
    from {
        height: 0;
    }
    to {
        height: var(--radix-accordion-content-height);
    }
}

@keyframes accordion-up {
    from {
        height: var(--radix-accordion-content-height);
    }
    to {
        height: 0;
    }
}

.animate-accordion-down {
    animation: accordion-down 0.2s ease-out;
}

.animate-accordion-up {
    animation: accordion-up 0.2s ease-out;
}
</style>
