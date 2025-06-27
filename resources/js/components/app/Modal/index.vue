<!--
Usage:
<Modal v-model="showModal">
  <template #title>Title</template>
  <template #body>Body content</template>
</Modal>
Props:
- v-model: show/hide modal
-->
<script setup>
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/shadcn/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/shadcn/drawer';
import { useMediaQuery } from '@vueuse/core';
import { ref } from 'vue';

const isDesktop = useMediaQuery('(min-width: 1366px)');
const isOpen = ref(false);
</script>

<template>
    <Dialog v-if="isDesktop" v-model:open="isOpen">
        <DialogTrigger as-child>
            <slot name="button"></slot>
        </DialogTrigger>
        <DialogContent class="scrollbar-hide overflow-y-scroll bg-[var(--background)] sm:max-w-[720px] dark:bg-[var(--background)]">
            <DialogHeader class="mb-1 border-b border-[var(--border)] pb-2 dark:border-[var(--border)]">
                <DialogTitle class="text-[var(--foreground)]">
                    <slot name="title"></slot>
                </DialogTitle>
                <DialogDescription class="text-[var(--muted-foreground)]">
                    <slot name="desc"></slot>
                </DialogDescription>
            </DialogHeader>
            <div class="text-[var(--foreground)]">
                <slot name="body"> </slot>
            </div>
        </DialogContent>
    </Dialog>

    <Drawer v-else v-model:open="isOpen">
        <DrawerTrigger as-child>
            <slot name="button"> </slot>
        </DrawerTrigger>
        <DrawerContent class="bg-[var(--background)] sm:max-h-[78vh] dark:bg-[var(--background)]">
            <DrawerHeader class="text-start">
                <DrawerTitle class="text-[var(--foreground)]">
                    <slot name="title"></slot>
                </DrawerTitle>
                <DrawerDescription class="text-[var(--muted-foreground)]">
                    <slot name="desc"></slot>
                </DrawerDescription>
            </DrawerHeader>
            <div class="scrollbar-hide overflow-y-scroll p-4 text-[var(--foreground)]">
                <slot name="body"> </slot>
            </div>
        </DrawerContent>
    </Drawer>
</template>
