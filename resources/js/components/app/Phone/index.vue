<!--
Usage:
<Phone v-model="phoneNumber" />
Props:
- v-model: phone number value
-->
<template>
    <div class="flex w-full max-w-xs flex-col gap-1">
        <label for="phoneNumber" class="w-fit pl-0.5 text-sm text-[var(--muted-foreground)]"> Phone Number </label>
        <div
            class="relative flex w-full"
            @keydown="handleKeydownOnOptions"
            @keydown.esc.window="
                isOpen = false;
                openedWithKeyboard = false;
            "
            v-click-outside="closeDropdown"
        >
            <!-- Country Selector -->
            <div>
                <!-- Trigger Button -->
                <button
                    type="button"
                    class="rounded-l-radius inline-flex w-max items-center justify-between gap-2 border border-r-0 border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm font-medium tracking-wide whitespace-nowrap text-[var(--foreground)] transition hover:opacity-75 focus-visible:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] dark:border-[var(--border)] dark:bg-[var(--background)] dark:text-[var(--foreground)] dark:focus-visible:outline-[var(--primary)]"
                    role="combobox"
                    aria-controls="countriesList"
                    aria-haspopup="listbox"
                    @click="toggleDropdown"
                    @keydown.down.prevent="openedWithKeyboard = true"
                    @keydown.enter.prevent="openedWithKeyboard = true"
                    @keydown.space.prevent="openedWithKeyboard = true"
                    :aria-expanded="isOpen || openedWithKeyboard"
                    :aria-label="selectedOption ? selectedOption.value : 'Please Select'"
                >
                    <!-- Selected Country Flag -->
                    <img class="h-3.5 w-5" :alt="selectedOption?.value" :src="'https://flagcdn.com/' + selectedOption?.iso + '.svg'" />
                    <!-- Chevron -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 shrink-0" aria-hidden="true">
                        <path
                            fill-rule="evenodd"
                            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
                <!-- Dropdown -->
                <div
                    v-show="isOpen || openedWithKeyboard"
                    id="countriesList"
                    class="rounded-radius absolute top-11 left-0 z-10 w-full overflow-hidden border border-[var(--border)] bg-[var(--background)] dark:border-[var(--border)] dark:bg-[var(--background)]"
                    role="listbox"
                    aria-label="countries list"
                    @keydown.down.prevent="$focus.wrap().next()"
                    @keydown.up.prevent="$focus.wrap().previous()"
                >
                    <!-- Search -->
                    <div class="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            fill="none"
                            stroke-width="1.5"
                            class="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[var(--muted-foreground)]"
                            aria-hidden="true"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                        <input
                            type="text"
                            class="w-full border-b border-[var(--border)] bg-[var(--background)] py-2.5 pr-4 pl-11 text-sm text-[var(--foreground)] focus:outline-hidden focus-visible:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-75 dark:border-[var(--border)] dark:bg-[var(--background)] dark:text-[var(--foreground)] dark:focus-visible:border-[var(--primary)]"
                            name="searchField"
                            aria-label="Search"
                            @input="getFilteredOptions($event.target.value)"
                            ref="searchField"
                            placeholder="Search"
                        />
                    </div>
                    <!-- Options -->
                    <ul class="flex max-h-44 flex-col overflow-y-auto">
                        <li class="hidden px-4 py-2 text-sm text-[var(--muted-foreground)]" ref="noResultsMessage">
                            <span>No matches found</span>
                        </li>
                        <template v-for="(item, index) in options" :key="item.value">
                            <li
                                class="inline-flex justify-between gap-6 bg-[var(--background)] px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] hover:text-[var(--primary)] focus-visible:bg-[var(--muted)] focus-visible:text-[var(--primary)] focus-visible:outline-hidden dark:bg-[var(--background)] dark:text-[var(--foreground)] dark:hover:bg-[var(--muted)] dark:hover:text-[var(--primary)] dark:focus-visible:bg-[var(--muted)] dark:focus-visible:text-[var(--primary)]"
                                role="option"
                                @click="setSelectedOption(item)"
                                @keydown.enter="setSelectedOption(item)"
                                :id="'option-' + index"
                                tabindex="0"
                            >
                                <div class="flex items-center gap-2">
                                    <!-- Flag Image -->
                                    <img class="h-3.5 w-5" alt="" aria-hidden="true" :src="'https://flagcdn.com/' + item.iso + '.svg'" />
                                    <!-- Label -->
                                    <span :class="selectedOption == item ? 'font-bold' : ''" v-text="item.value"></span>
                                    <span class="font-bold" v-text="'(' + item.phoneCode + ')'"></span>
                                    <!-- Screen reader 'selected' indicator -->
                                    <span class="sr-only" v-text="selectedOption == item ? 'selected' : ''"></span>
                                </div>
                                <!-- Checkmark -->
                                <svg
                                    v-show="selectedOption == item"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-width="2"
                                    class="size-4"
                                    aria-hidden="true"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>

            <!-- Phone Number Input -->
            <input
                id="phoneNumber"
                type="tel"
                class="rounded-r-radius w-full rounded-l-none border border-[var(--border)] bg-[var(--background)] px-2.5 py-2 text-sm text-[var(--foreground)] focus:outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-75 dark:border-[var(--border)] dark:bg-[var(--background)] dark:text-[var(--foreground)] dark:focus-visible:outline-[var(--primary)]"
                ref="phoneNumber"
                autocomplete="phone"
                placeholder="+00 000-000-0000"
            />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

// قائمة الدول
const allOptions = [
    { label: 'Afghanistan', value: 'Afghanistan', iso: 'af', phoneCode: '+93' },
    { label: 'Albania', value: 'Albania', iso: 'al', phoneCode: '+355' },
    { label: 'Zimbabwe', value: 'Zimbabwe', iso: 'zw', phoneCode: '+263' },
];

const options = ref([]);
const isOpen = ref(false);
const openedWithKeyboard = ref(false);
const selectedOption = ref(null);
const searchField = ref(null);
const noResultsMessage = ref(null);
const phoneNumber = ref(null);

const setSelectedOption = (option) => {
    selectedOption.value = option;
    isOpen.value = false;
    openedWithKeyboard.value = false;
    if (phoneNumber.value) {
        phoneNumber.value.value = option.phoneCode + ' ';
    }
};

const getFilteredOptions = (query) => {
    options.value = allOptions.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()) || option.phoneCode.includes(query));
    if (options.value.length === 0 && noResultsMessage.value) {
        noResultsMessage.value.classList.remove('hidden');
    } else if (noResultsMessage.value) {
        noResultsMessage.value.classList.add('hidden');
    }
};

const handleKeydownOnOptions = (event) => {
    if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 8) {
        searchField.value.focus();
    }
};

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
    isOpen.value = false;
    openedWithKeyboard.value = false;
};

onMounted(() => {
    options.value = allOptions;
    setSelectedOption(options.value[0]);
});
</script>
