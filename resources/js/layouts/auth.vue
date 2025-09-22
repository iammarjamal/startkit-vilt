<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMediaQuery } from '@vueuse/core'
import { Motion } from 'motion-v'
import { cn } from '@/lib/utils'
import AppLayout from '@/layouts/app.vue'

// Props
const props = defineProps({
    showSidePanel: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    keywords: {
        type: String,
        default: ''
    },
    children: {
        type: Object,
        default: null
    }
})

// Composables
const { t, locale } = useI18n()
const isDesktop = useMediaQuery('(min-width: 768px)')

// Computed
const isRTL = computed(() => locale.value === 'ar')

// Animation variants
const pageVariants = computed(() => ({
    initial: {
        opacity: 0,
        y: isDesktop.value ? 20 : 30,
        scale: isDesktop.value ? 0.98 : 0.95,
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    exit: {
        opacity: 0,
        y: isDesktop.value ? -20 : -30,
        scale: isDesktop.value ? 1.02 : 1.05,
        transition: {
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}))

const sidePanelVariants = {
    initial: { opacity: 1 },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

const pageTransition = {
    enterActive: 'transition-all duration-300 ease-out',
    leaveActive: 'transition-all duration-200 ease-in',
    enterFrom: 'opacity-0 transform scale-95 translate-y-4',
    leaveTo: 'opacity-0 transform scale-105 -translate-y-4'
}
</script>

<template>
    <AppLayout :title="title" :description="description" :keywords="keywords" :showSplash="false">

        <!-- Mobile Layout -->
        <div v-if="!isDesktop"
            class="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4">
            <div class="w-full max-w-sm">
                <Transition mode="out-in" :enter-active-class="pageTransition.enterActive"
                    :leave-active-class="pageTransition.leaveActive" :enter-from-class="pageTransition.enterFrom"
                    :leave-to-class="pageTransition.leaveTo">
                    <Motion :key="children?.key || 'auth-content'" :initial="pageVariants.initial"
                        :animate="pageVariants.animate" :exit="pageVariants.exit" class="w-full">
                        <slot />
                    </Motion>
                </Transition>
            </div>
        </div>

        <!-- Desktop Layout -->
        <div v-else class="min-h-screen bg-background flex">
            <!-- Main Content -->
            <div :class="cn(
                'flex-1 flex items-center justify-center p-8',
                showSidePanel ? 'md:w-1/2 lg:w-2/5' : 'w-full'
            )">
                <div class="w-full max-w-md">
                    <Transition mode="out-in" :enter-active-class="pageTransition.enterActive"
                        :leave-active-class="pageTransition.leaveActive" :enter-from-class="pageTransition.enterFrom"
                        :leave-to-class="pageTransition.leaveTo">
                        <Motion :key="children?.key || 'auth-content'" :initial="pageVariants.initial"
                            :animate="pageVariants.animate" :exit="pageVariants.exit" class="w-full">
                            <slot />
                        </Motion>
                    </Transition>
                </div>
            </div>

            <!-- Side Panel -->
            <Motion v-if="showSidePanel" :initial="sidePanelVariants.initial" :animate="sidePanelVariants.animate"
                class="hidden md:flex md:w-1/2 lg:w-3/5 relative overflow-hidden">
                <!-- Content overlay -->
                <div class="relative z-10 flex flex-col justify-center items-center text-white p-12">
                    <!-- Floating elements -->
                    <Motion :animate="{ y: [0, -10, 0] }" :transition="{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }" :class="`absolute top-20 ${isRTL ? 'end-20' : 'start-20'} w-4 h-4 bg-white/20 rounded-full`" />
                    <Motion :animate="{ y: [0, 15, 0] }" :transition="{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1
                    }"
                        :class="`absolute bottom-32 ${isRTL ? 'start-16' : 'end-16'} w-6 h-6 bg-white/15 rounded-full`" />
                </div>

                <!-- Background with animated gradient -->
                <div class="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary">
                    <!-- Animated background pattern -->
                    <Motion :animate="{
                        background: [
                            'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                            'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                            'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.1) 0%, transparent 50%)'
                        ]
                    }" :transition="{
                duration: 8,
                repeat: Infinity,
                repeatType: 'reverse'
            }" class="absolute inset-0" />

                    <!-- Geometric patterns -->
                    <div class="absolute inset-0 opacity-10">
                        <svg class="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                            <Motion tag="circle" cx="100" cy="100" r="50" fill="none" stroke="currentColor"
                                stroke-width="1" :animate="{ rotate: 360 }" :transition="{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }" />
                            <Motion tag="circle" cx="300" cy="300" r="80" fill="none" stroke="currentColor"
                                stroke-width="1" :animate="{ rotate: -360 }" :transition="{
                                    duration: 25,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }" />
                            <Motion tag="polygon" points="200,50 250,150 150,150" fill="none" stroke="currentColor"
                                stroke-width="1" :animate="{ rotate: 360 }" :transition="{
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }" />
                        </svg>
                    </div>
                </div>
            </Motion>
        </div>
    </AppLayout>
</template>

<i18n lang="json">{
    "ar": {
        "welcome": "مرحبا بك",
        "hero_subtitle": "ادخل إلى منصة Rqeim الرقمية",
        "continue": "المتابعة",
        "continue_with_google": "المتابعة باستخدام Google",
        "continue_with_microsoft": "المتابعة باستخدام Microsoft",
        "feature_security": "الأمان",
        "login_welcome": "تسجيل الدخول",
        "login_subtitle": "أدخل بريدك الإلكتروني للمتابعة",
        "email": "البريد الإلكتروني",
        "email_placeholder": "أدخل بريدك الإلكتروني",
        "sendOtp": "إرسال رمز التحقق",
        "sending": "جاري الإرسال...",
        "verify_title": "تحقق من بريدك الإلكتروني",
        "verify_subtitle": "أدخل رمز التحقق المرسل إلى:",
        "code_expires": "ينتهي الرمز خلال",
        "verify": "تحقق",
        "verifying": "جاري التحقق...",
        "resend_code": "إعادة إرسال الرمز",
        "didnt_receive": "لم تستلم الرمز؟",
        "keep_private": "احتفظ بالرمز سريًا",
        "secured_encryption": "محمي بالتشفير الآمن",
        "code_info": "سيتم إرسال رمز تحقق مكون من 6 أرقام إلى بريدك الإلكتروني",
        "need_help": "تحتاج مساعدة؟",
        "contact_support": "اتصل بالدعم",
        "having_trouble": "تواجه مشاكل؟ "
    },
    "en": {
        "welcome": "Welcome",
        "hero_subtitle": "Enter Rqeim digital platform",
        "continue": "Continue",
        "continue_with_google": "Continue with Google",
        "continue_with_microsoft": "Continue with Microsoft",
        "feature_security": "Security",
        "login_welcome": "Login",
        "login_subtitle": "Enter your email to continue",
        "email": "Email",
        "email_placeholder": "Enter your email",
        "sendOtp": "Send verification code",
        "sending": "Sending...",
        "verify_title": "Verify your email",
        "verify_subtitle": "Enter the verification code sent to:",
        "code_expires": "Code expires in",
        "verify": "Verify",
        "verifying": "Verifying...",
        "resend_code": "Resend code",
        "didnt_receive": "Didn't receive the code?",
        "keep_private": "Keep this code private",
        "secured_encryption": "Secured with encryption",
        "code_info": "A 6-digit verification code will be sent to your email",
        "need_help": "Need help?",
        "contact_support": "Contact support",
        "having_trouble": "Having trouble? "
    }
}</i18n>
