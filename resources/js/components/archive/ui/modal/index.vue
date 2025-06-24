<script setup>
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcn/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/shadcn/drawer";
import { useMediaQuery } from "@vueuse/core";
import { ref } from "vue";

const isDesktop = useMediaQuery("(min-width: 1366px)");
const isOpen = ref(false);
</script>

<template>
    <Dialog v-if="isDesktop" v-model:open="isOpen">
        <DialogTrigger as-child>
            <slot name="button"></slot>
        </DialogTrigger>
        <DialogContent
            class="sm:max-w-[720px] overflow-y-scroll scrollbar-hide bg-light dark:bg-dark"
        >
            <DialogHeader
                class="pb-2 mb-1 border-b border-secondary-light dark:border-secondary-dark"
            >
                <DialogTitle class="text-dark dark:text-light">
                    <slot name="title"></slot>
                </DialogTitle>
                <DialogDescription class="text-dark dark:text-light">
                    <slot name="desc"></slot>
                </DialogDescription>
            </DialogHeader>
            <div class="text-dark dark:text-light">
                <slot name="body"> </slot>
            </div>
        </DialogContent>
    </Dialog>

    <Drawer v-else v-model:open="isOpen">
        <DrawerTrigger as-child>
            <slot name="button"> </slot>
        </DrawerTrigger>
        <DrawerContent class="sm:max-h-[78vh] bg-light dark:bg-dark">
            <DrawerHeader class="text-start">
                <DrawerTitle class="text-dark dark:text-light">
                    <slot name="title"></slot>
                </DrawerTitle>
                <DrawerDescription class="text-dark dark:text-light">
                    <slot name="desc"></slot>
                </DrawerDescription>
            </DrawerHeader>
            <div
                class="p-4 overflow-y-scroll scrollbar-hide text-dark dark:text-light"
            >
                <slot name="body"> </slot>
            </div>
        </DrawerContent>
    </Drawer>
</template>
