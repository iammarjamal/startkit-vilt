<template>
    <div :class="['max-w-sm rounded bg-light/30 dark:bg-dark/30 border border-secondary-light-foreground dark:border-secondary-dark-foreground', customClass || 'p-2']">
        <slot></slot>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    class: {
        type: String,
        default: ''
    }
})

const customClass = props.class
</script>