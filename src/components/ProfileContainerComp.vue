<template lang="pug">
div(class="w-11/12 md:w-1/2 mx-auto dark:bg-gray-800 bg-white shadow-lg  flex flex-col h-fit rounded-md animate-fade-in my-5 p-5 space-y-2" )
    div(class="flex items-start justify-between")
        div(class="flex flex-col space-y-4")
            avatar(class="w-14 h-14")
                avatar-image(:src="user.profilePic", alt="@radix-vue")
                avatar-fallback {{user.name}}
            div(class="flex flex-col space-y-2") 
                h2 {{user.name}}
                p(class="text-xs") @{{ user.username }}
        Button Edit
    p(class="text-xs") Bio: {{ user.bio }}
    p(class="text-xs") Page Link : 
        router-link(:to='link') Link
    div(class="flex w-full flex-col space-y-2 my-4")
        Button(@click='showLogout = !showLogout') Logout
        Button(variant="destructive") Delete Account 
logout-dialog(v-if='showLogout' @closeDialog="showLogout = !showLogout" @logoutConfirmed='logout')
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from './ui/button'
import { RouterLink, useRouter } from 'vue-router'
import LogoutDialog from '@/components/LogoutDialog.vue'
import { ref } from 'vue'
const router = useRouter()
const store = useAuthStore()
const user = store.getProfile
const showLogout = ref(false)
const link = 'http://localhost:5172/' + user.username
const logout = async () => {
  store.setUser(null)
  $cookies.remove('token')
  showLogout.value = !showLogout.value
  router.push({ name: 'login' })
}
</script>

<style lang="sass" scoped></style>
