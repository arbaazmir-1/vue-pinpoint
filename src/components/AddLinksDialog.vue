<template lang="pug">
div(class="z-10 w-screen h-screen bg-[#f9f9f990] flex items-center justify-center fixed inset-0") 
    div(class="animate-fade-in z-20 md:w-3/5 w-11/12 lg:w-2/5 xl:w-2/5 h-fit dark:bg-gray-800 bg-white shadow-lg flex-col rounded-md p-5 space-y-3")
        div(class="header flex items-center justify-between ")
            h4 Add New Links
            <svg @click="emit('closeDialog')" class="cursor-pointer" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        div(class="body-dialog flex flex-col w-full space-y-4")
            div(class="space-y-1")
                Label  Name 
                Input(placeholder="Enter Link Title" v-model="name" )
            div(class="space-y-1")
                Label( v-if='linkError === null')  Link
                p(class="text-red-400 text-xs" v-if='linkError !== null') Please Provide a Valid Link
                Input(placeholder="Enter Link Address" v-model="link" :class="[linkError? 'border-red-500': '']" )
            div(class="flex w-full justify-end space-x-2")
                Button( @click="emit('closeDialog')") Cancel
                Button(class="bg-green-400" @click='addLink(sectionID,name,link)') Save
</template>

<script setup>
import { useLinksStore } from '@/stores/links'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { ref, reactive } from 'vue'
const store = useLinksStore()
const props = defineProps(['sectionID'])
const emit = defineEmits(['closeDialog'])
const name = ref('')
const link = ref('')
const $toast = useToast()
let urlPattern = /\b(?:https?|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[-A-Za-z0-9+&@#\/%=~_|]/
const linkError = ref(null)
const addLink = (sectionid, name, link) => {
  if (!name || !link || !sectionid) {
    console.log(name, link, sectionid)
    let instance = $toast.error('Please Fill all the value')
    return
  }
  if (!urlPattern.test(link)) {
    linkError.value = 'Invalid URL'
    return
  }
  const uid = 'linkuid' + Math.floor(Math.random() * 100)
  store.addLink(sectionid, { uid, name, link })
  emit('closeDialog')
}
</script>

<style lang="sass" scoped></style>
