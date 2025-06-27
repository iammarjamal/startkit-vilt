<!--
Usage:
<NavFooter :items="itemsArray" />
Props:
- items: array of { title, href, icon }
-->
<script setup>
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Icon } from '@iconify/vue';

const props = defineProps({
    items: { type: Array, required: true },
    class: { type: String, default: '' },
});
</script>
<template>
    <SidebarGroup :class="['group-data-[collapsible=icon]:p-0', props.class]">
        <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem v-for="item in items" :key="item.title">
                    <SidebarMenuButton class="text-[var(--muted-foreground)] hover:text-[var(--foreground)]" as-child>
                        <a :href="item.href" target="_blank" rel="noopener noreferrer">
                            <Icon :icon="item.icon" class="h-4 w-4" />
                            <span>{{ item.title }}</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>
</template>
