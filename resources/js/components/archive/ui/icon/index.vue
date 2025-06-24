<script setup>
import { Icon } from "@iconify/vue";
import { cn } from "@/lib/shadcn/utils";
const props = defineProps({
    icon: {
        type: Boolean,
        default: true,
    },
});
</script>

<template>
    <Icon
        :icon="props.icon"
        :class="cn('text-dark dark:text-light text-xl', props.class)"
    />
</template>
