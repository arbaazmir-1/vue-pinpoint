<template lang="pug">
div(class="animate-fade-in overflow-y-scroll h-fit md:h-screen md:w-3/5 w-11/12 lg:w-2/5 flex flex-col mx-auto z-0" v-if='Object.keys(user).length>0 && !loading')
    navbar-comp
    div(class="flex items-start justify-between  p-4 w-full" )
        div(class="flex items-start space-x-4")
            img(:src="avatar", alt="random-image" class="rounded-full w-12 h-12")
            div(class="flex flex-col space-y-1")
                h2 {{user.name}}
                p(class="text-sm") {{ user.bio }}

    div(v-for="(section,sectionName) in sections" class="w-full  p-4 flex flex-col space-y-4" :key="section._id")
        div(class="w-full flex items-center justify-between")
            h2( class="text-2xl flex items-center" ) {{section.name}}




        a(:href='link.link' target="_blank"  v-for="link in section.links" class="w-full transition-colors duration-150 flex md:flex-row  flex-col md:items-center justify-between ease-linear cursor-pointer select-none dark:bg-gray-800 bg-gray-200 hover:bg-blue-50 p-2 rounded-sm" :key="link.name")
            p(class="text-xs") {{link.name}}:
            p(class="text-xs") URL: {{link.link}}
        p(v-if='section.links.length===0' class="text-sm") No Links In This Section


    div(v-if='sections.length ===0' class="w-full flex items-center justify-center")
        p(class="text-sm text-blue-400") This user has no link
    div(class='w-full mb-2  mt-12 flex space-x-1 items-center justify-center text-sm')
        p(class='text-sm') Created With ❤️ By
        a(href="https://www.abdullahibnshahin.com/" target='_blank' class='text-blue-400') Abdullah
    div(class='w-full my-1 flex  items-center justify-center text-xs')
        p(class="text-center") This app uses a free cloud provider for backend and frontend, app might be slow at times

div(class="animate-fade-in h-screen md:w-3/5 w-11/12 lg:w-2/5 flex flex-col mx-auto z-0" v-if='Object.keys(user).length===0 && !loading')
    navbar-comp
    div(class='w-full h-full flex items-center justify-between flex-col overflow-hidden')
        div(class='flex flex-col items-center ')
            h2(class="text-6xl homemade-apple-regular text-red-400") 404
            p(class="abeezee-regular text-xs mb-10") No User with that username!
            p(class="abeezee-regular ") Looks like Your Are Lost
            | Thats Okay, We All get Lost Sometimes
            router-link(to='/' class="bg-white dark:bg-gray-800 p-2 rounded-sm my-4") Go Home

        lottie-animation(:animation-data="catLottie" :auto-play="true" :speed="1" ref="anim" class='h-1/2' )


div(class=" h-screen mt-20 md:w-3/5 w-11/12 lg:w-2/5 flex flex-col items-center dark:bg-gray-900 bg-white  mx-auto z-0" v-if='loading')
    div(class="h-10 w-10 animate-spin rounded-full  border-b-2 border-t-2 border-teal-400 "  )
    div(class="w-full my-10 mx-auto dark:text-gray-300"  v-if='loading'  )
        p Please have patience, this site is hosted in free server aka slow response



</template>
<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { usePublicStore } from '@/stores/public'

import { LottieAnimation } from 'lottie-web-vue'
import catLottie from '../assets/catLottieB.json'
import ModeToggle from '@/components/ModeToggle.vue'
import NavbarComp from '@/components/NavbarComp.vue'
import { createAvatar } from '@dicebear/core'
import { shapes, botttsNeutral } from '@dicebear/collection'
import { computed, ref } from 'vue'
const route = useRoute()
let anim = ref()

const store = usePublicStore()
const loading = computed(() => store.getLoading)
const sections = computed(() => store.getSections)
const user = computed(() => store.getUser)
const avatar = computed(() => {
  if (user.value && user.value.name) {
    return createAvatar(botttsNeutral, {
      size: 128,
      seed: user.value.name
    }).toDataUriSync()
  } else {
    return createAvatar(botttsNeutral, {
      size: 128,
      seed: 'pinpoint'
    }).toDataUriSync()
  }
})
</script>

<style lang="sass" scoped></style>
