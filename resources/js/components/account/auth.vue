<script setup>
import { Icon } from '@iconify/vue';
import { useForm } from '@inertiajs/vue3';
import { Motion } from 'motion-v';
import { computed, ref, watch } from 'vue'; // Import computed
import { useI18n } from 'vue-i18n';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PinInput, PinInputGroup, PinInputSlot } from '@/components/ui/pin-input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // Import AlertTitle for better error messages

const props = defineProps({
  withoutButtonLogin: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['authSuccess', 'goBack']);

const { t, locale } = useI18n(); // Destructure locale from useI18n
const step = ref('login'); // 'login' or 'verify'
const errorMessage = ref(''); // Renamed from 'error' to avoid confusion and be more descriptive

const loginForm = useForm({
  email: null,
});

const verifyForm = useForm({
  email: null,
  otp: null,
});

const resendOtpForm = useForm({
  email: null,
});

// OTP code as array for PinInput component
const otpCode = ref([]);

// Computed property for overall loading state
const isLoading = computed(() => loginForm.processing || verifyForm.processing || resendOtpForm.processing);

// Watch for OTP code changes to auto-submit
watch(otpCode, (newVal) => {
    if (newVal?.length === 6 && !isLoading.value) { // Ensure not already processing
        submitVerify();
    }
});

/**
 * Handles going back a step or emitting 'goBack' for external handling.
 */
function goBack() {
    errorMessage.value = ''; // Clear error on back
    if (step.value === 'verify') {
        step.value = 'login';
        otpCode.value = [];
        verifyForm.reset(); // Reset verify form fields
    } else {
        emit('goBack'); // Emit to parent for external back action
    }
}

/**
 * Submits the login form to send an OTP.
 */
function submitLogin() {
    errorMessage.value = ''; // Clear previous errors
    if (!loginForm.email) {
        errorMessage.value = t('body.emailRequired'); // Custom error message if email is empty
        return;
    }

    loginForm.post(route('account.auth.login'), { // Ensure route name is correct, often 'auth.login'
        onSuccess: () => {
            step.value = 'verify';
            verifyForm.email = loginForm.email; // Set email for verification
            resendOtpForm.email = loginForm.email; // Set email for resend
        },
        onError: (errors) => {
            errorMessage.value = errors.email ? errors.email[0] : t('body.loginFailed');
        }
    });
}

/**
 * Submits the OTP verification form.
 */
function submitVerify() {
    errorMessage.value = ''; // Clear previous errors
    const otp = otpCode.value.join(''); // Join array to string

    if (otp.length !== 6) {
        errorMessage.value = t('body.otpRequired'); // Custom error message if OTP is incomplete
        return;
    }

    verifyForm.otp = otp;

    verifyForm.post(route('account.auth.verify'), { // Ensure route name is correct, often 'auth.verify'
        onSuccess: () => {
            emit('authSuccess');
        },
        onError: (errors) => {
            // Display specific validation errors first, then a generic message
            errorMessage.value = errors.otp ? errors.otp[0] : t('body.verificationFailed');
            otpCode.value = []; // Clear OTP input on error for re-entry
        }
    });
}
</script>

<template>
    <div class="flex w-full max-w-md flex-col items-start gap-y-6">
        <Alert v-if="errorMessage" variant="destructive" class="w-full">
            <Icon icon="lucide:alert-circle" class="h-4 w-4" />
            <AlertTitle>{{ t('body.error') }}</AlertTitle> <AlertDescription>{{ errorMessage }}</AlertDescription>
        </Alert>

        <template v-if="step === 'login'">
            <Motion
                :initial="{ opacity: 0, x: locale === 'ar' ? 20 : -20 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.6, delay: 0.1, type: 'spring' }"
            >
                <Button variant="ghost" class="flex flex-row items-center gap-x-2 !px-0 text-lg" @click="goBack">
                    <Icon icon="lucide:arrow-left" class="h-5 w-5 rtl:rotate-180" />
                    {{ t('body.back') }}
                </Button>
            </Motion>

            <Motion class="w-full"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, delay: 0.1, type: 'spring' }"
            >
            <div class="w-full space-y-6 mb-8">
                <div class="text-center space-y-2">
                    <h2 class="text-2xl font-bold">{{ t('body.loginTitle') }}</h2>
                    <p class="text-muted-foreground">{{ t('body.loginDescription') }}</p>
                </div>

                <form class="space-y-4" @submit.prevent="submitLogin">
                    <div class="space-y-2">
                        <Label for="email" class="text-sm font-medium">
                            {{ t('body.email') }}
                            <span class="text-red-500">*</span>
                        </Label>
                        <Input
                            id="email"
                            v-model="loginForm.email"
                            type="email"
                            required
                            placeholder="hi@example.com"
                            class="h-12"
                            :disabled="isLoading"
                            :class="{ 'border-destructive': loginForm.errors.email }"
                        />
                         <p v-if="loginForm.errors.email" class="text-sm text-destructive mt-1">
                            {{ loginForm.errors.email }}
                        </p>
                    </div>

                    <Button type="submit" class="w-full h-12" :disabled="isLoading || !loginForm.email">
                        <Icon v-if="isLoading" icon="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
                        {{ t('body.loginBtn') }}
                    </Button>
                </form>
            </div>
            </Motion>
        </template>

        <template v-else-if="step === 'verify'">
            <Motion class="w-full"
                :initial="{ opacity: 0, x: locale === 'ar' ? 20 : -20 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: 0.6, delay: 0.1, type: 'spring' }"
            >
                <Button variant="ghost" class="flex flex-row items-center gap-x-2 !px-0 text-lg" @click="goBack">
                    <Icon icon="lucide:arrow-left" class="h-5 w-5 rtl:rotate-180" />
                    {{ t('body.back') }}
                </Button>
            </Motion>

            <Motion class="w-full"
                :initial="{ opacity: 0, y: 20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.6, delay: 0.1, type: 'spring' }"
            >
            <div class="w-full space-y-6 mb-6">
                <div class="text-center space-y-2">
                    <h2 class="text-2xl font-bold">{{ t('body.verifyTitle') }}</h2>
                    <p class="text-muted-foreground">
                        {{ t('body.verifyDescription') }}
                        <span class="font-medium text-foreground">{{ loginForm.email }}</span> </p>
                </div>

                <form class="space-y-6" @submit.prevent="submitVerify">
                    <div class="space-y-4">
                        <Label class="text-sm font-medium text-center block">
                            {{ t('body.otpCode') }}
                        </Label>
                        <div class="flex justify-center">
                            <PinInput
                                v-model="otpCode"
                                class="gap-3"
                                :disabled="isLoading"
                                @complete="submitVerify" >
                                <PinInputGroup>
                                    <template v-for="id in 6" :key="id"> <PinInputSlot
                                            :index="id - 1" class="w-10 h-10 sm:w-12 sm:h-12 text-lg font-semibold border-2 mx-4 rounded-lg"
                                        />
                                    </template>
                                </PinInputGroup>
                            </PinInput>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <Button type="submit" class="w-full h-12" :disabled="isLoading || otpCode.length !== 6">
                            <Icon v-if="isLoading" icon="lucide:loader-2" class="mr-2 h-4 w-4 animate-spin" />
                            {{ t('body.verifyBtn') }}
                        </Button>
                    </div>
                </form>
            </div>
            </Motion>
        </template>
    </div>
