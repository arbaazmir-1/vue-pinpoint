<template lang="pug">
div(class="navbar  w-full mx-auto p-5 h-20 flex items-center justify-between mt-10 my-5 ")
    h2(class="text-2xl abeezee-regular flex cursor-pointer") 📌 
        span(class="homemade-apple-regular") P
        |inpoint
    
    avatar
        avatar-image(src="https://github.com/radix-vue.png", alt="@radix-vue")
        avatar-fallback CN
</template>

<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
</script>

<style lang="scss" scoped></style>
