<!--
Usage:
<Alert type="success" label="Success!">Message here</Alert>
Props:
- type: success | error | warning | info
- label: optional title
-->
<script setup>
import Paragraph from '@/components/app/Paragraph/index.vue';

defineProps({
    type: {
        type: String,
        default: null,
    },
});
</script>

<template>
    <div
        role="alert"
        class="my-3 rounded p-4 ltr:border-l-4 rtl:border-r-4"
        :class="{
            'border-[var(--primary)] bg-[var(--secondary)] dark:border-[var(--primary)] dark:bg-[var(--background)]': !type,
            'border-[var(--success)] bg-[var(--success-bg)] dark:border-[var(--success)] dark:bg-[var(--success-bg-dark)]': type == 'success',
            'border-[var(--warning)] bg-[var(--warning-bg)] dark:border-[var(--warning)] dark:bg-[var(--warning-bg-dark)]': type == 'warning',
            'border-[var(--destructive)] bg-[var(--destructive)] dark:border-[var(--destructive)] dark:bg-[var(--destructive)]': type == 'error',
        }"
    >
        <Paragraph
            size="xxs"
            :class="{
                '!text-[var(--primary)] dark:!text-[var(--primary-foreground)]': !type,
                '!text-[var(--success)] dark:!text-[var(--success)]': type == 'success',
                '!text-[var(--warning)] dark:!text-[var(--warning)]': type == 'warning',
                '!text-[var(--destructive)] dark:!text-[var(--destructive-foreground)]': type == 'error',
            }"
            v-bind:class="class"
        >
            <slot />
        </Paragraph>
    </div>
</template>
