<script setup>
import { useForm, router } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'
import { useMediaQuery } from '@vueuse/core'
import { motion } from 'motion-v'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import AuthLayout from '@/layouts/auth.vue'

// Composables
const { t } = useI18n()
const isDesktop = useMediaQuery('(min-width: 768px)')

// Form
const form = useForm({
    email: '',
})

// Methods
const handleBackToIndex = () => {
    router.visit(route('auth.index'));
}

const handleSubmit = () => {
    form.post(route('auth.send-otp'));
}

// Animation variants
const cardVariants = {
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
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

const inputVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.2,
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

const buttonVariants = {
    initial: { opacity: 0, y: 10, scale: 0.90 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: 0.3,
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
}
</script>

<template>
    <AuthLayout :title="t('login_welcome')" :description="t('login_subtitle')"
        keywords="login, email verification, authentication">
        <motion.div :initial="cardVariants.initial" :animate="cardVariants.animate" key="auth-login">
            <Card class="border-none shadow-none bg-no">
                <CardHeader class="flex flex-col justify-center items-center text-center space-y-4 pb-2">
                    <!-- Back Button -->
                    <motion.div v-if="!isDesktop" :initial="{ opacity: 0, x: -20 }" :animate="{ opacity: 1, x: 0 }"
                        :transition="{ delay: 0.6 }" @click="handleBackToIndex"
                        class="absolute top-4 start-4 p-2 rounded-full hover:bg-secondary/50 transition-colors duration-200 cursor-pointer">
                        <Icon icon="solar:arrow-left-bold"
                            class="w-5 h-5 text-muted-foreground scale-x-[-1] ltr:scale-x-100" />
                    </motion.div>

                    <!-- Header Icon -->
                    <motion.div :initial="{ scale: 0, rotate: -180 }" :animate="{ scale: 1, rotate: 0 }" :transition="{
                        delay: 0.2,
                        duration: 0.6,
                        type: 'spring',
                        stiffness: 200
                    }"
                        class="mx-auto bg-black dark:bg-white p-2 w-16 h-16 rounded-2xl flex items-center justify-center mb-2">
                        <Icon icon="solar:letter-bold" class="w-7 h-7 text-white dark:text-black" />
                    </motion.div>

                    <CardTitle
                        class="text-2xl md:text-3xl font-bold tracking-tight leading-12 bg-gradient-to-r from-primary to-zinc-600 dark:to-zinc-400 bg-clip-text text-transparent">
                        {{ t('login_welcome') }}
                    </CardTitle>
                    <CardDescription class="text-base text-muted-foreground leading-relaxed px-2">
                        {{ t('login_subtitle') }}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form @submit="handleSubmit" class="space-y-6">
                        <!-- Error Alert -->
                        <motion.div v-if="form.errors.email" :initial="{ opacity: 0, height: 0 }"
                            :animate="{ opacity: 1, height: 'auto' }" :transition="{ duration: 0.3 }">
                            <Alert variant="destructive" class="border-destructive/20">
                                <Icon icon="solar:danger-bold" class="h-4 w-4" />
                                <AlertDescription>
                                    {{ form.errors.email }}
                                </AlertDescription>
                            </Alert>
                        </motion.div>

                        <!-- Email Input -->
                        <motion.div :initial="inputVariants.initial" :animate="inputVariants.animate" class="space-y-2">
                            <Label for="email" class="text-sm font-semibold text-foreground flex items-center gap-1">
                                {{ t('email') }}
                                <span class="text-red-500">*</span>:
                            </Label>
                            <div class="relative">
                                <Input id="email" name="email" type="email" v-model="form.email"
                                    :placeholder="t('email_placeholder')"
                                    class="h-12 text-base ps-12 border-2 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                                    :disabled="form.processing" required />
                                <Icon icon="solar:letter-line-duotone"
                                    class="absolute start-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            </div>
                        </motion.div>

                        <!-- Send OTP Button -->
                        <motion.div :initial="buttonVariants.initial" :animate="buttonVariants.animate"
                            :whileHover="buttonVariants.hover" :whilePress="buttonVariants.press">
                            <Button type="submit" :disabled="form.processing"
                                class="w-full flex-row rtl:flex-row-reverse h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                size="lg">
                                <template v-if="form.processing">
                                    <motion.div :animate="{ rotate: 360 }" :transition="{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: 'linear'
                                    }" class="me-2">
                                        <Icon icon="solar:refresh-bold" class="w-5 h-5" />
                                    </motion.div>
                                    {{ t('sending') }}
                                </template>
                                <template v-else>
                                    <Icon icon="solar:plain-2-bold" class="w-5 h-5 me-2" />
                                    {{ t('sendOtp') }}
                                </template>
                            </Button>
                        </motion.div>
                    </form>

                    <!-- Additional Info -->
                    <motion.div :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
                        :transition="{ delay: 0.5, duration: 0.3 }" class="mt-6 text-center">
                        <p class="text-sm text-muted-foreground leading-relaxed">
                            {{ t('code_info') }}
                        </p>
                    </motion.div>

                    <!-- Security Notice -->
                    <motion.div :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }"
                        :transition="{ delay: 0.7, duration: 0.3 }"
                        class="mt-6 flex flex-row gap-x-3 rtl:flex-row-reverse items-center justify-center space-x-2 p-3 bg-secondary rounded-lg border border-secondary">
                        <Icon icon="solar:shield-check-bold" class="w-4 h-4 text-primary" />
                        <span class="text-xs text-muted-foreground font-medium">
                            {{ t('secured_encryption') }}
                        </span>
                    </motion.div>
                </CardContent>
            </Card>

            <!-- Help Links for Desktop -->
            <motion.div v-if="isDesktop" :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                :transition="{ delay: 0.9, duration: 0.4 }" class="mt-6 flex justify-center space-x-6 text-sm">
                <button class="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">
                    {{ t('need_help') }}
                </button>
                <button class="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">
                    {{ t('contact_support') }}
                </button>
            </motion.div>
        </motion.div>
    </AuthLayout>
</template>

<i18n lang="json">{
    "ar": {
        "login_welcome": "تسجيل الدخول",
        "login_subtitle": "أدخل بريدك الإلكتروني للمتابعة",
        "email": "البريد الإلكتروني",
        "email_placeholder": "أدخل بريدك الإلكتروني",
        "sendOtp": "إرسال رمز التحقق",
        "sending": "جاري الإرسال...",
        "code_info": "سيتم إرسال رمز تحقق مكون من 6 أرقام إلى بريدك الإلكتروني",
        "secured_encryption": "محمي بالتشفير الآمن",
        "need_help": "تحتاج مساعدة؟",
        "contact_support": "اتصل بالدعم"
    },
    "en": {
        "login_welcome": "Login",
        "login_subtitle": "Enter your email to continue",
        "email": "Email",
        "email_placeholder": "Enter your email",
        "sendOtp": "Send verification code",
        "sending": "Sending...",
        "code_info": "A 6-digit verification code will be sent to your email",
        "secured_encryption": "Secured with encryption",
        "need_help": "Need help?",
        "contact_support": "Contact support"
    }
}</i18n>
