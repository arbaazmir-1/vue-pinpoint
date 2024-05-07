<template lang="pug">
div(class="z-10 w-screen h-screen dark:bg-[#00000070] bg-[#f9f9f990] flex items-center justify-center fixed inset-0") 
    div(class="animate-fade-in z-20 md:w-3/5 w-11/12 lg:w-2/5 xl:w-2/5 h-fit dark:bg-gray-800 bg-white shadow-lg flex-col rounded-md p-5 space-y-3")
        div(class="header flex items-center justify-between ")
            h4 Edit Link
            <svg @click="emit('closeDialog')" class="cursor-pointer" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        div(class="body-dialog flex flex-col w-full space-y-4")
            div(class="space-y-1")
                Label  Name 
                Input(placeholder="Enter Link Title" v-model="localData.name")
            div(class="space-y-1")
                Label( v-if='errorInput === null')  Link
                p(class="text-red-400 text-xs" v-if='errorInput !== null') {{errorInput }}
                Input(placeholder="Enter Link Address" :class="[errorInput? 'border-red-500': '']" v-model="localData.link" @keyup.enter="updateLink(localData,sectionIDLocal)")
            div(class="flex w-full justify-end space-x-2")
                Button( @click="emit('closeDialog')" :disabled='loading || loadingSave') Cancel
                Button( @click="deleteLink(localData,sectionID)" variant="destructive" :disabled='loading || loadingSave')
                    div(class="h-5 w-5 animate-spin rounded-full  border-b-2 border-t-2 border-white "  v-if='loading'  )
                    span(v-if='!loading') Delete
                Button(class="bg-green-400" @click='updateLink(localData,sectionIDLocal)' :disabled='loading || loadingSave') 
                    div(class="h-5 w-5 animate-spin rounded-full  border-b-2 border-t-2 border-white "  v-if='loadingSave'  )
                    span(v-if='!loadingSave') Save
</template>

<script setup>
import { useLinksStore } from '@/stores/links'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from '@/components/ui/switch'
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const $toast = useToast()
const props = defineProps(['changeDialog', 'data', 'sectionID'])
const emit = defineEmits(['updateName', 'closeDialog'])
const localData = ref(JSON.parse(JSON.stringify(props.data)))
const sectionIDLocal = reactive(props.sectionID)
const store = useLinksStore()
let urlPattern = /\b(?:https?|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[-A-Za-z0-9+&@#\/%=~_|]/
const errorInput = ref(null)
const loading = ref(false)
const loadingSave = ref(false)
const deleteLink = async (localData, sectionIDLocal) => {
  if (!localData || !sectionIDLocal) return
  loading.value = true
  await store.deleteLink(localData._id, sectionIDLocal)
  loading.value = true
  emit('closeDialog')
}

const updateLink = async (localData, sectionIDLocal) => {
  if (!localData.name || !localData.link || !sectionIDLocal) {
    let instance = $toast.error('Fill All Fields')
    return
  }
  if (!urlPattern.test(localData.link)) {
    errorInput.value = 'Invalid URL'
    return
  }
  loadingSave.value = true
  await store.updateLink(localData, sectionIDLocal)
  loadingSave.value = false
  emit('closeDialog')
}
</script>

<style lang="sass" scoped></style>
