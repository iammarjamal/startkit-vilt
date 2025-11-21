<script setup lang="ts">
import Theme from '@/components/app/Theme/index.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref } from 'vue';

const count = ref(0);

const setCount = (value: number) => {
    count.value = value;
};
</script>

<template>

    <Head title="Welcome">
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    <div
        class="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
        <div className="mt-6">
            <button
                className="bg-gray-100 border hover:border-blue-400 border-transparent ring-2 ring-transparent focus:ring-blue-700 rounded-lg px-4 py-2 cursor-pointer"
                @click="setCount(count + 1)">
                count is {{ count }}
            </button>
            <p className="mt-5">
                Edit{" "}
                <code className="text-gray-500 font-mono px-2 text-sm">
                            resources/js/pages/welcome.vue
                        </code>{" "}
                and save to test HMR
            </p>
        </div>
    </div>
</template>
