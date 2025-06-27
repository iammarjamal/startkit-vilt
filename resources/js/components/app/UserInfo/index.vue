<!--
Usage:
<UserInfo :user="userObject" :showEmail="true" />
Props:
- user: user object { name, email, avatar }
- showEmail: show email under name (default: false)
-->
<script setup>
import Avatar from '@/components/app/Avatar/index.vue';
import { computed } from 'vue';
const props = defineProps({
    user: { type: Object, required: true },
    showEmail: { type: Boolean, default: false },
});
function getInitials(name) {
    if (!name) return '';
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase();
}
const showAvatar = computed(() => props.user.avatar && props.user.avatar !== '');
</script>
<template>
    <div class="flex items-center gap-2">
        <Avatar class="h-8 w-8 overflow-hidden rounded-lg">
            <img v-if="showAvatar" :src="props.user.avatar" :alt="props.user.name" class="rounded-lg" />
            <span v-else class="flex h-full w-full items-center justify-center rounded-lg bg-[var(--muted)] text-[var(--foreground)]">{{
                getInitials(props.user.name)
            }}</span>
        </Avatar>
        <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-medium text-[var(--foreground)]">{{ props.user.name }}</span>
            <span v-if="showEmail" class="truncate text-xs text-[var(--muted-foreground)]">{{ props.user.email }}</span>
        </div>
    </div>
</template>
