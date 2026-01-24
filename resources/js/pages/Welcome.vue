<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { Motion } from 'motion-v';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Logo } from '@/components/ui/logo';
import { Modal } from '@/components/ui/modal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue-sonner';
import App from '@/layouts/app.vue';

const { t } = useI18n();

// Show welcome toast on mounted
onMounted(() => {
    toast.success(t('toast.welcome'), {
        description: t('toast.welcomeDesc'),
    });

    toast.success(t('toast.welcome'), {
        description: t('toast.welcomeDesc'),
    });
});

const features = [
    {
        title: 'laravel.title',
        description: 'laravel.description',
        icon: 'logos:laravel',
    },
    {
        title: 'vue.title',
        description: 'vue.description',
        icon: 'logos:vue',
    },
    {
        title: 'inertia.title',
        description: 'inertia.description',
        icon: 'simple-icons:inertia',
        iconColor: 'text-purple-500',
    },
    {
        title: 'tailwind.title',
        description: 'tailwind.description',
        icon: 'logos:tailwindcss-icon',
    },
    {
        title: 'shadcn.title',
        description: 'shadcn.description',
        icon: 'simple-icons:shadcnui',
        iconColor: 'text-foreground',
    },
    {
        title: 'motion.title',
        description: 'motion.description',
        icon: 'mdi:transition',
        iconColor: 'text-yellow-500',
    },
];

const techStack = [
    { name: 'Laravel', icon: 'logos:laravel' },
    { name: 'Vue', icon: 'logos:vue' },
    { name: 'Inertia', icon: 'simple-icons:inertia', class: 'text-purple-500' },
    { name: 'Tailwind', icon: 'logos:tailwindcss-icon' },
    { name: 'Shadcn', icon: 'simple-icons:shadcnui', class: 'text-foreground' },
    { name: 'TypeScript', icon: 'logos:typescript-icon' },
];
</script>

