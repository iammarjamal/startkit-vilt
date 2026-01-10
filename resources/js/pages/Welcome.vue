<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@iconify/vue';

defineProps<{
    canLogin?: boolean;
    canRegister?: boolean;
}>();


</script>

<template>

    <Head title="Welcome" />

    <div
        class="bg-background text-foreground min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
        <div class="relative w-full max-w-2xl px-6 lg:max-w-7xl">
            <header class="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                <div class="flex lg:justify-center lg:col-start-2">
                    <Icon icon="logos:laravel" class="h-24 w-24 text-[#FF2D20]" />
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
        </div>
    </div>
</template>
