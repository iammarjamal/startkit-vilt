<!--
Usage:
<Select :options="[{ label: 'Option 1', value: 1 }]" v-model="selected" />
Props:
- options: array of { label, value }
- v-model: selected value
-->
<script setup>
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const props = defineProps({
    options: {
        type: Array,
        required: true,
    },
    placeholder: {
        type: String,
        required: true,
    },
    modelValue: {
        type: [String, Number, Object],
        required: true,
    },
});

const { t } = useI18n();

const [UseTemplate, optionList] = createReusableTemplate();
const isDesktop = useMediaQuery('(min-width: 1366px)');
const isOpen = ref(false);
const selectedOption = ref(null);
const emits = defineEmits(['update:modelValue']);

onMounted(() => {
    const defaultOption = props.options.find((option) => option.selected === true);
    if (defaultOption) {
        selectedOption.value = defaultOption;
        emits('update:modelValue', defaultOption.value);
    }
});

function onOptionSelect(option) {
    selectedOption.value = option;
    emits('update:modelValue', option.value);
    isOpen.value = false;
}
</script>

<template>
    <div>
        <UseTemplate>
            <Command class="animate__animated animate__fadeIn animate__faster">
                <CommandInput :placeholder="t('body.search')" class="xs:text-lg text-[var(--foreground)] lg:text-sm" />
                <CommandList>
                    <CommandEmpty class="text-[var(--foreground)] dark:text-[var(--foreground)]">{{ t('body.noResultsFound') }}</CommandEmpty>
                    <CommandGroup>
                        <CommandItem
                            v-for="(option, index) in props.options"
                            :key="option.label"
                            :value="option.label"
                            @select="onOptionSelect(option)"
                            class="xs:text-lg mb-0 text-[var(--foreground)] lg:text-sm dark:text-[var(--foreground)]"
                            :class="{ 'xs:py-3 lg:py-2.5 lg:pb-1.5': index !== props.options.length - 1 }"
                        >
                            {{ t(option.label) }}
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </UseTemplate>

        <Transition name="fade">
            <Popover v-if="isDesktop" v-model:open="isOpen" class="animate__animated animate__zoomIn animate__fast">
                <PopoverTrigger as-child>
                    <Button variant="outline" class="w-full justify-start text-[var(--foreground)]">
                        {{ selectedOption ? selectedOption.label : props.placeholder }}
                    </Button>
                </PopoverTrigger>
                <PopoverContent class="w-[200px] bg-[var(--background)] p-0 dark:bg-[var(--background)]" align="start">
                    <optionList />
                </PopoverContent>
            </Popover>
        </Transition>

        <Transition name="slide">
            <Drawer
                v-if="!isDesktop"
                :open="isOpen"
                @update:open="(newOpenValue) => (isOpen = newOpenValue)"
                class="animate__animated animate__slideInUp animate__fast"
            >
                <DrawerTrigger as-child>
                    <Button variant="outline" class="w-full justify-start text-[var(--foreground)] dark:text-[var(--foreground)]">
                        {{ selectedOption ? selectedOption.label : props.placeholder }}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div class="mt-4 mb-2.5">
                        <optionList />
                    </div>
                </DrawerContent>
            </Drawer>
        </Transition>
    </div>
</template>

<i18n>
{
    "ar": {
        "body": {
            "search": "البحث",
            "noResultsFound": "لا توجد نتائج"
        }
    },
    "en": {
        "body": {
            "search": "Search",
            "noResultsFound": "No results found"
        }
    }
}
</i18n>