<template>
    <App title="VILT StartKit">
        <div class="min-h-screen bg-background font-sans text-foreground selection:bg-primary/10">
            <!-- Navbar -->
            <header class="container mx-auto flex h-16 items-center justify-between border-b border-border/40 px-4">
                <Logo />
                <nav class="flex items-center gap-4">
                    <ThemeSwitcher icon />
                    <LanguageSwitcher icon />
                    <a href="https://github.com/iammarjamal/startkit-vilt" target="_blank" rel="noreferrer">
                        <Button variant="ghost" size="icon" class="rounded-full">
                            <Icon icon="simple-icons:github" class="h-5 w-5" />
                            <span class="sr-only">GitHub</span>
                        </Button>
                    </a>
                </nav>
            </header>

            <main>
                <!-- Hero Section -->
                <section class="relative overflow-hidden py-24 lg:py-32">
                    <div class="relative z-10 container mx-auto px-4 text-center">
                        <Motion :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                            :transition="{ duration: 0.5 }"
                            class="mb-6 inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-medium">
                            <Badge variant="secondary" class="mr-2 rounded-full">{{ t('hero.new') }}</Badge>
                            <span>{{ t('hero.badge') }}</span>
                        </Motion>

                        <Motion tag="h1" :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                            :transition="{ duration: 0.5, delay: 0.1 }"
                            class="mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-4xl font-bold tracking-tight text-primary-foreground text-transparent md:text-6xl lg:text-7xl">
                            {{ t('hero.title_start') }} <br class="hidden md:block" />
                            <span class="text-primary">{{ t('hero.title_end') }}</span>
                        </Motion>

                        <Motion tag="p" :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                            :transition="{ duration: 0.5, delay: 0.2 }"
                            class="mx-auto mt-4 mb-10 max-w-2xl text-xl text-muted-foreground">
                            {{ t('hero.description') }}
                        </Motion>

                        <Motion :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                            :transition="{ duration: 0.5, delay: 0.3 }"
                            class="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button size="lg" class="h-12 rounded-full px-8 text-base">
                                {{ t('hero.get_started') }}
                                <Icon icon="heroicons:arrow-right" class="ml-2 h-4 w-4 rtl:rotate-180" />
                            </Button>
                            <Button size="lg" variant="outline" class="h-12 gap-2 rounded-full px-8 text-base">
                                <Icon icon="simple-icons:github" class="h-4 w-4" />
                                {{ t('hero.github_repo') }}
                            </Button>
                        </Motion>
                    </div>

                    <!-- Background Gradients -->
                    <div
                        class="pointer-events-none absolute top-0 left-1/2 -z-10 h-full w-full max-w-7xl -translate-x-1/2 opacity-40">
                        <div
                            class="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-primary/20 blur-[100px]" />
                        <div
                            class="absolute right-[-10%] bottom-[-10%] h-[50%] w-[50%] rounded-full bg-blue-500/20 blur-[100px]" />
                    </div>
                </section>

                <!-- Tech Stack Section -->
                <section class="border-y border-border/40 bg-muted/30 py-16">
                    <div class="container mx-auto px-4 text-center">
                        <p class="mb-8 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                            {{ t('tech.powered_by') }}
                        </p>
                        <div
                            class="flex flex-wrap justify-center gap-8 opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 md:gap-16">
                            <div v-for="tech in techStack" :key="tech.name"
                                class="group flex cursor-default flex-col items-center gap-2">
                                <div
                                    class="rounded-full border border-border/50 bg-background p-3 shadow-sm transition-colors group-hover:border-primary/50">
                                    <Icon :icon="tech.icon"
                                        class="h-8 w-8 transition-transform duration-300 group-hover:scale-110 md:h-10 md:w-10"
                                        :class="tech.class" />
                                </div>
                                <span
                                    class="text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">{{
                                        tech.name
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Features Section -->
                <section class="relative py-24">
                    <div class="container mx-auto px-4">
                        <div class="mx-auto mb-16 max-w-3xl text-center">
                            <h2 class="mb-4 text-3xl font-bold tracking-tight">{{ t('features.title') }}</h2>
                            <p class="text-lg text-muted-foreground">
                                {{ t('features.subtitle') }}
                            </p>
                        </div>

                        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Motion v-for="(feature, index) in features" :key="feature.title"
                                :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                                :transition="{ duration: 0.4, delay: index * 0.1 }">
                                <Card
                                    class="group h-full border-border/50 bg-card/50 transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg">
                                    <CardHeader>
                                        <div
                                            class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                                            <Icon :icon="feature.icon" class="h-6 w-6" :class="feature.iconColor" />
                                        </div>
                                        <CardTitle class="text-xl">{{ t(feature.title) }}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription class="text-base">
                                            {{ t(feature.description) }}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </Motion>
                        </div>
                    </div>
                </section>

                <!-- CTA Section -->
                <section class="py-24">
                    <div class="container mx-auto px-4">
                        <div
                            class="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-b from-muted/50 to-muted/10 px-6 py-16 text-center md:px-16 md:py-24">
                            <h2 class="mb-6 text-3xl font-bold tracking-tight md:text-4xl">{{ t('cta.title') }}</h2>
                            <p class="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                                {{ t('cta.description') }}
                            </p>
                            <Button size="lg" class="rounded-full px-8 text-base">
                                {{ t('cta.button') }}
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <!-- Footer -->
            <footer class="border-t border-border/40 bg-muted/20 py-8">
                <div class="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
                    <p class="text-sm text-muted-foreground">&copy; {{ new Date().getFullYear() }} {{
                        t('footer.copyright') }}</p>
                    <div class="flex items-center gap-6">
                        <a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">{{
                            t('footer.docs') }}</a>
                        <a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">{{
                            t('footer.privacy') }}</a>
                        <a href="#" class="text-sm text-muted-foreground transition-colors hover:text-foreground">{{
                            t('footer.terms') }}</a>
                    </div>
                </div>
            </footer>
        </div>
    </App>
</template>

