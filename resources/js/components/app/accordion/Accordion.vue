<!--
Usage:
<AppAccordion type="single" collapsible>
  <AppAccordionItem value="item-1">
    <AppAccordionTrigger>عنوان القسم الأول</AppAccordionTrigger>
    <AppAccordionContent>محتوى القسم الأول</AppAccordionContent>
  </AppAccordionItem>
  <AppAccordionItem value="item-2">
    <AppAccordionTrigger>عنوان القسم الثاني</AppAccordionTrigger>
    <AppAccordionContent>محتوى القسم الثاني</AppAccordionContent>
  </AppAccordionItem>
</AppAccordion>

Props:
- type: 'single' | 'multiple'
- collapsible: allow all items to be closed
- defaultValue: default open items
- value: controlled value
-->
<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'single',
        validator: (value) => ['single', 'multiple'].includes(value),
    },
    collapsible: { type: Boolean, default: false },
    defaultValue: { type: [String, Array], default: () => [] },
    value: { type: [String, Array], default: undefined },
});

const emit = defineEmits(['update:value']);

const { t } = useI18n();

// State management
const isControlled = computed(() => props.value !== undefined);
const openItems = ref(
    isControlled.value
        ? Array.isArray(props.value)
            ? props.value
            : [props.value]
        : Array.isArray(props.defaultValue)
          ? props.defaultValue
          : [props.defaultValue],
);

// Update open items when controlled value changes
watch(
    () => props.value,
    (newValue) => {
        if (isControlled.value) {
            openItems.value = Array.isArray(newValue) ? newValue : [newValue];
        }
    },
);

// Toggle item
const toggleItem = (itemValue) => {
    if (props.type === 'single') {
        const newValue = openItems.value.includes(itemValue) ? (props.collapsible ? [] : openItems.value) : [itemValue];

        openItems.value = newValue;
        emit('update:value', props.collapsible ? newValue[0] || '' : newValue[0]);
    } else {
        const newItems = openItems.value.includes(itemValue) ? openItems.value.filter((item) => item !== itemValue) : [...openItems.value, itemValue];

        openItems.value = newItems;
        emit('update:value', newItems);
    }
};

// Check if item is open
const isItemOpen = (itemValue) => {
    return openItems.value.includes(itemValue);
};

// Provide accordion context to child components
provide('accordion', {
    type: props.type,
    collapsible: props.collapsible,
    toggleItem,
    isItemOpen,
});
</script>

<template>
    <div class="w-full space-y-1">
        <slot />
    </div>
</template>

<i18n>
{
    "ar": {
        "accordion": {
            "expand": "توسيع",
            "collapse": "طي"
        }
    },
    "en": {
        "accordion": {
            "expand": "Expand",
            "collapse": "Collapse"
        }
    }
}
</i18n>
