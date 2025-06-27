<!--
Usage:
<Checkbox label="Accept terms" v-model="checked" type="primary" />
Props:
- label: checkbox label
- type: native | primary | success | warning | danger
- v-model: checked value
-->
<script setup>
import { computed, defineEmits, defineProps } from 'vue';

const props = defineProps({
    id: { type: String, default: 'checkbox' },
    label: { type: String, default: '' },
    type: { type: String, default: 'native' },
    modelValue: { type: Boolean, default: false },
    class: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue']);

// Checkbox color styles based on type
const typeStyles = computed(() => {
    switch (props.type) {
        case 'primary':
            return {
                bg: 'bg-[var(--primary)] border border-[var(--primary)]',
                check: 'text-[var(--primary-foreground)]',
            };
        case 'success':
            return {
                bg: 'bg-[var(--success)] border border-[var(--success)]',
                check: 'text-[var(--success-foreground)]',
            };
        case 'warning':
            return {
                bg: 'bg-[var(--accent)] border border-[var(--accent)]',
                check: 'text-[var(--accent-foreground)]',
            };
        case 'danger':
            return {
                bg: 'bg-[var(--destructive)] border border-[var(--destructive)]',
                check: 'text-[var(--destructive-foreground)]',
            };
        case 'native':
        default:
            return {
                bg: 'bg-[var(--background)] border border-[var(--border)]',
                check: 'text-[var(--primary)]',
            };
    }
});
</script>

<template>
    <div class="mb-2 flex items-start">
        <div class="flex h-5 items-center gap-x-2">
            <!-- Hidden native checkbox -->
            <input
                :id="props.id"
                type="checkbox"
                :checked="modelValue"
                :disabled="disabled"
                @change="emit('update:modelValue', $event.target.checked)"
                class="peer hidden"
            />
            <!-- Custom checkbox visual -->
            <label :for="props.id" class="flex items-center space-x-2 text-base select-none [&_svg]:scale-0 peer-checked:[&_svg]:scale-100">
                <span :class="['flex h-5 w-5 items-center justify-center rounded border-2', typeStyles.bg]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="3"
                        stroke="currentColor"
                        class="h-3 w-3 duration-300 ease-out"
                        :class="typeStyles.check"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </span>
            </label>
            <span class="text-[var(--foreground)]" v-if="label">{{ label }}</span>
        </div>
    </div>
</template>
