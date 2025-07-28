<script setup>
import { Skeleton } from '@/components/ui/skeleton';
import { can } from '@/composables/useCan';
import { Icon } from '@iconify/vue';
import { router, usePage } from '@inertiajs/vue3';
import { computed, defineProps } from 'vue';

const props = defineProps({
    isSidebarOpen: {
        type: Boolean,
        default: true,
    },
    type: {
        type: String,
        default: 'admin',
        validator: (value) => ['admin', 'dashboard', 'member', 'manager'].includes(value),
    },
});

const { t } = useI18n();
const page = usePage();
const isDesktop = useMediaQuery('(min-width: 768px)');
const emit = defineEmits(['toggleSidebar']);

// Navigate to the given URL
function navigateTo(url) {
    if (!isDesktop.value) {
        emit('toggleSidebar');
    }
    router.visit(url);
}

// isActive
function isSectionActive(routePath) {
    // Get base path from route and normalize
    const base = new URL(route(routePath), window.location.origin).pathname.replace(/\/+$/, '').toLowerCase();

    // Get current path and normalize
    const current = window.location.pathname.replace(/\/+$/, '').toLowerCase();

    // Return true if current equals base or starts with base + '/'
    return current === base || current.startsWith(base + '/');
}

// Navigation groups based on type
const navigationGroups = computed(() => {
    switch (props.type) {
        case 'admin':
            return [
                {
                    title: 'sidebar.general',
                    items: [
                        {
                            iconOutline: 'solar:home-angle-outline',
                            iconSolid: 'solar:home-smile-bold',
                            label: 'sidebar.admin',
                            url: 'admin.index',
                            isActive: route().current('admin.index'),
                            badge: null,
                        },
                    ],
                },
                {
                    title: 'sidebar.management',
                    items: [
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
                    ],
                },
                {
                    title: 'sidebar.financial',
                    items: [
                        {
                            iconOutline: 'iconoir:refresh-circle',
                            iconSolid: 'iconoir:refresh-circle-solid',
                            label: 'sidebar.subscription',
                            url: 'admin.subscription.index',
                            isActive: isSectionActive('admin.subscription.index'),
                            badge: null,
                        },
                    ],
                },
                {
                    title: 'sidebar.settings',
                    items: [
                        {
                            iconOutline: 'tdesign:activity',
                            iconSolid: 'tdesign:activity-filled',
                            label: 'sidebar.logs',
                            url: 'admin.logs.index',
                            isActive: isSectionActive('admin.logs.index'),
                            badge: null,
                        },
                    ],
                },
            ];

        case 'dashboard':
            return [
                {
                    title: 'sidebar.general',
                    can: can('index.*').value,
                    items: [
                        {
                            iconOutline: 'solar:home-angle-outline',
                            iconSolid: 'solar:home-smile-bold',
                            label: 'sidebar.dashboard',
                            url: 'dashboard.index',
                            isActive: route().current('dashboard.index'),
                            can: can('index.view').value,
                            badge: null,
                        },
                    ],
                },
                {
                    title: 'sidebar.management',
                    can: can(['branches.*', 'users.*', 'assets.*']).value,
                    items: [
                        {
                            iconOutline: 'ph:map-pin',
                            iconSolid: 'ph:map-pin-fill',
                            label: 'sidebar.branches',
                            url: 'dashboard.branches.index',
                            isActive: route().current('dashboard.branches.index'),
                            can: can('branches.*').value,
                            badge: null,
                        },
                        {
                            iconOutline: 'solar:users-group-rounded-line-duotone',
                            iconSolid: 'solar:users-group-rounded-bold',
                            label: 'sidebar.members',
                            url: 'dashboard.users.index',
                            isActive: route().current('dashboard.users.index'),
                            can: can('users.*').value,
                            badge: null,
                        },
                        {
                            iconOutline: 'solar:box-broken',
                            iconSolid: 'solar:box-bold',
                            label: 'sidebar.assets',
                            url: 'dashboard.assets.index',
                            isActive: route().current('dashboard.assets.index'),
                            can: can('assets.*').value,
                            badge: null,
                        },
                    ],
                },
                {
                    title: 'sidebar.settings',
                    can: can(['settings.*', 'subscriptions.*', 'logs.*']).value,
                    items: [
                        {
                            iconOutline: 'iconoir:refresh-circle',
                            iconSolid: 'iconoir:refresh-circle-solid',
                            label: 'sidebar.subscriptions',
                            url: 'dashboard.settings.subscription',
                            isActive: isSectionActive('dashboard.settings.subscription'),
                            can: can('subscriptions.*').value,
                            badge: null,
                        },
                        {
                            iconOutline: 'tdesign:activity',
                            iconSolid: 'tdesign:activity-filled',
                            label: 'sidebar.logs',
                            url: 'dashboard.settings.logs',
                            isActive: isSectionActive('dashboard.settings.logs'),
                            can: can('logs.*').value,
                            badge: null,
                        },
                    ],
                },
            ];
        default:
            return [];
    }
});
</script>

