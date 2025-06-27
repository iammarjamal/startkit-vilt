<!--
Usage:
<UserMenuContent :user="userObject" />
Props:
- user: user object { name, email, avatar }
-->
<script setup>
import Link from '@/components/app/Link/index.vue';
import UserInfo from '@/components/app/UserInfo/index.vue';
import { Icon } from '@iconify/vue';
// Import DropdownMenu components from shadcn/ui if available
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
const props = defineProps({
    user: { type: Object, required: true },
});
</script>
<template>
    <DropdownMenuLabel class="p-0 font-normal">
        <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserInfo :user="user" :show-email="true" />
        </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
        <DropdownMenuItem as-child>
            <Link class="block w-full" href="/profile/edit" as="button">
                <Icon icon="lucide:settings" class="mr-2 h-4 w-4" />
                Settings
            </Link>
        </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem as-child>
        <Link class="block w-full" method="post" href="/logout" as="button">
            <Icon icon="lucide:log-out" class="mr-2 h-4 w-4" />
            Log out
        </Link>
    </DropdownMenuItem>
</template>
