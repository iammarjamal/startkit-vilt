<script setup>
import { defineProps } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
    links: {
        type: Array,
        required: true
    }
});
</script>

<template>
    <nav class="flex justify-between">
        <ol
            class="inline-flex items-center mb-0 space-x-0.5 text-sm text-dark dark:text-light [&_.active-breadcrumb]:text-bg-dark [&_.active-breadcrumb]:font-medium sm:mb-0">
            <li v-for="(link, index) in links" :key="index" class="flex items-center h-full">
                <a :href="link.url" class="inline-flex items-center py-1.5 space-x-1 rounded-md hover:underline">
                    <span v-if="link.icon" class="mt-0.5">
                        <Icon :icon="link.icon" class="text-xl text-dark dark:text-light"></Icon>
                    </span>
                    <span v-if="link.text">{{ link.text }}</span>
                </a>
                <svg v-if="index !== links.length - 1" class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="none" stroke="none">
                        <path d="M10 8.013l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                </svg>
            </li>
        </ol>
    </nav>
</template>