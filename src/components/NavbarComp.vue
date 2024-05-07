<template lang="pug">
div(class="navbar  w-full mx-auto p-5 h-20 flex items-center justify-between mt-10 my-5 ")
    router-link(to='/')
        h2(class="text-2xl abeezee-regular flex cursor-pointer") 📌 
            span(class="homemade-apple-regular") P
            |inpoint
    
    //- avatar
    //-     avatar-image(src="https://github.com/radix-vue.png", alt="@radix-vue")
    //-     avatar-fallback CN
    div(class="flex items-center space-x-2")
        mode-toggle
        Button(class="rounded-md text-sm dark:bg-gray-800 dark:text-gray-300" @click='copyurl') Share Url
</template>

<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ModeToggle from './ModeToggle.vue'
import { RouterLink } from 'vue-router'
import Button from '@/components/ui/button/Button.vue'
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const $toast = useToast()
const store = useAuthStore()
const user = computed(() => store.getProfile)
const copyurl = () => {
  const url = 'https://pinpoint.abdullahibnshahin.com/shared/' + user.value.username
  navigator.clipboard
    .writeText(url)
    .then(() => {
      let instance = $toast.success('Link Copied')
    })
    .catch((e) => {
      let instance = $toast.error('Something Went Wrong')
    })
}
</script>

<style lang="scss" scoped></style>
