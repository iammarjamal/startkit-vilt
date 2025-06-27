<!--
Usage:
<AppShell variant="header">Content</AppShell>
<AppShell variant="sidebar">Content</AppShell>
Props:
- variant: header | sidebar (default: sidebar)
-->
<script setup>
import { SidebarProvider } from '@/components/ui/sidebar';
import { onMounted, ref } from 'vue';
const props = defineProps({
  variant: { type: String, default: 'sidebar' },
});
const isOpen = ref(true);
onMounted(() => {
  isOpen.value = localStorage.getItem('sidebar') !== 'false';
});
const handleSidebarChange = (open) => {
  isOpen.value = open;
  localStorage.setItem('sidebar', String(open));
};
</script>
<template>
  <div v-if="variant === 'header'" class="flex min-h-screen w-full flex-col">
    <slot />
  </div>
  <SidebarProvider v-else :default-open="isOpen" :open="isOpen" @update:open="handleSidebarChange">
    <slot />
  </SidebarProvider>
</template>
