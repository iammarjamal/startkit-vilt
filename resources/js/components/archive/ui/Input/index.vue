<script setup>
import { ref, watch, onMounted } from 'vue';
import { useStorage } from '@vueuse/core';
import { Icon } from '@iconify/vue';

const props = defineProps({
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: null },
    required: { type: Boolean, default: true },
    autofocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    label: { type: String, default: null },
    icon: { type: String, default: null },
    iconClass: { type: String, default: '' },
    iconStyle: { type: String, validator: (value) => ['start', 'end'].includes(value), default: 'start' },
    size: { type: String, validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value), default: 'lg' },
    success: { type: String, default: null },
    error: { type: String, default: null },
    modelValue: { type: [String, Number], default: '' },
    loading: { type: Boolean, default: false },
});

const emits = defineEmits(['update:modelValue']);
const updateValue = (value) => emits('update:modelValue', value);

const showPassword = ref(false);
const disabledFocusInput = ref(true);

onMounted(() => {
    setTimeout(() => {
        disabledFocusInput.value = false;
    }, 200);
});

const StorageTheme = useStorage('vueuse-color-scheme');
const prefersColor = ref(window.matchMedia('(prefers-color-scheme: dark)').matches);
const isDarkMode = ref(StorageTheme.value === 'auto' ? prefersColor.value : StorageTheme.value === 'dark');

watch(StorageTheme, () => {
    isDarkMode.value = StorageTheme.value === 'auto' ? prefersColor.value : StorageTheme.value === 'dark';
});
</script>

<template>
    <div class="relative">
        <div>
            <label
                v-if="label"
                class="font-bold text-dark dark:text-light"
                :class="{
                    'text-xs': size === 'xs',
                    'text-sm': size === 'sm',
                    'text-md': size === 'md',
                    'text-lg': size === 'lg',
                    'text-xl': size === 'xl',
                }"
            >
                {{ label }}<span class="text-danger-light dark:text-danger-dark" v-if="required">*</span>:
            </label>

            <div
                class="mt-1.5 flex flex-row items-center"
                :class="{
                    'dark-autofill': isDarkMode,
                    'light-autofill': !isDarkMode,
                    '!cursor-not-allowed': loading,
                }"
            >
                <span v-if="icon && iconStyle === 'start'" class="absolute ms-2.5 flex flex-row items-center transition-all duration-750">
                    <iconify-icon
                        :icon="icon"
                        :class="[
                            iconClass,
                            'text-dark/50 dark:text-light/50',
                            {
                                'text-xs': size === 'xs',
                                'text-sm': size === 'sm',
                                'text-md': size === 'md',
                                'text-lg': size === 'lg',
                                'text-xl': size === 'xl',
                                'text-danger-light dark:text-danger-dark': error,
                                'text-success-light dark:text-success-dark': success,
                            },
                        ]"
                    />
                </span>

                <input
                    :type="type === 'password' ? (showPassword ? 'text' : 'password') : type"
                    :placeholder="placeholder || label"
                    :required="required"
                    :autocomplete="type"
                    :autofocus="!disabledFocusInput"
                    @focus="disabledFocusInput = false"
                    @blur="disabledFocusInput = false"
                    :value="modelValue"
                    @input="updateValue($event.target.value)"
                    :disabled="loading || disabledFocusInput"
                    class="w-full px-2 transition-all border rounded border-secondary-light-foreground dark:border-secondary-dark-foreground autofillClass duration-750"
                    :class="[
                        props.class,
                        {
                            'py-0.5 text-xs': size === 'xs',
                            'py-1 text-sm': size === 'sm',
                            'py-1.5 text-base': size === 'md',
                            'py-2 text-lg': size === 'lg',
                            'py-3 text-xl': size === 'xl',
                            'text-danger-light dark:text-danger-dark !border-danger-light dark:!border-danger-dark focus:!ring-danger-light dark:focus:!ring-danger-dark':
                                error,
                            'text-success-light dark:text-success-dark border-success-light dark:border-success-dark focus:ring-success-light dark:focus:ring-success-dark':
                                success,
                            'text-dark/80 dark:text-light/80 bg-light dark:bg-dark border-secondary-light dark:border-secondary-dark focus:ring-secondary-light/50 dark:focus:ring-secondary-dark/50':
                                !success && !error,
                            'ps-10': icon && iconStyle === 'start',
                            'pe-10': icon && (iconStyle === 'end' || type === 'password'),
                            'disabled:cursor-not-allowed disabled:opacity-70': loading,
                        },
                    ]"
                />

                <span
                    v-if="icon && (iconStyle === 'end' || type === 'password')"
                    class="absolute me-2.5 flex items-center ltr:right-0 rtl:left-0"
                    :class="type === 'password' ? 'cursor-pointer' : 'cursor-auto'"
                    @click="showPassword = !showPassword"
                >
                    <iconify-icon
                        :icon="type === 'password' ? (showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline') : icon"
                        :class="[
                            iconClass,
                            'text-dark/50 dark:text-light/50',
                            {
                                'text-xs': size === 'sm',
                                'text-sm': size === 'md',
                                'text-md': size === 'lg',
                                'text-lg': size === 'xl',
                                'text-xl': size === '2xl',
                                'text-danger-light dark:text-danger-dark': error,
                                'text-success-light dark:text-success-dark': success,
                            },
                        ]"
                    />
                </span>
            </div>
        </div>

        <div>
            <p v-if="error" class="mt-1 text-xs text-danger-light dark:text-danger-dark">{{ error }}</p>
            <p v-else-if="success" class="mt-1 text-xs text-success-light dark:text-success-dark">{{ success }}</p>
        </div>
    </div>
</template>