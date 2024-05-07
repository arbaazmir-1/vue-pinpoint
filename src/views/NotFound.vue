<template lang="pug">
div(class="animate-fade-in h-screen md:w-3/5 w-11/12 lg:w-2/5 flex flex-col mx-auto z-0")
    navbar-comp
    div(class='w-full h-full flex items-center justify-between flex-col overflow-hidden')
        div(class='flex flex-col items-center ') 
            h2(class="text-6xl homemade-apple-regular text-red-400") 404
            p(class="abeezee-regular ") Looks like Your Are Lost
            | Thats Okay, We All get Lost Sometimes
            router-link(to='/' class="bg-white dark:bg-gray-800 p-2 rounded-sm my-4") Go Home
          
        lottie-animation(:animation-data="catLottie" :auto-play="true" :speed="1" ref="anim" class='h-1/2' )
    
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { LottieAnimation } from 'lottie-web-vue'
import catLottie from '../assets/catLottieB.json'
import { computed, ref } from 'vue'
import NavbarComp from '@/components/NavbarComp.vue'
let anim = ref()
</script>

<style lang="scss" scoped></style>
