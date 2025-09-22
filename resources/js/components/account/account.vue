<script setup>
import { Icon } from '@iconify/vue';
import { router, usePage } from '@inertiajs/vue3';
import { motion } from 'motion-v';
import { useI18n } from 'vue-i18n';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

import Profile from '@/components/account/profile.vue';
import Switch from '@/components/account/switch.vue';
import Preferences from '@/components/app/Preferences/index.vue';

const { t } = useI18n();
const page = usePage();

const props = defineProps({
    isSidebarOpen: {
        type: Boolean,
        default: true,
    },
    // إضافة prop جديد للاستدعاء من navbar
    asIcon: {
        type: Boolean,
        default: false,
    },
    // إضافة prop للتحكم في عرض الجوال
    mobileView: {
        type: Boolean,
        default: false,
    },
});

const isProfileOpen = ref(false);
const isProfileDialogOpen = ref(false);
const isPreferencesOpen = ref(false);
const isSwitchOpen = ref(false);
const el = useTemplateRef('el');
const userInfoEl = useTemplateRef('userInfoEl');

// إضافة state للدرج في الجوال
const isDrawerOpen = ref(false);

const user = computed(() => page.props.auth.user);
const accounts = computed(() => page.props.auth.accounts || []);
const hasMultipleAccounts = computed(() => accounts.value.length > 1);

// التحقق من الجوال
const isMobile = ref(false);
onMounted(() => {
    isMobile.value = window.innerWidth < 768;
    window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768;
    });
});

onLongPress(
    userInfoEl,
    () => {
        if (hasMultipleAccounts.value) {
            isSwitchOpen.value = true;
            closeProfile();
        }
    },
    { delay: 500 },
);

function toggleProfile() {
    isProfileOpen.value = !isProfileOpen.value;
}

function closeProfile() {
    isProfileOpen.value = false;
}

onClickOutside(el, closeProfile);

const profileMenuItems = [
    {
        iconOutline: 'solar:user-linear',
        iconSolid: 'solar:user-bold',
        label: 'sidebar.account',
        action: 'edit-profile',
        isActive: false,
    },
    {
        iconOutline: 'weui:setting-outlined',
        iconSolid: 'weui:setting-filled',
        label: 'sidebar.preferences',
        action: 'preferences',
        isActive: false,
    },
    {
        iconOutline: 'solar:users-group-two-rounded-linear',
        iconSolid: 'solar:users-group-two-rounded-bold',
        label: 'sidebar.switchAccount',
        action: 'switch-account',
        isActive: false,
    },
];

const handleMenuItemClick = (item) => {
    if (item.action === 'edit-profile') {
        isProfileDialogOpen.value = true;
    } else if (item.action === 'preferences') {
        isPreferencesOpen.value = true;
    } else if (item.action === 'switch-account') {
        isSwitchOpen.value = true;
    }
    closeProfile();
    // إغلاق الدرج في الجوال
    if (isMobile.value || props.mobileView) {
        isDrawerOpen.value = false;
    }
};

function logout() {
    router.post(route('auth.logout'));
    if (isMobile.value || props.mobileView) {
        isDrawerOpen.value = false;
    }
    router.reload();
}
</script>