</template>

<i18n lang="json">
{
    "ar": {
        "body": {
            "back": "رجوع",
            "email": "البريد الإلكتروني",
            "loginBtn": "إرسال رمز التحقق",
            "verifyBtn": "تأكيد",
            "resendOtp": "إعادة إرسال الرمز",
            "loginTitle": "إضافة حساب جديد",
            "loginDescription": "أدخل بريدك الإلكتروني لإضافة حساب جديد",
            "verifyTitle": "تأكيد البريد الإلكتروني",
            "verifyDescription": "أدخل رمز التحقق المرسل إلى",
            "otpCode": "رمز التحقق",
            "error": "خطأ",
            "loginFailed": "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
            "emailRequired": "البريد الإلكتروني مطلوب.",
            "otpRequired": "الرجاء إدخال رمز التحقق كاملاً.",
            "verificationFailed": "فشل التحقق. يرجى التأكد من الرمز الصحيح والمحاولة مرة أخرى.",
            "otpResentSuccess": "تم إرسال رمز التحقق الجديد بنجاح.",
            "otpResendFailed": "فشل إعادة إرسال رمز التحقق. يرجى المحاولة مرة أخرى."
        }
    },
    "en": {
        "body": {
            "back": "Back",
            "email": "Email",
            "loginBtn": "Send Verification Code",
            "verifyBtn": "Verify",
            "resendOtp": "Resend Code",
            "loginTitle": "Add New Account",
            "loginDescription": "Enter your email to add a new account",
            "verifyTitle": "Verify Email",
            "verifyDescription": "Enter the verification code sent to",
            "otpCode": "Verification Code",
            "error": "Error",
            "loginFailed": "Login failed. Please try again.",
            "emailRequired": "Email is required.",
            "otpRequired": "Please enter the complete OTP code.",
            "verificationFailed": "Verification failed. Please ensure the correct code and try again.",
            "otpResentSuccess": "New OTP sent successfully.",
            "otpResendFailed": "Failed to resend OTP. Please try again."
        }
    }
}
</i18n>