<template>
    <div class="scrollbar-none flex h-full w-full flex-1 flex-col items-center justify-start gap-y-6 overflow-y-scroll text-center">
        <!-- Loading Skeleton -->
        <div v-if="!navigationGroups && navigationGroups.length" class="w-full px-3">
            <div v-for="i in 6" :key="i" class="my-6">
                <Skeleton class="mb-3 h-4 w-20 bg-muted/50 dark:bg-muted" v-if="isSidebarOpen" />
                <div class="space-y-3">
                    <div v-for="j in 2" :key="j" class="flex items-center gap-2" :class="{ 'flex-col': !isSidebarOpen }">
                        <Skeleton class="h-6 w-6 rounded bg-muted/50 dark:bg-muted" />
                        <Skeleton v-if="isSidebarOpen" class="h-4 flex-1 bg-muted/50 dark:bg-muted" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Navigation Groups -->
        <div v-else v-for="group in navigationGroups" :key="group.title" v-show="group.can" class="relative flex w-full flex-col items-center justify-center">
            <div v-if="isSidebarOpen && group.can" class="mt-0 flex w-full items-center p-2 text-start text-xs font-medium text-muted-foreground">
                {{ t(group.title) }}
            </div>

            <ul class="mx-3 flex w-full flex-col items-center justify-center gap-y-3 text-start" :class="{ 'mt-3': !isSidebarOpen }">
                <li v-for="item in group.items" :key="item.label" class="w-full">
                    <button
                        :key="item.label"
                        v-show="item.can"
                        @click="navigateTo(route(item.url))"
                        :class="[
                            'flex w-full cursor-pointer items-center justify-start gap-2 rounded-[var(--radius-lg)] p-2 font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                            props.isSidebarOpen ? 'flex-row' : 'flex-col',
                            item.isActive ? 'bg-accent text-accent-foreground' : 'bg-transparent text-foreground',
                        ]"
                    >
                        <Icon :icon="item.isActive ? item.iconSolid : item.iconOutline" class="h-6 w-6 text-foreground" />
                        <Transition>
                            <span v-if="props.isSidebarOpen">
                                {{ t(item.label) }}
                            </span>
                        </Transition>
                        <Transition>
                            <span v-if="props.isSidebarOpen && item.badge" class="rounded-md bg-lime-400 px-1 py-px text-xs text-black">
                                {{ t(item.badge) }}
                            </span>
                        </Transition>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<i18n lang="json">
{
    "ar": {
        "sidebar": {
            "general": "عام",
            "dashboard": "الرئيسية",
            "management": "الإدارة",
            "branches": "الفروع",
            "assets": "الأصول",
            "members": "الأعضاء",
            "settings": "الإعدادات",
            "subscriptions": "الاشتراك",
            "logs": "الأنشطة",
            "admin": "لوحة التحكم",
            "users": "المستخدمون",
            "companies": "الشركات",
            "plans": "الباقات",
            "financial": "المالية",
            "subscription": "الاشتراك",
            "general_settings": "الإعدادات العامة",
            "api_keys": "مفاتيح API",
            "sessions": "الجلسات",
            "teams": "الفرق",
            "billing": "الفوترة",
            "workspace": "مساحة العمل",
            "my_sessions": "جلساتي"
        }
    },
    "en": {
        "sidebar": {
            "general": "General",
            "dashboard": "Dashboard",
            "management": "Management",
            "branches": "Branches",
            "assets": "Assets",
            "members": "Members",
            "settings": "Settings",
            "subscriptions": "Subscriptions",
            "logs": "Logs",
            "admin": "Control Panel",
            "users": "Users",
            "companies": "Companies",
            "plans": "Plans",
            "financial": "Financial",
            "subscription": "Subscription",
            "general_settings": "General Settings",
            "api_keys": "API Keys",
            "sessions": "Sessions",
            "teams": "Teams",
            "billing": "Billing",
            "workspace": "Workspace",
            "my_sessions": "My Sessions"
        }
    }
}
</i18n>
