<template lang="pug">
div(class="z-10 w-screen h-screen bg-[#f9f9f990] flex items-center justify-center fixed inset-0") 
    div(class="animate-fade-in z-20 lg:w-1/5 h-fit bg-white shadow-lg flex-col rounded-md p-5 space-y-3")
        div(class="header flex items-center justify-between ")
            h4 Edit Name
            <svg @click="changeDialog" class="cursor-pointer" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        div(class="body-dialog flex flex-col w-full space-y-4")
            div(class="space-y-1")
                Label  
                Input(placeholder="Enter New Section Title" v-model="localData.name" @keyup.enter="save")
            div(class="space-y-1 flex items-center justify-between p-1")
                p(class="text-sm")  Published
                Switch()
            div(class="flex w-full justify-end space-x-2")
                Button(@click="changeDialog") Cancel
                Button(class="bg-green-400" @click='save') Save
</template>

<script setup>
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from '@/components/ui/switch'
import { ref, reactive } from 'vue'
const props = defineProps(['changeDialog', 'data'])
const emit = defineEmits(['updateName', 'switch'])
const localData = ref(JSON.parse(JSON.stringify(props.data)))
const save = () => {
  if (!localData.value.name.trim()) {
    alert('Name cannot be empty')
    return
  }
  emit('updateName', localData.value.name)
  props.changeDialog()
}
</script>

<style lang="sass" scoped></style>
