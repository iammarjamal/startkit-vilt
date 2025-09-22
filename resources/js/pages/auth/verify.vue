<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useForm, router } from '@inertiajs/vue3'
import { useMediaQuery } from '@vueuse/core'
import { motion } from 'motion-v'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/pin-input'
import AuthLayout from '@/layouts/auth.vue'

// Props
const props = defineProps({
    email: {
        type: String,
        default: ''
    },
    otp: {
        type: String,
        default: ''
    },
    errors: {
        type: Object,
        default: () => ({})
    }
})

// Composables
const isDesktop = useMediaQuery('(min-width: 768px)')

// Reactive data
const timeLeft = ref(600) // 10 minutes in seconds
let timerInterval = null

// Forms
const form = useForm({
    otp: props.otp || '',
})

const resendForm = useForm({})

// Watch for prop changes
watch(() => props.otp, (newOtp) => {
    if (newOtp && form.otp !== newOtp) {
        form.otp = newOtp
    }
})

// Methods
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

const handleBackToLogin = () => {
    router.push(route('auth.login'))
}

const handleSubmit = (e) => {
    e.preventDefault()
    form.post(route('auth.verify-otp'))
}

const handleResend = (e) => {
    e.preventDefault()
    timeLeft.value = 600 // Reset timer to 10 minutes
    resendForm.post(route('auth.resend-otp'))
}

// Lifecycle
onMounted(() => {
    timerInterval = setInterval(() => {
        timeLeft.value -= 1
        if (timeLeft.value <= 0) {
            clearInterval(timerInterval)
            timeLeft.value = 0
        }
    }, 1000)
})

onUnmounted(() => {
    if (timerInterval) {
        clearInterval(timerInterval)
    }
})

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

const otpVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.2,
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.3,
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    hover: {
        scale: 1.02,
        transition: { duration: 0.2 },
    },
    tap: {
        scale: 0.98,
        transition: { duration: 0.1 },
    },
}
</script>

