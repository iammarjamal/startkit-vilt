<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

defineProps<{
    canLogin?: boolean;
    canRegister?: boolean;
    laravelVersion: string;
    phpVersion: string;
}>();

import { ref, computed } from 'vue'

// 1. الحالة (State) - تشبه Signal
const count = ref(1)

// 2. خاصية محسوبة (Computed)
// هذه الدالة لا تعمل "مع كل ريندر"، بل تعمل فقط إذا تغيرت count
const doubleCount = computed(() => {
    console.log('Calculating double...')
    return count.value * 2
})

// 3. دالة التحديث
function increment() {
    // لاحظ: نعدل القيمة مباشرة (Mutation)
    count.value++
}
</script>

<template>

    <Head title="Welcome" />

    <div>
        <p>Number: {{ count }}</p>
        <p>Double: {{ doubleCount }}</p>
        <button @click="increment">Increase</button>
    </div>

    <div
        class="bg-white text-foreground min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
        <div class="relative w-full max-w-2xl px-6 lg:max-w-7xl">
            <header class="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                <div class="flex lg:justify-center lg:col-start-2">
                    <svg class="h-12 w-auto text-[#FF2D20] lg:h-16" viewBox="0 0 62 65" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.191966 49.8192 0 49.4902 0 49.1337L0 8.11388C0 7.75696 0.191966 7.42843 0.501061 7.24891L24.456 3.45599C24.456 3.45599 24.456 3.45599 24.456 3.42609 24.5657 3.40864 24.6205 3.38865C24.6467 3.37866 24.6716 3.36376 24.6991 3.35627C24.8666 3.31215 25.0426 3.31215 25.2101 3.35627C25.2338 3.36251 25.255 3.37623 25.2774 3.38372C25.3372 3.4049 25.3971 3.42489 25.4519 3.45599L49.4118 17.2489C49.7209 17.4284 49.9104 17.7569 49.9104 18.1139V33.3773L59.3671 27.9306V14.8858C59.3671 14.5293 59.1751 14.2008 58.866 14.0213L53.1219 10.7141C52.8128 10.5346 52.6208 10.2061 52.6208 9.84961V1.71388C52.6208 1.16138 53.2208 0.816382 53.6991 1.09138L61.3887 5.51888C61.6978 5.69839 61.8898 6.02692 61.8898 6.38384V14.6253H61.8548ZM39.8098 14.8858L24.9546 6.33215L10.0995 14.8858V31.9944L24.9546 40.5481L39.8098 31.9944V14.8858ZM12.6208 16.3421V30.5381L24.9546 37.6406L37.2885 30.5381V16.3421L24.9546 9.23961L12.6208 16.3421Z"
                            fill="currentColor" />
                    </svg>
                </div>
                <nav v-if="canLogin" class="-mx-3 flex flex-1 justify-end">
                    <Link v-if="$page.props.auth.user" :href="route('dashboard')"
                        class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                        Dashboard
                    </Link>

                    <template v-else>
                        <Link :href="route('login')"
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            Log in
                        </Link>

                        <Link v-if="canRegister" :href="route('register')"
                            class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                            Register
                        </Link>
                    </template>
                </nav>
            </header>

            <main class="mt-6">
                <div class="grid gap-6 lg:grid-cols-2 lg:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Documentation</CardTitle>
                            <CardDescription>
                                Laravel has wonderful, thorough documentation covering every aspect of the framework.
                                Whether you
                                are new to the framework or have previous experience with Laravel, we recommend reading
                                all of the
                                documentation from beginning to end.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button as-child variant="outline">
                                <a href="https://laravel.com/docs" target="_blank">Read Docs</a>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Laracasts</CardTitle>
                            <CardDescription>
                                Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript
                                development. Check
                                them out, see for yourself, and massively level up your development skills in the
                                process.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button as-child variant="outline">
                                <a href="https://laracasts.com" target="_blank">Start Watching</a>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Vite</CardTitle>
                            <CardDescription>
                                Vite is a modern frontend build tool that provides an extremely fast development
                                environment and
                                bundles your code for production.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button as-child variant="outline">
                                <a href="https://vitejs.dev" target="_blank">Learn More</a>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Inertia.js</CardTitle>
                            <CardDescription>
                                Inertia.js lets you quickly build modern single-page React, Vue and Svelte apps using
                                classic
                                server-side routing and controllers.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button as-child variant="outline">
                                <a href="https://inertiajs.com" target="_blank">Learn More</a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <footer class="py-16 text-center text-sm text-black dark:text-white/70">
                Laravel v{{ laravelVersion }} (PHP v{{ phpVersion }})
            </footer>
        </div>
    </div>
</template>
