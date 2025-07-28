<script setup>
import Icon from '@/components/app/Icon/index.vue';
import Account from '@/components/account/account.vue';
import { router } from '@inertiajs/vue3';
import { useStorage } from '@vueuse/core';
import { computed, ref, onMounted } from 'vue';
import { Skeleton } from '@/components/ui/skeleton';
import { can } from '@/composables/useCan';

const isSidebarOpen = useStorage('isSidebarOpen', true);

// Props
const props = defineProps({
    type: {
        type: String,
        default: 'admin',
        validator: (value) => ['admin', 'dashboard', 'member', 'manger'].includes(value),
    },
});

// Emits
const emit = defineEmits(['toggleSidebar']);

// Navigate to route
function navigateTo(item) {
    router.visit(route(item.url));
}

// Check if section is active based on current path
function isSectionActive(routePath) {
    const base = new URL(route(routePath), window.location.origin).pathname.replace(/\/+$/, '').toLowerCase();
    const current = window.location.pathname.replace(/\/+$/, '').toLowerCase();
    return current === base || current.startsWith(base + '/');
}

// Navigation groups based on type
const navigationGroups = computed(() => {
    switch (props.type) {
        case 'admin':
            return [
                {
                    iconOutline: 'solar:home-angle-outline',
                    iconSolid: 'solar:home-smile-bold',
                    label: 'sidebar.dashboard',
                    url: 'admin.index',
                    isActive: route().current('admin.index'),
                    badge: null,
                },
                {
                    iconOutline: 'solar:users-group-rounded-line-duotone',
                    iconSolid: 'solar:users-group-rounded-bold',
                    label: 'sidebar.users',
                    url: 'admin.users.index',
                    isActive: isSectionActive('admin.users.index'),
                    badge: null,
                },
                {
                    iconOutline: 'mynaui:building-one',
                    iconSolid: 'mynaui:building-one-solid',
                    label: 'sidebar.companies',
                    url: 'admin.companies.index',
                    isActive: isSectionActive('admin.companies.index'),
                    badge: null,
                },
                {
                    iconOutline: 'material-symbols:browse-outline',
                    iconSolid: 'material-symbols:browse',
                    label: 'sidebar.plans',
                    url: 'admin.plans.index',
                    isActive: isSectionActive('admin.plans.index'),
                    badge: null,
                },
            ];

        case 'dashboard':
            return [
            {
                            iconOutline: 'solar:home-angle-outline',
                            iconSolid: 'solar:home-smile-bold',
                            label: 'sidebar.dashboard',
                            url: 'dashboard.index',
                            isActive: route().current('dashboard.index'),
                            can: can('index.view').value,
                            badge: null,
                        },
            ];

        case 'manger':
            return [
                {
                    iconOutline: 'solar:home-angle-outline',
                    iconSolid: 'solar:home-smile-bold',
                    label: 'sidebar.dashboard',
                    url: 'manger.index',
                    isActive: route().current('manger.index'),
                    badge: null,
                },
                {
                    iconOutline: 'solar:users-group-rounded-line-duotone',
                    iconSolid: 'solar:users-group-rounded-bold',
                    label: 'sidebar.users',
                    url: 'manger.users.index',
                    isActive: isSectionActive('manger.users.index'),
                    badge: null,
                },
                {
                    iconOutline: 'mynaui:building-one',
                    iconSolid: 'mynaui:building-one-solid',
                    label: 'sidebar.companies',
                    url: 'manger.companies.index',
                    isActive: isSectionActive('manger.companies.index'),
                    badge: null,
                },
                {
                    iconOutline: 'material-symbols:browse-outline',
                    iconSolid: 'material-symbols:browse',
                    label: 'sidebar.plans',
                    url: 'manger.plans.index',
                    isActive: isSectionActive('manger.plans.index'),
                    badge: null,
                },
            ];

        case 'member':
            return [
                {
                    iconOutline: 'lucide:home',
                    iconSolid: 'lucide:home',
                    label: 'sidebar.home',
                    url: 'member.index',
                    isActive: route().current('member.index'),
                    badge: null,
                },
                {
                    iconOutline: 'lucide:search',
                    iconSolid: 'lucide:search',
                    label: 'sidebar.search',
                    url: 'member.search',
                    isActive: route().current('member.search'),
                    badge: null,
                },
                {
                    iconOutline: 'lucide:plus',
                    iconSolid: 'lucide:plus',
                    label: 'sidebar.add',
                    url: 'member.add',
                    isActive: route().current('member.add'),
                    badge: null,
                    isCenter: true,
                },
                {
                    iconOutline: 'lucide:bell',
                    iconSolid: 'lucide:bell',
                    label: 'sidebar.notifications',
                    url: 'member.notifications',
                    isActive: route().current('member.notifications'),
                    badge: null,
                },
            ];

        default:
            return [];
    }
});

