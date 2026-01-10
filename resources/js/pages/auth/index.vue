<script setup>
import { computed } from 'vue'
import { router } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'
import { useMediaQuery } from '@vueuse/core'
import { motion } from "motion-v"
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import AppLogo from '@/components/app/Logo/index.vue'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import AuthLayout from '@/layouts/auth.vue'
import { useDevice } from '@/composables/useDevice';

// Composables
const { t } = useI18n()
const { isDesktop } = useDevice();

// Methods
const handleLoginRedirectIsLoading = ref(false);
const handleLoginRedirect = () => {
    handleLoginRedirectIsLoading.value = true;
    router.visit(route('auth.login'), {
        showProgress: false
    }, () => {
        handleLoginRedirectIsLoading.value = false;
    })
}


// Computed
const features = computed(() => [
    {
        icon: 'solar:shield-check-bold',
        text: t('feature_security'),
    },
    {
        icon: 'solar:bolt-bold',
        text: t('fast'),
    },
    {
        icon: 'solar:smartphone-bold',
        text: t('mobile'),
    },
])

// Animation variants
const cardVariants = (index) => ({
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.95,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: Math.min(0.4 + index * 0.1, 0.3), // ماكس 300ms
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
})

const buttonVariants = (index) => ({
    initial: { opacity: 0, y: 10, scale: 0.70 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: Math.min(0.4 + index * 0.15, 0.3), // ماكس 300ms
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    hover: {
        scale: 0.98,
        transition: { duration: 0.2 },
    },
    press: {
        scale: 0.98,
        transition: { duration: 0.1 },
    },
})
</script>

<template>
    <AuthLayout :title="t('welcome')" :description="t('hero_subtitle')"
        keywords="authentication, login, Rqeim, platform">
        <motion.div :initial="cardVariants.initial" :animate="cardVariants.animate" key="auth-index">
            <Card class="border-none shadow-none bg-no">
                <CardHeader class="flex flex-col justify-center items-center text-center space-y-4 pb-2">
                    <motion.div :initial="{ scale: 0, rotate: -180 }" :animate="{ scale: 1, rotate: 0 }" :transition="{
                        delay: 0.2,
                        duration: 0.6,
                        type: 'spring',
                        stiffness: 200
                    }"
                        class="mx-auto bg-black dark:bg-white border-none p-2 w-16 h-16 rounded-2xl flex items-center justify-center mb-2">
                        <AppLogo type="icon" />
                    </motion.div>

                    <CardTitle
                        class="text-2xl md:text-3xl font-bold tracking-tight leading-12 bg-gradient-to-r from-primary to-zinc-600 dark:to-zinc-400 bg-clip-text text-transparent">
                        {{ t('welcome') }}
                    </CardTitle>
                    <CardDescription class="text-base text-muted-foreground leading-relaxed px-2">
                        {{ t('hero_subtitle') }}
                    </CardDescription>
                </CardHeader>

                <CardContent class="space-y-6">
                    <!-- Primary Login Button -->
                    <motion.div :initial="buttonVariants(0).initial" :animate="buttonVariants(0).animate"
                        :whileHover="buttonVariants(0).hover" :whilePress="buttonVariants(0).press">
                        <Button @click="handleLoginRedirect" :disabled="handleLoginRedirectIsLoading" variant="default"
                            class="w-full flex-row rtl:flex-row-reverse h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                            size="lg">
                            <template v-if="handleLoginRedirectIsLoading">
                                <motion.div :animate="{ rotate: 360 }" :transition="{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }" class="me-2">
                                    <Icon icon="solar:refresh-bold" class="w-5 h-5" />
                                </motion.div>
                                {{ t('pending') }}
                            </template>
                            <template v-else>
                                <Icon icon="solar:login-3-bold" class="w-5 h-5 me-2" />
                                {{ t('continue') }}
                            </template>
                        </Button>
                    </motion.div>

                    <!-- Divider -->
                    <motion.div :initial="{ opacity: 0, scaleX: 0 }" :animate="{ opacity: 1, scaleX: 1 }"
                        :transition="{ delay: 0.4, duration: 0.3 }" class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <span class="w-full border-t border-muted-foreground/20" />
                        </div>
                        <div class="relative flex justify-center text-xs uppercase">
                            <span class="bg-card px-3 text-muted-foreground font-medium tracking-wider">
                                {{ t('or_continue_with') }}
                            </span>
                        </div>
                    </motion.div>

                    <!-- Google Login Button -->
                    <motion.div :initial="buttonVariants(1).initial" :animate="buttonVariants(1).animate"
                        :whileHover="buttonVariants(1).hover" :whilePress="buttonVariants(1).press">
                        <Button as="a" :href="route('auth.google')" variant="outline"
                            class="w-full flex-row rtl:flex-row-reverse h-12 text-base font-semibold border-2 hover:bg-secondary/50 transition-all duration-300"
                            size="lg">
                            <Icon icon="flat-color-icons:google" class="w-5 h-5 me-2" />
                            {{ t('continue_with_google') }}
                        </Button>
                    </motion.div>

                    <!-- Microsoft Login Button -->
                    <motion.div :initial="buttonVariants(2).initial" :animate="buttonVariants(2).animate"
                        :whileHover="buttonVariants(2).hover" :whilePress="buttonVariants(2).press">
                        <Button as="a" :href="route('auth.microsoft')" variant="outline"
                            class="w-full flex-row rtl:flex-row-reverse h-12 text-base font-semibold border-2 hover:bg-secondary/50 transition-all duration-300"
                            size="lg">
                            <Icon icon="logos:microsoft-icon" class="w-5 h-5 me-2" />
                            {{ t('continue_with_microsoft') }}
                        </Button>
                    </motion.div>

                    <!-- Additional Options -->
                    <motion.div :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
                        :transition="{ delay: 1, duration: 0.3 }" class="space-y-3">
                        <div class="flex justify-center space-x-6 text-sm">
                            <a href="https://rqeim.com/page/tos" target="_blank"
                                class="text-muted-foreground cursor-pointer hover:text-primary transition-colors duration-200 font-medium">
                                {{ t('terms') }}
                            </a>
                            <a href="https://rqeim.com/page/privacy" target="_blank"
                                class="text-muted-foreground cursor-pointer hover:text-primary transition-colors duration-200 font-medium">
                                {{ t('privacy') }}
                            </a>
                        </div>
                    </motion.div>
                </CardContent>
            </Card>

            <!-- Feature highlights for desktop -->
            <motion.div v-if="isDesktop" :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                :transition="{ delay: 0.8, duration: 0.4 }" class="mt-8 grid grid-cols-3 gap-4 text-center">
                <motion.div v-for="(feature, index) in features" :key="feature.text" :initial="{ opacity: 0, y: 10 }"
                    :animate="{ opacity: 1, y: 0 }" :whileHover="{ scale: 0.98, transition: { duration: 0.1 } }"
                    :transition="{ duration: 0.9 + index * 0.1 }" class="flex flex-col items-center space-y-2">
                    <div class="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Icon :icon="feature.icon" class="w-5 h-5 text-primary" />
                    </div>
                    <span class="text-sm text-muted-foreground font-medium">
                        {{ feature.text }}
                    </span>
                </motion.div>
            </motion.div>

        </motion.div>
    </AuthLayout>
</template>

<i18n lang="json">{
    "ar": {
        "welcome": "مرحبا بك في رقيم",
        "hero_subtitle": "تسجيل الدخول إلى حسابك",
        "continue": "المتابعة",
        "continue_with_google": "المتابعة باستخدام Google",
        "continue_with_microsoft": "المتابعة باستخدام Microsoft",
        "feature_security": "امن",
        "or_continue_with": "أو تابع باستخدام",
        "terms": "الشروط والأحكام",
        "privacy": "سياسة الخصوصية",
        "fast": "سريع",
        "mobile": "متوافق",
        "pending": "جاري التحميل ..."
    },
    "en": {
        "welcome": "Welcome to Rqeim",
        "hero_subtitle": "Login to your account",
        "continue": "Continue",
        "continue_with_google": "Continue with Google",
        "continue_with_microsoft": "Continue with Microsoft",
        "feature_security": "Security",
        "or_continue_with": "Or continue with",
        "terms": "Terms & Conditions",
        "privacy": "Privacy Policy",
        "fast": "Fast",
        "mobile": "Mobile Friendly",
        "pending": "Pending ..."
    }
}</i18n>
