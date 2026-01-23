<script setup>
import { useI18n } from 'vue-i18n';
import { ref } from 'vue'; // Import ref for v-model:open
import { useMediaQuery } from '@vueuse/core'; // Import useMediaQuery

// Import the specific components from your UI library
// Assuming these are the paths to your Dialog and Drawer components
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerTrigger } from '@/components/ui/drawer';

import Theme from '@/components/app/Theme/index.vue';
import Language from '@/components/app/Language/index.vue';

const { t } = useI18n();

// Reactive variable to control the open state of the dialog/drawer
const isOpen = ref(false);

// Determine if the screen is desktop size
// Adjust the breakpoint (768px) as per your project's definition of desktop
const isDesktop = useMediaQuery('(min-width: 768px)');
</script>

<template>
    <Dialog v-if="isDesktop" :open="isOpen">
        <DialogTrigger as-child>
            <slot></slot>
        </DialogTrigger>

        <DialogContent class="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>{{ t('body.title') }}</DialogTitle>
                <DialogDescription>
                    {{ t('body.desc') }}
                </DialogDescription>
            </DialogHeader>

            <div class="flex flex-col gap-y-3">
                <div class="border-b border-[var(--border)] py-2 pb-5 dark:border-[var(--border)]">
                    <Language inline />
                </div>
                <div class="py-2">
                    <Theme inline />
                </div>
            </div>
        </DialogContent>
    </Dialog>

    <Drawer v-else :open="isOpen">
        <DrawerTrigger as-child>
            <slot></slot>
        </DrawerTrigger>

        <DrawerContent>
            <DrawerHeader class="mt-3 text-start">
                <DrawerTitle>{{ t('body.title') }}</DrawerTitle>
                <DrawerDescription>
                    {{ t('body.desc') }}
                </DrawerDescription>
            </DrawerHeader>

            <div class="mb-7 flex flex-col gap-y-3 px-4 pb-4">
                <div class="border-b border-[var(--border)] py-2 pb-5 dark:border-[var(--border)]">
                    <Language inline />
                </div>
                <div class="py-2">
                    <Theme inline />
                </div>
            </div>
        </DrawerContent>
    </Drawer>
</template>

<i18n lang="json">
{
    "ar": {
        "body": {
            "title": "التفضيلات",
            "desc": "تفضيلات المستخدم لتخصيص التجربة داخل التطبيق."
        }
    },
    "en": {
        "body": {
            "title": "Preferences",
            "desc": "User preferences to customize the experience within the app."
        }
    }
}
</i18n>
