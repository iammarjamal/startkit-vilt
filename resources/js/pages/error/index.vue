<script setup>
import { computed, onMounted } from 'vue'
import { router } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'
import { motion } from 'motion-v'
import { Button } from '@/components/ui/button'
import AppLayout from '@/layouts/app.vue'

// Props
const props = defineProps({
    status: {
        type: [String, Number],
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    }
})

// Composables
const { t } = useI18n()

// Computed
const titleMap = {
    503: '503',
    500: '500',
    404: '404',
    403: '403',
}

const errorTitle = computed(() => {
    return titleMap[props.status] || `${props.status}: ${t('errors.unknown')}`
})

// Methods
const goBack = () => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const referrer = document.referrer
        const currentOrigin = window.location.origin

        const fromSameOrigin = referrer && new URL(referrer).origin === currentOrigin

        if (window.history.length > 1) {
            window.history.back()
        } else if (fromSameOrigin) {
            router.visit(referrer)
        } else {
            router.visit('/')
        }
    } else {
        router.visit('/')
    }
}

// Animation variants
const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.2,
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

const titleVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            delay: 0.3,
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

const contentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.4,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
}

const buttonVariants = (index) => ({
    initial: { opacity: 0, y: 10 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.4 + index * 0.1,
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
        },
    },
    hover: {
        scale: 0.95,
        transition: { duration: 0.2 },
    },
    press: {
        scale: 0.95,
        transition: { duration: 0.1 },
    },
})
</script>

<template>
    <AppLayout :title="title || errorTitle" :description="desc || t(`errors.${status}.desc`)"
        :keywords="`error ${status}, page not found, server error`">
        <div class="m-auto flex h-full min-h-screen w-full flex-col items-center justify-center gap-2">
            <div class="flex h-full min-h-screen flex-col place-content-center items-center justify-center px-4">
                <motion.div :initial="containerVariants.initial" :animate="containerVariants.animate"
                    class="flex w-full flex-col items-center justify-center gap-y-2">
                    <!-- Error Code -->
                    <motion.div :initial="titleVariants.initial" :animate="titleVariants.animate"
                        class="text-[7rem] leading-tight font-bold bg-gradient-to-r from-primary to-zinc-700 bg-clip-text text-transparent">
                        {{ errorTitle }}
                    </motion.div>

                    <!-- Error Title -->
                    <motion.div :initial="contentVariants.initial" :animate="contentVariants.animate"
                        class="font-medium text-xl text-foreground">
                        {{ t(`errors.${status}.title`) }}
                    </motion.div>

                    <!-- Error Description -->
                    <motion.div :initial="contentVariants.initial" :animate="contentVariants.animate"
                        class="text-center text-muted-foreground max-w-md leading-relaxed">
                        {{ t(`errors.${status}.desc`) }}
                    </motion.div>
                </motion.div>

                <!-- Action Buttons -->
                <motion.div :initial="{ opacity: 0, y: 20 }" :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 0.8, duration: 0.4 }" class="mt-6 flex gap-x-4">
                    <motion.div :custom="0" :initial="buttonVariants.initial" :animate="buttonVariants.animate"
                        :whileHover="buttonVariants.hover" :whilePress="buttonVariants.press">
                        <Button @click="() => router.visit(route('home.index'))"
                            class="h-9 px-4 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                            {{ t('errors.home') }}
                        </Button>
                    </motion.div>

                    <motion.div :custom="1" :initial="buttonVariants.initial" :animate="buttonVariants.animate"
                        :whileHover="buttonVariants.hover" :whilePress="buttonVariants.press">
                        <Button @click="goBack" variant="outline"
                            class="h-9 px-4 py-2 text-sm font-medium border-2 hover:bg-secondary/50 transition-all duration-300">
                            {{ t('errors.back') }}
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    </AppLayout>
</template>

<i18n lang="json">{
    "ar": {
        "errors": {
            "503": {
                "title": "الخدمة غير متاحة مؤقتاً",
                "desc": "نعتذر، الخدمة غير متاحة حالياً. يرجى المحاولة مرة أخرى لاحقاً."
            },
            "500": {
                "title": "خطأ في الخادم",
                "desc": "حدث خطأ داخلي في الخادم. يرجى المحاولة مرة أخرى لاحقاً."
            },
            "404": {
                "title": "الصفحة غير موجودة",
                "desc": "عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
            },
            "403": {
                "title": "الوصول مرفوض",
                "desc": "ليس لديك صلاحية للوصول إلى هذه الصفحة."
            },
            "unknown": "خطأ غير معروف",
            "home": "العودة للرئيسية",
            "back": "العودة"
        }
    },
    "en": {
        "errors": {
            "503": {
                "title": "Service Unavailable",
                "desc": "Sorry, the service is temporarily unavailable. Please try again later."
            },
            "500": {
                "title": "Server Error",
                "desc": "An internal server error occurred. Please try again later."
            },
            "404": {
                "title": "Page Not Found",
                "desc": "Sorry, the page you are looking for doesn't exist or has been moved."
            },
            "403": {
                "title": "Access Denied",
                "desc": "You don't have permission to access this page."
            },
            "unknown": "Unknown Error",
            "home": "Go Home",
            "back": "Go Back"
        }
    }
}</i18n>
