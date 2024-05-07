<template lang="pug">
div(class="w-11/12 md:w-1/2 mx-auto dark:bg-gray-800 bg-white shadow-lg  flex flex-col h-fit rounded-md animate-fade-in my-5 p-5 space-y-4" )
    div(class="flex items-start justify-between")
        div(class="flex flex-col space-y-4")
            
            div(class="flex flex-col space-y-2") 
                h2 {{user.name}}
                p(class="text-xs") @{{ user.username }}
                p(class="text-xs") Bio: {{ user.bio }}
                p(class="text-xs") Page Link : 
                    a(:href='link' target='_blank') Link
        Button(@click='editProfileShow = !editProfileShow') Edit
    
    div(class="flex w-full flex-col space-y-2 my-4")
        Button(@click='showLogout = !showLogout') Logout
        
logout-dialog(v-if='showLogout' @closeDialog="showLogout = !showLogout" @logoutConfirmed='logout')
edit-profile-dialog(v-if='editProfileShow' @closeDialog='editProfileShow = !editProfileShow')

</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from './ui/button'
import { RouterLink, useRouter } from 'vue-router'
import LogoutDialog from '@/components/LogoutDialog.vue'
import EditProfileDialog from './EditProfileDialog.vue'
import { ref, computed } from 'vue'
import { useLinksStore } from '@/stores/links'
const router = useRouter()
const store = useAuthStore()
const user = computed(() => store.getProfile)
const linkStore = useLinksStore()
const editProfileShow = ref(false)
const showLogout = ref(false)
const link = 'https://vue-pinpoint.onrender.com/shared/' + user.username
const logout = async () => {
  store.setUser(null)
  await linkStore.logoutSections()
  $cookies.remove('token')
  showLogout.value = !showLogout.value
  router.push({ name: 'login' })
}
</script>

<style lang="sass" scoped></style>
