<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'native'
    }
});

const types = {
    native: {
        bg: 'bg-light border border-secondary-dark-foreground dark:bg-dark dark:border-secondary-light-foreground',
        text: 'text-dark dark:text-light',
        icon: '<svg class="ms-0.5 w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" x2="20" y1="19" y2="19"></line></svg>',
    },
    primary: {
        bg: 'bg-primary-light border border-primary-dark dark:bg-primary-dark dark:border-primary-light',
        text: 'text-primary-light-foreground dark:text-primary-dark-foreground',
        icon: '<svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 12 12"><rect width="12" height="12" fill="none"/><path fill="currentColor" d="M3 5v1.5a.5.5 0 0 1-.053.224L2.31 8h7.382l-.638-1.276A.5.5 0 0 1 9 6.5V5a3 3 0 0 0-6 0m1 4H1.5a.5.5 0 0 1-.447-.724L2 6.382V5a4 4 0 1 1 8 0v1.382l.947 1.894A.5.5 0 0 1 10.5 9H8a2 2 0 1 1-4 0m3 0H5a1 1 0 0 0 2 0"/></svg>',
    },
    success: {
        bg: 'bg-success-light border border-success-dark dark:bg-success-dark dark:border-success-light',
        text: 'text-success-light-foreground dark:text-success-dark-foreground',
        icon: '<svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024"><rect width="1024" height="1024" fill="none"/><path fill="currentColor" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01m204.336-636.352L415.935 626.944l-135.28-135.28c-12.496-12.496-32.752-12.496-45.264 0c-12.496 12.496-12.496 32.752 0 45.248l158.384 158.4c12.496 12.48 32.752 12.48 45.264 0c1.44-1.44 2.673-3.009 3.793-4.64l318.784-320.753c12.48-12.496 12.48-32.752 0-45.263c-12.512-12.496-32.768-12.496-45.28 0"/></svg>',
    },
    warning: {
        bg: 'bg-warning-light border border-warning-dark dark:bg-warning-dark dark:border-warning-light',
        text: 'text-warning-light-foreground dark:text-warning-dark-foreground',
        icon: '<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>',
    },
    danger: {
        bg: 'bg-danger-light border border-danger-dark dark:bg-danger-dark dark:border-danger-light',
        text: 'text-danger-light-foreground dark:text-danger-dark-foreground',
        icon: '<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><rect width="512" height="512" fill="none"/><path fill="currentColor" fill-rule="evenodd" d="M256 42.667c117.803 0 213.334 95.53 213.334 213.333S373.803 469.334 256 469.334S42.667 373.803 42.667 256S138.197 42.667 256 42.667m0 42.667c-94.1 0-170.666 76.565-170.666 170.666c0 94.102 76.565 170.667 170.666 170.667c94.102 0 170.667-76.565 170.667-170.667c0-94.101-76.565-170.666-170.667-170.666m48.918 91.584l30.165 30.165L286.166 256l48.917 48.918l-30.165 30.165L256 286.166l-48.917 48.917l-30.165-30.165L225.835 256l-48.917-48.917l30.165-30.165L256 225.835z"/></svg>',
    },
};

const badge = computed(() => types[props.type] || types.native);

const bgClass = computed(() => badge.value.bg);
const textClass = computed(() => badge.value.text);
const iconSvg = computed(() => badge.value.icon);
</script>

<template>
    <span :class="`relative flex flex-row gap-x-2 px-1 items-center rounded ${bgClass} ${textClass} text-xs py-0.5 px-1 w-auto max-w-20`">
        <span v-html="iconSvg"></span>
        <span class="font-semibold"><slot /></span>
    </span>
</template>