<i18n lang="json">{
    "en": {
        "hero": {
            "new": "New",
            "badge": "Everything you need to ship faster",
            "title_start": "Build your next idea with",
            "title_end": "VILT StartKit",
            "description": "The ultimate starter kit for modern web development. Powered by Laravel, Vue 3, Inertia.js, and Tailwind CSS.",
            "get_started": "Get Started",
            "github_repo": "Github Repo"
        },
        "tech": {
            "powered_by": "Powered by best-in-class technologies"
        },
        "features": {
            "title": "Everything you need",
            "subtitle": "Don't waste time on configuration. Focus on building your product with a fully configured stack."
        },
        "cta": {
            "title": "Ready to get started?",
            "description": "Clone the repository and start building your next big idea today.",
            "button": "Start Building Now"
        },
        "footer": {
            "copyright": "VILT StartKit. Open Source.",
            "docs": "Documentation",
            "privacy": "Privacy",
            "terms": "Terms"
        },
        "laravel": {
            "title": "Laravel 11",
            "description": "The PHP Framework for Web Artisans. Robust, scalable, and elegant."
        },
        "vue": {
            "title": "Vue 3",
            "description": "The Progressive JavaScript Framework. Versatile and performant."
        },
        "inertia": {
            "title": "Inertia.js",
            "description": "Build single-page apps, without building an API."
        },
        "tailwind": {
            "title": "Tailwind CSS 4",
            "description": "A utility-first CSS framework for rapid UI development."
        },
        "shadcn": {
            "title": "Shadcn UI",
            "description": "Beautifully designed components that you can copy and paste."
        },
        "motion": {
            "title": "Motion-v",
            "description": "A motion library for Vue, powered by Motion One."
        },
        "toast": {
            "welcome": "Welcome!",
            "welcomeDesc": "Welcome to VILT StartKit - your modern web development starter"
        }
    },
    "ar": {
        "hero": {
            "new": "جديد",
            "badge": "كل ما تحتاجه للإطلاق بشكل أسرع",
            "title_start": "ابنِ فكرتك القادمة مع",
            "title_end": "مجموعة VILT",
            "description": "مجموعة البداية المثالية لتطوير الويب الحديث. مدعومة بـ Laravel و Vue 3 و Inertia.js و Tailwind CSS.",
            "get_started": "ابدأ الآن",
            "github_repo": "مستودع Github"
        },
        "tech": {
            "powered_by": "مدعوم بأفضل التقنيات في فئتها"
        },
        "features": {
            "title": "كل ما تحتاجه",
            "subtitle": "لا تضيع وقتك في الإعدادات. ركز على بناء منتجك مع بنية برمجية مجهزة بالكامل."
        },
        "cta": {
            "title": "مستعد للبدء؟",
            "description": "انسخ المستودع وابدأ في بناء فكرتك الكبيرة التالية اليوم.",
            "button": "ابدأ البناء الآن"
        },
        "footer": {
            "copyright": "مجموعة VILT. مفتوحة المصدر.",
            "docs": "التوثيق",
            "privacy": "الخصوصية",
            "terms": "الشروط"
        },
        "laravel": {
            "title": "Laravel 11",
            "description": "إطار عمل PHP للحرفيين. قوي وقابل للتوسع وأنيق."
        },
        "vue": {
            "title": "Vue 3",
            "description": "إطار عمل JavaScript التقدمي. متعدد الاستخدامات وعالي الأداء."
        },
        "inertia": {
            "title": "Inertia.js",
            "description": "بناء تطبيقات صفحة واحدة دون بناء واجهة برمجة تطبيقات (API)."
        },
        "tailwind": {
            "title": "Tailwind CSS 4",
            "description": "إطار عمل CSS الأول للأدوات لتطوير واجهة المستخدم بسرعة."
        },
        "shadcn": {
            "title": "Shadcn UI",
            "description": "مكونات مصممة بشكل جميل يمكنك نسخها ولصقها."
        },
        "motion": {
            "title": "Motion-v",
            "description": "مكتبة حركة لـ Vue، مدعومة بـ Motion One."
        },
        "toast": {
            "welcome": "أهلاً وسهلاً!",
            "welcomeDesc": "مرحباً بك في مجموعة VILT - بداية تطوير الويب الحديث"
        }
    }
}</i18n>
