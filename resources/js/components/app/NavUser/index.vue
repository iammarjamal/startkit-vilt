<!--
Usage:
<NavUser :user="userObject" />
Props:
- user: user object { name, email, avatar }
-->
<script setup>
import UserInfo from '@/components/app/UserInfo/index.vue';
import UserMenuContent from '@/components/app/UserMenuContent/index.vue';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Icon } from '@iconify/vue';

const props = defineProps({
    user: { type: Object, required: true },
});
</script>
<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <SidebarMenuButton
                        size="lg"
                        class="data-[state=open]:bg-[var(--sidebar-accent)] data-[state=open]:text-[var(--sidebar-accent-foreground)]"
                    >
                        <UserInfo :user="user" />
                        <Icon icon="lucide:chevrons-up-down" class="ml-auto size-4" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="min-w-56 rounded-lg" side="bottom" align="end" :side-offset="4">
                    <UserMenuContent :user="user" />
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
