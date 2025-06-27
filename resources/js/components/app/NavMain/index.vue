<!--
Usage:
<NavMain :items="itemsArray" />
Props:
- items: array of { title, href, icon }
-->
<script setup>
import Link from '@/components/app/Link/index.vue';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Icon } from '@iconify/vue';
import { usePage } from '@inertiajs/vue3';

const props = defineProps({
    items: { type: Array, required: true },
});
const page = usePage();
</script>
<template>
    <SidebarGroup class="px-2 py-0">
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton as-child :is-active="item.href === page.url">
                    <Link :href="item.href">
                        <Icon :icon="item.icon" class="h-4 w-4" />
                        <span>{{ item.title }}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>
