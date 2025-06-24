<script setup>
import { Link } from '@inertiajs/vue3';
const { $attrs } = defineProps();
</script>

<template>
    <Link v-bind="$attrs">
        <slot></slot>
    </Link>
</template>
