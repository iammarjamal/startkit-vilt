<!--
Usage:
<Paragraph size="md">Text here</Paragraph>
<Paragraph title="Title" description="Description" />
Props:
- size: xs | sm | md | lg | xl | 2xl | 3xl | 4xl
- title: paragraph title (optional)
- description: paragraph description (optional)
- class: custom classes
- Uses theme variables for color
-->
<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    size: { type: String, default: 'md' },
    class: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
});

// Paragraph size classes
const sizeClass = computed(() => {
    switch (props.size) {
        case 'xs':
            return 'text-xs md:text-sm lg:text-md xl:text-lg';
        case 'sm':
            return 'text-sm md:text-md lg:text-lg xl:text-xl';
        case 'md':
            return 'text-md md:text-lg lg:text-xl xl:text-2xl';
        case 'lg':
            return 'text-lg md:text-xl lg:text-2xl xl:text-3xl';
        case 'xl':
            return 'text-xl md:text-2xl lg:text-3xl xl:text-4xl';
        case '2xl':
            return 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl';
        case '3xl':
            return 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl';
        case '4xl':
            return 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl';
        default:
            return 'text-md md:text-lg lg:text-xl xl:text-2xl';
    }
});
</script>

<template>
    <div v-if="title || description">
        <h3 v-if="title" class="mb-0.5 text-base font-medium text-[var(--foreground)]">{{ title }}</h3>
        <p v-if="description" class="text-sm text-[var(--muted-foreground)]">{{ description }}</p>
    </div>
    <p v-else :class="['text-[var(--muted-foreground)]', sizeClass, props.class]">
        <slot />
    </p>
</template>
