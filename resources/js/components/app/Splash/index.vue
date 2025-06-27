<!--
Usage:
<Splash />
-->
<script setup>
import 'animate.css';
import { gsap } from 'gsap';
import { onMounted, ref } from 'vue';

import Logo from '@/components/app/Logo/index.vue';
import { useStorage } from '@vueuse/core';

const props = defineProps({
    time: {
        type: Number,
        default: 2000,
    },
});

const visible = ref(false);
const bubble = ref(null);
const bubblePulse = ref(null);

onMounted(() => {
    const splashShown = localStorage.getItem('splashShown');

    if (!splashShown) {
        visible.value = true;
        setTimeout(() => {
            visible.value = false;
            sessionStorage.setItem('splashShown', 'true');
        }, props.time);
    }

    const timeline = gsap.timeline({
        repeat: -1, // Loop the animation infinitely
        onComplete: () => timeline.restart(),
    });

    timeline.to(
        bubblePulse.value,
        {
            scale: 0.9,
            opacity: 1,
            duration: 0.8,
        },
        '-=0.6',
    );

    timeline.to(
        bubblePulse.value,
        {
            scale: 3,
            opacity: 0,
            duration: 1.1,
            ease: 'expo.out',
        },
        '-=1.2',
    );
});

const isTheme = useStorage('theme');
</script>

<template>
    <div
        v-show="visible"
        class="fixed inset-0 z-[999999] flex h-screen w-screen flex-col items-center justify-center space-y-5 overflow-hidden bg-[var(--background)] shadow-[var(--shadow)] shadow-xl before:absolute before:inset-0 before:-translate-x-full before:-skew-x-12 before:animate-[shimmer_2s_infinite] before:border-t before:border-[var(--border)] before:bg-gradient-to-r before:from-transparent before:via-[var(--muted)] before:to-transparent dark:bg-[var(--background)] dark:shadow-[var(--shadow)] dark:before:border-[var(--border)] dark:before:via-[var(--muted)]"
    >
        <div class="relative">
            <!-- Bubble wrapper -->
            <div
                ref="bubble"
                class="relative z-10 flex h-[100px] w-[100px] items-center justify-center rounded-full border border-transparent object-cover"
            >
                <Logo
                    :type="(isTheme === 'auto' && useMediaQuery('(prefers-color-scheme: dark)')) || isTheme === 'dark' ? 'icon-light' : 'icon-dark'"
                />
            </div>
            <!-- Pulse effect -->
            <div
                ref="bubblePulse"
                class="absolute top-1/2 left-1/2 z-0 -mt-[60px] -ml-[60px] h-[120px] w-[120px] scale-0 transform rounded-full bg-[var(--secondary)] opacity-0 dark:bg-[var(--secondary)]"
            ></div>
        </div>
    </div>
</template>
