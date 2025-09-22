<script setup>
import { computed } from 'vue'
import { usePage, router } from '@inertiajs/vue3'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icon } from '@iconify/vue'

const { t } = useI18n();
const { props } = usePage()
const user = computed(() => props.auth?.user)

const handleLogout = () => {
    router.post(route('auth.logout'))
}

const getProviderName = (provider) => {
    const providerNames = {
        google: 'Google',
        microsoft: 'Microsoft'
    }
    return providerNames[provider] || provider
}

const getOAuthProviderName = (provider) => {
    const oauthNames = {
        google: 'Google OAuth',
        microsoft: 'Microsoft OAuth'
    }
    return oauthNames[provider] || 'OAuth'
}
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
        <div class="container mx-auto px-4 py-8">
            <!-- Header -->
            <motion.div
                :initial="{ opacity: 0, y: -20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5 }"
                class="flex justify-between items-center mb-8"
            >
                <div>
                    <h1 class="text-3xl font-bold text-foreground">
                        {{ t('dashboard.title') }}
                    </h1>
                    <p class="text-muted-foreground mt-1">
                        {{ t('dashboard.welcome', { name: user?.name }) }}
                    </p>
                </div>
                <Button
                    variant="outline"
                    @click="handleLogout"
                    class="flex items-center gap-2"
                >
                    <Icon icon="solar:logout-2-bold" class="w-4 h-4" />
                    {{ t('dashboard.logout') }}
                </Button>
            </motion.div>

            <!-- User Info Card -->
            <motion.div
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, delay: 0.2 }"
            >
                <Card>
                    <CardHeader>
                        <CardTitle class="flex items-center gap-3">
                            <img
                                v-if="user?.avatar"
                                :src="user.avatar"
                                :alt="user.name"
                                class="w-12 h-12 rounded-full border-2 border-primary/20"
                            />
                            <div>
                                <div class="text-lg font-semibold">
                                    {{ user?.name }}
                                </div>
                                <div class="text-sm text-muted-foreground font-normal">
                                    {{ user?.email }}
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex items-center gap-2">
                                <Icon
                                    icon="solar:user-id-bold"
                                    class="w-5 h-5 text-primary"
                                />
                                <span class="text-sm">
                                    {{ t('dashboard.userId', { id: user?.id }) }}
                                </span>
                            </div>
                            <div v-if="user?.provider" class="flex items-center gap-2">
                                <Icon
                                    icon="solar:shield-check-bold"
                                    class="w-5 h-5 text-green-500"
                                />
                                <span class="text-sm">
                                    {{ t('dashboard.authenticatedVia', { provider: getProviderName(user.provider) }) }}
                                </span>
                            </div>
                            <div v-if="user?.email_verified_at" class="flex items-center gap-2">
                                <Icon
                                    icon="solar:verified-check-bold"
                                    class="w-5 h-5 text-blue-500"
                                />
                                <span class="text-sm">
                                    {{ t('dashboard.emailVerified') }}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <!-- Welcome Message -->
            <motion.div
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, delay: 0.4 }"
                class="mt-8 text-center"
            >
                <div class="bg-primary/10 border border-primary/20 rounded-lg p-6">
                    <Icon
                        icon="solar:stars-bold"
                        class="w-8 h-8 text-primary mx-auto mb-3"
                    />
                    <h2 class="text-xl font-semibold text-foreground mb-2">
                        {{ t('dashboard.successTitle') }}
                    </h2>
                    <p class="text-muted-foreground">
                        {{ t('dashboard.successMessage', { provider: getOAuthProviderName(user?.provider) }) }}
                    </p>
                </div>
            </motion.div>
        </div>
    </div>
</template>

<i18n lang="json">
{
    "en": {
        "dashboard": {
            "title": "Dashboard",
            "welcome": "Welcome, {name}",
            "logout": "Logout",
            "userId": "User ID: {id}",
            "authenticatedVia": "Authenticated via: {provider}",
            "emailVerified": "Email verified",
            "successTitle": "Successfully logged in!",
            "successMessage": "You have successfully logged in via {provider}. You can now access all features."
        }
    },
    "ar": {
        "dashboard": {
            "title": "لوحة التحكم",
            "welcome": "مرحباً بك، {name}",
            "logout": "تسجيل الخروج",
            "userId": "معرف المستخدم: {id}",
            "authenticatedVia": "مصادق عبر: {provider}",
            "emailVerified": "البريد الإلكتروني موثق",
            "successTitle": "تم تسجيل الدخول بنجاح!",
            "successMessage": "لقد تم تسجيل دخولك بنجاح عبر {provider}. يمكنك الآن الوصول إلى جميع الميزات."
        }
    }
}
</i18n>
