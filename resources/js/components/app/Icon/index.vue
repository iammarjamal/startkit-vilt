<!--
Usage:
<Icon name="mdi:home" size="24" />
<Icon name="lucide:user" size="16" />
Props:
- name: icon name (iconify format like 'mdi:home', 'lucide:user')
- size: icon size
- class: custom classes
-->
<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
    name: { type: String, required: true },
    class: { type: String, default: '' },
    size: { type: [Number, String], default: 16 },
});
</script>
<template>
    <Icon :icon="props.name" :class="props.class" :width="props.size" :height="props.size" />
</template>
