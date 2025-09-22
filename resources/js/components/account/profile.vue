<script setup>
import { usePage } from '@inertiajs/vue3';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { PinInput, PinInputGroup, PinInputSlot } from '@/components/ui/pin-input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useForm } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';

const { t } = useI18n();
const page = usePage();

const props = defineProps({
    open: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:open']);

const isMobile = ref(false);
const loading = ref(false);
const otpLoading = ref(false);
const showOtpModal = ref(false);
const otpCode = ref('');
const preview = ref(null);

// Responsive check
onMounted(() => {
    if (typeof window !== 'undefined') {
        isMobile.value = window.innerWidth < 640;
        window.addEventListener('resize', () => {
            isMobile.value = window.innerWidth < 640;
        });
    }
});

const user = computed(() => page.props.auth.user);
const defaultAvatar = computed(() => 'https://ui-avatars.com/api/?name=' + (user.value?.name || 'User'));
const originalEmail = user.value?.email;
const pendingEmail = ref(null);

// Form for profile update
const form = useForm({
    name: user.value?.name || '',
    email: user.value?.email || '',
    avatar: null,
});

// Handle avatar file change
function onFileChange(event) {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    form.avatar = file;
    const reader = new FileReader();
    reader.onload = () => (preview.value = reader.result);
    reader.readAsDataURL(file);
}

// Submit profile update
function submit() {
    if (form.email !== originalEmail) {
        form.post(route('account.profile.send-otp'), {
            onSuccess: () => {
                pendingEmail.value = form.email;
                showOtpModal.value = true;
            },
            onError: () => {
                console.error('Failed to send OTP');
            }
        });
        return;
    }
    updateProfile();
}

// Verify OTP
function verifyOtp() {
    otpLoading.value = true;
    form.post(route('account.profile.verify-otp'), {
        data: {
            otp: otpCode.value
        },
        onSuccess: () => {
            showOtpModal.value = false;
            updateProfile();
            otpLoading.value = false;
        },
        onError: () => {
            console.error('OTP verification failed');
            otpLoading.value = false;
        }
    });
}

// Update profile
function updateProfile() {
    loading.value = true;
    form.post(route('account.profile.update'), {
        onSuccess: () => {
            loading.value = false;
            emit('update:open', false);
        },
        onError: () => {
            loading.value = false;
        },
    });
}

// Handle OTP input complete
const handleComplete = (code) => {
    otpCode.value = Array.isArray(code) ? code.join('') : code;
};
</script>

<template>
    <TooltipProvider>
        <!-- Profile Edit Dialog/Drawer -->
        <Dialog v-if="!isMobile" v-model:open="props.open" @update:open="emit('update:open', $event)">
            <DialogContent class="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{{ t('profile.editTitle') }}</DialogTitle>
                    <DialogDescription>{{ t('profile.editDesc') }}</DialogDescription>
                </DialogHeader>

                <div class="space-y-6 mt-6">
                    <!-- Avatar Section -->
                    <div class="flex w-full items-center justify-center">
                        <label class="relative cursor-pointer">
                            <Tooltip>
                                <TooltipTrigger as-child>
                                    <Avatar class="h-16 w-16 border-2 border-zinc-700/30 dark:border-zinc-200">
                                        <AvatarImage :src="preview || user?.avatar || defaultAvatar" alt="Profile" />
                                        <AvatarFallback>{{ user?.name?.charAt(0) || 'U' }}</AvatarFallback>
                                    </Avatar>
                                    <Input class="hidden" type="file" accept="image/*" @change="onFileChange" />
                                </TooltipTrigger>
                                <TooltipContent>{{ t('profile.avatarTip') }}</TooltipContent>
                            </Tooltip>
                        </label>
                    </div>

                    <!-- Form Fields -->
                    <div class="grid grid-cols-1 gap-4">
                        <!-- Name -->
                        <div class="relative">
                            <label class="mb-2 flex items-center gap-1 text-sm font-medium">
                                {{ t('profile.name') }}
                                <Tooltip>
                                    <TooltipTrigger as-child>
                                        <Icon icon="mdi:information-outline" class="h-4 w-4 cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent>{{ t('profile.nameTip') }}</TooltipContent>
                                </Tooltip>
                            </label>
                            <div class="relative">
                                <Icon icon="mdi:account" class="absolute inset-y-0 start-3 my-auto h-4 w-4 text-muted-foreground" />
                                <Input v-model="form.name" :placeholder="t('profile.namePlaceholder')" class="ps-9" />
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="relative">
                            <label class="mb-2 flex items-center gap-1 text-sm font-medium">
                                {{ t('profile.email') }}
                                <Tooltip>
                                    <TooltipTrigger as-child>
                                        <Icon icon="mdi:information-outline" class="h-4 w-4 cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent>{{ t('profile.emailTip') }}</TooltipContent>
                                </Tooltip>
                            </label>
                            <div class="relative">
                                <Icon icon="material-symbols:mail-rounded" class="absolute inset-y-0 start-3 my-auto h-4 w-4 text-muted-foreground" />
                                <Input v-model="form.email" :placeholder="t('profile.emailPlaceholder')" class="ps-9" />
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button class="w-full" :disabled="loading" @click="submit">
                        <Icon v-if="loading" icon="mdi:loading" class="me-2 h-4 w-4 animate-spin" />
                        {{ t('profile.saveChanges') }}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <!-- Mobile Drawer -->
        <Drawer v-else v-model:open="props.open" @update:open="emit('update:open', $event)">
            <DrawerContent class="my-8">
                <DrawerHeader class="mt-3">
                    <DrawerTitle>{{ t('profile.editTitle') }}</DrawerTitle>
                    <DrawerDescription>{{ t('profile.editDesc') }}</DrawerDescription>
                </DrawerHeader>

                <div class="px-4 space-y-6 mt-4">
                    <!-- Avatar Section -->
                    <div class="flex w-full items-center justify-center">
                        <label class="relative cursor-pointer">
                            <Avatar class="h-16 w-16 border-2 border-zinc-700/30 dark:border-zinc-200">
                                <AvatarImage :src="preview || user?.avatar || defaultAvatar" alt="Profile" />
                                <AvatarFallback>{{ user?.name?.charAt(0) || 'U' }}</AvatarFallback>
                            </Avatar>
                            <Input class="hidden" type="file" accept="image/*" @change="onFileChange" />
                        </label>
                    </div>

                    <!-- Form Fields -->
                    <div class="grid grid-cols-1 gap-4">
                        <!-- Name -->
                        <div class="relative">
                            <label class="mb-2 text-sm font-medium">{{ t('profile.name') }}</label>
                            <div class="relative">
                                <Icon icon="mdi:account" class="absolute inset-y-0 start-3 my-auto h-4 w-4 text-muted-foreground" />
                                <Input v-model="form.name" :placeholder="t('profile.namePlaceholder')" class="ps-9" />
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="relative">
                            <label class="mb-2 text-sm font-medium">{{ t('profile.email') }}</label>
                            <div class="relative">
                                <Icon icon="mdi:email-outline" class="absolute inset-y-0 start-3 my-auto h-4 w-4 text-muted-foreground" />
                                <Input v-model="form.email" :placeholder="t('profile.emailPlaceholder')" class="ps-9" />
                            </div>
                        </div>
                    </div>
                </div>

                <DrawerFooter class="px-4 pb-4">
                    <Button class="w-full" :disabled="loading" @click="submit">
                        <Icon v-if="loading" icon="mdi:loading" class="me-2 h-4 w-4 animate-spin" />
                        {{ t('profile.saveChanges') }}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

        <!-- OTP Verification Modal -->
        <Dialog v-if="!isMobile" v-model:open="showOtpModal">
            <DialogContent class="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{{ t('profile.verifyTitle') }}</DialogTitle>
                    <DialogDescription>{{ t('profile.verifyDesc') }}</DialogDescription>
                </DialogHeader>
                <div class="space-y-4">
                    <PinInput id="pin-input" v-model="otpCode" @complete="handleComplete">
                        <PinInputGroup class="flex w-full flex-row items-center justify-center gap-x-2">
                            <template v-for="index in 6" :key="index">
                                <PinInputSlot class="rounded-md border" :index="index - 1" />
                            </template>
                        </PinInputGroup>
                    </PinInput>
                </div>
                <DialogFooter>
                    <Button :disabled="otpLoading" @click="verifyOtp">
                        <Icon v-if="otpLoading" icon="mdi:loading" class="me-2 h-4 w-4 animate-spin" />
                        {{ t('profile.verify') }}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Drawer v-else v-model:open="showOtpModal">
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{{ t('profile.verifyTitle') }}</DrawerTitle>
                    <DrawerDescription>{{ t('profile.verifyDesc') }}</DrawerDescription>
                </DrawerHeader>
                <div class="px-4 py-2">
                    <PinInput id="pin-input" v-model="otpCode" @complete="handleComplete">
                        <PinInputGroup class="gap-1">
                            <template v-for="index in 6" :key="index">
                                <PinInputSlot class="flex w-full" :index="index - 1" />
                            </template>
                        </PinInputGroup>
                    </PinInput>
                </div>
                <DrawerFooter class="px-4 pb-4">
                    <Button class="w-full" :disabled="otpLoading" @click="verifyOtp">
                        <Icon v-if="otpLoading" icon="mdi:loading" class="me-2 h-4 w-4 animate-spin" />
                        {{ t('profile.verify') }}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </TooltipProvider>
</template>

<i18n lang="json">
{
    "ar": {
        "profile": {
            "editTitle": "تعديل الملف الشخصي",
            "editDesc": "تحديث معلومات الملف الشخصي",
            "avatarTip": "انقر لتغيير الصورة الشخصية",
            "name": "الاسم",
            "nameTip": "اسمك الكامل",
            "namePlaceholder": "أدخل اسمك",
            "email": "البريد الإلكتروني",
            "emailTip": "عنوان بريدك الإلكتروني",
            "emailPlaceholder": "أدخل بريدك الإلكتروني",
            "saveChanges": "حفظ التغييرات",
            "verifyTitle": "تأكيد البريد الإلكتروني",
            "verifyDesc": "أدخل الرمز المرسل إلى بريدك الإلكتروني",
            "verify": "تأكيد"
        }
    },
    "en": {
        "profile": {
            "editTitle": "Edit Profile",
            "editDesc": "Update your profile information",
            "avatarTip": "Click to change avatar",
            "name": "Name",
            "nameTip": "Your full name",
            "namePlaceholder": "Enter your name",
            "email": "Email",
            "emailTip": "Your email address",
            "emailPlaceholder": "Enter your email",
            "saveChanges": "Save Changes",
            "verifyTitle": "Verify Email",
            "verifyDesc": "Enter the code sent to your email",
            "verify": "Verify"
        }
    }
}
</i18n>
