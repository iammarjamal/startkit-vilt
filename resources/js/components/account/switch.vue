<script setup>
import { Icon } from '@iconify/vue';
import { router, usePage } from '@inertiajs/vue3';
import { Motion } from 'motion-v';
import { useI18n } from 'vue-i18n';
import { useMediaQuery } from '@vueuse/core';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';

import Auth from '@/components/account/auth.vue';

const { t } = useI18n();
const page = usePage();

// Computed properties for user data and UI state
const currentUser = computed(() => page.props.auth.user);
const accounts = computed(() => page.props.auth.accounts || []); // Ensure accounts defaults to an empty array
const isDesktop = useMediaQuery('(min-width: 768px)'); // Determines if it's a desktop view
const open = ref(false); // Controls the visibility of the Dialog/Drawer
const showAuth = ref(false); // Controls whether to show the account list or the Auth component
const isLoading = ref(false); // Controls the splash screen visibility
const isUser = ref('');
// Computed properties for active and inactive accounts based on 'active' property
const activeAccount = computed(() => accounts.value.find(acc => acc.active));
const otherAccounts = computed(() => accounts.value.filter(acc => !acc.active));


const switchTo = (email) => {
    open.value = false;
    isLoading.value = true;
    isUser.value = email;

    router.get(
        route('account.auth.switch', email),
        {},
        {
            preserveState: false,
            onSuccess: () => {
                isLoading.value = false;
                isUser.value = '';
                router.reload();
            },
            onError: (errors) => {
                console.error('Error switching account:', errors);
                isLoading.value = false;
                isUser.value = '';
                open.value = true;
            },
        },
    );
};

/**
 * Shows the authentication component for adding a new account.
 */
const goToLogin = () => {
    showAuth.value = true;
};

/**
 * Returns to the accounts list view from the authentication component.
 */
const goBackToAccounts = () => {
    showAuth.value = false;
};

/**
 * Handles successful authentication (e.g., after adding a new account).
 * Closes the dialog/drawer and resets the auth view.
 */
const handleAuthSuccess = () => {
    open.value = false; // Close the overall dialog/drawer
    showAuth.value = false; // Reset to show account list
    // Inertia will automatically reload props for the current page,
    // reflecting the newly added account if it's part of the 'accounts' prop.
    router.reload({ only: ['auth.user', 'auth.accounts'] }); // Explicitly reload relevant props
};

/**
 * Generates the avatar URL for a given account.
 * Prioritizes an existing avatar URL if available, otherwise uses ui-avatars.com.
 * @param {object} account - The account object.
 * @returns {string} The URL for the account's avatar.
 */