const items = computed(() => navigationGroups.value);
const isOdd = computed(() => items.value.length % 2 === 0);
const middleIndex = computed(() => Math.floor(items.value.length / 2));
</script>

<template>
    <footer class="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background shadow-md dark:border-border dark:bg-background">
        <!-- Loading Skeleton -->
        <div v-if="!navigationGroups && navigationGroups.length" class="flex h-16 items-center justify-around px-4">
            <div v-for="i in (type === 'member' ? 5 : 4)" :key="i" class="flex flex-col items-center justify-center">
                <Skeleton class="h-8 w-8 rounded-full" />
            </div>
        </div>

        <!-- Navigation -->
        <nav v-else class="relative flex h-16 items-center justify-around">
            <template v-for="(item, index) in items" :key="index">
                <!-- Center FAB for member type -->
                <template v-if="type === 'member' && item.isCenter">
                    <button
                        @click="navigateTo(item)"
                        class="absolute -top-6 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-primary text-primary-foreground shadow-lg transition hover:scale-105 dark:border-border dark:text-foreground"
                    >
                        <Icon :name="item.isActive ? item.iconSolid : item.iconOutline" class="text-3xl" />
                    </button>
                </template>

                <!-- Center button for other types -->
                <template v-else-if="type !== 'member' && index === middleIndex">
                    <button
                        @click="navigateTo(item)"
                        :class="[
                            'flex flex-col items-center justify-center transition',
                            isOdd
                                ? 'text-muted-foreground hover:text-primary'
                                : 'absolute -top-6 left-1/2 z-10 h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-primary text-primary-foreground shadow-lg hover:scale-105 dark:border-border dark:text-foreground',
                        ]"
                    >
                        <Icon :name="item.isActive ? item.iconSolid : item.iconOutline" :class="[isOdd ? 'w-6 h-6' : 'w-8 h-8']" />
                    </button>
                </template>

                <!-- Normal buttons -->
                <button
                    v-else-if="!item.isCenter"
                    @click="navigateTo(item)"
                    :class="[
                        'flex flex-col items-center justify-center transition hover:text-primary',
                        item.isActive ? 'text-primary' : 'text-muted-foreground',
                        type === 'member' ? 'text-3xl' : 'w-8 h-8'
                    ]"
                >
                    <Icon
                        :name="item.isActive ? item.iconSolid : item.iconOutline"
                        :class="type === 'member' ? 'text-3xl' : 'w-8 h-8'"
                    />
                </button>
            </template>

            <!-- Account component as icon (always shown) -->
            <Account as-icon :mobile-view="true" />

            <!-- Menu toggle button -->
            <button
                @click="emit('toggleSidebar')"
                class="flex flex-col items-center justify-center text-muted-foreground transition hover:text-primary"
            >
                <Icon
                    :name="isSidebarOpen ? 'iconamoon:close-light' : 'charm:menu-hamburger'"
                    :class="[
                        'transition-all ltr:scale-x-[-1]',
                        type === 'member' ? 'text-3xl' : 'w-8 h-8'
                    ]"
                />
            </button>
        </nav>
    </footer>
</template>
