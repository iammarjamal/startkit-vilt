<!--
Usage:
<Breadcrumb :items="[{ label: 'Home', href: '/' }, { label: 'Page' }]" />
Props:
- items: array of { label, href }
-->
<script setup>
import Link from '@/components/app/Link/index.vue';

defineProps({
    prefix: {
        type: String,
        default: null,
    },
    prefix_url: {
        type: String,
        default: null,
    },
});
</script>

<template>
    <div class="mt-4 mb-5 grid place-content-start lg:grid-cols-2 lg:place-content-between">
        <div class="my-2">
            <p class="text-cairo text-3xl font-medium text-[var(--foreground)] dark:text-[var(--foreground)]"><slot /></p>
        </div>
        <div class="grid lg:place-content-end">
            <div class="mt-1 overflow-x-auto" aria-label="Breadcrumb">
                <ol role="list" class="flex items-center gap-1 text-sm text-[var(--muted-foreground)] dark:text-[var(--muted-foreground)]">
                    <li>
                        <a class="block text-base text-[var(--sidebar-foreground)] dark:text-[var(--sidebar-foreground)]">
                            <slot />
                        </a>
                    </li>
                    <li>/</li>
                    <li>
                        <Link
                            :href="prefix_url"
                            class="block text-base text-[var(--muted)] transition duration-150 ease-out hover:text-[var(--primary)] hover:ease-in"
                        >
                            <p>{{ prefix }}</p>
                        </Link>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>
