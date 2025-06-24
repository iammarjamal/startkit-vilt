<script setup>
const props = defineProps({
    status: {
        type: Number,
        required: true,
    },
});

const titleMap = {
    503: '503',
    500: '500',
    404: '404',
    403: '403',
};

const title = computed(() => titleMap[props.status] || `${props.status}: Unknown Error`);
const description = computed(() => descriptionMap[props.status] || 'An unexpected error occurred.');
</script>

<template>
    <div class="flex h-full min-h-screen flex-col place-content-center items-center justify-center px-4">
        <div class="h-full">
            <h1 class="text-dark/60 dark:text-light/60 text-9xl">{{ title }}</h1>
        </div>
    </div>
</template>
