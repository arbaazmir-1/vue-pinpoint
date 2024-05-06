<template lang="pug">
div(class="animate-fade-in overflow-y-scroll h-fit md:h-screen md:w-3/5 w-11/12 lg:w-2/5 flex flex-col mx-auto z-0")
    div(class="flex items-start justify-between mt-10 p-4 w-full")
        div(class="flex items-start space-x-4")
            avatar(class="w-14 h-14")
                avatar-image(:src="user.profilePic", alt="@radix-vue")
                avatar-fallback {{user.name}}
            div(class="flex flex-col space-y-1") 
                h2 {{user.name}}
                p(class="text-sm") {{ user.bio }}
        mode-toggle            
    div(v-for="(section,sectionName) in store.getSections" class="w-full  p-4 flex flex-col space-y-4" :key="section._id") 
        div(class="w-full flex items-center justify-between") 
            h2( class="text-2xl flex items-center" ) {{section.name}} 
                
          
          
        
        a(:href='link.link' target="_blank"  v-for="link in section.links" class="w-full transition-colors duration-150 flex items-center justify-between ease-linear cursor-pointer select-none dark:bg-gray-800 bg-gray-200 hover:bg-blue-50 p-2 rounded-sm" :key="link.name")
            p {{link.name}}
            p(class="text-xs") URL: {{link.link}}
           
        
    div(v-if='Object.keys(store.getSections).length ===0' class="w-full flex items-center justify-center")
        p(class="text-sm text-blue-400") This user has no link


        
</template>
<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { RouterLink, useRoute } from 'vue-router'
import { usePublicStore } from '@/stores/public'
import ModeToggle from '@/components/ModeToggle.vue'
const route = useRoute()

console.log(route.params.username)

const store = usePublicStore()
const user = store.getUser
</script>

<style lang="sass" scoped></style>
