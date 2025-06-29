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
    <div class="flex min-h-screen">
        <!-- Left side - Image/Branding -->
        <div class="hidden w-1/2 bg-[var(--primary)] lg:block">
            <div class="flex h-full items-center justify-center">
                <div class="text-center text-white">
                    <Logo class="mr-2 size-8 fill-current text-white" />
                    <h1 class="mt-4 text-2xl font-bold">مرحباً بك</h1>
                    <p class="mt-2 text-sm opacity-90">سجل دخولك للوصول إلى لوحة التحكم</p>
                </div>
            </div>
        </div>

        <!-- Right side - Form -->
        <div class="flex w-full flex-col justify-center bg-[var(--background)] p-6 lg:w-1/2">
            <div class="mx-auto w-full max-w-sm">
                <slot />
            </div>
        </div>
    </div>
</template>
