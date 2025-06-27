<!--
Usage:
<Link href="/about" tabindex="0" method="get" as="a">About</Link>
Props:
- href: link url
- tabindex: tab index
- method: HTTP method (for Inertia)
- as: tag type (for Inertia)
- class: custom classes

Unified Link component supporting:
- class prop for custom classes
- Uses theme variables for color
- Supports all native anchor attributes
-->
<script setup>
import { Link as InertiaLink } from '@inertiajs/vue3';
const props = defineProps({
    icon: {
        type: String,
        default: null,
    },
    href: { type: String, default: '' },
    tabindex: { type: [String, Number], default: undefined },
    method: { type: String, default: undefined },
    as: { type: String, default: undefined },
    class: { type: String, default: '' },
});
</script>

<template>
    <InertiaLink
        :href="props.href"
        :tabindex="props.tabindex"
        :method="props.method"
        :as="props.as"
        :class="['text-[var(--foreground)] underline underline-offset-4 transition-colors hover:text-[var(--primary)]', props.class]"
        v-bind="$attrs"
    >
        <div class="flex justify-between">
            <span class="p-button-label"><slot /></span>
            <span v-if="icon"><i :class="icon" class="ltr:ml-2 rtl:mr-2"></i></span>
        </div>
    </InertiaLink>
</template>
