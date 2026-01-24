<script setup>
import { Icon } from '@iconify/vue';

import Account from '@/components/account/account.vue';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Logo } from '@/components/ui/logo';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import Sidebar from '@/components/panel/sidebar.vue';
import Navbar from '@/components/panel/navbar.vue';
import App from '@/layouts/app.vue';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

const props = defineProps({
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    type: {
        type: String,
        default: 'admin',
        validator: (value) => ['admin', 'dashboard', 'member', 'manager'].includes(value),
    },
});

const isDesktop = useMediaQuery('(min-width: 768px)');
const isSidebarOpen = useStorage('isSidebarOpen', true);

function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<template>
    <App :title="props.title" :desc="props.desc">
        <div class="mb-16 scrollbar-none flex h-full max-h-screen min-h-screen w-full flex-row overflow-hidden bg-background text-foreground md:mb-0">
            <!-- Desktop Sidebar -->
            <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="ltr:-translate-x-full rtl:translate-x-full opacity-0"
                enter-to-class="translate-x-0 opacity-100"
                leave-active-class="transition-all duration-300 ease-out"
                leave-from-class="translate-x-0 opacity-100"
                leave-to-class="ltr:-translate-x-full rtl:translate-x-full opacity-0"
            >
                <aside
                    v-if="isDesktop"
                    :class="[
                        'flex-shrink-0 transition-all duration-300 ease-out',
                        isSidebarOpen ? 'w-64' : 'w-16',
                        'mb-2 min-h-screen p-2 leading-6',
                    ]"
                >
                    <nav class="flex h-full w-full flex-col items-center justify-center">
                        <!-- Header For Sidebar -->
                        <div class="mb-2 flex w-full flex-row items-center justify-between gap-2 overflow-x-hidden md:justify-center">
                            <div
                                class="mx-1 flex w-full flex-col items-center justify-center transition-all duration-300"
                                :class="!isSidebarOpen ? 'mt-5 mb-3' : 'mt-0.5 mb-0'"
                            >
                                <Logo :type="!isSidebarOpen ? 'icon' : 'logo'" />
                            </div>
                        </div>
                        <!-- Header For Sidebar -->

                        <!-- Sidebar -->
                        <Sidebar :type="props.type" :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />
                        <!-- Sidebar -->

                        <!-- Account -->
                        <Account :isSidebarOpen="isSidebarOpen" />
                        <!-- Account -->
                    </nav>
                </aside>
            </Transition>
            <!-- Desktop Sidebar -->

            <!-- Mobile Drawer -->
            <Drawer v-if="!isDesktop" v-model:open="isSidebarOpen">
                <DrawerContent class="h-full w-full rounded-none border-0 bg-background">
                    <div class="mt-6 flex h-full min-h-96 flex-col p-4">
                        <!-- Navigation -->
                        <div class="scrollbar-none flex-1 overflow-y-scroll">
                            <Sidebar :type="props.type" :isSidebarOpen="true" @toggleSidebar="toggleSidebar" />
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
            <!-- Mobile Drawer -->

            <!-- Main Content -->
            <div
                class="flex flex-1 flex-col overflow-hidden bg-background text-foreground transition-all duration-300 ease-out"
                :class="[
                    'xs:border-none xs:border-none sm:border md:m-4 md:ms-0 md:me-0 md:rounded-2xl md:rounded-e-none md:border',
                    isDesktop ? (isSidebarOpen ? 'md:ml-0' : 'md:ml-0') : '',
                ]"
            >
                <!-- Header -->
                <header class="flex h-10 flex-shrink-0 items-center border-b border-border py-8 dark:border-border" v-if="isDesktop">
                    <div class="flex w-full items-center gap-4 px-4 md:px-6">
                        <button
                            @click="toggleSidebar()"
                            class="inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                            data-sidebar="trigger"
                        >
                            <Icon
                                :icon="isSidebarOpen ? 'mynaui:panel-left-close' : 'mynaui:panel-left-open'"
                                class="h-5 w-5 text-foreground transition-transform duration-200"
                            />
                        </button>
                        <div
                            data-orientation="vertical"
                            aria-orientation="vertical"
                            role="separator"
                            class="relative h-4 w-px shrink-0 bg-border"
                        ></div>
                        <nav aria-label="breadcrumb" class="flex w-full flex-row justify-between">
                            <ol class="flex flex-wrap items-center gap-1.5 text-sm break-words text-foreground sm:gap-2.5">
                                <li class="inline-flex items-center gap-1.5">
                                    <span role="link" aria-disabled="true" aria-current="page" class="text-lg font-normal">{{ props.title }}</span>
                                </li>
                            </ol>
                            <ol class="mt-1.5 inline-flex items-center justify-center gap-x-4">
                                <li>
                                    <ThemeSwitcher icon />
                                </li>
                            </ol>
                        </nav>
                    </div>
                </header>
                <!-- Header -->

                <!-- Body -->
                <div class="scrollbar-none min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4 pb-24 sm:pb-0 lg:p-6">
                    <h1 class="mt-2 mb-8 text-3xl font-bold text-foreground" v-if="!isDesktop">{{ props.title }}</h1>
                    <slot />
                </div>
                <!-- Body -->

                <!-- Footer -->
                <Navbar :type="props.type" :isSidebarOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" v-if="!isDesktop" />
                <!-- Footer -->
            </div>
            <!-- Main Content -->
        </div>
    </App>
</template>
