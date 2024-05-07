<template lang="pug">
div(class="animate-fade-in overflow-y-scroll h-fit md:h-screen md:w-3/5 w-11/12 lg:w-2/5 flex flex-col mx-auto z-0" v-if='Object.keys(user).length>0')
    navbar-comp
    div(class="flex items-start justify-between  p-4 w-full")
        div(class="flex items-start space-x-4")
            avatar(class="w-14 h-14")
                avatar-image(:src="user.profilePic", alt="@radix-vue")
                avatar-fallback {{user.name}}
            div(class="flex flex-col space-y-1") 
                h2 {{user.name}}
                p(class="text-sm") {{ user.bio }}
       
    div(v-for="(section,sectionName) in sections" class="w-full  p-4 flex flex-col space-y-4" :key="section._id") 
        div(class="w-full flex items-center justify-between") 
            h2( class="text-2xl flex items-center" ) {{section.name}} 
                
          
          
        
        a(:href='link.link' target="_blank"  v-for="link in section.links" class="w-full transition-colors duration-150 flex items-center justify-between ease-linear cursor-pointer select-none dark:bg-gray-800 bg-gray-200 hover:bg-blue-50 p-2 rounded-sm" :key="link.name")
            p {{link.name}}
            p(class="text-xs") URL: {{link.link}}
           
        
    div(v-if='sections.length ===0' class="w-full flex items-center justify-center")
        p(class="text-sm text-blue-400") This user has no link


div(class="animate-fade-in h-screen md:w-3/5 w-11/12 lg:w-2/5 flex flex-col mx-auto z-0" v-if='Object.keys(user).length===0')
    navbar-comp
    div(class='w-full h-full flex items-center justify-between flex-col overflow-hidden')
        h2(class='text-3xl text-red-400') No Such User
        lottie-animation(:animation-data="catLottie" :auto-play="true" :speed="1" ref="anim" class='h-1/2' )



        
</template>
<script setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { RouterLink, useRoute } from 'vue-router'
import { usePublicStore } from '@/stores/public'
import { LottieAnimation } from 'lottie-web-vue'
import catLottie from '../assets/catLottieB.json'
import ModeToggle from '@/components/ModeToggle.vue'
import NavbarComp from '@/components/NavbarComp.vue'
import { computed, ref } from 'vue'
const route = useRoute()
let anim = ref()
console.log(route.params.username)

const store = usePublicStore()
const sections = computed(() => store.getSections)
const user = computed(() => store.getUser)
</script>

<style lang="sass" scoped></style>
