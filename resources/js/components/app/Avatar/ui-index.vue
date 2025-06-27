<script setup>
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import { useAttrs, defineProps } from 'vue';

const props = defineProps({
    src: {
        type: String,
        default: null
    },
    icon: {
        type: Boolean,
        default: false
    },
    text: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: null
    },
    size: {
        type: String,
        default: 'xs'
    }
});

const attributes = useAttrs();

const statusColors = {
    success: 'bg-success-light',
    warning: 'bg-warning-light',
    danger: 'bg-danger-light'
};

const sizeClasses = {
    xs: 'w-10 h-10',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
};

const textSizes = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl'
};

const statusSizeMap = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
};

const statusColor = computed(() => statusColors[props.status] || '');
const sizeClass = computed(() => sizeClasses[props.size] || sizeClasses['xs']);
const textSize = computed(() => textSizes[props.size] || textSizes['xs']);
const statusSize = computed(() => statusSizeMap[props.size] || statusSizeMap['xs']);
</script>

<template>
    <div :class="['relative', sizeClass]" v-bind="attributes">
        <div :class="['relative flex items-center justify-center overflow-hidden rounded-full border border-secondary-light dark:border-secondary-dark', sizeClass]" x-cloak>
            <img v-if="src" class="object-cover rounded-full" :src="src" alt="Avatar" loading="lazy" width="100%" height="100%">
            <Icon v-else-if="icon" :icon="icon" :class="[textSize, 'text-dark dark:text-light']"></Icon>
            <span v-else-if="text" :class="['font-bold', textSize, 'text-dark dark:text-light']">{{ text }}</span>
        </div>
        <span v-if="status" :class="['absolute bottom-0.5 ltr:right-0.5 rtl:left-0.5 border rounded-full border-secondary-light dark:border-secondary-dark', statusColor, statusSize]"></span>
    </div>
</template>
