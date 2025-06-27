<!--
Usage:
<AppHeader :breadcrumbs="breadcrumbsArray" />
Props:
- breadcrumbs: array of breadcrumb items (optional)
-->
<script setup>
import Avatar from '@/components/app/Avatar/index.vue';
import Breadcrumbs from '@/components/app/Breadcrumbs/index.vue';
import Button from '@/components/app/Button/index.vue';
import Link from '@/components/app/Link/index.vue';
import Logo from '@/components/app/Logo/index.vue';
import UserMenuContent from '@/components/app/UserMenuContent/index.vue';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Icon } from '@iconify/vue';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    breadcrumbs: { type: Array, default: () => [] },
});

const page = usePage();
const auth = computed(() => page.props.auth);

const isCurrentRoute = computed(() => (url) => page.url === url);
const activeItemStyles = computed(() => (url) => (isCurrentRoute.value(url) ? 'text-[var(--foreground)] bg-[var(--accent)]' : ''));

const mainNavItems = [{ title: 'Dashboard', href: '/dashboard', icon: 'lucide:layout-grid' }];

const rightNavItems = [
    { title: 'Repository', href: 'https://github.com/laravel/vue-starter-kit', icon: 'lucide:folder' },
    { title: 'Documentation', href: 'https://laravel.com/docs/starter-kits', icon: 'lucide:book-open' },
];

function getInitials(name) {
    if (!name) return '';
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
}
</script>
<template>
    <div>
        <div class="border-b border-[var(--sidebar-border)]/80">
            <div class="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                <!-- Mobile Menu -->
                <div class="lg:hidden">
                    <Sheet>
                        <SheetTrigger as-child>
                            <Button type="ghost" size="icon" class="mr-2 h-9 w-9">
                                <Icon icon="lucide:menu" class="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" class="w-[300px] p-6">
                            <SheetTitle class="sr-only">Navigation Menu</SheetTitle>
                            <SheetHeader class="flex justify-start text-left">
                                <Logo iconOnly />
                            </SheetHeader>
                            <div class="flex h-full flex-1 flex-col justify-between space-y-4 py-6">
                                <nav class="-mx-3 space-y-1">
                                    <Link
                                        v-for="item in mainNavItems"
                                        :key="item.title"
                                        :href="item.href"
                                        class="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--accent)]"
                                        :class="activeItemStyles(item.href)"
                                    >
                                        <Icon v-if="item.icon" :icon="item.icon" class="h-5 w-5" />
                                        {{ item.title }}
                                    </Link>
                                </nav>
                                <div class="flex flex-col space-y-4">
                                    <a
                                        v-for="item in rightNavItems"
                                        :key="item.title"
                                        :href="item.href"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="flex items-center space-x-2 text-sm font-medium"
                                    >
                                        <Icon v-if="item.icon" :icon="item.icon" class="h-5 w-5" />
                                        <span>{{ item.title }}</span>
                                    </a>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <Link href="/dashboard" class="flex items-center gap-x-2">
                    <Logo />
                </Link>

                <!-- Desktop Menu -->
                <div class="hidden h-full lg:flex lg:flex-1">
                    <NavigationMenu class="ml-10 flex h-full items-stretch">
                        <NavigationMenuList class="flex h-full items-stretch space-x-2">
                            <NavigationMenuItem v-for="(item, index) in mainNavItems" :key="index" class="relative flex h-full items-center">
                                <Link :href="item.href">
                                    <NavigationMenuLink
                                        :class="[navigationMenuTriggerStyle(), activeItemStyles(item.href), 'h-9 cursor-pointer px-3']"
                                    >
                                        <Icon v-if="item.icon" :icon="item.icon" class="mr-2 h-4 w-4" />
                                        {{ item.title }}
                                    </NavigationMenuLink>
                                </Link>
                                <div
                                    v-if="isCurrentRoute(item.href)"
                                    class="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-[var(--primary)]"
                                ></div>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div class="ml-auto flex items-center space-x-2">
                    <div class="relative flex items-center space-x-1">
                        <Button type="ghost" size="icon" class="group h-9 w-9 cursor-pointer">
                            <Icon icon="lucide:search" class="size-5 opacity-80 group-hover:opacity-100" />
                        </Button>

                        <div class="hidden space-x-1 lg:flex">
                            <template v-for="item in rightNavItems" :key="item.title">
                                <TooltipProvider :delay-duration="0">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button type="ghost" size="icon" as-child class="group h-9 w-9 cursor-pointer">
                                                <a :href="item.href" target="_blank" rel="noopener noreferrer">
                                                    <span class="sr-only">{{ item.title }}</span>
                                                    <Icon :icon="item.icon" class="size-5 opacity-80 group-hover:opacity-100" />
                                                </a>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{{ item.title }}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </template>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button
                                type="ghost"
                                size="icon"
                                class="relative size-10 w-auto rounded-full p-1 focus-within:ring-2 focus-within:ring-[var(--primary)]"
                            >
                                <Avatar class="size-8 overflow-hidden rounded-full">
                                    <img v-if="auth.user.avatar" :src="auth.user.avatar" :alt="auth.user.name" />
                                    <span
                                        v-else
                                        class="flex h-full w-full items-center justify-center rounded-lg bg-[var(--muted)] font-semibold text-[var(--foreground)]"
                                    >
                                        {{ getInitials(auth.user?.name) }}
                                    </span>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" class="w-56">
                            <UserMenuContent :user="auth.user" />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>

        <div v-if="props.breadcrumbs.length > 1" class="flex w-full border-b border-[var(--sidebar-border)]/70">
            <div class="mx-auto flex h-12 w-full items-center justify-start px-4 text-[var(--muted-foreground)] md:max-w-7xl">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </div>
        </div>
    </div>
</template>
