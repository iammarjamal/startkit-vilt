<!--
Usage:
<AppSidebar />
Shows the main application sidebar with navigation, footer, and user menu.
-->
<script setup>
import Link from '@/components/app/Link/index.vue';
import Logo from '@/components/app/Logo/index.vue';
import NavFooter from '@/components/app/NavFooter/index.vue';
import NavMain from '@/components/app/NavMain/index.vue';
import NavUser from '@/components/app/NavUser/index.vue';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

const mainNavItems = [{ title: 'Dashboard', href: '/dashboard', icon: 'lucide:layout-grid' }];

const footerNavItems = [
    { title: 'Github Repo', href: 'https://github.com/laravel/vue-starter-kit', icon: 'lucide:folder' },
    { title: 'Documentation', href: 'https://laravel.com/docs/starter-kits', icon: 'lucide:book-open' },
];
</script>
<template>
    <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link href="/dashboard">
                            <Logo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <NavMain :items="mainNavItems" />
        </SidebarContent>
        <SidebarFooter>
            <NavFooter :items="footerNavItems" />
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
