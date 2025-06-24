<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    class: String,
    label: String,
    labelClass: String,
    orientation: String,
});

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <div
        :class="
            [
                'bg-dark dark:bg-light relative my-3 shrink-0',
                props.orientation === 'vertical'
                    ? 'h-full w-px'
                    : 'h-px w-full',
                props.class,
            ]
        "
        v-bind="delegatedProps"
    >
        <span
            v-if="props.label"
            :class="
                [
                    props.labelClass,
                    'text-dark dark:text-light bg-light dark:bg-dark absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-xs',
                    props.orientation === 'vertical'
                        ? 'w-[1px] px-1 py-2'
                        : 'h-[1px] px-2 py-1',
                ].join(' ')
            "
        >
            {{ props.label }}
        </span>
    </div>
</template>