<template>
    <div v-if="asIcon">
        <Drawer v-if="isMobile || mobileView" v-model="isDrawerOpen">
            <DrawerTrigger as-child>
                <button class="flex flex-col items-center justify-center text-muted-foreground transition hover:text-primary">
                    <Icon icon="solar:user-linear" class="w-8 h-8" />
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle class="flex items-center gap-2 text-start mt-5 pb-5 border-b border-muted">
                        <img :src="'https://ui-avatars.com/api/?name=' + user.name" :alt="user.name" class="h-8 w-8 rounded-full object-cover" />
                        <div class="flex flex-col text-start">
                            <span class="font-semibold">{{ user.name }}</span>
                            <span class="text-sm text-muted-foreground">{{ user.email }}</span>
                        </div>
                    </DrawerTitle>
                </DrawerHeader>

                <!-- قائمة الخيارات كـ ul للجوال -->
                <div class="px-6 pb-6">
                    <ul class="space-y-2">
                        <li v-for="item in profileMenuItems" :key="item.label">
                            <button
                                @click="handleMenuItemClick(item)"
                                class="flex w-full items-center gap-3 rounded-lg p-3 text-start transition-all duration-200 hover:bg-accent hover:text-accent-foreground"
                            >
                                <Icon :icon="item.isActive ? item.iconSolid : item.iconOutline" class="h-5 w-5" />
                                <span>{{ t(item.label) }}</span>
                            </button>
                        </li>

                        <!-- فاصل -->
                        <li class="my-2">
                            <div class="bg-muted"></div>
                        </li>

                        <!-- تسجيل الخروج -->
                        <li>
                            <button
                                @click="logout()"
                                class="flex w-full items-center gap-3 rounded-lg p-3 text-start text-red-600 transition-all duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20"
                            >
                                <Icon icon="streamline:logout-1-remix" class="h-5 w-5" />
                                <span>{{ t('sidebar.logout') }}</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </DrawerContent>
        </Drawer>

        <button v-else @click="toggleProfile" class="flex flex-col items-center justify-center text-muted-foreground transition hover:text-primary">
            <Icon icon="solar:user-linear" class="w-8 h-8" />
        </button>
    </div>

    <div
        v-else
        ref="el"
        class="max-h-64 w-full min-w-12 mb-2.5 rounded-[var(--radius-lg)] border border-border bg-background p-1 dark:border-border dark:bg-background"
    >
        <ul class="flex w-full flex-col items-center">
            <li class="relative w-full">
                <button
                    ref="userInfoEl"
                    @click="toggleProfile"
                    :class="[
                        'mt-1 inline-flex w-full cursor-pointer flex-row items-center gap-x-3 rounded-[var(--radius-md)] text-sm',
                        isProfileOpen ? 'mt-4' : '',
                    ]"
                >
                    <motion.div
                        :initial="{ y: 0 }"
                        :animate="{ y: isProfileOpen ? -8 : 0 }"
                        class="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-[var(--radius-md)] bg-muted sm:h-10 sm:w-12"
                    >
                        <img :src="'https://ui-avatars.com/api/?name=' + user.name" :alt="user.name" class="h-full w-full object-cover" />
                    </motion.div>

                    <motion.div
                        v-if="props.isSidebarOpen"
                        :initial="{ opacity: 0 }"
                        :animate="{ opacity: 1 }"
                        :exit="{ opacity: 0 }"
                        :transition="{ duration: 0.3 }"
                    >
                        <div class="flex w-full flex-row items-start justify-start text-start">
                            <motion.div
                                :initial="{ y: 0 }"
                                :animate="{ y: isProfileOpen ? -8 : 0 }"
                                class="flex w-full flex-col items-start justify-start sm:max-w-[150px]"
                            >
                                <span class="w-full truncate leading-4 font-semibold">
                                    {{ user.name }}
                                </span>
                                <span class="w-full truncate text-left text-xs leading-4 text-muted-foreground">
                                    {{ user.email }}
                                </span>
                                <span v-if="hasMultipleAccounts" class="text-[10px] font-medium text-primary">
                                    {{ t('sidebar.multipleAccounts', { count: accounts.length }) }}
                                </span>
                            </motion.div>

                            <Icon v-if="props.isSidebarOpen" name="ph:caret-up-down-light" class="mt-1 text-2xl" />
                        </div>
                    </motion.div>
                </button>
            </li>

            <motion.div
                v-if="isProfileOpen"
                :initial="{ opacity: 0, y: -8 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -8 }"
                :transition="{ duration: 0.2 }"
                class="flex w-full flex-col justify-start"
            >
                <div class="-mx-1 my-1 h-px bg-muted" role="separator"></div>

                <div role="group">
                    <template v-for="item in profileMenuItems" :key="item.label">
                        <button
                            @click="handleMenuItemClick(item)"
                            :class="[
                                'flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground',
                                {
                                    'justify-center': !props.isSidebarOpen,
                                    'justify-start': props.isSidebarOpen,
                                },
                            ]"
                        >
                            <Icon :icon="item.isActive ? item.iconSolid : item.iconOutline" class="text-base" />
                            <span v-if="props.isSidebarOpen">{{ t(item.label) }}</span>
                        </button>
                    </template>
                </div>

                <div class="-mx-1 my-1 h-px bg-muted" role="separator"></div>

                <a
                    :class="[
                        '!text-danger-light dark:!text-danger-light flex cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1.5 text-sm hover:bg-accent',
                        {
                            'justify-center': !props.isSidebarOpen,
                            'justify-start': props.isSidebarOpen,
                        },
                    ]"
                    @click="logout()"
                >
                    <Icon icon="streamline:logout-1-remix" class="!text-danger-light dark:!text-danger-light text-base" />
                    <span v-if="props.isSidebarOpen">{{ t('sidebar.logout') }}</span>
                </a>
            </motion.div>
        </ul>
    </div>

    <!-- Profile Component -->
    <Profile v-model:open="isProfileDialogOpen" />

    <!-- Switch Component -->
    <Switch v-model:open="isSwitchOpen" />

    <!-- Preferences Component -->
    <Preferences v-model:open="isPreferencesOpen" />
</template>

<i18n lang="json">
{
    "ar": {
        "sidebar": {
            "account": "الحساب",
            "switchAccount": "تبديل الحساب",
            "preferences": "التفضيلات",
            "logout": "تسجيل الخروج",
            "longPressToSwitch": "اضغط مطولاً لتبديل الحساب",
            "multipleAccounts": "{count} حسابات"
        }
    },
    "en": {
        "sidebar": {
            "account": "Account",
            "switchAccount": "Switch Account",
            "preferences": "Preferences",
            "logout": "Logout",
            "longPressToSwitch": "Long press to switch account",
            "multipleAccounts": "{count} accounts"
        }
    }
}
</i18n>
