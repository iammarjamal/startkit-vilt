<script setup>
// Define component props
const props = defineProps({
    type: {
        type: String,
        validator: (value) => ['native', 'primary', 'secondary', 'success', 'warning', 'danger'].includes(value),
        default: 'native',
    },
    icon: {
        type: String,
        default: '',
    },
    iconClass: {
        type: String,
        default: '',
    },
    iconStyle: {
        type: String,
        validator: (value) => ['between', 'default'].includes(value),
        default: 'default',
    },
    size: {
        type: String,
        validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value),
        default: 'lg',
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

// Define button styles based on type
const types = {
    native: {
        bg: 'bg-light border border-secondary-dark-foreground dark:bg-dark dark:border-secondary-light-foreground',
        text: 'text-dark dark:text-light',
    },
    primary: {
        bg: 'bg-primary-light border border-primary-dark dark:bg-primary-light dark:border-primary-light',
        text: 'text-primary-light-foreground dark:text-primary-light-foreground',
    },
    success: {
        bg: 'bg-success-light border border-success-dark dark:bg-success-light dark:border-success-light',
        text: 'text-success-light-foreground dark:text-success-light-foreground',
    },
    warning: {
        bg: 'bg-warning-light border border-warning-dark dark:bg-warning-light dark:border-warning-light',
        text: 'text-warning-light-foreground dark:text-warning-light-foreground',
    },
    danger: {
        bg: 'bg-danger-light border border-danger-dark dark:bg-danger-light dark:border-danger-light',
        text: 'text-danger-light-foreground dark:text-danger-light-foreground',
    },
};

// Define size classes
const sizeClasses = {
    xs: 'p-1 py-1 text-xs',
    sm: 'p-2 py-2 text-sm',
    md: 'p-3 py-3 text-md',
    lg: 'p-4 py-4 text-lg',
    xl: 'p-5 py-5 text-xl',
};

// Define text size classes
const textSize = {
    xs: 'text-xxs md:text-xs lg:text-xs xl:text-sm',
    sm: 'text-xs md:text-xs lg:text-sm xl:text-md',
    md: 'text-sm md:text-sm lg:text-md xl:text-lg',
    lg: 'text-md md:text-md lg:text-lg xl:text-xl',
    xl: 'text-lg md:text-lg lg:text-xl xl:text-2xl',
};

// Define icon size classes
const iconSize = {
    xs: 'text-xxs md:text-xs lg:text-sm xl:text-md',
    sm: 'text-xs md:text-sm lg:text-md xl:text-lg',
    md: 'text-sm md:text-md lg:text-lg xl:text-xl',
    lg: 'text-md md:text-lg lg:text-xl xl:text-2xl',
    xl: 'text-lg md:text-xl lg:text-2xl xl:text-3xl',
};

// Determine current type and size classes
const currentType = types[props.type] ?? types.native;
const typeClasses = currentType.bg + ' ' + currentType.text;
const currentSizeClasses = sizeClasses[props.size] ?? sizeClasses.sm;
const currentTextSize = textSize[props.size] ?? textSize.sm;
</script>

<template>
    <button
        :class="[
            typeClasses,
            currentSizeClasses,
            'w-full cursor-pointer rounded transition-all duration-500 hover:opacity-70',
            { '!cursor-progress disabled:cursor-progress disabled:opacity-70': loading },
        ]"
        :disabled="loading"
    >
        <!-- Button content with icon between -->
        <div class="flex flex-row items-center justify-between w-full" v-if="icon && iconStyle === 'between'">
            <div class="flex flex-row font-bold" :class="currentTextSize">
                <div class="flex flex-row items-center w-full min-w-24" v-if="loading">
                    <svg
                        :class="[iconClass, iconSize['xs'], currentType.text]"
                        class="inline-block duration-300 me-2 max-h-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span :class="currentTextSize">{{ t('body.loading') }}</span>
                </div>
                <slot v-else></slot>
            </div>
            <div class="flex items-center justify-end flex-2 text-end">
                <Icon :icon="icon" :class="[iconClass, iconSize[size], currentType.text]" class="text-end" />
            </div>
        </div>
        <!-- Button content without icon between -->
        <div v-else>
            <div v-if="loading">
                <svg
                    :class="[iconClass, iconSize[size], currentType.text]"
                    class="inline-block duration-300 animate-spin max-h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            </div>
            <div class="flex flex-row items-center justify-center gap-x-2" v-else>
                <h1 class="font-bold" :class="currentTextSize">
                    <span v-if="loading">{{ t('body.loading') }}</span>
                    <slot v-else></slot>
                </h1>
                <Icon :icon="icon" :class="[iconClass, iconSize[size], currentType.text]" />
            </div>
        </div>
    </button>
</template>