const getAvatarUrl = (account) => {
    return account.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(account.name)}&background=6366f1&color=ffffff&size=128`;
};

/**
 * Extracts initials from a given name.
 * @param {string} name - The full name of the account.
 * @returns {string} The capitalized initials (up to 2 characters).
 */
const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase().slice(0, 2);
};
</script>

<template>
    <Dialog v-if="isDesktop" :open="open">
        <DialogTrigger as-child>
            <slot />
        </DialogTrigger>
        <DialogContent class="gap-0 p-0 sm:max-w-lg">
            <DialogHeader v-if="!showAuth" class="p-6 pb-4">
                <DialogTitle class="flex items-center gap-3 text-xl">
                    <div class="rounded-lg bg-primary/10 p-2">
                        <Icon icon="lucide:users" class="h-5 w-5 text-primary" />
                    </div>
                    {{ t('switch.title') }}
                </DialogTitle>
                <DialogDescription class="text-base text-muted-foreground">
                    {{ t('switch.description') }}
                </DialogDescription>
            </DialogHeader>

            <div v-if="!showAuth" class="px-6 pb-6">
                <div class="max-h-lg">
                    <div class="space-y-3">
                        <div v-if="activeAccount" class="space-y-2">
                            <div class="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Icon icon="lucide:user-check" class="h-4 w-4" />
                                {{ t('switch.currentAccount') }}
                            </div>
                            <Motion
                                :key="activeAccount.email"
                                :initial="{ opacity: 0, scale: 0.95 }"
                                :animate="{ opacity: 1, scale: 1 }"
                                :transition="{ duration: 0.2 }"
                            >
                                <div class="relative rounded-xl border-2 border-primary/20 bg-primary/5 p-4">
                                    <div class="flex items-center gap-4">
                                        <div class="relative">
                                            <Avatar class="h-12 w-12 ring-2 ring-primary/20">
                                                <AvatarImage :src="getAvatarUrl(activeAccount)" :alt="activeAccount.name" />
                                                <AvatarFallback class="bg-primary font-semibold text-primary-foreground">
                                                    {{ getInitials(activeAccount.name) }}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div class="absolute -end-1 -top-1 h-4 w-4 rounded-full border-2 border-background bg-green-500"></div>
                                        </div>
                                        <div class="min-w-0 flex-1">
                                            <div class="flex items-center gap-2">
                                                <h3 class="truncate font-semibold text-foreground">{{ activeAccount.name }}</h3>
                                                <Badge class="bg-green-500 text-xs hover:bg-green-500">
                                                    {{ t('switch.active') }}
                                                </Badge>
                                            </div>
                                            <p class="truncate text-sm text-muted-foreground">{{ activeAccount.email }}</p>
                                        </div>
                                        <Icon icon="lucide:check-circle" class="h-5 w-5 flex-shrink-0 text-primary" />
                                    </div>
                                </div>
                            </Motion>
                        </div>

                        <div v-if="otherAccounts.length > 0" class="overflow-y-scroll scrollbar-none space-y-2">
                            <Separator class="my-4" />
                            <div class="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Icon icon="lucide:users" class="h-4 w-4" />
                                {{ t('switch.otherAccounts') }}
                            </div>
                            <Motion
                                v-for="(account, index) in otherAccounts"
                                :key="account.email"
                                :initial="{ opacity: 0, y: 20 }"
                                :animate="{ opacity: 1, y: 0 }"
                                :transition="{ duration: 0.3, delay: index * 0.1 }"
                            >
                                <Button
                                    variant="ghost"
                                    class="group h-auto w-full justify-start p-4 transition-all duration-200 hover:bg-muted/50"
                                    @click="switchTo(account.email)"
                                >
                                    <div class="flex w-full items-center gap-4">
                                        <Avatar class="h-10 w-10 transition-transform group-hover:scale-105">
                                            <AvatarImage :src="getAvatarUrl(account)" :alt="account.name" />
                                            <AvatarFallback class="bg-muted text-muted-foreground">
                                                {{ getInitials(account.name) }}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div class="min-w-0 flex-1 text-start">
                                            <div class="truncate font-medium text-foreground transition-colors group-hover:text-primary">
                                                {{ account.name }}
                                            </div>
                                            <div class="truncate text-sm text-muted-foreground">
                                                {{ account.email }}
                                            </div>
                                        </div>
                                        <Icon
                                            :icon="isLoading && isUser === account.email ? 'lucide:refresh-cw' : 'lucide:arrow-right'"
                                            :class="[
                                                'h-4 w-4',
                                                isLoading && isUser === account.email ? 'animate-spin text-primary' : 'text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary rtl:rotate-180'
                                            ]"
                                        />
                                    </div>
                                </Button>
                            </Motion>
                        </div>
                    </div>
                </div>

                <div class="mt-6 border-t pt-4">
                    <Button
                        variant="outline"
                        class="group h-12 w-full gap-3 transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                        @click="goToLogin"
                    >
                        <span class="font-medium">{{ t('switch.addAccount') }}</span>
                        <Icon icon="lucide:plus" class="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div v-else class="p-6">
                <Auth @authSuccess="handleAuthSuccess" @goBack="goBackToAccounts" :withoutButtonLogin="true" />
            </div>
        </DialogContent>
    </Dialog>

    <Drawer v-else :open="open">
        <DrawerTrigger as-child>
            <slot />
        </DrawerTrigger>
        <DrawerContent class="max-h-[85vh]">
            <DrawerHeader v-if="!showAuth" class="pb-4 text-start">
                <DrawerTitle class="flex items-center gap-3 text-xl">
                    <div class="rounded-lg bg-primary/10 p-2">
                        <Icon icon="lucide:users" class="h-5 w-5 text-primary" />
                    </div>
                    {{ t('switch.title') }}
                </DrawerTitle>
                <DrawerDescription class="text-base text-muted-foreground">
                    {{ t('switch.description') }}
                </DrawerDescription>
            </DrawerHeader>

            <div v-if="!showAuth" class="px-4 pb-6">
                <div class="max-h-[60vh]">
                    <div class="space-y-4">
                        <div v-if="activeAccount" class="space-y-3">
                            <div class="flex items-center gap-2 px-2 text-sm font-medium text-muted-foreground">
                                <Icon icon="lucide:user-check" class="h-4 w-4" />
                                {{ t('switch.currentAccount') }}
                            </div>
                            <Motion
                                :key="activeAccount.email"
                                :initial="{ opacity: 0, scale: 0.95 }"
                                :animate="{ opacity: 1, scale: 1 }"
                                :transition="{ duration: 0.2 }"
                            >
                                <div class="relative rounded-xl border-2 border-primary/20 bg-primary/5 p-4">
                                    <div class="flex items-center gap-4">
                                        <div class="relative">
                                            <Avatar class="h-14 w-14 ring-2 ring-primary/20">
                                                <AvatarImage :src="getAvatarUrl(activeAccount)" :alt="activeAccount.name" />
                                                <AvatarFallback class="bg-primary text-lg font-semibold text-primary-foreground">
                                                    {{ getInitials(activeAccount.name) }}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div class="absolute -end-1 -top-1 h-5 w-5 rounded-full border-2 border-background bg-green-500"></div>
                                        </div>
                                        <div class="min-w-0 flex-1">
                                            <div class="mb-1 flex items-center gap-2">
                                                <h3 class="truncate font-semibold text-foreground">{{ activeAccount.name }}</h3>
                                                <Badge class="bg-green-500 text-xs hover:bg-green-500">
                                                    {{ t('switch.active') }}
                                                </Badge>
                                            </div>
                                            <p class="truncate text-sm text-muted-foreground">{{ activeAccount.email }}</p>
                                        </div>
                                        <Icon icon="lucide:check-circle" class="h-6 w-6 flex-shrink-0 text-primary" />
                                    </div>
                                </div>
                            </Motion>
                        </div>

                        <div v-if="otherAccounts.length > 0" class="overflow-y-scroll scrollbar-none space-y-3">
                            <Separator class="my-4" />
                            <div class="flex items-center gap-2 px-2 text-sm font-medium text-muted-foreground">
                                <Icon icon="lucide:users" class="h-4 w-4" />
                                {{ t('switch.otherAccounts') }}
                            </div>
                            <Motion
                                v-for="(account, index) in otherAccounts"
                                :key="account.email"
                                :initial="{ opacity: 0, x: -20 }"
                                :animate="{ opacity: 1, x: 0 }"
                                :transition="{ duration: 0.3, delay: index * 0.1 }"
                            >
                                <Button
                                    variant="ghost"
                                    class="group h-auto w-full justify-start p-4 transition-all duration-200 hover:bg-muted/50"
                                    @click="switchTo(account.email)"
                                >
                                    <div class="flex w-full items-center gap-4">
                                        <Avatar class="h-12 w-12 transition-transform group-hover:scale-105">
                                            <AvatarImage :src="getAvatarUrl(account)" :alt="account.name" />
                                            <AvatarFallback class="bg-muted text-muted-foreground">
                                                {{ getInitials(account.name) }}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div class="min-w-0 flex-1 text-start">
                                            <div class="truncate font-medium text-foreground transition-colors group-hover:text-primary">
                                                {{ account.name }}
                                            </div>
                                            <div class="truncate text-sm text-muted-foreground">
                                                {{ account.email }}
                                            </div>
                                        </div>
                                        <Icon
                                            :icon="isLoading && isUser === account.email ? 'lucide:refresh-cw' : 'lucide:arrow-right'"
                                            :class="[
                                                'h-4 w-4',
                                                isLoading && isUser === account.email ? 'animate-spin text-primary' : 'text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary rtl:rotate-180'
                                            ]"
                                        />
                                    </div>
                                </Button>
                            </Motion>
                        </div>
                    </div>
                </div>

                <div class="mt-6 border-t pt-4">
                    <Button
                        variant="outline"
                        class="group h-14 w-full gap-3 transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                        @click="goToLogin"
                    >
                        <div class="rounded-md bg-primary/10 p-2 transition-colors group-hover:bg-primary-foreground/20">
                            <Icon icon="lucide:plus" class="h-5 w-5" />
                        </div>
                        <span class="text-base font-medium">{{ t('switch.addAccount') }}</span>
                    </Button>
                </div>
            </div>

            <div v-else class="p-4">
                <Auth @authSuccess="handleAuthSuccess" @goBack="goBackToAccounts" :withoutButtonLogin="true" />
            </div>
        </DrawerContent>
    </Drawer>
</template>

<i18n lang="json">
{
    "ar": {
        "switch": {
            "title": "تبديل الحساب",
            "description": "اختر حساباً مسجلاً للتبديل إليه أو أضف حساباً جديداً",
            "currentAccount": "الحساب الحالي",
            "otherAccounts": "الحسابات الأخرى",
            "addAccount": "إضافة حساب جديد",
            "active": "نشط"
        }
    },
    "en": {
        "switch": {
            "title": "Switch Account",
            "description": "Choose a registered account to switch to or add a new one",
            "currentAccount": "Current Account",
            "otherAccounts": "Other Accounts",
            "addAccount": "Add New Account",
            "active": "Active"
        }
    }
}
</i18n>