<template>
    <AuthLayout :title="$t('verify_title')" :description="$t('verify_subtitle')"
        keywords="email verification, OTP, security code">
        <motion.div :initial="cardVariants.initial" :animate="cardVariants.animate" key="auth-verify">
            <Card class="border-none shadow-none bg-no">
                <CardHeader class="flex flex-col justify-center items-center text-center space-y-4 pb-2">
                    <!-- Back Button -->
                    <motion.div v-if="!isDesktop" :initial="{ opacity: 0, x: -20 }" :animate="{ opacity: 1, x: 0 }"
                        :transition="{ delay: 0.6 }" @click="handleBackToLogin"
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
                        <Icon icon="solar:shield-keyhole-bold" class="w-7 h-7 text-white dark:text-black" />
                    </motion.div>

                    <CardTitle
                        class="text-2xl md:text-3xl font-bold tracking-tight leading-12 bg-gradient-to-r from-primary to-zinc-600 dark:to-zinc-400 bg-clip-text text-transparent">
                        {{ $t('verify_title') }}
                    </CardTitle>
                    <CardDescription class="text-base text-muted-foreground leading-relaxed px-2">
                        {{ $t('verify_subtitle') }}
                        <br />
                        <span class="font-semibold text-foreground">
                            {{ email }}
                        </span>
                    </CardDescription>
                </CardHeader>

                <CardContent class="space-y-6">
                    <form @submit="handleSubmit">
                        <!-- Error Alert -->
                        <motion.div v-if="form.errors.otp || errors.otp" :initial="{ opacity: 0, height: 0 }"
                            :animate="{ opacity: 1, height: 'auto' }" :transition="{ duration: 0.3 }">
                            <Alert variant="destructive" class="border-destructive/20">
                                <Icon icon="solar:danger-bold" class="h-4 w-4" />
                                <AlertDescription>
                                    {{ form.errors.otp || errors.otp }}
                                </AlertDescription>
                            </Alert>
                        </motion.div>

                        <!-- OTP Input -->
                        <motion.div :initial="otpVariants.initial" :animate="otpVariants.animate" dir="ltr"
                            class="flex justify-center">
                            <InputOTP :maxLength="6" name="otp" v-model="form.otp" class="gap-2">
                                <InputOTPGroup class="gap-2">
                                    <InputOTPSlot v-for="index in 6" :key="index" :index="index - 1"
                                        class="w-12 h-12 text-lg font-bold border-2 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 rounded-lg" />
                                </InputOTPGroup>
                            </InputOTP>
                        </motion.div>

                        <!-- Timer -->
                        <motion.div :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
                            :transition="{ delay: 0.4, duration: 0.3 }" class="text-center my-5">
                            <div class="flex items-center justify-center space-x-2">
                                <Icon icon="solar:clock-circle-bold"
                                    :class="`w-4 h-4 ${timeLeft <= 60 ? 'text-destructive' : 'text-muted-foreground'}`" />
                                <span
                                    :class="`text-sm font-medium ${timeLeft <= 60 ? 'text-destructive' : 'text-muted-foreground'}`">
                                    {{ $t('code_expires') }} {{ formatTime(timeLeft) }}
                                </span>
                            </div>
                        </motion.div>

                        <!-- Verify Button -->
                        <motion.div :initial="buttonVariants.initial" :animate="buttonVariants.animate"
                            :whileHover="buttonVariants.hover" :whilePress="buttonVariants.tap">
                            <Button type="submit" :disabled="(form.otp || '').length !== 6 ||
                                form.processing ||
                                timeLeft === 0
                                "
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
                                    {{ $t('verifying') }}
                                </template>
                                <template v-else>
                                    <Icon icon="solar:check-circle-bold" class="w-5 h-5 me-2" />
                                    {{ $t('verify') }}
                                </template>
                            </Button>
                        </motion.div>
                    </form>

                    <!-- Resend Code -->
                    <form @submit="handleResend">
                        <motion.div :initial="{ opacity: 0 }" :animate="{ opacity: 1 }"
                            :transition="{ delay: 0.5, duration: 0.3 }" class="text-center">
                            <p class="text-sm text-muted-foreground mb-3">
                                {{ $t('didnt_receive') }}
                            </p>

                            <Button variant="outline" type="submit" :disabled="resendForm.processing || timeLeft > 540"
                                class="h-10 px-6 flex-row rtl:flex-row-reverse border-2 hover:bg-secondary/50 transition-all duration-300">
                                <template v-if="resendForm.processing">
                                    <motion.div :animate="{ rotate: 360 }" :transition="{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: 'linear'
                                    }" class="me-2">
                                        <Icon icon="solar:refresh-bold" class="w-4 h-4" />
                                    </motion.div>
                                    {{ $t('sending') }}
                                </template>
                                <template v-else>
                                    <Icon icon="solar:refresh-broken" class="w-4 h-4 me-2" />
                                    {{ $t('resend_code') }}
                                    <span v-if="timeLeft > 540">
                                        ({{ formatTime(timeLeft - 540) }})
                                    </span>
                                </template>
                            </Button>
                        </motion.div>
                    </form>

                    <!-- Security Notice -->
                    <motion.div :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }"
                        :transition="{ delay: 0.7, duration: 0.3 }"
                        class="flex flex-row rtl:flex-row-reverse items-center justify-center gap-x-2 p-3 bg-secondary/20 rounded-lg border border-secondary/30">
                        <Icon icon="solar:shield-check-bold" class="w-4 h-4 text-primary" />
                        <span class="text-xs text-muted-foreground font-medium">
                            {{ $t('keep_private') }}
                        </span>
                    </motion.div>
                </CardContent>
            </Card>

            <!-- Help Text for Desktop -->
            <motion.div v-if="isDesktop" :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                :transition="{ delay: 0.9, duration: 0.4 }" class="mt-6 text-center">
                <p class="text-sm text-muted-foreground leading-relaxed">
                    {{ $t('having_trouble') }}
                    <button class="text-primary hover:underline font-medium">
                        {{ $t('contact_support') }}
                    </button>
                </p>
            </motion.div>
        </motion.div>
    </AuthLayout>
</template>

<i18n lang="json">{
    "ar": {
        "verify_title": "تحقق من بريدك الإلكتروني",
        "verify_subtitle": "أدخل رمز التحقق المرسل إلى:",
        "code_expires": "ينتهي الرمز خلال",
        "verify": "تحقق",
        "verifying": "جاري التحقق...",
        "resend_code": "إعادة إرسال الرمز",
        "didnt_receive": "لم تستلم الرمز؟",
        "keep_private": "احتفظ بالرمز سريًا",
        "having_trouble": "تواجه مشاكل؟ ",
        "contact_support": "اتصل بالدعم",
        "sending": "جاري الإرسال..."
    },
    "en": {
        "verify_title": "Verify your email",
        "verify_subtitle": "Enter the verification code sent to:",
        "code_expires": "Code expires in",
        "verify": "Verify",
        "verifying": "Verifying...",
        "resend_code": "Resend code",
        "didnt_receive": "Didn't receive the code?",
        "keep_private": "Keep this code private",
        "having_trouble": "Having trouble? ",
        "contact_support": "Contact support",
        "sending": "Sending..."
    }
}</i18n>
