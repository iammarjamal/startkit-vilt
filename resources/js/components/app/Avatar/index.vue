<!--
Usage:
<Avatar src="/path/to/image.jpg" alt="User name" />
Props:
- src: image url
- alt: alternative text
-->
<script setup>
const props = defineProps({
    value: {
        type: String,
        default: null,
    },
    img: {
        type: Boolean,
        default: null,
    },
    class: {
        type: String,
        default: null,
    },
});
</script>

<template>
    <img v-if="img" :src="img" alt="avatar" :class="[props.class, 'h-full w-full object-cover']" />
    <img
        v-if="!img"
        :src="'https://ui-avatars.com/api/?name=' + value + '&background=3b82f6&color=fff'"
        alt="avatar"
        :class="[props.class, 'h-full w-full object-cover']"
    />
</template>
