<template lang="pug">
div(class="z-10 w-screen h-screen dark:bg-[#00000070] bg-[#f9f9f990] flex items-center justify-center fixed inset-0") 
    div(class="animate-fade-in z-20 md:w-3/5 w-11/12 lg:w-2/5 xl:w-1/5 h-fit dark:bg-gray-800 bg-white shadow-lg flex-col rounded-md p-5 space-y-3")
        div(class="header flex items-center justify-between ")
            h4 Edit Section
            <svg @click="emit('closeDialog')" class="cursor-pointer" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        div(class="body-dialog flex flex-col w-full space-y-2")
            div(class="space-y-1")
                Label  Username
                Input(placeholder="Enter New Username Title" v-model='user.username')
            div(class="space-y-1 ")
                Label  Name
                Input(placeholder="Enter Your Name Title" v-model='user.name')
            div(class="space-y-1 ")
                Label  Bio
                Input(placeholder="Enter New Section Title" v-model='user.bio')
            div(class="flex w-full justify-end space-x-2")
                Button(@click="emit('closeDialog')" :disabled='loading') Cancel
                Button(class="bg-green-400" @click='updateUserFunc(user)' :disabled='loading') 
                    div(class="h-5 w-5 animate-spin rounded-full  border-b-2 border-t-2 border-white "  v-if='loading'  )
                    span(v-if='!loading') Save
    </template>

<script setup>
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
const $toast = useToast()
const authStore = useAuthStore()
const user = reactive(JSON.parse(JSON.stringify(authStore.getProfile)))
const loading = ref(false)
const emit = defineEmits(['closeDialog'])
const updateUserFunc = async (user) => {
  if (!user.name || !user.bio || !user.username) {
    let instance = $toast.warning('Empty Fields')
    return
  }
  loading.value = true
  const res = await authStore.updateUser({ ...user })
  loading.value = false
  if (res.data && res.data.message === 'user-updated') {
    emit('closeDialog')
  }
}
</script>

<style lang="sass" scoped></style>
