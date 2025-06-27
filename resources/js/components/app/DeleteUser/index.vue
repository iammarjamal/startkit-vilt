<!--
Usage:
<DeleteUser />
Shows a dialog to delete user account with password confirmation.
-->
<script setup>
import Button from '@/components/app/Button/index.vue';
import Heading from '@/components/app/Heading/index.vue';
import Input from '@/components/app/Input/index.vue';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/vue3';
import { ref } from 'vue';

const passwordInput = ref(null);
const form = useForm({ password: '' });

const deleteUser = (e) => {
    e.preventDefault();
    form.delete('/profile', {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value?.focus(),
        onFinish: () => form.reset(),
    });
};

const closeModal = () => {
    form.clearErrors();
    form.reset();
};
</script>
<template>
    <div class="space-y-6">
        <Heading small title="Delete account" description="Delete your account and all of its resources" />
        <div class="space-y-4 rounded-lg border border-[var(--destructive)]/20 bg-[var(--destructive)]/10 p-4">
            <div class="relative space-y-0.5 text-[var(--destructive)]">
                <p class="font-medium">Warning</p>
                <p class="text-sm">Please proceed with caution, this cannot be undone.</p>
            </div>
            <Dialog>
                <DialogTrigger as-child>
                    <Button type="destructive">Delete account</Button>
                </DialogTrigger>
                <DialogContent>
                    <form class="space-y-6" @submit="deleteUser">
                        <DialogHeader class="space-y-3">
                            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                            <DialogDescription>
                                Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your
                                password to confirm you would like to permanently delete your account.
                            </DialogDescription>
                        </DialogHeader>
                        <div class="grid gap-2">
                            <Label for="password" class="sr-only">Password</Label>
                            <Input id="password" type="password" name="password" ref="passwordInput" v-model="form.password" placeholder="Password" />
                            <p v-if="form.errors.password" class="text-xs text-[var(--destructive)]">{{ form.errors.password }}</p>
                        </div>
                        <DialogFooter class="gap-2">
                            <DialogClose as-child>
                                <Button type="secondary" @click="closeModal">Cancel</Button>
                            </DialogClose>
                            <Button type="destructive" :disabled="form.processing">
                                <button type="submit">Delete account</button>
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    </div>
</template>
