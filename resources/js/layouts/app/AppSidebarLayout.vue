<script setup lang="ts">
import Content from '@/components/app/AppContent/index.vue';
import Shell from '@/components/app/AppShell/index.vue';
import Sidebar from '@/components/app/AppSidebar/index.vue';
import SidebarHeader from '@/components/app/AppSidebarHeader/index.vue';
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});
</script>

<template>
    <Shell variant="sidebar">
        <Sidebar />
        <Content variant="sidebar">
            <SidebarHeader :breadcrumbs="breadcrumbs" />
            <slot />
        </Content>
    </Shell>
</template>
