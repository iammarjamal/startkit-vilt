<script setup lang="ts">
import Logo from '@/components/app/Logo/index.vue';
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <div class="flex min-h-screen flex-col items-center justify-center bg-[var(--background)] p-6">
        <div class="w-full max-w-sm">
            <div class="mb-8 flex justify-center">
                <Logo class="size-9 fill-current text-[var(--foreground)] dark:text-white" />
            </div>
            <slot />
        </div>
    </div>
</template>
