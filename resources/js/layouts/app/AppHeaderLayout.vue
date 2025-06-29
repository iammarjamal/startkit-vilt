<script setup lang="ts">
import Content from '@/components/app/AppContent/index.vue';
import Header from '@/components/app/AppHeader/index.vue';
import Shell from '@/components/app/AppShell/index.vue';
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <Shell class="flex-col">
        <Header :breadcrumbs="breadcrumbs" />
        <Content>
            <slot />
        </Content>
    </Shell>
</template>
